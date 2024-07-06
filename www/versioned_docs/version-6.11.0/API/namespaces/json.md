---
id: 'json'
title: 'Namespace: json'
sidebar_label: 'json'
sidebar_position: 0
custom_edit_url: null
---

## Functions

### parse

▸ **parse**(`str`): `any`

Convert JSON string to JSON object

NOTE: the String() wrapping is used so the behavior conforms to JSON.parse()
which can accept simple data types but is not represented in the default typing

#### Parameters

| Name  | Type     | Description |
| :---- | :------- | :---------- |
| `str` | `string` | JSON string |

#### Returns

`any`

Parsed json object

**`Example`**

```typescript
const str = '[123, 12.3, 11223344556677889900]';
const result = parse(str);
// result = [123, 12.3, 11223344556677890048n]
```

#### Defined in

[src/utils/json.ts:27](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/json.ts#L27)

---

### parseAlwaysAsBig

▸ **parseAlwaysAsBig**(`str`): `any`

Convert JSON string to JSON object with all numbers as bigint

#### Parameters

| Name  | Type     | Description |
| :---- | :------- | :---------- |
| `str` | `string` | JSON string |

#### Returns

`any`

Parsed json object

**`Example`**

```typescript
const str = '[123, 12.3, 1234567890]';
const result = parseAlwaysAsBig(str);
// result = [123n, 12.3, 1234567890n]
```

#### Defined in

[src/utils/json.ts:41](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/json.ts#L41)

---

### stringify

▸ **stringify**(`value`, `replacer?`, `space?`, `numberStringifiers?`): `string`

Convert JSON object to JSON string

NOTE: the not-null assertion is used so the return type conforms to JSON.stringify()
which can also return undefined but is not represented in the default typing

#### Parameters

| Name                  | Type                  | Description                                                                                       |
| :-------------------- | :-------------------- | :------------------------------------------------------------------------------------------------ |
| `value`               | `unknown`             | JSON object                                                                                       |
| `replacer?`           | `any`                 | Function that alters the behavior of the stringification process                                  |
| `space?`              | `string` \| `number`  | Used to insert white space into the output JSON string                                            |
| `numberStringifiers?` | `NumberStringifier`[] | Function used to stringify numbers (returning undefined will delete the property from the object) |

#### Returns

`string`

JSON string

**`Example`**

```typescript
const value = [123, 12.3, 1234567890];
const result = stringify(value);
// result = '[123,12.3,1234567890]'
```

#### Defined in

[src/utils/json.ts:62](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/json.ts#L62)

---

### stringifyAlwaysAsBig

▸ **stringifyAlwaysAsBig**(`value`, `replacer?`, `space?`, `numberStringifiers?`): `string`

#### Parameters

| Name                  | Type                  |
| :-------------------- | :-------------------- |
| `value`               | `unknown`             |
| `replacer?`           | `any`                 |
| `space?`              | `string` \| `number`  |
| `numberStringifiers?` | `NumberStringifier`[] |

#### Returns

`string`

**`Deprecated`**

equivalent to 'stringify', alias will be removed

#### Defined in

[src/utils/json.ts:62](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/json.ts#L62)
