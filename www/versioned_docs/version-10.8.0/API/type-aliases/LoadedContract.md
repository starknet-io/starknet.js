# Type Alias: LoadedContract

> **LoadedContract** = \{ `sierra`: [`CompiledSierra`](CompiledSierra.md); `casm`: [`CairoAssembly`](CairoAssembly.md); `compiler?`: `string`; `compiledClassHash?`: `never`; \} \| \{ `sierra`: [`CompiledSierra`](CompiledSierra.md); `casm?`: `never`; `compiler?`: `string`; `compiledClassHash`: `string`; \}

Defined in: [src/utils/contractLoader.ts:5](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/contractLoader.ts#L5)
