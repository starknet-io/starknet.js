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

| Name           | Type                                                  | Description                          |
| :------------- | :---------------------------------------------------- | :----------------------------------- |
| `bigNumberish` | [`BigNumberish`](../namespaces/types.md#bignumberish) | BigNumberish value representing u512 |

#### Returns

[`CairoUint512`](CairoUint512.md)

#### Defined in

[src/utils/cairoDataTypes/uint512.ts:30](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/cairoDataTypes/uint512.ts#L30)

• **new CairoUint512**(`limb0`, `limb1`, `limb2`, `limb3`): [`CairoUint512`](CairoUint512.md)

Direct props initialization (Api response)

#### Parameters

| Name    | Type                                                  |
| :------ | :---------------------------------------------------- |
| `limb0` | [`BigNumberish`](../namespaces/types.md#bignumberish) |
| `limb1` | [`BigNumberish`](../namespaces/types.md#bignumberish) |
| `limb2` | [`BigNumberish`](../namespaces/types.md#bignumberish) |
| `limb3` | [`BigNumberish`](../namespaces/types.md#bignumberish) |

#### Returns

[`CairoUint512`](CairoUint512.md)

#### Defined in

[src/utils/cairoDataTypes/uint512.ts:34](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/cairoDataTypes/uint512.ts#L34)

• **new CairoUint512**(`uint512`): [`CairoUint512`](CairoUint512.md)

Initialization from Uint512 object

#### Parameters

| Name      | Type                                        |
| :-------- | :------------------------------------------ |
| `uint512` | [`Uint512`](../interfaces/types.Uint512.md) |

#### Returns

[`CairoUint512`](CairoUint512.md)

#### Defined in

[src/utils/cairoDataTypes/uint512.ts:43](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/cairoDataTypes/uint512.ts#L43)

## Properties

### abiSelector

▪ `Static` **abiSelector**: `string` = `'core::integer::u512'`

#### Defined in

[src/utils/cairoDataTypes/uint512.ts:24](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/cairoDataTypes/uint512.ts#L24)

---

### limb0

• **limb0**: `bigint`

#### Defined in

[src/utils/cairoDataTypes/uint512.ts:16](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/cairoDataTypes/uint512.ts#L16)

---

### limb1

• **limb1**: `bigint`

#### Defined in

[src/utils/cairoDataTypes/uint512.ts:18](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/cairoDataTypes/uint512.ts#L18)

---

### limb2

• **limb2**: `bigint`

#### Defined in

[src/utils/cairoDataTypes/uint512.ts:20](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/cairoDataTypes/uint512.ts#L20)

---

### limb3

• **limb3**: `bigint`

#### Defined in

[src/utils/cairoDataTypes/uint512.ts:22](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/cairoDataTypes/uint512.ts#L22)

## Methods

### validate

▸ **validate**(`bigNumberish`): `bigint`

Validate if BigNumberish can be represented as Uint512

#### Parameters

| Name           | Type                                                  |
| :------------- | :---------------------------------------------------- |
| `bigNumberish` | [`BigNumberish`](../namespaces/types.md#bignumberish) |

#### Returns

`bigint`

#### Defined in

[src/utils/cairoDataTypes/uint512.ts:84](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/cairoDataTypes/uint512.ts#L84)

---

### validateProps

▸ **validateProps**(`limb0`, `limb1`, `limb2`, `limb3`): `Object`

Validate if limbs can be represented as Uint512

#### Parameters

| Name    | Type                                                  |
| :------ | :---------------------------------------------------- |
| `limb0` | [`BigNumberish`](../namespaces/types.md#bignumberish) |
| `limb1` | [`BigNumberish`](../namespaces/types.md#bignumberish) |
| `limb2` | [`BigNumberish`](../namespaces/types.md#bignumberish) |
| `limb3` | [`BigNumberish`](../namespaces/types.md#bignumberish) |

#### Returns

`Object`

| Name    | Type     |
| :------ | :------- |
| `limb0` | `bigint` |
| `limb1` | `bigint` |
| `limb2` | `bigint` |
| `limb3` | `bigint` |

#### Defined in

[src/utils/cairoDataTypes/uint512.ts:94](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/cairoDataTypes/uint512.ts#L94)

---

### is

▸ **is**(`bigNumberish`): `boolean`

Check if BigNumberish can be represented as Uint512

#### Parameters

| Name           | Type                                                  |
| :------------- | :---------------------------------------------------- |
| `bigNumberish` | [`BigNumberish`](../namespaces/types.md#bignumberish) |

#### Returns

`boolean`

#### Defined in

[src/utils/cairoDataTypes/uint512.ts:115](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/cairoDataTypes/uint512.ts#L115)

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

[src/utils/cairoDataTypes/uint512.ts:127](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/cairoDataTypes/uint512.ts#L127)

---

### toBigInt

▸ **toBigInt**(): `bigint`

Return bigint representation

#### Returns

`bigint`

#### Defined in

[src/utils/cairoDataTypes/uint512.ts:134](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/cairoDataTypes/uint512.ts#L134)

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

[src/utils/cairoDataTypes/uint512.ts:142](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/cairoDataTypes/uint512.ts#L142)

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

[src/utils/cairoDataTypes/uint512.ts:155](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/cairoDataTypes/uint512.ts#L155)

---

### toApiRequest

▸ **toApiRequest**(): `string`[]

Return api requests representation witch is felt array

#### Returns

`string`[]

#### Defined in

[src/utils/cairoDataTypes/uint512.ts:167](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/cairoDataTypes/uint512.ts#L167)
