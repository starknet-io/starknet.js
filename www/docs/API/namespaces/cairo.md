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

Test if an ABI comes from a Cairo 1 contract

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

[src/utils/calldata/cairo.ts:44](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/calldata/cairo.ts#L44)

---

### felt

▸ **felt**(`it`): `string`

Create felt Cairo type (cairo type helper)

#### Parameters

| Name | Type                                    |
| :--- | :-------------------------------------- |
| `it` | [`BigNumberish`](types.md#bignumberish) |

#### Returns

`string`

format: felt-string

#### Defined in

[src/utils/calldata/cairo.ts:101](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/calldata/cairo.ts#L101)

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

[src/utils/calldata/cairo.ts:7](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/calldata/cairo.ts#L7)

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

[src/utils/calldata/cairo.ts:8](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/calldata/cairo.ts#L8)

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

[src/utils/calldata/cairo.ts:9](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/calldata/cairo.ts#L9)

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

[src/utils/calldata/cairo.ts:13](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/calldata/cairo.ts#L13)

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

[src/utils/calldata/cairo.ts:14](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/calldata/cairo.ts#L14)

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

[src/utils/calldata/cairo.ts:15](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/calldata/cairo.ts#L15)

---

### isTypeEnum

▸ **isTypeEnum**(`type`, `enums`): `boolean`

#### Parameters

| Name    | Type                            |
| :------ | :------------------------------ |
| `type`  | `string`                        |
| `enums` | [`AbiEnums`](types.md#abienums) |

#### Returns

`boolean`

#### Defined in

[src/utils/calldata/cairo.ts:16](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/calldata/cairo.ts#L16)

---

### isTypeOption

▸ **isTypeOption**(`type`): `boolean`

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `type` | `string` |

#### Returns

`boolean`

#### Defined in

[src/utils/calldata/cairo.ts:17](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/calldata/cairo.ts#L17)

---

### isTypeResult

▸ **isTypeResult**(`type`): `boolean`

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `type` | `string` |

#### Returns

`boolean`

#### Defined in

[src/utils/calldata/cairo.ts:18](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/calldata/cairo.ts#L18)

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

[src/utils/calldata/cairo.ts:19](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/calldata/cairo.ts#L19)

---

### isTypeLitteral

▸ **isTypeLitteral**(`type`): `boolean`

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `type` | `string` |

#### Returns

`boolean`

#### Defined in

[src/utils/calldata/cairo.ts:20](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/calldata/cairo.ts#L20)

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

[src/utils/calldata/cairo.ts:21](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/calldata/cairo.ts#L21)

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

[src/utils/calldata/cairo.ts:22](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/calldata/cairo.ts#L22)

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

[src/utils/calldata/cairo.ts:23](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/calldata/cairo.ts#L23)

---

### isTypeEthAddress

▸ **isTypeEthAddress**(`type`): `boolean`

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `type` | `string` |

#### Returns

`boolean`

#### Defined in

[src/utils/calldata/cairo.ts:25](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/calldata/cairo.ts#L25)

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

[src/utils/calldata/cairo.ts:27](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/calldata/cairo.ts#L27)

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

[src/utils/calldata/cairo.ts:28](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/calldata/cairo.ts#L28)

---

### uint256

▸ **uint256**(`it`): [`Uint256`](../interfaces/types.Uint256.md)

Create Uint256 Cairo type (helper for common struct type)

**`Example`**

```typescript
uint256('892349863487563453485768723498');
```

#### Parameters

| Name | Type                                    |
| :--- | :-------------------------------------- |
| `it` | [`BigNumberish`](types.md#bignumberish) |

#### Returns

[`Uint256`](../interfaces/types.Uint256.md)

#### Defined in

[src/utils/calldata/cairo.ts:75](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/calldata/cairo.ts#L75)

---

### tuple

▸ **tuple**(`...args`): `Record`<`number`, `boolean` \| `object` \| [`BigNumberish`](types.md#bignumberish)\>

Create unnamed tuple Cairo type (helper same as common struct type)

**`Example`**

```typescript
tuple(1,'0x101',16);
```

#### Parameters

| Name      | Type                                                                 |
| :-------- | :------------------------------------------------------------------- |
| `...args` | (`boolean` \| `object` \| [`BigNumberish`](types.md#bignumberish))[] |

#### Returns

`Record`<`number`, `boolean` \| `object` \| [`BigNumberish`](types.md#bignumberish)\>

#### Defined in

[src/utils/calldata/cairo.ts:93](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/calldata/cairo.ts#L93)
