# Function: parseContract()

> **parseContract**(`contract`): `Promise`\<[`ContractClass`](../../../../type-aliases/ContractClass.md)\>

Defined in: [src/utils/provider.ts:96](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/provider.ts#L96)

Create a compressed contract from a given compiled Cairo 0 & 1 contract or a string.
Parse contract string to json and compile contract.sierra_program or contract.program property

## Parameters

### contract

`string` \| [`CompiledContract`](../../../../type-aliases/CompiledContract.md)

Compiled Cairo 0 or Cairo 1 contract, or string

## Returns

`Promise`\<[`ContractClass`](../../../../type-aliases/ContractClass.md)\>

Cairo 0 or Cairo 1 compressed contract

## Example

```typescript
const result = provider.parseContract({
   "sierra_program": [
       "0x1",
       "0x4",
       "0x0",
       "0x2",
       "0x4",
       "0x1",
       "0x3b4",
       "0x4c",
       "0x65",
       "0x52616e6765436865636b",...})
// result = {sierra_program: 'H4sIAAAAAAAAA6x9WZbsrI7uVGqd53qgb8ZynwzYY7jDv5JAAmxHZuQ+96yq/L0jIzEINZ8axP/5j/q/+j//+z/wH9f/o/p/zPbh+Iot49+u9v8G3//rTdDhDDF4Z0MKPthQ+m+S2v6n1S//638VvdXW2PQ6RvxuDG+jiybCXKJ7Hef6ZRi9E+Q89WmKLilfqbrsL6PUCf8...}
```
