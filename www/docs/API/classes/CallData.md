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

[src/utils/calldata/index.ts:33](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/calldata/index.ts#L33)

## Properties

### abi

• **abi**: [`Abi`](../modules.md#abi)

#### Defined in

[src/utils/calldata/index.ts:29](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/calldata/index.ts#L29)

---

### structs

• `Protected` `Readonly` **structs**: [`AbiStructs`](../modules.md#abistructs)

#### Defined in

[src/utils/calldata/index.ts:31](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/calldata/index.ts#L31)

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

[src/utils/calldata/index.ts:120](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/calldata/index.ts#L120)

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

[src/utils/calldata/index.ts:201](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/calldata/index.ts#L201)

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

[src/utils/calldata/index.ts:210](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/calldata/index.ts#L210)

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

[src/utils/calldata/index.ts:227](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/calldata/index.ts#L227)

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

[src/utils/calldata/index.ts:236](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/calldata/index.ts#L236)

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

[src/utils/calldata/index.ts:44](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/calldata/index.ts#L44)

---

### compile

▸ **compile**(`method`, `argsCalldata`): [`Calldata`](../modules.md#calldata)

Compile contract callData with abi
Parse the calldata by using input fields from the abi for that method

**`Example`**

```typescript
const calldata = myCallData.compile("constructor",["0x34a",[1,3n]]);
```

```typescript
const calldata2 = myCallData.compile("constructor",{list:[1,3n],balance:"0x34"}); // wrong order is valid
```

#### Parameters

| Name           | Type                               | Description          |
| :------------- | :--------------------------------- | :------------------- |
| `method`       | `string`                           | string - method name |
| `argsCalldata` | [`RawArgs`](../modules.md#rawargs) | -                    |

#### Returns

[`Calldata`](../modules.md#calldata)

Calldata - parsed arguments in format that contract is expecting

#### Defined in

[src/utils/calldata/index.ts:93](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/calldata/index.ts#L93)

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

[src/utils/calldata/index.ts:167](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/calldata/index.ts#L167)

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

[src/utils/calldata/index.ts:191](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/calldata/index.ts#L191)
