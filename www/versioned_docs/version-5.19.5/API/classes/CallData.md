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

| Name  | Type                                |
| :---- | :---------------------------------- |
| `abi` | [`Abi`](../namespaces/types.md#abi) |

#### Defined in

[src/utils/calldata/index.ts:47](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/utils/calldata/index.ts#L47)

## Properties

### abi

• **abi**: [`Abi`](../namespaces/types.md#abi)

#### Defined in

[src/utils/calldata/index.ts:39](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/utils/calldata/index.ts#L39)

---

### parser

• **parser**: `AbiParserInterface`

#### Defined in

[src/utils/calldata/index.ts:41](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/utils/calldata/index.ts#L41)

---

### structs

• `Protected` `Readonly` **structs**: [`AbiStructs`](../namespaces/types.md#abistructs)

#### Defined in

[src/utils/calldata/index.ts:43](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/utils/calldata/index.ts#L43)

---

### enums

• `Protected` `Readonly` **enums**: [`AbiEnums`](../namespaces/types.md#abienums)

#### Defined in

[src/utils/calldata/index.ts:45](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/utils/calldata/index.ts#L45)

## Methods

### compile

▸ `Static` **compile**(`rawArgs`): [`Calldata`](../namespaces/types.md#calldata)

Compile contract callData without abi

#### Parameters

| Name      | Type                                        | Description                                                                  |
| :-------- | :------------------------------------------ | :--------------------------------------------------------------------------- |
| `rawArgs` | [`RawArgs`](../namespaces/types.md#rawargs) | RawArgs representing cairo method arguments or string array of compiled data |

#### Returns

[`Calldata`](../namespaces/types.md#calldata)

Calldata

#### Defined in

[src/utils/calldata/index.ts:161](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/utils/calldata/index.ts#L161)

---

### getAbiStruct

▸ `Static` **getAbiStruct**(`abi`): [`AbiStructs`](../namespaces/types.md#abistructs)

Helper to extract structs from abi

#### Parameters

| Name  | Type                                | Description |
| :---- | :---------------------------------- | :---------- |
| `abi` | [`Abi`](../namespaces/types.md#abi) | Abi         |

#### Returns

[`AbiStructs`](../namespaces/types.md#abistructs)

AbiStructs - structs from abi

#### Defined in

[src/utils/calldata/index.ts:279](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/utils/calldata/index.ts#L279)

---

### getAbiEnum

▸ `Static` **getAbiEnum**(`abi`): [`AbiEnums`](../namespaces/types.md#abienums)

Helper to extract enums from abi

#### Parameters

| Name  | Type                                | Description |
| :---- | :---------------------------------- | :---------- |
| `abi` | [`Abi`](../namespaces/types.md#abi) | Abi         |

#### Returns

[`AbiEnums`](../namespaces/types.md#abienums)

AbiEnums - enums from abi

#### Defined in

[src/utils/calldata/index.ts:296](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/utils/calldata/index.ts#L296)

---

### toCalldata

▸ `Static` **toCalldata**(`rawCalldata?`): [`Calldata`](../namespaces/types.md#calldata)

Helper: Compile HexCalldata | RawCalldata | RawArgs

#### Parameters

| Name          | Type                                        | Default value | Description                           |
| :------------ | :------------------------------------------ | :------------ | :------------------------------------ |
| `rawCalldata` | [`RawArgs`](../namespaces/types.md#rawargs) | `[]`          | HexCalldata \| RawCalldata \| RawArgs |

#### Returns

[`Calldata`](../namespaces/types.md#calldata)

Calldata

#### Defined in

[src/utils/calldata/index.ts:315](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/utils/calldata/index.ts#L315)

---

### toHex

▸ `Static` **toHex**(`raw?`): [`HexCalldata`](../namespaces/types.md#hexcalldata)

Helper: Convert raw to HexCalldata

#### Parameters

| Name  | Type                                        | Default value | Description                           |
| :---- | :------------------------------------------ | :------------ | :------------------------------------ |
| `raw` | [`RawArgs`](../namespaces/types.md#rawargs) | `[]`          | HexCalldata \| RawCalldata \| RawArgs |

#### Returns

[`HexCalldata`](../namespaces/types.md#hexcalldata)

HexCalldata

#### Defined in

[src/utils/calldata/index.ts:324](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/utils/calldata/index.ts#L324)

---

### validate

▸ **validate**(`type`, `method`, `args?`): `void`

Validate arguments passed to the method as corresponding to the ones in the abi

#### Parameters

| Name     | Type                                                      | Default value | Description                                              |
| :------- | :-------------------------------------------------------- | :------------ | :------------------------------------------------------- |
| `type`   | [`ValidateType`](../enums/types.ValidateType.md)          | `undefined`   | ValidateType - type of the method                        |
| `method` | `string`                                                  | `undefined`   | string - name of the method                              |
| `args`   | [`ArgsOrCalldata`](../namespaces/types.md#argsorcalldata) | `[]`          | ArgsOrCalldata - arguments that are passed to the method |

#### Returns

`void`

#### Defined in

[src/utils/calldata/index.ts:60](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/utils/calldata/index.ts#L60)

---

### compile

▸ **compile**(`method`, `argsCalldata`): [`Calldata`](../namespaces/types.md#calldata)

Compile contract callData with abi
Parse the calldata by using input fields from the abi for that method

**`Example`**

```typescript
const calldata = myCallData.compile("constructor", ["0x34a", [1, 3n]]);
```

```typescript
const calldata2 = myCallData.compile("constructor", {list:[1, 3n], balance:"0x34"}); // wrong order is valid
```

#### Parameters

| Name           | Type                                        | Description          |
| :------------- | :------------------------------------------ | :------------------- |
| `method`       | `string`                                    | string - method name |
| `argsCalldata` | [`RawArgs`](../namespaces/types.md#rawargs) | -                    |

#### Returns

[`Calldata`](../namespaces/types.md#calldata)

Calldata - parsed arguments in format that contract is expecting

#### Defined in

[src/utils/calldata/index.ts:113](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/utils/calldata/index.ts#L113)

---

### parse

▸ **parse**(`method`, `response`): [`Result`](../namespaces/types.md#result)

Parse elements of the response array and structuring them into response object

#### Parameters

| Name       | Type       | Description                         |
| :--------- | :--------- | :---------------------------------- |
| `method`   | `string`   | string - method name                |
| `response` | `string`[] | string[] - response from the method |

#### Returns

[`Result`](../namespaces/types.md#result)

Result - parsed response corresponding to the abi

#### Defined in

[src/utils/calldata/index.ts:245](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/utils/calldata/index.ts#L245)

---

### format

▸ **format**(`method`, `response`, `format`): [`Result`](../namespaces/types.md#result)

Format cairo method response data to native js values based on provided format schema

#### Parameters

| Name       | Type       | Description                      |
| :--------- | :--------- | :------------------------------- |
| `method`   | `string`   | string - cairo method name       |
| `response` | `string`[] | string[] - cairo method response |
| `format`   | `object`   | object - formatter object schema |

#### Returns

[`Result`](../namespaces/types.md#result)

Result - parsed and formatted response object

#### Defined in

[src/utils/calldata/index.ts:269](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/utils/calldata/index.ts#L269)
