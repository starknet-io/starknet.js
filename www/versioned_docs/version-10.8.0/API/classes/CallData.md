# Class: CallData

Defined in: [src/utils/calldata/index.ts:44](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/calldata/index.ts#L44)

## Constructors

### Constructor

> **new CallData**(`abi`, `parsingStrategy?`): `CallData`

Defined in: [src/utils/calldata/index.ts:53](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/calldata/index.ts#L53)

#### Parameters

##### abi

[`Abi`](../type-aliases/Abi.md)

##### parsingStrategy?

[`ParsingStrategy`](../type-aliases/ParsingStrategy.md)

#### Returns

`CallData`

## Properties

### abi

> **abi**: [`Abi`](../type-aliases/Abi.md)

Defined in: [src/utils/calldata/index.ts:45](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/calldata/index.ts#L45)

---

### parser

> **parser**: [`AbiParserInterface`](AbiParserInterface.md)

Defined in: [src/utils/calldata/index.ts:47](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/calldata/index.ts#L47)

---

### structs

> `protected` `readonly` **structs**: [`AbiStructs`](../type-aliases/AbiStructs.md)

Defined in: [src/utils/calldata/index.ts:49](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/calldata/index.ts#L49)

---

### enums

> `protected` `readonly` **enums**: [`AbiEnums`](../type-aliases/AbiEnums.md)

Defined in: [src/utils/calldata/index.ts:51](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/calldata/index.ts#L51)

## Methods

### compile()

> `static` **compile**(`rawArgs`): [`Calldata`](../type-aliases/Calldata.md)

Defined in: [src/utils/calldata/index.ts:174](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/calldata/index.ts#L174)

Compile contract callData without abi

#### Parameters

##### rawArgs

[`RawArgs`](../type-aliases/RawArgs.md)

RawArgs representing cairo method arguments or string array of compiled data

#### Returns

[`Calldata`](../type-aliases/Calldata.md)

Calldata

---

### getAbiStruct()

> `static` **getAbiStruct**(`abi`): [`AbiStructs`](../type-aliases/AbiStructs.md)

Defined in: [src/utils/calldata/index.ts:299](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/calldata/index.ts#L299)

Helper to extract structs from abi

#### Parameters

##### abi

[`Abi`](../type-aliases/Abi.md)

Abi

#### Returns

[`AbiStructs`](../type-aliases/AbiStructs.md)

AbiStructs - structs from abi

---

### getAbiEnum()

> `static` **getAbiEnum**(`abi`): [`AbiEnums`](../type-aliases/AbiEnums.md)

Defined in: [src/utils/calldata/index.ts:316](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/calldata/index.ts#L316)

Helper to extract enums from abi

#### Parameters

##### abi

[`Abi`](../type-aliases/Abi.md)

Abi

#### Returns

[`AbiEnums`](../type-aliases/AbiEnums.md)

AbiEnums - enums from abi

---

### toCalldata()

> `static` **toCalldata**(`rawCalldata?`): [`Calldata`](../type-aliases/Calldata.md)

Defined in: [src/utils/calldata/index.ts:335](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/calldata/index.ts#L335)

Helper: Compile HexCalldata | RawCalldata | RawArgs

#### Parameters

##### rawCalldata?

[`RawArgs`](../type-aliases/RawArgs.md) = `[]`

HexCalldata | RawCalldata | RawArgs

#### Returns

[`Calldata`](../type-aliases/Calldata.md)

Calldata

---

### toHex()

> `static` **toHex**(`raw?`): [`HexCalldata`](../type-aliases/HexCalldata.md)

Defined in: [src/utils/calldata/index.ts:344](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/calldata/index.ts#L344)

Helper: Convert raw to HexCalldata

#### Parameters

##### raw?

[`RawArgs`](../type-aliases/RawArgs.md) = `[]`

HexCalldata | RawCalldata | RawArgs

#### Returns

[`HexCalldata`](../type-aliases/HexCalldata.md)

HexCalldata

---

### validate()

> **validate**(`type`, `method`, `args?`): `void`

Defined in: [src/utils/calldata/index.ts:66](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/calldata/index.ts#L66)

Validate arguments passed to the method as corresponding to the ones in the abi

#### Parameters

##### type

`"DEPLOY"` \| `"INVOKE"` \| `"CALL"`

ValidateType - type of the method

##### method

`string`

string - name of the method

##### args?

[`ArgsOrCalldata`](../type-aliases/ArgsOrCalldata.md) = `[]`

ArgsOrCalldata - arguments that are passed to the method

#### Returns

`void`

---

### compile()

> **compile**(`method`, `argsCalldata`): [`Calldata`](../type-aliases/Calldata.md)

Defined in: [src/utils/calldata/index.ts:119](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/calldata/index.ts#L119)

Compile contract callData with abi
Parse the calldata by using input fields from the abi for that method

#### Parameters

##### method

`string`

string - method name

##### argsCalldata

[`RawArgs`](../type-aliases/RawArgs.md)

RawArgs - arguments passed to the method. Can be an array of arguments (in the order of abi definition), or an object constructed in conformity with abi (in this case, the parameter can be in a wrong order).

#### Returns

[`Calldata`](../type-aliases/Calldata.md)

Calldata - parsed arguments in format that contract is expecting

#### Example

```typescript
const calldata = myCallData.compile('constructor', ['0x34a', [1, 3n]]);
```

```typescript
const calldata2 = myCallData.compile('constructor', { list: [1, 3n], balance: '0x34' }); // wrong order is valid
```

---

### parse()

> **parse**(`method`, `response`): [`CallResult`](../type-aliases/CallResult.md)

Defined in: [src/utils/calldata/index.ts:258](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/calldata/index.ts#L258)

Parse elements of the response array and structuring them into response object

#### Parameters

##### method

`string`

string - method name

##### response

`string`[]

string[] - response from the method

#### Returns

[`CallResult`](../type-aliases/CallResult.md)

Result - parsed response corresponding to the abi

---

### format()

> **format**(`method`, `response`, `format`): [`CallResult`](../type-aliases/CallResult.md)

Defined in: [src/utils/calldata/index.ts:289](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/calldata/index.ts#L289)

Format cairo method response data to native js values based on provided format schema

#### Parameters

##### method

`string`

string - cairo method name

##### response

`string`[]

string[] - cairo method response

##### format

`object`

object - formatter object schema

#### Returns

[`CallResult`](../type-aliases/CallResult.md)

Result - parsed and formatted response object

---

### decodeParameters()

> **decodeParameters**(`typeCairo`, `response`): [`AllowArray`](../type-aliases/AllowArray.md)\<[`CallResult`](../type-aliases/CallResult.md)\>

Defined in: [src/utils/calldata/index.ts:359](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/calldata/index.ts#L359)

Parse the elements of a contract response and structure them into one or several Result.
In Cairo 0, arrays are not supported.

#### Parameters

##### typeCairo

[`AllowArray`](../type-aliases/AllowArray.md)\<`string`\>

string or string[] - Cairo type name, ex : "hello::hello::UserData"

##### response

`string`[]

string[] - serialized data corresponding to typeCairo.

#### Returns

[`AllowArray`](../type-aliases/AllowArray.md)\<[`CallResult`](../type-aliases/CallResult.md)\>

Result or Result[] - parsed response corresponding to typeData.

#### Example

```ts
const res2 = helloCallData.decodeParameters('hello::hello::UserData', ['0x123456', '0x1']);
result = { address: 1193046n, is_claimed: true };
```
