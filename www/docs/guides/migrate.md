---
sidebar_position: 12
---

# Migrate from v9 to v10

This document covers the breaking changes in v10 and how to migrate your code.

If you encounter any missing changes, please let us know and we will update this guide.

## Quick Summary

**Main breaking changes in v10:**

1. **Account Composition** - Account no longer extends Provider, uses composition instead
2. **Plugin Class Names** - `StarknetId` → `StarknetIdImpl`, `BrotherId` → `BrotherIdImpl`
3. **Plugin Import Paths** - `provider/extensions/` → package root
4. **Compression Functions** - `compressProgram()` and `decompressProgram()` are now async
5. **SimulateTransaction Response** - `SimulateTransactionOverheadResponse` changed from array to object
6. **Provider fetch() Method** - Now `async` (low impact)
7. **Removed Global Singletons** - `defaultProvider` and `defaultPaymaster` removed, use `RpcProvider.create()` instead
8. **ts-mixer Removed** - No longer a dependency
9. **getStorageAt() Return Type** - Now returns `STORAGE_RESULT` object instead of `string`
10. **fastExecute Moved to a Plugin** - `account.fastExecute()` and `provider.fastWaitForTransaction()` now come from the `fastExecute` plugin
11. **Paymaster Option Renamed** - `PaymasterRpcOptions.default` → `mute`
12. **felt252 Validation** - `CairoFelt()` now throws on out-of-range values, and `CairoFelt252.toApiRequest()` returns decimal
13. **RPC Namespace Renames** - `RPCSPEC010` → `RPCSPEC0103`, `RPC010` → `RPC0102` / `RPC0103`

### Breaking Changes Summary

| Change                                                           | Severity   | Impact                                                    |
| ---------------------------------------------------------------- | ---------- | --------------------------------------------------------- |
| Account composition (`account.xyz()` → `account.provider.xyz()`) | **High**   | All provider method calls on Account must be updated      |
| Removed `defaultProvider` and `defaultPaymaster` singletons      | **Medium** | Use `await RpcProvider.create()` or `new PaymasterRpc()`  |
| `getStorageAt()` returns object instead of string                | **Medium** | Must use `.value` property to access FELT value           |
| Compression functions now async (`await compressProgram()`)      | **Medium** | Also `parseContract()` and the contract-class helpers     |
| Plugin class renames (`StarknetId` → `StarknetIdImpl`)           | **Medium** | Only affects direct imports of these classes              |
| Plugin import paths (`extensions/` → package root)               | **Medium** | Only affects direct imports                               |
| `SimulateTransactionOverheadResponse` is now an object           | **Medium** | Must access `.simulated_transactions` for the array       |
| `fastExecute` is now a plugin                                    | **Medium** | Types renamed; methods disappear with `plugins: false`    |
| `RPCSPEC010` / `RPC010` namespaces renamed                       | **Medium** | Only affects raw spec types and direct channel imports    |
| `PaymasterRpcOptions.default` renamed to `mute`                  | **Low**    | Only affects manual `PaymasterRpc` construction           |
| felt252 range validation is now enforced                         | **Low**    | Out-of-range values used to pass silently, they now throw |
| `Storage` response type renamed to `StorageResponse`             | **Low**    | Only affects code importing the type                      |
| Removed `default` parameter from RPC options                     | **Low**    | Parameter was only used by removed singletons             |
| `fetch()` is now `async`                                         | **Low**    | Already returned Promise, minimal impact                  |
| `ts-mixer` and `pako` removed                                    | **Low**    | Only affects if you used them as transitive dependencies  |
| `plugins: false` disables defaults                               | **Info**   | Behavioral change, intentional opt-out                    |

**Quick migration steps:**

```bash
# Update package
npm install starknet@^10.0.0
```

```typescript
// Update Account provider method calls
const receipt = await account.provider.waitForTransaction(txHash); // ✅ Was account.waitForTransaction()
const storage = await account.provider.getStorageAt(address, key); // ✅ Was account.getStorageAt()
const chainId = await account.provider.getChainId(); // ✅ Was account.getChainId()

// Plugin methods still work directly on account (no change needed)
const name = await account.getStarkName(); // ✅ Still works
const address = await account.getAddressFromStarkName('example.stark'); // ✅ Still works

// Update plugin imports (only if you import them directly)
import { StarknetIdImpl } from 'starknet'; // ✅ Was StarknetId
import { BrotherIdImpl } from 'starknet'; // ✅ Was BrotherId
```

