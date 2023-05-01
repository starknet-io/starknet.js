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

[src/utils/calldata/index.ts:28](https://github.com/PhilippeR26/starknet.js/blob/d3c8cca/src/utils/calldata/index.ts#L28)

## Properties

### abi

• **abi**: [`Abi`](../modules.md#abi)

#### Defined in

[src/utils/calldata/index.ts:24](https://github.com/PhilippeR26/starknet.js/blob/d3c8cca/src/utils/calldata/index.ts#L24)

---

### structs

• `Protected` `Readonly` **structs**: [`AbiStructs`](../modules.md#abistructs)

#### Defined in

[src/utils/calldata/index.ts:26](https://github.com/PhilippeR26/starknet.js/blob/d3c8cca/src/utils/calldata/index.ts#L26)

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

[src/utils/calldata/index.ts:96](https://github.com/PhilippeR26/starknet.js/blob/d3c8cca/src/utils/calldata/index.ts#L96)

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

[src/utils/calldata/index.ts:176](https://github.com/PhilippeR26/starknet.js/blob/d3c8cca/src/utils/calldata/index.ts#L176)

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

[src/utils/calldata/index.ts:185](https://github.com/PhilippeR26/starknet.js/blob/d3c8cca/src/utils/calldata/index.ts#L185)

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

[src/utils/calldata/index.ts:39](https://github.com/PhilippeR26/starknet.js/blob/d3c8cca/src/utils/calldata/index.ts#L39)

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

[src/utils/calldata/index.ts:81](https://github.com/PhilippeR26/starknet.js/blob/d3c8cca/src/utils/calldata/index.ts#L81)

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

[src/utils/calldata/index.ts:142](https://github.com/PhilippeR26/starknet.js/blob/d3c8cca/src/utils/calldata/index.ts#L142)

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

[src/utils/calldata/index.ts:166](https://github.com/PhilippeR26/starknet.js/blob/d3c8cca/src/utils/calldata/index.ts#L166)
