# Class: CairoUint512

Defined in: [src/utils/cairoDataTypes/uint512.ts:18](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/uint512.ts#L18)

## Constructors

### Constructor

> **new CairoUint512**(`bigNumberish`): `CairoUint512`

Defined in: [src/utils/cairoDataTypes/uint512.ts:32](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/uint512.ts#L32)

Default constructor (Lib usage)

#### Parameters

##### bigNumberish

`unknown`

#### Returns

`CairoUint512`

### Constructor

> **new CairoUint512**(`limb0`, `limb1`, `limb2`, `limb3`): `CairoUint512`

Defined in: [src/utils/cairoDataTypes/uint512.ts:36](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/uint512.ts#L36)

Direct props initialization (Api response)

#### Parameters

##### limb0

[`BigNumberish`](../type-aliases/BigNumberish.md)

##### limb1

[`BigNumberish`](../type-aliases/BigNumberish.md)

##### limb2

[`BigNumberish`](../type-aliases/BigNumberish.md)

##### limb3

[`BigNumberish`](../type-aliases/BigNumberish.md)

#### Returns

`CairoUint512`

## Properties

### abiSelector

> `static` **abiSelector**: `string` = `'core::integer::u512'`

Defined in: [src/utils/cairoDataTypes/uint512.ts:27](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/uint512.ts#L27)

---

### limb0

> **limb0**: `bigint`

Defined in: [src/utils/cairoDataTypes/uint512.ts:19](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/uint512.ts#L19)

---

### limb1

> **limb1**: `bigint`

Defined in: [src/utils/cairoDataTypes/uint512.ts:21](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/uint512.ts#L21)

---

### limb2

> **limb2**: `bigint`

Defined in: [src/utils/cairoDataTypes/uint512.ts:23](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/uint512.ts#L23)

---

### limb3

> **limb3**: `bigint`

Defined in: [src/utils/cairoDataTypes/uint512.ts:25](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/uint512.ts#L25)

## Methods

### validate()

> `static` **validate**(`bigNumberish`): `bigint`

Defined in: [src/utils/cairoDataTypes/uint512.ts:81](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/uint512.ts#L81)

Validate if BigNumberish can be represented as Uint512

#### Parameters

##### bigNumberish

`unknown`

#### Returns

`bigint`

---

### validateProps()

> `static` **validateProps**(`limb0`, `limb1`, `limb2`, `limb3`): `object`

Defined in: [src/utils/cairoDataTypes/uint512.ts:98](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/uint512.ts#L98)

Validate if limbs can be represented as Uint512

#### Parameters

##### limb0

[`BigNumberish`](../type-aliases/BigNumberish.md)

##### limb1

[`BigNumberish`](../type-aliases/BigNumberish.md)

##### limb2

[`BigNumberish`](../type-aliases/BigNumberish.md)

##### limb3

[`BigNumberish`](../type-aliases/BigNumberish.md)

#### Returns

`object`

##### limb0

> **limb0**: `bigint`

##### limb1

> **limb1**: `bigint`

##### limb2

> **limb2**: `bigint`

##### limb3

> **limb3**: `bigint`

---

### is()

> `static` **is**(`bigNumberish`): `boolean`

Defined in: [src/utils/cairoDataTypes/uint512.ts:120](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/uint512.ts#L120)

Check if BigNumberish can be represented as Uint512

#### Parameters

##### bigNumberish

`unknown`

#### Returns

`boolean`

---

### isAbiType()

> `static` **isAbiType**(`abiType`): `boolean`

Defined in: [src/utils/cairoDataTypes/uint512.ts:132](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/uint512.ts#L132)

Check if provided abi type is this data type

#### Parameters

##### abiType

`string`

#### Returns

`boolean`

---

### factoryFromApiResponse()

> `static` **factoryFromApiResponse**(`responseIterator`): `CairoUint512`

Defined in: [src/utils/cairoDataTypes/uint512.ts:136](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/uint512.ts#L136)

#### Parameters

##### responseIterator

`Iterator`\<`string`\>

#### Returns

`CairoUint512`

---

### toBigInt()

> **toBigInt**(): `bigint`

Defined in: [src/utils/cairoDataTypes/uint512.ts:147](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/uint512.ts#L147)

Return bigint representation

#### Returns

`bigint`

---

### toUint512HexString()

> **toUint512HexString**(): `object`

Defined in: [src/utils/cairoDataTypes/uint512.ts:155](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/uint512.ts#L155)

Return Uint512 structure with HexString props
limbx: HexString

#### Returns

`object`

##### limb0

> **limb0**: `string`

##### limb1

> **limb1**: `string`

##### limb2

> **limb2**: `string`

##### limb3

> **limb3**: `string`

---

### toUint512DecimalString()

> **toUint512DecimalString**(): `object`

Defined in: [src/utils/cairoDataTypes/uint512.ts:168](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/uint512.ts#L168)

Return Uint512 structure with DecimalString props
limbx DecString

#### Returns

`object`

##### limb0

> **limb0**: `string`

##### limb1

> **limb1**: `string`

##### limb2

> **limb2**: `string`

##### limb3

> **limb3**: `string`

---

### toApiRequest()

> **toApiRequest**(): `string`[]

Defined in: [src/utils/cairoDataTypes/uint512.ts:180](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/uint512.ts#L180)

Return api requests representation witch is felt array

#### Returns

`string`[]
