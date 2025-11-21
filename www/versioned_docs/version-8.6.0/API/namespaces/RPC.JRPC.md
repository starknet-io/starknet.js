---
id: 'RPC.JRPC'
title: 'Namespace: JRPC'
sidebar_label: 'JRPC'
custom_edit_url: null
---

[RPC](RPC.md).JRPC

## Type Aliases

### RequestBody

Ƭ **RequestBody**: `Object`

#### Type declaration

| Name      | Type                 |
| :-------- | :------------------- |
| `id`      | `number` \| `string` |
| `jsonrpc` | `"2.0"`              |
| `method`  | `string`             |
| `params?` | {}                   |

#### Defined in

[src/types/api/jsonrpc.ts:1](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/types/api/jsonrpc.ts#L1)

---

### ResponseBody

Ƭ **ResponseBody**: \{ `id`: `number` \| `string` ; `jsonrpc`: `"2.0"` } & [`SuccessResponseBody`](RPC.JRPC.md#successresponsebody) \| [`ErrorResponseBody`](RPC.JRPC.md#errorresponsebody)

#### Defined in

[src/types/api/jsonrpc.ts:8](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/types/api/jsonrpc.ts#L8)

---

### SuccessResponseBody

Ƭ **SuccessResponseBody**: `Object`

#### Type declaration

| Name     | Type      |
| :------- | :-------- |
| `result` | `unknown` |

#### Defined in

[src/types/api/jsonrpc.ts:13](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/types/api/jsonrpc.ts#L13)

---

### ErrorResponseBody

Ƭ **ErrorResponseBody**: `Object`

#### Type declaration

| Name    | Type                         |
| :------ | :--------------------------- |
| `error` | [`Error`](RPC.JRPC.md#error) |

#### Defined in

[src/types/api/jsonrpc.ts:17](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/types/api/jsonrpc.ts#L17)

---

### Error

Ƭ **Error**: `Object`

#### Type declaration

| Name      | Type      |
| :-------- | :-------- |
| `code`    | `number`  |
| `message` | `string`  |
| `data?`   | `unknown` |

#### Defined in

[src/types/api/jsonrpc.ts:21](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/types/api/jsonrpc.ts#L21)

---

### WebSocketEvent

Ƭ **WebSocketEvent**: `Omit`<[`RequestBody`](RPC.JRPC.md#requestbody), `"id"`\> & \{ `params`: {} }

#### Defined in

[src/types/api/jsonrpc.ts:27](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/types/api/jsonrpc.ts#L27)
