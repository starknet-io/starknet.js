# Function: subscribeWalletEvent()

> **subscribeWalletEvent**(`walletWSF`, `callback`): () => `void`

Defined in: [src/wallet/connectV5.ts:208](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/wallet/connectV5.ts#L208)

Attaches an event handler function for the changes of network and account.
When the account/network are changed, the specified callback function will be called.

## Parameters

### walletWSF

`WalletWithStarknetFeatures`

The get-starknet V5 wallet object to use.

### callback

(`change`) => `void`

The function to be called when the account/network are changed.

## Returns

function to execute to unsubscribe events.

() => `void`
