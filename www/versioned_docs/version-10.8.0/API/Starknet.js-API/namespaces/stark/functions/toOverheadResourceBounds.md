# Function: toOverheadResourceBounds()

> **toOverheadResourceBounds**(`estimate`, `overhead?`): [`ResourceBoundsBN`](../../../../type-aliases/ResourceBoundsBN.md)

Defined in: [src/utils/stark/index.ts:262](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/stark/index.ts#L262)

Calculates the maximum resource bounds for fee estimation.

## Parameters

### estimate

The estimate for the fee.

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

The percentage overhead added to the max units and max price per unit. Pass `false` to disable overhead.

## Returns

[`ResourceBoundsBN`](../../../../type-aliases/ResourceBoundsBN.md)

The resource bounds with overhead represented as BigInt.

## Throws

If the estimate object is undefined or does not have the required properties.
