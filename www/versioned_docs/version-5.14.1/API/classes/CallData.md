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

[src/utils/calldata/index.ts:33](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/utils/calldata/index.ts#L33)

## Properties

### abi

• **abi**: [`Abi`](../namespaces/types.md#abi)

#### Defined in

[src/utils/calldata/index.ts:29](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/utils/calldata/index.ts#L29)

---

### structs

• `Protected` `Readonly` **structs**: [`AbiStructs`](../namespaces/types.md#abistructs)

#### Defined in

[src/utils/calldata/index.ts:31](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/utils/calldata/index.ts#L31)

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

[src/utils/calldata/index.ts:120](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/utils/calldata/index.ts#L120)

---

### abiInputsLength

▸ `Static` **abiInputsLength**(`inputs`): `number`

Helper to calculate inputs from abi

#### Parameters

| Name     | Type                                            | Description |
| :------- | :---------------------------------------------- | :---------- |
| `inputs` | [`AbiEntry`](../namespaces/types.md#abientry)[] | AbiEntry    |

#### Returns

`number`

number

#### Defined in

[src/utils/calldata/index.ts:201](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/utils/calldata/index.ts#L201)

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

[src/utils/calldata/index.ts:210](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/utils/calldata/index.ts#L210)

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

[src/utils/calldata/index.ts:227](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/utils/calldata/index.ts#L227)

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

[src/utils/calldata/index.ts:236](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/utils/calldata/index.ts#L236)

---

### validate

▸ **validate**(`type`, `method`, `args?`): `void`

Validate arguments passed to the method as corresponding to the ones in the abi

#### Parameters

| Name     | Type                                                      | Default value | Description                                              |
| :------- | :-------------------------------------------------------- | :------------ | :------------------------------------------------------- |
| `type`   | `"DEPLOY"` \| `"INVOKE"` \| `"CALL"`                      | `undefined`   | string - type of the method                              |
| `method` | `string`                                                  | `undefined`   | string - name of the method                              |
| `args`   | [`ArgsOrCalldata`](../namespaces/types.md#argsorcalldata) | `[]`          | ArgsOrCalldata - arguments that are passed to the method |

#### Returns

`void`

#### Defined in

[src/utils/calldata/index.ts:44](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/utils/calldata/index.ts#L44)

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

[src/utils/calldata/index.ts:93](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/utils/calldata/index.ts#L93)

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

[src/utils/calldata/index.ts:167](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/utils/calldata/index.ts#L167)

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

[src/utils/calldata/index.ts:191](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/utils/calldata/index.ts#L191)
