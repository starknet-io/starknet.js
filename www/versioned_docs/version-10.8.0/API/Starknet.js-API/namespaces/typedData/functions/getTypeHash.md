# Function: getTypeHash()

> **getTypeHash**(`types`, `type`, `revision?`): `string`

Defined in: [src/utils/typedData.ts:312](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/typedData.ts#L312)

Get a type string as hash.

## Parameters

### types

`Record`\<`string`, [`StarknetType`](../../RPC/type-aliases/StarknetType.md)[]\>

The types object containing all defined types.

### type

`string`

The name of the type to hash.

### revision?

[`TypedDataRevision`](../../RPC/type-aliases/TypedDataRevision.md) = `Revision.LEGACY`

The revision of the TypedData.

## Returns

`string`

The hash.

## Example

```typescript
import typedDataExample from '../../__mocks__/typedData/baseExample.json';

const result = getTypeHash(typedDataExample.types, 'StarkNetDomain');
// result = "0x1bfc207425a47a5dfa1a50a4f5241203f50624ca5fdf5e18755765416b8e288";
```
