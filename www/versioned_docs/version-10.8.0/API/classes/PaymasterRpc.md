# Class: PaymasterRpc

Defined in: [src/paymaster/rpc.ts:75](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/paymaster/rpc.ts#L75)

## Implements

- [`PaymasterInterface`](PaymasterInterface.md)

## Constructors

### Constructor

> **new PaymasterRpc**(`options?`): `PaymasterRpc`

Defined in: [src/paymaster/rpc.ts:84](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/paymaster/rpc.ts#L84)

#### Parameters

##### options?

[`PaymasterOptions`](../interfaces/PaymasterOptions.md) \| [`PaymasterInterface`](PaymasterInterface.md) \| `PaymasterRpc`

#### Returns

`PaymasterRpc`

## Properties

### nodeUrl

> **nodeUrl**: `string`

Defined in: [src/paymaster/rpc.ts:76](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/paymaster/rpc.ts#L76)

#### Implementation of

[`PaymasterInterface`](PaymasterInterface.md).[`nodeUrl`](PaymasterInterface.md#nodeurl)

---

### headers

> **headers**: `object`

Defined in: [src/paymaster/rpc.ts:78](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/paymaster/rpc.ts#L78)

#### Implementation of

[`PaymasterInterface`](PaymasterInterface.md).[`headers`](PaymasterInterface.md#headers)

---

### baseFetch

> `readonly` **baseFetch**: (`input`, `init?`) => `Promise`\<`Response`\>

Defined in: [src/paymaster/rpc.ts:80](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/paymaster/rpc.ts#L80)

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/fetch)

#### Parameters

##### input

`RequestInfo` \| `URL`

##### init?

`RequestInit`

#### Returns

`Promise`\<`Response`\>

#### Implementation of

[`PaymasterInterface`](PaymasterInterface.md).[`baseFetch`](PaymasterInterface.md#basefetch)

---

### requestId

> **requestId**: `number`

Defined in: [src/paymaster/rpc.ts:82](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/paymaster/rpc.ts#L82)

## Methods

### fetch()

> **fetch**(`method`, `params?`, `id?`): `Promise`\<`Response`\>

Defined in: [src/paymaster/rpc.ts:114](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/paymaster/rpc.ts#L114)

#### Parameters

##### method

`string`

##### params?

`object`

##### id?

`string` \| `number`

#### Returns

`Promise`\<`Response`\>

---

### errorHandler()

> `protected` **errorHandler**(`method`, `params`, `rpcError?`, `otherError?`): `void`

Defined in: [src/paymaster/rpc.ts:128](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/paymaster/rpc.ts#L128)

#### Parameters

##### method

`string`

##### params

`any`

##### rpcError?

[`Error`](../Starknet.js-API/namespaces/RPC/namespaces/JRPC/type-aliases/Error.md)

##### otherError?

`any`

#### Returns

`void`

---

### fetchEndpoint()

> `protected` **fetchEndpoint**\<`T`\>(`method`, `params?`): `Promise`\<[`Methods`](../Starknet.js-API/namespaces/RPC/namespaces/PAYMASTER_API/type-aliases/Methods.md)\[`T`\]\[`"result"`\]\>

Defined in: [src/paymaster/rpc.ts:140](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/paymaster/rpc.ts#L140)

#### Type Parameters

##### T

`T` _extends_ keyof ReadMethods \| `"paymaster_executeTransaction"`

#### Parameters

##### method

`T`

##### params?

[`Methods`](../Starknet.js-API/namespaces/RPC/namespaces/PAYMASTER_API/type-aliases/Methods.md)\[`T`\]\[`"params"`\]

#### Returns

`Promise`\<[`Methods`](../Starknet.js-API/namespaces/RPC/namespaces/PAYMASTER_API/type-aliases/Methods.md)\[`T`\]\[`"result"`\]\>

---

### isAvailable()

> **isAvailable**(): `Promise`\<`boolean`\>

Defined in: [src/paymaster/rpc.ts:156](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/paymaster/rpc.ts#L156)

Returns the status of the paymaster service

#### Returns

`Promise`\<`boolean`\>

If the paymaster service is correctly functioning, return true. Else, return false

#### Implementation of

[`PaymasterInterface`](PaymasterInterface.md).[`isAvailable`](PaymasterInterface.md#isavailable)

---

### buildTransaction()

> **buildTransaction**(`transaction`, `parameters`): `Promise`\<[`PreparedTransaction`](../type-aliases/PreparedTransaction.md)\>

Defined in: [src/paymaster/rpc.ts:160](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/paymaster/rpc.ts#L160)

Receives the transaction the user wants to execute. Returns the typed data along with
the estimated gas cost and the maximum gas cost suggested to ensure execution

#### Parameters

##### transaction

[`UserTransaction`](../type-aliases/UserTransaction.md)

Transaction to be executed by the paymaster

##### parameters

[`ExecutionParameters`](../type-aliases/ExecutionParameters.md)

Execution parameters to be used when executing the transaction

#### Returns

`Promise`\<[`PreparedTransaction`](../type-aliases/PreparedTransaction.md)\>

The transaction data required for execution along with an estimation of the fee

#### Implementation of

[`PaymasterInterface`](PaymasterInterface.md).[`buildTransaction`](PaymasterInterface.md#buildtransaction)

---

### executeTransaction()

> **executeTransaction**(`transaction`, `parameters`): `Promise`\<[`ExecuteResponse`](../Starknet.js-API/namespaces/RPC/namespaces/PAYMASTER_API/type-aliases/ExecuteResponse.md)\>

Defined in: [src/paymaster/rpc.ts:238](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/paymaster/rpc.ts#L238)

Sends the signed typed data to the paymaster service for execution

#### Parameters

##### transaction

[`ExecutableUserTransaction`](../type-aliases/ExecutableUserTransaction.md)

Typed data build by calling paymaster_buildTransaction signed by the user to be executed by the paymaster service

##### parameters

[`ExecutionParameters`](../type-aliases/ExecutionParameters.md)

Execution parameters to be used when executing the transaction

#### Returns

`Promise`\<[`ExecuteResponse`](../Starknet.js-API/namespaces/RPC/namespaces/PAYMASTER_API/type-aliases/ExecuteResponse.md)\>

The hash of the transaction broadcasted by the paymaster and the tracking ID corresponding to the user `execute` request

#### Implementation of

[`PaymasterInterface`](PaymasterInterface.md).[`executeTransaction`](PaymasterInterface.md#executetransaction)

---

### getSupportedTokens()

> **getSupportedTokens**(): `Promise`\<[`TokenData`](../interfaces/TokenData.md)[]\>

Defined in: [src/paymaster/rpc.ts:282](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/paymaster/rpc.ts#L282)

Get a list of the tokens that the paymaster supports, together with their prices in STRK

#### Returns

`Promise`\<[`TokenData`](../interfaces/TokenData.md)[]\>

An array of token data

#### Implementation of

[`PaymasterInterface`](PaymasterInterface.md).[`getSupportedTokens`](PaymasterInterface.md#getsupportedtokens)
