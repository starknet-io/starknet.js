# Type Alias: STRK20_ACTION

> **STRK20_ACTION** = [`STRK20_DEPOSIT_ACTION`](STRK20_DEPOSIT_ACTION.md) \| [`STRK20_WITHDRAW_ACTION`](STRK20_WITHDRAW_ACTION.md) \| [`STRK20_TRANSFER_ACTION`](STRK20_TRANSFER_ACTION.md) \| [`STRK20_INVOKE_ACTION`](STRK20_INVOKE_ACTION.md) \| [`STRK20_SHADOW_ACCOUNT_INVOKE_ACTION`](STRK20_SHADOW_ACCOUNT_INVOKE_ACTION.md)

Defined in: [src/wallet/types/strk20.type.ts:65](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/wallet/types/strk20.type.ts#L65)

A single action to perform via the STRK20 privacy protocol. The `type` field
discriminates the variant.

## Example

```typescript
const actions: STRK20_ACTION[] = [
  {
    type: 'withdraw',
    token: strkAddress,
    amount: '0x2386f26fc10000',
    recipient: shadowAccountAddr,
  },
  { type: 'transfer', token: strkAddress, amount: 'OPEN', recipient: myAddress },
  {
    type: 'shadow_account_invoke',
    dapp_name: 'myDapp',
    nonce: '0x0',
    calls: [myContract.populate('stake', { amount: 1000n })],
    collect_policy: { type: 'all' },
  },
];
```