## Breaking Change 1: Account Composition

### What Changed

In v9, `Account` extended `Provider`, giving direct access to all provider methods:

**❌ v9 (no longer works):**

```typescript
const account = new Account({ provider, address, signer: privateKey });

await account.waitForTransaction(txHash);
await account.getBlock('latest');
await account.getChainId();
```

**✅ v10:**

```typescript
const account = new Account({ provider, address, signer: privateKey });

// Provider methods now require .provider
await account.provider.waitForTransaction(txHash);
await account.provider.getBlock('latest');
await account.provider.getChainId();

// Account methods still work directly
await account.execute(calls);
await account.signMessage(typedData);
```

### Why This Change?

The composition pattern provides:

- **Clear separation** - Account handles account operations, Provider handles blockchain queries
- **Better type safety** - No method signature conflicts
- **Plugin compatibility** - Plugins can extend Account without inheritance issues

### Migration Guide

Update all provider method calls on Account instances to use `.provider`:

```typescript
// Block & State queries
account.getBlock() → account.provider.getBlock()
account.getBlockWithTxHashes() → account.provider.getBlockWithTxHashes()
account.getStateUpdate() → account.provider.getStateUpdate()
account.getStorageAt() → account.provider.getStorageAt()

// Transaction queries
account.getTransaction() → account.provider.getTransaction()
account.getTransactionReceipt() → account.provider.getTransactionReceipt()
account.waitForTransaction() → account.provider.waitForTransaction()

// Contract & Class queries
account.getClassAt() → account.provider.getClassAt()
account.getClassByHash() → account.provider.getClassByHash()
account.getClassHashAt() → account.provider.getClassHashAt()
account.callContract() → account.provider.callContract()

// Network queries
account.getChainId() → account.provider.getChainId()
account.getSpecVersion() → account.provider.getSpecVersion()
```

**These methods DON'T need changes** (they're account-specific):

```typescript
// Execution & signing (no change)
account.execute(calls);
account.declare(contract);
account.deploy(payload);
account.signMessage(typedData);

// Fee estimation (no change)
account.estimateInvokeFee(calls);
account.estimateDeclareFee(contract);

// Account queries (no change)
account.getNonce();
account.getCairoVersion();

// Plugin methods (no change)
account.getStarkName();
account.getAddressFromStarkName('name.stark');
```

## Breaking Change 2: Removed Global Singletons

### What Changed

In v10, the global singleton exports `defaultProvider` and `defaultPaymaster` have been removed to promote explicit initialization and better resource management.

**❌ v9 (no longer works):**

```typescript
import { defaultProvider, defaultPaymaster } from 'starknet';

// These no longer exist
const result = await defaultProvider.getBlock('latest');
const tokens = await defaultPaymaster.getSupportedTokens();
```

**✅ v10:**

```typescript
// For Provider: Use RpcProvider.create() for automatic node version detection
const myProvider = await RpcProvider.create();
const myProvider = await RpcProvider.create({ nodeUrl: constants.NetworkName.SN_MAIN });

// Or create manually if you know the RPC version
const myProvider = new RpcProvider({ nodeUrl: '...' });

// For Paymaster: Create a new instance
const myPaymaster = new PaymasterRpc();
const myPaymaster = new PaymasterRpc({ nodeUrl: 'https://sepolia.paymaster.avnu.fi' });

// Usage
const result = await myProvider.getBlock('latest');
const tokens = await myPaymaster.getSupportedTokens();
```

### Why This Change?

**Benefits:**

- **No implicit global state** - Clearer resource management and easier testing
- **Auto node detection** - `RpcProvider.create()` automatically detects the node's RPC version
- **Explicit initialization** - Your code is more transparent about which provider instance you're using
- **Better contracts** - No hidden provider creation for contracts that don't provide one

### Contract Class Changes

Contracts now auto-initialize a provider on first async method call if none is provided:

