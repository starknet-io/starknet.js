# Class: CairoUint256

Defined in: [src/utils/cairoDataTypes/uint256.ts:21](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/uint256.ts#L21)

## Constructors

### Constructor

> **new CairoUint256**(`data`): `CairoUint256`

Defined in: [src/utils/cairoDataTypes/uint256.ts:31](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/uint256.ts#L31)

Default constructor (Lib usage)

#### Parameters

##### data

`unknown`

#### Returns

`CairoUint256`

### Constructor

> **new CairoUint256**(`low`, `high`): `CairoUint256`

Defined in: [src/utils/cairoDataTypes/uint256.ts:35](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/uint256.ts#L35)

Direct props initialization (Api response)

#### Parameters

##### low

[`BigNumberish`](../type-aliases/BigNumberish.md)

##### high

[`BigNumberish`](../type-aliases/BigNumberish.md)

#### Returns

`CairoUint256`

## Properties

### abiSelector

> `static` **abiSelector**: `"core::integer::u256"`

Defined in: [src/utils/cairoDataTypes/uint256.ts:26](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/uint256.ts#L26)

---

### low

> **low**: `bigint`

Defined in: [src/utils/cairoDataTypes/uint256.ts:22](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/uint256.ts#L22)

---

### high

> **high**: `bigint`

Defined in: [src/utils/cairoDataTypes/uint256.ts:24](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/uint256.ts#L24)

## Methods

### validate()

> `static` **validate**(`bigNumberish`): `bigint`

Defined in: [src/utils/cairoDataTypes/uint256.ts:60](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/uint256.ts#L60)

Validate if BigNumberish can be represented as Unit256

#### Parameters

##### bigNumberish

`unknown`

#### Returns

`bigint`

---

### validateProps()

> `static` **validateProps**(`low`, `high`): `object`

Defined in: [src/utils/cairoDataTypes/uint256.ts:77](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/uint256.ts#L77)

Validate if low and high can be represented as Unit256

#### Parameters

##### low

[`BigNumberish`](../type-aliases/BigNumberish.md)

##### high

[`BigNumberish`](../type-aliases/BigNumberish.md)

#### Returns

`object`

##### low

> **low**: `bigint` = `bigIntLow`

##### high

> **high**: `bigint` = `bigIntHigh`

---

### is()

> `static` **is**(`bigNumberish`): `boolean`

Defined in: [src/utils/cairoDataTypes/uint256.ts:94](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/uint256.ts#L94)

Check if BigNumberish can be represented as Unit256

#### Parameters

##### bigNumberish

`unknown`

#### Returns

`boolean`

---

### isAbiType()

> `static` **isAbiType**(`abiType`): `abiType is "core::integer::u256"`

Defined in: [src/utils/cairoDataTypes/uint256.ts:106](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/uint256.ts#L106)

Check if provided abi type is this data type

#### Parameters

##### abiType

`string`

#### Returns

`abiType is "core::integer::u256"`

---

### factoryFromApiResponse()

> `static` **factoryFromApiResponse**(`responseIterator`): `CairoUint256`

Defined in: [src/utils/cairoDataTypes/uint256.ts:110](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/uint256.ts#L110)

#### Parameters

##### responseIterator

`Iterator`\<`string`\>

#### Returns

`CairoUint256`

---

### toBigInt()

> **toBigInt**(): `bigint`

Defined in: [src/utils/cairoDataTypes/uint256.ts:119](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/uint256.ts#L119)

Return bigint representation

#### Returns

`bigint`

---

### toUint256HexString()

> **toUint256HexString**(): `object`

Defined in: [src/utils/cairoDataTypes/uint256.ts:127](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/uint256.ts#L127)

Return Uint256 structure with HexString props
{low: HexString, high: HexString}

#### Returns

`object`

##### low

> **low**: `string`

##### high

> **high**: `string`

---

### toUint256DecimalString()

> **toUint256DecimalString**(): `object`

Defined in: [src/utils/cairoDataTypes/uint256.ts:138](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/uint256.ts#L138)

Return Uint256 structure with DecimalString props
{low: DecString, high: DecString}

#### Returns

`object`

##### low

> **low**: `string`

##### high

> **high**: `string`

---

### toApiRequest()

> **toApiRequest**(): `string`[]

Defined in: [src/utils/cairoDataTypes/uint256.ts:148](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/uint256.ts#L148)

Return api requests representation witch is felt array

#### Returns

`string`[]
