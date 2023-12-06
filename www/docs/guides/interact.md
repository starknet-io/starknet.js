---
sidebar_position: 6
---

# Interact with your contract

Once your provider, contract, and account are connected, you can interact with the contract:

- you can read the memory of the contract, without fees.
- you can write to memory, but you have to pay fees.
  - On Mainnet, you have to pay fees with a bridged ETH token.
  - On Testnet, you have to pay with a bridged Goerli ETH token.
  - On devnet, you have to pay with a dummy ETH token.

Your account should be funded enough to pay fees (0.01 ETH should be enough to start).

![](./pictures/Interact_contract.png)

Here we will interact with a `test.cairo` contract (Cairo 0) already deployed on Testnet at the address:

- [0x5f7cd1fd465baff2ba9d2d1501ad0a2eb5337d9a885be319366b5205a414fdd](https://testnet.starkscan.co/contract/0x5f7cd1fd465baff2ba9d2d1501ad0a2eb5337d9a885be319366b5205a414fdd#read-contract)

This contract contains a storage variable called `balance`.

- It can be read with the `@view function: get_balance()`
- Balance can be modified with the `@external function: increase_balance(amount1: felt, amount2: felt)`

```typescript
import { RpcProvider, Contract, Account, ec, json } from "starknet";
```

## 🔍 Read from contract memory, with meta-class

To read the balance, you need to connect an RpcProvider and a Contract.  
You have to call Starknet, with the use of the meta-class method: `contract.function_name(params)` (here `params` is not necessary, because there are no parameters for the `get_balance` function).

```typescript
//initialize provider
const provider = new RpcProvider({ nodeUrl: `${myNodeUrl}` });
// Connect the deployed Test contract in Testnet
const testAddress = "0x5f7cd1fd465baff2ba9d2d1501ad0a2eb5337d9a885be319366b5205a414fdd";

// read abi of Test contract
const { abi: testAbi } = await provider.getClassAt(testAddress);
if (testAbi === undefined) { throw new Error("no abi.") };
const myTestContract = new Contract(testAbi, testAddress, provider);

// Interaction with the contract with call
const bal1 = await myTestContract.get_balance();
console.log("Initial balance =", bal1.res.toString()); // .res because the return value is called 'res' in the Cairo 0 contract.
// With Cairo 1 contract, the result value is in bal1, as bigint.
```

## ✍️ Write to contract memory, with meta-class

To increase the balance, you need in addition a connected and funded Account.

You have to invoke Starknet, with the use of the meta-class method: `contract.function_name(params)`

> After the invoke, you have to wait the incorporation of the modification of Balance in the network, with `await provider.waitForTransaction(transaction_hash)`

Here is an example of how to increase and check the balance:

```typescript
//initialize provider
const provider = new RpcProvider({ nodeUrl: `${myNodeUrl}` });
// connect your account. To adapt to your own account:
const privateKey0 = process.env.OZ_ACCOUNT_PRIVATE_KEY;
const account0Address = "0x123....789";

const account0 = new Account(provider, account0Address, privateKey0);
// add ,"1" after privateKey0 if this account is not a Cairo 0 contract

// Connect the deployed Test contract in Testnet
const testAddress = "0x5f7cd1fd465baff2ba9d2d1501ad0a2eb5337d9a885be319366b5205a414fdd";

// read abi of Test contract
const { abi: testAbi } = await provider.getClassAt(testAddress);
if (testAbi === undefined) { throw new Error("no abi.") };
const myTestContract = new Contract(testAbi, testAddress, provider);

// Connect account with the contract
myTestContract.connect(account0);

// Interactions with the contract with meta-class
const bal1 = await myTestContract.get_balance();
console.log("Initial balance =", bal1.res.toString()); // Cairo 0 contract
// increase_balance needs 2 felts, to add them to the balance.
const myCall = myTestContract.populate("increase_balance", [10, 30]);
const res = await myTestContract.increase_balance(myCall.calldata);
await provider.waitForTransaction(res.transaction_hash);

const bal2 = await myTestContract.get_balance();
console.log("Final balance =", bal2.res.toString());
```

`Contract.populate()` is the recommended method to define the parameters to call/invoke the Cairo functions.

## Sending sequential transactions

If you intend to send sequential transactions through the contract object, like so:

```typescript
const tx = await cairo1Contract.array2d_ex(data);
const tx1 = await cairo1Contract.array2d_ex(data);
```

Be sure to use `waitForTransaction` between the calls, because you may experience issues with the nonce not incrementing:

```typescript
const tx = await cairo1Contract.array2d_ex(data);
await provider.waitForTransaction(tx.transaction_hash);
const tx1 = await cairo1Contract.array2d_ex(data);
await provider.waitForTransaction(tx1.transaction_hash);
```

## Write several operations, with Account.execute

In a Starknet transaction, you can include several invoke operations. It will be performed with `account.execute`.

We will later see this case more in detail in this dedicated [guide](multiCall.md), but in summary, you use this command with the following parameters:

- address of the contract to invoke
- name of the function to invoke
- and an array of parameters for this function

```typescript
const result = await account.execute(
  {
    contractAddress: myContractAddress,
    entrypoint: 'transfer',
    calldata: CallData.compile({
      recipient: receiverAddress,
      amount: cairo.uint256(100000n)
    })
  }
);
await provider.waitForTransaction(result.transaction_hash);
```

## Other existing methods

Some other useful methods to interact with Starknet:

### Function name defined in the code

If you want to call a function with its name contained in a variable:

```typescript
const listFn = ["calc-sum", "calc-hash", "calc-proof"];
// fnChoice is a number defined during execution
const res = await myTestContract[listFn[fnChoice]](200, 234567897n, 865423);
```

### Light and fast call

If you want to have a very fast execution, with minimum resource usage:

```typescript
const specialParameters: Calldata = [
    '2036735872918048433518',
    '5130580',
    '18'
  ];
const getResponse = await myAccount.call(
  "get_bal",
  specialParameters,
  { parseRequest: false }
);
```

You provide the low-level numbers expected by Starknet, without any parsing or checking. See more details [here](define_call_message.md#parse-configuration).
