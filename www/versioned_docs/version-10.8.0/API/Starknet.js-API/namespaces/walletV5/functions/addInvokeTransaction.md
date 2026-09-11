# Function: addInvokeTransaction()

> **addInvokeTransaction**(`walletWSF`, `params`): `Promise`\<`AddInvokeTransactionResult`\>

Defined in: [src/wallet/connectV5.ts:141](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/wallet/connectV5.ts#L141)

Add an invoke transaction to the wallet.

## Parameters

### walletWSF

`WalletWithStarknetFeatures`

The get-starknet V5 wallet object to use.

### params

`AddInvokeTransactionParameters`

The parameters required for the invoke transaction.

## Returns

`Promise`\<`AddInvokeTransactionResult`\>

The result of adding the invoke transaction.
