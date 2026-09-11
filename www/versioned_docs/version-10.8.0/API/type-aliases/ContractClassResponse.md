# Type Alias: ContractClassResponse

> **ContractClassResponse** = [`LegacyContractClass`](LegacyContractClass.md) \| `Omit`\<[`CompiledSierra`](CompiledSierra.md), `"sierra_program_debug_info"`\>

Defined in: [src/provider/types/response.type.ts:94](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/types/response.type.ts#L94)

Standardized type

Cairo0 program compressed and Cairo1 sierra_program decompressed

abi Abi

CompiledSierra without '.sierra_program_debug_info'
