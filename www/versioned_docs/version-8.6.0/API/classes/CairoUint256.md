---
id: 'CairoUint256'
title: 'Class: CairoUint256'
sidebar_label: 'CairoUint256'
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new CairoUint256**(`data`): [`CairoUint256`](CairoUint256.md)

Default constructor (Lib usage)

#### Parameters

| Name   | Type      |
| :----- | :-------- |
| `data` | `unknown` |

#### Returns

[`CairoUint256`](CairoUint256.md)

#### Defined in

[src/utils/cairoDataTypes/uint256.ts:31](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/uint256.ts#L31)

• **new CairoUint256**(`low`, `high`): [`CairoUint256`](CairoUint256.md)

Direct props initialization (Api response)

#### Parameters

| Name   | Type                                         |
| :----- | :------------------------------------------- |
| `low`  | [`BigNumberish`](../modules.md#bignumberish) |
| `high` | [`BigNumberish`](../modules.md#bignumberish) |

#### Returns

[`CairoUint256`](CairoUint256.md)

#### Defined in

[src/utils/cairoDataTypes/uint256.ts:35](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/uint256.ts#L35)

## Properties

### abiSelector

▪ `Static` **abiSelector**: `"core::integer::u256"`

#### Defined in

[src/utils/cairoDataTypes/uint256.ts:26](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/uint256.ts#L26)

---

### low

• **low**: `bigint`

#### Defined in

[src/utils/cairoDataTypes/uint256.ts:22](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/uint256.ts#L22)

---

### high

• **high**: `bigint`

#### Defined in

[src/utils/cairoDataTypes/uint256.ts:24](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/uint256.ts#L24)

## Methods

### validate

▸ **validate**(`bigNumberish`): `bigint`

Validate if BigNumberish can be represented as Unit256

#### Parameters

| Name           | Type      |
| :------------- | :-------- |
| `bigNumberish` | `unknown` |

#### Returns

`bigint`

#### Defined in

[src/utils/cairoDataTypes/uint256.ts:60](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/uint256.ts#L60)

---

### validateProps

▸ **validateProps**(`low`, `high`): `Object`

Validate if low and high can be represented as Unit256

#### Parameters

| Name   | Type                                         |
| :----- | :------------------------------------------- |
| `low`  | [`BigNumberish`](../modules.md#bignumberish) |
| `high` | [`BigNumberish`](../modules.md#bignumberish) |

#### Returns

`Object`

| Name   | Type     |
| :----- | :------- |
| `low`  | `bigint` |
| `high` | `bigint` |

#### Defined in

[src/utils/cairoDataTypes/uint256.ts:77](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/uint256.ts#L77)

---

### is

▸ **is**(`bigNumberish`): `boolean`

Check if BigNumberish can be represented as Unit256

#### Parameters

| Name           | Type      |
| :------------- | :-------- |
| `bigNumberish` | `unknown` |

#### Returns

`boolean`

#### Defined in

[src/utils/cairoDataTypes/uint256.ts:94](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/uint256.ts#L94)

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

[src/utils/cairoDataTypes/uint256.ts:106](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/uint256.ts#L106)

---

### factoryFromApiResponse

▸ **factoryFromApiResponse**(`responseIterator`): [`CairoUint256`](CairoUint256.md)

#### Parameters

| Name               | Type                                      |
| :----------------- | :---------------------------------------- |
| `responseIterator` | `Iterator`<`string`, `any`, `undefined`\> |

#### Returns

[`CairoUint256`](CairoUint256.md)

#### Defined in

[src/utils/cairoDataTypes/uint256.ts:110](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/uint256.ts#L110)

---

### toBigInt

▸ **toBigInt**(): `bigint`

Return bigint representation

#### Returns

`bigint`

#### Defined in

[src/utils/cairoDataTypes/uint256.ts:119](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/uint256.ts#L119)

---

### toUint256HexString

▸ **toUint256HexString**(): `Object`

Return Uint256 structure with HexString props
{low: HexString, high: HexString}

#### Returns

`Object`

| Name   | Type     |
| :----- | :------- |
| `low`  | `string` |
| `high` | `string` |

#### Defined in

[src/utils/cairoDataTypes/uint256.ts:127](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/uint256.ts#L127)

---

### toUint256DecimalString

▸ **toUint256DecimalString**(): `Object`

Return Uint256 structure with DecimalString props
{low: DecString, high: DecString}

#### Returns

`Object`

| Name   | Type     |
| :----- | :------- |
| `low`  | `string` |
| `high` | `string` |

#### Defined in

[src/utils/cairoDataTypes/uint256.ts:138](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/uint256.ts#L138)

---

### toApiRequest

▸ **toApiRequest**(): `string`[]

Return api requests representation witch is felt array

#### Returns

`string`[]

#### Defined in

[src/utils/cairoDataTypes/uint256.ts:148](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/uint256.ts#L148)
