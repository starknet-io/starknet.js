---
id: 'CairoUint8'
title: 'Class: CairoUint8'
sidebar_label: 'CairoUint8'
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new CairoUint8**(`data`): [`CairoUint8`](CairoUint8.md)

#### Parameters

| Name   | Type      |
| :----- | :-------- |
| `data` | `unknown` |

#### Returns

[`CairoUint8`](CairoUint8.md)

#### Defined in

[src/utils/cairoDataTypes/uint8.ts:16](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/uint8.ts#L16)

## Properties

### abiSelector

▪ `Static` **abiSelector**: `string` = `'core::integer::u8'`

#### Defined in

[src/utils/cairoDataTypes/uint8.ts:14](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/uint8.ts#L14)

---

### data

• **data**: `bigint`

#### Defined in

[src/utils/cairoDataTypes/uint8.ts:12](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/uint8.ts#L12)

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

[src/utils/cairoDataTypes/uint8.ts:21](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/uint8.ts#L21)

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

[src/utils/cairoDataTypes/uint8.ts:47](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/uint8.ts#L47)

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

[src/utils/cairoDataTypes/uint8.ts:62](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/uint8.ts#L62)

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

[src/utils/cairoDataTypes/uint8.ts:74](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/uint8.ts#L74)

---

### factoryFromApiResponse

▸ **factoryFromApiResponse**(`responseIterator`): [`CairoUint8`](CairoUint8.md)

#### Parameters

| Name               | Type                                      |
| :----------------- | :---------------------------------------- |
| `responseIterator` | `Iterator`<`string`, `any`, `undefined`\> |

#### Returns

[`CairoUint8`](CairoUint8.md)

#### Defined in

[src/utils/cairoDataTypes/uint8.ts:78](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/uint8.ts#L78)

---

### toApiRequest

▸ **toApiRequest**(): `string`[]

#### Returns

`string`[]

#### Defined in

[src/utils/cairoDataTypes/uint8.ts:31](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/uint8.ts#L31)

---

### toBigInt

▸ **toBigInt**(): `bigint`

#### Returns

`bigint`

#### Defined in

[src/utils/cairoDataTypes/uint8.ts:35](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/uint8.ts#L35)

---

### decodeUtf8

▸ **decodeUtf8**(): `string`

#### Returns

`string`

#### Defined in

[src/utils/cairoDataTypes/uint8.ts:39](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/uint8.ts#L39)

---

### toHexString

▸ **toHexString**(): `string`

#### Returns

`string`

#### Defined in

[src/utils/cairoDataTypes/uint8.ts:43](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/uint8.ts#L43)
