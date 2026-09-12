# Type Alias: STRK20_CALL_AND_PROOF

> **STRK20_CALL_AND_PROOF** = `Omit`\<[`STRK20_CALL_AND_PROOF`](../Starknet.js-API/namespaces/RPC/type-aliases/STRK20_CALL_AND_PROOF.md), `"call"`\> & `object`

Defined in: [src/wallet/types/strk20.type.ts:87](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/wallet/types/strk20.type.ts#L87)

A Starknet call built by the wallet, together with the SNIP-36 zero-knowledge proof
needed to submit it. In simulate mode the proof fields are present but empty, in which
case the call is not submittable on-chain and is only useful for fee estimation or UI
previews.

## Type Declaration

### call

> **call**: [`Call`](Call.md)

The Starknet call to submit.

## Example

```typescript
const { call, proof }: STRK20_CALL_AND_PROOF = await myWalletAccount.strk20PrepareInvoke(actions);
// `call` is a Starknet.js Call, ready to be submitted by the DAPP:
const { transaction_hash } = await mySponsorAccount.execute(call, {
  proof: proof.data,
  proofFacts: proof.proof_facts,
});
```
