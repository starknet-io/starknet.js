---
id: 'CallData'
title: 'Class: CallData'
sidebar_label: 'CallData'
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new CallData**(`abi`, `parsingStrategy?`): [`CallData`](CallData.md)

#### Parameters

| Name               | Type                                               |
| :----------------- | :------------------------------------------------- |
| `abi`              | [`Abi`](../modules.md#abi)                         |
| `parsingStrategy?` | [`ParsingStrategy`](../modules.md#parsingstrategy) |

#### Returns

[`CallData`](CallData.md)

#### Defined in

[src/utils/calldata/index.ts:53](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/calldata/index.ts#L53)

## Properties

### abi

• **abi**: [`Abi`](../modules.md#abi)

#### Defined in

[src/utils/calldata/index.ts:45](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/calldata/index.ts#L45)

---

### parser

• **parser**: [`AbiParserInterface`](AbiParserInterface.md)

#### Defined in

[src/utils/calldata/index.ts:47](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/calldata/index.ts#L47)

---

### structs

• `Protected` `Readonly` **structs**: [`AbiStructs`](../modules.md#abistructs)

#### Defined in

[src/utils/calldata/index.ts:49](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/calldata/index.ts#L49)

---

### enums

• `Protected` `Readonly` **enums**: [`AbiEnums`](../modules.md#abienums)

#### Defined in

[src/utils/calldata/index.ts:51](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/calldata/index.ts#L51)

## Methods

### compile

▸ **compile**(`rawArgs`): [`Calldata`](../modules.md#calldata)

Compile contract callData without abi

#### Parameters

| Name      | Type                               | Description                                                                  |
| :-------- | :--------------------------------- | :--------------------------------------------------------------------------- |
| `rawArgs` | [`RawArgs`](../modules.md#rawargs) | RawArgs representing cairo method arguments or string array of compiled data |

#### Returns

[`Calldata`](../modules.md#calldata)

Calldata

#### Defined in

[src/utils/calldata/index.ts:174](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/calldata/index.ts#L174)

---

### getAbiStruct

▸ **getAbiStruct**(`abi`): [`AbiStructs`](../modules.md#abistructs)

Helper to extract structs from abi

#### Parameters

| Name  | Type                       | Description |
| :---- | :------------------------- | :---------- |
| `abi` | [`Abi`](../modules.md#abi) | Abi         |

#### Returns

[`AbiStructs`](../modules.md#abistructs)

AbiStructs - structs from abi

#### Defined in

[src/utils/calldata/index.ts:299](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/calldata/index.ts#L299)

---

### getAbiEnum

▸ **getAbiEnum**(`abi`): [`AbiEnums`](../modules.md#abienums)

Helper to extract enums from abi

#### Parameters

| Name  | Type                       | Description |
| :---- | :------------------------- | :---------- |
| `abi` | [`Abi`](../modules.md#abi) | Abi         |

#### Returns

[`AbiEnums`](../modules.md#abienums)

AbiEnums - enums from abi

#### Defined in

[src/utils/calldata/index.ts:316](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/calldata/index.ts#L316)

---

### toCalldata

▸ **toCalldata**(`rawCalldata?`): [`Calldata`](../modules.md#calldata)

Helper: Compile HexCalldata | RawCalldata | RawArgs

#### Parameters

| Name          | Type                               | Default value | Description                           |
| :------------ | :--------------------------------- | :------------ | :------------------------------------ |
| `rawCalldata` | [`RawArgs`](../modules.md#rawargs) | `[]`          | HexCalldata \| RawCalldata \| RawArgs |

#### Returns

[`Calldata`](../modules.md#calldata)

Calldata

#### Defined in

[src/utils/calldata/index.ts:335](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/calldata/index.ts#L335)

---

### toHex

▸ **toHex**(`raw?`): [`HexCalldata`](../modules.md#hexcalldata)

Helper: Convert raw to HexCalldata

#### Parameters

| Name  | Type                               | Default value | Description                           |
| :---- | :--------------------------------- | :------------ | :------------------------------------ |
| `raw` | [`RawArgs`](../modules.md#rawargs) | `[]`          | HexCalldata \| RawCalldata \| RawArgs |

#### Returns

[`HexCalldata`](../modules.md#hexcalldata)

HexCalldata

#### Defined in

[src/utils/calldata/index.ts:344](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/calldata/index.ts#L344)

---

### validate

▸ **validate**(`type`, `method`, `args?`): `void`

Validate arguments passed to the method as corresponding to the ones in the abi

#### Parameters

| Name     | Type                                             | Default value | Description                                              |
| :------- | :----------------------------------------------- | :------------ | :------------------------------------------------------- |
| `type`   | `"DEPLOY"` \| `"INVOKE"` \| `"CALL"`             | `undefined`   | ValidateType - type of the method                        |
| `method` | `string`                                         | `undefined`   | string - name of the method                              |
| `args`   | [`ArgsOrCalldata`](../modules.md#argsorcalldata) | `[]`          | ArgsOrCalldata - arguments that are passed to the method |

#### Returns

`void`

#### Defined in

[src/utils/calldata/index.ts:66](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/calldata/index.ts#L66)

---

### compile

▸ **compile**(`method`, `argsCalldata`): [`Calldata`](../modules.md#calldata)

Compile contract callData with abi
Parse the calldata by using input fields from the abi for that method

#### Parameters

| Name           | Type                               | Description                                                                                                                                                                                                     |
| :------------- | :--------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `method`       | `string`                           | string - method name                                                                                                                                                                                            |
| `argsCalldata` | [`RawArgs`](../modules.md#rawargs) | RawArgs - arguments passed to the method. Can be an array of arguments (in the order of abi definition), or an object constructed in conformity with abi (in this case, the parameter can be in a wrong order). |

#### Returns

[`Calldata`](../modules.md#calldata)

Calldata - parsed arguments in format that contract is expecting

**`Example`**

```typescript
const calldata = myCallData.compile('constructor', ['0x34a', [1, 3n]]);
```

```typescript
const calldata2 = myCallData.compile('constructor', { list: [1, 3n], balance: '0x34' }); // wrong order is valid
```

#### Defined in

[src/utils/calldata/index.ts:119](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/calldata/index.ts#L119)

---

### parse

▸ **parse**(`method`, `response`): [`CallResult`](../modules.md#callresult)

Parse elements of the response array and structuring them into response object

#### Parameters

| Name       | Type       | Description                         |
| :--------- | :--------- | :---------------------------------- |
| `method`   | `string`   | string - method name                |
| `response` | `string`[] | string[] - response from the method |

#### Returns

[`CallResult`](../modules.md#callresult)

Result - parsed response corresponding to the abi

#### Defined in

[src/utils/calldata/index.ts:258](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/calldata/index.ts#L258)

---

### format

▸ **format**(`method`, `response`, `format`): [`CallResult`](../modules.md#callresult)

Format cairo method response data to native js values based on provided format schema

#### Parameters

| Name       | Type       | Description                      |
| :--------- | :--------- | :------------------------------- |
| `method`   | `string`   | string - cairo method name       |
| `response` | `string`[] | string[] - cairo method response |
| `format`   | `object`   | object - formatter object schema |

#### Returns

[`CallResult`](../modules.md#callresult)

Result - parsed and formatted response object

#### Defined in

[src/utils/calldata/index.ts:289](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/calldata/index.ts#L289)

---

### decodeParameters

▸ **decodeParameters**(`typeCairo`, `response`): [`AllowArray`](../modules.md#allowarray)<[`CallResult`](../modules.md#callresult)\>

Parse the elements of a contract response and structure them into one or several Result.
In Cairo 0, arrays are not supported.

#### Parameters

| Name        | Type                                                | Description                                                         |
| :---------- | :-------------------------------------------------- | :------------------------------------------------------------------ |
| `typeCairo` | [`AllowArray`](../modules.md#allowarray)<`string`\> | string or string[] - Cairo type name, ex : "hello::hello::UserData" |
| `response`  | `string`[]                                          | string[] - serialized data corresponding to typeCairo.              |

#### Returns

[`AllowArray`](../modules.md#allowarray)<[`CallResult`](../modules.md#callresult)\>

Result or Result[] - parsed response corresponding to typeData.

**`Example`**

```ts
const res2 = helloCallData.decodeParameters('hello::hello::UserData', ['0x123456', '0x1']);
result = { address: 1193046n, is_claimed: true };
```

#### Defined in

[src/utils/calldata/index.ts:359](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/calldata/index.ts#L359)
