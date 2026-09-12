# Type Alias: AccountOptions

> **AccountOptions** = `object` & [`PluginConfig`](../interfaces/PluginConfig.md)

Defined in: [src/account/types/index.type.ts:31](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/types/index.type.ts#L31)

Configuration options for creating an Account instance

## Type Declaration

### provider

> **provider**: [`ProviderOptions`](../interfaces/ProviderOptions.md) \| [`ProviderInterface`](../classes/ProviderInterface.md)

Provider instance or configuration for blockchain interaction

### address

> **address**: `string`

Account address on the Starknet network

### signer

> **signer**: `Uint8Array` \| `string` \| [`SignerInterface`](../classes/SignerInterface.md)

Private key or Signer Class instance for signing transactions

### cairoVersion?

> `optional` **cairoVersion?**: [`CairoVersion`](CairoVersion.md)

Cairo version to use for this account (optional, auto-detected if not provided)

### transactionVersion?

> `optional` **transactionVersion?**: [`SupportedTransactionVersion`](../Starknet.js-API/namespaces/constants/type-aliases/SupportedTransactionVersion.md)

Transaction version to use for sending transactions (optional)

### paymaster?

> `optional` **paymaster?**: [`PaymasterOptions`](../interfaces/PaymasterOptions.md) \| [`PaymasterInterface`](../classes/PaymasterInterface.md)

Paymaster configuration for sponsored transactions (optional)

### deployer?

> `optional` **deployer?**: [`DeployerInterface`](../classes/DeployerInterface.md)

Use of a custom account deployer contract (optional)

### defaultTipType?

> `optional` **defaultTipType?**: [`TipType`](TipType.md)

Default tip type to use for sending transactions (optional)

#### Default

```ts
'recommendedTip';
```
