declare module '*.wasm' {
    const value: any;
    export default value;
  }
  
  declare module "./wasm" {
    export function add(a: number, b: number): Promise<number>;
  }