```typescript
// v9 - Used global defaultProvider implicitly
const contract = new Contract({ abi, address });
const result = await contract.call('balanceOf', [address]); // Used defaultProvider

// v10 - Still works, but creates provider on first use
const contract = new Contract({ abi, address });
const result = await contract.call('balanceOf', [address]); // Creates provider via RpcProvider.create()

// Better: Provide explicit provider
const provider = await RpcProvider.create({ nodeUrl });
const contract = new Contract({ abi, address, providerOrAccount: provider });
const result = await contract.call('balanceOf', [address]);
```

## Breaking Change 3: Plugin System

### What Changed

The mixin-based extension system using `ts-mixer` has been replaced with a plugin architecture.

#### Class Name Changes

**❌ v9 (deprecated):**

```typescript
import { StarknetId, BrotherId } from 'starknet';

const name = await StarknetId.getStarkName(provider, address);
const name2 = await BrotherId.getBrotherName(provider, address);
```

**✅ v10:**

```typescript
import { StarknetIdImpl, BrotherIdImpl } from 'starknet';

const name = await StarknetIdImpl.getStarkName(provider, address);
const name2 = await BrotherIdImpl.getBrotherName(provider, address);
```

#### Import Path Changes

**❌ v9 (removed):**

```typescript
import { StarknetId } from 'starknet/provider/extensions/starknetId';
```

**✅ v10:**

```typescript
import { StarknetIdImpl } from 'starknet';
// Or, for the plugin factory (see "Disabling or Customizing Plugins" below):
import { starknetIdPlugin } from 'starknet';
```

:::caution
The StarknetId plugin factory is named **`starknetIdPlugin`**, not `starknetId`: the bare
`starknetId` name is already taken by the utility namespace (`starknetId.useEncoded`,
`starknetId.isStarkDomain`, ...), exactly as in v9. The two other factories keep their plain
names, `brotherId()` and `fastExecute()`.
:::

### Default Behavior

**Good news:** For most users, plugins work the same way. The StarknetId, BrotherId and fastExecute plugins are **automatically installed** by default:

```typescript
// These work out of the box in v10 (no changes needed)
const provider = new RpcProvider({ nodeUrl });
await provider.getStarkName(address); // ✅ Works

const account = new Account({ provider, address, signer: privateKey });
await account.getStarkName(); // ✅ Works
```

### Disabling or Customizing Plugins

If you want to disable default plugins or use custom ones:

```typescript
// Disable all plugins
const provider = new RpcProvider({
  nodeUrl,
  plugins: false,
});

// Use specific plugins only
import { starknetIdPlugin, brotherId, fastExecute } from 'starknet';

const provider = new RpcProvider({
  nodeUrl,
  plugins: [starknetIdPlugin()],
});

// Add custom plugins
import { defaultPlugins } from 'starknet';

const provider = new RpcProvider({
  nodeUrl,
  plugins: [...defaultPlugins, myCustomPlugin()],
});
```

For more details on creating and using plugins, see the [Plugin System Guide](./plugins.md).

## Breaking Change 4: Provider fetch() Method

### What Changed

The `RpcProvider.fetch()` method is now `async`:

**❌ v9:**

```typescript
// fetch() was synchronous, returned Promise directly
public fetch(method: string, params?: object) {
  return this.channel.fetch(method, params);
}
```

**✅ v10:**

```typescript
// fetch() is now async, wraps plugin hooks
public async fetch(method: string, params?: object) {
  const hookResult = this.pluginManager.runProviderHook('beforeRequest', { method, params });
  const result = await this.channel.fetch(finalMethod, finalParams);
  return this.pluginManager.runProviderHook('afterRequest', { method, params, result }) ?? result;
}
```

### Impact

**Low impact** - The method already returned a Promise, so most code using `await provider.fetch()` will continue to work.

**Potential issue:** If you were using `.then()` chains that depended on the exact return type, or catching synchronous errors from `fetch()`, the behavior may differ slightly.

```typescript
// This still works (no change needed)
const result = await provider.fetch('starknet_getBlockWithTxHashes', { block_id: 'latest' });

// This also still works
provider.fetch('starknet_chainId').then((result) => console.log(result));
```

## Breaking Change 5: Compression Functions Now Async

### What Changed

The `compressProgram()` and `decompressProgram()` functions are now async. This change was made to replace the `pako` dependency with native Compression Streams API (available in Node 17+ and modern browsers), saving ~45KB in bundle size.

