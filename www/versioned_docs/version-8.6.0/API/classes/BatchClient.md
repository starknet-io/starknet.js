---
id: 'BatchClient'
title: 'Class: BatchClient<T>'
sidebar_label: 'BatchClient'
sidebar_position: 0
custom_edit_url: null
---

## Type parameters

| Name | Type             |
| :--- | :--------------- |
| `T`  | extends `Object` |

## Constructors

### constructor

• **new BatchClient**<`T`\>(`options`): [`BatchClient`](BatchClient.md)<`T`\>

#### Type parameters

| Name | Type             |
| :--- | :--------------- |
| `T`  | extends `Object` |

#### Parameters

| Name      | Type                                                           |
| :-------- | :------------------------------------------------------------- |
| `options` | [`BatchClientOptions`](../modules.md#batchclientoptions)<`T`\> |

#### Returns

[`BatchClient`](BatchClient.md)<`T`\>

#### Defined in

[src/utils/batch/index.ts:36](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/batch/index.ts#L36)

## Properties

### nodeUrl

• **nodeUrl**: `string`

#### Defined in

[src/utils/batch/index.ts:14](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/batch/index.ts#L14)

---

### headers

• **headers**: `object`

#### Defined in

[src/utils/batch/index.ts:16](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/batch/index.ts#L16)

---

### interval

• **interval**: `number`

#### Defined in

[src/utils/batch/index.ts:18](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/batch/index.ts#L18)

---

### requestId

• **requestId**: `number` = `0`

#### Defined in

[src/utils/batch/index.ts:20](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/batch/index.ts#L20)

---

### pendingRequests

• `Private` **pendingRequests**: `Record`<`string` \| `number`, [`RequestBody`](../namespaces/RPC.JRPC.md#requestbody)\> = `{}`

#### Defined in

[src/utils/batch/index.ts:22](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/batch/index.ts#L22)

---

### batchPromises

• `Private` **batchPromises**: `Record`<`string` \| `number`, `Promise`<[`ResponseBody`](../namespaces/RPC.JRPC.md#responsebody)[]\>\> = `{}`

#### Defined in

[src/utils/batch/index.ts:24](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/batch/index.ts#L24)

---

### delayTimer

• `Private` `Optional` **delayTimer**: `Timeout`

#### Defined in

[src/utils/batch/index.ts:26](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/batch/index.ts#L26)

---

### delayPromise

• `Private` `Optional` **delayPromise**: `Promise`<`void`\>

#### Defined in

[src/utils/batch/index.ts:28](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/batch/index.ts#L28)

---

### delayPromiseResolve

• `Private` `Optional` **delayPromiseResolve**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

[src/utils/batch/index.ts:30](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/batch/index.ts#L30)

---

### baseFetch

• `Private` **baseFetch**: (`input`: `RequestInfo` \| `URL`, `init?`: `RequestInit`) => `Promise`<`Response`\>

#### Type declaration

▸ (`input`, `init?`): `Promise`<`Response`\>

[MDN Reference](https://developer.mozilla.org/docs/Web/API/fetch)

##### Parameters

| Name    | Type                   |
| :------ | :--------------------- |
| `input` | `RequestInfo` \| `URL` |
| `init?` | `RequestInit`          |

##### Returns

`Promise`<`Response`\>

#### Defined in

[src/utils/batch/index.ts:32](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/batch/index.ts#L32)

---

### rpcMethods

• `Private` **rpcMethods**: `T`

#### Defined in

[src/utils/batch/index.ts:34](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/batch/index.ts#L34)

## Methods

### wait

▸ **wait**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[src/utils/batch/index.ts:44](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/batch/index.ts#L44)

---

### addPendingRequest

▸ **addPendingRequest**<`M`\>(`method`, `params?`, `id?`): `string` \| `number`

#### Type parameters

| Name | Type                                     |
| :--- | :--------------------------------------- |
| `M`  | extends `string` \| `number` \| `symbol` |

#### Parameters

| Name      | Type                   |
| :-------- | :--------------------- |
| `method`  | `M`                    |
| `params?` | `T`[`M`][``"params"``] |
| `id?`     | `string` \| `number`   |

#### Returns

`string` \| `number`

#### Defined in

[src/utils/batch/index.ts:70](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/batch/index.ts#L70)

---

### sendBatch

▸ **sendBatch**(`requests`): `Promise`<`any`\>

#### Parameters

| Name       | Type                                                     |
| :--------- | :------------------------------------------------------- |
| `requests` | [`RequestBody`](../namespaces/RPC.JRPC.md#requestbody)[] |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/utils/batch/index.ts:87](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/batch/index.ts#L87)

---

### fetch

▸ **fetch**<`M`, `TResponse`\>(`method`, `params?`, `id?`): `Promise`<`TResponse`\>

Automatically batches and fetches JSON-RPC calls in a single request.

#### Type parameters

| Name        | Type                                                                                                                                                             |
| :---------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `M`         | extends `string` \| `number` \| `symbol`                                                                                                                         |
| `TResponse` | extends [`ResponseBody`](../namespaces/RPC.JRPC.md#responsebody) & \{ `result?`: `T`[`M`][``"result"``] ; `error?`: [`Error`](../namespaces/RPC.JRPC.md#error) } |

#### Parameters

| Name      | Type                   | Description         |
| :-------- | :--------------------- | :------------------ |
| `method`  | `M`                    | Method to call      |
| `params?` | `T`[`M`][``"params"``] | Method parameters   |
| `id?`     | `string` \| `number`   | JSON-RPC Request ID |

#### Returns

`Promise`<`TResponse`\>

JSON-RPC Response

#### Defined in

[src/utils/batch/index.ts:104](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/batch/index.ts#L104)
