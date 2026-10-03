import {mkdir,cp,rm} from 'node:fs/promises';
await rm('public',{recursive:true,force:true});await mkdir('public',{recursive:true});
for(const p of ['index.html','style.css','app.js','css','js','shield'])await cp(p,'public/'+p,{recursive:true});
console.log('Static CARE and SHIELD assets prepared. Server/config/test sources excluded.');
