# Class: CairoFelt252

Defined in: [src/utils/cairoDataTypes/felt.ts:24](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/felt.ts#L24)

felt252 is the basic field element used in Cairo.
It corresponds to an integer in the range 0 ≤ x < P where P is a very large prime number currently equal to 2^251 + 17⋅2^192 + 1.
Any operation that uses felt252 will be computed modulo P.
63 hex symbols (31 bytes + 4 bits), 252 bits

## Constructors

### Constructor

> **new CairoFelt252**(`data`): `CairoFelt252`

Defined in: [src/utils/cairoDataTypes/felt.ts:32](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/felt.ts#L32)

#### Parameters

##### data

`unknown`

#### Returns

`CairoFelt252`

## Properties

### abiSelector

> `static` **abiSelector**: `"core::felt252"`

Defined in: [src/utils/cairoDataTypes/felt.ts:30](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/felt.ts#L30)

---

### data

> **data**: `Uint8Array`

Defined in: [src/utils/cairoDataTypes/felt.ts:28](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/felt.ts#L28)

byte representation of the felt252

## Methods

### \_\_processData()

> `static` **\_\_processData**(`data`): `Uint8Array`

Defined in: [src/utils/cairoDataTypes/felt.ts:39](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/felt.ts#L39)

#### Parameters

##### data

`boolean` \| [`BigNumberish`](../type-aliases/BigNumberish.md)

#### Returns

`Uint8Array`

---

### assertRange()

> `static` **assertRange**(`val`): `void`

Defined in: [src/utils/cairoDataTypes/felt.ts:74](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/felt.ts#L74)

#### Parameters

##### val

`bigint`

#### Returns

`void`

---

### validate()

> `static` **validate**(`data`): `void`

Defined in: [src/utils/cairoDataTypes/felt.ts:78](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/felt.ts#L78)

#### Parameters

##### data

`unknown`

#### Returns

`void`

---

### is()

> `static` **is**(`data`): `boolean`

Defined in: [src/utils/cairoDataTypes/felt.ts:91](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/felt.ts#L91)

#### Parameters

##### data

`unknown`

#### Returns

`boolean`

---

### isAbiType()

> `static` **isAbiType**(`abiType`): `boolean`

Defined in: [src/utils/cairoDataTypes/felt.ts:100](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/felt.ts#L100)

#### Parameters

##### abiType

`string`

#### Returns

`boolean`

---

### factoryFromApiResponse()

> `static` **factoryFromApiResponse**(`responseIterator`): `CairoFelt252`

Defined in: [src/utils/cairoDataTypes/felt.ts:104](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/felt.ts#L104)

#### Parameters

##### responseIterator

`Iterator`\<`string`\>

#### Returns

`CairoFelt252`

---

### toBigInt()

> **toBigInt**(): `bigint`

Defined in: [src/utils/cairoDataTypes/felt.ts:55](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/felt.ts#L55)

#### Returns

`bigint`

---

### decodeUtf8()

> **decodeUtf8**(): `string`

Defined in: [src/utils/cairoDataTypes/felt.ts:59](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/felt.ts#L59)

#### Returns

`string`

---

### toHexString()

> **toHexString**(): `string`

Defined in: [src/utils/cairoDataTypes/felt.ts:63](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/felt.ts#L63)

#### Returns

`string`

---

### toApiRequest()

> **toApiRequest**(): `string`[]

Defined in: [src/utils/cairoDataTypes/felt.ts:67](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/felt.ts#L67)

#### Returns

`string`[]
