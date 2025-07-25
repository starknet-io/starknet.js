---
sidebar_position: 12
---

# Migrate from v7 to v8

This document covers the features present in v7 which have changed in some significant way in v8.

If you encounter any missing changes, please let us know and we will update this guide.

## About Starknet 0.14

Starknet.js v8 introduces support for **Starknet protocol version 0.14**, which brings several important network-level changes that affect how you build and interact with Starknet:

### Transaction Version Changes

**Only V3 transactions are supported** - Starknet 0.14 has removed support for legacy transaction versions:

- ❌ **V0, V1, V2 transactions are no longer supported** on the network
- ✅ **Only V3 transactions work** with the new protocol
- All transactions now use **STRK fees** instead of ETH fees

```typescript
// ❌ This will fail on Starknet 0.14
const account = new Account({
  provider,
  address,
  signer: privateKey,
  transactionVersion: ETransactionVersion.V2, // No longer supported
});

// ✅ Correct for Starknet 0.14
const account = new Account({
  provider,
  address,
  signer: privateKey,
  transactionVersion: ETransactionVersion.V3, // Default and only option
});
```

### Transaction Tips

Starknet 0.14 introduces a **tip mechanism** for transaction prioritization in the mempool:

- Transactions can include tips to prioritize execution
- Higher tips increase the likelihood of faster inclusion
- Tips are separate from transaction fees and go to the sequencer

### Block State Changes

**Important block handling changes:**

- ❌ **Pending blocks have been removed** from the protocol
- ✅ **New decentralized pre-confirmation state** replaces pending blocks
- Block statuses are now: `PRE_CONFIRMED` → `ACCEPTED_ON_L2` → `ACCEPTED_ON_L1`

### Transaction Waiting Behavior

**Starknet.js v8 now waits for transactions to reach `ACCEPTED_ON_L2` status:**

- `waitForTransaction()` now waits for `ACCEPTED_ON_L2` instead of pending confirmation

```typescript
// v8 behavior - waits for ACCEPTED_ON_L2
const txReceipt = await account.waitForTransaction(txHash);
// Transaction is now confirmed on L2
```

This affects how you handle transaction states and block confirmations in your applications.

## Overview

Starknet.js v8 introduces several breaking changes while adding full support for these Starknet 0.14 protocol changes and RPC 0.9. The most significant change is the move from argument-based constructors to object-based APIs for better developer experience and extensibility.

## Node.js Requirements

Starknet.js v8 has a soft requirement for **Node.js >= 22** due to built-in WebSocket support.

- **Node.js >= 22**: WebSocket support is built-in, no additional dependencies needed
- **Node.js < 22**: You can still use older versions but will need to provide a WebSocket implementation

For older Node.js versions, install the `ws` library and configure it:

```bash
npm install ws
npm install --save-dev @types/ws
```

```typescript
import { WebSocketChannel, config } from 'starknet';
import WebSocket from 'ws';

// Option 1: Configure WebSocket globally using config singleton
config.set('websocket', WebSocket);

// Option 2: Pass WebSocket to WebSocketChannel constructor
const channel = new WebSocketChannel({
  nodeUrl: 'wss://...',
  websocket: WebSocket,
});
```

## RPC Version Support

Starknet.js v8 introduces support for **RPC 0.9** and maintains compatibility with **RPC 0.8**. **RPC 0.7 support has been removed.**

|                       |   RPC 0.7   |    RPC 0.8    | RPC 0.9 <br /> (new) |
| --------------------: | :---------: | :-----------: | :------------------: |
| V3 tx (Starknet fees) |     ❌      |       ✓       |          ✓           |
|    **Support Status** | **Removed** | **Supported** |    **Supported**     |

## Breaking Changes

### RPC 0.7 Support Removed

**Important:** Starknet.js v8 no longer supports RPC 0.7. If you were using RPC 0.7 endpoints, you must upgrade to RPC 0.8 or RPC 0.9.

**v8 (use RPC 0.8 or 0.9):**

```typescript
// Option 1: Use RPC 0.8
const provider = new RpcProvider({
  nodeUrl: 'https://starknet-sepolia.public.blastapi.io/rpc/v0_8',
  specVersion: '0.8.1',
});

// Option 2: Use RPC 0.9 (default)
const provider = new RpcProvider({
  nodeUrl: 'https://starknet-sepolia.public.blastapi.io/rpc/v0_9',
  // specVersion defaults to '0.9.0'
});
```

### Constructor API Changes

All major classes now use object-based constructors instead of positional arguments for better clarity and extensibility.

#### Account Class

**v7 (Arguments-based):**

```typescript
import { Account, RpcProvider } from 'starknet';

const provider = new RpcProvider({
  nodeUrl: 'https://starknet-sepolia.public.blastapi.io/rpc/v0_7',
});
const account = new Account(
  provider,
  accountAddress,
  privateKey,
  undefined,
  ETransactionVersion.V3
);
```

**v8 (Object-based):**

