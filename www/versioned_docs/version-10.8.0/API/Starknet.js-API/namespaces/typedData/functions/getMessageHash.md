# Function: getMessageHash()

> **getMessageHash**(`typedData`, `accountAddress`): `string`

Defined in: [src/utils/typedData.ts:603](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/typedData.ts#L603)

Get the SNIP-12 encoded message to sign, from the typedData object.

## Parameters

### typedData

[`TypedData`](../../RPC/interfaces/TypedData.md)

The TypedData object.

### accountAddress

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)

The account address to sign the message.

## Returns

`string`

The hash of the message to sign.

## Throws

Will throw an error if the typedData does not match the JSON schema.

## Example

```typescript
const exampleAddress = '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826';
const typedDataStringExample = {
  types: {
    StarkNetDomain: [
      { name: 'name', type: 'felt' },
      { name: 'version', type: 'felt' },
      { name: 'chainId', type: 'felt' },
    ],
    Person: [
      { name: 'name', type: 'felt' },
      { name: 'wallet', type: 'felt' },
    ],
    String: [
      { name: 'len', type: 'felt' },
      { name: 'data', type: 'felt*' },
    ],
    Mail: [
      { name: 'from', type: 'Person' },
      { name: 'to', type: 'Person' },
      { name: 'contents', type: 'String' },
    ],
  },
  primaryType: 'Mail',
  domain: {
    name: 'StarkNet Mail',
    version: '1',
    chainId: 1,
  },
  message: {
    from: {
      name: 'Cow',
      wallet: exampleAddress,
    },
    to: {
      name: 'Bob',
      wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
    },
    contents: stringToStringStruct(
      'this is way longer than just 32 characters, to test if that is possible within a typedData struct.'
    ),
  },
};

const result = getMessageHash(typedDataStringExample, exampleAddress);
// result = "0x70338fb11b8f70b68b261de8a322bcb004bd85e88ac47d9147982c7f5ac66fd"
```
