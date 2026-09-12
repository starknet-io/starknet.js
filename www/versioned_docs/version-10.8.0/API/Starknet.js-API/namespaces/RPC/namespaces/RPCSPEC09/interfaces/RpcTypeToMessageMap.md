# Interface: RpcTypeToMessageMap

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/wallet-api/methods.d.ts:9

Maps each RPC message type to its corresponding parameters and result type.

## Properties

### wallet_getPermissions

> **wallet_getPermissions**: `object`

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/wallet-api/methods.d.ts:14

Get permissions from the wallet.

#### params?

> `optional` **params?**: [`ApiVersionRequest`](ApiVersionRequest.md)

#### result

> **result**: \[\] \| `"accounts"`[]

#### errors

> **errors**: [`API_VERSION_NOT_SUPPORTED`](API_VERSION_NOT_SUPPORTED.md) \| [`UNKNOWN_ERROR`](UNKNOWN_ERROR.md)

#### Returns

An array of permissions.

---

### wallet_requestAccounts

> **wallet_requestAccounts**: `object`

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/wallet-api/methods.d.ts:24

Request active accounts from the wallet.

#### params?

> `optional` **params?**: [`RequestAccountsParameters`](RequestAccountsParameters.md) & [`ApiVersionRequest`](ApiVersionRequest.md)

#### result

> **result**: `string`[]

#### errors

> **errors**: [`API_VERSION_NOT_SUPPORTED`](API_VERSION_NOT_SUPPORTED.md) \| [`UNKNOWN_ERROR`](UNKNOWN_ERROR.md)

#### Param

Optional parameters for requesting accounts.

#### Returns

An array of account addresses as strings.

---

### wallet_watchAsset

> **wallet_watchAsset**: `object`

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/wallet-api/methods.d.ts:34

Watch an asset in the wallet.

#### params

> **params**: [`WatchAssetParameters`](WatchAssetParameters.md) & [`ApiVersionRequest`](ApiVersionRequest.md)

#### result

> **result**: `boolean`

#### errors

> **errors**: [`NOT_ERC20`](NOT_ERC20.md) \| [`USER_REFUSED_OP`](USER_REFUSED_OP.md) \| [`INVALID_REQUEST_PAYLOAD`](INVALID_REQUEST_PAYLOAD.md) \| [`API_VERSION_NOT_SUPPORTED`](API_VERSION_NOT_SUPPORTED.md) \| [`UNKNOWN_ERROR`](UNKNOWN_ERROR.md)

#### Param

The parameters required to watch an asset.

#### Returns

A boolean indicating if the operation was successful.

---

### wallet_addStarknetChain

> **wallet_addStarknetChain**: `object`

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/wallet-api/methods.d.ts:44

Add a new Starknet chain to the wallet.

#### params

> **params**: [`AddStarknetChainParameters`](AddStarknetChainParameters.md) & [`ApiVersionRequest`](ApiVersionRequest.md)

#### result

> **result**: `boolean`

#### errors

> **errors**: [`USER_REFUSED_OP`](USER_REFUSED_OP.md) \| [`INVALID_REQUEST_PAYLOAD`](INVALID_REQUEST_PAYLOAD.md) \| [`API_VERSION_NOT_SUPPORTED`](API_VERSION_NOT_SUPPORTED.md) \| [`UNKNOWN_ERROR`](UNKNOWN_ERROR.md)

#### Param

The parameters required to add a new chain.

#### Returns

A boolean indicating if the operation was successful.

---

### wallet_switchStarknetChain

> **wallet_switchStarknetChain**: `object`

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/wallet-api/methods.d.ts:54

Switch the current Starknet chain in the wallet.

#### params

> **params**: [`SwitchStarknetChainParameters`](SwitchStarknetChainParameters.md) & [`ApiVersionRequest`](ApiVersionRequest.md)

#### result

> **result**: `boolean`

#### errors

> **errors**: [`UNLISTED_NETWORK`](UNLISTED_NETWORK.md) \| [`USER_REFUSED_OP`](USER_REFUSED_OP.md) \| [`API_VERSION_NOT_SUPPORTED`](API_VERSION_NOT_SUPPORTED.md) \| [`UNKNOWN_ERROR`](UNKNOWN_ERROR.md)

#### Param

The parameters required to switch chains.

#### Returns

A boolean indicating if the operation was successful.

---

### wallet_requestChainId

> **wallet_requestChainId**: `object`

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/wallet-api/methods.d.ts:63

Request the current chain ID from the wallet.

#### params?

> `optional` **params?**: [`ApiVersionRequest`](ApiVersionRequest.md)

