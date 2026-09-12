# Function: v3Details()

> **v3Details**(`details`): `V3Details`

Defined in: [src/utils/stark/index.ts:486](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/stark/index.ts#L486)

Return provided or default v3 tx details

## Parameters

### details

[`UniversalDetails`](../../../../interfaces/UniversalDetails.md)

details of the transaction

## Returns

`V3Details`

an object including the V3 transaction details.

## Example

```typescript
const detail: UniversalDetails = { tip: 3456n };
const result = stark.v3Details(detail);
// result = {
//   tip: 3456n,
//   paymasterData: [],
//   accountDeploymentData: [],
//   nonceDataAvailabilityMode: 'L1',
//   feeDataAvailabilityMode: 'L1',
//   resourceBounds: {
//     l2_gas: { max_amount: '0x0', max_price_per_unit: '0x0' },
//     l1_gas: { max_amount: '0x0', max_price_per_unit: '0x0' }
//   }
// }
```
