---
id: 'wallet'
title: 'Namespace: wallet'
sidebar_label: 'wallet'
sidebar_position: 0
custom_edit_url: null
---

## Functions

### requestAccounts

▸ **requestAccounts**(`swo`, `silent_mode?`): `Promise`<[`Address`](types.RPC.RPCSPEC07.WALLET_API.md#address)[]\>

Request Permission for wallet account, return addresses that are allowed by user

#### Parameters

| Name           | Type                                                                                           | Default value | Description                                                              |
| :------------- | :--------------------------------------------------------------------------------------------- | :------------ | :----------------------------------------------------------------------- |
| `swo`          | [`StarknetWindowObject`](../interfaces/types.RPC.RPCSPEC07.WALLET_API.StarknetWindowObject.md) | `undefined`   | -                                                                        |
| `silent_mode?` | `boolean`                                                                                      | `false`       | false: request user interaction allowance. true: return only pre-allowed |

#### Returns

`Promise`<[`Address`](types.RPC.RPCSPEC07.WALLET_API.md#address)[]\>

allowed accounts addresses

#### Defined in

[src/wallet/connect.ts:25](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/wallet/connect.ts#L25)

---

### getPermissions

▸ **getPermissions**(`swo`): `Promise`<[`Permission`](types.RPC.RPCSPEC07.WALLET_API.md#permission-1)[]\>

Request Permission for wallet account

#### Parameters

| Name  | Type                                                                                           |
| :---- | :--------------------------------------------------------------------------------------------- |
| `swo` | [`StarknetWindowObject`](../interfaces/types.RPC.RPCSPEC07.WALLET_API.StarknetWindowObject.md) |

#### Returns

`Promise`<[`Permission`](types.RPC.RPCSPEC07.WALLET_API.md#permission-1)[]\>

allowed accounts addresses

#### Defined in

[src/wallet/connect.ts:39](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/wallet/connect.ts#L39)

---

### watchAsset

▸ **watchAsset**(`swo`, `asset`): `Promise`<`boolean`\>

Request adding ERC20 Token to Wallet List

#### Parameters

| Name    | Type                                                                                           | Description          |
| :------ | :--------------------------------------------------------------------------------------------- | :------------------- |
| `swo`   | [`StarknetWindowObject`](../interfaces/types.RPC.RPCSPEC07.WALLET_API.StarknetWindowObject.md) | -                    |
| `asset` | [`WatchAssetParameters`](../interfaces/types.RPC.RPCSPEC07.WALLET_API.WatchAssetParameters.md) | WatchAssetParameters |

#### Returns

`Promise`<`boolean`\>

boolean

#### Defined in

[src/wallet/connect.ts:48](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/wallet/connect.ts#L48)

---

### addStarknetChain

▸ **addStarknetChain**(`swo`, `chain`): `Promise`<`boolean`\>

Request adding custom Starknet chain

#### Parameters

| Name    | Type                                                                                                       | Description                |
| :------ | :--------------------------------------------------------------------------------------------------------- | :------------------------- |
| `swo`   | [`StarknetWindowObject`](../interfaces/types.RPC.RPCSPEC07.WALLET_API.StarknetWindowObject.md)             | -                          |
| `chain` | [`AddStarknetChainParameters`](../interfaces/types.RPC.RPCSPEC07.WALLET_API.AddStarknetChainParameters.md) | AddStarknetChainParameters |

#### Returns

`Promise`<`boolean`\>

boolean

#### Defined in

[src/wallet/connect.ts:60](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/wallet/connect.ts#L60)

---

### switchStarknetChain

▸ **switchStarknetChain**(`swo`, `chainId`): `Promise`<`boolean`\>

Request Wallet Network change

#### Parameters

| Name      | Type                                                                                           | Description     |
| :-------- | :--------------------------------------------------------------------------------------------- | :-------------- |
| `swo`     | [`StarknetWindowObject`](../interfaces/types.RPC.RPCSPEC07.WALLET_API.StarknetWindowObject.md) | -               |
| `chainId` | `string`                                                                                       | StarknetChainId |

#### Returns

`Promise`<`boolean`\>

boolean

#### Defined in

[src/wallet/connect.ts:73](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/wallet/connect.ts#L73)

---

### requestChainId

▸ **requestChainId**(`swo`): `Promise`<[`ChainId`](types.RPC.RPCSPEC07.API.md#chainid)\>

Request the current chain ID from the wallet.

#### Parameters

| Name  | Type                                                                                           |
| :---- | :--------------------------------------------------------------------------------------------- |
| `swo` | [`StarknetWindowObject`](../interfaces/types.RPC.RPCSPEC07.WALLET_API.StarknetWindowObject.md) |

#### Returns

`Promise`<[`ChainId`](types.RPC.RPCSPEC07.API.md#chainid)\>

The current Starknet chain ID.

#### Defined in

[src/wallet/connect.ts:84](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/wallet/connect.ts#L84)

---

### deploymentData

▸ **deploymentData**(`swo`): `Promise`<[`AccountDeploymentData`](../interfaces/types.RPC.RPCSPEC07.WALLET_API.AccountDeploymentData.md)\>

Get deployment data for a contract.

#### Parameters

| Name  | Type                                                                                           |
| :---- | :--------------------------------------------------------------------------------------------- |
| `swo` | [`StarknetWindowObject`](../interfaces/types.RPC.RPCSPEC07.WALLET_API.StarknetWindowObject.md) |

#### Returns

`Promise`<[`AccountDeploymentData`](../interfaces/types.RPC.RPCSPEC07.WALLET_API.AccountDeploymentData.md)\>

The deployment data result.

#### Defined in

[src/wallet/connect.ts:92](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/wallet/connect.ts#L92)

---

### addInvokeTransaction

▸ **addInvokeTransaction**(`swo`, `params`): `Promise`<[`AddInvokeTransactionResult`](../interfaces/types.RPC.RPCSPEC07.WALLET_API.AddInvokeTransactionResult.md)\>

Add an invoke transaction to the wallet.

#### Parameters

| Name     | Type                                                                                                               | Description                                         |
| :------- | :----------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------- |
| `swo`    | [`StarknetWindowObject`](../interfaces/types.RPC.RPCSPEC07.WALLET_API.StarknetWindowObject.md)                     | -                                                   |
| `params` | [`AddInvokeTransactionParameters`](../interfaces/types.RPC.RPCSPEC07.WALLET_API.AddInvokeTransactionParameters.md) | The parameters required for the invoke transaction. |

#### Returns

`Promise`<[`AddInvokeTransactionResult`](../interfaces/types.RPC.RPCSPEC07.WALLET_API.AddInvokeTransactionResult.md)\>

The result of adding the invoke transaction.

#### Defined in

[src/wallet/connect.ts:101](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/wallet/connect.ts#L101)

---

### addDeclareTransaction

▸ **addDeclareTransaction**(`swo`, `params`): `Promise`<[`AddDeclareTransactionResult`](../interfaces/types.RPC.RPCSPEC07.WALLET_API.AddDeclareTransactionResult.md)\>

Add a declare transaction to the wallet.

#### Parameters

| Name     | Type                                                                                                                 | Description                                          |
| :------- | :------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------- |
| `swo`    | [`StarknetWindowObject`](../interfaces/types.RPC.RPCSPEC07.WALLET_API.StarknetWindowObject.md)                       | -                                                    |
| `params` | [`AddDeclareTransactionParameters`](../interfaces/types.RPC.RPCSPEC07.WALLET_API.AddDeclareTransactionParameters.md) | The parameters required for the declare transaction. |

#### Returns

`Promise`<[`AddDeclareTransactionResult`](../interfaces/types.RPC.RPCSPEC07.WALLET_API.AddDeclareTransactionResult.md)\>

The result of adding the declare transaction.

#### Defined in

[src/wallet/connect.ts:113](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/wallet/connect.ts#L113)

---

### signMessage

▸ **signMessage**(`swo`, `typedData`): `Promise`<[`Signature`](types.RPC.RPCSPEC07.WALLET_API.md#signature)\>

Sign typed data using the wallet.

#### Parameters

| Name        | Type                                                                                           | Description                                                   |
| :---------- | :--------------------------------------------------------------------------------------------- | :------------------------------------------------------------ |
| `swo`       | [`StarknetWindowObject`](../interfaces/types.RPC.RPCSPEC07.WALLET_API.StarknetWindowObject.md) | the starknet (wallet) window object to request the signature. |
| `typedData` | [`TypedData`](../interfaces/types.RPC.RPCSPEC07.WALLET_API.TypedData.md)                       | The typed data to sign.                                       |

#### Returns

`Promise`<[`Signature`](types.RPC.RPCSPEC07.WALLET_API.md#signature)\>

An array of signatures as strings.

#### Defined in

[src/wallet/connect.ts:126](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/wallet/connect.ts#L126)

---

### supportedSpecs

▸ **supportedSpecs**(`swo`): `Promise`<[`SpecVersion`](types.RPC.RPCSPEC07.WALLET_API.md#specversion)[]\>

Get the list of supported specifications.

#### Parameters

| Name  | Type                                                                                           |
| :---- | :--------------------------------------------------------------------------------------------- |
| `swo` | [`StarknetWindowObject`](../interfaces/types.RPC.RPCSPEC07.WALLET_API.StarknetWindowObject.md) |

#### Returns

`Promise`<[`SpecVersion`](types.RPC.RPCSPEC07.WALLET_API.md#specversion)[]\>

An array of supported specification strings.

#### Defined in

[src/wallet/connect.ts:134](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/wallet/connect.ts#L134)

---

### onAccountChange

▸ **onAccountChange**(`swo`, `callback`): `void`

Attaches an event handler function to the "accountsChanged" event of a StarknetWindowObject.
When the accounts are changed, the specified callback function will be called.

#### Parameters

| Name       | Type                                                                                           | Description                                                                                                   |
| :--------- | :--------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------ |
| `swo`      | [`StarknetWindowObject`](../interfaces/types.RPC.RPCSPEC07.WALLET_API.StarknetWindowObject.md) | The StarknetWindowObject to attach the event handler to.                                                      |
| `callback` | [`AccountChangeEventHandler`](types.RPC.RPCSPEC07.WALLET_API.md#accountchangeeventhandler)     | The function to be called when the accounts are changed. It will receive the changed accounts as a parameter. |

#### Returns

`void`

#### Defined in

[src/wallet/connect.ts:147](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/wallet/connect.ts#L147)

---

### onNetworkChanged

▸ **onNetworkChanged**(`swo`, `callback`): `void`

Register a callback function to be called when the network is changed.

#### Parameters

| Name       | Type                                                                                           | Description                                                     |
| :--------- | :--------------------------------------------------------------------------------------------- | :-------------------------------------------------------------- |
| `swo`      | [`StarknetWindowObject`](../interfaces/types.RPC.RPCSPEC07.WALLET_API.StarknetWindowObject.md) | The StarknetWindowObject instance.                              |
| `callback` | [`NetworkChangeEventHandler`](types.RPC.RPCSPEC07.WALLET_API.md#networkchangeeventhandler)     | The callback function to be called when the network is changed. |

#### Returns

`void`

#### Defined in

[src/wallet/connect.ts:161](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/wallet/connect.ts#L161)
