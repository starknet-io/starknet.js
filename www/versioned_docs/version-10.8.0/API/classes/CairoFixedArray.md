# Class: CairoFixedArray

Defined in: [src/utils/cairoDataTypes/fixedArray.ts:3](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/fixedArray.ts#L3)

## Constructors

### Constructor

> **new CairoFixedArray**(`content`, `arrayType`): `CairoFixedArray`

Defined in: [src/utils/cairoDataTypes/fixedArray.ts:39](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/fixedArray.ts#L39)

Create an instance representing a Cairo fixed Array.

#### Parameters

##### content

`any`[]

JS array representing a Cairo fixed array.

##### arrayType

`string`

Cairo fixed array type.

#### Returns

`CairoFixedArray`

## Properties

### content

> `readonly` **content**: `any`[]

Defined in: [src/utils/cairoDataTypes/fixedArray.ts:7](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/fixedArray.ts#L7)

JS array representing a Cairo fixed array.

---

### arrayType

> `readonly` **arrayType**: `string`

Defined in: [src/utils/cairoDataTypes/fixedArray.ts:12](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/fixedArray.ts#L12)

Cairo fixed array type.

## Methods

### getFixedArraySize()

> `static` **getFixedArraySize**(`type`): `number`

Defined in: [src/utils/cairoDataTypes/fixedArray.ts:82](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/fixedArray.ts#L82)

Retrieves the array size from the given type string representing a Cairo fixed array.

#### Parameters

##### type

`string`

The Cairo fixed array type.

#### Returns

`number`

The array size.

#### Example

```typescript
const result = CairoFixedArray.getFixedArraySize('[core::integer::u32; 8]');
// result = 8
```

---

### getFixedArrayType()

> `static` **getFixedArrayType**(`type`): `string`

Defined in: [src/utils/cairoDataTypes/fixedArray.ts:113](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/fixedArray.ts#L113)

Retrieve the Cairo content type from a Cairo fixed array type.

#### Parameters

##### type

`string`

The type string.

#### Returns

`string`

The fixed-array type.

#### Example

```typescript
const result = CairoFixedArray.getFixedArrayType('[core::integer::u32; 8]');
// result = "core::integer::u32"
```

---

### compile()

> `static` **compile**(`input`): `Object`

Defined in: [src/utils/cairoDataTypes/fixedArray.ts:145](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/fixedArray.ts#L145)

Create an object from a Cairo fixed array.
Be sure to have an array length conform to the ABI.
To be used with CallData.compile().

#### Parameters

##### input

`any`[]

JS array representing a Cairo fixed array.

#### Returns

`Object`

a specific struct representing a fixed Array.

#### Example

```typescript
const result = CairoFixedArray.compile([10, 20, 30]);
// result = { '0': 10, '1': 20, '2': 30 }
```

---

### isTypeFixedArray()

> `static` **isTypeFixedArray**(`type`): `boolean`

Defined in: [src/utils/cairoDataTypes/fixedArray.ts:177](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/fixedArray.ts#L177)

Checks if the given Cairo type is a fixed-array type.
structure: [string; number]

#### Parameters

##### type

`string`

The type to check.

#### Returns

`boolean`

- `true` if the type is a fixed array type, `false` otherwise.

````typescript
const result = CairoFixedArray.isTypeFixedArray("[core::integer::u32; 8]");
// result = true

***

### getFixedArraySize()

> **getFixedArraySize**(): `number`

Defined in: [src/utils/cairoDataTypes/fixedArray.ts:99](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/fixedArray.ts#L99)

Retrieves the Cairo fixed array size from the CairoFixedArray instance.

#### Returns

`number`

The fixed array size.

#### Example

```typescript
const fArray = new CairoFixedArray([10,20,30], "[core::integer::u32; 3]");
const result = fArray.getFixedArraySize();
// result = 3
````

---

### getFixedArrayType()

> **getFixedArrayType**(): `string`

Defined in: [src/utils/cairoDataTypes/fixedArray.ts:129](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/fixedArray.ts#L129)

Retrieve the Cairo content type of the Cairo fixed array.

#### Returns

`string`

The fixed-array content type.

#### Example

```typescript
const fArray = new CairoFixedArray([10, 20, 30], '[core::integer::u32; 3]');
const result = fArray.getFixedArrayType();
// result = "core::integer::u32"
```

---

### compile()

> **compile**(): `Object`

Defined in: [src/utils/cairoDataTypes/fixedArray.ts:163](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/cairoDataTypes/fixedArray.ts#L163)

Generate an object from the Cairo fixed array instance.
To be used with CallData.compile().

#### Returns

`Object`

a specific struct representing a fixed array.

#### Example

```typescript
const fArray = new CairoFixedArray([10, 20, 30], '[core::integer::u32; 3]');
const result = fArray.compile();
// result = { '0': 10, '1': 20, '2': 30 }
```
