---
sidebar_position: 2
---

# Creating an Account

Since there are no Externally Owned Accounts (EOA) in StarkNet, all Accounts in StarkNet are contracts.

Unlike in Ethereum where a wallet is created with a public and private key pair, StarkNet Accounts are the only way to sign transactions and messages, and verify signatures. Therefore a Account - Contract interface is needed.

## Install and import StarkNet

Install the latest version of starknet with `npm install starknet@next`

```javascript
import fs from "fs";
import * as starknet from "starknet";
```

##  Generate random key pair.

You can also get a key pair from a private key using `getKeyPair(pk: BigNumberish)`

```javascript
const starkKeyPair = ec.genKeyPair();
const starkKeyPub = ec.getStarkKey(starkKeyPair);;
```

## Deploy Account Contract

Deploy the Account contract and wait for it to be verified on StarkNet.

```javascript
const compiledArgentAccount = json.parse(
  fs.readFileSync("./ArgentAccount.json").toString("ascii")
);
const accountResponse = await defaultProvider.deployContract({
  contract: compiledArgentAccount,
  addressSalt: starkKeyPub,
});
```

## Use your new account

Wait for the deployment transaction to be accepted and assign the address of the deployed account to the Account object.

Use your new account object to sign transactions, messages or verify signatures!

```javascript
await defaultProvider.waitForTransaction(accountResponse.transaction_hash);
const accountContract = new Contract(
  compiledArgentAccount.abi,
  accountResponse.address
);
const { transaction_hash: initializeTxHash } = await accountContract.initialize(
  starkKeyPub,
  "0"
);
await defaultProvider.waitForTransaction(initializeTxHash);
```
