# Class: AbiParser2

Defined in: [src/utils/calldata/parser/parser-2.0.0.ts:13](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/calldata/parser/parser-2.0.0.ts#L13)

Abi parser interface

## Implements

- [`AbiParserInterface`](AbiParserInterface.md)

## Constructors

### Constructor

> **new AbiParser2**(`abi`, `parsingStrategy?`): `AbiParser2`

Defined in: [src/utils/calldata/parser/parser-2.0.0.ts:18](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/calldata/parser/parser-2.0.0.ts#L18)

#### Parameters

##### abi

[`Abi`](../type-aliases/Abi.md)

##### parsingStrategy?

[`ParsingStrategy`](../type-aliases/ParsingStrategy.md)

#### Returns

`AbiParser2`

## Properties

### abi

> **abi**: [`Abi`](../type-aliases/Abi.md)

Defined in: [src/utils/calldata/parser/parser-2.0.0.ts:14](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/calldata/parser/parser-2.0.0.ts#L14)

---

### parsingStrategy

> **parsingStrategy**: [`ParsingStrategy`](../type-aliases/ParsingStrategy.md)

Defined in: [src/utils/calldata/parser/parser-2.0.0.ts:16](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/calldata/parser/parser-2.0.0.ts#L16)

## Methods

### getRequestParser()

> **getRequestParser**(`abiType`): (`val`) => `any`

Defined in: [src/utils/calldata/parser/parser-2.0.0.ts:25](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/calldata/parser/parser-2.0.0.ts#L25)

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

Defined in: [src/utils/calldata/parser/parser-2.0.0.ts:32](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/calldata/parser/parser-2.0.0.ts#L32)

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

Defined in: [src/utils/calldata/parser/parser-2.0.0.ts:44](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/calldata/parser/parser-2.0.0.ts#L44)

abi method inputs length

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

Defined in: [src/utils/calldata/parser/parser-2.0.0.ts:53](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/calldata/parser/parser-2.0.0.ts#L53)

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

Defined in: [src/utils/calldata/parser/parser-2.0.0.ts:64](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/calldata/parser/parser-2.0.0.ts#L64)

Get Abi in legacy format

#### Returns

[`Abi`](../type-aliases/Abi.md)

Abi

#### Implementation of

[`AbiParserInterface`](AbiParserInterface.md).[`getLegacyFormat`](AbiParserInterface.md#getlegacyformat)
