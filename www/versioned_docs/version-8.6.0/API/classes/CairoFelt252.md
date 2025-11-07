---
id: 'CairoFelt252'
title: 'Class: CairoFelt252'
sidebar_label: 'CairoFelt252'
sidebar_position: 0
custom_edit_url: null
---

felt252 is the basic field element used in Cairo.
It corresponds to an integer in the range 0 ≤ x < P where P is a very large prime number currently equal to 2^251 + 17⋅2^192 + 1.
Any operation that uses felt252 will be computed modulo P.
63 hex symbols (31 bytes + 4 bits), 252 bits

## Constructors

### constructor

• **new CairoFelt252**(`data`): [`CairoFelt252`](CairoFelt252.md)

#### Parameters

| Name   | Type      |
| :----- | :-------- |
| `data` | `unknown` |

#### Returns

[`CairoFelt252`](CairoFelt252.md)

#### Defined in

[src/utils/cairoDataTypes/felt.ts:72](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/felt.ts#L72)

## Properties

### abiSelector

▪ `Static` **abiSelector**: `"core::felt252"`

#### Defined in

[src/utils/cairoDataTypes/felt.ts:70](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/felt.ts#L70)

---

### data

• **data**: `Uint8Array`

byte representation of the felt252

#### Defined in

[src/utils/cairoDataTypes/felt.ts:68](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/felt.ts#L68)

## Methods

### \_\_processData

▸ **\_\_processData**(`data`): `Uint8Array`

#### Parameters

| Name   | Type                                                      |
| :----- | :-------------------------------------------------------- |
| `data` | `boolean` \| [`BigNumberish`](../modules.md#bignumberish) |

#### Returns

`Uint8Array`

#### Defined in

[src/utils/cairoDataTypes/felt.ts:79](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/felt.ts#L79)

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

[src/utils/cairoDataTypes/felt.ts:114](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/felt.ts#L114)

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

[src/utils/cairoDataTypes/felt.ts:127](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/felt.ts#L127)

---

### isAbiType

▸ **isAbiType**(`abiType`): `boolean`

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `abiType` | `string` |

#### Returns

`boolean`

#### Defined in

[src/utils/cairoDataTypes/felt.ts:136](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/felt.ts#L136)

---

### factoryFromApiResponse

▸ **factoryFromApiResponse**(`responseIterator`): [`CairoFelt252`](CairoFelt252.md)

#### Parameters

| Name               | Type                                      |
| :----------------- | :---------------------------------------- |
| `responseIterator` | `Iterator`<`string`, `any`, `undefined`\> |

#### Returns

[`CairoFelt252`](CairoFelt252.md)

#### Defined in

[src/utils/cairoDataTypes/felt.ts:140](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/felt.ts#L140)

---

### toBigInt

▸ **toBigInt**(): `bigint`

#### Returns

`bigint`

#### Defined in

[src/utils/cairoDataTypes/felt.ts:95](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/felt.ts#L95)

---

### decodeUtf8

▸ **decodeUtf8**(): `string`

#### Returns

`string`

#### Defined in

[src/utils/cairoDataTypes/felt.ts:99](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/felt.ts#L99)

---

### toHexString

▸ **toHexString**(): `string`

#### Returns

`string`

#### Defined in

[src/utils/cairoDataTypes/felt.ts:103](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/felt.ts#L103)

---

### toApiRequest

▸ **toApiRequest**(): `string`[]

#### Returns

`string`[]

#### Defined in

[src/utils/cairoDataTypes/felt.ts:107](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/felt.ts#L107)
