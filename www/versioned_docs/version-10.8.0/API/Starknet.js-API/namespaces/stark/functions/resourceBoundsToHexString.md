# Function: resourceBoundsToHexString()

> **resourceBoundsToHexString**(`resourceBoundsBN`): `object`

Defined in: [src/utils/stark/index.ts:535](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/stark/index.ts#L535)

Converts ResourceBoundsBN (with bigint values) to ResourceBounds (with string values)

## Parameters

### resourceBoundsBN

[`ResourceBoundsBN`](../../../../type-aliases/ResourceBoundsBN.md)

The resource bounds with bigint values

## Returns

`object`

The resource bounds with hex string values

### l1_gas

> **l1_gas**: `object`

#### l1_gas.max_amount

> **max_amount**: `string`

#### l1_gas.max_price_per_unit

> **max_price_per_unit**: `string`

### l1_data_gas

> **l1_data_gas**: `object`

#### l1_data_gas.max_amount

> **max_amount**: `string`

#### l1_data_gas.max_price_per_unit

> **max_price_per_unit**: `string`

### l2_gas

> **l2_gas**: `object`

#### l2_gas.max_amount

> **max_amount**: `string`

#### l2_gas.max_price_per_unit

> **max_price_per_unit**: `string`

## Example

```typescript
const resourceBoundsBN = {
  l1_gas: { max_amount: 1000n, max_price_per_unit: 100n },
  l2_gas: { max_amount: 2000n, max_price_per_unit: 200n },
  l1_data_gas: { max_amount: 500n, max_price_per_unit: 50n },
};
const result = stark.resourceBoundsToHexString(resourceBoundsBN);
// result = {
//   l1_gas: { max_amount: '0x3e8', max_price_per_unit: '0x64' },
//   l2_gas: { max_amount: '0x7d0', max_price_per_unit: '0xc8' },
//   l1_data_gas: { max_amount: '0x1f4', max_price_per_unit: '0x32' }
// }
```
