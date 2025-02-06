---
id: 'types.RPC.RPCSPEC07.WALLET_API.RpcTypeToMessageMap'
title: 'Interface: RpcTypeToMessageMap'
sidebar_label: 'RpcTypeToMessageMap'
custom_edit_url: null
---

[RPCSPEC07](../namespaces/types.RPC.RPCSPEC07.md).[WALLET_API](../namespaces/types.RPC.RPCSPEC07.WALLET_API.md).RpcTypeToMessageMap

Maps each RPC message type to its corresponding parameters and result type.

## Properties

### wallet_getPermissions

• **wallet_getPermissions**: `Object`

Get permissions from the wallet.

#### Type declaration

| Name      | Type                                                                                                                                                             |
| :-------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `params?` | [`ApiVersion`](types.RPC.RPCSPEC07.WALLET_API.ApiVersion.md)                                                                                                     |
| `result`  | [] \| `"accounts"`[]                                                                                                                                             |
| `errors`  | [`API_VERSION_NOT_SUPPORTED`](types.RPC.RPCSPEC07.WALLET_API.API_VERSION_NOT_SUPPORTED.md) \| [`UNKNOWN_ERROR`](types.RPC.RPCSPEC07.WALLET_API.UNKNOWN_ERROR.md) |

#### Defined in

node_modules/starknet-types-07/dist/types/wallet-api/methods.d.ts:14

---

### wallet_requestAccounts

• **wallet_requestAccounts**: `Object`

Request active accounts from the wallet.

**`Param`**

Optional parameters for requesting accounts.

#### Type declaration

| Name      | Type                                                                                                                                                             |
| :-------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `params?` | [`RequestAccountsParameters`](types.RPC.RPCSPEC07.WALLET_API.RequestAccountsParameters.md) & [`ApiVersion`](types.RPC.RPCSPEC07.WALLET_API.ApiVersion.md)        |
| `result`  | `string`[]                                                                                                                                                       |
| `errors`  | [`API_VERSION_NOT_SUPPORTED`](types.RPC.RPCSPEC07.WALLET_API.API_VERSION_NOT_SUPPORTED.md) \| [`UNKNOWN_ERROR`](types.RPC.RPCSPEC07.WALLET_API.UNKNOWN_ERROR.md) |

#### Defined in

node_modules/starknet-types-07/dist/types/wallet-api/methods.d.ts:24

---

### wallet_watchAsset

• **wallet_watchAsset**: `Object`

Watch an asset in the wallet.

**`Param`**

The parameters required to watch an asset.

#### Type declaration

| Name     | Type                                                                                                                                                                                                                                                                                                                                                                                               |
| :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `params` | [`WatchAssetParameters`](types.RPC.RPCSPEC07.WALLET_API.WatchAssetParameters.md) & [`ApiVersion`](types.RPC.RPCSPEC07.WALLET_API.ApiVersion.md)                                                                                                                                                                                                                                                    |
| `result` | `boolean`                                                                                                                                                                                                                                                                                                                                                                                          |
| `errors` | [`NOT_ERC20`](types.RPC.RPCSPEC07.WALLET_API.NOT_ERC20.md) \| [`USER_REFUSED_OP`](types.RPC.RPCSPEC07.WALLET_API.USER_REFUSED_OP.md) \| [`INVALID_REQUEST_PAYLOAD`](types.RPC.RPCSPEC07.WALLET_API.INVALID_REQUEST_PAYLOAD.md) \| [`API_VERSION_NOT_SUPPORTED`](types.RPC.RPCSPEC07.WALLET_API.API_VERSION_NOT_SUPPORTED.md) \| [`UNKNOWN_ERROR`](types.RPC.RPCSPEC07.WALLET_API.UNKNOWN_ERROR.md) |

#### Defined in

node_modules/starknet-types-07/dist/types/wallet-api/methods.d.ts:34

---

### wallet_addStarknetChain

• **wallet_addStarknetChain**: `Object`

Add a new Starknet chain to the wallet.

**`Param`**

The parameters required to add a new chain.

#### Type declaration

| Name     | Type                                                                                                                                                                                                                                                                                                                                 |
| :------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `params` | [`AddStarknetChainParameters`](types.RPC.RPCSPEC07.WALLET_API.AddStarknetChainParameters.md) & [`ApiVersion`](types.RPC.RPCSPEC07.WALLET_API.ApiVersion.md)                                                                                                                                                                          |
| `result` | `boolean`                                                                                                                                                                                                                                                                                                                            |
| `errors` | [`USER_REFUSED_OP`](types.RPC.RPCSPEC07.WALLET_API.USER_REFUSED_OP.md) \| [`INVALID_REQUEST_PAYLOAD`](types.RPC.RPCSPEC07.WALLET_API.INVALID_REQUEST_PAYLOAD.md) \| [`API_VERSION_NOT_SUPPORTED`](types.RPC.RPCSPEC07.WALLET_API.API_VERSION_NOT_SUPPORTED.md) \| [`UNKNOWN_ERROR`](types.RPC.RPCSPEC07.WALLET_API.UNKNOWN_ERROR.md) |

