import https from 'node:https';
import dns from 'node:dns/promises';
import net from 'node:net';
import {createHash} from 'node:crypto';
export const hash=value=>createHash('sha256').update(value).digest('hex');
export function publicIP(address){
 if(net.isIP(address)===4){const [a,b]=address.split('.').map(Number);return !(a===0||a===10||a===127||a>=224||(a===169&&b===254)||(a===172&&b>=16&&b<=31)||(a===192&&b===168)||(a===100&&b>=64&&b<=127)||(a===198&&(b===18||b===19)));}
 // Fail closed for mapped/transition/ULA/link-local IPv6; ordinary global unicast only.
 return net.isIP(address)===6&&/^[23][0-9a-f]{3}:/i.test(address)&&!address.toLowerCase().startsWith('2001:db8:');
}
const reviewed=['shinhan.com','shinhancard.com','shinhanlife.co.kr','shinhansec.com'];
export function validateTarget(target,raw=target.url){
 if(!reviewed.includes(target.domain))throw Error('UNREVIEWED_DOMAIN');
 const u=new URL(raw);const h=u.hostname.toLowerCase();
 if(u.protocol!=='https:'||u.port||u.username||u.password||!(h===target.domain||h.endsWith('.'+target.domain)))throw Error('OUT_OF_SCOPE_REDIRECT');
 if(raw===target.url&&(u.pathname!=='/'||u.search||u.hash))throw Error('ROOT_URL_ONLY');
 return u;
}
export function features(html,url,headers,cert){
 const scripts=new Set();const src=/<script\b[^>]*\bsrc\s*=\s*["']([^"']+)["'][^>]*>/gi;let m;
 while((m=src.exec(html))){try{const u=new URL(m[1],url);if(['https:','http:'].includes(u.protocol)&&u.hostname!==new URL(url).hostname)scripts.add(u.origin)}catch{}}
 const names=['strict-transport-security','content-security-policy','x-content-type-options','referrer-policy','permissions-policy'];
 const securityHeaders=Object.fromEntries(names.map(n=>[n,{present:Boolean(headers[n]),fingerprint:headers[n]?hash(String(headers[n])):null}]));
 return {pageHash:hash(html),scriptOrigins:[...scripts].sort().slice(0,100),securityHeaders,certificate:cert?{fingerprint:cert.fingerprint256||null,validTo:cert.valid_to||null,daysRemaining:cert.valid_to?Math.floor((Date.parse(cert.valid_to)-Date.now())/86400000):null}:null};
}
export async function observe(target,{lookup=dns.lookup,request=https.request}={}){
 const started=Date.now();let current=target.url,redirects=0;const checkedAt=new Date().toISOString();
 try{
  for(;;){const u=validateTarget(target,current);const records=await lookup(u.hostname,{all:true});if(!records.length||records.some(x=>!publicIP(x.address)))throw Error('NON_PUBLIC_ADDRESS');const address=records.find(x=>x.family===4)||records[0];
   const result=await new Promise((resolve,reject)=>{
    const req=request(u,{method:'GET',agent:false,rejectUnauthorized:true,servername:u.hostname,lookup:(_host,opts,cb)=>cb(null,...(opts.all?[[address]]:[address.address,address.family])),headers:{'User-Agent':'SHIELD-PublicObservation/1.0 (one daily public homepage request; no authentication)','Accept':'text/html','Accept-Encoding':'identity'}},res=>{
     const cert=res.socket.getPeerCertificate?.();const h=res.headers;const code=res.statusCode;const location=h.location;
     if(code>=300&&code<400&&location){res.destroy();resolve({redirect:new URL(location,u).href});return;}
     let size=0;const chunks=[];res.on('data',chunk=>{size+=chunk.length;if(size>1024*1024){res.destroy();reject(Error('RESPONSE_TOO_LARGE'));return;}chunks.push(chunk)});res.on('error',reject);res.on('end',()=>resolve({httpStatus:code,contentType:String(h['content-type']||''),...features(Buffer.concat(chunks).toString('utf8'),u.href,h,cert)}));
    });req.setTimeout(8000,()=>req.destroy(Error('REQUEST_TIMEOUT')));req.on('error',reject);req.end();
   });if(result.redirect){if(redirects++>=3)throw Error('TOO_MANY_REDIRECTS');current=result.redirect;continue;}
   return {...target,checkedAt,status:result.httpStatus>=200&&result.httpStatus<300?'observed':'http-error',durationMs:Date.now()-started,finalHost:u.hostname,redirects,...result};
  }
 }catch(e){const known=['OUT_OF_SCOPE_REDIRECT','NON_PUBLIC_ADDRESS','REQUEST_TIMEOUT','TOO_MANY_REDIRECTS','RESPONSE_TOO_LARGE','UNREVIEWED_DOMAIN','ROOT_URL_ONLY'];return {...target,checkedAt,status:'collection-error',durationMs:Date.now()-started,error:known.includes(e.message)?e.message:String(e.code||'COLLECTION_FAILED').slice(0,80)};}
}
export function compare(previous,results){const changes=[];for(const r of results){if(r.status!=='observed')continue;const p=previous.find(x=>x.id===r.id&&x.status==='observed');const add=(kind,summary,level='review')=>changes.push({id:hash(r.id+kind+r.checkedAt).slice(0,16),targetId:r.id,org:r.org,kind,summary,level,checkedAt:r.checkedAt});if(r.certificate?.daysRemaining!==null&&r.certificate?.daysRemaining!==undefined&&r.certificate.daysRemaining<=30)add('certificate-expiry','인증서 만료 예정: '+r.certificate.daysRemaining+'일','priority');if(!p){add('baseline','첫 정상 관찰: 비교 기준 등록','info');continue;}if(r.pageHash!==p.pageHash)add('content','공개 HTML 지문 변경 · 정상 캠페인/동적 콘텐츠일 수 있음');if(JSON.stringify(r.scriptOrigins)!==JSON.stringify(p.scriptOrigins))add('scripts','외부 스크립트 연결 호스트 변경 · 악성 여부 미확정');if(r.certificate?.fingerprint!==p.certificate?.fingerprint)add('certificate','인증서 변경 · 정상 갱신 여부 확인');for(const [k,v]of Object.entries(r.securityHeaders))if(v.fingerprint!==p.securityHeaders?.[k]?.fingerprint)add('header:'+k,k+' 관찰 상태 변경 · 응답별 설정 차이 확인');}return changes;}
