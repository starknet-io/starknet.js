---
id: 'AbiParserInterface'
title: 'Class: AbiParserInterface'
sidebar_label: 'AbiParserInterface'
sidebar_position: 0
custom_edit_url: null
---

Abi parser interface

## Implemented by

- [`AbiParser1`](AbiParser1.md)
- [`AbiParser2`](AbiParser2.md)

## Constructors

### constructor

• **new AbiParserInterface**(): [`AbiParserInterface`](AbiParserInterface.md)

#### Returns

[`AbiParserInterface`](AbiParserInterface.md)

## Methods

### methodInputsLength

▸ **methodInputsLength**(`abiMethod`): `number`

Helper to calculate inputs length from abi

#### Parameters

| Name        | Type                                       | Description |
| :---------- | :----------------------------------------- | :---------- |
| `abiMethod` | [`FunctionAbi`](../modules.md#functionabi) | FunctionAbi |

#### Returns

`number`

number

#### Defined in

[src/utils/calldata/parser/interface.ts:12](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/calldata/parser/interface.ts#L12)

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

#### Defined in

[src/utils/calldata/parser/interface.ts:19](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/calldata/parser/interface.ts#L19)

---

### getLegacyFormat

▸ **getLegacyFormat**(): [`Abi`](../modules.md#abi)

Return Abi in legacy format

#### Returns

[`Abi`](../modules.md#abi)

Abi

#### Defined in

[src/utils/calldata/parser/interface.ts:25](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/calldata/parser/interface.ts#L25)

---

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

#### Defined in

[src/utils/calldata/parser/interface.ts:32](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/calldata/parser/interface.ts#L32)

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

#### Defined in

[src/utils/calldata/parser/interface.ts:39](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/calldata/parser/interface.ts#L39)
