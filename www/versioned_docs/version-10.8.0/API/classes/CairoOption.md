# Class: CairoOption\<T\>

Defined in: [src/utils/calldata/enum/CairoOption.ts:21](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/calldata/enum/CairoOption.ts#L21)

Class to handle Cairo Option

## Param

CairoOptionVariant.Some or CairoOptionVariant.None

## Param

value of type T.

## Example

```typescript
const myOption = new CairoOption<BigNumberish>(CairoOptionVariant.Some, '0x54dda8');
```

## Type Parameters

### T

`T`

## Constructors

### Constructor

> **new CairoOption**\<`T`\>(`variant`, `content?`): `CairoOption`\<`T`\>

Defined in: [src/utils/calldata/enum/CairoOption.ts:26](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/calldata/enum/CairoOption.ts#L26)

#### Parameters

##### variant

`number`

##### content?

`T`

#### Returns

`CairoOption`\<`T`\>

## Properties

### Some?

> `readonly` `optional` **Some?**: `T`

Defined in: [src/utils/calldata/enum/CairoOption.ts:22](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/calldata/enum/CairoOption.ts#L22)

---

### None?

> `readonly` `optional` **None?**: `boolean`

Defined in: [src/utils/calldata/enum/CairoOption.ts:24](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/calldata/enum/CairoOption.ts#L24)

## Methods

### unwrap()

> **unwrap**(): `T` \| `undefined`

Defined in: [src/utils/calldata/enum/CairoOption.ts:49](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/calldata/enum/CairoOption.ts#L49)

#### Returns

`T` \| `undefined`

the content of the valid variant of a Cairo custom Enum.
If None, returns 'undefined'.

---

### isSome()

> **isSome**(): `boolean`

Defined in: [src/utils/calldata/enum/CairoOption.ts:57](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/calldata/enum/CairoOption.ts#L57)

#### Returns

`boolean`

true if the valid variant is 'isSome'.

---

### isNone()

> **isNone**(): `boolean`

Defined in: [src/utils/calldata/enum/CairoOption.ts:65](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/calldata/enum/CairoOption.ts#L65)

#### Returns

`boolean`

true if the valid variant is 'isNone'.
