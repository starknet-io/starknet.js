---
id: 'num'
title: 'Namespace: num'
sidebar_label: 'num'
sidebar_position: 0
custom_edit_url: null
---

## References

### BigNumberish

Re-exports [BigNumberish](types.md#bignumberish)

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

[src/utils/num.ts:10](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/num.ts#L10)

---

### toBigInt

▸ **toBigInt**(`value`): `bigint`

#### Parameters

| Name    | Type                                    |
| :------ | :-------------------------------------- |
| `value` | [`BigNumberish`](types.md#bignumberish) |

#### Returns

`bigint`

#### Defined in

[src/utils/num.ts:14](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/num.ts#L14)

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

[src/utils/num.ts:18](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/num.ts#L18)

---

### toHex

▸ **toHex**(`number`): `string`

#### Parameters

| Name     | Type                                    |
| :------- | :-------------------------------------- |
| `number` | [`BigNumberish`](types.md#bignumberish) |

#### Returns

`string`

#### Defined in

[src/utils/num.ts:22](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/num.ts#L22)

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

[src/utils/num.ts:26](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/num.ts#L26)

---

### assertInRange

▸ **assertInRange**(`input`, `lowerBound`, `upperBound`, `inputName?`): `void`

#### Parameters

| Name         | Type                                    | Default value |
| :----------- | :-------------------------------------- | :------------ |
| `input`      | [`BigNumberish`](types.md#bignumberish) | `undefined`   |
| `lowerBound` | [`BigNumberish`](types.md#bignumberish) | `undefined`   |
| `upperBound` | [`BigNumberish`](types.md#bignumberish) | `undefined`   |
| `inputName`  | `string`                                | `''`          |

#### Returns

`void`

#### Defined in

[src/utils/num.ts:42](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/num.ts#L42)

---

### bigNumberishArrayToDecimalStringArray

▸ **bigNumberishArrayToDecimalStringArray**(`rawCalldata`): `string`[]

#### Parameters

| Name          | Type                                      |
| :------------ | :---------------------------------------- |
| `rawCalldata` | [`BigNumberish`](types.md#bignumberish)[] |

#### Returns

`string`[]

#### Defined in

[src/utils/num.ts:59](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/num.ts#L59)

---

### bigNumberishArrayToHexadecimalStringArray

▸ **bigNumberishArrayToHexadecimalStringArray**(`rawCalldata`): `string`[]

#### Parameters

| Name          | Type                                      |
| :------------ | :---------------------------------------- |
| `rawCalldata` | [`BigNumberish`](types.md#bignumberish)[] |

#### Returns

`string`[]

#### Defined in

[src/utils/num.ts:63](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/num.ts#L63)

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

[src/utils/num.ts:70](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/num.ts#L70)

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

[src/utils/num.ts:80](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/num.ts#L80)

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

[src/utils/num.ts:90](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/num.ts#L90)

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

[src/utils/num.ts:101](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/num.ts#L101)

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

[src/utils/num.ts:34](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/num.ts#L34)

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

[src/utils/num.ts:67](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/num.ts#L67)

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

[src/utils/num.ts:68](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/num.ts#L68)

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

[src/utils/num.ts:94](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/num.ts#L94)
