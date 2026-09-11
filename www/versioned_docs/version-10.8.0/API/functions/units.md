# Function: units()

> **units**(`amount`, `simbol?`): `string`

Defined in: [src/utils/units.ts:12](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/units.ts#L12)

Convert strk to fri or fri to strk

## Parameters

### amount

`string` \| `bigint`

### simbol?

`"fri"` \| `"strk"`

## Returns

`string`

## Example

```typescript
units(1000n, 'fri'); // '0.000000000000001' strk
units('1', 'strk'); // '1000000000000000000' fri
```
