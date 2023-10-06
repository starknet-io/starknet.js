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

#### Parameters

| Name    | Type          |
| :------ | :------------ |
| `array` | `ArrayBuffer` |

#### Returns

`string`

#### Defined in

[src/utils/encode.ts:6](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/utils/encode.ts#L6)

---

### stringToArrayBuffer

▸ **stringToArrayBuffer**(`s`): `Uint8Array`

#### Parameters

| Name | Type     |
| :--- | :------- |
| `s`  | `string` |

#### Returns

`Uint8Array`

#### Defined in

[src/utils/encode.ts:10](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/utils/encode.ts#L10)

---

### atobUniversal

▸ **atobUniversal**(`a`): `Uint8Array`

#### Parameters

| Name | Type     |
| :--- | :------- |
| `a`  | `string` |

#### Returns

`Uint8Array`

#### Defined in

[src/utils/encode.ts:14](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/utils/encode.ts#L14)

---

### btoaUniversal

▸ **btoaUniversal**(`b`): `string`

#### Parameters

| Name | Type          |
| :--- | :------------ |
| `b`  | `ArrayBuffer` |

#### Returns

`string`

#### Defined in

[src/utils/encode.ts:18](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/utils/encode.ts#L18)

---

### buf2hex

▸ **buf2hex**(`buffer`): `string`

#### Parameters

| Name     | Type         |
| :------- | :----------- |
| `buffer` | `Uint8Array` |

#### Returns

`string`

#### Defined in

[src/utils/encode.ts:22](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/utils/encode.ts#L22)

---

### removeHexPrefix

▸ **removeHexPrefix**(`hex`): `string`

Some function imported from https://github.com/pedrouid/enc-utils/blob/master/src/index.ts
enc-utils is no dependency to avoid using `Buffer` which just works in node and no browsers

#### Parameters

| Name  | Type     |
| :---- | :------- |
| `hex` | `string` |

#### Returns

`string`

#### Defined in

[src/utils/encode.ts:31](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/utils/encode.ts#L31)

---

### addHexPrefix

▸ **addHexPrefix**(`hex`): `string`

#### Parameters

| Name  | Type     |
| :---- | :------- |
| `hex` | `string` |

#### Returns

`string`

#### Defined in

[src/utils/encode.ts:35](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/utils/encode.ts#L35)

---

### padLeft

▸ **padLeft**(`str`, `length`, `padding?`): `string`

#### Parameters

| Name      | Type     | Default value |
| :-------- | :------- | :------------ |
| `str`     | `string` | `undefined`   |
| `length`  | `number` | `undefined`   |
| `padding` | `string` | `STRING_ZERO` |

#### Returns

`string`

#### Defined in

[src/utils/encode.ts:49](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/utils/encode.ts#L49)

---

### calcByteLength

▸ **calcByteLength**(`length`, `byteSize?`): `number`

#### Parameters

| Name       | Type     | Default value |
| :--------- | :------- | :------------ |
| `length`   | `number` | `undefined`   |
| `byteSize` | `number` | `8`           |

#### Returns

`number`

#### Defined in

[src/utils/encode.ts:53](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/utils/encode.ts#L53)

---

### sanitizeBytes

▸ **sanitizeBytes**(`str`, `byteSize?`, `padding?`): `string`

#### Parameters

| Name       | Type     | Default value |
| :--------- | :------- | :------------ |
| `str`      | `string` | `undefined`   |
| `byteSize` | `number` | `8`           |
| `padding`  | `string` | `STRING_ZERO` |

#### Returns

`string`

#### Defined in

[src/utils/encode.ts:58](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/utils/encode.ts#L58)

---

### sanitizeHex

▸ **sanitizeHex**(`hex`): `string`

#### Parameters

| Name  | Type     |
| :---- | :------- |
| `hex` | `string` |

#### Returns

`string`

#### Defined in

[src/utils/encode.ts:62](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/utils/encode.ts#L62)

---

### utf8ToArray

▸ **utf8ToArray**(`str`): `Uint8Array`

#### Parameters

| Name  | Type     |
| :---- | :------- |
| `str` | `string` |

#### Returns

`Uint8Array`

#### Defined in

[src/utils/encode.ts:72](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/utils/encode.ts#L72)
