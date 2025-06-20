---
id: 'PaymasterInterface'
title: 'Class: PaymasterInterface'
sidebar_label: 'PaymasterInterface'
sidebar_position: 0
custom_edit_url: null
---

## Implemented by

- [`PaymasterRpc`](PaymasterRpc.md)

## Constructors

### constructor

• **new PaymasterInterface**(): [`PaymasterInterface`](PaymasterInterface.md)

#### Returns

[`PaymasterInterface`](PaymasterInterface.md)

## Properties

### nodeUrl

• `Abstract` **nodeUrl**: `string`

#### Defined in

[src/paymaster/interface.ts:12](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/paymaster/interface.ts#L12)

---

### headers

• `Abstract` **headers**: `object`

#### Defined in

[src/paymaster/interface.ts:14](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/paymaster/interface.ts#L14)

---

### baseFetch

• `Readonly` `Abstract` **baseFetch**: (`input`: `RequestInfo` \| `URL`, `init?`: `RequestInit`) => `Promise`<`Response`\>

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

[src/paymaster/interface.ts:16](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/paymaster/interface.ts#L16)

## Methods

### isAvailable

▸ **isAvailable**(): `Promise`<`boolean`\>

Returns the status of the paymaster service

#### Returns

`Promise`<`boolean`\>

If the paymaster service is correctly functioning, return true. Else, return false

#### Defined in

[src/paymaster/interface.ts:23](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/paymaster/interface.ts#L23)

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

#### Defined in

[src/paymaster/interface.ts:33](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/paymaster/interface.ts#L33)

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

#### Defined in

[src/paymaster/interface.ts:45](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/paymaster/interface.ts#L45)

---

### getSupportedTokens

▸ **getSupportedTokens**(): `Promise`<[`TokenData`](../interfaces/types.TokenData.md)[]\>

Get a list of the tokens that the paymaster supports, together with their prices in STRK

#### Returns

`Promise`<[`TokenData`](../interfaces/types.TokenData.md)[]\>

An array of token data

#### Defined in

[src/paymaster/interface.ts:55](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/paymaster/interface.ts#L55)
