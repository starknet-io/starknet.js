---
id: 'encode'
title: 'Namespace: encode'
sidebar_label: 'encode'
sidebar_position: 0
custom_edit_url: null
---

## Variables

### IS_BROWSER

• `Const` **IS_BROWSER**: `boolean`

#### Defined in

[src/utils/encode.ts:2](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/encode.ts#L2)

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

[src/utils/encode.ts:6](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/encode.ts#L6)

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

[src/utils/encode.ts:10](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/encode.ts#L10)

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

[src/utils/encode.ts:14](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/encode.ts#L14)

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

[src/utils/encode.ts:23](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/encode.ts#L23)

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

[src/utils/encode.ts:27](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/encode.ts#L27)

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

[src/utils/encode.ts:41](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/encode.ts#L41)

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

[src/utils/encode.ts:45](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/encode.ts#L45)

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

[src/utils/encode.ts:50](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/encode.ts#L50)

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

[src/utils/encode.ts:54](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/encode.ts#L54)

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

[src/utils/encode.ts:64](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/encode.ts#L64)
