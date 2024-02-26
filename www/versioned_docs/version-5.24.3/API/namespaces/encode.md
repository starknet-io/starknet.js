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

[src/utils/encode.ts:18](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/utils/encode.ts#L18)

---

### utf8ToArray

▸ **utf8ToArray**(`str`): `Uint8Array`

Convert utf8-string to Uint8Array

_[internal usage]_

#### Parameters

| Name  | Type     |
| :---- | :------- |
| `str` | `string` |

#### Returns

`Uint8Array`

#### Defined in

[src/utils/encode.ts:27](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/utils/encode.ts#L27)

---

### stringToArrayBuffer

▸ **stringToArrayBuffer**(`str`): `Uint8Array`

Convert utf8-string to Uint8Array

**`Deprecated`**

equivalent to 'utf8ToArray', alias will be removed

#### Parameters

| Name  | Type     |
| :---- | :------- |
| `str` | `string` |

#### Returns

`Uint8Array`

#### Defined in

[src/utils/encode.ts:36](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/utils/encode.ts#L36)

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

[src/utils/encode.ts:43](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/utils/encode.ts#L43)

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

[src/utils/encode.ts:50](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/utils/encode.ts#L50)

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

[src/utils/encode.ts:58](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/utils/encode.ts#L58)

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

[src/utils/encode.ts:67](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/utils/encode.ts#L67)

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

[src/utils/encode.ts:76](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/utils/encode.ts#L76)

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

[src/utils/encode.ts:98](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/utils/encode.ts#L98)

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

[src/utils/encode.ts:107](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/utils/encode.ts#L107)

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

[src/utils/encode.ts:118](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/utils/encode.ts#L118)

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

[src/utils/encode.ts:129](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/utils/encode.ts#L129)

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

[src/utils/encode.ts:143](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/utils/encode.ts#L143)
