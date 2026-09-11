# Function: switchStarknetChain()

> **switchStarknetChain**(`walletWSF`, `chainId`): `Promise`\<`boolean`\>

Defined in: [src/wallet/connectV5.ts:105](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/wallet/connectV5.ts#L105)

Request Wallet Network change

## Parameters

### walletWSF

`WalletWithStarknetFeatures`

The get-starknet V5 wallet object to use.

### chainId

`string`

encoded name of the chain requested.

## Returns

`Promise`\<`boolean`\>

true if the chain was changed successfully
