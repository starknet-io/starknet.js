---
id: 'BatchClient'
title: 'Class: BatchClient'
sidebar_label: 'BatchClient'
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new BatchClient**(`options`): [`BatchClient`](BatchClient.md)

#### Parameters

| Name      | Type                                                     |
| :-------- | :------------------------------------------------------- |
| `options` | [`BatchClientOptions`](../modules.md#batchclientoptions) |

#### Returns

[`BatchClient`](BatchClient.md)

#### Defined in

[src/utils/batch/index.ts:33](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/utils/batch/index.ts#L33)

## Properties

### nodeUrl

• **nodeUrl**: `string`

#### Defined in

[src/utils/batch/index.ts:13](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/utils/batch/index.ts#L13)

---

### headers

• **headers**: `object`

#### Defined in

[src/utils/batch/index.ts:15](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/utils/batch/index.ts#L15)

---

### interval

• **interval**: `number`

#### Defined in

[src/utils/batch/index.ts:17](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/utils/batch/index.ts#L17)

---

### requestId

• **requestId**: `number` = `0`

#### Defined in

[src/utils/batch/index.ts:19](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/utils/batch/index.ts#L19)

---

### pendingRequests

• `Private` **pendingRequests**: `Record`<`string` \| `number`, [`RequestBody`](../namespaces/types.RPC.JRPC.md#requestbody)\> = `{}`

#### Defined in

[src/utils/batch/index.ts:21](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/utils/batch/index.ts#L21)

---

### batchPromises

• `Private` **batchPromises**: `Record`<`string` \| `number`, `Promise`<[`ResponseBody`](../namespaces/types.RPC.JRPC.md#responsebody)[]\>\> = `{}`

#### Defined in

[src/utils/batch/index.ts:23](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/utils/batch/index.ts#L23)

---

### delayTimer

• `Private` `Optional` **delayTimer**: `Timeout`

#### Defined in

[src/utils/batch/index.ts:25](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/utils/batch/index.ts#L25)

---

### delayPromise

• `Private` `Optional` **delayPromise**: `Promise`<`void`\>

#### Defined in

[src/utils/batch/index.ts:27](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/utils/batch/index.ts#L27)

---

### delayPromiseResolve

• `Private` `Optional` **delayPromiseResolve**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

[src/utils/batch/index.ts:29](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/utils/batch/index.ts#L29)

---

### baseFetch

• `Private` **baseFetch**: (`input`: `RequestInfo` \| `URL`, `init?`: `RequestInit`) => `Promise`<`Response`\>

#### Type declaration

▸ (`input`, `init?`): `Promise`<`Response`\>

##### Parameters

| Name    | Type                   |
| :------ | :--------------------- |
| `input` | `RequestInfo` \| `URL` |
| `init?` | `RequestInit`          |

##### Returns

`Promise`<`Response`\>

#### Defined in

[src/utils/batch/index.ts:31](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/utils/batch/index.ts#L31)

## Methods

### wait

▸ **wait**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[src/utils/batch/index.ts:40](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/utils/batch/index.ts#L40)

---

### addPendingRequest

▸ **addPendingRequest**<`T`\>(`method`, `params?`, `id?`): `string` \| `number`

#### Type parameters

| Name | Type                                                                        |
| :--- | :-------------------------------------------------------------------------- |
| `T`  | extends keyof `ReadMethods` \| keyof `WriteMethods` \| keyof `TraceMethods` |

#### Parameters

| Name      | Type                                                                             |
| :-------- | :------------------------------------------------------------------------------- |
| `method`  | `T`                                                                              |
| `params?` | [`Methods`](../namespaces/types.RPC.RPCSPEC08.API.md#methods)[`T`][``"params"``] |
| `id?`     | `string` \| `number`                                                             |

#### Returns

`string` \| `number`

#### Defined in

[src/utils/batch/index.ts:66](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/utils/batch/index.ts#L66)

---

### sendBatch

▸ **sendBatch**(`requests`): `Promise`<`any`\>

#### Parameters

| Name       | Type                                                           |
| :--------- | :------------------------------------------------------------- |
| `requests` | [`RequestBody`](../namespaces/types.RPC.JRPC.md#requestbody)[] |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/utils/batch/index.ts:83](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/utils/batch/index.ts#L83)

---

### fetch

▸ **fetch**<`T`, `TResponse`\>(`method`, `params?`, `id?`): `Promise`<`TResponse`\>

Automatically batches and fetches JSON-RPC calls in a single request.

#### Type parameters

| Name        | Type                                                                        |
| :---------- | :-------------------------------------------------------------------------- |
| `T`         | extends keyof `ReadMethods` \| keyof `WriteMethods` \| keyof `TraceMethods` |
| `TResponse` | extends `Object`                                                            |

#### Parameters

| Name      | Type                                                                             | Description         |
| :-------- | :------------------------------------------------------------------------------- | :------------------ |
| `method`  | `T`                                                                              | Method to call      |
| `params?` | [`Methods`](../namespaces/types.RPC.RPCSPEC08.API.md#methods)[`T`][``"params"``] | Method parameters   |
| `id?`     | `string` \| `number`                                                             | JSON-RPC Request ID |

#### Returns

`Promise`<`TResponse`\>

JSON-RPC Response

#### Defined in

[src/utils/batch/index.ts:100](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/utils/batch/index.ts#L100)
