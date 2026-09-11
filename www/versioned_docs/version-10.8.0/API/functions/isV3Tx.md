# Function: isV3Tx()

> **isV3Tx**(`details`): `details is V3TransactionDetails`

Defined in: [src/utils/resolve.ts:36](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/resolve.ts#L36)

Check if the given transaction details is a V3 transaction.

## Parameters

### details

[`InvocationsDetailsWithNonce`](../type-aliases/InvocationsDetailsWithNonce.md)

The transaction details to be checked.

## Returns

`details is V3TransactionDetails`

Returns true if the transaction is a V3 transaction, otherwise false.

## Example

```typescript
const invocation: InvocationsDetailsWithNonce = {
  nonce: 1,
  version: 3,
  maxFee: 10 ** 15,
  feeDataAvailabilityMode: RPC.EDataAvailabilityMode.L1,
  tip: 10 ** 13,
  paymasterData: [],
  resourceBounds: {
    l1_gas: { max_amount: num.toHex(10 ** 14), max_price_per_unit: num.toHex(50) },
    l2_gas: { max_amount: num.toHex(0), max_price_per_unit: num.toHex(0) },
  },
};
const result = provider.isV3Tx(invocation);
// result = true
```
