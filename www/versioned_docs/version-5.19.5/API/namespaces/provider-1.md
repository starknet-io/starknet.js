---
id: 'provider-1'
title: 'Namespace: provider'
sidebar_label: 'provider'
sidebar_position: 0
custom_edit_url: null
---

## Functions

### wait

▸ **wait**(`delay`): `Promise`<`unknown`\>

#### Parameters

| Name    | Type     |
| :------ | :------- |
| `delay` | `number` |

#### Returns

`Promise`<`unknown`\>

#### Defined in

[src/utils/provider.ts:13](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/utils/provider.ts#L13)

---

### createSierraContractClass

▸ **createSierraContractClass**(`contract`): [`SierraContractClass`](types.md#sierracontractclass)

#### Parameters

| Name       | Type                                        |
| :--------- | :------------------------------------------ |
| `contract` | [`CompiledSierra`](types.md#compiledsierra) |

#### Returns

[`SierraContractClass`](types.md#sierracontractclass)

#### Defined in

[src/utils/provider.ts:19](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/utils/provider.ts#L19)

---

### parseContract

▸ **parseContract**(`contract`): [`ContractClass`](types.md#contractclass)

#### Parameters

| Name       | Type                                                        |
| :--------- | :---------------------------------------------------------- |
| `contract` | `string` \| [`CompiledContract`](types.md#compiledcontract) |

#### Returns

[`ContractClass`](types.md#contractclass)

#### Defined in

[src/utils/provider.ts:29](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/utils/provider.ts#L29)
