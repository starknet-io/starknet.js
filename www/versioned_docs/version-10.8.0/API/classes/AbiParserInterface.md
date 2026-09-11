# Abstract Class: AbiParserInterface

Defined in: [src/utils/calldata/parser/interface.ts:6](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/calldata/parser/interface.ts#L6)

Abi parser interface

## Constructors

### Constructor

> **new AbiParserInterface**(): `AbiParserInterface`

#### Returns

`AbiParserInterface`

## Methods

### methodInputsLength()

> `abstract` **methodInputsLength**(`abiMethod`): `number`

Defined in: [src/utils/calldata/parser/interface.ts:12](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/calldata/parser/interface.ts#L12)

Helper to calculate inputs length from abi

#### Parameters

##### abiMethod

[`FunctionAbi`](../type-aliases/FunctionAbi.md)

FunctionAbi

#### Returns

`number`

number

---

### getMethod()

> `abstract` **getMethod**(`name`): [`FunctionAbi`](../type-aliases/FunctionAbi.md) \| `undefined`

Defined in: [src/utils/calldata/parser/interface.ts:19](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/calldata/parser/interface.ts#L19)

get method definition from abi

#### Parameters

##### name

`string`

string

#### Returns

[`FunctionAbi`](../type-aliases/FunctionAbi.md) \| `undefined`

FunctionAbi | undefined

---

### getLegacyFormat()

> `abstract` **getLegacyFormat**(): [`Abi`](../type-aliases/Abi.md)

Defined in: [src/utils/calldata/parser/interface.ts:25](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/calldata/parser/interface.ts#L25)

Return Abi in legacy format

#### Returns

[`Abi`](../type-aliases/Abi.md)

Abi

---

### getRequestParser()

> `abstract` **getRequestParser**(`abiType`): (`val`) => `any`

Defined in: [src/utils/calldata/parser/interface.ts:32](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/calldata/parser/interface.ts#L32)

Get request parser for the given abi type

#### Parameters

##### abiType

`string`

AbiEntryType

#### Returns

Parser function

(`val`) => `any`

---

### getResponseParser()

> `abstract` **getResponseParser**(`abiType`): (`responseIterator`) => `any`

Defined in: [src/utils/calldata/parser/interface.ts:39](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/calldata/parser/interface.ts#L39)

Get response parser for the given abi type

#### Parameters

##### abiType

`string`

AbiEntryType

#### Returns

Parser function

(`responseIterator`) => `any`
