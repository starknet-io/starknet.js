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

| Name          | Type                                               | Description                                                                                                                                                                                      |
| :------------ | :------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `_identifier` | [`BlockIdentifier`](../modules.md#blockidentifier) | hex string and BigInt are detected as block hashes. decimal string and number are detected as block numbers. text string are detected as block tag. null is considered as a 'pending' block tag. |

#### Returns

[`Block`](provider-1.Block.md)

#### Defined in

[src/utils/provider.ts:232](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/provider.ts#L232)

## Properties

### hash

• **hash**: [`BlockIdentifier`](../modules.md#blockidentifier) = `null`

**`Param`**

if not null, contains the block hash

#### Defined in

[src/utils/provider.ts:189](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/provider.ts#L189)

---

### number

• **number**: [`BlockIdentifier`](../modules.md#blockidentifier) = `null`

**`Param`**

if not null, contains the block number

#### Defined in

[src/utils/provider.ts:194](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/provider.ts#L194)

---

### tag

• **tag**: [`BlockIdentifier`](../modules.md#blockidentifier) = `null`

**`Param`**

if not null, contains "pending" or "latest"

#### Defined in

[src/utils/provider.ts:199](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/provider.ts#L199)

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

[src/utils/provider.ts:245](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/provider.ts#L245)

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

[src/utils/provider.ts:266](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/provider.ts#L266)

• `set` **identifier**(`_identifier`): `void`

change the identifier of an existing Block instance

#### Parameters

| Name          | Type                                               |
| :------------ | :------------------------------------------------- |
| `_identifier` | [`BlockIdentifier`](../modules.md#blockidentifier) |

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

[src/utils/provider.ts:288](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/provider.ts#L288)

## Methods

### setIdentifier

▸ **setIdentifier**(`__identifier`): `void`

#### Parameters

| Name           | Type                                               |
| :------------- | :------------------------------------------------- |
| `__identifier` | [`BlockIdentifier`](../modules.md#blockidentifier) |

#### Returns

`void`

#### Defined in

[src/utils/provider.ts:201](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/provider.ts#L201)

---

### valueOf

▸ **valueOf**(): [`BlockIdentifier`](../modules.md#blockidentifier)

#### Returns

[`BlockIdentifier`](../modules.md#blockidentifier)

#### Defined in

[src/utils/provider.ts:292](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/provider.ts#L292)

---

### toString

▸ **toString**(): [`BlockIdentifier`](../modules.md#blockidentifier)

#### Returns

[`BlockIdentifier`](../modules.md#blockidentifier)

#### Defined in

[src/utils/provider.ts:294](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/provider.ts#L294)
