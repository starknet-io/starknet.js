# Class: CairoBytes31

Defined in: [src/utils/cairoDataTypes/bytes31.ts:8](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/bytes31.ts#L8)

## Constructors

### Constructor

> **new CairoBytes31**(`data`): `CairoBytes31`

Defined in: [src/utils/cairoDataTypes/bytes31.ts:15](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/bytes31.ts#L15)

#### Parameters

##### data

`unknown`

#### Returns

`CairoBytes31`

## Properties

### MAX_BYTE_SIZE

> `static` **MAX_BYTE_SIZE**: `31`

Defined in: [src/utils/cairoDataTypes/bytes31.ts:9](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/bytes31.ts#L9)

---

### abiSelector

> `static` **abiSelector**: `"core::bytes_31::bytes31"`

Defined in: [src/utils/cairoDataTypes/bytes31.ts:13](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/bytes31.ts#L13)

---

### data

> **data**: `Uint8Array`

Defined in: [src/utils/cairoDataTypes/bytes31.ts:11](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/bytes31.ts#L11)

## Methods

### \_\_processData()

> `static` **\_\_processData**(`data`): `Uint8Array`

Defined in: [src/utils/cairoDataTypes/bytes31.ts:22](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/bytes31.ts#L22)

#### Parameters

##### data

`unknown`

#### Returns

`Uint8Array`

---

### validate()

> `static` **validate**(`data`): `void`

Defined in: [src/utils/cairoDataTypes/bytes31.ts:58](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/bytes31.ts#L58)

#### Parameters

##### data

`unknown`

#### Returns

`void`

---

### is()

> `static` **is**(`data`): `boolean`

Defined in: [src/utils/cairoDataTypes/bytes31.ts:66](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/bytes31.ts#L66)

#### Parameters

##### data

`string` \| `Uint8Array`\<`ArrayBufferLike`\> \| `Buffer`\<`ArrayBufferLike`\>

#### Returns

`boolean`

---

### isAbiType()

> `static` **isAbiType**(`abiType`): `boolean`

Defined in: [src/utils/cairoDataTypes/bytes31.ts:78](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/bytes31.ts#L78)

Check if provided abi type is this data type

#### Parameters

##### abiType

`string`

#### Returns

`boolean`

---

### factoryFromApiResponse()

> `static` **factoryFromApiResponse**(`responseIterator`): `CairoBytes31`

Defined in: [src/utils/cairoDataTypes/bytes31.ts:82](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/bytes31.ts#L82)

#### Parameters

##### responseIterator

`Iterator`\<`string`\>

#### Returns

`CairoBytes31`

---

### toApiRequest()

> **toApiRequest**(): `string`[]

Defined in: [src/utils/cairoDataTypes/bytes31.ts:35](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/bytes31.ts#L35)

#### Returns

`string`[]

---

### toBigInt()

> **toBigInt**(): `bigint`

Defined in: [src/utils/cairoDataTypes/bytes31.ts:39](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/bytes31.ts#L39)

#### Returns

`bigint`

---

### decodeUtf8()

> **decodeUtf8**(): `string`

Defined in: [src/utils/cairoDataTypes/bytes31.ts:43](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/bytes31.ts#L43)

#### Returns

`string`

---

### toHexString()

> **toHexString**(`padded?`): `string`

Defined in: [src/utils/cairoDataTypes/bytes31.ts:53](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/bytes31.ts#L53)

#### Parameters

##### padded?

`"padded"`

flag for including leading zeros

#### Returns

`string`
