# Interface: Program

Defined in: [src/types/lib/contract/legacy.ts:37](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/types/lib/contract/legacy.ts#L37)

## Properties

### builtins

> **builtins**: `string`[]

Defined in: [src/types/lib/contract/legacy.ts:38](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/types/lib/contract/legacy.ts#L38)

---

### data

> **data**: `string`[]

Defined in: [src/types/lib/contract/legacy.ts:39](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/types/lib/contract/legacy.ts#L39)

---

### hints

> **hints**: `Record`\<`string`, [`Hint`](../type-aliases/Hint.md)[]\>

Defined in: [src/types/lib/contract/legacy.ts:40](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/types/lib/contract/legacy.ts#L40)

---

### prime

> **prime**: `string`

Defined in: [src/types/lib/contract/legacy.ts:41](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/types/lib/contract/legacy.ts#L41)

---

### attributes?

> `optional` **attributes?**: `object`[]

Defined in: [src/types/lib/contract/legacy.ts:42](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/types/lib/contract/legacy.ts#L42)

#### accessible_scopes?

> `optional` **accessible_scopes?**: `string`[]

#### end_pc?

> `optional` **end_pc?**: `number`

#### flow_tracking_data?

> `optional` **flow_tracking_data?**: `object`

##### flow_tracking_data.ap_tracking?

> `optional` **ap_tracking?**: `object`

##### flow_tracking_data.ap_tracking.group?

> `optional` **group?**: `number`

##### flow_tracking_data.ap_tracking.offset?

> `optional` **offset?**: `number`

##### flow_tracking_data.reference_ids?

> `optional` **reference_ids?**: `Record`\<`string`, `number`\>

#### name?

> `optional` **name?**: `string`

#### start_pc?

> `optional` **start_pc?**: `number`

#### value?

> `optional` **value?**: `string` \| `number`

---

### compiler_version?

> `optional` **compiler_version?**: `string`

Defined in: [src/types/lib/contract/legacy.ts:56](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/types/lib/contract/legacy.ts#L56)

---

### main_scope?

> `optional` **main_scope?**: `string`

Defined in: [src/types/lib/contract/legacy.ts:57](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/types/lib/contract/legacy.ts#L57)

---

### identifiers?

> `optional` **identifiers?**: `Record`\<`string`, \{ `destination`: `string`; `type`: `"alias"`; \} \| \{ `decorators`: `string`[]; `pc`: `number`; `type`: `"function"`; `implicit_args?`: \{ `full_name`: `string`; `members`: `Record`\<`string`, \{ `cairo_type`: `string`; `offset`: `number`; \}\>; `size`: `number`; `type`: `"struct"`; \}; `explicit_args?`: \{ `full_name`: `string`; `members`: `Record`\<`string`, \{ `cairo_type`: `string`; `offset`: `number`; \}\>; `size`: `number`; `type`: `"struct"`; \}; `return_type?`: \{ `cairo_type`: `string`; `type`: `"type_definition"`; \}; \} \| \{ `full_name`: `string`; `members`: `Record`\<`string`, \{ `cairo_type`: `string`; `offset`: `number`; \}\> \| `Record`\<`string`, `never`\>; `size`: `number`; `type`: `"struct"`; \} \| \{ `cairo_type`: `string`; `type`: `"type_definition"`; \} \| \{ `type`: `"namespace"`; \} \| \{ `type`: `"const"`; `value`: `string` \| `number`; \} \| \{ `pc`: `number`; `type`: `"label"`; \} \| \{ `cairo_type`: `string`; `full_name`: `string`; `references`: `object`[]; `type`: `"reference"`; \}\>

Defined in: [src/types/lib/contract/legacy.ts:58](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/types/lib/contract/legacy.ts#L58)

---

### reference_manager?

> `optional` **reference_manager?**: `Record`\<`string`, \{ `references`: `unknown`[]; \}\>

Defined in: [src/types/lib/contract/legacy.ts:140](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/types/lib/contract/legacy.ts#L140)

---

### debug_info?

> `optional` **debug_info?**: `Record`\<`string`, \{ `file_contents?`: `Record`\<`string`, `string`\>; `instruction_locations?`: `Record`\<`string`, `unknown`[]\>; \}\>

Defined in: [src/types/lib/contract/legacy.ts:146](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/types/lib/contract/legacy.ts#L146)
