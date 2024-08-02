---
sidebar_position: 8
---

# Create an account

Since there are no Externally Owned Accounts (EOA) in Starknet, all Accounts in Starknet are contracts.

Unlike in Ethereum where a wallet is created with a public and private key pair, Starknet Accounts are the only way to sign transactions and messages and verify signatures. Therefore an Account - Contract interface is needed.

Account contracts on Starknet cannot be deployed without paying a fee.
Creating an account is a bit tricky; you have several steps:

1. Decide on your account type (OpenZeppelin, ArgentX, Braavos, ...).
2. Compute the address of your future account.
3. Send funds to this pre-computed address. The funds will be used to pay for the account contract deployment and remains will fund the new account.
4. Actual deployment of the Account

## Create an OZ (Open Zeppelin) account

Here, we will create a wallet with the Open Zeppelin smart contract v0.8.1. The contract class is already implemented in Testnet.  
This contract is coded in Cairo 1.

```typescript
import { Account, constants, ec, json, stark, RpcProvider, hash, CallData } from 'starknet';
```

### Compute address

```typescript
// connect provider (Mainnet or Sepolia)
const provider = new RpcProvider({ nodeUrl: `${myNodeUrl}` });

// new Open Zeppelin account v0.8.1
// Generate public and private key pair.
const privateKey = stark.randomAddress();
console.log('New OZ account:\nprivateKey=', privateKey);
const starkKeyPub = ec.starkCurve.getStarkKey(privateKey);
console.log('publicKey=', starkKeyPub);

const OZaccountClassHash = '0x061dac032f228abef9c6626f995015233097ae253a7f72d68552db02f2971b8f';
// Calculate future address of the account
const OZaccountConstructorCallData = CallData.compile({ publicKey: starkKeyPub });
const OZcontractAddress = hash.calculateContractAddressFromHash(
  starkKeyPub,
  OZaccountClassHash,
  OZaccountConstructorCallData,
  0
);
console.log('Precalculated account address=', OZcontractAddress);
```

If you want a specific private key, replace `stark.randomAddress`()` with your choice.

Then you have to fund this address!

How to proceed is out of the scope of this guide, but you can for example:

- Transfer ETH from another wallet.
- Bridge ETH to this Starknet address.
- Use a faucet. (https://starknet-faucet.vercel.app/)
- Mint ETH on starknet-devnet-rs, like so:

```bash
// ETH
curl -X POST http://127.0.0.1:5050/mint -d '{"address":"0x04a093c37ab61065d001550089b1089922212c60b34e662bb14f2f91faee2979","amount":50000000000000000000}' -H "Content-Type:application/json"
// STRK
curl -X POST http://127.0.0.1:5050/mint -d '{"address":"0x04a093c37ab61065d001550089b1089922212c60b34e662bb14f2f91faee2979","amount":50000000000000000000,"unit":"FRI"}' -H "Content-Type:application/json"
```

### Deployment of the new account

If you have sent enough funds to this new address, you can go forward to the final step:

```typescript
const OZaccount = new Account(provider, OZcontractAddress, privateKey);

const { transaction_hash, contract_address } = await OZaccount.deployAccount({
  classHash: OZaccountClassHash,
  constructorCalldata: OZaccountConstructorCallData,
  addressSalt: starkKeyPub,
});

await provider.waitForTransaction(transaction_hash);
console.log('✅ New OpenZeppelin account created.\n   address =', contract_address);
```

## Create an Argent account

Here, we will create a wallet with the Argent smart contract v0.4.0. The contract class is already implemented in the networks.

```typescript
import {
  Account,
  ec,
  json,
  stark,
  RpcProvider,
  hash,
  CallData,
  CairoOption,
  CairoOptionVariant,
  CairoCustomEnum,
} from 'starknet';
```

### Compute address

```typescript
// connect provider
const provider = new RpcProvider({ nodeUrl: `${myNodeUrl}` });

//new Argent X account v0.4.0
const argentXaccountClassHash =
  '0x036078334509b514626504edc9fb252328d1a240e4e948bef8d0c08dff45927f';

// Generate public and private key pair.
const privateKeyAX = stark.randomAddress();
console.log('AX_ACCOUNT_PRIVATE_KEY=', privateKeyAX);
const starkKeyPubAX = ec.starkCurve.getStarkKey(privateKeyAX);
console.log('AX_ACCOUNT_PUBLIC_KEY=', starkKeyPubAX);

