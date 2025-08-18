---
id: 'PaymasterRpc'
title: 'Class: PaymasterRpc'
sidebar_label: 'PaymasterRpc'
sidebar_position: 0
custom_edit_url: null
---

## Implements

- [`PaymasterInterface`](PaymasterInterface.md)

## Constructors

### constructor

• **new PaymasterRpc**(`options?`): [`PaymasterRpc`](PaymasterRpc.md)

#### Parameters

| Name       | Type                                                                                                                                                |
| :--------- | :-------------------------------------------------------------------------------------------------------------------------------------------------- |
| `options?` | [`PaymasterOptions`](../interfaces/types.PaymasterOptions.md) \| [`PaymasterInterface`](PaymasterInterface.md) \| [`PaymasterRpc`](PaymasterRpc.md) |

#### Returns

[`PaymasterRpc`](PaymasterRpc.md)

#### Defined in

[src/paymaster/rpc.ts:84](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/paymaster/rpc.ts#L84)

## Properties

### nodeUrl

• **nodeUrl**: `string`

#### Implementation of

[PaymasterInterface](PaymasterInterface.md).[nodeUrl](PaymasterInterface.md#nodeurl)

#### Defined in

[src/paymaster/rpc.ts:76](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/paymaster/rpc.ts#L76)

---

### headers

• **headers**: `object`

#### Implementation of

[PaymasterInterface](PaymasterInterface.md).[headers](PaymasterInterface.md#headers)

#### Defined in

[src/paymaster/rpc.ts:78](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/paymaster/rpc.ts#L78)

---

### baseFetch

• `Readonly` **baseFetch**: (`input`: `RequestInfo` \| `URL`, `init?`: `RequestInit`) => `Promise`<`Response`\>

#### Type declaration

▸ (`input`, `init?`): `Promise`<`Response`\>

##### Parameters

| Name    | Type                   |
| :------ | :--------------------- |
| `input` | `RequestInfo` \| `URL` |
| `init?` | `RequestInit`          |

##### Returns

`Promise`<`Response`\>

#### Implementation of

[PaymasterInterface](PaymasterInterface.md).[baseFetch](PaymasterInterface.md#basefetch)

#### Defined in

[src/paymaster/rpc.ts:80](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/paymaster/rpc.ts#L80)

---

### requestId

• **requestId**: `number`

#### Defined in

[src/paymaster/rpc.ts:82](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/paymaster/rpc.ts#L82)

## Methods

### fetch

▸ **fetch**(`method`, `params?`, `id?`): `Promise`<`Response`\>

#### Parameters

| Name      | Type                 | Default value |
| :-------- | :------------------- | :------------ |
| `method`  | `string`             | `undefined`   |
| `params?` | `object`             | `undefined`   |
| `id`      | `string` \| `number` | `0`           |

#### Returns

`Promise`<`Response`\>

#### Defined in

[src/paymaster/rpc.ts:114](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/paymaster/rpc.ts#L114)

---

### errorHandler

▸ **errorHandler**(`method`, `params`, `rpcError?`, `otherError?`): `void`

#### Parameters

| Name          | Type                                             |
| :------------ | :----------------------------------------------- |
| `method`      | `string`                                         |
| `params`      | `any`                                            |
| `rpcError?`   | [`Error`](../namespaces/types.RPC.JRPC.md#error) |
| `otherError?` | `any`                                            |

#### Returns

`void`

#### Defined in

[src/paymaster/rpc.ts:128](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/paymaster/rpc.ts#L128)

---

### fetchEndpoint

▸ **fetchEndpoint**<`T`\>(`method`, `params?`): `Promise`<[`Methods`](../namespaces/types.RPC.RPCSPEC08.PAYMASTER_API.md#methods)[`T`][``"result"``]\>

#### Type parameters

| Name | Type                                                            |
| :--- | :-------------------------------------------------------------- |
| `T`  | extends keyof `ReadMethods` \| `"paymaster_executeTransaction"` |

#### Parameters

| Name      | Type                                                                                       |
| :-------- | :----------------------------------------------------------------------------------------- |
| `method`  | `T`                                                                                        |
| `params?` | [`Methods`](../namespaces/types.RPC.RPCSPEC08.PAYMASTER_API.md#methods)[`T`][``"params"``] |

#### Returns

`Promise`<[`Methods`](../namespaces/types.RPC.RPCSPEC08.PAYMASTER_API.md#methods)[`T`][``"result"``]\>

#### Defined in

[src/paymaster/rpc.ts:140](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/paymaster/rpc.ts#L140)

---

### isAvailable

▸ **isAvailable**(): `Promise`<`boolean`\>

Returns the status of the paymaster service

#### Returns

`Promise`<`boolean`\>

If the paymaster service is correctly functioning, return true. Else, return false

#### Implementation of

[PaymasterInterface](PaymasterInterface.md).[isAvailable](PaymasterInterface.md#isavailable)

#### Defined in

[src/paymaster/rpc.ts:156](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/paymaster/rpc.ts#L156)

---

### buildTransaction

▸ **buildTransaction**(`transaction`, `parameters`): `Promise`<[`PreparedTransaction`](../namespaces/types.md#preparedtransaction)\>

Receives the transaction the user wants to execute. Returns the typed data along with
the estimated gas cost and the maximum gas cost suggested to ensure execution

#### Parameters

| Name          | Type                                                                | Description                                                    |
| :------------ | :------------------------------------------------------------------ | :------------------------------------------------------------- |
| `transaction` | [`UserTransaction`](../namespaces/types.md#usertransaction)         | Transaction to be executed by the paymaster                    |
| `parameters`  | [`ExecutionParameters`](../namespaces/types.md#executionparameters) | Execution parameters to be used when executing the transaction |

#### Returns

`Promise`<[`PreparedTransaction`](../namespaces/types.md#preparedtransaction)\>

The transaction data required for execution along with an estimation of the fee

#### Implementation of

[PaymasterInterface](PaymasterInterface.md).[buildTransaction](PaymasterInterface.md#buildtransaction)

#### Defined in

[src/paymaster/rpc.ts:160](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/paymaster/rpc.ts#L160)

---

### executeTransaction

▸ **executeTransaction**(`transaction`, `parameters`): `Promise`<[`ExecuteResponse`](../namespaces/types.RPC.RPCSPEC08.PAYMASTER_API.md#executeresponse)\>

Sends the signed typed data to the paymaster service for execution

#### Parameters

| Name          | Type                                                                            | Description                                                                                                       |
| :------------ | :------------------------------------------------------------------------------ | :---------------------------------------------------------------------------------------------------------------- |
| `transaction` | [`ExecutableUserTransaction`](../namespaces/types.md#executableusertransaction) | Typed data build by calling paymaster_buildTransaction signed by the user to be executed by the paymaster service |
| `parameters`  | [`ExecutionParameters`](../namespaces/types.md#executionparameters)             | Execution parameters to be used when executing the transaction                                                    |

#### Returns

`Promise`<[`ExecuteResponse`](../namespaces/types.RPC.RPCSPEC08.PAYMASTER_API.md#executeresponse)\>

The hash of the transaction broadcasted by the paymaster and the tracking ID corresponding to the user `execute` request

#### Implementation of

[PaymasterInterface](PaymasterInterface.md).[executeTransaction](PaymasterInterface.md#executetransaction)

#### Defined in

[src/paymaster/rpc.ts:238](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/paymaster/rpc.ts#L238)

---

### getSupportedTokens

▸ **getSupportedTokens**(): `Promise`<[`TokenData`](../interfaces/types.TokenData.md)[]\>

Get a list of the tokens that the paymaster supports, together with their prices in STRK

#### Returns

`Promise`<[`TokenData`](../interfaces/types.TokenData.md)[]\>

An array of token data

#### Implementation of

[PaymasterInterface](PaymasterInterface.md).[getSupportedTokens](PaymasterInterface.md#getsupportedtokens)

#### Defined in

[src/paymaster/rpc.ts:282](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/paymaster/rpc.ts#L282)
