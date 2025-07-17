---
sidebar_position: 2
---

# Contract Instance

This guide explains how to connect to and interact with smart contracts on Starknet using starknet.js.

## Quick Start

```typescript
import { Contract, Provider } from 'starknet';

// Initialize provider
const provider = new Provider({ rpc: { nodeUrl: 'YOUR_NODE_URL' } });

// Connect to contract
const contract = new Contract(abi, contractAddress, provider);

// Read contract state
const result = await contract.my_view_function();

// Write to contract (requires Account)
const account = new Account(provider, accountAddress, privateKey);
const { transaction_hash } = await contract.connect(account).my_write_function(params);
```

## Prerequisites

Before connecting to a contract, you need:

- ✅ A configured `Provider` or `Account` instance
- ✅ The contract's address
- ✅ The contract's ABI (Application Binary Interface)

## Loading Contract ABI

### Method 1: From Local File (Recommended)

Use Starknet.js's `json` utility to correctly parse contract artifacts, including `BigInt` values:

```typescript
import fs from 'fs';
import { json } from 'starknet';

const contractArtifact = json.parse(fs.readFileSync('./path/to/contract.json').toString('ascii'));
```

### Method 2: From Network (Fallback)

Fetch the ABI directly from the network (use sparingly):

```typescript
import fs from 'fs';
import { json } from 'starknet';

// ⚠️ Network intensive operation
const { abi } = await provider.getClassAt(contractAddress);
// Save for future use
fs.writeFileSync('./contract-abi.json', json.stringify(abi, null, 2));
```

## Creating Contract Instances

### Read-Only Access

For reading contract state (view functions):

```typescript
import { Contract, Provider } from 'starknet';

const provider = new Provider({ rpc: { nodeUrl: 'YOUR_NODE_URL' } });
const contract = new Contract(abi, contractAddress, provider);

// Call view functions
const result = await contract.get_balance();
```

### Read-Write Access

For full contract interaction (including state modifications):

```typescript
import { Contract, Account } from 'starknet';

const account = new Account(provider, accountAddress, privateKey);
const contract = new Contract(abi, contractAddress, account);

// Now you can both read and write
const balance = await contract.get_balance();
const tx = await contract.set_balance(newBalance);
```

## Reading Contract State

### Direct Method Calls

```typescript
// Using contract methods (recommended)
const balance = await contract.get_balance(address);
console.log('Balance:', balance.toString());

// Using generic call
const result = await contract.call('get_balance', [address]);
```

### Handling Complex Return Types

```typescript
// Struct return value
const { amount, owner } = await contract.get_token_info(tokenId);

// Array return value
const holders = await contract.get_all_holders();
for (const holder of holders) {
  console.log('Holder:', holder);
}
```

## Writing to Contracts

### Basic Transaction

```typescript
// Send a transaction
const { transaction_hash } = await contract.transfer(recipient, amount);

// Wait for confirmation
await provider.waitForTransaction(transaction_hash);
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
await contract.set_token_info({
  amount: 1000n,
  owner: '0x123...',
});
```

#### Arrays and Tuples

```typescript
// Arrays
await contract.set_values([1, 2, 3]);

// Tuples
await contract.set_coordinate({ x: 10, y: 20 });
```

## Advanced Features

### Using withOptions

The `withOptions` method allows you to customize how the next contract interaction is processed. These options only apply to the immediately following operation and don't persist for subsequent calls. For a complete list of available options, see the [ContractOptions API reference](../../API/namespaces/types.md#contractoptions).

```typescript
// Example: Multiple options for a transaction
const result = await contract
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
    maxFee: 1000n,
    nonce: '0x1',
    version: '0x1',

    // V3 transaction resource bounds
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
const pastBalance = await contract
  .withOptions({ blockIdentifier: '0x123...' })
  .get_balance(address);
```

2. **Custom Response Formatting**:

```typescript
const { tokens, owner } = await contract
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
const rawResult = await contract
  .withOptions({
    parseRequest: false,
    parseResponse: false,
  })
  .my_function();
```

4. **V3 Transaction with Resource Bounds**:

```typescript
const tx = await contract
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
const { suggestedMaxFee } = await contract.estimateFee.transfer(recipient, amount);
console.log('Estimated fee:', suggestedMaxFee.toString());

// Use in transaction
const tx = await contract.transfer(recipient, amount, {
  maxFee: suggestedMaxFee,
});
```

### Transaction Building

```typescript
// Prepare transaction without sending
const tx = contract.populateTransaction.transfer(recipient, amount);

// Use in multicall
const { transaction_hash } = await account.execute([
  tx,
  anotherContract.populateTransaction.approve(spender, amount),
]);
```

### Event Handling

```typescript
// Listen for events
const receipt = await provider.waitForTransaction(tx.transaction_hash);
const events = contract.parseEvents(receipt);

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

## Best Practices

1. **ABI Management**

   - Store ABIs locally instead of fetching from network
   - Use version control for ABI files
   - **Always update your local ABI when recompiling contracts**:

   - Using outdated ABIs can cause unexpected errors, especially if you've:
     - Added or removed functions
     - Changed function parameters
     - Modified function visibility
     - Updated Cairo version

2. **Error Handling**

   ```typescript
   try {
     const tx = await contract.transfer(recipient, amount);
     await provider.waitForTransaction(tx.transaction_hash);
   } catch (error) {
     if (error.message.includes('insufficient balance')) {
       console.error('Not enough funds!');
     } else {
       console.error('Transaction failed:', error);
     }
   }
   ```

3. **Transaction Monitoring**

   ```typescript
   const tx = await contract.transfer(recipient, amount);
   const receipt = await provider.waitForTransaction(tx.transaction_hash, {
     retryInterval: 2000,
     successStates: ['ACCEPTED_ON_L2'],
   });
   ```

4. **Resource Management**
   - Always estimate fees before transactions
   - Set appropriate gas limits
   - Consider using `withOptions` for fine-grained control

## Common Issues and Solutions

| Issue                | Solution                                  |
| -------------------- | ----------------------------------------- |
| Transaction Reverted | Check parameters and contract state       |
| Insufficient Fee     | Use `estimateFee` and add buffer          |
| Nonce Too Low        | Wait for previous transaction to complete |
| Contract Not Found   | Verify address and network                |
