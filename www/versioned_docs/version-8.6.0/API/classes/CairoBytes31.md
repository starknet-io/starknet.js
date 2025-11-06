---
id: 'CairoBytes31'
title: 'Class: CairoBytes31'
sidebar_label: 'CairoBytes31'
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new CairoBytes31**(`data`): [`CairoBytes31`](CairoBytes31.md)

#### Parameters

| Name   | Type      |
| :----- | :-------- |
| `data` | `unknown` |

#### Returns

[`CairoBytes31`](CairoBytes31.md)

#### Defined in

[src/utils/cairoDataTypes/bytes31.ts:15](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/bytes31.ts#L15)

## Properties

### MAX_BYTE_SIZE

▪ `Static` **MAX_BYTE_SIZE**: `31`

#### Defined in

[src/utils/cairoDataTypes/bytes31.ts:9](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/bytes31.ts#L9)

---

### abiSelector

▪ `Static` **abiSelector**: `"core::bytes_31::bytes31"`

#### Defined in

[src/utils/cairoDataTypes/bytes31.ts:13](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/bytes31.ts#L13)

---

### data

• **data**: `Uint8Array`

#### Defined in

[src/utils/cairoDataTypes/bytes31.ts:11](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/bytes31.ts#L11)

## Methods

### \_\_processData

▸ **\_\_processData**(`data`): `Uint8Array`

#### Parameters

| Name   | Type      |
| :----- | :-------- |
| `data` | `unknown` |

#### Returns

`Uint8Array`

#### Defined in

[src/utils/cairoDataTypes/bytes31.ts:22](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/bytes31.ts#L22)

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

[src/utils/cairoDataTypes/bytes31.ts:58](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/bytes31.ts#L58)

---

### is

▸ **is**(`data`): `boolean`

#### Parameters

| Name   | Type                                                     |
| :----- | :------------------------------------------------------- |
| `data` | `string` \| `Uint8Array` \| `Buffer`<`ArrayBufferLike`\> |

#### Returns

`boolean`

#### Defined in

[src/utils/cairoDataTypes/bytes31.ts:66](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/bytes31.ts#L66)

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

[src/utils/cairoDataTypes/bytes31.ts:78](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/bytes31.ts#L78)

---

### factoryFromApiResponse

▸ **factoryFromApiResponse**(`responseIterator`): [`CairoBytes31`](CairoBytes31.md)

#### Parameters

| Name               | Type                                      |
| :----------------- | :---------------------------------------- |
| `responseIterator` | `Iterator`<`string`, `any`, `undefined`\> |

#### Returns

[`CairoBytes31`](CairoBytes31.md)

#### Defined in

[src/utils/cairoDataTypes/bytes31.ts:82](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/bytes31.ts#L82)

---

### toApiRequest

▸ **toApiRequest**(): `string`[]

#### Returns

`string`[]

#### Defined in

[src/utils/cairoDataTypes/bytes31.ts:35](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/bytes31.ts#L35)

---

### toBigInt

▸ **toBigInt**(): `bigint`

#### Returns

`bigint`

#### Defined in

[src/utils/cairoDataTypes/bytes31.ts:39](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/bytes31.ts#L39)

---

### decodeUtf8

▸ **decodeUtf8**(): `string`

#### Returns

`string`

#### Defined in

[src/utils/cairoDataTypes/bytes31.ts:43](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/bytes31.ts#L43)

---

### toHexString

▸ **toHexString**(`padded?`): `string`

#### Parameters

| Name      | Type       | Description                      |
| :-------- | :--------- | :------------------------------- |
| `padded?` | `"padded"` | flag for including leading zeros |

#### Returns

`string`

#### Defined in

[src/utils/cairoDataTypes/bytes31.ts:53](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/bytes31.ts#L53)
