# Function: isPreConfirmedStateUpdate()

> **isPreConfirmedStateUpdate**(`response`): `response is { block_hash: never; state_diff: { storage_diffs: { address: string; storage_entries: { key: string; value: string }[] }[]; deprecated_declared_classes: string[]; declared_classes: { class_hash: string; compiled_class_hash: string }[]; deployed_contracts: { address: string; class_hash: string }[]; replaced_classes: { contract_address: string; class_hash: string }[]; nonces: { nonce: string; contract_address: string }[]; migrated_compiled_classes?: { class_hash: string; compiled_class_hash: string }[] }; old_root?: string }`

Defined in: [src/utils/resolve.ts:207](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/resolve.ts#L207)

Guard Pre Confirmed State Update

## Parameters

### response

[`StateUpdateResponse`](../type-aliases/StateUpdateResponse.md)

State of a block

## Returns

`response is { block_hash: never; state_diff: { storage_diffs: { address: string; storage_entries: { key: string; value: string }[] }[]; deprecated_declared_classes: string[]; declared_classes: { class_hash: string; compiled_class_hash: string }[]; deployed_contracts: { address: string; class_hash: string }[]; replaced_classes: { contract_address: string; class_hash: string }[]; nonces: { nonce: string; contract_address: string }[]; migrated_compiled_classes?: { class_hash: string; compiled_class_hash: string }[] }; old_root?: string }`

true if the block is pre confirmed

## Example

```typescript
const state: StateUpdateResponse = await myProvider.getStateUpdate('pre_confirmed');
const result = provider.isPreConfirmedStateUpdate(state);
// result = true
```
