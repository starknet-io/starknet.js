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

Convert JSON string to JSON object

NOTE: the String() wrapping is used so the behavior conforms to JSON.parse()
which can accept simple data types but is not represented in the default typing

#### Parameters

| Name | Type     | Description |
| :--- | :------- | :---------- |
| `x`  | `string` | JSON string |

#### Returns

`any`

#### Defined in

[src/utils/json.ts:21](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/utils/json.ts#L21)

---

### parseAlwaysAsBig

▸ **parseAlwaysAsBig**(`x`): `any`

Convert JSON string to JSON object with all numbers as bigint

#### Parameters

| Name | Type     | Description |
| :--- | :------- | :---------- |
| `x`  | `string` | JSON string |

#### Returns

`any`

#### Defined in

[src/utils/json.ts:27](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/utils/json.ts#L27)

---

### stringify

▸ **stringify**(`value`, `replacer?`, `space?`, `numberStringifiers?`): `string`

Convert JSON object to JSON string

NOTE: the not-null assertion is used so the return type conforms to JSON.stringify()
which can also return undefined but is not represented in the default typing

#### Parameters

| Name                  | Type                  |
| :-------------------- | :-------------------- |
| `value`               | `unknown`             |
| `replacer?`           | `any`                 |
| `space?`              | `string` \| `number`  |
| `numberStringifiers?` | `NumberStringifier`[] |

#### Returns

`string`

JSON string

#### Defined in

[src/utils/json.ts:37](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/utils/json.ts#L37)

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

[src/utils/json.ts:37](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/utils/json.ts#L37)