// Calculate future address of the ArgentX account
const axSigner = new CairoCustomEnum({ Starknet: { pubkey: starkKeyPubAX } });
const axGuardian = new CairoOption<unknown>(CairoOptionVariant.None);
const AXConstructorCallData = CallData.compile({
  owner: axSigner,
  guardian: axGuardian,
});
const AXcontractAddress = hash.calculateContractAddressFromHash(
  starkKeyPubAX,
  argentXaccountClassHash,
  AXConstructorCallData,
  0
);
console.log('Precalculated account address=', AXcontractAddress);
```

If you want a specific private key, replace `stark.randomAddress()` with a value of your choice.

Then you have to fund this address.

### Deployment of the new account

If you have sent enough funds to this new address, you can go forward to the final step:

```typescript
const accountAX = new Account(provider, AXcontractAddress, privateKeyAX);

const deployAccountPayload = {
  classHash: argentXaccountClassHash,
  constructorCalldata: AXConstructorCallData,
  contractAddress: AXcontractAddress,
  addressSalt: starkKeyPubAX,
};

const { transaction_hash: AXdAth, contract_address: AXcontractFinalAddress } =
  await accountAX.deployAccount(deployAccountPayload);
console.log('✅ ArgentX wallet deployed at:', AXcontractFinalAddress);
```

## Create a Braavos account

More complicated, a Braavos account needs a proxy and a specific signature. Starknet.js is handling only Starknet standard signatures; so we need extra code to handle this specific signature for account creation. These nearly 200 lines of code are not displayed here but are available in a module [here](./doc_scripts/deployBraavos.ts).

We will deploy hereunder a Braavos account in devnet. So launch starknet-devnet with these parameters:

```bash
starknet-devnet --seed 0 --fork-network 'https://free-rpc.nethermind.io/sepolia-juno/v0_7'
```

Initialization:

```typescript
import { RpcProvider, Account, num, stark } from 'starknet';
import {
  calculateAddressBraavos,
  deployBraavosAccount,
  estimateBraavosAccountDeployFee,
} from './deployBraavos';
import axios from 'axios';
```

If you want to create the private key, for example with a random number:

```typescript
const privateKeyBraavos = stark.randomAddress();
```

If you want to use a private key generated by your browser wallet, create a new account (without deploying it), then copy/paste the account private key (it's useless to copy the public key).

```typescript
const privateKeyBraavos = '0x02e8....e12';
```

### Compute address

```typescript
// initialize provider
const providerDevnet = new RpcProvider({ nodeUrl: `${myNodeUrl}` });
// address
const BraavosProxyAddress = calculateAddressBraavos(privateKeyBraavos);
console.log('Calculated account address=', BraavosProxyAddress);
```

### Estimate fees

```typescript
// estimate fees
const estimatedFee = await estimateBraavosAccountDeployFee(privateKeyBraavos, providerDevnet);
console.log('calculated fee =', estimatedFee);
```

### Deploy account

```typescript
// fund account address before account creation (easy in devnet)
const { data: answer } = await axios.post(
  'http://127.0.0.1:5050/mint',
  {
    address: BraavosProxyAddress,
    amount: 10_000_000_000_000_000_000,
  },
  { headers: { 'Content-Type': 'application/json' } }
);
console.log('Answer mint =', answer); // 10 ETH

// deploy Braavos account
const { transaction_hash, contract_address: BraavosAccountFinalAddress } =
  await deployBraavosAccount(privateKeyBraavos, providerDevnet, estimatedFee);
