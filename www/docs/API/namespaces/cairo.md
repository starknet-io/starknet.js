---
id: 'cairo'
title: 'Namespace: cairo'
sidebar_label: 'cairo'
sidebar_position: 0
custom_edit_url: null
---

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

[src/utils/calldata/cairo.ts:37](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/calldata/cairo.ts#L37)

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

[src/utils/calldata/cairo.ts:85](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/calldata/cairo.ts#L85)

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

[src/utils/calldata/cairo.ts:6](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/calldata/cairo.ts#L6)

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

[src/utils/calldata/cairo.ts:7](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/calldata/cairo.ts#L7)

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

[src/utils/calldata/cairo.ts:8](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/calldata/cairo.ts#L8)

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

[src/utils/calldata/cairo.ts:10](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/calldata/cairo.ts#L10)

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

[src/utils/calldata/cairo.ts:11](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/calldata/cairo.ts#L11)

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

[src/utils/calldata/cairo.ts:12](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/calldata/cairo.ts#L12)

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

[src/utils/calldata/cairo.ts:13](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/calldata/cairo.ts#L13)

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

[src/utils/calldata/cairo.ts:14](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/calldata/cairo.ts#L14)

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

[src/utils/calldata/cairo.ts:15](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/calldata/cairo.ts#L15)

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

[src/utils/calldata/cairo.ts:16](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/calldata/cairo.ts#L16)

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

[src/utils/calldata/cairo.ts:18](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/calldata/cairo.ts#L18)

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

[src/utils/calldata/cairo.ts:20](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/calldata/cairo.ts#L20)

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

[src/utils/calldata/cairo.ts:64](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/calldata/cairo.ts#L64)

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

[src/utils/calldata/cairo.ts:78](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/calldata/cairo.ts#L78)