```typescript
import { Account, RpcProvider } from 'starknet';

const provider = new RpcProvider({
  nodeUrl: 'https://starknet-sepolia.public.blastapi.io/rpc/v0_7',
});
const account = new Account({
  provider,
  address: accountAddress,
  signer: privateKey,
  cairoVersion: undefined, // optional
  transactionVersion: ETransactionVersion.V3, // optional
  paymaster: undefined, // optional
  deployer: undefined, // optional - new in v8
  defaultTipType: 'recommendedTip', // optional - new in v8
});
```

#### Contract Class

**v7 (Arguments-based):**

```typescript
import { Contract } from 'starknet';

const contract = new Contract(abi, contractAddress, provider);
```

**v8 (Object-based):**

```typescript
import { Contract } from 'starknet';

const contract = new Contract({
  abi,
  address: contractAddress,
  providerOrAccount: provider,
  classHash: undefined, // optional - new in v8
  parseRequest: true, // optional - new in v8
  parseResponse: true, // optional - new in v8
});
```

#### WalletAccount Class

**v7 (Arguments-based):**

```typescript
import { WalletAccount } from 'starknet';

const walletAccount = new WalletAccount(provider, walletProvider, address, cairoVersion);
```

**v8 (Object-based):**

```typescript
import { WalletAccount } from 'starknet';

const walletAccount = new WalletAccount({
  provider,
  walletProvider,
  address,
  cairoVersion, // optional
  paymaster: undefined, // optional
});
```

### Removed Types Namespace

The `types` namespace export has been removed. Types must now be imported directly from the main module.

**v7:**

```typescript
import { types } from 'starknet';

const details: types.UniversalDetails = {
  nonce: 1,
  version: 3,
};
const call: types.Call = {
  contractAddress: '0x...',
  entrypoint: 'transfer',
  calldata: ['0x1', '0x2'],
};
```

**v8:**

```typescript
import { UniversalDetails, Call } from 'starknet';

const details: UniversalDetails = {
  nonce: 1,
  version: 3,
};
const call: Call = {
  contractAddress: '0x...',
  entrypoint: 'transfer',
  calldata: ['0x1', '0x2'],
};
```

### Contract Factory Changes

The Contract factory API has been completely redesigned. The `Contract.connect()` method and `contractFactory` class have been removed.

**v7:**

```typescript
import { Contract, contractFactory } from 'starknet';

// Using connect method
const contract = Contract.connect(abi, contractAddress, account);

// Using contractFactory
const factory = new contractFactory(contract, casm);
const deployedContract = await factory.deploy(constructorCalldata);
```

**v8:**

```typescript
import { Contract } from 'starknet';

// New async factory method
const contract = await Contract.factory({
  contract: sierraContract, // Compiled Sierra contract
  casm: casmContract, // Compiled CASM contract
  account: account,
  constructorCalldata: {
    name: 'Token',
    symbol: 'ERC20',
    amount: 1000n,
    recipient: account.address,
    owner: account.address,
  }, // optional - normal arguments object, not compiled
  classHash: '0x...', // optional
  salt: '0x0', // optional
  unique: true, // optional
  deployer: account.deployer, // optional
});
```

### Removed Helper Functions

Several helper functions have been removed as they are now handled internally by the deployer system:

- `parseUDCEvent()` - Use `defaultDeployer.parseDeployerEvent()` instead
- `buildUDCCall()` - Use `defaultDeployer.buildDeployerCall()` instead

**v7:**

```typescript
import { parseUDCEvent, buildUDCCall } from 'starknet';

const { calls, addresses } = buildUDCCall(payload, accountAddress);
const deployedContract = parseUDCEvent(txReceipt);
```

**v8:**

```typescript
import { defaultDeployer } from 'starknet';

// These are now handled internally by the deployer
const deployTx = await account.deploy(payload, details);
const txReceipt = await account.waitForTransaction(deployTx.transaction_hash);
const deployedContract = defaultDeployer.parseDeployerEvent(txReceipt);
```

## New Features

### Transaction Tips

v8 introduces a transaction tip system for mempool prioritization.

```typescript
import { Account } from 'starknet';

const account = new Account({
  provider,
  address: accountAddress,
  signer: privateKey,
  defaultTipType: 'recommendedTip', // 'minTip' | 'maxTip' | 'averageTip' | 'medianTip' | 'modeTip' | 'recommendedTip' | 'p90Tip' | 'p95Tip'
});

// Using tips in transactions
const result = await account.execute(calls, {
  tip: 1000n, // Custom tip amount in wei
  // other transaction details
});

// Get recommended tip
const tipEstimate = await provider.getEstimateTip();
console.log('Recommended tip:', tipEstimate.recommendedTip);
```

### Custom Deployer Support

v8 allows you to specify a custom deployer for contract deployments. Starknet.js provides two built-in deployer options:

- **`defaultDeployer`**: Uses UDC V2 (Universal Deployer Contract V2) - recommended for new projects
- **`legacyDeployer`**: Uses the old UDC V1 - for backward compatibility

