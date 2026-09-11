# Function: requestAccounts()

> **requestAccounts**(`walletWSF`, `silent_mode?`): `Promise`\<`string`[]\>

Defined in: [src/wallet/connectV5.ts:48](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/wallet/connectV5.ts#L48)

Request Permission for wallet account, return addresses that are allowed by user

## Parameters

### walletWSF

`WalletWithStarknetFeatures`

The get-starknet V5 wallet object to use.

### silent_mode?

`boolean` = `false`

false: request user interaction allowance. true: return only pre-allowed

## Returns

`Promise`\<`string`[]\>

allowed accounts addresses
