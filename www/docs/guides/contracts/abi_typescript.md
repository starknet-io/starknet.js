---
sidebar_position: 6
---

# TypeScript Integration with Cairo ABIs

Starknet.js provides seamless TypeScript integration for Cairo smart contracts through [Abi-Wan-Kanabi](https://github.com/keep-starknet-strange/abi-wan-kanabi). This powerful feature enables:

- 🔍 Real-time type checking for contract interactions
- 💡 Smart autocompletion in your IDE
- 🐛 Early error detection before on-chain execution
- 📝 Better developer experience with type safety

## Supported Cairo Versions

The integration supports various Cairo versions through Abi-Wan-Kanabi. Check the [compatibility matrix](https://github.com/keep-starknet-strange/abi-wan-kanabi#cairo-versions) for specific version support.

## Basic Usage

### 1. Define Your Contract ABI

First, create a TypeScript file with your contract's ABI. The ABI must be wrapped in an array and exported as a `const`:

```typescript
export const ABI = [
  {
    type: 'function',
    name: 'increase_balance',
    inputs: [
      {
        name: 'amount',
        type: 'core::felt252',
      },
    ],
    outputs: [],
    state_mutability: 'external',
  },
] as const;
```

### 2. Create a Typed Contract Instance

Use the ABI to create a typed contract instance:

```typescript
import { Contract, RpcProvider } from 'starknet';

const address = 'YOUR_CONTRACT_ADDRESS';
const myProvider = new RpcProvider({ nodeUrl: `${yourNodeUrl}` });

// Create a typed contract instance
const myContract = new Contract({
  abi: ABI,
  address,
  providerOrAccount: myProvider,
}).typedv2(ABI);

// Enjoy autocompletion and type checking!
const result = await myContract.increase_balance(100);
```

## Working with Deployed Contracts

### Generating TypeScript Types from Deployed Contracts

For existing contracts on Starknet, you can generate TypeScript types in two ways:

1. **Using Contract Class JSON**:

   ```bash
   npx abi-wan-kanabi --input /path/to/contract_class.json --output /path/to/abi.ts
   ```

2. **Directly from Network** (using starkli):
   ```bash
   # Fetch ABI and generate types in one command
   starkli class-at "CONTRACT_ADDRESS" --network mainnet | npx abi-wan-kanabi --input /dev/stdin --output abi.ts
   ```

### Example: Interacting with a Deployed Contract

Here's a complete example of interacting with a deployed contract using generated types:

```typescript
import { Contract, RpcProvider, constants } from 'starknet';
import { ABI } from './abi';

const address = '0x00000005dd3d2f4429af886cd1a3b08289dbcea99a294197e9eb43b0e0325b4b';
const myProvider = new RpcProvider({ nodeUrl: constants.NetworkName.SN_MAIN });

// Create typed contract instance
const myContract = new Contract({
  abi: ABI,
  address,
  providerOrAccount: myProvider,
}).typedv2(ABI);

// Enjoy type inference and autocompletion
const primaryInterfaceId = await myContract.get_primary_interface_id();
const protocolFees = await myContract.get_protocol_fees_collected('0x1');
```

## Benefits of Type Safety

Using typed contracts provides several advantages:

1. **Compile-Time Error Detection**: Catch parameter type mismatches before deployment
2. **IDE Support**: Get function parameter hints and return type information
3. **Refactoring Support**: Safely rename functions and update parameters
4. **Documentation**: Types serve as inline documentation for contract interfaces

## Best Practices

1. Always use `typedv2()` for the latest type-checking features
2. Keep your ABI files in a dedicated directory for better organization
3. Use meaningful variable names that reflect the typed nature of your contracts
4. Consider creating type-safe wrapper functions for common contract interactions
