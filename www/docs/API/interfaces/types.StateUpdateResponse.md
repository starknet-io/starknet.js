---
id: 'types.StateUpdateResponse'
title: 'Interface: StateUpdateResponse'
sidebar_label: 'StateUpdateResponse'
custom_edit_url: null
---

[types](../namespaces/types.md).StateUpdateResponse

## Properties

### block_hash

• `Optional` **block_hash**: `string`

#### Defined in

[src/types/provider/response.ts:162](https://github.com/0xs34n/starknet.js/blob/develop/src/types/provider/response.ts#L162)

---

### new_root

• `Optional` **new_root**: `string`

#### Defined in

[src/types/provider/response.ts:163](https://github.com/0xs34n/starknet.js/blob/develop/src/types/provider/response.ts#L163)

---

### old_root

• **old_root**: `string`

#### Defined in

[src/types/provider/response.ts:164](https://github.com/0xs34n/starknet.js/blob/develop/src/types/provider/response.ts#L164)

---

### state_diff

• **state_diff**: `Object`

#### Type declaration

| Name                           | Type                                                                                                                                     |
| :----------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------- |
| `storage_diffs`                | [`StorageDiffs`](../namespaces/types.RPC.md#storagediffs)                                                                                |
| `deployed_contracts`           | [`DeployedContracts`](../namespaces/types.Sequencer.md#deployedcontracts)                                                                |
| `nonces`                       | [`Nonces`](../namespaces/types.RPC.md#nonces)                                                                                            |
| `old_declared_contracts?`      | [`OldDeclaredContracts`](../namespaces/types.Sequencer.md#olddeclaredcontracts)                                                          |
| `declared_classes?`            | [`DeclaredClasses`](../namespaces/types.Sequencer.md#declaredclasses)                                                                    |
| `replaced_classes?`            | [`ReplacedClasses`](../namespaces/types.RPC.md#replacedclasses) \| [`ReplacedClasses`](../namespaces/types.Sequencer.md#replacedclasses) |
| `deprecated_declared_classes?` | [`DeprecatedDeclaredClasses`](../namespaces/types.RPC.md#deprecateddeclaredclasses)                                                      |

#### Defined in

[src/types/provider/response.ts:165](https://github.com/0xs34n/starknet.js/blob/develop/src/types/provider/response.ts#L165)
