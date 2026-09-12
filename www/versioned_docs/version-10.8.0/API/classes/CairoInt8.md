# Class: CairoInt8

Defined in: [src/utils/cairoDataTypes/int8.ts:11](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/int8.ts#L11)

## Constructors

### Constructor

> **new CairoInt8**(`data`): `CairoInt8`

Defined in: [src/utils/cairoDataTypes/int8.ts:16](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/int8.ts#L16)

#### Parameters

##### data

`unknown`

#### Returns

`CairoInt8`

## Properties

### abiSelector

> `static` **abiSelector**: `string` = `'core::integer::i8'`

Defined in: [src/utils/cairoDataTypes/int8.ts:14](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/int8.ts#L14)

---

### data

> **data**: `bigint`

Defined in: [src/utils/cairoDataTypes/int8.ts:12](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/int8.ts#L12)

## Methods

### \_\_processData()

> `static` **\_\_processData**(`data`): `bigint`

Defined in: [src/utils/cairoDataTypes/int8.ts:21](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/int8.ts#L21)

#### Parameters

##### data

`unknown`

#### Returns

`bigint`

---

### validate()

> `static` **validate**(`data`): `void`

Defined in: [src/utils/cairoDataTypes/int8.ts:59](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/int8.ts#L59)

#### Parameters

##### data

`unknown`

#### Returns

`void`

---

### is()

> `static` **is**(`data`): `boolean`

Defined in: [src/utils/cairoDataTypes/int8.ts:74](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/int8.ts#L74)

#### Parameters

##### data

`unknown`

#### Returns

`boolean`

---

### isAbiType()

> `static` **isAbiType**(`abiType`): `boolean`

Defined in: [src/utils/cairoDataTypes/int8.ts:86](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/int8.ts#L86)

Check if provided abi type is this data type

#### Parameters

##### abiType

`string`

#### Returns

`boolean`

---

### factoryFromApiResponse()

> `static` **factoryFromApiResponse**(`responseIterator`): `CairoInt8`

Defined in: [src/utils/cairoDataTypes/int8.ts:90](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/int8.ts#L90)

#### Parameters

##### responseIterator

`Iterator`\<`string`\>

#### Returns

`CairoInt8`

---

### toApiRequest()

> **toApiRequest**(): `string`[]

Defined in: [src/utils/cairoDataTypes/int8.ts:31](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/int8.ts#L31)

#### Returns

`string`[]

---

### toBigInt()

> **toBigInt**(): `bigint`

Defined in: [src/utils/cairoDataTypes/int8.ts:35](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/int8.ts#L35)

#### Returns

`bigint`

---

### decodeUtf8()

> **decodeUtf8**(): `string`

Defined in: [src/utils/cairoDataTypes/int8.ts:39](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/int8.ts#L39)

#### Returns

`string`

---

### toHexString()

> **toHexString**(): `string`

Defined in: [src/utils/cairoDataTypes/int8.ts:49](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/int8.ts#L49)

For negative values field element representation as positive hex string.

#### Returns

`string`

cairo field arithmetic hex string
