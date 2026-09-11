# Function: signMessage()

> **signMessage**(`walletWSF`, `typedData`): `Promise`\<`SIGNATURE`\>

Defined in: [src/wallet/connectV5.ts:173](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/wallet/connectV5.ts#L173)

Sign typed data using the wallet.

## Parameters

### walletWSF

`WalletWithStarknetFeatures`

The get-starknet V5 wallet object to use.

### typedData

`TypedData`

The typed data to sign.

## Returns

`Promise`\<`SIGNATURE`\>

An array of signatures as strings.
