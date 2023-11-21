---
id: 'uint256'
title: 'Namespace: uint256'
sidebar_label: 'uint256'
sidebar_position: 0
custom_edit_url: null
---

## References

### Uint256

Re-exports [Uint256](../interfaces/types.Uint256.md)

## Variables

### UINT_128_MAX

• `Const` **UINT_128_MAX**: `bigint`

#### Defined in

[src/utils/uint256.ts:9](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/utils/uint256.ts#L9)

---

### UINT_256_MAX

• `Const` **UINT_256_MAX**: `bigint`

#### Defined in

[src/utils/uint256.ts:10](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/utils/uint256.ts#L10)

## Functions

### uint256ToBN

▸ **uint256ToBN**(`uint256`): `bigint`

Convert Uint256 to bigint

#### Parameters

| Name      | Type                                        |
| :-------- | :------------------------------------------ |
| `uint256` | [`Uint256`](../interfaces/types.Uint256.md) |

#### Returns

`bigint`

#### Defined in

[src/utils/uint256.ts:15](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/utils/uint256.ts#L15)

---

### isUint256

▸ **isUint256**(`bn`): `boolean`

Test BigNumberish is smaller or equal 2\*\*256-1

#### Parameters

| Name | Type                                    |
| :--- | :-------------------------------------- |
| `bn` | [`BigNumberish`](types.md#bignumberish) |

#### Returns

`boolean`

#### Defined in

[src/utils/uint256.ts:22](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/utils/uint256.ts#L22)

---

### bnToUint256

▸ **bnToUint256**(`bn`): [`Uint256`](../interfaces/types.Uint256.md)

Convert BigNumberish (string | number | bigint) to Uint256 (hex)

#### Parameters

| Name | Type                                    |
| :--- | :-------------------------------------- |
| `bn` | [`BigNumberish`](types.md#bignumberish) |

#### Returns

[`Uint256`](../interfaces/types.Uint256.md)

#### Defined in

[src/utils/uint256.ts:29](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/utils/uint256.ts#L29)
