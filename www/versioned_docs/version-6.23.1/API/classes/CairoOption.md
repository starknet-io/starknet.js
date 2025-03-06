---
id: 'CairoOption'
title: 'Class: CairoOption<T>'
sidebar_label: 'CairoOption'
sidebar_position: 0
custom_edit_url: null
---

Class to handle Cairo Option

**`Param`**

CairoOptionVariant.Some or CairoOptionVariant.None

**`Param`**

value of type T.

**`Example`**

```typescript
const myOption = new CairoOption<BigNumberish>(CairoOptionVariant.Some, '0x54dda8');
```

## Type parameters

| Name |
| :--- |
| `T`  |

## Constructors

### constructor

• **new CairoOption**<`T`\>(`variant`, `content?`): [`CairoOption`](CairoOption.md)<`T`\>

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name       | Type     |
| :--------- | :------- |
| `variant`  | `number` |
| `content?` | `T`      |

#### Returns

[`CairoOption`](CairoOption.md)<`T`\>

#### Defined in

[src/utils/calldata/enum/CairoOption.ts:26](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/utils/calldata/enum/CairoOption.ts#L26)

## Properties

### Some

• `Optional` `Readonly` **Some**: `T`

#### Defined in

[src/utils/calldata/enum/CairoOption.ts:22](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/utils/calldata/enum/CairoOption.ts#L22)

---

### None

• `Optional` `Readonly` **None**: `boolean`

#### Defined in

[src/utils/calldata/enum/CairoOption.ts:24](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/utils/calldata/enum/CairoOption.ts#L24)

## Methods

### unwrap

▸ **unwrap**(): `undefined` \| `T`

#### Returns

`undefined` \| `T`

the content of the valid variant of a Cairo custom Enum.
If None, returns 'undefined'.

#### Defined in

[src/utils/calldata/enum/CairoOption.ts:49](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/utils/calldata/enum/CairoOption.ts#L49)

---

### isSome

▸ **isSome**(): `boolean`

#### Returns

`boolean`

true if the valid variant is 'isSome'.

#### Defined in

[src/utils/calldata/enum/CairoOption.ts:57](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/utils/calldata/enum/CairoOption.ts#L57)

---

### isNone

▸ **isNone**(): `boolean`

#### Returns

`boolean`

true if the valid variant is 'isNone'.

#### Defined in

[src/utils/calldata/enum/CairoOption.ts:65](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/utils/calldata/enum/CairoOption.ts#L65)
