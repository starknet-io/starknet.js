# Function: resourceBoundsToBigInt()

> **resourceBoundsToBigInt**(`resourceBounds`): [`ResourceBoundsBN`](../../../../type-aliases/ResourceBoundsBN.md)

Defined in: [src/utils/stark/index.ts:573](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/stark/index.ts#L573)

Converts ResourceBounds (with string values) to ResourceBoundsBN (with BigInt values)

## Parameters

### resourceBounds

The resource bounds with string values

#### l1_gas

\{ `max_amount`: `string`; `max_price_per_unit`: `string`; \}

#### l1_gas.max_amount

`string`

#### l1_gas.max_price_per_unit

`string`

#### l1_data_gas

\{ `max_amount`: `string`; `max_price_per_unit`: `string`; \}

#### l1_data_gas.max_amount

`string`

#### l1_data_gas.max_price_per_unit

`string`

#### l2_gas

\{ `max_amount`: `string`; `max_price_per_unit`: `string`; \}

#### l2_gas.max_amount

`string`

#### l2_gas.max_price_per_unit

`string`

## Returns

[`ResourceBoundsBN`](../../../../type-aliases/ResourceBoundsBN.md)

The resource bounds with BigInt values

## Example

```typescript
const resourceBounds = {
  l1_gas: { max_amount: '0x3e8', max_price_per_unit: '0x64' },
  l2_gas: { max_amount: '0x7d0', max_price_per_unit: '0xc8' },
  l1_data_gas: { max_amount: '0x1f4', max_price_per_unit: '0x32' },
};
const result = stark.resourceBoundsToBigInt(resourceBounds);
// result = {
//   l1_gas: { max_amount: 1000n, max_price_per_unit: 100n },
//   l2_gas: { max_amount: 2000n, max_price_per_unit: 200n },
//   l1_data_gas: { max_amount: 500n, max_price_per_unit: 50n }
// }
```
