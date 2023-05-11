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

[src/utils/num.ts:6](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/num.ts#L6)

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

[src/utils/num.ts:8](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/num.ts#L8)

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

[src/utils/num.ts:12](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/num.ts#L12)

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

[src/utils/num.ts:16](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/num.ts#L16)

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

[src/utils/num.ts:20](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/num.ts#L20)

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

[src/utils/num.ts:24](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/num.ts#L24)

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

[src/utils/num.ts:40](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/num.ts#L40)

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

[src/utils/num.ts:57](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/num.ts#L57)

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

[src/utils/num.ts:61](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/num.ts#L61)

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

[src/utils/num.ts:68](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/num.ts#L68)

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

[src/utils/num.ts:78](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/num.ts#L78)

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

[src/utils/num.ts:88](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/num.ts#L88)

---

### hexToBytes

▸ **hexToBytes**(`value`): `Uint8Array`

Convert a hex string to an array of Bytes (Uint8Array)

#### Parameters

| Name    | Type     | Description |
| :------ | :------- | :---------- |
| `value` | `string` | hex string  |

#### Returns

`Uint8Array`

an array of Bytes

#### Defined in

[src/utils/num.ts:99](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/num.ts#L99)

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

[src/utils/num.ts:32](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/num.ts#L32)

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

[src/utils/num.ts:65](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/num.ts#L65)

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

[src/utils/num.ts:66](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/num.ts#L66)

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

[src/utils/num.ts:92](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/num.ts#L92)
