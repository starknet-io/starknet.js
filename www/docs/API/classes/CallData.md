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

[src/utils/calldata/index.ts:31](https://github.com/notV4l/starknet.js/blob/c20c3bd/src/utils/calldata/index.ts#L31)

## Properties

### abi

• **abi**: [`Abi`](../modules.md#abi)

#### Defined in

[src/utils/calldata/index.ts:27](https://github.com/notV4l/starknet.js/blob/c20c3bd/src/utils/calldata/index.ts#L27)

---

### structs

• `Protected` `Readonly` **structs**: [`AbiStructs`](../modules.md#abistructs)

#### Defined in

[src/utils/calldata/index.ts:29](https://github.com/notV4l/starknet.js/blob/c20c3bd/src/utils/calldata/index.ts#L29)

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

[src/utils/calldata/index.ts:99](https://github.com/notV4l/starknet.js/blob/c20c3bd/src/utils/calldata/index.ts#L99)

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

[src/utils/calldata/index.ts:180](https://github.com/notV4l/starknet.js/blob/c20c3bd/src/utils/calldata/index.ts#L180)

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

[src/utils/calldata/index.ts:189](https://github.com/notV4l/starknet.js/blob/c20c3bd/src/utils/calldata/index.ts#L189)

---

### toCalldata

▸ `Static` **toCalldata**(`rawCalldata?`): [`Calldata`](../modules.md#calldata)

Helper: Compile RawCalldata to Calldata

#### Parameters

| Name          | Type                                       | Default value |
| :------------ | :----------------------------------------- | :------------ |
| `rawCalldata` | [`RawCalldata`](../modules.md#rawcalldata) | `[]`          |

#### Returns

[`Calldata`](../modules.md#calldata)

Calldata

#### Defined in

[src/utils/calldata/index.ts:206](https://github.com/notV4l/starknet.js/blob/c20c3bd/src/utils/calldata/index.ts#L206)

---

### toHex

▸ `Static` **toHex**(`rawCalldata?`): [`HexCalldata`](../modules.md#hexcalldata)

Helper: Convert RawCalldata to HexCalldata

#### Parameters

| Name          | Type                                       | Default value |
| :------------ | :----------------------------------------- | :------------ |
| `rawCalldata` | [`RawCalldata`](../modules.md#rawcalldata) | `[]`          |

#### Returns

[`HexCalldata`](../modules.md#hexcalldata)

HexCalldata

#### Defined in

[src/utils/calldata/index.ts:215](https://github.com/notV4l/starknet.js/blob/c20c3bd/src/utils/calldata/index.ts#L215)

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

[src/utils/calldata/index.ts:42](https://github.com/notV4l/starknet.js/blob/c20c3bd/src/utils/calldata/index.ts#L42)

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

[src/utils/calldata/index.ts:84](https://github.com/notV4l/starknet.js/blob/c20c3bd/src/utils/calldata/index.ts#L84)

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

[src/utils/calldata/index.ts:146](https://github.com/notV4l/starknet.js/blob/c20c3bd/src/utils/calldata/index.ts#L146)

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

[src/utils/calldata/index.ts:170](https://github.com/notV4l/starknet.js/blob/c20c3bd/src/utils/calldata/index.ts#L170)
