---
sidebar_position: 2
---

# Contract Instance

This guide explains how to connect to and interact with smart contracts on Starknet using Starknet.js.

## Quick Start

```typescript
import { Contract, RpcProvider, Account } from 'starknet';

// For read-only access
const readOnlyContract = new Contract({
  abi: contractAbi,
  address: contractAddress,
  providerOrAccount: myProvider, // Provider for reading
});

// For read-write access
const readWriteContract = new Contract({
  abi: contractAbi,
  address: contractAddress,
  providerOrAccount: myAccount, // Account for writing
});
```

## Prerequisites

Before connecting to a contract, you need:

- ✅ A configured `Provider` (for read-only) or `Account` (for read-write) - see [Provider guide](../provider_instance.md) and [Account guide](../account/connect_account.md)
- ✅ The contract's address
- ✅ The contract's ABI (Application Binary Interface)

## Loading Contract ABI

### From Local File (Recommended)

:::tip Important
Use Starknet.js's `json` utility to correctly parse contract artifacts with `BigInt` values.
:::

```typescript
import fs from 'fs';
import { json } from 'starknet';

const contractArtifact = json.parse(fs.readFileSync('./path/to/contract.json').toString('ascii'));
const abi = contractArtifact.abi;
```

### From Network (Fallback)

```typescript
// ⚠️ Network intensive - avoid in production
const { abi } = await myProvider.getClassAt(contractAddress);
// Save for future use
fs.writeFileSync('./contract-abi.json', json.stringify(abi, null, 2));
```

## Creating Contract Instances

### Read-Only Access (Provider)

```typescript
const contract = new Contract({
  abi: contractAbi,
  address: contractAddress,
  providerOrAccount: myProvider, // Provider instance
});

// Only view functions work
const balance = await contract.get_balance();
```

### Read-Write Access (Account)

```typescript
const contract = new Contract({
  abi: contractAbi,
  address: contractAddress,
  providerOrAccount: myAccount, // Account instance
});

// Both view and invoke functions work
const balance = await contract.get_balance();
const tx = await contract.transfer(recipient, amount);
```

## Reading Contract State

### Direct Method Calls

```typescript
// Using contract methods (recommended)
const balance = await myContract.get_balance(address);
console.log('Balance:', balance.toString());

// Using generic call
const result = await myContract.call('get_balance', [address]);
```

### Handling Complex Return Types

```typescript
// Struct return value
const { amount, owner } = await myContract.get_token_info(tokenId);

// Array return value
const holders = await myContract.get_all_holders();
for (const holder of holders) {
  console.log('Holder:', holder);
}
```

## Writing to Contracts

### Basic Transaction

```typescript
// Send a transaction
const { transaction_hash } = await myContract.transfer(recipient, amount);

// Wait for confirmation
await myProvider.waitForTransaction(transaction_hash);
```

### Handling Complex Parameters

#### Structs

```typescript
// Cairo struct
/* 
struct TokenInfo {
    amount: felt252,
    owner: ContractAddress,
}
*/

// JavaScript object
await myContract.set_token_info({
  amount: 1000n,
  owner: '0x123...',
});
```

#### Arrays and Tuples

```typescript
// Arrays
await myContract.set_values([1, 2, 3]);

// Tuples
await myContract.set_coordinate({ x: 10, y: 20 });
```

## Advanced Features

### Using withOptions

The `withOptions` method allows you to customize how the next contract interaction is processed. These options only apply to the immediately following operation and don't persist for subsequent calls. For a complete list of available options, see the [ContractOptions API reference](../../API/namespaces/types.md#contractoptions).