**❌ v9:**

```typescript
import { stark } from 'starknet';

// Synchronous
const compressed = stark.compressProgram(program);
const decompressed = stark.decompressProgram(compressed);
```

**✅ v10:**

```typescript
import { stark } from 'starknet';

// Now async - must use await
const compressed = await stark.compressProgram(program);
const decompressed = await stark.decompressProgram(compressed);
```

### Impact

**Medium impact** - Only affects code that directly uses these compression utilities.

**Who is affected:**

- Users manually compressing/decompressing Cairo 0 programs
- Users calling one of the contract-class helpers that internally compress, which became async
  for the same reason: `parseContract()`, `createSierraContractClass()` and
  `contractClassResponseToLegacyCompiledContract()`
- Advanced use cases involving manual contract compilation

**Who is NOT affected:**

- Users only using `account.declare()` and `account.deploy()` - these already handle compression internally and are already async

### Migration

Add `await` to all compression function calls:

```typescript
// Before (v9)
function processContract(program) {
  const compressed = stark.compressProgram(program);
  return compressed;
}

// After (v10)
async function processContract(program) {
  const compressed = await stark.compressProgram(program);
  return compressed;
}
```

The same applies to the contract-class helpers:

```typescript
import { provider, contractClassResponseToLegacyCompiledContract } from 'starknet';

// Before (v9)
const contractClass = provider.parseContract(compiledContract);
const sierra = provider.createSierraContractClass(compiledSierra);
const legacy = contractClassResponseToLegacyCompiledContract(response);

// After (v10)
const contractClass = await provider.parseContract(compiledContract);
const sierra = await provider.createSierraContractClass(compiledSierra);
const legacy = await contractClassResponseToLegacyCompiledContract(response);
```

## Breaking Change 6: SimulateTransaction Response Structure

### What Changed

`SimulateTransactionOverheadResponse` changed from an array to an object. The array is now nested under a `simulated_transactions` property, and a new optional `initial_reads` field is available (RPC 0.10.1+).

**❌ v9:**

```typescript
const result = await provider.getSimulateTransaction(invocations, options);

// result was an array
result.forEach((tx) => {
  console.log(tx.transaction_trace);
  console.log(tx.overall_fee);
});

const first = result[0];
const count = result.length;
```

**✅ v10:**

```typescript
const result = await provider.getSimulateTransaction(invocations, options);

// result is now an object with simulated_transactions array
result.simulated_transactions.forEach((tx) => {
  console.log(tx.transaction_trace);
  console.log(tx.overall_fee);
});

const first = result.simulated_transactions[0];
const count = result.simulated_transactions.length;

// New: optional initial storage reads (when using returnInitialReads option)
if (result.initial_reads) {
  console.log(result.initial_reads);
}
```

### Impact

**Medium impact** - Affects all code that uses `getSimulateTransaction()` and iterates over or indexes into the result directly.

### Migration

Replace direct array access with `.simulated_transactions`:

```typescript
// Before (v9)
const simResult = await provider.getSimulateTransaction(invocations, options);
const fee = simResult[0].overall_fee;
const traces = simResult.map((s) => s.transaction_trace);

// After (v10)
const simResult = await provider.getSimulateTransaction(invocations, options);
const fee = simResult.simulated_transactions[0].overall_fee;
const traces = simResult.simulated_transactions.map((s) => s.transaction_trace);
```

## Breaking Change 7: ts-mixer Removed

### What Changed

The `ts-mixer` dependency has been completely removed from the library.

**❌ v9:**

- Account used `ts-mixer` to inherit from both custom logic and Provider
- Extensions used `ts-mixer` to mix in StarknetId and BrotherId

**✅ v10:**

- Account uses composition (has a `provider` property)
- Extensions use the plugin system

### Migration

If your code didn't directly use `ts-mixer`, no changes are needed. If you were relying on `ts-mixer` behavior:

1. Use the new plugin system for extensions
2. Access provider methods via `account.provider`
3. If you depended on `ts-mixer` as a transitive dependency, add it directly to your `package.json`

## Breaking Change 8: getStorageAt() Return Type

### What Changed

The `getStorageAt()` method now returns a `STORAGE_RESULT` object instead of a plain string. The
response type exported by the library was renamed accordingly: `Storage` → `StorageResponse`.

