---
id: 'provider-1.Block'
title: 'Class: Block'
sidebar_label: 'Block'
custom_edit_url: null
---

[provider](../namespaces/provider-1.md).Block

This class is formatting the identifier of a block.

hex string and BigInt are detected as block hashes. identifier return { block_hash: hash }

decimal string and number are detected as block numbers. identifier return { block_number: number }

text string are detected as block tag. identifier return tag

null is detected as 'pending' block tag. identifier return 'pending'

**`Example`**

```typescript
const result = new provider.Block(null).identifier;
// result = "pending"
```

## Constructors

### constructor

• **new Block**(`_identifier`): [`Block`](provider-1.Block.md)

Create a Block instance

#### Parameters

| Name          | Type                                                        | Description                                                                                                                                                                                      |
| :------------ | :---------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `_identifier` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) | hex string and BigInt are detected as block hashes. decimal string and number are detected as block numbers. text string are detected as block tag. null is considered as a 'pending' block tag. |

#### Returns

[`Block`](provider-1.Block.md)

#### Defined in

[src/utils/provider.ts:197](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/utils/provider.ts#L197)

## Properties

### hash

• **hash**: [`BlockIdentifier`](../namespaces/types.md#blockidentifier) = `null`

**`Param`**

if not null, contains the block hash

#### Defined in

[src/utils/provider.ts:154](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/utils/provider.ts#L154)

---

### number

• **number**: [`BlockIdentifier`](../namespaces/types.md#blockidentifier) = `null`

**`Param`**

if not null, contains the block number

#### Defined in

[src/utils/provider.ts:159](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/utils/provider.ts#L159)

---

### tag

• **tag**: [`BlockIdentifier`](../namespaces/types.md#blockidentifier) = `null`

**`Param`**

if not null, contains "pending" or "latest"

#### Defined in

[src/utils/provider.ts:164](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/utils/provider.ts#L164)

## Accessors

### queryIdentifier

• `get` **queryIdentifier**(): `any`

#### Returns

`any`

the identifier as a string

**`Example`**

```typescript
const result = new provider.Block(123456n).queryIdentifier;
// result = "blockHash=0x1e240"
```

#### Defined in

[src/utils/provider.ts:210](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/utils/provider.ts#L210)

---

### identifier

• `get` **identifier**(): `any`

#### Returns

`any`

the identifier as an object

**`Example`**

```typescript
const result = new provider.Block(56789).identifier;
// result = { block_number: 56789 }
```

#### Defined in

[src/utils/provider.ts:231](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/utils/provider.ts#L231)

• `set` **identifier**(`_identifier`): `void`

change the identifier of an existing Block instance

#### Parameters

| Name          | Type                                                        |
| :------------ | :---------------------------------------------------------- |
| `_identifier` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) |

#### Returns

`void`

**`Example`**

```typescript
const myBlock = new provider.Block('latest');
myBlock.identifier = '0x3456789abc';
const result = myBlock.identifier;
// result = { block_hash: '0x3456789abc' }
```

#### Defined in

[src/utils/provider.ts:253](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/utils/provider.ts#L253)

## Methods

### setIdentifier

▸ **setIdentifier**(`__identifier`): `void`

#### Parameters

| Name           | Type                                                        |
| :------------- | :---------------------------------------------------------- |
| `__identifier` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) |

#### Returns

`void`

#### Defined in

[src/utils/provider.ts:166](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/utils/provider.ts#L166)

---

### valueOf

▸ **valueOf**(): [`BlockIdentifier`](../namespaces/types.md#blockidentifier)

#### Returns

[`BlockIdentifier`](../namespaces/types.md#blockidentifier)

#### Defined in

[src/utils/provider.ts:257](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/utils/provider.ts#L257)

---

### toString

▸ **toString**(): [`BlockIdentifier`](../namespaces/types.md#blockidentifier)

#### Returns

[`BlockIdentifier`](../namespaces/types.md#blockidentifier)

#### Defined in

[src/utils/provider.ts:259](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/utils/provider.ts#L259)
