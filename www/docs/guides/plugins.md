---
sidebar_position: 13
---

# Plugin System

Starknet.js features a powerful plugin system that allows you to extend `RpcProvider` and `Account` with custom functionality. Plugins can add methods, intercept requests, and modify behavior through lifecycle hooks.

## Overview

The plugin system replaces the previous mixin-based approach (using `ts-mixer`), providing a cleaner and more extensible architecture for third-party integrations.

## Default Plugins

By default, Starknet.js comes with three plugins pre-installed:

- **StarknetId** - Starknet Name Service integration
- **BrotherId** - Brother.id naming service integration
- **FastExecute** - Gaming-optimized rapid transaction execution

These plugins are automatically available on both `RpcProvider` and `Account` instances:

```typescript
import { RpcProvider, Account, BlockTag } from 'starknet';

const provider = new RpcProvider({
  nodeUrl,
  blockIdentifier: BlockTag.PRE_CONFIRMED, // Required for fastExecute plugin to work
});
const account = new Account({ provider, address, signer: privateKey });

// StarknetId plugin methods (automatically available)
const name = await provider.getStarkName(address);
const addr = await provider.getAddressFromStarkName('example.stark');
const profile = await provider.getStarkProfile(address);

// BrotherId plugin methods (automatically available)
const brotherName = await provider.getBrotherName(address);

// FastExecute plugin methods (automatically available)
const resp = await account.fastExecute(call, { tip: estimatedTip });
if (resp.isReady) {
  // Next transaction can be sent immediately
}

// On Account, some methods default to using account.address
const myName = await account.getStarkName(); // Uses account.address by default
```

## Disabling Default Plugins

You can create a provider or account without any plugins:

```typescript
// Provider without plugins
const bareProvider = new RpcProvider({
  nodeUrl,
  plugins: false,
});

// Plugin methods are not available
// bareProvider.getStarkName() ❌ Error

// Account without plugins
const bareAccount = new Account({
  provider,
  address,
  signer: privateKey,
  plugins: false,
});

// bareAccount.getStarkName() ❌ Error
```

## Custom Plugin Configuration

You can specify exactly which plugins to use:

```typescript
import { RpcProvider, starknetId, brotherId } from 'starknet';

// Only StarknetId plugin
const provider = new RpcProvider({
  nodeUrl,
  plugins: [starknetId()],
});

// Only BrotherId plugin
const provider2 = new RpcProvider({
  nodeUrl,
  plugins: [brotherId()],
});

// Mix default plugins with custom ones
import { defaultPlugins } from 'starknet';

const provider3 = new RpcProvider({
  nodeUrl,
  plugins: [...defaultPlugins, myCustomPlugin()],
});
```

## Runtime Plugin Installation

Add plugins dynamically at runtime using the `.use()` method:

```typescript
const provider = new RpcProvider({ nodeUrl, plugins: false });

// Provider starts without any plugins
// provider.getStarkName() ❌ Error

// Add plugin at runtime
provider.use(starknetId());

// Now plugin methods are available
await provider.getStarkName(address); // ✅ Works
```

## Creating Custom Plugins

### Basic Plugin

Create a simple plugin that adds methods to the provider:

```typescript
import type { StarknetPlugin } from 'starknet';

export function myPlugin(): StarknetPlugin<{ myMethod(): string }> {
  return {
    name: 'my-plugin',
    extend: (provider) => ({
      myMethod: () => 'Hello from plugin!',
    }),
  };
}

// Usage
const provider = new RpcProvider({ nodeUrl });
provider.use(myPlugin());
provider.myMethod(); // 'Hello from plugin!'
```

### Plugin with Provider and Account Methods

Plugins can provide different methods for providers and accounts:

```typescript
import type { StarknetPlugin, ProviderInterface, AccountInterface } from 'starknet';

interface MyProviderMethods {
  getCustomData(address: string): Promise<string>;
}

interface MyAccountMethods {
  getMyCustomData(): Promise<string>; // Uses account.address by default
}

export function myPlugin(): StarknetPlugin<MyProviderMethods, MyAccountMethods> {
  return {
    name: 'my-plugin',

    // Methods for Provider
    extend: (provider: ProviderInterface) => ({
      getCustomData: async (address: string) => {
        // Implementation using provider
        return `Custom data for ${address}`;
      },
    }),

    // Methods for Account
    accountExtend: (account: AccountInterface) => ({
      getMyCustomData: async () => {
        // Can use account.address and account.provider
        return `Custom data for ${account.address}`;
      },
    }),
  };
}

// Usage
const provider = new RpcProvider({ nodeUrl });
provider.use(myPlugin());
await provider.getCustomData('0x123...'); // ✅

const account = new Account(provider, address, privateKey);
account.use(myPlugin());
await account.getMyCustomData(); // ✅ Uses account.address
```

### Plugin with Lifecycle Hooks

Intercept and modify requests/responses using hooks:

