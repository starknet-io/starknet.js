---
sidebar_position: 2
---

# Creating an Account

Since there are no Externally Owned Accounts (EOA) in StarkNet, all Accounts in StarkNet are contracts.

Unlike in Ethereum where a wallet is created with a public and private key pair, StarkNet Accounts are the only way to sign transactions and messages, and verify signatures. Therefore a Account - Contract interface is needed.

> Account contracts on StarkNet cannot be deployed without paying a fee.

High level explanations from StarkWare can be found in this Notion [page](https://starkware.notion.site/Deploy-a-contract-and-an-account-on-StarkNet-ed2fd13301d2414e8223bb72bb90e386), but in short, the process is:

1. Decide on your account type (OpenZeppelin, Argent, ...)
2. Compute the address of our would-be account off-chain (adressess on StarkNet are deterministic)
3. Send funds to this pre-computed address. The funds will be used to pay for the account contract deployment
4. Actual deployment of the Account

## Install and setup

Install the latest version of starknet with

`npm install starknet@next`

Imports example:

```javascript
import fs from "fs";
import {
  Account,
  Contract,
  defaultProvider,
  ec,
  json,
  number,
  hash
} from "starknet";
```

Starknet.js currently doesn't have the functionality to calculate the class hash needed for the account deployment, so we need to calculate it with some other tool, for example: [Starkli](https://github.com/xJonathanLEI/starkli)

```javascript
// class hash of OpenZeppelin Account contract version 0.5.1
const OZContractClassHash = '0x058d97f7d76e78f44905cc30cb65b91ea49a4b908a76703c54197bca90f81773';
```

```javascript
// get the compiled contract ABI, in this case OpenZeppelin
const compiledOZAccount = json.parse(
  fs.readFileSync("./Account.json").toString("ascii")
);
```

## Generate random key pair

```javascript
const starkKeyPair = ec.genKeyPair();
const starkKeyPub = ec.getStarkKey(starkKeyPair);
```

You can also get a key pair from a private key using:

`getKeyPair(pk: BigNumberish)`

```javascript
const privateKey = '0x-Some-Existing-Private-Key'; // you can use stark.randomAddress();
const starkKeyPair = ec.getKeyPair(privateKey);
const starkKeyPub = ec.getStarkKey(starkKeyPair);
```

## Pre-compute address of the Account

```javascript
const precalculatedAddress = hash.calculateContractAddressFromHash(
    starkKeyPub, // salt
    OZContractClassHash,
    [starkKeyPub],
    0
  );
```

## Funding options for the pre-computed address

1. TESTNET

You can do so by using a faucet: https://faucet.goerli.starknet.io/

2. DEVNET

Address is the newly `precalculatedAddress`.

```bash
curl -X POST http://127.0.0.1:5050/mint -d '{"address":"0x04a093c37ab61065d001550089b1089922212c60b34e662bb14f2f91faee2979","amount":50000000000000000000,"lite":true}' -H "Content-Type:application/json"
// {"new_balance":50000000000000000000,"tx_hash":null,"unit":"wei"}
```

3. Send funds from an already existing account

## OPTIONAL - Declare Account

> NOTE: This step will fail if you haven't sent funds to the pre-calculated address.

We need to use an already deployed account in order to declare ours. StarkNet will always have at least 1 already declared/deployed account for this purpose.

```javascript
// In this case we will use the devnet's predeployed OZ account, after you start the devnet with: `starknet-devnet --seed 0`
const devnetPrivateKey = '0xe3e70682c2094cac629f6fbed82c07cd';
const devnetAccount0Address = '0x7e00d496e324876bbc8531f2d9a82bf154d1a04a50218ee74cdd372f75a551a';
const devnetKeyPair = ec.getKeyPair(devnetPrivateKey);

const predeployedAccount = new Account(provider, devnetAccount0Address, devnetKeyPair);

const declareTx = await predeployedAccount.declare({
  classHash: OZContractClassHash,
  contract: compiledOZAccount
});

await provider.waitForTransaction(declareTx.transaction_hash);
```

## Deploy Account Contract

Deploy the Account contract and wait for it to be verified on StarkNet.

> NOTE: This step will fail if you haven't sent funds to the pre-calculated address.

```javascript
const account = new Account(provider, precalculatedAddress, starkKeyPair);

// This is OpenZeppelin account contract deployment
const accountResponse = await account.deployAccount({
  classHash: OZContractClassHash,
  constructorCalldata: [starkKeyPub],
  contractAddress: precalculatedAddress,
  addressSalt: starkKeyPub
});

await provider.waitForTransaction(accountResponse.transaction_hash);
```
