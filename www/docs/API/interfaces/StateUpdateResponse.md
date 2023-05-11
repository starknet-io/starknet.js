---
id: 'StateUpdateResponse'
title: 'Interface: StateUpdateResponse'
sidebar_label: 'StateUpdateResponse'
sidebar_position: 0
custom_edit_url: null
---

## Properties

### block_hash

• **block_hash**: `string`

#### Defined in

[src/types/provider.ts:154](https://github.com/0xs34n/starknet.js/blob/develop/src/types/provider.ts#L154)

---

### new_root

• **new_root**: `string`

#### Defined in

[src/types/provider.ts:155](https://github.com/0xs34n/starknet.js/blob/develop/src/types/provider.ts#L155)

---

### old_root

• **old_root**: `string`

#### Defined in

[src/types/provider.ts:156](https://github.com/0xs34n/starknet.js/blob/develop/src/types/provider.ts#L156)

---

### state_diff

• **state_diff**: `Object`

#### Type declaration

| Name                        | Type                                                                      |
| :-------------------------- | :------------------------------------------------------------------------ |
| `storage_diffs`             | [`StorageDiffs`](../namespaces/RPC.md#storagediffs)                       |
| `declared_contract_hashes?` | [`DeclaredContractHashes`](../namespaces/RPC.md#declaredcontracthashes)   |
| `deployed_contracts`        | [`DeployedContracts`](../namespaces/Sequencer.md#deployedcontracts)       |
| `nonces`                    | [`Nonces`](../namespaces/RPC.md#nonces)                                   |
| `old_declared_contracts?`   | [`OldDeclaredContracts`](../namespaces/Sequencer.md#olddeclaredcontracts) |
| `declared_classes?`         | [`DeclaredClasses`](../namespaces/Sequencer.md#declaredclasses)           |
| `replaced_classes?`         | [`ReplacedClasses`](../namespaces/Sequencer.md#replacedclasses)           |

#### Defined in

[src/types/provider.ts:157](https://github.com/0xs34n/starknet.js/blob/develop/src/types/provider.ts#L157)
