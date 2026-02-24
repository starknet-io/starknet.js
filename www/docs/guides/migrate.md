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
3. **Plugin Import Paths** - `provider/extensions/` → `plugins/`
4. **Compression Functions** - `compressProgram()` and `decompressProgram()` are now async
5. **SimulateTransaction Response** - `SimulateTransactionOverheadResponse` changed from array to object
6. **Provider fetch() Method** - Now `async` (low impact)
7. **ts-mixer Removed** - No longer a dependency

### Breaking Changes Summary

| Change                                                           | Severity   | Impact                                               |
| ---------------------------------------------------------------- | ---------- | ---------------------------------------------------- |
| Account composition (`account.xyz()` → `account.provider.xyz()`) | **High**   | All provider method calls on Account must be updated |
| Compression functions now async (`await compressProgram()`)      | **Medium** | Only if using compress/decompress functions directly |
| Plugin class renames (`StarknetId` → `StarknetIdImpl`)           | **Medium** | Only affects direct imports of these classes         |
| Plugin import paths (`extensions/` → `plugins/`)                 | **Medium** | Only affects direct imports                          |
| `SimulateTransactionOverheadResponse` is now an object           | **Medium** | Must access `.simulated_transactions` for the array  |
| `fetch()` is now `async`                                         | **Low**    | Already returned Promise, minimal impact             |
| `ts-mixer` removed                                               | **Low**    | Only affects if you used it as transitive dependency |
| `plugins: false` disables defaults                               | **Info**   | Behavioral change, intentional opt-out               |

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
const account = new Account(provider, address, privateKey);

await account.waitForTransaction(txHash);
await account.getBlock('latest');
await account.getChainId();
```

**✅ v10:**

```typescript
const account = new Account(provider, address, privateKey);

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

## Breaking Change 2: Plugin System

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
import { starknetId, StarknetIdImpl } from 'starknet';
// Or
import { starknetId } from 'starknet/plugins/starknet-id';
```

### Default Behavior

**Good news:** For most users, plugins work the same way. StarknetId and BrotherId plugins are **automatically installed** by default:

```typescript
// These work out of the box in v10 (no changes needed)
const provider = new RpcProvider({ nodeUrl });
await provider.getStarkName(address); // ✅ Works

const account = new Account(provider, address, privateKey);
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
import { starknetId } from 'starknet';

const provider = new RpcProvider({
  nodeUrl,
  plugins: [starknetId()],
});

// Add custom plugins
import { defaultPlugins } from 'starknet';

const provider = new RpcProvider({
  nodeUrl,
  plugins: [...defaultPlugins, myCustomPlugin()],
});
```

For more details on creating and using plugins, see the [Plugin System Guide](./plugins.md).

## Breaking Change 3: Provider fetch() Method

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

## Breaking Change 4: Compression Functions Now Async

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
- Users calling `parseContract()` directly (also now async)
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

## Breaking Change 5: SimulateTransaction Response Structure

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

## Breaking Change 6: ts-mixer Removed

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
  - [ ] Update import paths: `starknet/provider/extensions/` → `starknet/plugins/`
  - [ ] Test that plugin methods still work: `getStarkName()`, `getAddressFromStarkName()`, etc.
  - [ ] If using `plugins: false`, verify this is intentional (disables StarknetId/BrotherId)
- [ ] **Compression Functions:**
  - [ ] Search for `compressProgram()` calls and add `await`
  - [ ] Search for `decompressProgram()` calls and add `await`
  - [ ] Search for `parseContract()` calls and add `await` (if used directly)
  - [ ] Make calling functions `async` if they weren't already
- [ ] **Provider Changes:**
  - [ ] Review any code using `provider.fetch()` with `.then()` chains
  - [ ] Verify error handling still works correctly
- [ ] **SimulateTransaction Response:**
  - [ ] Find all `getSimulateTransaction()` calls
  - [ ] Replace direct array access (e.g., `result[0]`, `result.map()`) with `result.simulated_transactions[0]`, `result.simulated_transactions.map()`
  - [ ] Optionally use `result.initial_reads` if using `returnInitialReads` option
- [ ] **Dependencies:**
  - [ ] Remove any references to `ts-mixer` if you were using it
  - [ ] If you depended on `ts-mixer` transitively, add it to your `package.json`
- [ ] **Custom Extensions:**
  - [ ] If you created custom extensions, migrate them to the plugin system (see [Plugin Guide](./plugins.md))
- [ ] **Testing:**
  - [ ] Run your test suite to catch any missed migrations
  - [ ] Verify all provider method calls work with `account.provider.xyz()`
  - [ ] Test plugin functionality (StarknetId, BrotherId)

## Need Help?

- Check the [Plugin System Guide](./plugins.md) for details on how plugins work
- Review the [examples](https://github.com/starknet-io/starknet.js/tree/develop/examples) in the repository
- Ask questions in [GitHub Discussions](https://github.com/starknet-io/starknet.js/discussions)
