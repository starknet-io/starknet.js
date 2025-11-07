---
id: 'cairo'
title: 'Namespace: cairo'
sidebar_label: 'cairo'
sidebar_position: 0
custom_edit_url: null
---

## Functions

### isCairo1Abi

▸ **isCairo1Abi**(`abi`): `boolean`

Test if an ABI comes from a Cairo 1 contract

#### Parameters

| Name  | Type                       | Description                                    |
| :---- | :------------------------- | :--------------------------------------------- |
| `abi` | [`Abi`](../modules.md#abi) | representing the interface of a Cairo contract |

#### Returns

`boolean`

TRUE if it is an ABI from a Cairo1 contract

**`Example`**

```typescript
const isCairo1: boolean = isCairo1Abi(myAbi: Abi);
```

#### Defined in

[src/utils/calldata/cairo.ts:173](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/calldata/cairo.ts#L173)

---

### isTypeNonZero

▸ **isTypeNonZero**(`type`): `boolean`

Checks if the given type is a NonZero type.

#### Parameters

| Name   | Type     | Description        |
| :----- | :------- | :----------------- |
| `type` | `string` | The type to check. |

#### Returns

`boolean`

`true` if the type is NonZero type, `false` otherwise.

**`Example`**

```typescript
const result = cairo.isTypeNonZero('core::zeroable::NonZero::<u8>');
//result = true
```

#### Defined in

[src/utils/calldata/cairo.ts:192](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/calldata/cairo.ts#L192)

---

### getAbiContractVersion

▸ **getAbiContractVersion**(`abi`): [`ContractVersion`](../modules.md#contractversion)

Return ContractVersion (Abi version) based on Abi
or undefined for unknown version

#### Parameters

| Name  | Type                       |
| :---- | :------------------------- |
| `abi` | [`Abi`](../modules.md#abi) |

#### Returns

[`ContractVersion`](../modules.md#contractversion)

string

#### Defined in

[src/utils/calldata/cairo.ts:202](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/calldata/cairo.ts#L202)

---

### felt

▸ **felt**(`it`): `string`

Create felt Cairo type (cairo type helper)

#### Parameters

| Name | Type                                         |
| :--- | :------------------------------------------- |
| `it` | [`BigNumberish`](../modules.md#bignumberish) |

#### Returns

`string`

format: felt-string

#### Defined in

[src/utils/calldata/cairo.ts:271](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/calldata/cairo.ts#L271)

---

### isLen

▸ **isLen**(`name`): `boolean`

Checks if the given name ends with "\_len".

#### Parameters

| Name   | Type     | Description             |
| :----- | :------- | :---------------------- |
| `name` | `string` | The name to be checked. |

#### Returns

`boolean`

- True if the name ends with "\_len", false otherwise.

#### Defined in

[src/utils/calldata/cairo.ts:26](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/calldata/cairo.ts#L26)

---

### isTypeFelt

▸ **isTypeFelt**(`type`): `boolean`

Checks if a given type is felt.

#### Parameters

| Name   | Type     | Description        |
| :----- | :------- | :----------------- |
| `type` | `string` | The type to check. |

#### Returns

`boolean`

- True if the type is felt, false otherwise.

#### Defined in

[src/utils/calldata/cairo.ts:33](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/calldata/cairo.ts#L33)

---

### isTypeArray

▸ **isTypeArray**(`type`): `boolean`

Checks if the given type is an array type.

#### Parameters

| Name   | Type     | Description        |
| :----- | :------- | :----------------- |
| `type` | `string` | The type to check. |

#### Returns

`boolean`

- `true` if the type is an array type, `false` otherwise.

#### Defined in

[src/utils/calldata/cairo.ts:40](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/calldata/cairo.ts#L40)

---

### isTypeTuple

▸ **isTypeTuple**(`type`): `boolean`

Checks if the given type is a tuple type.

#### Parameters

| Name   | Type     | Description             |
| :----- | :------- | :---------------------- |
| `type` | `string` | The type to be checked. |

#### Returns

`boolean`

- `true` if the type is a tuple type, otherwise `false`.

#### Defined in

[src/utils/calldata/cairo.ts:51](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/calldata/cairo.ts#L51)

---

### isTypeNamedTuple

▸ **isTypeNamedTuple**(`type`): `boolean`

Checks whether a given type is a named tuple.

#### Parameters

| Name   | Type     | Description             |
| :----- | :------- | :---------------------- |
| `type` | `string` | The type to be checked. |

#### Returns

`boolean`

- True if the type is a named tuple, false otherwise.

#### Defined in

[src/utils/calldata/cairo.ts:58](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/calldata/cairo.ts#L58)

---

### isTypeStruct

▸ **isTypeStruct**(`type`, `structs`): `boolean`

Checks if a given type is a struct.

#### Parameters

| Name      | Type                                     | Description                             |
| :-------- | :--------------------------------------- | :-------------------------------------- |
| `type`    | `string`                                 | The type to check for existence.        |
| `structs` | [`AbiStructs`](../modules.md#abistructs) | The collection of structs to search in. |

#### Returns

`boolean`

- True if the type exists in the structs, false otherwise.

#### Defined in

[src/utils/calldata/cairo.ts:66](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/calldata/cairo.ts#L66)

---

### isTypeEnum

▸ **isTypeEnum**(`type`, `enums`): `boolean`

Checks if a given type is an enum.

#### Parameters

| Name    | Type                                 | Description                   |
| :------ | :----------------------------------- | :---------------------------- |
| `type`  | `string`                             | The type to check.            |
| `enums` | [`AbiEnums`](../modules.md#abienums) | The enumeration to search in. |

#### Returns

`boolean`

- True if the type exists in the enumeration, otherwise false.

#### Defined in

[src/utils/calldata/cairo.ts:74](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/calldata/cairo.ts#L74)

---

### isTypeOption

▸ **isTypeOption**(`type`): `boolean`

Determines if the given type is an Option type.

#### Parameters

| Name   | Type     | Description        |
| :----- | :------- | :----------------- |
| `type` | `string` | The type to check. |

#### Returns

`boolean`

- True if the type is an Option type, false otherwise.

#### Defined in

[src/utils/calldata/cairo.ts:81](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/calldata/cairo.ts#L81)

---

### isTypeResult

▸ **isTypeResult**(`type`): `boolean`

Checks whether a given type starts with 'core::result::Result::'.

#### Parameters

| Name   | Type     | Description        |
| :----- | :------- | :----------------- |
| `type` | `string` | The type to check. |

#### Returns

`boolean`

- True if the type starts with 'core::result::Result::', false otherwise.

#### Defined in

[src/utils/calldata/cairo.ts:88](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/calldata/cairo.ts#L88)

---

### isTypeUint

▸ **isTypeUint**(`type`): `boolean`

Checks if the given value is a valid Uint type.

#### Parameters

| Name   | Type     | Description         |
| :----- | :------- | :------------------ |
| `type` | `string` | The value to check. |

#### Returns

`boolean`

- Returns true if the value is a valid Uint type, otherwise false.

#### Defined in

[src/utils/calldata/cairo.ts:95](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/calldata/cairo.ts#L95)

---

### isTypeInt

▸ **isTypeInt**(`type`): `boolean`

Checks if the given value is a valid Int type.

#### Parameters

| Name   | Type     | Description         |
| :----- | :------- | :------------------ |
| `type` | `string` | The value to check. |

#### Returns

`boolean`

- Returns true if the value is a valid Int type, otherwise false.

#### Defined in

[src/utils/calldata/cairo.ts:102](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/calldata/cairo.ts#L102)

---

### isTypeUint256

▸ **isTypeUint256**(`type`): `boolean`

Checks if the given type is `uint256`.

#### Parameters

| Name   | Type     | Description             |
| :----- | :------- | :---------------------- |
| `type` | `string` | The type to be checked. |

#### Returns

`boolean`

- Returns true if the type is `uint256`, otherwise false.

#### Defined in

[src/utils/calldata/cairo.ts:110](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/calldata/cairo.ts#L110)

---

### isTypeLiteral

▸ **isTypeLiteral**(`type`): `boolean`

Checks if the given type is a literal type.

#### Parameters

| Name   | Type     | Description        |
| :----- | :------- | :----------------- |
| `type` | `string` | The type to check. |

#### Returns

`boolean`

- True if the type is a literal type, false otherwise.

#### Defined in

[src/utils/calldata/cairo.ts:117](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/calldata/cairo.ts#L117)

---

### isTypeBool

▸ **isTypeBool**(`type`): `boolean`

Checks if the given type is a boolean type.

#### Parameters

| Name   | Type     | Description             |
| :----- | :------- | :---------------------- |
| `type` | `string` | The type to be checked. |

#### Returns

`boolean`

- Returns true if the type is a boolean type, otherwise false.

#### Defined in

[src/utils/calldata/cairo.ts:124](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/calldata/cairo.ts#L124)

---

### isTypeContractAddress

▸ **isTypeContractAddress**(`type`): `boolean`

Checks if the provided type is equal to 'core::starknet::contract_address::ContractAddress'.

#### Parameters

| Name   | Type     | Description             |
| :----- | :------- | :---------------------- |
| `type` | `string` | The type to be checked. |

#### Returns

`boolean`

- true if the type matches 'core::starknet::contract_address::ContractAddress', false otherwise.

#### Defined in

[src/utils/calldata/cairo.ts:130](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/calldata/cairo.ts#L130)

---

### isTypeEthAddress

▸ **isTypeEthAddress**(`type`): `boolean`

Determines if the given type is an Ethereum address type.

#### Parameters

| Name   | Type     | Description        |
| :----- | :------- | :----------------- |
| `type` | `string` | The type to check. |

#### Returns

`boolean`

- Returns true if the given type is 'core::starknet::eth_address::EthAddress', otherwise false.

#### Defined in

[src/utils/calldata/cairo.ts:137](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/calldata/cairo.ts#L137)

---

### isTypeU96

▸ **isTypeU96**(`type`): `boolean`

Checks if the given type is equal to the u96 type

#### Parameters

| Name   | Type     | Description        |
| :----- | :------- | :----------------- |
| `type` | `string` | The type to check. |

#### Returns

`boolean`

- True if the given type is equal to u96, false otherwise.

#### Defined in

[src/utils/calldata/cairo.ts:145](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/calldata/cairo.ts#L145)

---

### isTypeSecp256k1Point

▸ **isTypeSecp256k1Point**(`type`): `boolean`

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `type` | `string` |

#### Returns

`boolean`

#### Defined in

[src/utils/calldata/cairo.ts:148](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/calldata/cairo.ts#L148)

---

### isCairo1Type

▸ **isCairo1Type**(`type`): `boolean`

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `type` | `string` |

#### Returns

`boolean`

#### Defined in

[src/utils/calldata/cairo.ts:150](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/calldata/cairo.ts#L150)

---

### getArrayType

▸ **getArrayType**(`type`): `string`

Retrieves the array type from the given type string.

Works also for core::zeroable::NonZero type.

#### Parameters

| Name   | Type     | Description      |
| :----- | :------- | :--------------- |
| `type` | `string` | The type string. |

#### Returns

`string`

- The array type.

#### Defined in

[src/utils/calldata/cairo.ts:158](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/calldata/cairo.ts#L158)

---

### uint256

▸ **uint256**(`it`): [`Uint256`](../interfaces/Uint256-1.md)

Create Uint256 Cairo type (helper for common struct type)

#### Parameters

| Name | Type                                         |
| :--- | :------------------------------------------- |
| `it` | [`BigNumberish`](../modules.md#bignumberish) |

#### Returns

[`Uint256`](../interfaces/Uint256-1.md)

**`Example`**

```typescript
uint256('892349863487563453485768723498');
```

#### Defined in

[src/utils/calldata/cairo.ts:239](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/calldata/cairo.ts#L239)

---

### uint512

▸ **uint512**(`it`): [`Uint512`](../interfaces/Uint512.md)

Create Uint512 Cairo type (helper for common struct type)

#### Parameters

| Name | Type                                         | Description                                               |
| :--- | :------------------------------------------- | :-------------------------------------------------------- |
| `it` | [`BigNumberish`](../modules.md#bignumberish) | BigNumberish representation of a 512 bits unsigned number |

#### Returns

[`Uint512`](../interfaces/Uint512.md)

Uint512 struct

**`Example`**

```typescript
uint512('345745685892349863487563453485768723498');
```

#### Defined in

[src/utils/calldata/cairo.ts:252](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/calldata/cairo.ts#L252)

---

### tuple

▸ **tuple**(`...args`): `Record`<`number`, `boolean` \| `object` \| [`BigNumberish`](../modules.md#bignumberish)\>

Create unnamed tuple Cairo type (helper same as common struct type)

#### Parameters

| Name      | Type                                                                      |
| :-------- | :------------------------------------------------------------------------ |
| `...args` | (`boolean` \| `object` \| [`BigNumberish`](../modules.md#bignumberish))[] |

#### Returns

`Record`<`number`, `boolean` \| `object` \| [`BigNumberish`](../modules.md#bignumberish)\>

**`Example`**

```typescript
tuple(1, '0x101', 16);
```

#### Defined in

[src/utils/calldata/cairo.ts:263](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/calldata/cairo.ts#L263)
