---
id: 'CallData'
title: 'Class: CallData'
sidebar_label: 'CallData'
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new CallData**(`abi`)

#### Parameters

| Name  | Type                       |
| :---- | :------------------------- |
| `abi` | [`Abi`](../modules.md#abi) |

#### Defined in

[src/utils/calldata/index.ts:30](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/calldata/index.ts#L30)

## Properties

### abi

• **abi**: [`Abi`](../modules.md#abi)

#### Defined in

[src/utils/calldata/index.ts:26](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/calldata/index.ts#L26)

---

### structs

• `Protected` `Readonly` **structs**: [`AbiStructs`](../modules.md#abistructs)

#### Defined in

[src/utils/calldata/index.ts:28](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/calldata/index.ts#L28)

## Methods

### compile

▸ `Static` **compile**(`rawArgs`): [`Calldata`](../modules.md#calldata)

Compile contract callData without abi

#### Parameters

| Name      | Type                               | Description                                                                  |
| :-------- | :--------------------------------- | :--------------------------------------------------------------------------- |
| `rawArgs` | [`RawArgs`](../modules.md#rawargs) | RawArgs representing cairo method arguments or string array of compiled data |

#### Returns

[`Calldata`](../modules.md#calldata)

Calldata

#### Defined in

[src/utils/calldata/index.ts:98](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/calldata/index.ts#L98)

---

### abiInputsLength

▸ `Static` **abiInputsLength**(`inputs`): `number`

Helper to calculate inputs from abi

#### Parameters

| Name     | Type                                   | Description |
| :------- | :------------------------------------- | :---------- |
| `inputs` | [`AbiEntry`](../modules.md#abientry)[] | AbiEntry    |

#### Returns

`number`

number

#### Defined in

[src/utils/calldata/index.ts:179](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/calldata/index.ts#L179)

---

### getAbiStruct

▸ `Static` **getAbiStruct**(`abi`): [`AbiStructs`](../modules.md#abistructs)

Helper to extract structs from abi

#### Parameters

| Name  | Type                       | Description |
| :---- | :------------------------- | :---------- |
| `abi` | [`Abi`](../modules.md#abi) | Abi         |

#### Returns

[`AbiStructs`](../modules.md#abistructs)

AbiStructs - structs from abi

#### Defined in

[src/utils/calldata/index.ts:188](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/calldata/index.ts#L188)

---

### toCalldata

▸ `Static` **toCalldata**(`rawCalldata?`): [`Calldata`](../modules.md#calldata)

Helper: Compile HexCalldata | RawCalldata | RawArgs

#### Parameters

| Name          | Type                               | Default value | Description                           |
| :------------ | :--------------------------------- | :------------ | :------------------------------------ |
| `rawCalldata` | [`RawArgs`](../modules.md#rawargs) | `[]`          | HexCalldata \| RawCalldata \| RawArgs |

#### Returns

[`Calldata`](../modules.md#calldata)

Calldata

#### Defined in

[src/utils/calldata/index.ts:205](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/calldata/index.ts#L205)

---

### toHex

▸ `Static` **toHex**(`raw?`): [`HexCalldata`](../modules.md#hexcalldata)

Helper: Convert raw to HexCalldata

#### Parameters

| Name  | Type                               | Default value | Description                           |
| :---- | :--------------------------------- | :------------ | :------------------------------------ |
| `raw` | [`RawArgs`](../modules.md#rawargs) | `[]`          | HexCalldata \| RawCalldata \| RawArgs |

#### Returns

[`HexCalldata`](../modules.md#hexcalldata)

HexCalldata

#### Defined in

[src/utils/calldata/index.ts:214](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/calldata/index.ts#L214)

---

### validate

▸ **validate**(`type`, `method`, `args?`): `void`

Validate arguments passed to the method as corresponding to the ones in the abi

#### Parameters

| Name     | Type                                             | Default value | Description                                              |
| :------- | :----------------------------------------------- | :------------ | :------------------------------------------------------- |
| `type`   | `"DEPLOY"` \| `"INVOKE"` \| `"CALL"`             | `undefined`   | string - type of the method                              |
| `method` | `string`                                         | `undefined`   | string - name of the method                              |
| `args`   | [`ArgsOrCalldata`](../modules.md#argsorcalldata) | `[]`          | ArgsOrCalldata - arguments that are passed to the method |

#### Returns

`void`

#### Defined in

[src/utils/calldata/index.ts:41](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/calldata/index.ts#L41)

---

### compile

▸ **compile**(`method`, `args`): [`Calldata`](../modules.md#calldata)

Compile contract callData with abi
Parse the calldata by using input fields from the abi for that method

#### Parameters

| Name     | Type                                             | Description                                     |
| :------- | :----------------------------------------------- | :---------------------------------------------- |
| `method` | `string`                                         | string - method name                            |
| `args`   | [`ArgsOrCalldata`](../modules.md#argsorcalldata) | ArgsOrCalldata - arguments passed to the method |

#### Returns

[`Calldata`](../modules.md#calldata)

Calldata - parsed arguments in format that contract is expecting

#### Defined in

[src/utils/calldata/index.ts:83](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/calldata/index.ts#L83)

---

### parse

▸ **parse**(`method`, `response`): [`Result`](../modules.md#result)

Parse elements of the response array and structuring them into response object

#### Parameters

| Name       | Type       | Description                         |
| :--------- | :--------- | :---------------------------------- |
| `method`   | `string`   | string - method name                |
| `response` | `string`[] | string[] - response from the method |

#### Returns

[`Result`](../modules.md#result)

Result - parsed response corresponding to the abi

#### Defined in

[src/utils/calldata/index.ts:145](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/calldata/index.ts#L145)

---

### format

▸ **format**(`method`, `response`, `format`): [`Result`](../modules.md#result)

Format cairo method response data to native js values based on provided format schema

#### Parameters

| Name       | Type       | Description                      |
| :--------- | :--------- | :------------------------------- |
| `method`   | `string`   | string - cairo method name       |
| `response` | `string`[] | string[] - cairo method response |
| `format`   | `object`   | object - formatter object schema |

#### Returns

[`Result`](../modules.md#result)

Result - parsed and formatted response object

#### Defined in

[src/utils/calldata/index.ts:169](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/calldata/index.ts#L169)
