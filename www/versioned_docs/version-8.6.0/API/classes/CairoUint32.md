---
id: 'CairoUint32'
title: 'Class: CairoUint32'
sidebar_label: 'CairoUint32'
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new CairoUint32**(`data`): [`CairoUint32`](CairoUint32.md)

#### Parameters

| Name   | Type                                         |
| :----- | :------------------------------------------- |
| `data` | [`BigNumberish`](../modules.md#bignumberish) |

#### Returns

[`CairoUint32`](CairoUint32.md)

#### Defined in

[src/utils/cairoDataTypes/uint32.ts:15](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/uint32.ts#L15)

## Properties

### abiSelector

▪ `Static` **abiSelector**: `string` = `'core::u32::u32'`

#### Defined in

[src/utils/cairoDataTypes/uint32.ts:13](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/uint32.ts#L13)

---

### data

• **data**: `bigint`

#### Defined in

[src/utils/cairoDataTypes/uint32.ts:11](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/uint32.ts#L11)

## Methods

### \_\_processData

▸ **\_\_processData**(`data`): `bigint`

#### Parameters

| Name   | Type                                         |
| :----- | :------------------------------------------- |
| `data` | [`BigNumberish`](../modules.md#bignumberish) |

#### Returns

`bigint`

#### Defined in

[src/utils/cairoDataTypes/uint32.ts:20](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/uint32.ts#L20)

---

### validate

▸ **validate**(`data`): `void`

#### Parameters

| Name   | Type                                         |
| :----- | :------------------------------------------- |
| `data` | [`BigNumberish`](../modules.md#bignumberish) |

#### Returns

`void`

#### Defined in

[src/utils/cairoDataTypes/uint32.ts:46](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/uint32.ts#L46)

---

### is

▸ **is**(`data`): `boolean`

#### Parameters

| Name   | Type                                         |
| :----- | :------------------------------------------- |
| `data` | [`BigNumberish`](../modules.md#bignumberish) |

#### Returns

`boolean`

#### Defined in

[src/utils/cairoDataTypes/uint32.ts:58](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/uint32.ts#L58)

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

[src/utils/cairoDataTypes/uint32.ts:70](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/uint32.ts#L70)

---

### factoryFromApiResponse

▸ **factoryFromApiResponse**(`responseIterator`): [`CairoUint32`](CairoUint32.md)

#### Parameters

| Name               | Type                                      |
| :----------------- | :---------------------------------------- |
| `responseIterator` | `Iterator`<`string`, `any`, `undefined`\> |

#### Returns

[`CairoUint32`](CairoUint32.md)

#### Defined in

[src/utils/cairoDataTypes/uint32.ts:74](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/uint32.ts#L74)

---

### toApiRequest

▸ **toApiRequest**(): `string`[]

#### Returns

`string`[]

#### Defined in

[src/utils/cairoDataTypes/uint32.ts:30](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/uint32.ts#L30)

---

### toBigInt

▸ **toBigInt**(): `bigint`

#### Returns

`bigint`

#### Defined in

[src/utils/cairoDataTypes/uint32.ts:34](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/uint32.ts#L34)

---

### decodeUtf8

▸ **decodeUtf8**(): `string`

#### Returns

`string`

#### Defined in

[src/utils/cairoDataTypes/uint32.ts:38](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/uint32.ts#L38)

---

### toHexString

▸ **toHexString**(): `string`

#### Returns

`string`

#### Defined in

[src/utils/cairoDataTypes/uint32.ts:42](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/uint32.ts#L42)
