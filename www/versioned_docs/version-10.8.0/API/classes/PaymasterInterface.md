# Abstract Class: PaymasterInterface

Defined in: [src/paymaster/interface.ts:11](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/paymaster/interface.ts#L11)

## Constructors

### Constructor

> **new PaymasterInterface**(): `PaymasterInterface`

#### Returns

`PaymasterInterface`

## Properties

### nodeUrl

> `abstract` **nodeUrl**: `string`

Defined in: [src/paymaster/interface.ts:12](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/paymaster/interface.ts#L12)

---

### headers

> `abstract` **headers**: `object`

Defined in: [src/paymaster/interface.ts:14](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/paymaster/interface.ts#L14)

---

### baseFetch

> `abstract` `readonly` **baseFetch**: (`input`, `init?`) => `Promise`\<`Response`\>

Defined in: [src/paymaster/interface.ts:16](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/paymaster/interface.ts#L16)

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/fetch)

#### Parameters

##### input

`RequestInfo` \| `URL`

##### init?

`RequestInit`

#### Returns

`Promise`\<`Response`\>

## Methods

### isAvailable()

> `abstract` **isAvailable**(): `Promise`\<`boolean`\>

Defined in: [src/paymaster/interface.ts:23](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/paymaster/interface.ts#L23)

Returns the status of the paymaster service

#### Returns

`Promise`\<`boolean`\>

If the paymaster service is correctly functioning, return true. Else, return false

---

### buildTransaction()

> `abstract` **buildTransaction**(`transaction`, `parameters`): `Promise`\<[`PreparedTransaction`](../type-aliases/PreparedTransaction.md)\>

Defined in: [src/paymaster/interface.ts:33](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/paymaster/interface.ts#L33)

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

---

### executeTransaction()

> `abstract` **executeTransaction**(`transaction`, `parameters`): `Promise`\<[`ExecuteResponse`](../Starknet.js-API/namespaces/RPC/namespaces/PAYMASTER_API/type-aliases/ExecuteResponse.md)\>

Defined in: [src/paymaster/interface.ts:45](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/paymaster/interface.ts#L45)

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

---

### getSupportedTokens()

> `abstract` **getSupportedTokens**(): `Promise`\<[`TokenData`](../interfaces/TokenData.md)[]\>

Defined in: [src/paymaster/interface.ts:55](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/paymaster/interface.ts#L55)

Get a list of the tokens that the paymaster supports, together with their prices in STRK

#### Returns

`Promise`\<[`TokenData`](../interfaces/TokenData.md)[]\>

An array of token data
