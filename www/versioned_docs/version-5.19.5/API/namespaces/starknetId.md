---
id: 'starknetId'
title: 'Namespace: starknetId'
sidebar_label: 'starknetId'
sidebar_position: 0
custom_edit_url: null
---

## Enumerations

- [StarknetIdContract](../enums/starknetId.StarknetIdContract.md)

## Functions

### useDecoded

▸ **useDecoded**(`encoded`): `string`

#### Parameters

| Name      | Type       |
| :-------- | :--------- |
| `encoded` | `bigint`[] |

#### Returns

`string`

#### Defined in

[src/utils/starknetId.ts:20](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/utils/starknetId.ts#L20)

---

### useEncoded

▸ **useEncoded**(`decoded`): `bigint`

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `decoded` | `string` |

#### Returns

`bigint`

#### Defined in

[src/utils/starknetId.ts:61](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/utils/starknetId.ts#L61)

---

### getStarknetIdContract

▸ **getStarknetIdContract**(`chainId`): `string`

#### Parameters

| Name      | Type                                                       |
| :-------- | :--------------------------------------------------------- |
| `chainId` | [`StarknetChainId`](../enums/constants.StarknetChainId.md) |

#### Returns

`string`

#### Defined in

[src/utils/starknetId.ts:108](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/utils/starknetId.ts#L108)
