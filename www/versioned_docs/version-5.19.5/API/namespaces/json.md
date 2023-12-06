---
id: 'json'
title: 'Namespace: json'
sidebar_label: 'json'
sidebar_position: 0
custom_edit_url: null
---

## Functions

### parse

▸ **parse**(`x`): `any`

#### Parameters

| Name | Type     |
| :--- | :------- |
| `x`  | `string` |

#### Returns

`any`

#### Defined in

[src/utils/json.ts:12](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/utils/json.ts#L12)

---

### parseAlwaysAsBig

▸ **parseAlwaysAsBig**(`x`): `any`

#### Parameters

| Name | Type     |
| :--- | :------- |
| `x`  | `string` |

#### Returns

`any`

#### Defined in

[src/utils/json.ts:13](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/utils/json.ts#L13)

---

### stringify

▸ **stringify**(`value`, `replacer?`, `space?`, `numberStringifiers?`): `string`

#### Parameters

| Name                  | Type                  |
| :-------------------- | :-------------------- |
| `value`               | `unknown`             |
| `replacer?`           | `any`                 |
| `space?`              | `string` \| `number`  |
| `numberStringifiers?` | `NumberStringifier`[] |

#### Returns

`string`

#### Defined in

[src/utils/json.ts:18](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/utils/json.ts#L18)

---

### stringifyAlwaysAsBig

▸ **stringifyAlwaysAsBig**(`value`, `replacer?`, `space?`, `numberStringifiers?`): `string`

**`Deprecated`**

equivalent to 'stringify', alias will be removed

#### Parameters

| Name                  | Type                  |
| :-------------------- | :-------------------- |
| `value`               | `unknown`             |
| `replacer?`           | `any`                 |
| `space?`              | `string` \| `number`  |
| `numberStringifiers?` | `NumberStringifier`[] |

#### Returns

`string`

#### Defined in

[src/utils/json.ts:18](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/utils/json.ts#L18)
