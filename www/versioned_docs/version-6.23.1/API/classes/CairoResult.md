---
id: 'CairoResult'
title: 'Class: CairoResult<T, U>'
sidebar_label: 'CairoResult'
sidebar_position: 0
custom_edit_url: null
---

Class to handle Cairo Result

**`Param`**

CairoResultVariant.Ok or CairoResultVariant.Err

**`Param`**

value of type T or U.

**`Example`**

```typescript
const myOption = new CairoResult<BigNumberish, CustomError>(CairoResultVariant.Ok, '0x54dda8');
```

## Type parameters

| Name |
| :--- |
| `T`  |
| `U`  |

## Constructors

### constructor

• **new CairoResult**<`T`, `U`\>(`variant`, `resultContent`): [`CairoResult`](CairoResult.md)<`T`, `U`\>

#### Type parameters

| Name |
| :--- |
| `T`  |
| `U`  |

#### Parameters

| Name            | Type       |
| :-------------- | :--------- |
| `variant`       | `number`   |
| `resultContent` | `T` \| `U` |

#### Returns

[`CairoResult`](CairoResult.md)<`T`, `U`\>

#### Defined in

[src/utils/calldata/enum/CairoResult.ts:26](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/utils/calldata/enum/CairoResult.ts#L26)

## Properties

### Ok

• `Optional` `Readonly` **Ok**: `T`

#### Defined in

[src/utils/calldata/enum/CairoResult.ts:22](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/utils/calldata/enum/CairoResult.ts#L22)

---

### Err

• `Optional` `Readonly` **Err**: `U`

#### Defined in

[src/utils/calldata/enum/CairoResult.ts:24](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/utils/calldata/enum/CairoResult.ts#L24)

## Methods

### unwrap

▸ **unwrap**(): `T` \| `U`

#### Returns

`T` \| `U`

the content of the valid variant of a Cairo Result.

#### Defined in

[src/utils/calldata/enum/CairoResult.ts:43](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/utils/calldata/enum/CairoResult.ts#L43)

---

### isOk

▸ **isOk**(): `boolean`

#### Returns

`boolean`

true if the valid variant is 'Ok'.

#### Defined in

[src/utils/calldata/enum/CairoResult.ts:57](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/utils/calldata/enum/CairoResult.ts#L57)

---

### isErr

▸ **isErr**(): `boolean`

#### Returns

`boolean`

true if the valid variant is 'isErr'.

#### Defined in

[src/utils/calldata/enum/CairoResult.ts:65](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/utils/calldata/enum/CairoResult.ts#L65)
