# Class: CairoUint128

Defined in: [src/utils/cairoDataTypes/uint128.ts:11](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/uint128.ts#L11)

## Constructors

### Constructor

> **new CairoUint128**(`data`): `CairoUint128`

Defined in: [src/utils/cairoDataTypes/uint128.ts:16](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/uint128.ts#L16)

#### Parameters

##### data

`unknown`

#### Returns

`CairoUint128`

## Properties

### abiSelector

> `static` **abiSelector**: `string` = `'core::integer::u128'`

Defined in: [src/utils/cairoDataTypes/uint128.ts:14](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/uint128.ts#L14)

---

### data

> **data**: `bigint`

Defined in: [src/utils/cairoDataTypes/uint128.ts:12](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/uint128.ts#L12)

## Methods

### \_\_processData()

> `static` **\_\_processData**(`data`): `bigint`

Defined in: [src/utils/cairoDataTypes/uint128.ts:21](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/uint128.ts#L21)

#### Parameters

##### data

`unknown`

#### Returns

`bigint`

---

### validate()

> `static` **validate**(`data`): `void`

Defined in: [src/utils/cairoDataTypes/uint128.ts:47](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/uint128.ts#L47)

#### Parameters

##### data

`unknown`

#### Returns

`void`

---

### is()

> `static` **is**(`data`): `boolean`

Defined in: [src/utils/cairoDataTypes/uint128.ts:62](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/uint128.ts#L62)

#### Parameters

##### data

`unknown`

#### Returns

`boolean`

---

### isAbiType()

> `static` **isAbiType**(`abiType`): `boolean`

Defined in: [src/utils/cairoDataTypes/uint128.ts:74](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/uint128.ts#L74)

Check if provided abi type is this data type

#### Parameters

##### abiType

`string`

#### Returns

`boolean`

---

### factoryFromApiResponse()

> `static` **factoryFromApiResponse**(`responseIterator`): `CairoUint128`

Defined in: [src/utils/cairoDataTypes/uint128.ts:78](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/uint128.ts#L78)

#### Parameters

##### responseIterator

`Iterator`\<`string`\>

#### Returns

`CairoUint128`

---

### toApiRequest()

> **toApiRequest**(): `string`[]

Defined in: [src/utils/cairoDataTypes/uint128.ts:31](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/uint128.ts#L31)

#### Returns

`string`[]

---

### toBigInt()

> **toBigInt**(): `bigint`

Defined in: [src/utils/cairoDataTypes/uint128.ts:35](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/uint128.ts#L35)

#### Returns

`bigint`

---

### decodeUtf8()

> **decodeUtf8**(): `string`

Defined in: [src/utils/cairoDataTypes/uint128.ts:39](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/uint128.ts#L39)

#### Returns

`string`

---

### toHexString()

> **toHexString**(): `string`

Defined in: [src/utils/cairoDataTypes/uint128.ts:43](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/uint128.ts#L43)

#### Returns

`string`
