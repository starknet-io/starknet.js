---
sidebar_position: 7
---

# Create new contract

When you have compiled your new Cairo contract, you can deploy it in the network.

In Starknet, a new contract has to be added in two phases:

1. Create the contract class.
2. Deploy an instance of the contract.

> You must first declare your contract class and only then deploy a new instance of it!

![](./pictures/createContract.png)

> Both declaration and deployment will cost fees. That's why these functions are methods of the `Account` object. The account should be funded enough to be able to process everything.

- The contract class contains the logic of the contract. A contract class is identified by its Class Hash.
- The contract instance contains the memory storage of this instance. A contract instance is identified by its contract address. You will interact with the contract instance by using this address.

You will have only one Class Hash for one contract code, but you can have as many contract instances as you need.

Other users of the network can use your declared contract. It means that if somebody has already declared a contract class (and paid this declaration), and if you would like to have your own instance of this contract, you have only to deploy (and pay) a new instance.

Example: if you want an ERC20 contract, and somebody has already declared an ERC20 contract that conforms to your needs, you have just to deploy a new instance of this contract class.

```typescript
import { Provider, Account, Contract, json, stark, uint256, shortString } from "starknet";
```

## `declareAndDeploy()` your new contract

Starknet.js proposes a function to perform both operations in one step: `declareAndDeploy()`.

Here, to declare & deploy a `Test.cairo` smartcontract, in devnet:

```typescript
// connect provider
const provider = new Provider({ sequencer: { baseUrl: "http://127.0.0.1:5050" } });
// connect your account. To adapt to your own account:
const privateKey0 = process.env.OZ_ACCOUNT_PRIVATE_KEY;
const account0Address: string = "0x123....789";
const account0 = new Account(provider, account0Address, privateKey0);

// Declare & deploy Test contract in devnet
const compiledTestSierra = json.parse(fs.readFileSync( "./compiledContracts/test.sierra").toString( "ascii"));
const compiledTestCasm = json.parse(fs.readFileSync( "./compiledContracts/test.casm").toString( "ascii"));
const deployResponse = await account0.declareAndDeploy({ contract: compiledTestSierra, casm: compiledTestCasm });

// Connect the new contract instance:
const myTestContract = new Contract(compiledTest.abi, deployResponse.deploy.contract_address, provider);
console.log("Test Contract Class Hash =", deployResponse.declare.class_hash);
console.log('✅ Test Contract connected at =', myTestContract.address);
```

## `deployContract()` for a new instance

If the contract class is already declared, it's faster and cheaper: just use `deployContract()`.

```typescript
// connect provider
const provider = new Provider({ sequencer: { baseUrl: "http://127.0.0.1:5050" } });
// connect your account. To adapt to your own account:
const privateKey0 = process.env.OZ_ACCOUNT_PRIVATE_KEY;
const account0Address: string = "0x123....789";

const account0 = new Account(provider, account0Address, privateKey0);

// Deploy Test contract in devnet
// ClassHash of the already declared contract
const testClassHash = "0xff0378becffa6ad51c67ac968948dbbd110b8a8550397cf17866afebc6c17d";

const deployResponse = await account0.deployContract({ classHash: testClassHash });
await provider.waitForTransaction( deployResponse.transaction_hash);

// read abi of Test contract
const { abi: testAbi } = await provider.getClassByHash( testClassHash);
if (testAbi === undefined) { throw new Error("no abi.") };

// Connect the new contract instance:
const myTestContract = new Contract(testAbi, deployResponse.contract_address, provider);
console.log('✅ Test Contract connected at =', myTestContract.address);
```

## Construct the constructor

If your contract has a constructor with inputs, you have to provide these inputs in the `deployContract` or `declareAndDeploy` commands.
For example, with this contract constructor:

```json
    "name": "constructor",
    "inputs": [
      {
        "name": "text",
        "type": "core::felt252"
      },
      {
        "name": "longText",
        "type": "core::array::Array::<core::felt252>"
      },
      {
        "name": "array1",
        "type": "core::array::Array::<core::felt252>"
      }
    ],
```

You have several ways to define these inputs:

### myCalldata.compile

This is the recommended way to proceed:

```typescript
const myArray1: RawCalldata = ["0x0a", 24, 36n];
const contractCallData: CallData = new CallData(compiledContractSierra.abi);
const contractConstructor: Calldata = contractCallData.compile("constructor", {
        text: 'niceToken',
        longText: "http://addressOfMyERC721pictures/image1.jpg",
        array1: myArray1
    });
const deployResponse = await account0.deployContract({
    classHash: contractClassHash,
    constructorCalldata: contractConstructor
});
```

Starknet.js will perform a full verification of conformity with the abi. Properties can be unordered. Do not use properties for array_len, it will be handled automatically by Starknet.js.

### CallData.compile

For very simple constructors, you can use `CallData.compile`:

```typescript
const myArray1: RawCalldata = ["0x0a", 24, 36n];
const contractConstructor: Calldata = CallData.compile({
        text: 'niceToken',
        longText: "http://addressOfMyERC721pictures/image1.jpg",
        array1: myArray1
    });
const deployResponse = await account0.deployContract({
    classHash: contractClassHash,
    constructorCalldata: contractConstructor
});
```

Properties have to be ordered in conformity with the abi.

Even easier:

```typescript
const contractConstructor: Calldata = CallData.compile(['niceToken', "http://addressOfMyERC721pictures/image1.jpg", myArray1]);
```

## `declare()` for a new class

If you want only declare a new Contract Class, use `declare()`.

```typescript
// connect provider
const provider = new Provider({ sequencer: { baseUrl: "http://127.0.0.1:5050" } });
// connect your account. To adapt to your own account:
const privateKey0 = process.env.OZ_ACCOUNT_PRIVATE_KEY;
const account0Address: string = "0x123....789";

const account0 = new Account(provider, account0Address, starkKeyPair0);

// Declare Test contract in devnet
const compiledTestSierra = json.parse(fs.readFileSync( "./compiledContracts/test.sierra").toString("ascii"));
const compiledtestCasm = json.parse(fs.readFileSync( "./compiledContracts/test.casm").toString("ascii"));
const declareResponse = await account0.declare({ contract: compiledTestSierra, casm: compiledTestCasm });
console.log('Test Contract declared with classHash =', declareResponse.class_hash);
await provider.waitForTransaction(declareResponse.transaction_hash);
console.log("✅ Test Completed.");
```
