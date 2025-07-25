---
sidebar_position: 7
---

# Interact with Multiple Contracts

Interacting with more than one contract with one transaction is one of Starknet's features. To use this feature, two contracts are required.

## Prerequisites

Before using multicalls, ensure you have:

- A connected Account instance (see [Account guide](../account/connect_account.md))
- Contract addresses you want to interact with

```typescript
// Example contract addresses
const ethTokenAddress = '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7';
const bridgeAddress = '0x078f36c1d59dd29e00a0bb60aa2a9409856f4f9841c47f165aba5bab4225aa6b';
```

## Interact with contracts

Interact with more than one contract by using `account.execute([calls])`. The example is as follows.

```typescript
import { CallData, cairo } from 'starknet';

const multiCall = await myAccount.execute([
  // First call: Approve tokens
  {
    contractAddress: ethTokenAddress,
    entrypoint: 'approve',
    calldata: CallData.compile({
      spender: bridgeAddress,
      amount: cairo.uint256(1),
    }),
  },
  // Second call: Use approved tokens
  {
    contractAddress: bridgeAddress,
    entrypoint: 'transfer_ether',
    calldata: CallData.compile({
      amount: cairo.uint256(1),
    }),
  },
]);

await myProvider.waitForTransaction(multiCall.transaction_hash);
console.log('Multicall completed!');
```

## Using Contract.populate()

For better type safety and parameter validation:

```typescript
// Prepare calls using contract instances
const approveCall = ethContract.populate('approve', {
  spender: bridgeAddress,
  amount: cairo.uint256(transferAmount),
});

const transferCall = bridgeContract.populate('transfer_ether', {
  amount: cairo.uint256(transferAmount),
});

// Execute both calls in one transaction
const tx = await myAccount.execute([approveCall, transferCall]);
await myProvider.waitForTransaction(tx.transaction_hash);
```
