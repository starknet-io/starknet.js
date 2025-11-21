---
id: 'CairoUint512'
title: 'Class: CairoUint512'
sidebar_label: 'CairoUint512'
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new CairoUint512**(`bigNumberish`): [`CairoUint512`](CairoUint512.md)

Default constructor (Lib usage)

#### Parameters

| Name           | Type      |
| :------------- | :-------- |
| `bigNumberish` | `unknown` |

#### Returns

[`CairoUint512`](CairoUint512.md)

#### Defined in

[src/utils/cairoDataTypes/uint512.ts:32](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/uint512.ts#L32)

• **new CairoUint512**(`limb0`, `limb1`, `limb2`, `limb3`): [`CairoUint512`](CairoUint512.md)

Direct props initialization (Api response)

#### Parameters

| Name    | Type                                         |
| :------ | :------------------------------------------- |
| `limb0` | [`BigNumberish`](../modules.md#bignumberish) |
| `limb1` | [`BigNumberish`](../modules.md#bignumberish) |
| `limb2` | [`BigNumberish`](../modules.md#bignumberish) |
| `limb3` | [`BigNumberish`](../modules.md#bignumberish) |

#### Returns

[`CairoUint512`](CairoUint512.md)

#### Defined in

[src/utils/cairoDataTypes/uint512.ts:36](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/uint512.ts#L36)

## Properties

### abiSelector

▪ `Static` **abiSelector**: `string` = `'core::integer::u512'`

#### Defined in

[src/utils/cairoDataTypes/uint512.ts:27](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/uint512.ts#L27)

---

### limb0

• **limb0**: `bigint`

#### Defined in

[src/utils/cairoDataTypes/uint512.ts:19](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/uint512.ts#L19)

---

### limb1

• **limb1**: `bigint`

#### Defined in

[src/utils/cairoDataTypes/uint512.ts:21](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/uint512.ts#L21)

---

### limb2

• **limb2**: `bigint`

#### Defined in

[src/utils/cairoDataTypes/uint512.ts:23](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/uint512.ts#L23)

---

### limb3

• **limb3**: `bigint`

#### Defined in

[src/utils/cairoDataTypes/uint512.ts:25](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/uint512.ts#L25)

## Methods

### validate

▸ **validate**(`bigNumberish`): `bigint`

Validate if BigNumberish can be represented as Uint512

#### Parameters

| Name           | Type      |
| :------------- | :-------- |
| `bigNumberish` | `unknown` |

#### Returns

`bigint`

#### Defined in

[src/utils/cairoDataTypes/uint512.ts:81](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/uint512.ts#L81)

---

### validateProps

▸ **validateProps**(`limb0`, `limb1`, `limb2`, `limb3`): `Object`

Validate if limbs can be represented as Uint512

#### Parameters

| Name    | Type                                         |
| :------ | :------------------------------------------- |
| `limb0` | [`BigNumberish`](../modules.md#bignumberish) |
| `limb1` | [`BigNumberish`](../modules.md#bignumberish) |
| `limb2` | [`BigNumberish`](../modules.md#bignumberish) |
| `limb3` | [`BigNumberish`](../modules.md#bignumberish) |

#### Returns

`Object`

| Name    | Type     |
| :------ | :------- |
| `limb0` | `bigint` |
| `limb1` | `bigint` |
| `limb2` | `bigint` |
| `limb3` | `bigint` |

#### Defined in

[src/utils/cairoDataTypes/uint512.ts:98](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/uint512.ts#L98)

---

### is

▸ **is**(`bigNumberish`): `boolean`

Check if BigNumberish can be represented as Uint512

#### Parameters

| Name           | Type      |
| :------------- | :-------- |
| `bigNumberish` | `unknown` |

#### Returns

`boolean`

#### Defined in

[src/utils/cairoDataTypes/uint512.ts:120](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/uint512.ts#L120)

---

### isAbiType

▸ **isAbiType**(`abiType`): `boolean`

Check if provided abi type is this data type

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `abiType` | `string` |

#### Returns

`boolean`

#### Defined in

[src/utils/cairoDataTypes/uint512.ts:132](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/uint512.ts#L132)

---

### factoryFromApiResponse

▸ **factoryFromApiResponse**(`responseIterator`): [`CairoUint512`](CairoUint512.md)

#### Parameters

| Name               | Type                                      |
| :----------------- | :---------------------------------------- |
| `responseIterator` | `Iterator`<`string`, `any`, `undefined`\> |

#### Returns

[`CairoUint512`](CairoUint512.md)

#### Defined in

[src/utils/cairoDataTypes/uint512.ts:136](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/uint512.ts#L136)

---

### toBigInt

▸ **toBigInt**(): `bigint`

Return bigint representation

#### Returns

`bigint`

#### Defined in

[src/utils/cairoDataTypes/uint512.ts:147](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/uint512.ts#L147)

---

### toUint512HexString

▸ **toUint512HexString**(): `Object`

Return Uint512 structure with HexString props
limbx: HexString

#### Returns

`Object`

| Name    | Type     |
| :------ | :------- |
| `limb0` | `string` |
| `limb1` | `string` |
| `limb2` | `string` |
| `limb3` | `string` |

#### Defined in

[src/utils/cairoDataTypes/uint512.ts:155](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/uint512.ts#L155)

---

### toUint512DecimalString

▸ **toUint512DecimalString**(): `Object`

Return Uint512 structure with DecimalString props
limbx DecString

#### Returns

`Object`

| Name    | Type     |
| :------ | :------- |
| `limb0` | `string` |
| `limb1` | `string` |
| `limb2` | `string` |
| `limb3` | `string` |

#### Defined in

[src/utils/cairoDataTypes/uint512.ts:168](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/uint512.ts#L168)

---

### toApiRequest

▸ **toApiRequest**(): `string`[]

Return api requests representation witch is felt array

#### Returns

`string`[]

#### Defined in

[src/utils/cairoDataTypes/uint512.ts:180](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/uint512.ts#L180)
