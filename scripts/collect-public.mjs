import {readFile,writeFile} from 'node:fs/promises';
import {observe,compare,validateTarget} from '../lib/public-monitor.mjs';
const targets=JSON.parse(await readFile(new URL('../config/shield-targets.json',import.meta.url),'utf8'));
const file=new URL('../shield/data/latest.json',import.meta.url);
const previous=JSON.parse(await readFile(file,'utf8'));
const results=[];for(const t of targets){validateTarget(t);results.push(await observe(t));}
// Retain the last successful baseline through collection failures to avoid losing comparison state.
const baselines=previous.baselines||previous.results.filter(r=>r.status==='observed');
const changes=compare(baselines,results);
const generatedAt=new Date().toISOString();
const updated=targets.map(t=>results.find(r=>r.id===t.id&&r.status==='observed')||baselines.find(r=>r.id===t.id)).filter(Boolean);
const history=[...(previous.history||[]),{at:generatedAt,observed:results.filter(r=>r.status==='observed').length,failed:results.filter(r=>r.status!=='observed').length,changes:changes.length}].slice(-30);
await writeFile(file,JSON.stringify({schema:1,generatedAt,mode:'public-observation',baselineAt:previous.baselineAt||updated[0]?.checkedAt||null,results,changes,baselines:updated,history,message:'공개 홈페이지 관찰 결과. 개인정보 유출·침해 여부를 판정하지 않습니다.'},null,2)+'\n');
console.log(JSON.stringify({generatedAt,observed:results.filter(r=>r.status==='observed').length,failed:results.filter(r=>r.status!=='observed').length,changes:changes.length}));
