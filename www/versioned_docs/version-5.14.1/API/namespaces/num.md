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

[src/utils/num.ts:10](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/utils/num.ts#L10)

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

[src/utils/num.ts:14](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/utils/num.ts#L14)

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

[src/utils/num.ts:18](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/utils/num.ts#L18)

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

[src/utils/num.ts:22](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/utils/num.ts#L22)

---

### toStorageKey

▸ **toStorageKey**(`number`): `string`

Convert BigNumberish to STORAGE_KEY
Same as toHex but conforming pattern STORAGE_KEY pattern ^0x0[0-7]{1}[a-fA-F0-9]{0,62}$
A storage key. Represented as up to 62 hex digits, 3 bits, and 5 leading zeroes.
0x0 + [0-7] + 62 hex = 0x + 64 hex

#### Parameters

| Name     | Type                                    | Description  |
| :------- | :-------------------------------------- | :----------- |
| `number` | [`BigNumberish`](types.md#bignumberish) | BigNumberish |

#### Returns

`string`

#### Defined in

[src/utils/num.ts:33](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/utils/num.ts#L33)

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

[src/utils/num.ts:38](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/utils/num.ts#L38)

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

[src/utils/num.ts:54](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/utils/num.ts#L54)

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

[src/utils/num.ts:71](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/utils/num.ts#L71)

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

[src/utils/num.ts:75](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/utils/num.ts#L75)

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

[src/utils/num.ts:82](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/utils/num.ts#L82)

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

[src/utils/num.ts:92](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/utils/num.ts#L92)

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

[src/utils/num.ts:102](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/utils/num.ts#L102)

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

[src/utils/num.ts:113](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/utils/num.ts#L113)

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

[src/utils/num.ts:46](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/utils/num.ts#L46)

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

[src/utils/num.ts:79](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/utils/num.ts#L79)

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

[src/utils/num.ts:80](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/utils/num.ts#L80)

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

[src/utils/num.ts:106](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/utils/num.ts#L106)
