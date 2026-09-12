# Function: toOverheadOverallFee()

> **toOverheadOverallFee**(`estimate`, `overhead?`): `bigint`

Defined in: [src/utils/stark/index.ts:358](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/stark/index.ts#L358)

Calculates the overall fee for a transaction based on resource consumption and prices.

The estimated fee for the transaction (in wei or fri, depending on the tx version), equals to:
l1_gas_consumed*l1_gas_price + l1_data_gas_consumed*l1_data_gas_price + l2_gas_consumed\*l2_gas_price

## Parameters

### estimate

The fee estimate containing gas consumption and price data

#### unit

`"FRI"`

#### l1_gas_price

`string`

#### l2_gas_price

`string`

#### l1_data_gas_price

`string`

#### l1_gas_consumed

`string`

#### l2_gas_consumed

`string`

#### l1_data_gas_consumed

`string`

#### overall_fee

`string`

### overhead?

`false` \| [`ResourceBoundsOverhead`](../../../../type-aliases/ResourceBoundsOverhead.md)

The overhead percentage. Pass `false` to disable overhead.

## Returns

`bigint`

The calculated overall fee in wei or fri

## Example

```typescript
const estimate = {
  l1_gas_consumed: 1000n,
  l1_gas_price: 100n,
  l1_data_gas_consumed: 500n,
  l1_data_gas_price: 50n,
  l2_gas_consumed: 200n,
  l2_gas_price: 20n,
};
const result = stark.toOverheadOverallFee(estimate, overhead);
// result = 1000n * 100n + 500n * 50n + 200n * 20n = 129000n
```