```typescript
import { Account, defaultDeployer, legacyDeployer, Deployer } from 'starknet';

// Option 1: Use the default deployer (UDC V2)
const account = new Account({
  provider,
  address: accountAddress,
  signer: privateKey,
  deployer: defaultDeployer, // Uses UDC V2
});

// Option 2: Use the legacy deployer (old UDC V1)
const account = new Account({
  provider,
  address: accountAddress,
  signer: privateKey,
  deployer: legacyDeployer, // Uses old UDC V1
});

// Option 3: Create a custom deployer
const customDeployer = new Deployer({
  address: '0x...', // Custom deployer contract address
  entryPoint: 'deploy_contract', // Custom entry point
});

const account = new Account({
  provider,
  address: accountAddress,
  signer: privateKey,
  deployer: customDeployer,
});
```

### RPC 0.9 Support

v8 adds support for the latest RPC specification while maintaining backward compatibility.

```typescript
import { RpcProvider } from 'starknet';

const provider = new RpcProvider({
  nodeUrl: 'https://starknet-sepolia.public.blastapi.io/rpc/v0_9',
  specVersion: '0.9.0', // Specify RPC version
});
```

## Backward Compatibility

To ease migration, you can create these helper functions that use the old API style but create v8 instances. **These are temporary migration helpers and should be removed once migration is complete.**

```typescript
// Temporary migration helpers - add these to your codebase during migration
import { Account, Contract, WalletAccount } from 'starknet';
import type {
  AccountInterface,
  ProviderInterface,
  ContractInterface,
  Abi,
  CairoVersion,
  SupportedTransactionVersion,
  PaymasterInterface,
} from 'starknet';

/**
 * @deprecated Use new Account({ ... }) constructor instead
 */
export function createAccount(
  provider: ProviderInterface,
  address: string,
  privateKey: string | Uint8Array,
  cairoVersion?: CairoVersion,
  transactionVersion?: SupportedTransactionVersion,
  paymaster?: PaymasterInterface
): AccountInterface {
  return new Account({
    provider,
    address,
    signer: privateKey,
    cairoVersion,
    transactionVersion,
    paymaster,
  });
}

/**
 * @deprecated Use new Contract({ ... }) constructor instead
 */
export function createContract(
  abi: Abi,
  address: string,
  providerOrAccount?: ProviderInterface | AccountInterface
): ContractInterface {
  return new Contract({
    abi,
    address,
    providerOrAccount,
  });
}

/**
 * @deprecated Use new WalletAccount({ ... }) constructor instead
 */
export function createWalletAccount(
  provider: ProviderInterface,
  walletProvider: any,
  address: string,
  cairoVersion?: CairoVersion,
  paymaster?: PaymasterInterface
): WalletAccount {
  return new WalletAccount({
    provider,
    walletProvider,
    address,
    cairoVersion,
    paymaster,
  });
}

// Usage during migration:
const account = createAccount(provider, address, privateKey, cairoVersion, transactionVersion);
const contract = createContract(abi, address, providerOrAccount);
const walletAccount = createWalletAccount(provider, walletProvider, address, cairoVersion);
```

## Migration Steps

1. **Upgrade RPC endpoints**: Replace any RPC 0.7 endpoints with RPC 0.8 or 0.9
2. **Update imports**: Remove any usage of the `types` namespace and import types directly
3. **Update constructors**: Convert all class instantiations to use object-based APIs
4. **Update Contract factory usage**: Replace with `await Contract.factory()`
5. **Replace removed helpers**: Update code using `parseUDCEvent` and `buildUDCCall`
6. **Test thoroughly**: Run your test suite to catch any remaining issues
7. **Consider new features**: Optionally add tip support and custom deployment
8. **Remove backward compatibility**: Once migration is complete, remove any usage of deprecated helpers

## Common Migration Issues

### TypeScript Compilation Errors

If you encounter TypeScript errors after migration, ensure you're importing types directly:

```typescript
// ❌ This will fail in v8
import { types } from 'starknet';
const call: types.Call = { ... };

// ✅ Correct way in v8
import { Call } from 'starknet';
const call: Call = { ... };
```

...To be added as encountered.

## Testing Your Migration

After completing the migration:

1. **Compile your TypeScript**: Ensure no compilation errors
2. **Run your test suite**: Verify all functionality works as expected
3. **Test contract interactions**: Ensure contract calls and deployments work
4. **Test account operations**: Verify transactions, signatures, and account management
5. **Performance testing**: The new tip system may affect transaction timing

## Need Help?

If you encounter issues during migration:

1. Check this guides
2. Review the [API documentation](https://starknetjs.com/docs/next/API/) for detailed method signatures
3. Open an issue on the [GitHub repository](https://github.com/starknet-io/starknet.js) if you find bugs
4. Ask for help on [Discord](https://discord.com/channels/793094838509764618/1270119831559078061)

The v8 migration requires updating constructor calls and import statements, but provides a more robust and extensible API for future development.
