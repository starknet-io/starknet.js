---
id: 'AbiParser2'
title: 'Class: AbiParser2'
sidebar_label: 'AbiParser2'
sidebar_position: 0
custom_edit_url: null
---

Abi parser interface

## Implements

- [`AbiParserInterface`](AbiParserInterface.md)

## Constructors

### constructor

• **new AbiParser2**(`abi`, `parsingStrategy?`): [`AbiParser2`](AbiParser2.md)

#### Parameters

| Name               | Type                                               |
| :----------------- | :------------------------------------------------- |
| `abi`              | [`Abi`](../modules.md#abi)                         |
| `parsingStrategy?` | [`ParsingStrategy`](../modules.md#parsingstrategy) |

#### Returns

[`AbiParser2`](AbiParser2.md)

#### Defined in

[src/utils/calldata/parser/parser-2.0.0.ts:18](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/calldata/parser/parser-2.0.0.ts#L18)

## Properties

### abi

• **abi**: [`Abi`](../modules.md#abi)

#### Defined in

[src/utils/calldata/parser/parser-2.0.0.ts:14](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/calldata/parser/parser-2.0.0.ts#L14)

---

### parsingStrategy

• **parsingStrategy**: [`ParsingStrategy`](../modules.md#parsingstrategy)

#### Defined in

[src/utils/calldata/parser/parser-2.0.0.ts:16](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/calldata/parser/parser-2.0.0.ts#L16)

## Methods

### getRequestParser

▸ **getRequestParser**(`abiType`): (`val`: `unknown`) => `any`

Get request parser for the given abi type

#### Parameters

| Name      | Type     | Description  |
| :-------- | :------- | :----------- |
| `abiType` | `string` | AbiEntryType |

#### Returns

`fn`

Parser function

▸ (`val`): `any`

##### Parameters

| Name  | Type      |
| :---- | :-------- |
| `val` | `unknown` |

##### Returns

`any`

#### Implementation of

[AbiParserInterface](AbiParserInterface.md).[getRequestParser](AbiParserInterface.md#getrequestparser)

#### Defined in

[src/utils/calldata/parser/parser-2.0.0.ts:23](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/calldata/parser/parser-2.0.0.ts#L23)

---

### getResponseParser

▸ **getResponseParser**(`abiType`): (`responseIterator`: `Iterator`<`string`, `any`, `undefined`\>) => `any`

Get response parser for the given abi type

#### Parameters

| Name      | Type     | Description  |
| :-------- | :------- | :----------- |
| `abiType` | `string` | AbiEntryType |

#### Returns

`fn`

Parser function

▸ (`responseIterator`): `any`

##### Parameters

| Name               | Type                                      |
| :----------------- | :---------------------------------------- |
| `responseIterator` | `Iterator`<`string`, `any`, `undefined`\> |

##### Returns

`any`

#### Implementation of

[AbiParserInterface](AbiParserInterface.md).[getResponseParser](AbiParserInterface.md#getresponseparser)

#### Defined in

[src/utils/calldata/parser/parser-2.0.0.ts:30](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/calldata/parser/parser-2.0.0.ts#L30)

---

### methodInputsLength

▸ **methodInputsLength**(`abiMethod`): `number`

abi method inputs length

#### Parameters

| Name        | Type                                       | Description |
| :---------- | :----------------------------------------- | :---------- |
| `abiMethod` | [`FunctionAbi`](../modules.md#functionabi) | FunctionAbi |

#### Returns

`number`

number

#### Implementation of

[AbiParserInterface](AbiParserInterface.md).[methodInputsLength](AbiParserInterface.md#methodinputslength)

#### Defined in

[src/utils/calldata/parser/parser-2.0.0.ts:42](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/calldata/parser/parser-2.0.0.ts#L42)

---

### getMethod

▸ **getMethod**(`name`): `undefined` \| [`FunctionAbi`](../modules.md#functionabi)

get method definition from abi

#### Parameters

| Name   | Type     | Description |
| :----- | :------- | :---------- |
| `name` | `string` | string      |

#### Returns

`undefined` \| [`FunctionAbi`](../modules.md#functionabi)

FunctionAbi | undefined

#### Implementation of

[AbiParserInterface](AbiParserInterface.md).[getMethod](AbiParserInterface.md#getmethod)

#### Defined in

[src/utils/calldata/parser/parser-2.0.0.ts:51](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/calldata/parser/parser-2.0.0.ts#L51)

---

### getLegacyFormat

▸ **getLegacyFormat**(): [`Abi`](../modules.md#abi)

Get Abi in legacy format

#### Returns

[`Abi`](../modules.md#abi)

Abi

#### Implementation of

[AbiParserInterface](AbiParserInterface.md).[getLegacyFormat](AbiParserInterface.md#getlegacyformat)

#### Defined in

[src/utils/calldata/parser/parser-2.0.0.ts:62](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/calldata/parser/parser-2.0.0.ts#L62)
