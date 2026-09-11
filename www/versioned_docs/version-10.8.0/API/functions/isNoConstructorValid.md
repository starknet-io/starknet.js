# Function: isNoConstructorValid()

> **isNoConstructorValid**(`method`, `argsCalldata`, `abiMethod?`): `boolean`

Defined in: [src/utils/calldata/parser/index.ts:76](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/calldata/parser/index.ts#L76)

Checks if no constructor valid

## Parameters

### method

`string`

### argsCalldata

[`RawArgs`](../type-aliases/RawArgs.md)

### abiMethod?

[`FunctionAbi`](../type-aliases/FunctionAbi.md)

## Returns

`boolean`

boolean

## Example

```ts
const result1 = isNoConstructorValid('constructor', []);
// result1 === true
const result2 = isNoConstructorValid('test', ['test']);
// result2 === false
```
