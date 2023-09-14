---
id: 'encode'
title: 'Namespace: encode'
sidebar_label: 'encode'
sidebar_position: 0
custom_edit_url: null
---

## References

### IS_BROWSER

Re-exports [IS_BROWSER](constants.md#is_browser)

## Functions

### arrayBufferToString

▸ **arrayBufferToString**(`array`): `string`

Convert array buffer to string

_[internal usage]_

#### Parameters

| Name    | Type          |
| :------ | :------------ |
| `array` | `ArrayBuffer` |

#### Returns

`string`

#### Defined in

[src/utils/encode.ts:16](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/encode.ts#L16)

---

### stringToArrayBuffer

▸ **stringToArrayBuffer**(`s`): `Uint8Array`

Convert string to array buffer

_[internal usage]_

#### Parameters

| Name | Type     |
| :--- | :------- |
| `s`  | `string` |

#### Returns

`Uint8Array`

#### Defined in

[src/utils/encode.ts:25](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/encode.ts#L25)

---

### atobUniversal

▸ **atobUniversal**(`a`): `Uint8Array`

Convert string to array buffer (browser and node compatible)

#### Parameters

| Name | Type     |
| :--- | :------- |
| `a`  | `string` |

#### Returns

`Uint8Array`

#### Defined in

[src/utils/encode.ts:32](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/encode.ts#L32)

---

### btoaUniversal

▸ **btoaUniversal**(`b`): `string`

Convert array buffer to string (browser and node compatible)

#### Parameters

| Name | Type          |
| :--- | :------------ |
| `b`  | `ArrayBuffer` |

#### Returns

`string`

#### Defined in

[src/utils/encode.ts:39](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/encode.ts#L39)

---

### buf2hex

▸ **buf2hex**(`buffer`): `string`

Convert array buffer to hex-string

#### Parameters

| Name     | Type         |
| :------- | :----------- |
| `buffer` | `Uint8Array` |

#### Returns

`string`

format: hex-string

#### Defined in

[src/utils/encode.ts:47](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/encode.ts#L47)

---

### removeHexPrefix

▸ **removeHexPrefix**(`hex`): `string`

Remove hex prefix '0x' from hex-string

#### Parameters

| Name  | Type     | Description |
| :---- | :------- | :---------- |
| `hex` | `string` | hex-string  |

#### Returns

`string`

format: base16-string

#### Defined in

[src/utils/encode.ts:56](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/encode.ts#L56)

---

### addHexPrefix

▸ **addHexPrefix**(`hex`): `string`

Add hex prefix '0x' to base16-string

#### Parameters

| Name  | Type     | Description   |
| :---- | :------- | :------------ |
| `hex` | `string` | base16-string |

#### Returns

`string`

format: hex-string

#### Defined in

[src/utils/encode.ts:65](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/encode.ts#L65)

---

### padLeft

▸ **padLeft**(`str`, `length`, `padding?`): `string`

Prepend string (default with '0')

#### Parameters

| Name      | Type     | Default value |
| :-------- | :------- | :------------ |
| `str`     | `string` | `undefined`   |
| `length`  | `number` | `undefined`   |
| `padding` | `string` | `STRING_ZERO` |

#### Returns

`string`

#### Defined in

[src/utils/encode.ts:87](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/encode.ts#L87)

---

### calcByteLength

▸ **calcByteLength**(`str`, `byteSize?`): `number`

Calculate byte length of string

_[no internal usage]_

#### Parameters

| Name       | Type     | Default value |
| :--------- | :------- | :------------ |
| `str`      | `string` | `undefined`   |
| `byteSize` | `number` | `8`           |

#### Returns

`number`

#### Defined in

[src/utils/encode.ts:96](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/encode.ts#L96)

---

### sanitizeBytes

▸ **sanitizeBytes**(`str`, `byteSize?`, `padding?`): `string`

Prepend '0' to string bytes

_[no internal usage]_

#### Parameters

| Name       | Type     | Default value |
| :--------- | :------- | :------------ |
| `str`      | `string` | `undefined`   |
| `byteSize` | `number` | `8`           |
| `padding`  | `string` | `STRING_ZERO` |

#### Returns

`string`

#### Defined in

[src/utils/encode.ts:107](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/encode.ts#L107)

---

### sanitizeHex

▸ **sanitizeHex**(`hex`): `string`

Prepend '0' to hex-string bytes

_[no internal usage]_

#### Parameters

| Name  | Type     | Description |
| :---- | :------- | :---------- |
| `hex` | `string` | hex-string  |

#### Returns

`string`

format: hex-string

#### Defined in

[src/utils/encode.ts:118](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/encode.ts#L118)

---

### utf8ToArray

▸ **utf8ToArray**(`str`): `Uint8Array`

Convert utf8-string to Uint8Array

Implemented using TextEncoder to make it isomorphic

#### Parameters

| Name  | Type     | Description |
| :---- | :------- | :---------- |
| `str` | `string` | utf8-string |

#### Returns

`Uint8Array`

#### Defined in

[src/utils/encode.ts:133](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/encode.ts#L133)

---

### pascalToSnake

▸ **pascalToSnake**(`text`): `string`

String transformation util

Pascal case to screaming snake case

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `text` | `string` |

#### Returns

`string`

#### Defined in

[src/utils/encode.ts:142](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/encode.ts#L142)
