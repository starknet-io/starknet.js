---
id: 'typedData'
title: 'Namespace: typedData'
sidebar_label: 'typedData'
sidebar_position: 0
custom_edit_url: null
---

## References

### TypedDataRevision

Re-exports [TypedDataRevision](types.RPC.RPCSPEC07.WALLET_API.md#typeddatarevision-1)

---

### StarknetEnumType

Re-exports [StarknetEnumType](types.RPC.RPCSPEC07.WALLET_API.md#starknetenumtype)

---

### StarknetMerkleType

Re-exports [StarknetMerkleType](types.RPC.RPCSPEC07.WALLET_API.md#starknetmerkletype)

---

### StarknetType

Re-exports [StarknetType](types.RPC.RPCSPEC07.WALLET_API.md#starknettype)

---

### StarknetDomain

Re-exports [StarknetDomain](../interfaces/types.RPC.RPCSPEC07.WALLET_API.StarknetDomain.md)

---

### TypedData

Re-exports [TypedData](../interfaces/types.RPC.RPCSPEC07.WALLET_API.TypedData.md)

## Functions

### validateTypedData

▸ **validateTypedData**(`data`): data is TypedData

Validates that `data` matches the EIP-712 JSON schema.

#### Parameters

| Name   | Type      |
| :----- | :-------- |
| `data` | `unknown` |

#### Returns

data is TypedData

#### Defined in

[src/utils/typedData.ts:102](https://github.com/starknet-io/starknet.js/blob/v6.24.1/src/utils/typedData.ts#L102)

---

### prepareSelector

▸ **prepareSelector**(`selector`): `string`

Prepares the selector for later use, if it's not already in correct format.
The selector in correct format is the starknet_keccak hash of the function name, encoded in ASCII.

#### Parameters

| Name       | Type     | Description                  |
| :--------- | :------- | :--------------------------- |
| `selector` | `string` | The selector to be prepared. |

#### Returns

`string`

The prepared selector.

**`Example`**

```typescript
const result1 = prepareSelector('0xc14cfe23f3fa7ce7b1f8db7d7682305b1692293f71a61cc06637f0d8d8b6c8');
// result1 = '0xc14cfe23f3fa7ce7b1f8db7d7682305b1692293f71a61cc06637f0d8d8b6c8'

const result2 = prepareSelector('myFunction');
// result2 = '0xc14cfe23f3fa7ce7b1f8db7d7682305b1692293f71a61cc06637f0d8d8b6c8'
```

#### Defined in

[src/utils/typedData.ts:125](https://github.com/starknet-io/starknet.js/blob/v6.24.1/src/utils/typedData.ts#L125)

---

### isMerkleTreeType

▸ **isMerkleTreeType**(`type`): type is StarknetMerkleType

Checks if the given Starknet type is a Merkle tree type.

#### Parameters

| Name   | Type                                                             | Description                 |
| :----- | :--------------------------------------------------------------- | :-------------------------- |
| `type` | [`StarknetType`](types.RPC.RPCSPEC07.WALLET_API.md#starknettype) | The StarkNet type to check. |

#### Returns

type is StarknetMerkleType

- True if the type is a Merkle tree type, false otherwise.

**`Example`**

```typescript
const type = { name: 'test', type: 'merkletree' };
const result1 = isMerkleTreeType(type);
// result1 = true

const type2 = { name: 'test', type: 'non-merkletree' };
const result2 = isMerkleTreeType(type2);
// result2 = false
```

#### Defined in

[src/utils/typedData.ts:147](https://github.com/starknet-io/starknet.js/blob/v6.24.1/src/utils/typedData.ts#L147)

---

### getDependencies

▸ **getDependencies**(`types`, `type`, `dependencies?`, `contains?`, `revision?`): `string`[]

Get the dependencies of a struct type. If a struct has the same dependency multiple times, it's only included once
in the resulting array.

#### Parameters

| Name            | Type                                                                                    | Default value     | Description                                    |
| :-------------- | :-------------------------------------------------------------------------------------- | :---------------- | :--------------------------------------------- |
| `types`         | `Record`<`string`, [`StarknetType`](types.RPC.RPCSPEC07.WALLET_API.md#starknettype)[]\> | `undefined`       | The types object containing all defined types. |
| `type`          | `string`                                                                                | `undefined`       | The name of the type to get dependencies for.  |
| `dependencies?` | `string`[]                                                                              | `[]`              | The array to store dependencies.               |
| `contains?`     | `string`                                                                                | `''`              | The type contained within the struct.          |
| `revision?`     | [`TypedDataRevision`](types.RPC.RPCSPEC07.WALLET_API.md#typeddatarevision-1)            | `Revision.LEGACY` | The revision of the TypedData.                 |

#### Returns

`string`[]

The array of dependencies.

#### Defined in

[src/utils/typedData.ts:163](https://github.com/starknet-io/starknet.js/blob/v6.24.1/src/utils/typedData.ts#L163)

---

### encodeType

▸ **encodeType**(`types`, `type`, `revision?`): `string`

Encode a type to a string. All dependent types are alphabetically sorted.

#### Parameters

| Name        | Type                                                                                    | Default value     | Description                                    |
| :---------- | :-------------------------------------------------------------------------------------- | :---------------- | :--------------------------------------------- |
| `types`     | `Record`<`string`, [`StarknetType`](types.RPC.RPCSPEC07.WALLET_API.md#starknettype)[]\> | `undefined`       | The types object containing all defined types. |
| `type`      | `string`                                                                                | `undefined`       | The name of the type to encode.                |
| `revision?` | [`TypedDataRevision`](types.RPC.RPCSPEC07.WALLET_API.md#typeddatarevision-1)            | `Revision.LEGACY` | The revision of the TypedData.                 |

#### Returns

`string`

The encoded string.

**`Example`**

```typescript
import typedDataExample from '../../__mocks__/typedData/baseExample.json';

const result = encodeType(typedDataExample.types, 'Mail');
// result = "Mail(from:Person,to:Person,contents:felt)Person(name:felt,wallet:felt)";
```

#### Defined in

[src/utils/typedData.ts:245](https://github.com/starknet-io/starknet.js/blob/v6.24.1/src/utils/typedData.ts#L245)

---

### getTypeHash

▸ **getTypeHash**(`types`, `type`, `revision?`): `string`

Get a type string as hash.

#### Parameters

| Name        | Type                                                                                    | Default value     | Description                                    |
| :---------- | :-------------------------------------------------------------------------------------- | :---------------- | :--------------------------------------------- |
| `types`     | `Record`<`string`, [`StarknetType`](types.RPC.RPCSPEC07.WALLET_API.md#starknettype)[]\> | `undefined`       | The types object containing all defined types. |
| `type`      | `string`                                                                                | `undefined`       | The name of the type to hash.                  |
| `revision?` | [`TypedDataRevision`](types.RPC.RPCSPEC07.WALLET_API.md#typeddatarevision-1)            | `Revision.LEGACY` | The revision of the TypedData.                 |

#### Returns

`string`

The hash.

**`Example`**

```typescript
import typedDataExample from '../../__mocks__/typedData/baseExample.json';

const result = getTypeHash(typedDataExample.types, 'StarkNetDomain');
// result = "0x1bfc207425a47a5dfa1a50a4f5241203f50624ca5fdf5e18755765416b8e288";
```

#### Defined in

[src/utils/typedData.ts:304](https://github.com/starknet-io/starknet.js/blob/v6.24.1/src/utils/typedData.ts#L304)

---

### encodeValue

▸ **encodeValue**(`types`, `type`, `data`, `ctx?`, `revision?`): [`string`, `string`]

Encodes a single value to an ABI serialisable string, number or Buffer. Returns the data as a tuple, which consists of
an array of ABI compatible types, and an array of corresponding values.

#### Parameters

| Name        | Type                                                                                    | Default value     | Description                                    |
| :---------- | :-------------------------------------------------------------------------------------- | :---------------- | :--------------------------------------------- |
| `types`     | `Record`<`string`, [`StarknetType`](types.RPC.RPCSPEC07.WALLET_API.md#starknettype)[]\> | `undefined`       | The types object containing all defined types. |
| `type`      | `string`                                                                                | `undefined`       | The name of the type to encode.                |
| `data`      | `unknown`                                                                               | `undefined`       | The data to encode.                            |
| `ctx?`      | `Context`                                                                               | `{}`              | The context of the encoding process.           |
| `revision?` | [`TypedDataRevision`](types.RPC.RPCSPEC07.WALLET_API.md#typeddatarevision-1)            | `Revision.LEGACY` | The revision of the TypedData.                 |

#### Returns

[`string`, `string`]

The ABI compatible type and corresponding value.

**`Example`**

```typescript
import { getSelectorFromName } from '../../src/utils/hash';

const selector = 'transfer';
const selectorHash = getSelectorFromName(selector);
const result1 = encodeValue({}, 'felt', selectorHash);

// result1 = ['felt', '0x83afd3f4caedc6eebf44246fe54e38c95e3179a5ec9ea81740eca5b482d12e']
```

#### Defined in

[src/utils/typedData.ts:335](https://github.com/starknet-io/starknet.js/blob/v6.24.1/src/utils/typedData.ts#L335)

---

### encodeData

▸ **encodeData**<`T`\>(`types`, `type`, `data`, `revision?`): [`string`[], `string`[]]

Encode the data to an ABI encoded Buffer. The data should be a key -> value object with all the required values.
All dependent types are automatically encoded.

#### Type parameters

| Name | Type                                                                             |
| :--- | :------------------------------------------------------------------------------- |
| `T`  | extends [`TypedData`](../interfaces/types.RPC.RPCSPEC07.WALLET_API.TypedData.md) |

#### Parameters

| Name        | Type                                                                         | Default value     | Description                                    |
| :---------- | :--------------------------------------------------------------------------- | :---------------- | :--------------------------------------------- |
| `types`     | `T`[``"types"``]                                                             | `undefined`       | The types object containing all defined types. |
| `type`      | `string`                                                                     | `undefined`       | The name of the type to encode.                |
| `data`      | `T`[``"message"``]                                                           | `undefined`       | The data to encode.                            |
| `revision?` | [`TypedDataRevision`](types.RPC.RPCSPEC07.WALLET_API.md#typeddatarevision-1) | `Revision.LEGACY` | The revision of the TypedData.                 |

#### Returns

[`string`[], `string`[]]

The ABI compatible types and corresponding values.

#### Defined in

[src/utils/typedData.ts:473](https://github.com/starknet-io/starknet.js/blob/v6.24.1/src/utils/typedData.ts#L473)

---

### getStructHash

▸ **getStructHash**<`T`\>(`types`, `type`, `data`, `revision?`): `string`

Get encoded data as a hash. The data should be a key -> value object with all the required values.
All dependent types are automatically encoded.

#### Type parameters

| Name | Type                                                                             |
| :--- | :------------------------------------------------------------------------------- |
| `T`  | extends [`TypedData`](../interfaces/types.RPC.RPCSPEC07.WALLET_API.TypedData.md) |

#### Parameters

| Name        | Type                                                                         | Default value     | Description                                    |
| :---------- | :--------------------------------------------------------------------------- | :---------------- | :--------------------------------------------- |
| `types`     | `T`[``"types"``]                                                             | `undefined`       | The types object containing all defined types. |
| `type`      | `string`                                                                     | `undefined`       | The name of the type to hash.                  |
| `data`      | `T`[``"message"``]                                                           | `undefined`       | The data to hash.                              |
| `revision?` | [`TypedDataRevision`](types.RPC.RPCSPEC07.WALLET_API.md#typeddatarevision-1) | `Revision.LEGACY` | The revision of the TypedData.                 |

#### Returns

`string`

The hash of the encoded data.

**`Example`**

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

#### Defined in

[src/utils/typedData.ts:528](https://github.com/starknet-io/starknet.js/blob/v6.24.1/src/utils/typedData.ts#L528)

---

### getMessageHash

▸ **getMessageHash**(`typedData`, `account`): `string`

Get the SNIP-12 encoded message to sign, from the typedData object.

#### Parameters

| Name        | Type                                                                     | Description                      |
| :---------- | :----------------------------------------------------------------------- | :------------------------------- |
| `typedData` | [`TypedData`](../interfaces/types.RPC.RPCSPEC07.WALLET_API.TypedData.md) | The TypedData object.            |
| `account`   | [`BigNumberish`](types.md#bignumberish)                                  | The account to sign the message. |

#### Returns

`string`

The hash of the message to sign.

**`Throws`**

Will throw an error if the typedData does not match the JSON schema.

**`Example`**

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

#### Defined in

[src/utils/typedData.ts:595](https://github.com/starknet-io/starknet.js/blob/v6.24.1/src/utils/typedData.ts#L595)

---

### verifyMessage

▸ **verifyMessage**(`message`, `signature`, `fullPublicKey`, `accountAddress?`): `boolean`

Checks if a signed EIP712 message is related to an account.
Valid for a standard Starknet signature.

#### Parameters

| Name              | Type                                                                     | Description                                                                                                 |
| :---------------- | :----------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------- |
| `message`         | [`TypedData`](../interfaces/types.RPC.RPCSPEC07.WALLET_API.TypedData.md) | a TypedMessage message, or the hash of an EIP712 message (SNIP-12).                                         |
| `signature`       | [`Signature`](types.md#signature)                                        | a WeierstrassSignatureType signature, or an array of 2 strings.                                             |
| `fullPublicKey`   | [`BigNumberish`](types.md#bignumberish)                                  | a number coded on 520 bits (from ec.getFullPublicKey()).                                                    |
| `accountAddress?` | [`BigNumberish`](types.md#bignumberish)                                  | address of the account that has signed the message. Not needed with a message hash is provided in `message` |

#### Returns

`boolean`

true if the message is verified.

**`Example`**

```typescript
const myTypedMessage: TypedMessage = .... ;
const sign: Signature = ["0x123...abc", "0x345...def"];
const fullPubK = "0x0400b730bd22358612b5a67f8ad52ce80f9e8e893639ade263537e6ef35852e5d3057795f6b090f7c6985ee143f798608a53b3659222c06693c630857a10a92acf";
const accountAddress = "0x43b7240d227aa2fb8434350b3321c40ac1b88c7067982549e7609870621b535";
const result1 = typedData.verifyMessage(myTypedMessage, sign, fullPubK, accountAddress);
const result2 = typedData.verifyMessage(messageHash, sign, fullPubK);
// result1 = result2 = true
```

#### Defined in

[src/utils/typedData.ts:632](https://github.com/starknet-io/starknet.js/blob/v6.24.1/src/utils/typedData.ts#L632)

▸ **verifyMessage**(`message`, `signature`, `fullPublicKey`): `boolean`

#### Parameters

| Name            | Type                                    |
| :-------------- | :-------------------------------------- |
| `message`       | [`BigNumberish`](types.md#bignumberish) |
| `signature`     | [`Signature`](types.md#signature)       |
| `fullPublicKey` | [`BigNumberish`](types.md#bignumberish) |

#### Returns

`boolean`

#### Defined in

[src/utils/typedData.ts:638](https://github.com/starknet-io/starknet.js/blob/v6.24.1/src/utils/typedData.ts#L638)
