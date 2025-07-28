---
sidebar_position: 1
---

# Deploy

## Overview

In Starknet, deploying a smart contract involves two distinct phases:

1. **Declaring the contract class** - Publishing the contract's logic and code on the network
2. **Deploying a contract instance** - Creating a specific instance with its own storage and address

This two-phase deployment model is unique to Starknet and offers several advantages:

- Cost efficiency: Multiple instances can reuse the same declared class
- Storage optimization: Contract code is stored once per class
- Upgradability: New instances can be deployed from existing classes

![Contract Creation Process](./pictures/DeclareDeploy.svg)

:::tip Important Concepts

- **Contract Class**: Contains the logic and code (identified by Class Hash)
- **Contract Instance**: Contains the state/storage (identified by Contract Address)
- **Fees**: Both declaration and deployment incur fees, paid by the declaring account

:::

## Deployment Methods Overview

Starknet.js provides two main approaches for contract deployment:

| Method                 | Use Case                       | Declare + Deploy | Deploy Only | ABI Handling         |
| ---------------------- | ------------------------------ | :--------------: | :---------: | -------------------- |
| **Contract.factory()** | Quick, streamlined deployments |        ✅        |     ✅      | Auto-fetch or manual |
| **Account methods**    | Fine-grained control           |        ✅        |     ✅      | Manual               |

Choose the method that best fits your use case:

- **Contract.factory()**: Best for most use cases, especially when deploying from existing class hashes
- **Account methods**: Use when you need maximum control over the deployment process

## Using Contract.factory Static Method

The `Contract.factory()` static method provides a streamlined approach for both declaring and deploying contracts, or deploying from existing class hashes. It returns a ready-to-use Contract instance.

### Declare and Deploy Mode

Use this mode when you need to declare a new contract class and deploy an instance:

```typescript
import { Contract } from 'starknet';

// Declare and deploy in one step
const myContract = await Contract.factory({
  contract: compiledSierra, // Compiled Sierra contract
  casm: compiledCasm, // Compiled CASM file
  account: myAccount, // Deploying account
  constructorCalldata: {
    name: 'MyToken',
    symbol: 'MTK',
    decimals: 18,
    initialSupply: 1000n * 10n ** 18n,
    recipient: myAccount.address,
  },
});

console.log('Contract deployed at:', myContract.address);
console.log('Class hash:', myContract.classHash);

// Contract is immediately ready to use
const balance = await myContract.balanceOf(myAccount.address);
```

### Deploy-Only Mode

When you have an existing class hash (e.g., standard contracts like ERC20), you can deploy directly without declaring:

#### Deploy with ABI Fetched from Network

```typescript
// ABI will be automatically fetched from the network
const myContract = await Contract.factory({
  classHash: '0x1234...', // Existing class hash
  account: myAccount,
  constructorCalldata: {
    name: 'MyToken',
    symbol: 'MTK',
    decimals: 18,
    initialSupply: 1000n * 10n ** 18n,
    recipient: myAccount.address,
  },
});

// Contract is ready with automatically fetched ABI
const totalSupply = await myContract.totalSupply();
```

#### Deploy with Provided ABI (Faster)

```typescript
// Provide ABI to skip network fetch
const myContract = await Contract.factory({
  classHash: '0x1234...', // Existing class hash
  abi: contractAbi, // Your contract ABI
  account: myAccount,
  constructorCalldata: {
    name: 'MyToken',
    symbol: 'MTK',
    decimals: 18,
    initialSupply: 1000n * 10n ** 18n,
    recipient: myAccount.address,
  },
});
```

### Advanced Options

The factory method supports all deployment parameters:

```typescript
const myContract = await Contract.factory({
  classHash: '0x1234...',
  abi: contractAbi, // Optional: will fetch from network if not provided
  account: myAccount,
  constructorCalldata: {
    // Your constructor parameters
  },
  salt: '0xabcd...', // Optional: custom salt for address generation
  unique: false, // Optional: set to false for predictable addresses
  parseRequest: true, // Optional: enable/disable request parsing (default: true)
});
```

### Error Handling

```typescript
try {
  const myContract = await Contract.factory({
    classHash: '0x1234...',
    account: myAccount,
    constructorCalldata: constructorParams,
  });
} catch (error) {
  if (error.message.includes('Class hash not declared')) {
    console.error('Class hash does not exist on the network');
  } else if (error.message.includes('ABI not found')) {
    console.error('Could not fetch ABI from network, provide it manually');
  } else {
    console.error('Deployment failed:', error.message);
  }
}
```

:::tip Recommended Approach

`Contract.factory()` is the recommended way to deploy and create contract instances in Starknet.js. It provides a streamlined API that handles both declaration and deployment, with automatic ABI fetching when deploying from existing class hashes.

:::

## Using Account Methods Directly

If you need more fine-grained control over the deployment process, you can use the Account methods directly.