**❌ v9:**

```typescript
const value = await provider.getStorageAt(address, key);
const felt = BigInt(value); // ✗ Error: value is now an object
```

**✅ v10:**

```typescript
const result = await provider.getStorageAt(address, key);
const felt = BigInt(result.value); // ✓ Access .value property

// Result structure:
// {
//   value: string (FELT),
//   last_update_block: number
// }
```

### Why This Change?

The RPC spec 0.10.1 now supports optional metadata with storage responses, allowing you to get the block number when the storage was last modified.

### Migration Guide

Replace direct usage with `.value` property access:

```typescript
// Before:
const storage = await provider.getStorageAt(addr, key);
const felt = BigInt(storage);

// After:
const storage = await provider.getStorageAt(addr, key);
const felt = BigInt(storage.value);

// Or destructure if you need the metadata:
const { value, last_update_block } = await provider.getStorageAt(addr, key);
const felt = BigInt(value);
```

If you imported the response type, rename it:

```typescript
import type { StorageResponse } from 'starknet'; // ✅ Was `Storage`
```

## Breaking Change 9: fastExecute Is Now a Plugin

### What Changed

In v9, `fastExecute()` was a native `Account` method and `fastWaitForTransaction()` a native
`RpcProvider` method. In v10 both come from the `fastExecute` plugin, which is part of
`defaultPlugins`.

**Good news:** with the default configuration, nothing changes:

```typescript
// Still works out of the box in v10
const resp = await account.fastExecute(call, { tip }, { retries: 30, retryInterval: 500 });
```

**❌ Breaks if you opted out of plugins:**

```typescript
const account = new Account({ provider, address, signer, plugins: false });
await account.fastExecute(call); // ✗ Method does not exist anymore
```

Re-add the plugin explicitly when you disable the defaults:

```typescript
import { fastExecute } from 'starknet';

const account = new Account({ provider, address, signer, plugins: [fastExecute()] });
```

### Type Renames

The two related types were renamed to follow the naming convention:

```typescript
import type { FastExecuteResponse } from 'starknet'; // ✅ Was fastExecuteResponse
import type { FastWaitForTransactionOptions } from 'starknet'; // ✅ Was fastWaitForTransactionOptions
```

Method signatures are unchanged.

## Breaking Change 10: Paymaster `default` Option Renamed

### What Changed

`PaymasterRpcOptions.default` was renamed to `mute`. It silences the informational message emitted
when a `PaymasterRpc` falls back to its default node URL.

**❌ v9:**

```typescript
const myPaymaster = new PaymasterRpc({ default: true });
```

**✅ v10:**

```typescript
const myPaymaster = new PaymasterRpc({ mute: true });
```

Note that `RpcProviderOptions.default` was removed entirely (it only served the deleted
`defaultProvider` singleton) and has no replacement.

## Breaking Change 11: felt252 Range Validation

### What Changed

`CairoFelt()` now validates that the value fits in the felt252 range `[0, P)` and throws otherwise.
In v9, an out-of-range value was silently converted and sent to the network.

```typescript
// v9: accepted silently
// v10: throws `Value ... is out of felt252 range [0, ...)`
CairoFelt(2n ** 252n);
```

In addition, `CairoFelt252.toApiRequest()` now returns the **decimal** string representation instead
of the hexadecimal one, which aligns it with the rest of the compiled calldata:

```typescript
new CairoFelt252(1000n).toApiRequest(); // v9: ['0x3e8'] → v10: ['1000']
```

### Impact

**Low** for normal use: `CallData.compile()` and contract calls behave the same, since the network
receives equivalent values. It only affects code that compares compiled calldata to hard-coded
strings, or that relied on out-of-range values not throwing.

## Breaking Change 12: RPC Namespace Renames

Two public exports were renamed to track the new default RPC spec version. These only affect advanced usage (raw RPC spec types and direct channel imports).

### `RPCSPEC010` → `RPCSPEC0103`

The namespace re-exporting the 0.10.x RPC spec types was renamed.

**❌ v9:**

```typescript
import { RPCSPEC010 } from 'starknet';

type MyBlock = RPCSPEC010.BLOCK_WITH_TXS;
```

**✅ v10:**

