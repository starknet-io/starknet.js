---
id: 'uint256'
title: 'Namespace: uint256'
sidebar_label: 'uint256'
sidebar_position: 0
custom_edit_url: null
---

## Functions

### uint256ToBN

▸ **uint256ToBN**(`uint256`): `bigint`

Convert Uint256 to bigint
Legacy support Export

#### Parameters

| Name      | Type                                        | Description                        |
| :-------- | :------------------------------------------ | :--------------------------------- |
| `uint256` | [`Uint256`](../interfaces/types.Uint256.md) | Uint256 value to convert to bigint |

#### Returns

`bigint`

BigInt representation of the input Uint256

**`Example`**

```typescript
const uint256Value: Uint256 = { low: 1234567890, high: 1 };
const result = uint256.uint256ToBN(uint256Value);
// result = 340282366920938463463374607433002779346n
```

#### Defined in

[src/utils/uint256.ts:17](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/utils/uint256.ts#L17)

---

### isUint256

▸ **isUint256**(`bn`): `boolean`

Test BigNumberish is in the range[0, 2**256-1]
Legacy support Export

#### Parameters

| Name | Type                                    | Description   |
| :--- | :-------------------------------------- | :------------ |
| `bn` | [`BigNumberish`](types.md#bignumberish) | value to test |

#### Returns

`boolean`

True if the input value is in the range[0, 2**256-1], false otherwise

**`Example`**

```typescript
const result = uint256.isUint256(12345n);
// result = true
const result1 = uint256.isUint256(-1);
// result1 = false
```

#### Defined in

[src/utils/uint256.ts:34](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/utils/uint256.ts#L34)

---

### bnToUint256

▸ **bnToUint256**(`bn`): [`Uint256`](../interfaces/types.Uint256.md)

Convert BigNumberish (string | number | bigint) to Uint256
Legacy support Export

#### Parameters

| Name | Type                                    | Description                 |
| :--- | :-------------------------------------- | :-------------------------- |
| `bn` | [`BigNumberish`](types.md#bignumberish) | value to convert to Uint256 |

#### Returns

[`Uint256`](../interfaces/types.Uint256.md)

Uint256 object representing the BigNumberish value

**`Example`**

```typescript
const result = uint256.bnToUint256(1000000000n);
// result = {"low": "0x3b9aca00", "high": "0x0"}
```

#### Defined in

[src/utils/uint256.ts:49](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/utils/uint256.ts#L49)
