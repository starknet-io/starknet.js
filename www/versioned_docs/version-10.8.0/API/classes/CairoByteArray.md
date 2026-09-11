# Class: CairoByteArray

Defined in: [src/utils/cairoDataTypes/byteArray.ts:20](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/byteArray.ts#L20)

## Constructors

### Constructor

> **new CairoByteArray**(`data`, `pendingWord`, `pendingWordLen`): `CairoByteArray`

Defined in: [src/utils/cairoDataTypes/byteArray.ts:41](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/byteArray.ts#L41)

byteArray from typed components

#### Parameters

##### data

[`CairoBytes31`](CairoBytes31.md)[]

##### pendingWord

[`CairoFelt252`](CairoFelt252.md)

##### pendingWordLen

[`CairoUint32`](CairoUint32.md)

#### Returns

`CairoByteArray`

### Constructor

> **new CairoByteArray**(`data`): `CairoByteArray`

Defined in: [src/utils/cairoDataTypes/byteArray.ts:42](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/byteArray.ts#L42)

#### Parameters

##### data

`unknown`

#### Returns

`CairoByteArray`

## Properties

### abiSelector

> `static` **abiSelector**: `"core::byte_array::ByteArray"`

Defined in: [src/utils/cairoDataTypes/byteArray.ts:36](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/byteArray.ts#L36)

---

### data

> **data**: [`CairoBytes31`](CairoBytes31.md)[] = `[]`

Defined in: [src/utils/cairoDataTypes/byteArray.ts:24](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/byteArray.ts#L24)

entire dataset

---

### pending_word

> **pending_word**: [`CairoFelt252`](CairoFelt252.md)

Defined in: [src/utils/cairoDataTypes/byteArray.ts:29](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/byteArray.ts#L29)

cairo specific implementation helper

---

### pending_word_len

> **pending_word_len**: [`CairoUint32`](CairoUint32.md)

Defined in: [src/utils/cairoDataTypes/byteArray.ts:34](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/byteArray.ts#L34)

cairo specific implementation helper

## Methods

### \_\_processData()

> `static` **\_\_processData**(`inData`): `object`

Defined in: [src/utils/cairoDataTypes/byteArray.ts:71](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/byteArray.ts#L71)

#### Parameters

##### inData

`unknown`

#### Returns

`object`

##### data

> **data**: [`CairoBytes31`](CairoBytes31.md)[]

##### pending_word

> **pending_word**: [`CairoFelt252`](CairoFelt252.md)

##### pending_word_len

> **pending_word_len**: [`CairoUint32`](CairoUint32.md)

---

### validate()

> `static` **validate**(`data`): `void`

Defined in: [src/utils/cairoDataTypes/byteArray.ts:233](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/byteArray.ts#L233)

#### Parameters

##### data

`unknown`

#### Returns

`void`

---

### is()

> `static` **is**(`data`): `boolean`

Defined in: [src/utils/cairoDataTypes/byteArray.ts:273](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/byteArray.ts#L273)

Check if the provided data is a valid CairoByteArray

#### Parameters

##### data

`any`

The data to check

#### Returns

`boolean`

True if the data is a valid CairoByteArray, false otherwise

---

### isAbiType()

> `static` **isAbiType**(`abiType`): `boolean`

Defined in: [src/utils/cairoDataTypes/byteArray.ts:285](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/byteArray.ts#L285)

Check if provided abi type is this data type

#### Parameters

##### abiType

`string`

#### Returns

`boolean`

---

### factoryFromApiResponse()

> `static` **factoryFromApiResponse**(`responseIterator`): `CairoByteArray`

Defined in: [src/utils/cairoDataTypes/byteArray.ts:289](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/byteArray.ts#L289)

#### Parameters

##### responseIterator

`Iterator`\<`string`\>

#### Returns

`CairoByteArray`

---

### toApiRequest()

> **toApiRequest**(): `string`[]

Defined in: [src/utils/cairoDataTypes/byteArray.ts:128](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/byteArray.ts#L128)

#### Returns

`string`[]

---

### decodeUtf8()

> **decodeUtf8**(): `string`

Defined in: [src/utils/cairoDataTypes/byteArray.ts:139](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/byteArray.ts#L139)

#### Returns

`string`

---

### toBigInt()

> **toBigInt**(): `bigint`

Defined in: [src/utils/cairoDataTypes/byteArray.ts:146](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/byteArray.ts#L146)

#### Returns

`bigint`

---

### toHexString()

> **toHexString**(): `string`

Defined in: [src/utils/cairoDataTypes/byteArray.ts:163](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/byteArray.ts#L163)

#### Returns

`string`

---

### toBuffer()

> **toBuffer**(): `any`

Defined in: [src/utils/cairoDataTypes/byteArray.ts:170](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/byteArray.ts#L170)

#### Returns

`any`

---

### hash()

> **hash**(): `string`

Defined in: [src/utils/cairoDataTypes/byteArray.ts:190](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/byteArray.ts#L190)

Compute the Pedersen hash of this ByteArray, following OpenZeppelin's `hash_byte_array` algorithm.

Serializes the ByteArray to its felt252 components (data array length, each data chunk,
pending_word, pending_word_len), then chains Pedersen hash over all elements starting
from 0, and finalizes with the total element count.

#### Returns

`string`

hex-string felt252 Pedersen hash of the ByteArray

#### Example

```typescript
const ba = new CairoByteArray('Hello');
const result = ba.hash();
// result = 0x15d19ad651ffaf8e90a13938db2081fa3ff01de0712e00cbe69891bace66c51
```

---

### toElements()

> **toElements**(): `Uint8Array`\<`ArrayBufferLike`\>[]

Defined in: [src/utils/cairoDataTypes/byteArray.ts:205](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/byteArray.ts#L205)

returns an array of all the data chunks and the pending word
when concatenated, represents the original bytes sequence

#### Returns

`Uint8Array`\<`ArrayBufferLike`\>[]
