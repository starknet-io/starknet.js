---
id: 'types.Program'
title: 'Interface: Program'
sidebar_label: 'Program'
custom_edit_url: null
---

[types](../namespaces/types.md).Program

## Properties

### builtins

• **builtins**: `string`[]

#### Defined in

[src/types/lib/contract/legacy.ts:38](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/types/lib/contract/legacy.ts#L38)

---

### data

• **data**: `string`[]

#### Defined in

[src/types/lib/contract/legacy.ts:39](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/types/lib/contract/legacy.ts#L39)

---

### hints

• **hints**: `Record`<`string`, [`Hint`](../namespaces/types.md#hint)[]\>

#### Defined in

[src/types/lib/contract/legacy.ts:40](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/types/lib/contract/legacy.ts#L40)

---

### prime

• **prime**: `string`

#### Defined in

[src/types/lib/contract/legacy.ts:41](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/types/lib/contract/legacy.ts#L41)

---

### attributes

• `Optional` **attributes**: \{ `accessible_scopes?`: `string`[] ; `end_pc?`: `number` ; `flow_tracking_data?`: \{ `ap_tracking?`: \{ `group?`: `number` ; `offset?`: `number` } ; `reference_ids?`: `Record`<`string`, `number`\> } ; `name?`: `string` ; `start_pc?`: `number` ; `value?`: `string` \| `number` }[]

#### Defined in

[src/types/lib/contract/legacy.ts:42](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/types/lib/contract/legacy.ts#L42)

---

### compiler_version

• `Optional` **compiler_version**: `string`

#### Defined in

[src/types/lib/contract/legacy.ts:56](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/types/lib/contract/legacy.ts#L56)

---

### main_scope

• `Optional` **main_scope**: `string`

#### Defined in

[src/types/lib/contract/legacy.ts:57](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/types/lib/contract/legacy.ts#L57)

---

### identifiers

• `Optional` **identifiers**: `Record`<`string`, \{ `destination`: `string` ; `type`: `"alias"` } \| \{ `decorators`: `string`[] ; `pc`: `number` ; `type`: `"function"` ; `implicit_args?`: \{ `full_name`: `string` ; `members`: `Record`<`string`, \{ `cairo_type`: `string` ; `offset`: `number` }\> ; `size`: `number` ; `type`: `"struct"` } ; `explicit_args?`: \{ `full_name`: `string` ; `members`: `Record`<`string`, \{ `cairo_type`: `string` ; `offset`: `number` }\> ; `size`: `number` ; `type`: `"struct"` } ; `return_type?`: \{ `cairo_type`: `string` ; `type`: `"type_definition"` } } \| \{ `full_name`: `string` ; `members`: `Record`<`string`, \{ `cairo_type`: `string` ; `offset`: `number` }\> \| `Record`<`string`, `never`\> ; `size`: `number` ; `type`: `"struct"` } \| \{ `cairo_type`: `string` ; `type`: `"type_definition"` } \| \{ `type`: `"namespace"` } \| \{ `type`: `"const"` ; `value`: `string` \| `number` } \| \{ `pc`: `number` ; `type`: `"label"` } \| \{ `cairo_type`: `string` ; `full_name`: `string` ; `references`: \{ `ap_tracking_data`: \{ `group`: `number` ; `offset`: `number` } ; `pc`: `number` ; `value`: `string` }[] ; `type`: `"reference"` }\>

#### Defined in

[src/types/lib/contract/legacy.ts:58](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/types/lib/contract/legacy.ts#L58)

---

### reference_manager

• `Optional` **reference_manager**: `Record`<`string`, \{ `references`: `unknown`[] }\>

#### Defined in

[src/types/lib/contract/legacy.ts:140](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/types/lib/contract/legacy.ts#L140)

---

### debug_info

• `Optional` **debug_info**: `Record`<`string`, \{ `file_contents?`: `Record`<`string`, `string`\> ; `instruction_locations?`: `Record`<`string`, `unknown`[]\> }\>

#### Defined in

[src/types/lib/contract/legacy.ts:146](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/types/lib/contract/legacy.ts#L146)
