import test from 'node:test';import assert from 'node:assert/strict';import {loadModule} from '../src/runtime.js';
// (module (func (export "answer") (result i32) i32.const 42))
const fixture=Uint8Array.from([0,97,115,109,1,0,0,0,1,5,1,96,0,1,127,3,2,1,0,7,10,1,6,97,110,115,119,101,114,0,0,10,6,1,4,0,65,42,11]);
test('compile and execute',async()=>{const r=await loadModule(fixture);assert.equal(r.exports.answer(),42);});
test('reject malformed input',async()=>{await assert.rejects(loadModule(new Uint8Array([0])),WebAssembly.CompileError);await assert.rejects(loadModule('bad'),TypeError);});
