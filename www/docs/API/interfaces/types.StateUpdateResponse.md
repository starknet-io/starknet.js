---
id: 'types.StateUpdateResponse'
title: 'Interface: StateUpdateResponse'
sidebar_label: 'StateUpdateResponse'
custom_edit_url: null
---

[types](../namespaces/types.md).StateUpdateResponse

## Properties

### block_hash

• **block_hash**: `string`

#### Defined in

[src/types/provider/response.ts:154](https://github.com/0xs34n/starknet.js/blob/develop/src/types/provider/response.ts#L154)

---

### new_root

• **new_root**: `string`

#### Defined in

[src/types/provider/response.ts:155](https://github.com/0xs34n/starknet.js/blob/develop/src/types/provider/response.ts#L155)

---

### old_root

• **old_root**: `string`

#### Defined in

[src/types/provider/response.ts:156](https://github.com/0xs34n/starknet.js/blob/develop/src/types/provider/response.ts#L156)

---

### state_diff

• **state_diff**: `Object`

#### Type declaration

| Name                        | Type                                                                            |
| :-------------------------- | :------------------------------------------------------------------------------ |
| `storage_diffs`             | [`StorageDiffs`](../namespaces/types.RPC.md#storagediffs)                       |
| `declared_contract_hashes?` | [`DeclaredContractHashes`](../namespaces/types.RPC.md#declaredcontracthashes)   |
| `deployed_contracts`        | [`DeployedContracts`](../namespaces/types.Sequencer.md#deployedcontracts)       |
| `nonces`                    | [`Nonces`](../namespaces/types.RPC.md#nonces)                                   |
| `old_declared_contracts?`   | [`OldDeclaredContracts`](../namespaces/types.Sequencer.md#olddeclaredcontracts) |
| `declared_classes?`         | [`DeclaredClasses`](../namespaces/types.Sequencer.md#declaredclasses)           |
| `replaced_classes?`         | [`ReplacedClasses`](../namespaces/types.Sequencer.md#replacedclasses)           |

#### Defined in

[src/types/provider/response.ts:157](https://github.com/0xs34n/starknet.js/blob/develop/src/types/provider/response.ts#L157)
