---
id: 'uint256'
title: 'Namespace: uint256'
sidebar_label: 'uint256'
sidebar_position: 0
custom_edit_url: null
---

## Interfaces

- [Uint256](../interfaces/uint256.Uint256.md)

## Variables

### UINT_128_MAX

• `Const` **UINT_128_MAX**: `bigint`

#### Defined in

[src/utils/uint256.ts:18](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/uint256.ts#L18)

---

### UINT_256_MAX

• `Const` **UINT_256_MAX**: `bigint`

#### Defined in

[src/utils/uint256.ts:19](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/uint256.ts#L19)

## Functions

### uint256ToBN

▸ **uint256ToBN**(`uint256`): `bigint`

#### Parameters

| Name      | Type                                          |
| :-------- | :-------------------------------------------- |
| `uint256` | [`Uint256`](../interfaces/uint256.Uint256.md) |

#### Returns

`bigint`

#### Defined in

[src/utils/uint256.ts:14](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/uint256.ts#L14)

---

### isUint256

▸ **isUint256**(`bn`): `boolean`

#### Parameters

| Name | Type                                  |
| :--- | :------------------------------------ |
| `bn` | [`BigNumberish`](num.md#bignumberish) |

#### Returns

`boolean`

#### Defined in

[src/utils/uint256.ts:21](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/uint256.ts#L21)

---

### bnToUint256

▸ **bnToUint256**(`bignumber`): [`Uint256`](../interfaces/uint256.Uint256.md)

#### Parameters

| Name        | Type                                  |
| :---------- | :------------------------------------ |
| `bignumber` | [`BigNumberish`](num.md#bignumberish) |

#### Returns

[`Uint256`](../interfaces/uint256.Uint256.md)

#### Defined in

[src/utils/uint256.ts:26](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/uint256.ts#L26)
