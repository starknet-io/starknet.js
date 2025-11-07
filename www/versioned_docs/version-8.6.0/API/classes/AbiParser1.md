---
id: 'AbiParser1'
title: 'Class: AbiParser1'
sidebar_label: 'AbiParser1'
sidebar_position: 0
custom_edit_url: null
---

Abi parser interface

## Implements

- [`AbiParserInterface`](AbiParserInterface.md)

## Constructors

### constructor

• **new AbiParser1**(`abi`, `parsingStrategy?`): [`AbiParser1`](AbiParser1.md)

#### Parameters

| Name               | Type                                               |
| :----------------- | :------------------------------------------------- |
| `abi`              | [`Abi`](../modules.md#abi)                         |
| `parsingStrategy?` | [`ParsingStrategy`](../modules.md#parsingstrategy) |

#### Returns

[`AbiParser1`](AbiParser1.md)

#### Defined in

[src/utils/calldata/parser/parser-0-1.1.0.ts:11](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/calldata/parser/parser-0-1.1.0.ts#L11)

## Properties

### abi

• **abi**: [`Abi`](../modules.md#abi)

#### Defined in

[src/utils/calldata/parser/parser-0-1.1.0.ts:7](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/calldata/parser/parser-0-1.1.0.ts#L7)

---

### parsingStrategy

• **parsingStrategy**: [`ParsingStrategy`](../modules.md#parsingstrategy)

#### Defined in

[src/utils/calldata/parser/parser-0-1.1.0.ts:9](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/calldata/parser/parser-0-1.1.0.ts#L9)

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

[src/utils/calldata/parser/parser-0-1.1.0.ts:16](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/calldata/parser/parser-0-1.1.0.ts#L16)

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

[src/utils/calldata/parser/parser-0-1.1.0.ts:23](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/calldata/parser/parser-0-1.1.0.ts#L23)

---

### methodInputsLength

▸ **methodInputsLength**(`abiMethod`): `number`

abi method inputs length without '\_len' inputs
cairo 0 reducer

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

[src/utils/calldata/parser/parser-0-1.1.0.ts:36](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/calldata/parser/parser-0-1.1.0.ts#L36)

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

[src/utils/calldata/parser/parser-0-1.1.0.ts:45](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/calldata/parser/parser-0-1.1.0.ts#L45)

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

[src/utils/calldata/parser/parser-0-1.1.0.ts:53](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/calldata/parser/parser-0-1.1.0.ts#L53)
