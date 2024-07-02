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

Test if string is hex-string

#### Parameters

| Name  | Type     | Description |
| :---- | :------- | :---------- |
| `hex` | `string` | hex-string  |

#### Returns

`boolean`

#### Defined in

[src/utils/num.ts:14](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/utils/num.ts#L14)

---

### toBigInt

▸ **toBigInt**(`value`): `bigint`

Convert BigNumberish to bigint

#### Parameters

| Name    | Type                                    |
| :------ | :-------------------------------------- |
| `value` | [`BigNumberish`](types.md#bignumberish) |

#### Returns

`bigint`

#### Defined in

[src/utils/num.ts:21](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/utils/num.ts#L21)

---

### isBigInt

▸ **isBigInt**(`value`): value is bigint

Test if value is bigint

#### Parameters

| Name    | Type  |
| :------ | :---- |
| `value` | `any` |

#### Returns

value is bigint

#### Defined in

[src/utils/num.ts:28](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/utils/num.ts#L28)

---

### toHex

▸ **toHex**(`number`): `string`

Convert BigNumberish to hex-string

#### Parameters

| Name     | Type                                    |
| :------- | :-------------------------------------- |
| `number` | [`BigNumberish`](types.md#bignumberish) |

#### Returns

`string`

format: hex-string

#### Defined in

[src/utils/num.ts:36](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/utils/num.ts#L36)

---

### toStorageKey

▸ **toStorageKey**(`number`): `string`

Convert BigNumberish to storage-key-string

Same as toHex but conforming to the STORAGE_KEY pattern `^0x0[0-7]{1}[a-fA-F0-9]{0,62}$`.

A storage key is represented as up to 62 hex digits, 3 bits, and 5 leading zeroes:
`0x0 + [0-7] + 62 hex = 0x + 64 hex`

#### Parameters

| Name     | Type                                    |
| :------- | :-------------------------------------- |
| `number` | [`BigNumberish`](types.md#bignumberish) |

#### Returns

`string`

format: storage-key-string

#### Defined in

[src/utils/num.ts:54](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/utils/num.ts#L54)

---

### hexToDecimalString

▸ **hexToDecimalString**(`hex`): `string`

Convert hexadecimal string to decimal string

#### Parameters

| Name  | Type     | Description |
| :---- | :------- | :---------- |
| `hex` | `string` | hex-string  |

#### Returns

`string`

format: decimal string

#### Defined in

[src/utils/num.ts:64](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/utils/num.ts#L64)

---

### assertInRange

▸ **assertInRange**(`input`, `lowerBound`, `upperBound`, `inputName?`): `void`

Asserts input is equal to or greater then lowerBound and lower then upperBound.

The `inputName` parameter is used in the assertion message.

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

[src/utils/num.ts:81](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/utils/num.ts#L81)

---

### bigNumberishArrayToDecimalStringArray

▸ **bigNumberishArrayToDecimalStringArray**(`rawCalldata`): `string`[]

Convert BigNumberish array to decimal string array

#### Parameters

| Name          | Type                                      |
| :------------ | :---------------------------------------- |
| `rawCalldata` | [`BigNumberish`](types.md#bignumberish)[] |

#### Returns

`string`[]

format: decimal string array

#### Defined in

[src/utils/num.ts:102](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/utils/num.ts#L102)

---

### bigNumberishArrayToHexadecimalStringArray

▸ **bigNumberishArrayToHexadecimalStringArray**(`rawCalldata`): `string`[]

Convert BigNumberish array to hexadecimal string array

#### Parameters

| Name          | Type                                      |
| :------------ | :---------------------------------------- |
| `rawCalldata` | [`BigNumberish`](types.md#bignumberish)[] |

#### Returns

`string`[]

format: hex-string array

#### Defined in

[src/utils/num.ts:110](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/utils/num.ts#L110)

---

### getDecimalString

▸ **getDecimalString**(`value`): `string`

Convert string to decimal string

#### Parameters

| Name    | Type     |
| :------ | :------- |
| `value` | `string` |

#### Returns

`string`

format: decimal string

#### Defined in

[src/utils/num.ts:123](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/utils/num.ts#L123)

---

### getHexString

▸ **getHexString**(`value`): `string`

Convert string to hexadecimal string

#### Parameters

| Name    | Type     |
| :------ | :------- |
| `value` | `string` |

#### Returns

`string`

format: hex-string

#### Defined in

[src/utils/num.ts:137](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/utils/num.ts#L137)

---

### getHexStringArray

▸ **getHexStringArray**(`value`): `string`[]

Convert string array to hex-string array

#### Parameters

| Name    | Type       |
| :------ | :--------- |
| `value` | `string`[] |

#### Returns

`string`[]

format: hex-string array

#### Defined in

[src/utils/num.ts:151](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/utils/num.ts#L151)

---

### hexToBytes

▸ **hexToBytes**(`value`): `Uint8Array`

Convert hex-string to an array of Bytes (Uint8Array)

#### Parameters

| Name    | Type     | Description |
| :------ | :------- | :---------- |
| `value` | `string` | hex-string  |

#### Returns

`Uint8Array`

#### Defined in

[src/utils/num.ts:164](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/utils/num.ts#L164)

---

### toHexString

▸ **toHexString**(`number`): `string`

Alias of ToHex

#### Parameters

| Name     | Type                                    |
| :------- | :-------------------------------------- |
| `number` | [`BigNumberish`](types.md#bignumberish) |

#### Returns

`string`

#### Defined in

[src/utils/num.ts:36](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/utils/num.ts#L36)

---

### cleanHex

▸ **cleanHex**(`hex`): `string`

Remove hex string leading zero and lowercase it

**`Example`**

```ts
'0x01A...' -> '0x1a..'
```

#### Parameters

| Name  | Type     | Description |
| :---- | :------- | :---------- |
| `hex` | `string` | hex-string  |

#### Returns

`string`

format: hex-string

#### Defined in

[src/utils/num.ts:74](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/utils/num.ts#L74)

---

### isStringWholeNumber

▸ **isStringWholeNumber**(`value`): `boolean`

Test if string is whole number (0, 1, 2, 3...)

#### Parameters

| Name    | Type     |
| :------ | :------- |
| `value` | `string` |

#### Returns

`boolean`

#### Defined in

[src/utils/num.ts:117](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/utils/num.ts#L117)

---

### toCairoBool

▸ **toCairoBool**(`value`): `string`

Convert boolean to "0" or "1"

#### Parameters

| Name    | Type      |
| :------ | :-------- |
| `value` | `boolean` |

#### Returns

`string`

#### Defined in

[src/utils/num.ts:158](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/utils/num.ts#L158)
