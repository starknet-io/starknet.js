---
id: 'CairoInt32'
title: 'Class: CairoInt32'
sidebar_label: 'CairoInt32'
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new CairoInt32**(`data`): [`CairoInt32`](CairoInt32.md)

#### Parameters

| Name   | Type      |
| :----- | :-------- |
| `data` | `unknown` |

#### Returns

[`CairoInt32`](CairoInt32.md)

#### Defined in

[src/utils/cairoDataTypes/int32.ts:16](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/int32.ts#L16)

## Properties

### abiSelector

▪ `Static` **abiSelector**: `string` = `'core::integer::i32'`

#### Defined in

[src/utils/cairoDataTypes/int32.ts:14](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/int32.ts#L14)

---

### data

• **data**: `bigint`

#### Defined in

[src/utils/cairoDataTypes/int32.ts:12](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/int32.ts#L12)

## Methods

### \_\_processData

▸ **\_\_processData**(`data`): `bigint`

#### Parameters

| Name   | Type      |
| :----- | :-------- |
| `data` | `unknown` |

#### Returns

`bigint`

#### Defined in

[src/utils/cairoDataTypes/int32.ts:21](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/int32.ts#L21)

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

[src/utils/cairoDataTypes/int32.ts:59](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/int32.ts#L59)

---

### is

▸ **is**(`data`): `boolean`

#### Parameters

| Name   | Type      |
| :----- | :-------- |
| `data` | `unknown` |

#### Returns

`boolean`

#### Defined in

[src/utils/cairoDataTypes/int32.ts:74](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/int32.ts#L74)

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

[src/utils/cairoDataTypes/int32.ts:86](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/int32.ts#L86)

---

### factoryFromApiResponse

▸ **factoryFromApiResponse**(`responseIterator`): [`CairoInt32`](CairoInt32.md)

#### Parameters

| Name               | Type                                      |
| :----------------- | :---------------------------------------- |
| `responseIterator` | `Iterator`<`string`, `any`, `undefined`\> |

#### Returns

[`CairoInt32`](CairoInt32.md)

#### Defined in

[src/utils/cairoDataTypes/int32.ts:90](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/int32.ts#L90)

---

### toApiRequest

▸ **toApiRequest**(): `string`[]

#### Returns

`string`[]

#### Defined in

[src/utils/cairoDataTypes/int32.ts:31](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/int32.ts#L31)

---

### toBigInt

▸ **toBigInt**(): `bigint`

#### Returns

`bigint`

#### Defined in

[src/utils/cairoDataTypes/int32.ts:35](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/int32.ts#L35)

---

### decodeUtf8

▸ **decodeUtf8**(): `string`

#### Returns

`string`

#### Defined in

[src/utils/cairoDataTypes/int32.ts:39](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/int32.ts#L39)

---

### toHexString

▸ **toHexString**(): `string`

For negative values field element representation as positive hex string.

#### Returns

`string`

cairo field arithmetic hex string

#### Defined in

[src/utils/cairoDataTypes/int32.ts:49](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/int32.ts#L49)
