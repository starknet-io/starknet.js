# Class: BatchClient\<T\>

Defined in: [src/utils/batch/index.ts:13](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/batch/index.ts#L13)

## Type Parameters

### T

`T` _extends_ `object`

## Constructors

### Constructor

> **new BatchClient**\<`T`\>(`options`): `BatchClient`\<`T`\>

Defined in: [src/utils/batch/index.ts:36](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/batch/index.ts#L36)

#### Parameters

##### options

[`BatchClientOptions`](../type-aliases/BatchClientOptions.md)\<`T`\>

#### Returns

`BatchClient`\<`T`\>

## Properties

### nodeUrl

> **nodeUrl**: `string`

Defined in: [src/utils/batch/index.ts:14](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/batch/index.ts#L14)

---

### headers

> **headers**: `object`

Defined in: [src/utils/batch/index.ts:16](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/batch/index.ts#L16)

---

### interval

> **interval**: `number`

Defined in: [src/utils/batch/index.ts:18](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/batch/index.ts#L18)

---

### requestId

> **requestId**: `number` = `0`

Defined in: [src/utils/batch/index.ts:20](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/batch/index.ts#L20)

## Methods

### fetch()

> **fetch**\<`M`, `TResponse`\>(`method`, `params?`, `id?`): `Promise`\<`TResponse`\>

Defined in: [src/utils/batch/index.ts:104](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/batch/index.ts#L104)

Automatically batches and fetches JSON-RPC calls in a single request.

#### Type Parameters

##### M

`M` _extends_ `string` \| `number` \| `symbol`

##### TResponse

`TResponse` _extends_ [`ResponseBody`](../Starknet.js-API/namespaces/RPC/namespaces/JRPC/type-aliases/ResponseBody.md) & `object`

#### Parameters

##### method

`M`

Method to call

##### params?

`T`\[`M`\]\[`"params"`\]

Method parameters

##### id?

`string` \| `number`

JSON-RPC Request ID

#### Returns

`Promise`\<`TResponse`\>

JSON-RPC Response
