# Function: pascalToSnake()

> **pascalToSnake**(`text`): `string`

Defined in: [src/utils/encode.ts:298](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/encode.ts#L298)

String transformation util

Pascal case to screaming snake case

## Parameters

### text

`string`

The PascalCase string to convert.

## Returns

`string`

The converted snake_case string in uppercase.

## Example

```typescript
const pascalString = 'PascalCaseExample';
const result = encode.pascalToSnake(pascalString);
// result: 'PASCAL_CASE_EXAMPLE'
```
