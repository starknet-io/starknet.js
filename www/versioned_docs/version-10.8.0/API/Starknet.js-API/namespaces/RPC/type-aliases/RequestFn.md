# Type Alias: RequestFn

> **RequestFn** = \<`T`\>(`call`) => `Promise`\<[`RpcTypeToMessageMap`](../interfaces/RpcTypeToMessageMap.md)\[`T`\]\[`"result"`\]\>

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/wallet-api/methods.d.ts:231

## Type Parameters

### T

`T` _extends_ [`RpcMessage`](RpcMessage.md)\[`"type"`\]

## Parameters

### call

[`RequestFnCall`](RequestFnCall.md)\<`T`\>

## Returns

`Promise`\<[`RpcTypeToMessageMap`](../interfaces/RpcTypeToMessageMap.md)\[`T`\]\[`"result"`\]\>
