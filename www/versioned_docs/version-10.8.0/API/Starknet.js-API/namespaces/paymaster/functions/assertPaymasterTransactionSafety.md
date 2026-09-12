# Function: assertPaymasterTransactionSafety()

> **assertPaymasterTransactionSafety**(`preparedTransaction`, `calls`, `paymasterDetails`, `chainId`, `maxFeeInGasToken?`): `void`

Defined in: [src/utils/paymaster.ts:239](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/paymaster.ts#L239)

Asserts that a paymaster-prepared transaction is safe to sign: the typed-data domain is
bound to the account's own chain, and — for non-sponsored transactions — the calls and the
appended gas-token transfer match what the user actually requested.

## Parameters

### preparedTransaction

[`PreparedTransaction`](../../../../type-aliases/PreparedTransaction.md)

The transaction returned by the paymaster.

### calls

[`Call`](../../../../type-aliases/Call.md)[]

The calls originally requested by the user.

### paymasterDetails

[`PaymasterDetails`](../../../../interfaces/PaymasterDetails.md)

The fee mode and related paymaster details.

### chainId

`"0x534e5f4d41494e"` \| `"0x534e5f5345504f4c4941"`

The chain id of the account's own provider.

### maxFeeInGasToken?

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)

Optional user-approved ceiling on the gas-token fee.

## Returns

`void`

## Throws

Throws an error if any of the above safety properties do not hold.

## Example

```typescript
assertPaymasterTransactionSafety(
  preparedTransaction,
  calls,
  { feeMode: { mode: 'default', gasToken: strkAddress } },
  constants.StarknetChainId.SN_SEPOLIA
);
// does not throw if preparedTransaction is exactly what was requested
```
