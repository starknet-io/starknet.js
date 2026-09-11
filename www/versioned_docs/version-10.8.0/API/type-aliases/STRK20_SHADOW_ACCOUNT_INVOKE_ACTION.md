# Type Alias: STRK20_SHADOW_ACCOUNT_INVOKE_ACTION

> **STRK20_SHADOW_ACCOUNT_INVOKE_ACTION** = `Omit`\<[`STRK20_SHADOW_ACCOUNT_INVOKE_ACTION`](../Starknet.js-API/namespaces/RPC/type-aliases/STRK20_SHADOW_ACCOUNT_INVOKE_ACTION.md), `"calls"`\> & `object`

Defined in: [src/wallet/types/strk20.type.ts:39](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/wallet/types/strk20.type.ts#L39)

Invokes one or more contract calls through the user's STRK20 shadow account for a DAPP,
routed via the shadow account anonymizer. The shadow account is selected by (`dapp_name`,
`nonce`); each nonce maps to a distinct, deterministic shadow account.

The proceeds of the calls are settled into the open notes created by `transfer` actions
with `amount: "OPEN"` in the same transaction, so the number of open notes filled by
this action must match the number of open notes created in the transaction.

## Type Declaration

### calls

> **calls**: [`Call`](Call.md)[]

The contract calls to execute through the shadow account, in order (min 1).

## Example

```typescript
const action: STRK20_SHADOW_ACCOUNT_INVOKE_ACTION = {
  type: 'shadow_account_invoke',
  dapp_name: 'myDapp',
  nonce: '0x0',
  calls: [myContract.populate('stake', { amount: 1000n })],
  collect_policy: { type: 'diff' },
};
```