```typescript
import { RPCSPEC0103 } from 'starknet';

type MyBlock = RPCSPEC0103.BLOCK_WITH_TXS;
```

### `RPC010` → `RPC0102` / `RPC0103`

The channel namespace for the 0.10.x RPC implementation was renamed. v10 exposes two channel variants: `RPC0102` (spec 0.10.2) and `RPC0103` (spec 0.10.3, the default).

**❌ v9:**

```typescript
import { RPC010 } from 'starknet';
```

**✅ v10:**

```typescript
import { RPC0103 } from 'starknet'; // spec 0.10.3 (default)
import { RPC0102 } from 'starknet'; // spec 0.10.2 (legacy)
```

:::note
Standard usage via `RpcProvider`, `Account`, and high-level methods is unaffected by these renames.
:::

## Other Minor Changes

- `getBlock()` called without argument is now typed `Promise<Block>` instead of
  `Promise<PreConfirmedBlock>`. The runtime behavior is unchanged — it returns the block designated
  by the provider `blockIdentifier` option — but code that accessed pre-confirmed-only fields on the
  result no longer type-checks. Use `getBlock('pre_confirmed')` for the pre-confirmed block.
- `pako` is no longer a dependency (replaced by the native Compression Streams API), alongside the
  removal of `ts-mixer`.

## Migration Checklist

When upgrading from v9 to v10:

- [ ] Update `starknet` package to v10.x
- [ ] **Account Composition:**
  - [ ] Find all `account.xyz()` calls where `xyz` is a provider method
  - [ ] Replace with `account.provider.xyz()`
  - [ ] Verify account-specific methods (`execute`, `signMessage`, etc.) still work directly
- [ ] **Plugin System:**
  - [ ] Update plugin imports: `StarknetId` → `StarknetIdImpl` (if importing directly)
  - [ ] Update plugin imports: `BrotherId` → `BrotherIdImpl` (if importing directly)
  - [ ] Update import paths: `starknet/provider/extensions/` → package root (`'starknet'`)
  - [ ] Use `starknetIdPlugin()` for the plugin factory, not `starknetId()`
  - [ ] Test that plugin methods still work: `getStarkName()`, `getAddressFromStarkName()`, etc.
  - [ ] If using `plugins: false`, verify this is intentional (disables StarknetId/BrotherId/fastExecute)
- [ ] **fastExecute:**
  - [ ] Rename the types: `fastExecuteResponse` → `FastExecuteResponse`, `fastWaitForTransactionOptions` → `FastWaitForTransactionOptions`
  - [ ] If you disabled the default plugins, add `fastExecute()` back to keep `account.fastExecute()` and `provider.fastWaitForTransaction()`
- [ ] **Compression Functions:**
  - [ ] Search for `compressProgram()` calls and add `await`
  - [ ] Search for `decompressProgram()` calls and add `await`
  - [ ] Search for `parseContract()`, `createSierraContractClass()` and `contractClassResponseToLegacyCompiledContract()` calls and add `await`
  - [ ] Make calling functions `async` if they weren't already
- [ ] **Provider Changes:**
  - [ ] Review any code using `provider.fetch()` with `.then()` chains
  - [ ] Verify error handling still works correctly
- [ ] **Storage Queries:**
  - [ ] Find all `getStorageAt()` calls
  - [ ] Update usage from `BigInt(result)` to `BigInt(result.value)`
  - [ ] Rename the imported type `Storage` → `StorageResponse`
  - [ ] Optionally use `result.last_update_block` if you need metadata
- [ ] **Paymaster:**
  - [ ] Rename the `default` option to `mute` in `new PaymasterRpc({ ... })`
- [ ] **Cairo Types:**
  - [ ] Check that no felt252 value you build is outside `[0, P)` — it now throws instead of being silently converted
  - [ ] If you compare compiled calldata to hard-coded strings, note that `CairoFelt252.toApiRequest()` returns decimal, not hex
- [ ] **SimulateTransaction Response:**
  - [ ] Find all `getSimulateTransaction()` calls
  - [ ] Replace direct array access (e.g., `result[0]`, `result.map()`) with `result.simulated_transactions[0]`, `result.simulated_transactions.map()`
  - [ ] Optionally use `result.initial_reads` if using `returnInitialReads` option
