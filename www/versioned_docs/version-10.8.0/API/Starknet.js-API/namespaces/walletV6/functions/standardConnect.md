# Function: standardConnect()

> **standardConnect**(`walletWSF`, `silent_mode?`): `Promise`\<`StandardConnectOutput`\>

Defined in: [src/wallet/connectV6.ts:40](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/wallet/connectV6.ts#L40)

Connect the DApp to the wallet through the wallet-standard `standard:connect` feature.

Besides authorizing the accounts, this primes the wallet-standard wrapper internal
state (its `#account`). This priming is mandatory: the wrapper only bridges the wallet
legacy `accountsChanged` / `networkChanged` events to the `standard:events` "change"
event (consumed by [subscribeWalletEvent](subscribeWalletEvent.md)) once it has been connected this way.
Without it, account/network change events never reach the DApp.

## Parameters

### walletWSF

`WalletWithStarknetFeatures`

The get-starknet V6 wallet object to use.

### silent_mode?

`boolean` = `false`

false: request user interaction allowance. true: return only pre-allowed accounts.

## Returns

`Promise`\<`StandardConnectOutput`\>

the wallet-standard accounts the DApp is authorized to use.
