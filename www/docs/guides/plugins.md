---
sidebar_position: 13
---

# Plugin System

The plugin system lets you extend `RpcProvider` and `Account` with custom methods and lifecycle hooks that can intercept RPC requests, `execute()`, and `signMessage()`.

## Default Plugins

Three plugins are pre-installed on every `RpcProvider` and `Account`:

- **StarknetId** — Starknet Name Service integration
- **BrotherId** — Brother.id naming service integration
- **FastExecute** — gaming-optimized rapid transaction execution

```typescript
import { RpcProvider, Account, BlockTag } from 'starknet';

const provider = new RpcProvider({
  nodeUrl,
  blockIdentifier: BlockTag.PRE_CONFIRMED, // required by fastExecute
});
const account = new Account({ provider, address, signer: privateKey });

// StarknetId
const name = await provider.getStarkName(address);
const addr = await provider.getAddressFromStarkName('example.stark');

// BrotherId
const brotherName = await provider.getBrotherName(address);

// FastExecute
const resp = await account.fastExecute(call, { tip: estimatedTip });

// On Account, address-based methods default to account.address
const myName = await account.getStarkName();
```

## Choosing Plugins

```typescript
import { RpcProvider, starknetId, brotherId, defaultPlugins } from 'starknet';

// No plugins — plugin methods throw
const bare = new RpcProvider({ nodeUrl, plugins: false });

// Only specific plugins
const provider = new RpcProvider({ nodeUrl, plugins: [starknetId()] });

// Default plugins + your own
const custom = new RpcProvider({
  nodeUrl,
  plugins: [...defaultPlugins, myCustomPlugin()],
});
```

The same `plugins` option is available on `Account`.

## Runtime Installation

Add plugins after construction with `.use()`. TypeScript infers the added methods:

```typescript
const provider = new RpcProvider({ nodeUrl, plugins: false });

const extended = provider.use(starknetId());
await extended.getStarkName(address); // ✅ fully typed
```

## Creating Custom Plugins

### Adding methods

A plugin is a factory returning an object with a `name` and optional `extend` / `accountExtend`:

```typescript
import type { StarknetPlugin, ProviderInterface, AccountInterface } from 'starknet';

interface ProviderMethods {
  getCustomData(address: string): Promise<string>;
}
interface AccountMethods {
  getMyCustomData(): Promise<string>;
}

export function myPlugin(): StarknetPlugin<ProviderMethods, AccountMethods> {
  return {
    name: 'my-plugin',

    // Methods for Provider instances
    extend: (provider: ProviderInterface) => ({
      getCustomData: async (address: string) => `Custom data for ${address}`,
    }),

    // Methods for Account instances (falls back to extend() if omitted)
    accountExtend: (account: AccountInterface) => ({
      getMyCustomData: async () => `Custom data for ${account.address}`,
    }),
  };
}
```

### Adding lifecycle hooks

Hooks intercept requests and account actions. Returning a value overrides the request/result; returning nothing leaves it unchanged.

```typescript
import type { StarknetPlugin } from 'starknet';

export function loggingPlugin(): StarknetPlugin {
  return {
    name: 'logging-plugin',

    hooks: {
      beforeRequest: ({ method, params }) => {
        console.log(`[RPC] ${method}`, params);
        return { method, params }; // optionally modified
      },
      afterRequest: ({ method, result }) => {
        console.log(`[RPC] ${method} done`, result);
        return result;
      },
    },

    accountHooks: {
      beforeExecute: ({ calls, details }) => ({ calls, details }),
      afterExecute: ({ result }) => console.log(`tx: ${result.transaction_hash}`),
      beforeSign: ({ typedData }) => ({ typedData }),
      afterSign: ({ signature }) => console.log('signed'),
    },
  };
}
```

Methods and hooks can be combined in a single plugin — e.g. an `accountHooks.afterExecute` that pushes each hash into a closure array, exposed through `extend`.

## Plugin API Reference

```typescript
interface StarknetPlugin<
  TProviderMethods extends Record<string, any> = Record<string, never>,
  TAccountMethods extends Record<string, any> = TProviderMethods,
> {
  readonly name: string;
  extend?(provider: ProviderInterface): TProviderMethods;
  accountExtend?(account: AccountInterface): TAccountMethods; // falls back to extend()
  hooks?: ProviderHooks;
  accountHooks?: AccountHooks;
}

interface ProviderHooks {
  beforeRequest?(ctx: { method: string; params: any }): { method: string; params: any } | void;
  afterRequest?(ctx: { method: string; params: any; result: any }): any | void;
}

interface AccountHooks extends ProviderHooks {
  beforeExecute?(ctx: {
    calls: AllowArray<Call>;
    details: UniversalDetails;
  }): { calls: AllowArray<Call>; details: UniversalDetails } | void;
  afterExecute?(ctx: { calls: AllowArray<Call>; result: InvokeFunctionResponse }): void;
  beforeSign?(ctx: { typedData: TypedData }): { typedData: TypedData } | void;
  afterSign?(ctx: { typedData: TypedData; signature: Signature }): void;
}
```

## Built-in Plugins Reference

### FastExecute

Rapid transaction execution with minimal confirmation latency, for gaming and high-frequency use.

```typescript
const resp = await account.fastExecute(
  call,
  { tip: recommendedTip },
  { retries: 30, retryInterval: 500 }
);

if (!resp.isReady) {
  // fast mode timed out — fall back to a normal wait
  await provider.waitForTransaction(resp.txResult.transaction_hash);
}
```

**Requirements:** RPC 0.9+, and the provider must be created with `blockIdentifier: BlockTag.PRE_CONFIRMED`.

**Limitations:** events/receipts aren't immediately available, not suitable for deployment, and best used sparingly.

**Methods:**

- Provider — `fastWaitForTransaction(txHash, address, initNonce, options?)` → `Promise<boolean>` (polls at PRE_CONFIRMED finality)
- Account — `fastExecute(transactions, details?, waitDetail?)` → `Promise<FastExecuteResponse>`

```typescript
type FastWaitForTransactionOptions = {
  retries?: number; // default 50
  retryInterval?: number; // ms, default 500
};

type FastExecuteResponse = {
  txResult: InvokeFunctionResponse;
  isReady: boolean; // ready to send the next transaction immediately
};
```

### StarknetId

Starknet Name Service integration. Methods can also be called statically via `StarknetIdImpl`.

- `getStarkName(address, contract?)`
- `getAddressFromStarkName(name, contract?)`
- `getStarkProfile(address, contract?)`

On `Account`, `getStarkName()` defaults to `account.address`.

### BrotherId

Brother.id naming service integration. Static methods available via `BrotherIdImpl`.

- `getBrotherName(address, contract?)`
- `getAddressFromBrotherName(name, contract?)`
- `getBrotherProfile(address, contract?)`
