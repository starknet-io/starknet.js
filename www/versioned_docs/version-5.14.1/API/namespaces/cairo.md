---
id: 'cairo'
title: 'Namespace: cairo'
sidebar_label: 'cairo'
sidebar_position: 0
custom_edit_url: null
---

## Enumerations

- [Uint](../enums/cairo.Uint.md)

## Functions

### isCairo1Abi

▸ **isCairo1Abi**(`abi`): `boolean`

tells if an ABI comes from a Cairo 1 contract

**`Example`**

```typescript
const isCairo1: boolean = isCairo1Abi(myAbi: Abi);
```

#### Parameters

| Name  | Type                  | Description                                    |
| :---- | :-------------------- | :--------------------------------------------- |
| `abi` | [`Abi`](types.md#abi) | representing the interface of a Cairo contract |

#### Returns

`boolean`

TRUE if it is an ABI from a Cairo1 contract

#### Defined in

[src/utils/calldata/cairo.ts:46](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/utils/calldata/cairo.ts#L46)

---

### felt

▸ **felt**(`it`): `string`

felt cairo type

#### Parameters

| Name | Type                                    |
| :--- | :-------------------------------------- |
| `it` | [`BigNumberish`](types.md#bignumberish) |

#### Returns

`string`

#### Defined in

[src/utils/calldata/cairo.ts:90](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/utils/calldata/cairo.ts#L90)

---

### isLen

▸ **isLen**(`name`): `boolean`

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `name` | `string` |

#### Returns

`boolean`

#### Defined in

[src/utils/calldata/cairo.ts:15](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/utils/calldata/cairo.ts#L15)

---

### isTypeFelt

▸ **isTypeFelt**(`type`): `boolean`

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `type` | `string` |

#### Returns

`boolean`

#### Defined in

[src/utils/calldata/cairo.ts:16](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/utils/calldata/cairo.ts#L16)

---

### isTypeArray

▸ **isTypeArray**(`type`): `boolean`

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `type` | `string` |

#### Returns

`boolean`

#### Defined in

[src/utils/calldata/cairo.ts:17](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/utils/calldata/cairo.ts#L17)

---

### isTypeTuple

▸ **isTypeTuple**(`type`): `boolean`

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `type` | `string` |

#### Returns

`boolean`

#### Defined in

[src/utils/calldata/cairo.ts:19](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/utils/calldata/cairo.ts#L19)

---

### isTypeNamedTuple

▸ **isTypeNamedTuple**(`type`): `boolean`

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `type` | `string` |

#### Returns

`boolean`

#### Defined in

[src/utils/calldata/cairo.ts:20](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/utils/calldata/cairo.ts#L20)

---

### isTypeStruct

▸ **isTypeStruct**(`type`, `structs`): `boolean`

#### Parameters

| Name      | Type                                |
| :-------- | :---------------------------------- |
| `type`    | `string`                            |
| `structs` | [`AbiStructs`](types.md#abistructs) |

#### Returns

`boolean`

#### Defined in

[src/utils/calldata/cairo.ts:21](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/utils/calldata/cairo.ts#L21)

---

### isTypeUint

▸ **isTypeUint**(`type`): `boolean`

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `type` | `string` |

#### Returns

`boolean`

#### Defined in

[src/utils/calldata/cairo.ts:22](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/utils/calldata/cairo.ts#L22)

---

### isTypeUint256

▸ **isTypeUint256**(`type`): `boolean`

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `type` | `string` |

#### Returns

`boolean`

#### Defined in

[src/utils/calldata/cairo.ts:23](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/utils/calldata/cairo.ts#L23)

---

### isTypeBool

▸ **isTypeBool**(`type`): `boolean`

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `type` | `string` |

#### Returns

`boolean`

#### Defined in

[src/utils/calldata/cairo.ts:24](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/utils/calldata/cairo.ts#L24)

---

### isTypeContractAddress

▸ **isTypeContractAddress**(`type`): `boolean`

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `type` | `string` |

#### Returns

`boolean`

#### Defined in

[src/utils/calldata/cairo.ts:25](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/utils/calldata/cairo.ts#L25)

---

### isCairo1Type

▸ **isCairo1Type**(`type`): `boolean`

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `type` | `string` |

#### Returns

`boolean`

#### Defined in

[src/utils/calldata/cairo.ts:27](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/utils/calldata/cairo.ts#L27)

---

### getArrayType

▸ **getArrayType**(`type`): `string`

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `type` | `string` |

#### Returns

`string`

#### Defined in

[src/utils/calldata/cairo.ts:29](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/utils/calldata/cairo.ts#L29)

---

### uint256

▸ **uint256**(`it`): [`Uint256`](../interfaces/types.Uint256.md)

Uint256 cairo type (helper for common struct type)

#### Parameters

| Name | Type                                    |
| :--- | :-------------------------------------- |
| `it` | [`BigNumberish`](types.md#bignumberish) |

#### Returns

[`Uint256`](../interfaces/types.Uint256.md)

#### Defined in

[src/utils/calldata/cairo.ts:69](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/utils/calldata/cairo.ts#L69)

---

### tuple

▸ **tuple**(`...args`): `Record`<`number`, `boolean` \| `object` \| [`BigNumberish`](types.md#bignumberish)\>

unnamed tuple cairo type (helper same as common struct type)

#### Parameters

| Name      | Type                                                                 |
| :-------- | :------------------------------------------------------------------- |
| `...args` | (`boolean` \| `object` \| [`BigNumberish`](types.md#bignumberish))[] |

#### Returns

`Record`<`number`, `boolean` \| `object` \| [`BigNumberish`](types.md#bignumberish)\>

#### Defined in

[src/utils/calldata/cairo.ts:83](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/utils/calldata/cairo.ts#L83)
