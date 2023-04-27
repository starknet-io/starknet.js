---
id: 'json'
title: 'Namespace: json'
sidebar_label: 'json'
sidebar_position: 0
custom_edit_url: null
---

## Functions

### parse

▸ **parse**(`text`, `reviver?`): `any`

Converts a JavaScript Object Notation (JSON) string into an object.

#### Parameters

| Name       | Type                                                      | Description                                                                                                                                                                                         |
| :--------- | :-------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `text`     | `string`                                                  | A valid JSON string.                                                                                                                                                                                |
| `reviver?` | (`this`: `any`, `key`: `string`, `value`: `any`) => `any` | A function that transforms the results. This function is called for each member of the object. If a member contains nested objects, the nested objects are transformed before the parent object is. |

#### Returns

`any`

#### Defined in

www/node_modules/typescript/lib/lib.es5.d.ts:1139

---

### stringify

▸ **stringify**(`value`, `replacer?`, `space?`): `string`

Converts a JavaScript value to a JavaScript Object Notation (JSON) string.

#### Parameters

| Name        | Type                                                      | Description                                                                                                       |
| :---------- | :-------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------- |
| `value`     | `any`                                                     | A JavaScript value, usually an object or array, to be converted.                                                  |
| `replacer?` | (`this`: `any`, `key`: `string`, `value`: `any`) => `any` | A function that transforms the results.                                                                           |
| `space?`    | `string` \| `number`                                      | Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read. |

#### Returns

`string`

#### Defined in

www/node_modules/typescript/lib/lib.es5.d.ts:1146

▸ **stringify**(`value`, `replacer?`, `space?`): `string`

Converts a JavaScript value to a JavaScript Object Notation (JSON) string.

#### Parameters

| Name        | Type                               | Description                                                                                                                 |
| :---------- | :--------------------------------- | :-------------------------------------------------------------------------------------------------------------------------- |
| `value`     | `any`                              | A JavaScript value, usually an object or array, to be converted.                                                            |
| `replacer?` | `null` \| (`string` \| `number`)[] | An array of strings and numbers that acts as an approved list for selecting the object properties that will be stringified. |
| `space?`    | `string` \| `number`               | Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read.           |

#### Returns

`string`

#### Defined in

www/node_modules/typescript/lib/lib.es5.d.ts:1153

---

### parseAlwaysAsBig

▸ **parseAlwaysAsBig**(`text`, `reviver?`): `any`

Converts a JavaScript Object Notation (JSON) string into an object.

#### Parameters

| Name       | Type                                                      | Description                                                                                                                                                                                         |
| :--------- | :-------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `text`     | `string`                                                  | A valid JSON string.                                                                                                                                                                                |
| `reviver?` | (`this`: `any`, `key`: `string`, `value`: `any`) => `any` | A function that transforms the results. This function is called for each member of the object. If a member contains nested objects, the nested objects are transformed before the parent object is. |

#### Returns

`any`

#### Defined in

www/node_modules/typescript/lib/lib.es5.d.ts:1139

---

### stringifyAlwaysAsBig

▸ **stringifyAlwaysAsBig**(`value`, `replacer?`, `space?`): `string`

Converts a JavaScript value to a JavaScript Object Notation (JSON) string.

#### Parameters

| Name        | Type                                                      | Description                                                                                                       |
| :---------- | :-------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------- |
| `value`     | `any`                                                     | A JavaScript value, usually an object or array, to be converted.                                                  |
| `replacer?` | (`this`: `any`, `key`: `string`, `value`: `any`) => `any` | A function that transforms the results.                                                                           |
| `space?`    | `string` \| `number`                                      | Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read. |

#### Returns

`string`

#### Defined in

www/node_modules/typescript/lib/lib.es5.d.ts:1146

▸ **stringifyAlwaysAsBig**(`value`, `replacer?`, `space?`): `string`

Converts a JavaScript value to a JavaScript Object Notation (JSON) string.

#### Parameters

| Name        | Type                               | Description                                                                                                                 |
| :---------- | :--------------------------------- | :-------------------------------------------------------------------------------------------------------------------------- |
| `value`     | `any`                              | A JavaScript value, usually an object or array, to be converted.                                                            |
| `replacer?` | `null` \| (`string` \| `number`)[] | An array of strings and numbers that acts as an approved list for selecting the object properties that will be stringified. |
| `space?`    | `string` \| `number`               | Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read.           |

#### Returns

`string`

#### Defined in

www/node_modules/typescript/lib/lib.es5.d.ts:1153
