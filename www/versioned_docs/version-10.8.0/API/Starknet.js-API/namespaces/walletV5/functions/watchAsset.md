# Function: watchAsset()

> **watchAsset**(`walletWSF`, `asset`): `Promise`\<`boolean`\>

Defined in: [src/wallet/connectV5.ts:73](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/wallet/connectV5.ts#L73)

Request adding an ERC20 Token to the Wallet List

## Parameters

### walletWSF

`WalletWithStarknetFeatures`

The get-starknet V5 wallet object to use.

### asset

`WatchAssetParameters`

description of the token to add.

## Returns

`Promise`\<`boolean`\>

true if the token was added successfully
