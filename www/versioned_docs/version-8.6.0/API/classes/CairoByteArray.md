---
id: 'CairoByteArray'
title: 'Class: CairoByteArray'
sidebar_label: 'CairoByteArray'
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new CairoByteArray**(`data`, `pendingWord`, `pendingWordLen`): [`CairoByteArray`](CairoByteArray.md)

byteArray from typed components

#### Parameters

| Name             | Type                                |
| :--------------- | :---------------------------------- |
| `data`           | [`CairoBytes31`](CairoBytes31.md)[] |
| `pendingWord`    | [`CairoFelt252`](CairoFelt252.md)   |
| `pendingWordLen` | [`CairoUint32`](CairoUint32.md)     |

#### Returns

[`CairoByteArray`](CairoByteArray.md)

#### Defined in

[src/utils/cairoDataTypes/byteArray.ts:40](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/byteArray.ts#L40)

• **new CairoByteArray**(`data`): [`CairoByteArray`](CairoByteArray.md)

#### Parameters

| Name   | Type      |
| :----- | :-------- |
| `data` | `unknown` |

#### Returns

[`CairoByteArray`](CairoByteArray.md)

#### Defined in

[src/utils/cairoDataTypes/byteArray.ts:41](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/byteArray.ts#L41)

## Properties

### abiSelector

▪ `Static` **abiSelector**: `"core::byte_array::ByteArray"`

#### Defined in

[src/utils/cairoDataTypes/byteArray.ts:35](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/byteArray.ts#L35)

---

### data

• **data**: [`CairoBytes31`](CairoBytes31.md)[] = `[]`

entire dataset

#### Defined in

[src/utils/cairoDataTypes/byteArray.ts:23](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/byteArray.ts#L23)

---

### pending_word

• **pending_word**: [`CairoFelt252`](CairoFelt252.md)

cairo specific implementation helper

#### Defined in

[src/utils/cairoDataTypes/byteArray.ts:28](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/byteArray.ts#L28)

---

### pending_word_len

• **pending_word_len**: [`CairoUint32`](CairoUint32.md)

cairo specific implementation helper

#### Defined in

[src/utils/cairoDataTypes/byteArray.ts:33](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/byteArray.ts#L33)

## Methods

### \_\_processData

▸ **\_\_processData**(`inData`): `Object`

#### Parameters

| Name     | Type      |
| :------- | :-------- |
| `inData` | `unknown` |

#### Returns

`Object`

| Name               | Type                                |
| :----------------- | :---------------------------------- |
| `data`             | [`CairoBytes31`](CairoBytes31.md)[] |
| `pending_word`     | [`CairoFelt252`](CairoFelt252.md)   |
| `pending_word_len` | [`CairoUint32`](CairoUint32.md)     |

#### Defined in

[src/utils/cairoDataTypes/byteArray.ts:70](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/byteArray.ts#L70)

---

### validate

▸ **validate**(`data`): `void`

#### Parameters

| Name   | Type      |
| :----- | :-------- |
| `data` | `unknown` |

#### Returns

`void`

#### Defined in

[src/utils/cairoDataTypes/byteArray.ts:206](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/byteArray.ts#L206)

---

### is

▸ **is**(`data`): `boolean`

Check if the provided data is a valid CairoByteArray

#### Parameters

| Name   | Type  | Description       |
| :----- | :---- | :---------------- |
| `data` | `any` | The data to check |

#### Returns

`boolean`

True if the data is a valid CairoByteArray, false otherwise

#### Defined in

[src/utils/cairoDataTypes/byteArray.ts:246](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/byteArray.ts#L246)

---

### isAbiType

▸ **isAbiType**(`abiType`): `boolean`

Check if provided abi type is this data type

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `abiType` | `string` |

#### Returns

`boolean`

#### Defined in

[src/utils/cairoDataTypes/byteArray.ts:258](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/byteArray.ts#L258)

---

### factoryFromApiResponse

▸ **factoryFromApiResponse**(`responseIterator`): [`CairoByteArray`](CairoByteArray.md)

#### Parameters

| Name               | Type                                      |
| :----------------- | :---------------------------------------- |
| `responseIterator` | `Iterator`<`string`, `any`, `undefined`\> |

#### Returns

[`CairoByteArray`](CairoByteArray.md)

#### Defined in

[src/utils/cairoDataTypes/byteArray.ts:262](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/byteArray.ts#L262)

---

### toApiRequest

▸ **toApiRequest**(): `string`[]

#### Returns

`string`[]

#### Defined in

[src/utils/cairoDataTypes/byteArray.ts:127](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/byteArray.ts#L127)

---

### decodeUtf8

▸ **decodeUtf8**(): `string`

#### Returns

`string`

#### Defined in

[src/utils/cairoDataTypes/byteArray.ts:138](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/byteArray.ts#L138)

---

### toBigInt

▸ **toBigInt**(): `bigint`

#### Returns

`bigint`

#### Defined in

[src/utils/cairoDataTypes/byteArray.ts:145](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/byteArray.ts#L145)

---

### toHexString

▸ **toHexString**(): `string`

#### Returns

`string`

#### Defined in

[src/utils/cairoDataTypes/byteArray.ts:162](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/byteArray.ts#L162)

---

### toBuffer

▸ **toBuffer**(): `any`

#### Returns

`any`

#### Defined in

[src/utils/cairoDataTypes/byteArray.ts:169](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/byteArray.ts#L169)

---

### toElements

▸ **toElements**(): `Uint8Array`[]

returns an array of all the data chunks and the pending word
when concatenated, represents the original bytes sequence

#### Returns

`Uint8Array`[]

#### Defined in

[src/utils/cairoDataTypes/byteArray.ts:178](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/byteArray.ts#L178)

---

### assertInitialized

▸ **assertInitialized**(): `void`

Private helper to check if the CairoByteArray is properly initialized

#### Returns

`void`

#### Defined in

[src/utils/cairoDataTypes/byteArray.ts:199](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/byteArray.ts#L199)
