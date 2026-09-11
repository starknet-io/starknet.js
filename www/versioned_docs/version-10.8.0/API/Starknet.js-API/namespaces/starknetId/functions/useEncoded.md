# Function: useEncoded()

> **useEncoded**(`decoded`): `bigint`

Defined in: [src/utils/starknetId.ts:85](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/starknetId.ts#L85)

Encodes a string into a bigint value.

## Parameters

### decoded

`string`

The string to be encoded.

## Returns

`bigint`

The encoded bigint value.

## Example

```typescript
const result = starknetId.useEncoded('starknet.js');
// result = 3015206943634620n
```