### Quick Start: `declareAndDeploy()`

The fastest way to get your contract on Starknet is using the `declareAndDeploy()` method, which handles both phases in one transaction.

```typescript
import {
  RpcProvider,
  Account,
  Contract,
  json,
  stark,
  uint256,
  shortString,
  type RawCalldata,
  type Calldata,
} from 'starknet';

// 1. Setup Provider & Account
const myProvider = new RpcProvider({ nodeUrl: `${myNodeUrl}` });
const myAccount = new Account(
  myProvider,
  process.env.ACCOUNT_ADDRESS!, // Your account address
  process.env.PRIVATE_KEY! // Your private key
);

// 2. Load Compiled Contract
const compiledSierra = json.parse(
  fs.readFileSync('./compiledContracts/test.contract_class.json').toString('ascii')
);
const compiledCasm = json.parse(
  fs.readFileSync('./compiledContracts/test.compiled_contract_class.json').toString('ascii')
);

// 3. Declare & Deploy
const response = await myAccount.declareAndDeploy({
  contract: compiledSierra,
  casm: compiledCasm,
});

// 4. Create Contract Instance
const myContract = new Contract(compiledSierra.abi, response.deploy.contract_address, myProvider);

console.log('Contract Class Hash:', response.declare.class_hash);
console.log('Contract Address:', myContract.address);
```

### Deploying from Existing Classes

If you want to deploy a new instance of an already declared contract class (e.g., a standard ERC20), use `deployContract()`:

```typescript
// 1. Setup (provider & account setup same as above)

// 2. Deploy using existing class hash
const existingClassHash = '0xff0378becffa6ad51c67ac968948dbbd110b8a8550397cf17866afebc6c17d';
const deployResponse = await myAccount.deployContract({
  classHash: existingClassHash,
});

// 3. Wait for deployment
await myProvider.waitForTransaction(deployResponse.transaction_hash);

// 4. Get contract ABI and create instance
const { abi } = await myProvider.getClassByHash(existingClassHash);
if (!abi) throw new Error('Contract ABI not found');

const myContract = new Contract(abi, deployResponse.contract_address, myProvider);
```

:::tip Simplified Alternative
For a more streamlined approach, consider using `Contract.factory()` which handles ABI fetching automatically:

```typescript
const myContract = await Contract.factory({
  classHash: existingClassHash,
  account: myAccount,
  // ABI will be fetched automatically from the network
});
```

:::

### Working with Constructors

Many contracts require constructor arguments during deployment. Here are the recommended ways to handle constructor parameters:

#### 1. Using `myCalldata.compile` (Recommended)

This method provides type safety and automatic validation against the contract's ABI:

```typescript
// Example constructor with multiple parameter types
const myArray: RawCalldata = ['0x0a', 24, 36n];
const contractCallData = new CallData(compiledContractSierra.abi);

const constructorParams = contractCallData.compile('constructor', {
  name: 'MyToken',
  symbol: 'MTK',
  decimals: 18,
  initialSupply: 1000n * 10n ** 18n,
  array: myArray,
});

const deployResponse = await myAccount.deployContract({
  classHash: contractClassHash,
  constructorCalldata: constructorParams,
});
```

#### 2. Using `CallData.compile` (Simple Cases)

For straightforward constructors, you can use the simpler `CallData.compile`:

```typescript
// Named parameters
const constructorParams = CallData.compile({
  name: 'MyToken',
  symbol: 'MTK',
  decimals: 18,
});

// OR array format
const constructorParams = CallData.compile(['MyToken', 'MTK', 18]);
```

:::warning
Unlike `myCalldata.compile`, even the named parameters must match their order in the ABI since `CallData.compile` doesn't have access to the ABI to verify and enforce its constraints.
:::

:::tip String Handling
For Cairo 2.4.0+, you can pass strings directly. For older versions, use:

```typescript
shortString.splitLongString('Your long string here');
```

:::

### Declaring New Contract Classes

To only declare a new contract class without deployment, use `declare()`:

```typescript
const declareResponse = await myAccount.declare({
  contract: compiledSierra,
  casm: compiledCasm,
});

await myProvider.waitForTransaction(declareResponse.transaction_hash);
console.log('Class Hash:', declareResponse.class_hash);
```

:::tip Avoiding Duplicate Declarations
Use `declareIfNot()` to prevent errors when declaring an already existing contract class:

```typescript
const declareResponse = await myAccount.declareIfNot({
  contract: compiledSierra,
  casm: compiledCasm,
});
```

:::

## Best Practices

1. **Always wait for transactions**: Use `myProvider.waitForTransaction()` after deployments
2. **Error handling**: Implement proper try-catch blocks for network issues
3. **Gas estimation**: Consider estimating fees before deployment
4. **Contract verification**: Verify your contract works as intended on Devnet and/or Testnet before deploying to Mainnet
