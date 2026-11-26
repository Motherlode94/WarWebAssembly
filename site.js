import {loadModule} from './src/runtime.js';
const $=id=>document.getElementById(id);
const examples={answer:{wat:'(module (func (export "answer") (result i32) i32.const 42))',bytes:[0,97,115,109,1,0,0,0,1,5,1,96,0,1,127,3,2,1,0,7,10,1,6,97,110,115,119,101,114,0,0,10,6,1,4,0,65,42,11]},add:{wat:'(module (func (export "add") (param i32 i32) (result i32) local.get 0 local.get 1 i32.add))',bytes:[0,97,115,109,1,0,0,0,1,7,1,96,2,127,127,1,127,3,2,1,0,7,7,1,3,97,100,100,0,0,10,9,1,7,0,32,0,32,1,106,11]},bad:{wat:'Module volontairement invalide',bytes:[0,1,2]}};
function show(){const ex=examples[$('example').value];$('wat').textContent=ex.wat;$('hex').textContent=ex.bytes.map(b=>b.toString(16).padStart(2,'0')).join(' ');$('output').textContent='Prêt · '+ex.bytes.length+' octets';}
function int(id){const s=$(id).value,n=Number(s);if(!s.trim()||!Number.isInteger(n)||n< -2147483648||n>2147483647)throw new RangeError('Entier i32 requis');return n;}
$('example').onchange=show;$('run').onclick=async()=>{const key=$('example').value,ex=examples[key];$('run').disabled=true;try{const t=performance.now();const r=await loadModule(Uint8Array.from(ex.bytes));const result=key==='add'?r.exports.add(int('a'),int('b')):r.exports.answer();$('output').textContent=JSON.stringify({result,bytes:ex.bytes.length,compileAndInstantiateMs:Math.round((performance.now()-t)*1000)/1000,exports:WebAssembly.Module.exports(r.module),imports:WebAssembly.Module.imports(r.module)},null,2);}catch(e){$('output').textContent=e.name+': '+e.message;}finally{$('run').disabled=false;}};
let memory;function report(message){const view=new Uint8Array(memory.buffer);$('memoryOut').textContent=message+'\nPages : '+view.length/65536+' · Octets : '+view.length+'\nPremiers 32 octets : '+Array.from(view.slice(0,32),x=>x.toString(16).padStart(2,'0')).join(' ');}
function reset(){memory=new WebAssembly.Memory({initial:1,maximum:4});report('Mémoire initialisée');}
function op(fn){try{fn();}catch(e){report(e.name+': '+e.message);}}
function offset(){const n=int('offset');if(n<0||n+4>memory.buffer.byteLength)throw new RangeError('Offset hors mémoire');return n;}
$('write').onclick=()=>op(()=>{const n=offset();new DataView(memory.buffer).setInt32(n,int('value'),true);report('Écriture i32 à '+n);});
$('read').onclick=()=>op(()=>{const n=offset();report('Valeur à '+n+' : '+new DataView(memory.buffer).getInt32(n,true));});
$('grow').onclick=()=>op(()=>{memory.grow(1);$('offset').max=String(memory.buffer.byteLength-4);report('Mémoire agrandie');});
$('clear').onclick=()=>{$('offset').max='65532';$('offset').value='0';reset();};show();reset();