#### result

> **result**: `string`

#### errors

> **errors**: [`API_VERSION_NOT_SUPPORTED`](API_VERSION_NOT_SUPPORTED.md) \| [`UNKNOWN_ERROR`](UNKNOWN_ERROR.md)

#### Returns

The current Starknet chain ID.

---

### wallet_deploymentData

> **wallet_deploymentData**: `object`

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/wallet-api/methods.d.ts:72

Get deployment data for a contract.

#### params?

> `optional` **params?**: [`ApiVersionRequest`](ApiVersionRequest.md)

#### result

> **result**: [`AccountDeploymentData`](AccountDeploymentData.md)

#### errors

> **errors**: [`ACCOUNT_ALREADY_DEPLOYED`](ACCOUNT_ALREADY_DEPLOYED.md) \| [`API_VERSION_NOT_SUPPORTED`](API_VERSION_NOT_SUPPORTED.md) \| [`UNKNOWN_ERROR`](UNKNOWN_ERROR.md)

#### Returns

The deployment data result.

---

### wallet_addInvokeTransaction

> **wallet_addInvokeTransaction**: `object`

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/wallet-api/methods.d.ts:82

Add an invoke transaction to the wallet.

#### params

> **params**: [`AddInvokeTransactionParameters`](AddInvokeTransactionParameters.md) & [`ApiVersionRequest`](ApiVersionRequest.md)

#### result

> **result**: [`AddInvokeTransactionResult`](AddInvokeTransactionResult.md)

#### errors

> **errors**: [`USER_REFUSED_OP`](USER_REFUSED_OP.md) \| [`INVALID_REQUEST_PAYLOAD`](INVALID_REQUEST_PAYLOAD.md) \| [`API_VERSION_NOT_SUPPORTED`](API_VERSION_NOT_SUPPORTED.md) \| [`UNKNOWN_ERROR`](UNKNOWN_ERROR.md)

#### Param

The parameters required for the invoke transaction.

#### Returns

The result of adding the invoke transaction.

---

### wallet_addDeclareTransaction

> **wallet_addDeclareTransaction**: `object`

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/wallet-api/methods.d.ts:92

Add a declare transaction to the wallet.

#### params

> **params**: [`AddDeclareTransactionParameters`](AddDeclareTransactionParameters.md) & [`ApiVersionRequest`](ApiVersionRequest.md)

#### result

> **result**: [`AddDeclareTransactionResult`](AddDeclareTransactionResult.md)

#### errors

> **errors**: [`USER_REFUSED_OP`](USER_REFUSED_OP.md) \| [`INVALID_REQUEST_PAYLOAD`](INVALID_REQUEST_PAYLOAD.md) \| [`API_VERSION_NOT_SUPPORTED`](API_VERSION_NOT_SUPPORTED.md) \| [`UNKNOWN_ERROR`](UNKNOWN_ERROR.md)

#### Param

The parameters required for the declare transaction.

#### Returns

The result of adding the declare transaction.

---

### wallet_signTypedData

> **wallet_signTypedData**: `object`

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/wallet-api/methods.d.ts:102

Sign typed data using the wallet.

#### params

> **params**: [`TypedData`](TypedData.md) & [`ApiVersionRequest`](ApiVersionRequest.md)

#### result

> **result**: [`SIGNATURE`](../type-aliases/SIGNATURE.md)

#### errors

> **errors**: [`USER_REFUSED_OP`](USER_REFUSED_OP.md) \| [`INVALID_REQUEST_PAYLOAD`](INVALID_REQUEST_PAYLOAD.md) \| [`API_VERSION_NOT_SUPPORTED`](API_VERSION_NOT_SUPPORTED.md) \| [`UNKNOWN_ERROR`](UNKNOWN_ERROR.md)

#### Param

The typed data to sign.

#### Returns

An array of signatures as strings.

---

### wallet_supportedSpecs

> **wallet_supportedSpecs**: `object`

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/wallet-api/methods.d.ts:111

Get the list of supported RPC specification versions.

#### params?

> `optional` **params?**: `undefined`

#### result

> **result**: `string`[]

#### Returns

An array of supported specification strings.

---

### wallet_supportedWalletApi

> **wallet_supportedWalletApi**: `object`

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/wallet-api/methods.d.ts:120

Returns a list of wallet api versions compatible with the wallet.
Notice this might be different from Starknet JSON-RPC spec

#### params?

> `optional` **params?**: `undefined`

#### result

> **result**: `string`[]

#### Returns

An array of supported wallet api versions.
