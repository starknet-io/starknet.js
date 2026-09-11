# Type Alias: IsParamsOptional\<T\>

> **IsParamsOptional**\<`T`\> = `undefined` _extends_ [`RpcTypeToMessageMap`](../interfaces/RpcTypeToMessageMap.md)\[`T`\]\[`"params"`\] ? `true` : `false`

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/wallet-api/methods.d.ts:223

## Type Parameters

### T

`T` _extends_ keyof [`RpcTypeToMessageMap`](../interfaces/RpcTypeToMessageMap.md)
