---
sidebar_position: 12
---

# Migrate from v8 to v9

This document covers the breaking changes and major features that have changed in v9.

If you encounter any missing changes, please let us know and we will update this guide.

## Quick Summary

**Main breaking changes in v9:**

1. **RPC 0.8 removed** - Only RPC 0.9 and 0.10 supported (0.10 is default)
2. **"Pending" → "PreConfirmed"** - All pending-related types, methods, and functions renamed
3. **Type packages updated** - `@starknet-io/starknet-types-08` removed
4. **Blake2s hash support** - For Starknet 0.14.1+ contract class hashing

**Quick migration steps:**

```bash
# Update package
npm install starknet@^9.0.0
```

```typescript
// Remove RPC08 imports
import { RPC09, RPC010 } from 'starknet'; // ✅ Use these

// Update pending → pre_confirmed
const block = await provider.getBlock('pre_confirmed'); // ✅ Was 'pending'

// Update types
import type { PreConfirmedBlock } from 'starknet'; // ✅ Was PendingBlock

// Update helper functions
isPreConfirmedBlock(block); // ✅ Was isPendingBlock
```

## Starknet Protocol Support

Starknet.js v9 continues support for Starknet protocol version 0.14.x (same as v8).

### Blake2s Hash Support (Starknet 0.14.1+)

V9 adds support for the new compiled class hash computation introduced in Starknet 0.14.1:

- **Blake2s hashing**: Contract class hashes now use Blake2s instead of Pedersen hash when targeting Starknet 0.14.1+
- The library automatically detects the Starknet version and uses the appropriate hash function

## RPC Specification Support

### Supported Versions

Version 9 supports the following RPC specifications:

- ✅ **RPC 0.9.0** - Supported
- ✅ **RPC 0.10.0** - Supported (default)
- ❌ **RPC 0.8.1** - Removed

### Breaking Changes

#### 1. Default RPC Version

The default RPC version has been upgraded from ~~`0.9.0`~~ to `0.10.0`.

```typescript
// V8 default
config.get('rpcVersion'); // '0.9.0' ❌

// V9 default
config.get('rpcVersion'); // '0.10.0' ✅
```

#### 2. Removed RPC 0.8 Support

All RPC 0.8 related code has been removed:

**❌ No longer available:**

```typescript
import { RPC08 } from 'starknet';
```

**✅ Use instead:**

```typescript
import { RPC09, RPC010 } from 'starknet';
```

#### 3. Channel Implementation

- **Removed**: `src/channel/rpc_0_8_1.ts`
- **Added**: `src/channel/rpc_0_10_0.ts`
- **Default export**: Changed from ~~RPC 0.9~~ to RPC 0.10

```typescript
// V8
import { RpcChannel } from 'starknet'; // Was RPC 0.9 ❌

// V9
import { RpcChannel } from 'starknet'; // Now RPC 0.10 ✅
```

#### 4. Type Package Dependencies

The underlying type packages have been updated:

```typescript
// V8 dependencies
'@starknet-io/starknet-types-08'; // ❌ Removed
'@starknet-io/starknet-types-09'; // ✅ Still supported

// V9 dependencies
'@starknet-io/starknet-types-09'; // ✅ Supported
'@starknet-io/starknet-types-010'; // ✅ Added
```

Import paths updated:

**❌ No longer available:**

```typescript
import { RPCSPEC08, RPCSPEC09 } from 'starknet';
```

**✅ Use instead:**

```typescript
import { RPCSPEC09, RPCSPEC010 } from 'starknet';
```

## Block and State Changes

### Pending → PreConfirmed Terminology

The concept of ~~"pending"~~ blocks has been replaced with "pre-confirmed" blocks throughout the API:

**❌ No longer available:**

```typescript
import type { PendingBlock, PendingStateUpdate } from 'starknet';
const block = await provider.getBlock('pending');
```

**✅ Use instead:**

```typescript
import type { PreConfirmedBlock, PreConfirmedStateUpdate } from 'starknet';
const block = await provider.getBlock('pre_confirmed');
```

**Changed APIs:**

- Type: `PendingBlock` → `PreConfirmedBlock`
- Type: `PendingStateUpdate` → `PreConfirmedStateUpdate`
- Method parameter: `'pending'` → `'pre_confirmed'`

**Helper functions renamed:**

**❌ No longer available:**

```typescript
import { isPendingBlock, isPendingTransaction, isPendingStateUpdate } from 'starknet';

if (isPendingBlock(block)) {
  // handle pending block
}
```

**✅ Use instead:**

```typescript
import {
  isPreConfirmedBlock,
  isPreConfirmedTransaction,
  isPreConfirmedStateUpdate,
} from 'starknet';

if (isPreConfirmedBlock(block)) {
  // handle pre-confirmed block
}
```

## Provider Changes

### Provider Initialization

When creating a provider without specifying a version, v9 will use RPC 0.10:

```typescript
// V8 - defaults to RPC 0.9
const provider = new RpcProvider();

// V9 - defaults to RPC 0.10
const provider = new RpcProvider();

// V9 - explicit version selection
const provider = new RpcProvider({ specVersion: '0.9.0' });
```

## Migration Checklist

When upgrading from v8 to v9:

- [ ] Update `starknet` package to v9.x
- [ ] Remove any references to `RPC08` or `rpc_0_8_1`
- [ ] Replace `'pending'` block identifier with `'pre_confirmed'`
- [ ] Update type imports: `PendingBlock` → `PreConfirmedBlock`
- [ ] Update type imports: `PendingStateUpdate` → `PreConfirmedStateUpdate`
- [ ] Update helper functions: `isPendingBlock()` → `isPreConfirmedBlock()`
- [ ] Update helper functions: `isPendingTransaction()` → `isPreConfirmedTransaction()`
- [ ] Update helper functions: `isPendingStateUpdate()` → `isPreConfirmedStateUpdate()`
- [ ] Update type imports: `RPCSPEC08` → use `RPCSPEC09` or `RPCSPEC010`
- [ ] Test with RPC 0.10 endpoints (default)
- [ ] If needed, explicitly specify RPC 0.9 using `specVersion: '0.9.0'`
