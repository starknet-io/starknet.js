# Function: createSierraContractClass()

> **createSierraContractClass**(`contract`): `Promise`\<[`SierraContractClass`](../../../../type-aliases/SierraContractClass.md)\>

Defined in: [src/utils/provider.ts:63](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/provider.ts#L63)

Create Sierra compressed Contract Class from a given Compiled Sierra

CompiledSierra -> SierraContractClass

## Parameters

### contract

[`CompiledSierra`](../../../../type-aliases/CompiledSierra.md)

sierra code from the Cairo compiler

## Returns

`Promise`\<[`SierraContractClass`](../../../../type-aliases/SierraContractClass.md)\>

compressed Sierra

## Example

```typescript
const result = provider.createSierraContractClass({
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
