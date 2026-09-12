# Function: resourceBoundsToEstimateFeeResponse()

> **resourceBoundsToEstimateFeeResponse**(`resourceBounds`): [`EstimateFeeResponseOverhead`](../../../../type-aliases/EstimateFeeResponseOverhead.md)

Defined in: [src/utils/stark/index.ts:319](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/stark/index.ts#L319)

Converts a resource bounds to an estimate fee response. No overhead is applied.

## Parameters

### resourceBounds

[`ResourceBoundsBN`](../../../../type-aliases/ResourceBoundsBN.md)

The resource bounds to convert.

## Returns

[`EstimateFeeResponseOverhead`](../../../../type-aliases/EstimateFeeResponseOverhead.md)

The estimate fee response.

## Example

```typescript
const resourceBounds = {
  l1_gas: { max_amount: 1000n, max_price_per_unit: 100n },
  l2_gas: { max_amount: 2000n, max_price_per_unit: 200n },
  l1_data_gas: { max_amount: 500n, max_price_per_unit: 50n },
};
const result = stark.resourceBoundsToEstimateFeeResponse(resourceBounds);
// result = {
//   resourceBounds: resourceBounds,
//   overall_fee: 129000n,
//   unit: 'FRI'
// }
```