// estimatedFee is optional
console.log('Transaction hash =', transaction_hash);
await providerDevnet.waitForTransaction(transaction_hash);
console.log('✅ Braavos wallet deployed at', BraavosAccountFinalAddress);
```

The computed address has been funded automatically by minting a new dummy ETH in Starknet devnet!

## Create an Ethereum account

Thanks to account abstraction, you can create an account in Starknet that holds the cryptographic logic of an Ethereum account. This way, you can use Ethereum private and public keys!  
OpenZeppelin has released an account contract for such an Ethereum account.

Below is an example of account creation in Sepolia Testnet.

### Compute address

```typescript
const privateKeyETH = '0x45397ee6ca34cb49060f1c303c6cb7ee2d6123e617601ef3e31ccf7bf5bef1f9';
const ethSigner = new EthSigner(privateKeyETH);
const ethFullPublicKey = await ethSigner.getPubKey();
const accountEthClassHash = '0x23e416842ca96b1f7067693892ed00881d97a4b0d9a4c793b75cb887944d98d';
const myCallData = new CallData(ethAccountAbi);
const accountETHconstructorCalldata = myCallData.compile('constructor', {
  public_key: ethFullPublicKey,
});
const salt = '0x12345'; // or lower felt of public key X part
const contractETHaddress = hash.calculateContractAddressFromHash(
  salt,
  accountEthClassHash,
  accountETHconstructorCalldata,
  0
);
console.log('Pre-calculated ETH account address =', contractETHaddress);
```

> If you need a random Ethereum private key:
>
> ```typescript
> const myPrivateKey = eth.ethRandomPrivateKey();
> ```

Then you have to fund this address.

### Deployment of the new account

If you have sent enough funds to this new address, you can go forward to the final step:

```typescript
const ethAccount = new Account(provider, contractETHaddress, ethSigner);
const deployPayload = {
  classHash: accountEthClassHash,
  constructorCalldata: accountETHconstructorCalldata,
  addressSalt: salt,
};
const { suggestedMaxFee: feeDeploy } = await ethAccount.estimateAccountDeployFee(deployPayload);
const { transaction_hash, contract_address } = await ethAccount.deployAccount(
  deployPayload,
  { maxFee: stark.estimatedFeeToMaxFee(feeDeploy, 100) }
  // Extra fee to fund the validation of the transaction
);
await provider.waitForTransaction(transaction_hash);
console.log('✅ New Ethereum account final address =', contract_address);
```

## Create your account abstraction

You are not limited to these 3 contracts. You can create your own contract for the wallet. It's the concept of Account Abstraction.

You can entirely customize the wallet - for example:

- use a different concept of keys.

- add a guardian to save your account.

- have the possibility to transfer ownership of the wallet.

- add some administrators or a super-administrator.

- whitelist of addresses for transfer.

- multisig.

- delayed withdraw.

The only limitation is your imagination...

Here is an example of a customized wallet, including super administrator management, on a local starknet-devnet-rs:

> launch `cargo run --release -- --seed 0` before using this script

```typescript
import { Account, ec, json, stark, RpcProvider, hash, CallData } from 'starknet';
import fs from 'fs';
import axios from 'axios';
```

```typescript
// connect provider
const provider = new RpcProvider({ network: 'http://127.0.0.1:5050/rpc' });

// initialize existing pre-deployed account 0 of Devnet-rs
const privateKey0 = '0x71d7bb07b9a64f6f78ac4c816aff4da9';
const accountAddress0 = '0x64b48806902a367c8598f4f95c305e8c1a1acba5f082d294a43793113115691';
const account0 = new Account(provider, accountAddress0, privateKey0);

// new account abstraction
// Generate public and private key pair.
const AAprivateKey = stark.randomAddress();
console.log('New account:\nprivateKey=', AAprivateKey);
const AAstarkKeyPub = ec.starkCurve.getStarkKey(AAprivateKey);
console.log('publicKey=', AAstarkKeyPub);

// declare the contract
const compiledAAaccount = json.parse(
  fs
    .readFileSync('./__mocks__/cairo/myAccountAbstraction/myAccountAbstraction.json')
    .toString('ascii')
);
const { transaction_hash: declTH, class_hash: decCH } = await account0.declare({
  contract: compiledAAaccount,
});
console.log('Customized account class hash =', decCH);
await provider.waitForTransaction(declTH);

// Calculate future address of the account
const AAaccountConstructorCallData = CallData.compile({
  super_admin_address: account0.address,
  publicKey: AAstarkKeyPub,
});
const AAcontractAddress = hash.calculateContractAddressFromHash(
  AAstarkKeyPub,
  AAaccountClassHash,
  AAaccountConstructorCallData,
  0
);
console.log('Precalculated account address=', AAcontractAddress);

// fund account address before account creation
const { data: answer } = await axios.post(
  'http://127.0.0.1:5050/mint',
  { address: AAcontractAddress, amount: 50_000_000_000_000_000_000, lite: true },
  { headers: { 'Content-Type': 'application/json' } }
);
console.log('Answer mint =', answer);

// deploy account
const AAaccount = new Account(provider, AAcontractAddress, AAprivateKey);
const { transaction_hash, contract_address } = await AAaccount.deployAccount({
  classHash: AAaccountClassHash,
  constructorCalldata: AAaccountConstructorCallData,
  addressSalt: AAstarkKeyPub,
});
await provider.waitForTransaction(transaction_hash);
console.log('✅ New customized account created.\n   address =', contract_address);
```

## Account update

For ArgentX and Braavos wallets, if you have created the private key inside the browser wallet, necessary upgrades will be automatically managed in the wallet.  
However, if you have created the private key by yourself, it becomes your responsibility to update the account implementation class when it's necessary. It can be done with the `upgrade` function of the implementation class.
