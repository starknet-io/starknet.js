# Function: useDecoded()

> **useDecoded**(`encoded`): `string`

Defined in: [src/utils/starknetId.ts:33](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/starknetId.ts#L33)

Decodes an array of BigInts into a string using the given algorithm.

## Parameters

### encoded

`bigint`[]

The encoded array of BigInts.

## Returns

`string`

The decoded string.

## Example

```typescript
const result = starknetId.useDecoded([3015206943634620n]);
// result = "starknetjs.stark"
```
