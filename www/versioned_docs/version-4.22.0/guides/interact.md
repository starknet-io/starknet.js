---
sidebar_position: 6
---

# Interact with your contract

Once your provider, contract and account are connected, you can interact with the contract:

- you can read the memory of the contract, without fees.
- you can write to memory, but you have to pay fees.
  - On Mainnet, you have to pay fees with bridged ETH token.
  - On Testnet 1 & 2, you have to pay with bridged Goerli ETH token.
  - On devnet, you have to pay with dummy ETH token.

Your account should be funded enough to pay fees (0.01 ETH should be enough to start).

![](./pictures/Interact_contract.png)

Here we will interact with a `test.cairo` contract, already deployed in Testnet 1 and Testnet 2, at addresses:

- testnet1: [0x5f7cd1fd465baff2ba9d2d1501ad0a2eb5337d9a885be319366b5205a414fdd](https://testnet.starkscan.co/contract/0x5f7cd1fd465baff2ba9d2d1501ad0a2eb5337d9a885be319366b5205a414fdd#read-contract).
- testnet2: [0x2367db6b0df07033d196dcd25961109d8fbc86227158343149742284c7582e](https://testnet-2.starkscan.co/contract/0x002367db6b0df07033d196dcd25961109d8fbc86227158343149742284c7582e#read-contract).

We will use Testnet1, so you need a funded wallet in this network.

This contract contains a storage memory called `balance`.

- It can be read with the `@view function: get_balance()`
- Balance can be modified with the `@external function: increase_balance(amount1: felt, amount2: felt)`

```typescript
import { Provider, Contract, Account, ec, json } from "starknet";
```

## 🔍 Read contract memory, with call

To read the balance, you need only to connect a Provider and a Contract.  
You have to use the call function: `contract.call("function_name", [params])` (here `params` is not necessary, because there are no parameters for the `get_balance` function).

```typescript
//initialize Provider
const provider = new Provider({ sequencer: { network: "goerli-alpha" } });
// Connect the deployed Test contract in Testnet
const testAddress = "0x5f7cd1fd465baff2ba9d2d1501ad0a2eb5337d9a885be319366b5205a414fdd";

// read abi of Test contract
const { abi: testAbi } = await provider.getClassAt(testAddress);
if (testAbi === undefined) { throw new Error("no abi.") };
const myTestContract = new Contract(testAbi, testAddress, provider);

// Interaction with the contract with call
const bal1 = await myTestContract.call("get_balance");
console.log("Initial balance =", bal1.res.toString()); // .res because the  return value is called 'res' in the cairo contract
```

## ✍️ Write contract memory, with invoke

To increase the balance, you need in addition a connected and funded Account.

You have to use the invoke function: `contract.invoke("function_name", [params])`
After the invoke function, you have to wait the incorporation of the modification of Balance in the network, with `await provider.waitForTransaction(transaction_hash)`

Here is an example to increase and check the balance:

```typescript
//initialize Provider
const provider = new Provider({ sequencer: { network: "goerli-alpha" } });
// connect your account. To adapt to your own account:
const privateKey0 = process.env.OZ_ACCOUNT_PRIVATE_KEY;
const account0Address = "0x123....789";

const starkKeyPair0 = ec.getKeyPair(privateKey0);
const account0 = new Account(provider, account0Address, starkKeyPair0);

// Connect the deployed Test contract in Testnet
const testAddress = "0x5f7cd1fd465baff2ba9d2d1501ad0a2eb5337d9a885be319366b5205a414fdd";

// read abi of Test contract
const { abi: testAbi } = await provider.getClassAt(testAddress);
if (testAbi === undefined) { throw new Error("no abi.") };
const myTestContract = new Contract(testAbi, testAddress, provider);

// Connect account with the contract
myTestContract.connect(account0);

// Interactions with the contract with call & invoke
const bal1 = await myTestContract.call("get_balance");
console.log("Initial balance =", bal1.res.toString());
const res = await myTestContract.invoke("increase_balance", [10, 30]);

await provider.waitForTransaction(res.transaction_hash);
const bal2 = await myTestContract.call("get_balance");
console.log("Initial balance =", bal2.res.toString());
```

## Use meta-class of Contract

You have another way to interact with a contract - the meta-class: each `Contract` object as specific functions to interact. For example here, we have 2 additional functions for the Test contract object:

- `Contract.get_balance()`
- `Contract.increase_balance()`

The code can be modified this way:

```typescript
//initialize Provider
const provider = new Provider({ sequencer: { network: "goerli-alpha" } });
// connect your account. To adapt to your own account:
const privateKey0 = process.env.OZ_ACCOUNT_PRIVATE_KEY;
const account0Address = "0x123....789";

const starkKeyPair0 = ec.getKeyPair(privateKey0);
const account0 = new Account(provider, account0Address, starkKeyPair0);

// Connect the deployed Test contract in Testnet
const testAddress = "0x5f7cd1fd465baff2ba9d2d1501ad0a2eb5337d9a885be319366b5205a414fdd";

// read abi of Test contract
const { abi: testAbi } = await provider.getClassAt(testAddress);
if (testAbi === undefined) { throw new Error("no abi.") };
const myTestContract = new Contract(testAbi, testAddress, provider);

// Connect account with the contract
myTestContract.connect(account0);

// Interactions with the contract with call & invoke
const bal1 = await myTestContract.get_balance();
console.log("Initial balance =", bal1.res.toString());

const resu = await myTestContract.increase_balance(10, 30);
await provider.waitForTransaction(resu.transaction_hash);

const bal2 = await myTestContract.get_balance();import { Provider, Contract, Account, ec, json } from "starknet";
console.log("Initial balance =", bal2.res.toString());
```

## Write to contract memory, with Account.execute

If you have to invoke a function of a contract that need the proof that you have the private key of the account, you have to invoke this function with `account.execute`.

We will see this case more in detail in ERC20 scripts, but in summary, you use this command with the following parameters:

- address of the contract to invoke
- name of the function to invoke
- and array of parameters for this function

```typescript
const executeHash = await account.execute(
  {
    contractAddress: myContractAddress,
    entrypoint: 'transfer',
    calldata: stark.compileCalldata({
      recipient: receiverAddress,
      amount: ['10']
    })
  }
);
await provider.waitForTransaction(executeHash.transaction_hash);
```
