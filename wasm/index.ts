
//@ts-ignore
const wasmModule = import("./my_wasm_module.wasm");

export async function add(a:number, b:number) {
  const instance = await wasmModule;
  return instance.add(a, b);
}