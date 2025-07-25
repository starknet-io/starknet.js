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

## Using Contract.factory() Static Method

Starknet.js v8 provides a static `Contract.factory()` method for deploying contracts. This method handles the entire deployment lifecycle: compiling constructor calldata, declaring the contract class, deploying an instance, and returning a ready-to-use Contract object.

This approach is useful when you need to:

- Deploy contracts with automatic declaration and deployment
- Ensure constructor argument validation against the contract ABI
- Get a ready-to-use Contract instance immediately after deployment

### Deploying Contracts with Contract.factory()

```typescript
import { Contract } from 'starknet';

// Deploy with constructor arguments
const myContract = await Contract.factory({
  compiledContract: compiledSierra, // Your compiled Sierra contract
  account: myAccount, // Account that will deploy the contract
  casm: compiledCasm, // CASM file for the contract
  constructorArguments: {
    name: 'MyToken',
    symbol: 'MTK',
    decimals: 18,
    initialSupply: 1000n * 10n ** 18n,
  },
  parseRequest: true, // Enable ABI validation (default: true)
});

console.log('Contract deployed at:', myContract.address);
```

### Factory Method Features

```typescript
// The factory method handles both declare and deploy automatically
const contract = await Contract.factory({
  compiledContract: contractCode,
  account: myAccount,
  casm: compiledCasm,
  constructorArguments: { owner: myAccount.address },
});

// Start using the contract immediately - no need to wait for deployment
const balance = await contract.balanceOf(myAccount.address);
```

### Advanced Usage

1. **Constructor Argument Validation**

```typescript
// With parseRequest: true (default), arguments are validated against ABI
const contract = await Contract.factory({
  compiledContract: erc20Contract,
  account: myAccount,
  casm: erc20Casm,
  constructorArguments: {
    name: 'MyToken',
    symbol: 'MTK',
    decimals: 18,
    initial_supply: cairo.uint256(1000000),
    recipient: myAccount.address,
  },
  parseRequest: true, // Validates arguments against contract ABI
});
```

2. **Deploy Multiple Instances**

```typescript
// Deploy multiple instances of the same contract
const deployMultipleTokens = async () => {
  const tokens = [];

  const tokenConfigs = [
    { name: 'Token1', symbol: 'TK1', decimals: 18 },
    { name: 'Token2', symbol: 'TK2', decimals: 18 },
  ];

  for (const tokenConfig of tokenConfigs) {
    const token = await Contract.factory({
      compiledContract: erc20Contract,
      account: myAccount,
      casm: erc20Casm,
      constructorArguments: tokenConfig,
    });
    tokens.push(token);
  }

  return tokens;
};
```

### Best Practices with Contract.factory()

1. **Handle Deployment Errors**

```typescript
try {
  const myContract = await Contract.factory({
    compiledContract: contractCode,
    account: myAccount,
    casm: compiledCasm,
    constructorArguments: constructorParams,
  });
  console.log('Deployed at:', myContract.address);
} catch (error) {
  if (error.message.includes('Class hash not declared')) {
    console.error('Contract class needs to be declared first');
  } else if (error.message.includes('Insufficient funds')) {
    console.error('Account has insufficient funds for deployment');
  } else {
    console.error('Deployment failed:', error.message);
  }
}
```

2. **Reuse Compiled Contracts**

```typescript
// Load contracts once, deploy multiple times
const erc20Contract = json.parse(fs.readFileSync('./ERC20.sierra.json').toString());
const erc20Casm = json.parse(fs.readFileSync('./ERC20.casm.json').toString());

// Deploy multiple tokens efficiently
const token1 = await Contract.factory({
  compiledContract: erc20Contract,
  account: myAccount,
  casm: erc20Casm,
  constructorArguments: { name: 'Token1', symbol: 'TK1' },
});

const token2 = await Contract.factory({
  compiledContract: erc20Contract,
  account: myAccount,
  casm: erc20Casm,
  constructorArguments: { name: 'Token2', symbol: 'TK2' },
});
```

:::tip
The `Contract.factory()` method is the simplest way to deploy a new contract and get contract instance.
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

// Assuming provider and account are already set up (see Account guide)
// Load compiled contract files
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
const myContract = new Contract({
  abi: compiledSierra.abi,
  address: response.deploy.contract_address,
  providerOrAccount: myProvider,
});

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

const myContract = new Contract({
  abi,
  address: deployResponse.contract_address,
  providerOrAccount: myProvider,
});
```

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
