# Class: CairoUint32

Defined in: [src/utils/cairoDataTypes/uint32.ts:10](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/uint32.ts#L10)

## Constructors

### Constructor

> **new CairoUint32**(`data`): `CairoUint32`

Defined in: [src/utils/cairoDataTypes/uint32.ts:15](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/uint32.ts#L15)

#### Parameters

##### data

[`BigNumberish`](../type-aliases/BigNumberish.md)

#### Returns

`CairoUint32`

## Properties

### abiSelector

> `static` **abiSelector**: `string` = `'core::u32::u32'`

Defined in: [src/utils/cairoDataTypes/uint32.ts:13](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/uint32.ts#L13)

---

### data

> **data**: `bigint`

Defined in: [src/utils/cairoDataTypes/uint32.ts:11](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/uint32.ts#L11)

## Methods

### \_\_processData()

> `static` **\_\_processData**(`data`): `bigint`

Defined in: [src/utils/cairoDataTypes/uint32.ts:20](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/uint32.ts#L20)

#### Parameters

##### data

[`BigNumberish`](../type-aliases/BigNumberish.md)

#### Returns

`bigint`

---

### validate()

> `static` **validate**(`data`): `void`

Defined in: [src/utils/cairoDataTypes/uint32.ts:46](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/uint32.ts#L46)

#### Parameters

##### data

[`BigNumberish`](../type-aliases/BigNumberish.md)

#### Returns

`void`

---

### is()

> `static` **is**(`data`): `boolean`

Defined in: [src/utils/cairoDataTypes/uint32.ts:58](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/uint32.ts#L58)

#### Parameters

##### data

[`BigNumberish`](../type-aliases/BigNumberish.md)

#### Returns

`boolean`

---

### isAbiType()

> `static` **isAbiType**(`abiType`): `boolean`

Defined in: [src/utils/cairoDataTypes/uint32.ts:70](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/uint32.ts#L70)

Check if provided abi type is this data type

#### Parameters

##### abiType

`string`

#### Returns

`boolean`

---

### factoryFromApiResponse()

> `static` **factoryFromApiResponse**(`responseIterator`): `CairoUint32`

Defined in: [src/utils/cairoDataTypes/uint32.ts:74](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/uint32.ts#L74)

#### Parameters

##### responseIterator

`Iterator`\<`string`\>

#### Returns

`CairoUint32`

---

### toApiRequest()

> **toApiRequest**(): `string`[]

Defined in: [src/utils/cairoDataTypes/uint32.ts:30](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/uint32.ts#L30)

#### Returns

`string`[]

---

### toBigInt()

> **toBigInt**(): `bigint`

Defined in: [src/utils/cairoDataTypes/uint32.ts:34](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/uint32.ts#L34)

#### Returns

`bigint`

---

### decodeUtf8()

> **decodeUtf8**(): `string`

Defined in: [src/utils/cairoDataTypes/uint32.ts:38](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/uint32.ts#L38)

#### Returns

`string`

---

### toHexString()

> **toHexString**(): `string`

Defined in: [src/utils/cairoDataTypes/uint32.ts:42](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/uint32.ts#L42)

#### Returns

`string`
