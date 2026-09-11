# Function: getStructHash()

> **getStructHash**\<`T`\>(`types`, `type`, `data`, `revision?`): `string`

Defined in: [src/utils/typedData.ts:536](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/typedData.ts#L536)

Get encoded data as a hash. The data should be a key -> value object with all the required values.
All dependent types are automatically encoded.

## Type Parameters

### T

`T` _extends_ [`TypedData`](../../RPC/interfaces/TypedData.md)

## Parameters

### types

`T`\[`"types"`\]

The types object containing all defined types.

### type

`string`

The name of the type to hash.

### data

`T`\[`"message"`\]

The data to hash.

### revision?

[`TypedDataRevision`](../../RPC/type-aliases/TypedDataRevision.md) = `Revision.LEGACY`

The revision of the TypedData.

## Returns

`string`

The hash of the encoded data.

## Example

```typescript
import exampleBaseTypes from '../../__mocks__/typedData/example_baseTypes.json';

const result = getStructHash(
  exampleBaseTypes.types,
  'StarknetDomain',
  exampleBaseTypes.domain as StarknetDomain,
  TypedDataRevision.ACTIVE
);
// result = "0x555f72e550b308e50c1a4f8611483a174026c982a9893a05c185eeb85399657";
```
