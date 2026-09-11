# Function: createAbiParser()

> **createAbiParser**(`abi`, `parsingStrategy?`): [`AbiParserInterface`](../classes/AbiParserInterface.md)

Defined in: [src/utils/calldata/parser/index.ts:26](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/calldata/parser/index.ts#L26)

Creates ABI parser

## Parameters

### abi

[`Abi`](../type-aliases/Abi.md)

### parsingStrategy?

[`ParsingStrategy`](../type-aliases/ParsingStrategy.md)

## Returns

[`AbiParserInterface`](../classes/AbiParserInterface.md)

abi parser interface

## Example

```ts
const abiParser2 = createAbiParser([getInterfaceAbi('struct')]);
// abiParser2 instanceof AbiParser2 === true

const abiParser1 = createAbiParser([getFunctionAbi('struct')]);
// abiParser1 instanceof AbiParser1 === true
```