#### Defined in

node_modules/starknet-types-07/dist/types/wallet-api/methods.d.ts:44

---

### wallet_switchStarknetChain

• **wallet_switchStarknetChain**: `Object`

Switch the current Starknet chain in the wallet.

**`Param`**

The parameters required to switch chains.

#### Type declaration

| Name     | Type                                                                                                                                                                                                                                                                                                                   |
| :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `params` | [`SwitchStarknetChainParameters`](types.RPC.RPCSPEC07.WALLET_API.SwitchStarknetChainParameters.md) & [`ApiVersion`](types.RPC.RPCSPEC07.WALLET_API.ApiVersion.md)                                                                                                                                                      |
| `result` | `boolean`                                                                                                                                                                                                                                                                                                              |
| `errors` | [`UNLISTED_NETWORK`](types.RPC.RPCSPEC07.WALLET_API.UNLISTED_NETWORK.md) \| [`USER_REFUSED_OP`](types.RPC.RPCSPEC07.WALLET_API.USER_REFUSED_OP.md) \| [`API_VERSION_NOT_SUPPORTED`](types.RPC.RPCSPEC07.WALLET_API.API_VERSION_NOT_SUPPORTED.md) \| [`UNKNOWN_ERROR`](types.RPC.RPCSPEC07.WALLET_API.UNKNOWN_ERROR.md) |

#### Defined in

node_modules/starknet-types-07/dist/types/wallet-api/methods.d.ts:54

---

### wallet_requestChainId

• **wallet_requestChainId**: `Object`

Request the current chain ID from the wallet.

#### Type declaration

| Name      | Type                                                                                                                                                             |
| :-------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `params?` | [`ApiVersion`](types.RPC.RPCSPEC07.WALLET_API.ApiVersion.md)                                                                                                     |
| `result`  | `string`                                                                                                                                                         |
| `errors`  | [`API_VERSION_NOT_SUPPORTED`](types.RPC.RPCSPEC07.WALLET_API.API_VERSION_NOT_SUPPORTED.md) \| [`UNKNOWN_ERROR`](types.RPC.RPCSPEC07.WALLET_API.UNKNOWN_ERROR.md) |

#### Defined in

node_modules/starknet-types-07/dist/types/wallet-api/methods.d.ts:63

---

### wallet_deploymentData

• **wallet_deploymentData**: `Object`

Get deployment data for a contract.

#### Type declaration

| Name      | Type                                                                                                                                                                                                                                                         |
| :-------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `params?` | [`ApiVersion`](types.RPC.RPCSPEC07.WALLET_API.ApiVersion.md)                                                                                                                                                                                                 |
| `result`  | [`AccountDeploymentData`](types.RPC.RPCSPEC07.WALLET_API.AccountDeploymentData.md)                                                                                                                                                                           |
| `errors`  | [`ACCOUNT_ALREADY_DEPLOYED`](types.RPC.RPCSPEC07.WALLET_API.ACCOUNT_ALREADY_DEPLOYED.md) \| [`API_VERSION_NOT_SUPPORTED`](types.RPC.RPCSPEC07.WALLET_API.API_VERSION_NOT_SUPPORTED.md) \| [`UNKNOWN_ERROR`](types.RPC.RPCSPEC07.WALLET_API.UNKNOWN_ERROR.md) |

#### Defined in

node_modules/starknet-types-07/dist/types/wallet-api/methods.d.ts:72

---

### wallet_addInvokeTransaction

• **wallet_addInvokeTransaction**: `Object`

Add an invoke transaction to the wallet.

**`Param`**

The parameters required for the invoke transaction.

#### Type declaration

