# Function: encodeType()

> **encodeType**(`types`, `type`, `revision?`): `string`

Defined in: [src/utils/typedData.ts:253](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/typedData.ts#L253)

Encode a type to a string. All dependent types are alphabetically sorted.

## Parameters

### types

`Record`\<`string`, [`StarknetType`](../../RPC/type-aliases/StarknetType.md)[]\>

The types object containing all defined types.

### type

`string`

The name of the type to encode.

### revision?

[`TypedDataRevision`](../../RPC/type-aliases/TypedDataRevision.md) = `Revision.LEGACY`

The revision of the TypedData.

## Returns

`string`

The encoded string.

## Example

```typescript
import typedDataExample from '../../__mocks__/typedData/baseExample.json';

const result = encodeType(typedDataExample.types, 'Mail');
// result = "Mail(from:Person,to:Person,contents:felt)Person(name:felt,wallet:felt)";
```
