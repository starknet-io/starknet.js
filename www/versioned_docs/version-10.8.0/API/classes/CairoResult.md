# Class: CairoResult\<T, U\>

Defined in: [src/utils/calldata/enum/CairoResult.ts:21](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/calldata/enum/CairoResult.ts#L21)

Class to handle Cairo Result

## Param

CairoResultVariant.Ok or CairoResultVariant.Err

## Param

value of type T or U.

## Example

```typescript
const myOption = new CairoResult<BigNumberish, CustomError>(CairoResultVariant.Ok, '0x54dda8');
```

## Type Parameters

### T

`T`

### U

`U`

## Constructors

### Constructor

> **new CairoResult**\<`T`, `U`\>(`variant`, `resultContent`): `CairoResult`\<`T`, `U`\>

Defined in: [src/utils/calldata/enum/CairoResult.ts:26](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/calldata/enum/CairoResult.ts#L26)

#### Parameters

##### variant

`number`

##### resultContent

`T` \| `U`

#### Returns

`CairoResult`\<`T`, `U`\>

## Properties

### Ok?

> `readonly` `optional` **Ok?**: `T`

Defined in: [src/utils/calldata/enum/CairoResult.ts:22](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/calldata/enum/CairoResult.ts#L22)

---

### Err?

> `readonly` `optional` **Err?**: `U`

Defined in: [src/utils/calldata/enum/CairoResult.ts:24](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/calldata/enum/CairoResult.ts#L24)

## Methods

### unwrap()

> **unwrap**(): `T` \| `U`

Defined in: [src/utils/calldata/enum/CairoResult.ts:43](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/calldata/enum/CairoResult.ts#L43)

#### Returns

`T` \| `U`

the content of the valid variant of a Cairo Result.

---

### isOk()

> **isOk**(): `boolean`

Defined in: [src/utils/calldata/enum/CairoResult.ts:57](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/calldata/enum/CairoResult.ts#L57)

#### Returns

`boolean`

true if the valid variant is 'Ok'.

---

### isErr()

> **isErr**(): `boolean`

Defined in: [src/utils/calldata/enum/CairoResult.ts:65](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/calldata/enum/CairoResult.ts#L65)

#### Returns

`boolean`

true if the valid variant is 'isErr'.
