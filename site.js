import {loadModule} from './src/runtime.js';
const fixture=Uint8Array.from([0,97,115,109,1,0,0,0,1,5,1,96,0,1,127,3,2,1,0,7,10,1,6,97,110,115,119,101,114,0,0,10,6,1,4,0,65,42,11]);
const btn=document.querySelector('#run'),out=document.querySelector('#output');
btn.addEventListener('click',async()=>{btn.disabled=true;try{const result=await loadModule(fixture);out.textContent='Module compilé et instancié\nExports : '+Object.keys(result.exports).join(', ')+'\nanswer() = '+result.exports.answer();}catch(e){out.textContent=e.message;}finally{btn.disabled=false;}});
