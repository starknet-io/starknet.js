# Class: AbiParser1

Defined in: [src/utils/calldata/parser/parser-0-1.1.0.ts:6](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/calldata/parser/parser-0-1.1.0.ts#L6)

Abi parser interface

## Implements

- [`AbiParserInterface`](AbiParserInterface.md)

## Constructors

### Constructor

> **new AbiParser1**(`abi`, `parsingStrategy?`): `AbiParser1`

Defined in: [src/utils/calldata/parser/parser-0-1.1.0.ts:11](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/calldata/parser/parser-0-1.1.0.ts#L11)

#### Parameters

##### abi

[`Abi`](../type-aliases/Abi.md)

##### parsingStrategy?

[`ParsingStrategy`](../type-aliases/ParsingStrategy.md)

#### Returns

`AbiParser1`

## Properties

### abi

> **abi**: [`Abi`](../type-aliases/Abi.md)

Defined in: [src/utils/calldata/parser/parser-0-1.1.0.ts:7](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/calldata/parser/parser-0-1.1.0.ts#L7)

---

### parsingStrategy

> **parsingStrategy**: [`ParsingStrategy`](../type-aliases/ParsingStrategy.md)

Defined in: [src/utils/calldata/parser/parser-0-1.1.0.ts:9](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/calldata/parser/parser-0-1.1.0.ts#L9)

## Methods

### getRequestParser()

> **getRequestParser**(`abiType`): (`val`) => `any`

Defined in: [src/utils/calldata/parser/parser-0-1.1.0.ts:18](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/calldata/parser/parser-0-1.1.0.ts#L18)

Get request parser for the given abi type

#### Parameters

##### abiType

`string`

AbiEntryType

#### Returns

Parser function

(`val`) => `any`

#### Implementation of

[`AbiParserInterface`](AbiParserInterface.md).[`getRequestParser`](AbiParserInterface.md#getrequestparser)

---

### getResponseParser()

> **getResponseParser**(`abiType`): (`responseIterator`) => `any`

Defined in: [src/utils/calldata/parser/parser-0-1.1.0.ts:25](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/calldata/parser/parser-0-1.1.0.ts#L25)

Get response parser for the given abi type

#### Parameters

##### abiType

`string`

AbiEntryType

#### Returns

Parser function

(`responseIterator`) => `any`

#### Implementation of

[`AbiParserInterface`](AbiParserInterface.md).[`getResponseParser`](AbiParserInterface.md#getresponseparser)

---

### methodInputsLength()

> **methodInputsLength**(`abiMethod`): `number`

Defined in: [src/utils/calldata/parser/parser-0-1.1.0.ts:38](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/calldata/parser/parser-0-1.1.0.ts#L38)

abi method inputs length without '\_len' inputs
cairo 0 reducer

#### Parameters

##### abiMethod

[`FunctionAbi`](../type-aliases/FunctionAbi.md)

FunctionAbi

#### Returns

`number`

number

#### Implementation of

[`AbiParserInterface`](AbiParserInterface.md).[`methodInputsLength`](AbiParserInterface.md#methodinputslength)

---

### getMethod()

> **getMethod**(`name`): [`FunctionAbi`](../type-aliases/FunctionAbi.md) \| `undefined`

Defined in: [src/utils/calldata/parser/parser-0-1.1.0.ts:47](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/calldata/parser/parser-0-1.1.0.ts#L47)

get method definition from abi

#### Parameters

##### name

`string`

string

#### Returns

[`FunctionAbi`](../type-aliases/FunctionAbi.md) \| `undefined`

FunctionAbi | undefined

#### Implementation of

[`AbiParserInterface`](AbiParserInterface.md).[`getMethod`](AbiParserInterface.md#getmethod)

---

### getLegacyFormat()

> **getLegacyFormat**(): [`Abi`](../type-aliases/Abi.md)

Defined in: [src/utils/calldata/parser/parser-0-1.1.0.ts:55](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/calldata/parser/parser-0-1.1.0.ts#L55)

Get Abi in legacy format

#### Returns

[`Abi`](../type-aliases/Abi.md)

Abi

#### Implementation of

[`AbiParserInterface`](AbiParserInterface.md).[`getLegacyFormat`](AbiParserInterface.md#getlegacyformat)
