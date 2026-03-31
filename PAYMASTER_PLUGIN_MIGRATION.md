# Paymaster Plugin Migration — Breaking Changes

## Summary

The SNIP-29 paymaster functionality has been extracted from core modules into `src/plugins/paymaster/`. All paymaster-specific code now lives exclusively in the plugin directory. The paymaster plugin is installed by default, so `account.executePaymasterTransaction()` and other methods work out of the box.

---

## Top-level Named Exports

| Old export                    | New export                         | Breaking?                                                           |
| ----------------------------- | ---------------------------------- | ------------------------------------------------------------------- |
| `PaymasterRpc`                | `PaymasterRpc`                     | No                                                                  |
| `PaymasterInterface`          | `PaymasterInterface`               | No                                                                  |
| `type PaymasterDetails`       | Removed from top-level             | **Yes** — import from `'starknet/plugins/paymaster'`                |
| `type PaymasterFeeEstimate`   | Removed from top-level             | **Yes** — import from `'starknet/plugins/paymaster'`                |
| `type PaymasterOptions`       | Removed from top-level             | **Yes** — import from `'starknet/plugins/paymaster'`                |
| `type PaymasterRpcOptions`    | Removed from top-level             | **Yes** — import from `'starknet/plugins/paymaster'`                |
| `type PaymasterTimeBounds`    | Removed from top-level             | **Yes** — import from `'starknet/plugins/paymaster'`                |
| `paymaster` (utils namespace) | Removed                            | **Yes** — use `paymasterUtils` or import utils directly from plugin |
| —                             | `paymasterPlugin` (factory fn)     | New                                                                 |
| —                             | `paymasterUtils` (utils namespace) | New                                                                 |
| —                             | `type PaymasterAccountMethods`     | New                                                                 |
| —                             | `type PaymasterContractMethods`    | New                                                                 |

### Migration examples

```typescript
// OLD:
import { PaymasterDetails, PaymasterFeeEstimate, paymaster } from 'starknet';
paymaster.getDefaultPaymasterNodeUrl();

// NEW:
import { paymasterUtils } from 'starknet';
import type { PaymasterDetails, PaymasterFeeEstimate } from 'starknet/plugins/paymaster';
paymasterUtils.getDefaultPaymasterNodeUrl();
```

---

## Account API

| Old API                                             | New API                                        | Breaking?                                                                |
| --------------------------------------------------- | ---------------------------------------------- | ------------------------------------------------------------------------ |
| `AccountOptions.paymaster`                          | `AccountOptions.plugins: { paymaster: ... }`   | **Yes**                                                                  |
| `account.paymaster` (class property)                | `account.paymaster` (plugin-injected property) | No — same access pattern                                                 |
| `account.buildPaymasterTransaction()`               | Same (now from plugin)                         | No                                                                       |
| `account.estimatePaymasterTransactionFee()`         | Same (now from plugin)                         | No                                                                       |
| `account.executePaymasterTransaction()`             | Same (now from plugin)                         | No                                                                       |
| `account.preparePaymasterTransaction()`             | Same (now from plugin)                         | No                                                                       |
| —                                                   | `account.isPaymasterAvailable()`               | New                                                                      |
| —                                                   | `account.getPaymasterSupportedTokens()`        | New                                                                      |
| `AccountInterface` had 3 abstract paymaster methods | Removed from abstract class                    | **Yes** — custom `AccountInterface` implementations no longer need these |

### Migration examples

```typescript
// OLD:
const account = new Account({
  provider,
  address,
  signer,
  paymaster: { nodeUrl: 'https://custom.paymaster.url' },
});

// NEW (default — auto-configured, no config needed):
const account = new Account({ provider, address, signer });

// NEW (custom paymaster URL):
const account = new Account({
  provider,
  address,
  signer,
  plugins: { paymaster: { nodeUrl: 'https://custom.paymaster.url' } },
});

// NEW (disable paymaster):
const account = new Account({
  provider,
  address,
  signer,
  plugins: { paymaster: false },
});
```

---

## Contract API