- [ ] **Dependencies:**
  - [ ] Remove any references to `ts-mixer` if you were using it
  - [ ] If you depended on `ts-mixer` or `pako` transitively, add them to your `package.json`
- [ ] **Custom Extensions:**
  - [ ] If you created custom extensions, migrate them to the plugin system (see [Plugin Guide](./plugins.md))
- [ ] **Testing:**
  - [ ] Run your test suite to catch any missed migrations
  - [ ] Verify all provider method calls work with `account.provider.xyz()`
  - [ ] Test plugin functionality (StarknetId, BrotherId)

## New in v10: Transaction `proof` and `proofFacts` Fields

v9 had no transaction proof at all. v10 adds two optional fields to the v3 transaction details,
following RPC 0.10.1+: `proof` and `proofFacts`. Nothing to migrate — this section only describes
how to use them.

The `proof` field is typed as a `string`: a base64 encoding of big-endian packed `u32` values.
Use `stark.encodeProof()` to build it from a number array:

```typescript
import { stark } from 'starknet';

// Step 1: encode the array to base64
const proofBase64 = stark.encodeProof([1, 2, 3, 4]);
// result = "AQAAAAIAAAADAAAABAAAAA=="

// Step 2: pass the encoded string
await account.execute(calls, {
  proof: proofBase64, // must be a base64 string
});
```

The same option is accepted by the other Account methods:

```typescript
await account.estimateInvokeFee(calls, { proof: proofBase64 });
await account.simulateTransaction(invocations, { proof: proofBase64 });
```

Decode it back if needed:

```typescript
const proofArray = stark.decodeProof(proofBase64);
```

### The `proofFacts` Field

`proofFacts` is an optional companion to `proof`. When present, it changes the v3 transaction hash computation (the Poseidon of all proof facts is folded into the hash).

```typescript
// proofFacts is optional — pass only when your SNIP-36 off-chain computation
// produces facts that must be committed on-chain
await account.execute(calls, {
  proof: proofBase64, // base64-encoded proof (see above)
  proofFacts: [fact1, fact2], // BigNumberish[] — omit if unused
});
```

:::note
Both fields are optional: code that never sets them behaves exactly as before. Set them only when
your use case requires SNIP-36 fact commitment — see the [Proofs (SNIP-36) guide](./account/proofs.md).
:::

## What Else Is New in v10

None of the following requires any migration work, but they are worth knowing about once you are on
v10:

- **RPC 0.10.3 support.** Two channels ship side by side, `RPC0102` (spec 0.10.2) and `RPC0103`
  (spec 0.10.3, the default). `RpcProvider.create()` picks the right one from the node.
- **Runtime plugin installation** with `provider.use(plugin)`, fully typed — see the
  [Plugin System Guide](./plugins.md).
- **`contract.compile(method, args)`** returns the compiled `Calldata` alone, without the
  `Invocation` wrapper produced by `populate()`.
- **`account.getSignedTransaction()` / `provider.invokeSignedTx()`** to split signing and
  broadcasting into two steps.
- **`WalletAccountV6`** and the `walletV6` namespace: wallet-standard connection
  (`standardConnect()`), STRK20 privacy methods (`strk20Balances`, `strk20PrepareInvoke`,
  `strk20InvokeTransaction`, `strk20ShadowAccountCommitment`) and shadow accounts — see the
  [WalletAccount guide](./account/walletAccount.md).
- **Initial storage reads:** pass `returnInitialReads: true` to `getSimulateTransaction()` or
  `getBlockTransactionsTraces()` to get an `initial_reads` field back, and
  `getTransaction(txHash, { includeProofFacts: true })` to get the proof facts of a transaction.
- **WebSocket subscriptions:** `fromAddress` now accepts an array of addresses, transaction
  subscriptions accept `tags`, and reconnection accepts a `stableConnectionThreshold` option — see
  the [WebSocket guide](./websocket_channel.md).
- **`walletAccount.onChange()`** now returns an unsubscribe function.

## Need Help?

- Check the [Plugin System Guide](./plugins.md) for details on how plugins work
- Review the [examples](https://github.com/starknet-io/starknet.js/tree/develop/examples) in the repository
- Ask questions in [GitHub Discussions](https://github.com/starknet-io/starknet.js/discussions)
