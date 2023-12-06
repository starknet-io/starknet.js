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

Here we will interact with a `test.cairo` contract (Cairo 0), already deployed in Testnet 1 and Testnet 2, at addresses:

- testnet1: [0x5f7cd1fd465baff2ba9d2d1501ad0a2eb5337d9a885be319366b5205a414fdd](https://testnet.starkscan.co/contract/0x5f7cd1fd465baff2ba9d2d1501ad0a2eb5337d9a885be319366b5205a414fdd#read-contract).
- testnet2: [0x2367db6b0df07033d196dcd25961109d8fbc86227158343149742284c7582e](https://testnet-2.starkscan.co/contract/0x002367db6b0df07033d196dcd25961109d8fbc86227158343149742284c7582e#read-contract).

We will use Testnet1, so you need a funded wallet in this network.

This contract contains a storage memory called `balance`.

- It can be read with the `@view function: get_balance()`
- Balance can be modified with the `@external function: increase_balance(amount1: felt, amount2: felt)`

```typescript
import { Provider, Contract, Account, ec, json } from "starknet";
```

## 🔍 Read contract memory, with meta-class

To read the balance, you need only to connect a Provider and a Contract.  
You have to call Starknet, with use of the meta-class method: `contract.function_name(params)` (here `params` is not necessary, because there are no parameters for the `get_balance` function).

```typescript
//initialize Provider
const provider = new Provider({ sequencer: { network: constants.NetworkName.SN_GOERLI } });
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

## ✍️ Write contract memory, with meta-class

To increase the balance, you need in addition a connected and funded Account.

You have to invoke Starknet, with use of the meta-class method: `contract.function_name(params)`
After the invoke, you have to wait the incorporation of the modification of Balance in the network, with `await provider.waitForTransaction(transaction_hash)`

Here is an example to increase and check the balance:

```typescript
//initialize Provider
const provider = new Provider({ sequencer: { network: constants.NetworkName.SN_GOERLI } });
// connect your account. To adapt to your own account:
const privateKey0 = process.env.OZ_ACCOUNT_PRIVATE_KEY;
const account0Address = "0x123....789";

const account0 = new Account(provider, account0Address, privateKey0);

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

## Write several operations, with Account.execute

In a Starknet transaction, you can include several invoke operations. It will be performed with `account.execute`.

We will later see this case more in detail in this dedicated [guide](multiCall.md) , but in summary, you use this command with the following parameters:

- address of the contract to invoke
- name of the function to invoke
- and array of parameters for this function

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

Some other useful method to interact with Starknet:

### Function name defined in the code

If you want to call a function with its name contained in a variable:

```typescript
const listFn = ["calc-sum", "calc-hash", "calc-proof"];
// fnChoice is a number defined during execution
const res = await myTestContract[listFn[fnChoice]](200, 234567897n, 865423);
```

### Light and fast call

If you want to have a very fast execution, with the minimum of resource usage:

```typescript
const specialParameters: Calldata = [
    '2036735872918048433518',
    '5130580',
    '18'];
const getResponse = await myAccount.call("get_bal", specialParameters,
    {parseRequest: false});
```

You provide the low level numbers expected by Starknet, without any parsing or check. See more detail [here](define_call_message.md#parse-configuration)
