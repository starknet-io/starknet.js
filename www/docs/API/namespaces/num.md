---
id: 'num'
title: 'Namespace: num'
sidebar_label: 'num'
sidebar_position: 0
custom_edit_url: null
---

## Type Aliases

### BigNumberish

Ƭ **BigNumberish**: `string` \| `number` \| `bigint`

#### Defined in

[src/utils/num.ts:4](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/utils/num.ts#L4)

## Functions

### isHex

▸ **isHex**(`hex`): `boolean`

#### Parameters

| Name  | Type     |
| :---- | :------- |
| `hex` | `string` |

#### Returns

`boolean`

#### Defined in

[src/utils/num.ts:6](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/utils/num.ts#L6)

---

### toBigInt

▸ **toBigInt**(`value`): `bigint`

#### Parameters

| Name    | Type                                  |
| :------ | :------------------------------------ |
| `value` | [`BigNumberish`](num.md#bignumberish) |

#### Returns

`bigint`

#### Defined in

[src/utils/num.ts:10](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/utils/num.ts#L10)

---

### isBigInt

▸ **isBigInt**(`value`): value is bigint

#### Parameters

| Name    | Type  |
| :------ | :---- |
| `value` | `any` |

#### Returns

value is bigint

#### Defined in

[src/utils/num.ts:14](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/utils/num.ts#L14)

---

### toHex

▸ **toHex**(`number`): `string`

#### Parameters

| Name     | Type                                  |
| :------- | :------------------------------------ |
| `number` | [`BigNumberish`](num.md#bignumberish) |

#### Returns

`string`

#### Defined in

[src/utils/num.ts:18](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/utils/num.ts#L18)

---

### hexToDecimalString

▸ **hexToDecimalString**(`hex`): `string`

#### Parameters

| Name  | Type     |
| :---- | :------- |
| `hex` | `string` |

#### Returns

`string`

#### Defined in

[src/utils/num.ts:22](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/utils/num.ts#L22)

---

### assertInRange

▸ **assertInRange**(`input`, `lowerBound`, `upperBound`, `inputName?`): `void`

#### Parameters

| Name         | Type                                  | Default value |
| :----------- | :------------------------------------ | :------------ |
| `input`      | [`BigNumberish`](num.md#bignumberish) | `undefined`   |
| `lowerBound` | [`BigNumberish`](num.md#bignumberish) | `undefined`   |
| `upperBound` | [`BigNumberish`](num.md#bignumberish) | `undefined`   |
| `inputName`  | `string`                              | `''`          |

#### Returns

`void`

#### Defined in

[src/utils/num.ts:38](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/utils/num.ts#L38)

---

### bigNumberishArrayToDecimalStringArray

▸ **bigNumberishArrayToDecimalStringArray**(`rawCalldata`): `string`[]

#### Parameters

| Name          | Type                                    |
| :------------ | :-------------------------------------- |
| `rawCalldata` | [`BigNumberish`](num.md#bignumberish)[] |

#### Returns

`string`[]

#### Defined in

[src/utils/num.ts:55](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/utils/num.ts#L55)

---

### bigNumberishArrayToHexadecimalStringArray

▸ **bigNumberishArrayToHexadecimalStringArray**(`rawCalldata`): `string`[]

#### Parameters

| Name          | Type                                    |
| :------------ | :-------------------------------------- |
| `rawCalldata` | [`BigNumberish`](num.md#bignumberish)[] |

#### Returns

`string`[]

#### Defined in

[src/utils/num.ts:59](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/utils/num.ts#L59)

---

### getDecimalString

▸ **getDecimalString**(`value`): `string`

#### Parameters

| Name    | Type     |
| :------ | :------- |
| `value` | `string` |

#### Returns

`string`

#### Defined in

[src/utils/num.ts:66](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/utils/num.ts#L66)

---

### getHexString

▸ **getHexString**(`value`): `string`

#### Parameters

| Name    | Type     |
| :------ | :------- |
| `value` | `string` |

#### Returns

`string`

#### Defined in

[src/utils/num.ts:76](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/utils/num.ts#L76)

---

### getHexStringArray

▸ **getHexStringArray**(`value`): `string`[]

#### Parameters

| Name    | Type       |
| :------ | :--------- |
| `value` | `string`[] |

#### Returns

`string`[]

#### Defined in

[src/utils/num.ts:86](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/utils/num.ts#L86)

---

### cleanHex

▸ **cleanHex**(`hex`): `string`

Remove hex string leading zero and lower case '0x01A'.. -> '0x1a..'

#### Parameters

| Name  | Type     | Description |
| :---- | :------- | :---------- |
| `hex` | `string` | string      |

#### Returns

`string`

#### Defined in

[src/utils/num.ts:30](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/utils/num.ts#L30)

---

### isStringWholeNumber

▸ **isStringWholeNumber**(`value`): `boolean`

#### Parameters

| Name    | Type     |
| :------ | :------- |
| `value` | `string` |

#### Returns

`boolean`

#### Defined in

[src/utils/num.ts:63](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/utils/num.ts#L63)

---

### toHexString

▸ **toHexString**(`value`): `string`

#### Parameters

| Name    | Type     |
| :------ | :------- |
| `value` | `string` |

#### Returns

`string`

#### Defined in

[src/utils/num.ts:64](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/utils/num.ts#L64)

---

### toCairoBool

▸ **toCairoBool**(`value`): `string`

#### Parameters

| Name    | Type      |
| :------ | :-------- |
| `value` | `boolean` |

#### Returns

`string`

#### Defined in

[src/utils/num.ts:90](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/utils/num.ts#L90)
