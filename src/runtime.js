export async function loadModule(bytes,imports={}) {
 if(!(bytes instanceof ArrayBuffer)&&!ArrayBuffer.isView(bytes))throw new TypeError('Expected WASM bytes');
 const module=await WebAssembly.compile(bytes);
 const instance=await WebAssembly.instantiate(module,imports);
 return {module,instance,exports:instance.exports};
}
