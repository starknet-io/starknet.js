# Function: getPermissions()

> **getPermissions**(`walletWSF`): `Promise`\<`"accounts"`[]\>

Defined in: [src/wallet/connectV5.ts:63](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/wallet/connectV5.ts#L63)

Request if DAPP is connected to wallet.

## Parameters

### walletWSF

`WalletWithStarknetFeatures`

The get-starknet V5 wallet object to use.

## Returns

`Promise`\<`"accounts"`[]\>

"accounts" if permission granted
