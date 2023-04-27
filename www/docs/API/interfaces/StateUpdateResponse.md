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

[src/types/provider.ts:150](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/provider.ts#L150)

---

### new_root

• **new_root**: `string`

#### Defined in

[src/types/provider.ts:151](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/provider.ts#L151)

---

### old_root

• **old_root**: `string`

#### Defined in

[src/types/provider.ts:152](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/provider.ts#L152)

---

### state_diff

• **state_diff**: `Object`

#### Type declaration

| Name                       | Type                                                           |
| :------------------------- | :------------------------------------------------------------- |
| `storage_diffs`            | [`StorageDiffItem`](../modules.md#storagediffitem)[]           |
| `declared_contract_hashes` | `string`[]                                                     |
| `deployed_contracts`       | [`DeployedContractItem`](../modules.md#deployedcontractitem)[] |
| `nonces`                   | [`Nonces`](../modules.md#nonces)[]                             |

#### Defined in

[src/types/provider.ts:153](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/provider.ts#L153)