```typescript
import type { StarknetPlugin } from 'starknet';

export function loggingPlugin(): StarknetPlugin {
  return {
    name: 'logging-plugin',

    hooks: {
      // Called before every RPC request
      beforeRequest: ({ method, params }) => {
        console.log(`[RPC] ${method}`, params);
        // Optionally modify the request
        return { method, params };
      },

      // Called after every RPC request
      afterRequest: ({ method, params, result }) => {
        console.log(`[RPC] ${method} completed`, result);
        // Optionally modify the result
        return result;
      },
    },

    accountHooks: {
      // Called before account.execute()
      beforeExecute: ({ calls, details }) => {
        console.log(`[Account] Executing ${calls.length} calls`);
        return { calls, details };
      },

      // Called after account.execute()
      afterExecute: ({ calls, result }) => {
        console.log(`[Account] Executed tx: ${result.transaction_hash}`);
      },

      // Called before account.signMessage()
      beforeSign: ({ typedData }) => {
        console.log(`[Account] Signing message`);
        return { typedData };
      },

      // Called after account.signMessage()
      afterSign: ({ typedData, signature }) => {
        console.log(`[Account] Message signed`);
      },
    },
  };
}
```

### Advanced Plugin Example

A complete plugin with methods and hooks:

```typescript
import type { StarknetPlugin, ProviderInterface } from 'starknet';

interface TransactionLogMethods {
  getTxLog(): string[];
  clearTxLog(): void;
}

export function txLogPlugin(): StarknetPlugin<TransactionLogMethods> {
  const log: string[] = [];

  return {
    name: 'tx-log',

    // Add methods
    extend: () => ({
      getTxLog: () => [...log],
      clearTxLog: () => {
        log.length = 0;
      },
    }),

    // Track all transactions
    accountHooks: {
      afterExecute: ({ result }) => {
        log.push(result.transaction_hash);
      },
    },
  };
}

// Usage
const account = new Account(provider, address, privateKey);
account.use(txLogPlugin());

await account.execute(calls);
await account.execute(moreCalls);

const txs = account.getTxLog(); // ['0xabc...', '0xdef...']
account.clearTxLog();
```

## Plugin API Reference

### Plugin Interface

```typescript
interface StarknetPlugin<
  TProviderMethods extends Record<string, any> = Record<string, never>,
  TAccountMethods extends Record<string, any> = TProviderMethods,
> {
  // Unique plugin identifier
  readonly name: string;

  // Methods to add to Provider instances
  extend?(provider: ProviderInterface): TProviderMethods;

  // Methods to add to Account instances (falls back to extend() if not provided)
  accountExtend?(account: AccountInterface): TAccountMethods;

  // Provider-level hooks
  hooks?: ProviderHooks;

  // Account-level hooks
  accountHooks?: AccountHooks;
}
```

### Provider Hooks

```typescript
interface ProviderHooks {
  // Intercept before RPC request
  beforeRequest?(ctx: { method: string; params: any }): { method: string; params: any } | void;

  // Intercept after RPC request
  afterRequest?(ctx: { method: string; params: any; result: any }): any | void;
}
```

### Account Hooks

```typescript
interface AccountHooks extends ProviderHooks {
  // Before account.execute()
  beforeExecute?(ctx: {
    calls: AllowArray<Call>;
    details: UniversalDetails;
  }): { calls: AllowArray<Call>; details: UniversalDetails } | void;

  // After account.execute()
  afterExecute?(ctx: { calls: AllowArray<Call>; result: InvokeFunctionResponse }): void;

  // Before account.signMessage()
  beforeSign?(ctx: { typedData: TypedData }): { typedData: TypedData } | void;

  // After account.signMessage()
  afterSign?(ctx: { typedData: TypedData; signature: Signature }): void;
}
```

## Built-in Plugins

### FastExecute Plugin

Provides gaming-optimized rapid transaction execution with minimal confirmation latency:

```typescript
import { RpcProvider, Account, BlockTag, fastExecute } from 'starknet';

// Plugin is included by default, no need to explicitly add it
const provider = new RpcProvider({
  nodeUrl,
  blockIdentifier: BlockTag.PRE_CONFIRMED, // Required for fastExecute to work
});

const account = new Account({ provider, address, signer });

// Fast execute is available immediately
const resp = await account.fastExecute(
  call,
  { tip: recommendedTip },
  { retries: 30, retryInterval: 500 }
);

if (resp.isReady) {
  // Next transaction can be sent immediately
  await account.fastExecute(nextCall);
}
```

**Requirements:**

- RPC 0.9 or later
- Provider initialized with `blockIdentifier: BlockTag.PRE_CONFIRMED`

**Limitations:**

- Events and transaction reports are not available immediately
- Not suitable for contract/account deployment
- Best used sparingly to avoid overwhelming the node

**Methods added to Provider:**

- `fastWaitForTransaction(txHash, address, initNonce, options?)` - Wait for transaction with fast polling
  - Returns `Promise<boolean>` - true if next nonce increment detected, false on timeout
  - Polls at PRE_CONFIRMED finality level instead of waiting for full confirmation

