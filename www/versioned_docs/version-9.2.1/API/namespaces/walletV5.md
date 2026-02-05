---
id: 'walletV5'
title: 'Namespace: walletV5'
sidebar_label: 'walletV5'
sidebar_position: 0
custom_edit_url: null
---

## Functions

### requestAccounts

▸ **requestAccounts**(`walletWSF`, `silent_mode?`): `Promise`<[`Address`](RPC.RPCSPEC010.WALLET_API.md#address)[]\>

Request Permission for wallet account, return addresses that are allowed by user

#### Parameters

| Name           | Type                         | Default value | Description                                                              |
| :------------- | :--------------------------- | :------------ | :----------------------------------------------------------------------- |
| `walletWSF`    | `WalletWithStarknetFeatures` | `undefined`   | The get-starknet V5 wallet object to use.                                |
| `silent_mode?` | `boolean`                    | `false`       | false: request user interaction allowance. true: return only pre-allowed |

#### Returns

`Promise`<[`Address`](RPC.RPCSPEC010.WALLET_API.md#address)[]\>

allowed accounts addresses

#### Defined in

[src/wallet/connectV5.ts:25](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/wallet/connectV5.ts#L25)

---

### getPermissions

▸ **getPermissions**(`walletWSF`): `Promise`<[`Permission`](RPC.RPCSPEC010.WALLET_API.md#permission)[]\>

Request if DAPP is connected to wallet.

#### Parameters

| Name        | Type                         | Description                               |
| :---------- | :--------------------------- | :---------------------------------------- |
| `walletWSF` | `WalletWithStarknetFeatures` | The get-starknet V5 wallet object to use. |

#### Returns

`Promise`<[`Permission`](RPC.RPCSPEC010.WALLET_API.md#permission)[]\>

"accounts" if permission granted

#### Defined in

[src/wallet/connectV5.ts:40](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/wallet/connectV5.ts#L40)

---

### watchAsset

▸ **watchAsset**(`walletWSF`, `asset`): `Promise`<`boolean`\>

Request adding an ERC20 Token to the Wallet List

#### Parameters

| Name        | Type                                                                                      | Description                               |
| :---------- | :---------------------------------------------------------------------------------------- | :---------------------------------------- |
| `walletWSF` | `WalletWithStarknetFeatures`                                                              | The get-starknet V5 wallet object to use. |
| `asset`     | [`WatchAssetParameters`](../interfaces/RPC.RPCSPEC010.WALLET_API.WatchAssetParameters.md) | description of the token to add.          |

#### Returns

`Promise`<`boolean`\>

true if the token was added successfully

#### Defined in

[src/wallet/connectV5.ts:50](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/wallet/connectV5.ts#L50)

---

### addStarknetChain

▸ **addStarknetChain**(`walletWSF`, `chain`): `Promise`<`boolean`\>

Request adding custom Starknet chain

#### Parameters

| Name        | Type                                                                                                  | Description                               |
| :---------- | :---------------------------------------------------------------------------------------------------- | :---------------------------------------- |
| `walletWSF` | `WalletWithStarknetFeatures`                                                                          | The get-starknet V5 wallet object to use. |
| `chain`     | [`AddStarknetChainParameters`](../interfaces/RPC.RPCSPEC010.WALLET_API.AddStarknetChainParameters.md) | description of the chain to add.          |

#### Returns

`Promise`<`boolean`\>

true if the chain was added successfully

#### Defined in

[src/wallet/connectV5.ts:66](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/wallet/connectV5.ts#L66)

---

### switchStarknetChain

▸ **switchStarknetChain**(`walletWSF`, `chainId`): `Promise`<`boolean`\>

Request Wallet Network change

#### Parameters

| Name        | Type                         | Description                               |
| :---------- | :--------------------------- | :---------------------------------------- |
| `walletWSF` | `WalletWithStarknetFeatures` | The get-starknet V5 wallet object to use. |
| `chainId`   | `string`                     | encoded name of the chain requested.      |

#### Returns

`Promise`<`boolean`\>

true if the chain was changed successfully

#### Defined in

[src/wallet/connectV5.ts:82](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/wallet/connectV5.ts#L82)

---

### requestChainId

▸ **requestChainId**(`walletWSF`): `Promise`<[`ChainId`](RPC.RPCSPEC010.API.md#chainid)\>

Request the current chain ID from the wallet.

#### Parameters

| Name        | Type                         | Description                               |
| :---------- | :--------------------------- | :---------------------------------------- |
| `walletWSF` | `WalletWithStarknetFeatures` | The get-starknet V5 wallet object to use. |

#### Returns

`Promise`<[`ChainId`](RPC.RPCSPEC010.API.md#chainid)\>

The current Starknet chain ID.

#### Defined in

[src/wallet/connectV5.ts:97](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/wallet/connectV5.ts#L97)

---

### deploymentData

▸ **deploymentData**(`walletWSF`): `Promise`<[`AccountDeploymentData`](../interfaces/RPC.RPCSPEC010.WALLET_API.AccountDeploymentData.md)\>

Get deployment data for a contract.

#### Parameters

| Name        | Type                         | Description                               |
| :---------- | :--------------------------- | :---------------------------------------- |
| `walletWSF` | `WalletWithStarknetFeatures` | The get-starknet V5 wallet object to use. |

#### Returns

`Promise`<[`AccountDeploymentData`](../interfaces/RPC.RPCSPEC010.WALLET_API.AccountDeploymentData.md)\>

The deployment data result.

#### Defined in

[src/wallet/connectV5.ts:106](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/wallet/connectV5.ts#L106)

---

### addInvokeTransaction

▸ **addInvokeTransaction**(`walletWSF`, `params`): `Promise`<[`AddInvokeTransactionResult`](../interfaces/RPC.RPCSPEC010.WALLET_API.AddInvokeTransactionResult.md)\>

Add an invoke transaction to the wallet.

#### Parameters

| Name        | Type                                                                                                          | Description                                         |
| :---------- | :------------------------------------------------------------------------------------------------------------ | :-------------------------------------------------- |
| `walletWSF` | `WalletWithStarknetFeatures`                                                                                  | The get-starknet V5 wallet object to use.           |
| `params`    | [`AddInvokeTransactionParameters`](../interfaces/RPC.RPCSPEC010.WALLET_API.AddInvokeTransactionParameters.md) | The parameters required for the invoke transaction. |

#### Returns

`Promise`<[`AddInvokeTransactionResult`](../interfaces/RPC.RPCSPEC010.WALLET_API.AddInvokeTransactionResult.md)\>

The result of adding the invoke transaction.

#### Defined in

[src/wallet/connectV5.ts:118](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/wallet/connectV5.ts#L118)

---

### addDeclareTransaction

▸ **addDeclareTransaction**(`walletWSF`, `params`): `Promise`<[`AddDeclareTransactionResult`](../interfaces/RPC.RPCSPEC010.WALLET_API.AddDeclareTransactionResult.md)\>

Add a declare transaction to the wallet.

#### Parameters

| Name        | Type                                                                                                            | Description                                          |
| :---------- | :-------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------- |
| `walletWSF` | `WalletWithStarknetFeatures`                                                                                    | The get-starknet V5 wallet object to use.            |
| `params`    | [`AddDeclareTransactionParameters`](../interfaces/RPC.RPCSPEC010.WALLET_API.AddDeclareTransactionParameters.md) | The parameters required for the declare transaction. |

#### Returns

`Promise`<[`AddDeclareTransactionResult`](../interfaces/RPC.RPCSPEC010.WALLET_API.AddDeclareTransactionResult.md)\>

The result of adding the declare transaction.

#### Defined in

[src/wallet/connectV5.ts:134](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/wallet/connectV5.ts#L134)

---

### signMessage

▸ **signMessage**(`walletWSF`, `typedData`): `Promise`<[`Signature`](RPC.RPCSPEC010.WALLET_API.md#signature)\>

Sign typed data using the wallet.

#### Parameters

| Name        | Type                                                                | Description                               |
| :---------- | :------------------------------------------------------------------ | :---------------------------------------- |
| `walletWSF` | `WalletWithStarknetFeatures`                                        | The get-starknet V5 wallet object to use. |
| `typedData` | [`TypedData`](../interfaces/RPC.RPCSPEC010.WALLET_API.TypedData.md) | The typed data to sign.                   |

#### Returns

`Promise`<[`Signature`](RPC.RPCSPEC010.WALLET_API.md#signature)\>

An array of signatures as strings.

#### Defined in

[src/wallet/connectV5.ts:150](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/wallet/connectV5.ts#L150)

---

### supportedSpecs

▸ **supportedSpecs**(`walletWSF`): `Promise`<[`SpecVersion`](RPC.RPCSPEC010.WALLET_API.md#specversion)[]\>

Get the list of supported Wallet API specifications.

#### Parameters

| Name        | Type                         | Description                               |
| :---------- | :--------------------------- | :---------------------------------------- |
| `walletWSF` | `WalletWithStarknetFeatures` | The get-starknet V5 wallet object to use. |

#### Returns

`Promise`<[`SpecVersion`](RPC.RPCSPEC010.WALLET_API.md#specversion)[]\>

An array of wallet API supported specification strings.

#### Defined in

[src/wallet/connectV5.ts:165](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/wallet/connectV5.ts#L165)

---

### subscribeWalletEvent

▸ **subscribeWalletEvent**(`walletWSF`, `callback`): () => `void`

Attaches an event handler function for the changes of network and account.
When the account/network are changed, the specified callback function will be called.

#### Parameters

| Name        | Type                                                   | Description                                                     |
| :---------- | :----------------------------------------------------- | :-------------------------------------------------------------- |
| `walletWSF` | `WalletWithStarknetFeatures`                           | The get-starknet V5 wallet object to use.                       |
| `callback`  | (`change`: `StandardEventsChangeProperties`) => `void` | The function to be called when the account/network are changed. |

#### Returns

`fn`

function to execute to unsubscribe events.

▸ (): `void`

##### Returns

`void`

#### Defined in

[src/wallet/connectV5.ts:176](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/wallet/connectV5.ts#L176)
