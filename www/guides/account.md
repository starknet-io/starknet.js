---
sidebar_position: 2
---

# Creating an Account

Since there are no Externally Owned Accounts (EOA) in StarkNet, all Accounts in StarkNet are contracts.

Unlike in Ethereum where a wallet is created with a public and private key pair, StarkNet Accounts are the only way to sign transactions and messages, and verify signatures. Therefore a Account - Contract interface is needed.

## Install and import StarkNet

Install the latest version of starknet with `npm install starknet@next`

```javascript
import * as starknet from "starknet";
```

##  Generate random key pair.

You can also get a key pair from a private key using `getKeyPair(pk: BigNumberish)`

```javascript
const keyPair = starknet.ec.genKeyPair();
const starkKey = starknet.ec.getStarkKey(keyPair);
const starkKeyInt = starknet.number.toBN(starknet.encode.removeHexPrefix(starkKey), 16);

```

## Deploy Account Contract

Deploy the Account contract and wait for it to be verified on StarkNet.

```javascript
const deployWalletTx = await provider.deployContract({contract: COMPILED_WALLET_CONTRACT_JSON, constructorCallData: [starkKeyInt], addressSalt: 0});
```

## Use your new account

Wait for the deployment transaction to be accepted and assign the address of the deployed account to the Account object.

Use your new account object to sign transactions, messages or verify signatures!

```javascript
await defaultProvider.waitForTx(deployWalletTx.transaction_hash);
const Account = new Account(defaultProvider, deployWalletTx.address, keyPair);
```