```typescript
// Example: Multiple options for a transaction
const result = await myContract
  .withOptions({
    // Block identifier for reading state
    blockIdentifier: 'latest',

    // Request/Response parsing
    parseRequest: true, // Parse and validate input arguments
    parseResponse: true, // Parse response into structured data

    // Custom response formatting
    formatResponse: {
      balance: uint256ToBN, // Convert uint256 to BigNumber
      tokens: (arr) => arr.map(Number), // Convert array elements to numbers
    },

    // Transaction details (for writes)
    nonce: '0x1',
    version: '0x1',

    // V1 transaction max fee, soon to be deprecated
    maxFee: 1000n,

    // V3 transaction resource bounds, for RPC 0.8 and later
    resourceBounds: {
      l1_gas: { max_amount: '0x186a0', max_price_per_unit: '0x1' },
      l2_gas: { max_amount: '0x186a0', max_price_per_unit: '0x1' },
      l1_data_gas: { max_amount: '0x186a0', max_price_per_unit: '0x1' },
    },
  })
  .myFunction(arg1, arg2);
```

#### Common Use Cases

1. **Reading Historical State**:

```typescript
const pastBalance = await myContract
  .withOptions({ blockIdentifier: '0x123...' })
  .get_balance(address);
```

2. **Custom Response Formatting**:

```typescript
const { tokens, owner } = await myContract
  .withOptions({
    formatResponse: {
      tokens: (arr) => arr.map(BigInt),
      owner: (addr) => addr.toLowerCase(),
    },
  })
  .get_token_info();
```

3. **Raw Data Mode**:

```typescript
const rawResult = await myContract
  .withOptions({
    parseRequest: false,
    parseResponse: false,
  })
  .my_function();
```

4. **V3 Transaction with Resource Bounds**:

```typescript
const tx = await myContract
  .withOptions({
    version: '0x3',
    resourceBounds: {
      l1_gas: { max_amount: '0x186a0', max_price_per_unit: '0x1' },
      l2_gas: { max_amount: '0x186a0', max_price_per_unit: '0x1' },
      l1_data_gas: { max_amount: '0x186a0', max_price_per_unit: '0x1' },
    },
  })
  .transfer(recipient, amount);
```

### Fee Estimation

```typescript
// Estimate before sending
const { resourceBounds } = await myContract.estimateFee.transfer(recipient, amount);
console.log('Estimated fee:', json.stringify(resourceBounds));

// Use in transaction
const tx = await myContract
  .withOptions({
    resourceBounds,
  })
  .transfer(recipient, amount);
```

### Transaction Building

```typescript
// Prepare transaction without sending
const tx = myContract.populateTransaction.transfer(recipient, amount);

// Use in multicall
const { transaction_hash } = await myAccount.execute([
  tx,
  anotherContract.populateTransaction.approve(spender, amount),
]);
```

### Event Handling

```typescript
// Listen for events
const receipt = await myProvider.waitForTransaction(tx.transaction_hash);
const events = myContract.parseEvents(receipt);

// Process events
for (const event of events) {
  console.log('Event:', {
    name: event.name,
    data: event.data,
  });
}
```

## Type Safety

For enhanced development experience with TypeScript:

- ✨ Full type checking
- 💡 IDE autocompletion
- 🐛 Compile-time error detection

See our [TypeScript Integration Guide](./abi_typescript.md) for details.

## Next Steps

- **Deploy contracts**: See [Contract Deployment guide](./create_contract.md)
- **Interact with contracts**: See [Contract Interaction guide](./interact.md)
- **Handle complex data types**: See [Data Types guide](./define_call_message.md)
- **Work with multiple contracts**: See [Multicall guide](./multiCall.md)

## Best Practices

- Store ABIs locally instead of fetching from network
- Always update ABIs when recompiling contracts
- Use TypeScript for better type safety (see [TypeScript guide](./abi_typescript.md))
- Estimate fees before transactions
- Handle errors appropriately

## Common Issues and Solutions

| Issue                | Solution                                  |
| -------------------- | ----------------------------------------- |
| Transaction Reverted | Check parameters and contract state       |
| Insufficient Fee     | Use `estimateFee` and add buffer          |
| Nonce Too Low        | Wait for previous transaction to complete |
| Contract Not Found   | Verify address and network                |