| Old API                                                                              | New API                                                 | Breaking?                |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------- | ------------------------ |
| `contract.invoke(m, args, { paymasterDetails })`                                     | `contract.invokePaymaster(m, args, paymasterDetails)`   | **Yes** — renamed method |
| `contract.estimate(m, args, { paymasterDetails })`                                   | `contract.estimatePaymaster(m, args, paymasterDetails)` | **Yes** — renamed method |
| `ExecuteOptions.paymasterDetails`                                                    | Removed                                                 | **Yes**                  |
| `ExecuteOptions.maxFeeInGasToken`                                                    | Removed                                                 | **Yes**                  |
| `contract.estimate()` returned `EstimateFeeResponseOverhead \| PaymasterFeeEstimate` | Returns only `EstimateFeeResponseOverhead`              | **Yes**                  |
| —                                                                                    | `contract.invokePaymaster()` (plugin-injected)          | New                      |
| —                                                                                    | `contract.estimatePaymaster()` (plugin-injected)        | New                      |
| —                                                                                    | `type PaymasterContractMethods`                         | New                      |

Contract paymaster methods are injected automatically by the paymaster plugin's `contractExtend` hook when a Contract is connected to an Account that has the paymaster plugin installed. No paymaster knowledge exists in the Contract core — it comes entirely from the plugin.

### Migration examples

```typescript
// OLD:
const fee = await contract.estimate('transfer', [to, amount], { paymasterDetails });
const res = await contract.invoke('transfer', [to, amount], { paymasterDetails });

// NEW — contract-level convenience methods (plugin-injected):
const fee = await contract.estimatePaymaster('transfer', [to, amount], paymasterDetails);
const res = await contract.invokePaymaster('transfer', [to, amount], paymasterDetails);

// NEW — alternatively, use account methods directly:
const call = contract.populate('transfer', [to, amount]);
const fee = await account.estimatePaymasterTransactionFee([call], paymasterDetails);
const res = await account.executePaymasterTransaction([call], paymasterDetails);
```

---

## Wallet API

| Old API                                                               | New API                                                    | Breaking?                           |
| --------------------------------------------------------------------- | ---------------------------------------------------------- | ----------------------------------- |
| `WalletAccount.connect(provider, wallet, cairo, paymaster, silent)`   | `WalletAccount.connect(provider, wallet, cairo, silent)`   | **Yes** — `paymaster` param removed |
| `WalletAccountV5.connect(provider, wallet, cairo, paymaster, silent)` | `WalletAccountV5.connect(provider, wallet, cairo, silent)` | **Yes** — `paymaster` param removed |
| `WalletAccountV4Options.paymaster`                                    | Removed                                                    | **Yes**                             |
| `WalletAccountV5Options.paymaster`                                    | Removed                                                    | **Yes**                             |

---

## Constants

| Old                             | New                             | Breaking?                                      |
| ------------------------------- | ------------------------------- | ---------------------------------------------- |
| `constants.PAYMASTER_RPC_NODES` | Removed from `global/constants` | **Yes** — moved to plugin internal, not public |

---

## Plugin System — `contractExtend` Hook

The `StarknetPlugin` interface now supports a third type parameter `TContractMethods` and a `contractExtend` method:

```typescript
interface StarknetPlugin<TProviderMethods, TAccountMethods, TContractMethods> {
  // ...existing methods...
  contractExtend?(contract: ContractInterface, account: AccountInterface): TContractMethods;
}
```

- `contractExtend` is called automatically in the Contract constructor when connected to an Account with plugins
- It receives both the Contract and the Account so the plugin can delegate to account-level methods
- No `PluginManager` is created on Contract — it reuses the Account's registered plugins
- `PluginManager.installOnContract()` handles calling `contractExtend` and assigning methods

---

## Non-breaking Changes

- `PaymasterRpc` and `PaymasterInterface` remain importable from `'starknet'`
- `account.paymaster` property still works (now injected by plugin via `Object.assign`)
- All paymaster account methods (`executePaymasterTransaction`, etc.) work identically — they are just provided by the plugin augmentation instead of the abstract class
- Paymaster plugin is a **default plugin** — installed automatically unless explicitly disabled
- `contract.invokePaymaster()` and `contract.estimatePaymaster()` are available on any Contract connected to an Account with the paymaster plugin
- `src/utils/src5.ts` `supportsInterface` now accepts `ProviderInterface` instead of `RpcProvider` (wider type, non-breaking)
