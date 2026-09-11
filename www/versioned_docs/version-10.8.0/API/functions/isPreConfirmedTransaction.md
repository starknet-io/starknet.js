# Function: isPreConfirmedTransaction()

> **isPreConfirmedTransaction**(`response`): `boolean`

Defined in: [src/utils/resolve.ts:192](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/resolve.ts#L192)

Guard Pre Confirmed Transaction

## Parameters

### response

[`GetTransactionReceiptResponse`](../type-aliases/GetTransactionReceiptResponse.md)

transaction Receipt

## Returns

`boolean`

true if the transaction is part of the pre confirmed block

## Example

```typescript
const block = await myProvider.getBlockWithTxs('pre_confirmed');
const txR = await myProvider.getTransactionReceipt(block.transactions[0].transaction_hash);
const result = provider.isPreConfirmedTransaction(txR);
// result = true
```