| Name     | Type                                                                                                                                                                                                                                                                                                                                 |
| :------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `params` | [`AddInvokeTransactionParameters`](types.RPC.RPCSPEC07.WALLET_API.AddInvokeTransactionParameters.md) & [`ApiVersion`](types.RPC.RPCSPEC07.WALLET_API.ApiVersion.md)                                                                                                                                                                  |
| `result` | [`AddInvokeTransactionResult`](types.RPC.RPCSPEC07.WALLET_API.AddInvokeTransactionResult.md)                                                                                                                                                                                                                                         |
| `errors` | [`USER_REFUSED_OP`](types.RPC.RPCSPEC07.WALLET_API.USER_REFUSED_OP.md) \| [`INVALID_REQUEST_PAYLOAD`](types.RPC.RPCSPEC07.WALLET_API.INVALID_REQUEST_PAYLOAD.md) \| [`API_VERSION_NOT_SUPPORTED`](types.RPC.RPCSPEC07.WALLET_API.API_VERSION_NOT_SUPPORTED.md) \| [`UNKNOWN_ERROR`](types.RPC.RPCSPEC07.WALLET_API.UNKNOWN_ERROR.md) |

#### Defined in

node_modules/starknet-types-07/dist/types/wallet-api/methods.d.ts:82

---

### wallet_addDeclareTransaction

• **wallet_addDeclareTransaction**: `Object`

Add a declare transaction to the wallet.

**`Param`**

The parameters required for the declare transaction.

#### Type declaration

| Name     | Type                                                                                                                                                                                                                                                                                                                                 |
| :------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `params` | [`AddDeclareTransactionParameters`](types.RPC.RPCSPEC07.WALLET_API.AddDeclareTransactionParameters.md) & [`ApiVersion`](types.RPC.RPCSPEC07.WALLET_API.ApiVersion.md)                                                                                                                                                                |
| `result` | [`AddDeclareTransactionResult`](types.RPC.RPCSPEC07.WALLET_API.AddDeclareTransactionResult.md)                                                                                                                                                                                                                                       |
| `errors` | [`USER_REFUSED_OP`](types.RPC.RPCSPEC07.WALLET_API.USER_REFUSED_OP.md) \| [`INVALID_REQUEST_PAYLOAD`](types.RPC.RPCSPEC07.WALLET_API.INVALID_REQUEST_PAYLOAD.md) \| [`API_VERSION_NOT_SUPPORTED`](types.RPC.RPCSPEC07.WALLET_API.API_VERSION_NOT_SUPPORTED.md) \| [`UNKNOWN_ERROR`](types.RPC.RPCSPEC07.WALLET_API.UNKNOWN_ERROR.md) |

#### Defined in

node_modules/starknet-types-07/dist/types/wallet-api/methods.d.ts:92

---

### wallet_signTypedData

• **wallet_signTypedData**: `Object`

Sign typed data using the wallet.

**`Param`**

The typed data to sign.

#### Type declaration

| Name     | Type                                                                                                                                                                                                                                                                                                                                 |
| :------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `params` | [`TypedData`](types.RPC.RPCSPEC07.WALLET_API.TypedData.md) & [`ApiVersion`](types.RPC.RPCSPEC07.WALLET_API.ApiVersion.md)                                                                                                                                                                                                            |
| `result` | [`SIGNATURE`](../namespaces/types.RPC.RPCSPEC07.API.SPEC.md#signature)                                                                                                                                                                                                                                                               |
| `errors` | [`USER_REFUSED_OP`](types.RPC.RPCSPEC07.WALLET_API.USER_REFUSED_OP.md) \| [`INVALID_REQUEST_PAYLOAD`](types.RPC.RPCSPEC07.WALLET_API.INVALID_REQUEST_PAYLOAD.md) \| [`API_VERSION_NOT_SUPPORTED`](types.RPC.RPCSPEC07.WALLET_API.API_VERSION_NOT_SUPPORTED.md) \| [`UNKNOWN_ERROR`](types.RPC.RPCSPEC07.WALLET_API.UNKNOWN_ERROR.md) |

#### Defined in

node_modules/starknet-types-07/dist/types/wallet-api/methods.d.ts:102

---

### wallet_supportedSpecs

• **wallet_supportedSpecs**: `Object`

Get the list of supported RPC specification versions.

#### Type declaration

| Name      | Type        |
| :-------- | :---------- |
| `params?` | `undefined` |
| `result`  | `string`[]  |

#### Defined in

node_modules/starknet-types-07/dist/types/wallet-api/methods.d.ts:111

---

### wallet_supportedWalletApi

• **wallet_supportedWalletApi**: `Object`

Returns a list of wallet api versions compatible with the wallet.
Notice this might be different from Starknet JSON-RPC spec

#### Type declaration

| Name      | Type                                                           |
| :-------- | :------------------------------------------------------------- |
| `params?` | `undefined`                                                    |
| `result`  | [`ApiVersion`](types.RPC.RPCSPEC07.WALLET_API.ApiVersion.md)[] |

#### Defined in

node_modules/starknet-types-07/dist/types/wallet-api/methods.d.ts:120
