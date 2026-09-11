# Function: parseCalldataField()

> **parseCalldataField**(`__namedParameters`): `string` \| `string`[]

Defined in: [src/utils/calldata/requestParser.ts:412](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/calldata/requestParser.ts#L412)

Parse one field of the calldata by using input field from the abi for that method

## Parameters

### \_\_namedParameters

#### argsIterator

`Iterator`\<`any`\>

Iterator for value of the field

#### input

[`AbiEntry`](../type-aliases/AbiEntry.md)

input(field) information from the abi that will be used to parse the data

#### structs

[`AbiStructs`](../type-aliases/AbiStructs.md)

structs from abi

#### enums

[`AbiEnums`](../type-aliases/AbiEnums.md)

enums from abi

#### parser

[`AbiParserInterface`](../classes/AbiParserInterface.md)

parser used to serialize the value

## Returns

`string` \| `string`[]

- parsed arguments in format that contract is expecting

## Example

```ts
const abiEntry = { name: 'test', type: 'struct' };
const abiStructs: AbiStructs = {
  struct: {
    members: [
      {
        name: 'test_name',
        type: 'test_type',
        offset: 1,
      },
    ],
    size: 2,
    name: 'cairo__struct',
    type: 'struct',
  },
};

const abiEnums: AbiEnums = {
  enum: {
    variants: [
      {
        name: 'test_name',
        type: 'cairo_struct_variant',
        offset: 1,
      },
    ],
    size: 2,
    name: 'test_cairo',
    type: 'enum',
  },
};

const args = [{ test_name: 'test' }];
const argsIterator = args[Symbol.iterator]();
const parsedField = parseCalldataField(argsIterator, abiEntry, abiStructs, abiEnums);
// parsedField === ['1952805748']
```