**Methods added to Account:**

- `fastExecute(transactions, details?, waitDetail?)` - Execute and wait for next transaction readiness
  - Returns `Promise<FastExecuteResponse>` with `txResult` and `isReady` boolean
  - Useful for rapid consecutive transactions (gaming, high-frequency operations)

**Options:**

```typescript
type FastWaitForTransactionOptions = {
  retries?: number; // Number of retry attempts (default: 50)
  retryInterval?: number; // Time between retries in ms (default: 500)
};

type FastExecuteResponse = {
  txResult: InvokeFunctionResponse;
  isReady: boolean; // Ready to execute next transaction immediately
};
```

**Example - Rapid Fire Gaming Transactions:**

```typescript
const calls = [
  { contractAddress: gameAddress, entrypoint: 'move', calldata: [...] },
  { contractAddress: gameAddress, entrypoint: 'attack', calldata: [...] },
  { contractAddress: gameAddress, entrypoint: 'defend', calldata: [...] },
];

// Execute transactions as fast as possible
for (const call of calls) {
  const resp = await account.fastExecute(call, { tip: estimatedTip });

  if (!resp.isReady) {
    // Fallback to regular wait if fast mode times out
    await provider.waitForTransaction(resp.txResult.transaction_hash);
  }

  console.log(`Transaction ${resp.txResult.transaction_hash} confirmed`);
}
```

**Disabling Fast Execute:**

If you don't need fast execute, you can start without the plugin:

```typescript
const provider = new RpcProvider({
  nodeUrl,
  plugins: false, // No plugins
});

// fastExecute not available
// account.fastExecute() ❌ Error
```

Or customize to use only specific plugins:

```typescript
import { starknetId } from 'starknet';

const provider = new RpcProvider({
  nodeUrl,
  plugins: [starknetId()], // Only StarknetId, no fastExecute
});
```

### StarknetId Plugin

Provides Starknet Name Service integration:

```typescript
import { starknetId, StarknetIdImpl } from 'starknet';

// Plugin factory
const plugin = starknetId();

// Or use static methods directly
const name = await StarknetIdImpl.getStarkName(provider, address);
```

**Methods added to Provider:**

- `getStarkName(address, contract?)` - Get Starknet name for an address
- `getAddressFromStarkName(name, contract?)` - Get address from Starknet name
- `getStarkProfile(address, contract?)` - Get full Starknet profile

**Methods added to Account:**

- Same as provider, but `getStarkName()` defaults to `account.address`

### BrotherId Plugin

Provides Brother.id naming service integration:

```typescript
import { brotherId, BrotherIdImpl } from 'starknet';

// Plugin factory
const plugin = brotherId();

// Or use static methods directly
const name = await BrotherIdImpl.getBrotherName(provider, address);
```

**Methods added to Provider:**

- `getBrotherName(address, contract?)` - Get Brother.id name
- `getAddressFromBrotherName(name, contract?)` - Get address from Brother.id name
- `getBrotherProfile(address, contract?)` - Get Brother.id profile

## TypeScript Support

Plugins are fully typed. When using `.use()`, TypeScript automatically infers the added methods:

```typescript
const provider = new RpcProvider({ nodeUrl, plugins: false });

// Type error: getStarkName doesn't exist yet
// provider.getStarkName(); ❌

// Add plugin with type inference
const extendedProvider = provider.use(starknetId());

// Now TypeScript knows about the method
await extendedProvider.getStarkName(address); // ✅ Fully typed
```

## Publishing Plugins

To create a reusable plugin package:

1. Create a new npm package
2. Export a plugin factory function
3. Document the methods and types it provides

```typescript
// my-starknet-plugin/src/index.ts
import type { StarknetPlugin } from 'starknet';

export interface MyPluginMethods {
  myMethod(): Promise<string>;
}

export function myStarknetPlugin(): StarknetPlugin<MyPluginMethods> {
  return {
    name: 'my-starknet-plugin',
    extend: (provider) => ({
      myMethod: async () => {
        // Implementation
        return 'result';
      },
    }),
  };
}
```

Users can then install and use your plugin:

```bash
npm install my-starknet-plugin
```

```typescript
import { RpcProvider } from 'starknet';
import { myStarknetPlugin } from 'my-starknet-plugin';

const provider = new RpcProvider({ nodeUrl });
provider.use(myStarknetPlugin());
```

## Best Practices

1. **Name uniqueness** - Use descriptive, unique names for your plugins
2. **Type safety** - Always provide TypeScript types for your plugin methods
3. **Documentation** - Document what your plugin does and which methods it adds
4. **Error handling** - Handle errors gracefully in plugin methods
5. **Performance** - Keep hook implementations lightweight
6. **Side effects** - Be careful with hooks that modify requests/responses
7. **Testing** - Test your plugins with both Provider and Account instances
