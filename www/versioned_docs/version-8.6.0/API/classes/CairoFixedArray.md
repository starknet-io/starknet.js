---
id: 'CairoFixedArray'
title: 'Class: CairoFixedArray'
sidebar_label: 'CairoFixedArray'
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new CairoFixedArray**(`content`, `arrayType`): [`CairoFixedArray`](CairoFixedArray.md)

Create an instance representing a Cairo fixed Array.

#### Parameters

| Name        | Type     | Description                                |
| :---------- | :------- | :----------------------------------------- |
| `content`   | `any`[]  | JS array representing a Cairo fixed array. |
| `arrayType` | `string` | Cairo fixed array type.                    |

#### Returns

[`CairoFixedArray`](CairoFixedArray.md)

#### Defined in

[src/utils/cairoDataTypes/fixedArray.ts:19](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/fixedArray.ts#L19)

## Properties

### content

• `Readonly` **content**: `any`[]

JS array representing a Cairo fixed array.

#### Defined in

[src/utils/cairoDataTypes/fixedArray.ts:7](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/fixedArray.ts#L7)

---

### arrayType

• `Readonly` **arrayType**: `string`

Cairo fixed array type.

#### Defined in

[src/utils/cairoDataTypes/fixedArray.ts:12](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/fixedArray.ts#L12)

## Methods

### getFixedArraySize

▸ **getFixedArraySize**(`type`): `number`

Retrieves the array size from the given type string representing a Cairo fixed array.

#### Parameters

| Name   | Type     | Description                 |
| :----- | :------- | :-------------------------- |
| `type` | `string` | The Cairo fixed array type. |

#### Returns

`number`

The array size.

**`Example`**

```typescript
const result = CairoFixedArray.getFixedArraySize('[core::integer::u32; 8]');
// result = 8
```

#### Defined in

[src/utils/cairoDataTypes/fixedArray.ts:62](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/fixedArray.ts#L62)

---

### getFixedArrayType

▸ **getFixedArrayType**(`type`): `string`

Retrieve the Cairo content type from a Cairo fixed array type.

#### Parameters

| Name   | Type     | Description      |
| :----- | :------- | :--------------- |
| `type` | `string` | The type string. |

#### Returns

`string`

The fixed-array type.

**`Example`**

```typescript
const result = CairoFixedArray.getFixedArrayType('[core::integer::u32; 8]');
// result = "core::integer::u32"
```

#### Defined in

[src/utils/cairoDataTypes/fixedArray.ts:93](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/fixedArray.ts#L93)

---

### compile

▸ **compile**(`input`): `Object`

Create an object from a Cairo fixed array.
Be sure to have an array length conform to the ABI.
To be used with CallData.compile().

#### Parameters

| Name    | Type    | Description                                |
| :------ | :------ | :----------------------------------------- |
| `input` | `any`[] | JS array representing a Cairo fixed array. |

#### Returns

`Object`

a specific struct representing a fixed Array.

**`Example`**

```typescript
const result = CairoFixedArray.compile([10, 20, 30]);
// result = { '0': 10, '1': 20, '2': 30 }
```

#### Defined in

[src/utils/cairoDataTypes/fixedArray.ts:126](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/fixedArray.ts#L126)

---

### isTypeFixedArray

▸ **isTypeFixedArray**(`type`): `boolean`

Checks if the given Cairo type is a fixed-array type.
structure: [string; number]

#### Parameters

| Name   | Type     | Description        |
| :----- | :------- | :----------------- |
| `type` | `string` | The type to check. |

#### Returns

`boolean`

- `true` if the type is a fixed array type, `false` otherwise.

````typescript
const result = CairoFixedArray.isTypeFixedArray("[core::integer::u32; 8]");
// result = true

#### Defined in

[src/utils/cairoDataTypes/fixedArray.ts:158](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/fixedArray.ts#L158)

___

### getFixedArraySize

▸ **getFixedArraySize**(): `number`

Retrieves the Cairo fixed array size from the CairoFixedArray instance.

#### Returns

`number`

The fixed array size.

**`Example`**

```typescript
const fArray = new CairoFixedArray([10,20,30], "[core::integer::u32; 3]");
const result = fArray.getFixedArraySize();
// result = 3
````

#### Defined in

[src/utils/cairoDataTypes/fixedArray.ts:79](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/fixedArray.ts#L79)

---

### getFixedArrayType

▸ **getFixedArrayType**(): `string`

Retrieve the Cairo content type of the Cairo fixed array.

#### Returns

`string`

The fixed-array content type.

**`Example`**

```typescript
const fArray = new CairoFixedArray([10, 20, 30], '[core::integer::u32; 3]');
const result = fArray.getFixedArrayType();
// result = "core::integer::u32"
```

#### Defined in

[src/utils/cairoDataTypes/fixedArray.ts:110](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/fixedArray.ts#L110)

---

### compile

▸ **compile**(): `Object`

Generate an object from the Cairo fixed array instance.
To be used with CallData.compile().

#### Returns

`Object`

a specific struct representing a fixed array.

**`Example`**

```typescript
const fArray = new CairoFixedArray([10, 20, 30], '[core::integer::u32; 3]');
const result = fArray.compile();
// result = { '0': 10, '1': 20, '2': 30 }
```

#### Defined in

[src/utils/cairoDataTypes/fixedArray.ts:144](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/cairoDataTypes/fixedArray.ts#L144)
