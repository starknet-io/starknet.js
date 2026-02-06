---
id: 'provider-1.Block'
title: 'Class: Block'
sidebar_label: 'Block'
custom_edit_url: null
---

[provider](../namespaces/provider-1.md).Block

This class is formatting the identifier of a block.

hex string and BigInt are detected as block hashes. identifier return `{ block_hash: hash }`

decimal string and number are detected as block numbers. identifier return `{ block_number: number }`

text string are detected as block tag. identifier return tag

null is detected as 'latest' block tag. identifier return 'latest'

**`Example`**

```typescript
const result = new provider.Block(null).identifier;
// result = "latest"
```

## Constructors

### constructor

• **new Block**(`_identifier`): [`Block`](provider-1.Block.md)

Create a Block instance

#### Parameters

| Name          | Type                                               | Description                                                                                                                                                                                     |
| :------------ | :------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `_identifier` | [`BlockIdentifier`](../modules.md#blockidentifier) | hex string and BigInt are detected as block hashes. decimal string and number are detected as block numbers. text string are detected as block tag. null is considered as a 'latest' block tag. |

#### Returns

[`Block`](provider-1.Block.md)

#### Defined in

[src/utils/provider.ts:230](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/utils/provider.ts#L230)

## Properties

### hash

• **hash**: [`BlockIdentifier`](../modules.md#blockidentifier) = `null`

**`Param`**

if not null, contains the block hash

#### Defined in

[src/utils/provider.ts:187](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/utils/provider.ts#L187)

---

### number

• **number**: [`BlockIdentifier`](../modules.md#blockidentifier) = `null`

**`Param`**

if not null, contains the block number

#### Defined in

[src/utils/provider.ts:192](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/utils/provider.ts#L192)

---

### tag

• **tag**: [`BlockIdentifier`](../modules.md#blockidentifier) = `null`

**`Param`**

if not null, contains "pre_confirmed" or "latest"

#### Defined in

[src/utils/provider.ts:197](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/utils/provider.ts#L197)

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

[src/utils/provider.ts:243](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/utils/provider.ts#L243)

---

### identifier

• `get` **identifier**(): `any`

#### Returns

`any`

the identifier as an object

**`Example`**

```typescript
const result = new provider.Block(56789).identifier;
// result = `{ block_number: 56789 }`
```

#### Defined in

[src/utils/provider.ts:264](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/utils/provider.ts#L264)

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
// result = `{ block_hash: '0x3456789abc' }`
```

#### Defined in

[src/utils/provider.ts:286](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/utils/provider.ts#L286)

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

[src/utils/provider.ts:199](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/utils/provider.ts#L199)

---

### valueOf

▸ **valueOf**(): [`BlockIdentifier`](../modules.md#blockidentifier)

#### Returns

[`BlockIdentifier`](../modules.md#blockidentifier)

#### Defined in

[src/utils/provider.ts:290](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/utils/provider.ts#L290)

---

### toString

▸ **toString**(): [`BlockIdentifier`](../modules.md#blockidentifier)

#### Returns

[`BlockIdentifier`](../modules.md#blockidentifier)

#### Defined in

[src/utils/provider.ts:292](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/utils/provider.ts#L292)
