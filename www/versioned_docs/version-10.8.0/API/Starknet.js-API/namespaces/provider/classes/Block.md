# Class: Block

Defined in: [src/utils/provider.ts:183](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/provider.ts#L183)

This class is formatting the identifier of a block.

hex string and BigInt are detected as block hashes. identifier return { block_hash: hash }

decimal string and number are detected as block numbers. identifier return { block_number: number }

text string are detected as block tag. identifier return tag

null is detected as 'latest' block tag. identifier return 'latest'

## Example

```typescript
const result = new provider.Block(null).identifier;
// result = "latest"
```

## Constructors

### Constructor

> **new Block**(`_identifier`): `Block`

Defined in: [src/utils/provider.ts:230](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/provider.ts#L230)

Create a Block instance

#### Parameters

##### \_identifier

[`BlockIdentifier`](../../../../type-aliases/BlockIdentifier.md)

hex string and BigInt are detected as block hashes.
decimal string and number are detected as block numbers.
text string are detected as block tag.
null is considered as a 'latest' block tag.

#### Returns

`Block`

## Properties

### hash

> **hash**: [`BlockIdentifier`](../../../../type-aliases/BlockIdentifier.md) = `null`

Defined in: [src/utils/provider.ts:187](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/provider.ts#L187)

#### Param

if not null, contains the block hash

---

### number

> **number**: [`BlockIdentifier`](../../../../type-aliases/BlockIdentifier.md) = `null`

Defined in: [src/utils/provider.ts:192](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/provider.ts#L192)

#### Param

if not null, contains the block number

---

### tag

> **tag**: [`BlockIdentifier`](../../../../type-aliases/BlockIdentifier.md) = `null`

Defined in: [src/utils/provider.ts:197](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/provider.ts#L197)

#### Param

if not null, contains "pre_confirmed" or "latest"

## Accessors

### queryIdentifier

#### Get Signature

> **get** **queryIdentifier**(): `any`

Defined in: [src/utils/provider.ts:243](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/provider.ts#L243)

##### Example

```typescript
const result = new provider.Block(123456n).queryIdentifier;
// result = "blockHash=0x1e240"
```

##### Returns

`any`

the identifier as a string

---

### identifier

#### Get Signature

> **get** **identifier**(): `any`

Defined in: [src/utils/provider.ts:264](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/provider.ts#L264)

##### Example

```typescript
const result = new provider.Block(56789).identifier;
// result = { block_number: 56789 }
```

##### Returns

`any`

the identifier as an object

#### Set Signature

> **set** **identifier**(`_identifier`): `void`

Defined in: [src/utils/provider.ts:286](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/provider.ts#L286)

change the identifier of an existing Block instance

##### Example

```typescript
const myBlock = new provider.Block('latest');
myBlock.identifier = '0x3456789abc';
const result = myBlock.identifier;
// result = { block_hash: '0x3456789abc' }
```

##### Parameters

###### \_identifier

[`BlockIdentifier`](../../../../type-aliases/BlockIdentifier.md)

##### Returns

`void`

## Methods

### valueOf()

> **valueOf**(): [`BlockIdentifier`](../../../../type-aliases/BlockIdentifier.md)

Defined in: [src/utils/provider.ts:290](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/provider.ts#L290)

#### Returns

[`BlockIdentifier`](../../../../type-aliases/BlockIdentifier.md)

---

### toString()

> **toString**(): [`BlockIdentifier`](../../../../type-aliases/BlockIdentifier.md)

Defined in: [src/utils/provider.ts:292](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/provider.ts#L292)

#### Returns

[`BlockIdentifier`](../../../../type-aliases/BlockIdentifier.md)
