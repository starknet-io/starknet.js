# Class: CairoCustomEnum

Defined in: [src/utils/calldata/enum/CairoCustomEnum.ts:16](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/calldata/enum/CairoCustomEnum.ts#L16)

Class to handle Cairo custom Enum

## Param

object containing the variants and its content. Example :
{Success: 234, Warning: undefined, Error: undefined}.
Only one variant with a value, object, array.

## Example

```typescript
const myCairoEnum = new CairoCustomEnum({
  Success: undefined,
  Warning: '0x7f32ea',
  Error: undefined,
});
```

## Constructors

### Constructor

> **new CairoCustomEnum**(`enumContent`): `CairoCustomEnum`

Defined in: [src/utils/calldata/enum/CairoCustomEnum.ts:29](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/calldata/enum/CairoCustomEnum.ts#L29)

#### Parameters

##### enumContent

[`CairoEnumRaw`](../type-aliases/CairoEnumRaw.md)

an object with the variants as keys and the content as value. Only one content shall be defined.

#### Returns

`CairoCustomEnum`

## Properties

### variant

> `readonly` **variant**: [`CairoEnumRaw`](../type-aliases/CairoEnumRaw.md)

Defined in: [src/utils/calldata/enum/CairoCustomEnum.ts:24](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/calldata/enum/CairoCustomEnum.ts#L24)

direct readonly access to variants of the Cairo Custom Enum.

#### Returns

a value of type any

#### Example

```typescript
const successValue = myCairoEnum.variant.Success;

## Methods

### unwrap()

> **unwrap**(): `any`

Defined in: [src/utils/calldata/enum/CairoCustomEnum.ts:45](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/calldata/enum/CairoCustomEnum.ts#L45)

#### Returns

`any`

the content of the valid variant of a Cairo custom Enum.

***

### activeVariant()

> **activeVariant**(): `string`

Defined in: [src/utils/calldata/enum/CairoCustomEnum.ts:54](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/calldata/enum/CairoCustomEnum.ts#L54)

#### Returns

`string`

the name of the valid variant of a Cairo custom Enum.
```
