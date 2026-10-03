import {readFile} from 'node:fs/promises';
import {timingSafeEqual} from 'node:crypto';
export function authorized(received,expected){if(!expected||expected.length<24||typeof received!=='string')return false;const a=Buffer.from(received),b=Buffer.from('Bearer '+expected);return a.length===b.length&&timingSafeEqual(a,b);}
export function contextFor(snapshot){return {generatedAt:snapshot.generatedAt,scope:'Public homepage metadata only. No intrusion or leak verdict.',targets:(snapshot.results||[]).map(r=>({org:r.org,status:r.status,httpStatus:r.httpStatus,checkedAt:r.checkedAt,certificateDaysRemaining:r.certificate?.daysRemaining,headersPresent:Object.fromEntries(Object.entries(r.securityHeaders||{}).map(([k,v])=>[k,v.present])),scriptOriginCount:r.scriptOrigins?.length,error:r.error})),changes:(snapshot.changes||[]).map(c=>({org:c.org,kind:c.kind,level:c.level})).slice(0,40)};}
export default async function handler(req,res){
 res.setHeader('Cache-Control','no-store');res.setHeader('X-Content-Type-Options','nosniff');
 if(req.method==='GET')return res.status(200).json({configured:Boolean(process.env.OPENAI_API_KEY&&process.env.OPENAI_MODEL&&process.env.SHIELD_ACCESS_TOKEN?.length>=24),provider:'OpenAI',requiresOperatorToken:true});
 if(req.method!=='POST'){res.setHeader('Allow','GET, POST');return res.status(405).json({error:'METHOD_NOT_ALLOWED'});}
 if(!authorized(req.headers.authorization,process.env.SHIELD_ACCESS_TOKEN))return res.status(401).json({error:'OPERATOR_TOKEN_REQUIRED'});
 if(!process.env.OPENAI_API_KEY||!process.env.OPENAI_MODEL)return res.status(503).json({error:'OPENAI_NOT_CONFIGURED'});
 try{
  const snapshot=JSON.parse(await readFile(new URL('../shield/data/latest.json',import.meta.url),'utf8'));
  if(!snapshot.generatedAt)return res.status(409).json({error:'NO_OBSERVATIONS'});
  // Ignore arbitrary request bodies. Only controlled public observation fields can reach the model.
  const upstream=await fetch('https://api.openai.com/v1/responses',{method:'POST',signal:AbortSignal.timeout(20000),headers:{Authorization:'Bearer '+process.env.OPENAI_API_KEY,'Content-Type':'application/json'},body:JSON.stringify({model:process.env.OPENAI_MODEL,store:false,max_output_tokens:1200,instructions:'You are a defensive public-web observation analyst. Reply in Korean. Separate observations, collection failures, and review recommendations. Never claim an intrusion, a personal-data leak, exploitability or safety from these metadata. Missing headers are not proof of vulnerability. State coverage and timestamps; stale data is not real-time. You cannot block traffic. Do not invent evidence. Output plain text, not HTML.',input:JSON.stringify(contextFor(snapshot))})});
  if(!upstream.ok)return res.status(502).json({error:'OPENAI_REQUEST_FAILED',upstreamStatus:upstream.status});
  const result=await upstream.json();const text=(result.output||[]).flatMap(o=>o.content||[]).filter(c=>c.type==='output_text').map(c=>c.text).join('\n');
  if(!text)return res.status(502).json({error:'EMPTY_MODEL_RESPONSE'});
  return res.status(200).json({text,generatedAt:new Date().toISOString(),observationsAt:snapshot.generatedAt});
 }catch{return res.status(502).json({error:'REPORT_FAILED'});}
}
