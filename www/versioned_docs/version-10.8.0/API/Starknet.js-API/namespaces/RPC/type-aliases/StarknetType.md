# Type Alias: StarknetType

> **StarknetType** = \{ `name`: `string`; `type`: `string`; \} \| [`StarknetEnumType`](StarknetEnumType.md) \| [`StarknetMerkleType`](StarknetMerkleType.md)

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/wallet-api/typedData.d.ts:32

SPEC: STARKNET_TYPE
A single type, as part of a struct. The `type` field can be any of the EIP-712 supported types.
Note that the `uint` and `int` aliases like in Solidity, and fixed point numbers are not supported by the EIP-712
standard.
