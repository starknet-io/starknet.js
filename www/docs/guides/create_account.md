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

> Level: easy.

Here, we will create a wallet with the Open Zeppelin smart contract v0.5.1. The contract class is already implemented in both Testnet 1 & 2.  
This contract is coded in Cairo 0, so it will not survive the upcoming re-genesis of Starknet.

```typescript
import { Account, constants, ec, json, stark, Provider, hash, CallData } from "starknet";
```

### compute address

```typescript
// connect provider
const provider = new Provider({ sequencer: { network: constants.NetworkName.SN_GOERLI } });

// new Open Zeppelin account v0.5.1
// Generate public and private key pair.
const privateKey = stark.randomAddress();
console.log('New OZ account:\nprivateKey=', privateKey);
const starkKeyPub = ec.starkCurve.getStarkKey(privateKey);
console.log('publicKey=', starkKeyPub);

const OZaccountClassHash = "0x2794ce20e5f2ff0d40e632cb53845b9f4e526ebd8471983f7dbd355b721d5a";
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
- Use a faucet. (https://faucet.goerli.starknet.io/)
- Mint ETH on starknet-devnet, like so:

```bash
curl -X POST http://127.0.0.1:5050/mint -d '{"address":"0x04a093c37ab61065d001550089b1089922212c60b34e662bb14f2f91faee2979","amount":50000000000000000000,"lite":true}' -H "Content-Type:application/json"
// {"new_balance":50000000000000000000,"tx_hash":null,"unit":"wei"}
```

### deployment of the new account

If you have sent enough funds to this new address, you can go forward to the final step:

```typescript
const OZaccount = new Account(provider, OZcontractAddress, privateKey);

const { transaction_hash, contract_address } = await OZaccount.deployAccount({
    classHash: OZaccountClassHash,
    constructorCalldata: OZaccountConstructorCallData,
    addressSalt: starkKeyPub
});

await provider.waitForTransaction(transaction_hash);
console.log('✅ New OpenZeppelin account created.\n   address =', contract_address);
```

> **IMPORTANT :** If this account is based on a Cairo v2 contract (for example OpenZeppelin account 0.7.0 or later), do not forget to add the parameter "1" after the privateKey parameter :

```typescript
const OZaccount = new Account(provider, OZcontractAddress, privateKey, "1");
```

> Take care that this added parameter is a string, NOT a number.

## Create an Argent account

> Level: medium.

Here, we will create a wallet with the Argent smart contract v0.2.3. This case is more complicated because we will have the account behind a proxy contract (this way, the wallet contract can be updated). The contract classes of both contracts are already implemented in both Testnet 1 & 2.

> If necessary OZ contracts can also be created with a proxy.

```typescript
import { Account, ec, json, stark, Provider, hash, CallData } from "starknet";
```

### compute address

```typescript
// connect provider
const provider = new Provider({ sequencer: { network: constants.NetworkName.SN_GOERLI } });

//new Argent X account v0.2.3
const argentXproxyClassHash = "0x25ec026985a3bf9d0cc1fe17326b245dfdc3ff89b8fde106542a3ea56c5a918";
const argentXaccountClassHash = "0x033434ad846cdd5f23eb73ff09fe6fddd568284a0fb7d1be20ee482f044dabe2";

// Generate public and private key pair.
const privateKeyAX = stark.randomAddress();
console.log('AX_ACCOUNT_PRIVATE_KEY=', privateKeyAX);
const starkKeyPubAX = ec.starkCurve.getStarkKey(privateKey);
console.log('AX_ACCOUNT_PUBLIC_KEY=', starkKeyPubAX);

// Calculate future address of the ArgentX account
const AXproxyConstructorCallData = CallData.compile({
    implementation: argentXaccountClassHash,
    selector: hash.getSelectorFromName("initialize"),
    calldata: CallData.compile({ signer: starkKeyPubAX, guardian: "0" }),
});
const AXcontractAddress = hash.calculateContractAddressFromHash(
    starkKeyPubAX,
    argentXproxyClassHash,
    AXproxyConstructorCallData,
    0
);
console.log('Precalculated account address=', AXcontractAddress);
```

If you want a specific private key, replace `stark.randomAddress`()` with your choice.

Then you have to fund this address.

### deployment of the new account

If you have sent enough funds to this new address, you can go forward to the final step:

```typescript
const accountAX = new Account(provider, AXcontractAddress, privateKeyAX);

const deployAccountPayload = {
    classHash: argentXproxyClassHash,
    constructorCalldata: AXproxyConstructorCallData,
    contractAddress: AXcontractAddress,
    addressSalt: starkKeyPubAX };

const { transaction_hash: AXdAth, contract_address: AXcontractFinalAdress } = await accountAX.deployAccount(deployAccountPayload);
console.log('✅ ArgentX wallet deployed at:',AXcontractFinalAdress);
```

> If you have activated the Argent Shield (2FA) for this account, the standard `Account` instance of Starknet.js is no more able to handle new transactions. In this case you need to use the account abstraction to define how are signed the transactions in this case (by creating a specific signer).

## Create a Braavos account

> Level: hard.

Even more complicated, a Braavos account needs also a proxy but needs in addition a specific signature. Starknet.js is handling specific signatures. Save the following code in a file named `braavosAbstraction.ts` :

```typescript
import { Calldata, num, Signature, ec, hash, CallData, BigNumberish, DeployAccountSignerDetails, AbstractionSigns } from "starknet";

export const BraavosInitialClassHash = "0x5aa23d5bb71ddaa783da7ea79d405315bafa7cf0387a74f4593578c3e9e6570";
export const BraavosProxyClassHash = "0x03131fa018d520a037686ce3efddeab8f28895662f019ca3ca18a626650f7d1e";

export function proxyConstructorBraavos(starkKeyPubBraavos: string): Calldata {
    const BraavosInitializer: Calldata = CallData.compile({ public_key: starkKeyPubBraavos });;
    return CallData.compile({
        implementation_address: BraavosInitialClassHash,
        initializer_selector: hash.getSelectorFromName("initializer"),
        calldata: [...BraavosInitializer]
    });
}

export function calculateAddressBraavos(privateKeyBraavos: BigNumberish): string {
    const starkKeyPubBraavos = ec.starkCurve.getStarkKey(num.toHex(privateKeyBraavos));

    const proxyConstructorCalldata = proxyConstructorBraavos(starkKeyPubBraavos);

    return hash.calculateContractAddressFromHash(
        starkKeyPubBraavos,
        BraavosProxyClassHash,
        proxyConstructorCalldata,
        0);

}

export function signDeployAccountBraavos(standardInputData: DeployAccountSignerDetails,
    privateKeyBraavos: string,
    ...additionalParams: string[]): Signature {
    if (additionalParams.length < 8) {
        throw new Error(`Braavos deploy account signer is waiting 8 additional parameters. Got: ${additionalParams.length} params!`);
    }
    const braavosAccountClassHash = additionalParams[0];
    const hardwareSigner = additionalParams.slice(1, 8);

    const txnHash = hash.computeHashOnElements([hash.calculateDeployAccountTransactionHash(
        standardInputData.contractAddress,
        standardInputData.classHash,
        CallData.compile(standardInputData.constructorCalldata),
        standardInputData.addressSalt,
        standardInputData.version,
        standardInputData.maxFee,
        standardInputData.chainId,
        standardInputData.nonce
    ),
    braavosAccountClassHash,
    ...hardwareSigner,
    ]);

    const { r, s } = ec.starkCurve.sign(
        txnHash,
        privateKeyBraavos,
    );
    const signature = [r.toString(), s.toString(), braavosAccountClassHash, ...hardwareSigner];
    return signature
}

export const abstractionFnsBraavos: AbstractionSigns = {
    abstractedDeployAccountSign: signDeployAccountBraavos
}
```

At the beginning of the code, somme helpers to create the address and the constructor.  
Then the code in `signDeployAccountBraavos` is describing how to hash and sign a deployement of a Braavos account.  
The `abstractionFnsBraavos` lists the functions to use for abstraction ; here a function to sign an account deployement.

We will deploy hereunder a Braavos account in devnet. So launch starknet-devnet with these parameters:

```bash
starknet-devnet --seed 0 --fork-network alpha-goerli
```

Initialization:

```typescript
import { Provider,  Account,  Calldata, Signer, BigNumberish, ec } from "starknet";
import { account3BraavosTestnetPrivateKey } from "../../privateStorage";
import { calculateAddressBraavos, abstractionFnsBraavos, proxyConstructorBraavos, BraavosProxyClassHash } from "./braavosAbstraction";
import axios from "axios";
```

Here, the private key has been created manually in the Braavos browser wallet, without deploying the account, and stored in a file.

If you want to create the private key with a random number:

```typescript
const privateKeyBraavos = stark.randomAddress();
```

### Compute address

```typescript
// initialize Provider
const providerDevnet = new Provider({ sequencer: { baseUrl: "http://127.0.0.1:5050" } });
// address
const privateKeyBraavos = account3BraavosTestnetPrivateKey;
    const signerBraavos = new Signer(privateKeyBraavos, abstractionFnsBraavos);
    const starkKeyPubBraavos = ec.starkCurve.getStarkKey(privateKeyBraavos);
    const proxyAddressBraavos = calculateAddressBraavos(privateKeyBraavos);
    const accountClassHashBraavos = "0x0105c0cf7aadb6605c9538199797920884694b5ce84fc68f92c832b0c9f57ad9"; // 27/aug/2023, will probably change over time
    const accountBraavos = new Account(provider, proxyAddressBraavos, signerBraavos);
console.log('Calculated account address=', accountBraavos.address);
```

We have created a customized Signer, that uses the `abstractionFnsBraavos` list of functions. A new `Account` instance is created with this signer.

### Estimate fees

```typescript
// estimate fees
const proxyConstructor: Calldata = proxyConstructorBraavos(starkKeyPubBraavos);
const signatureAddsDeployAccountBraavos: BigNumberish[] = [
    accountClassHashBraavos,
    0, 0, 0, 0, 0, 0, 0]; // if no hardware signer, put 7x zero.
const estimatedFee  = await accountBraavos.estimateAccountDeployFee({
        classHash: BraavosProxyClassHash,
        constructorCalldata: proxyConstructor,
        contractAddress: proxyAddressBraavos,
        addressSalt: starkKeyPubBraavos
    }, undefined,
        ...signatureAddsDeployAccountBraavos);
console.log("calculated fee =", estimatedFee);
```

### Deploy account

```typescript
// fund account address before account creation (easy in devnet)
const { data: answer } = await axios.post('http://127.0.0.1:5050/mint', {
    "address": BraavosProxyAddress,
    "amount": 10_000_000_000_000_000_000,
    "lite": true
    }, { headers: { "Content-Type": "application/json" } });
console.log('Answer mint =', answer); // 10 ETH

// deploy Braavos account

const { transaction_hash, contract_address: BraavosAccountFinalAddress } = await accountBraavos.deployAccount({
    classHash: BraavosProxyClassHash,
    constructorCalldata: proxyConstructor,
    contractAddress: proxyAddressBraavos,
    addressSalt: starkKeyPubBraavos
},
    { maxFee: estimatedFee },
    ...signatureAddsDeployAccountBraavos
);
// estimatedFee is optional
console.log('Transaction hash =', transaction_hash);
console.log('✅ Braavos wallet deployed at', BraavosAccountFinalAddress);
await providerDevnet.waitForTransaction(transaction_hash);
```

The computed address has been funded automatically by minting a new dummy ETH in Starknet devnet!

## Create your account abstraction

You are not limited to these 3 contracts. You can create your own account contract. It's the concept of Account Abstraction.

You can customize entirely the account - for example:

- use a different concept of signature.
- add a guardian to save your account.
- add a 2FA code to the signature.
- have the possibility to transfer ownership of the wallet.
- add some administrators or a super-administrator.
- whitelist of addresses for transfer.
- multisig.
- delayed withdraw.

The only limitation is your imagination...

### Abstraction without specific signature

Here is an example of a customized wallet, including super administrator management, on a local starknet-devnet. This example uses standard signatures.

> launch `starknet-devnet --seed 0` before using this script

```typescript
import { Account, ec, json, stark, Provider, hash, CallData } from "starknet";
import fs from "fs";
import axios from "axios";
```

```typescript
// connect provider
const provider = new Provider({ sequencer: { network: "http://127.0.0.1:5050" } });

// initialize existing predeployed account 0 of Devnet
const privateKey0 = "0xe3e70682c2094cac629f6fbed82c07cd";
const accountAddress0 = "0x7e00d496e324876bbc8531f2d9a82bf154d1a04a50218ee74cdd372f75a551a";
const account0 = new Account(provider, accountAddress0, privateKey0);
// add ,"1" after privateKey0 if this account is not a Cairo 0 contract

// new account abstraction
// Generate public and private key pair.
const AAprivateKey = stark.randomAddress();
console.log('New account:\nprivateKey=', AAprivateKey);
const AAstarkKeyPub = ec.starkCurve.getStarkKey(AAprivateKey);
console.log('publicKey=', AAstarkKeyPub);

// declare the contract
const compiledAAaccount = json.parse(fs.readFileSync("./compiled_contracts/myAccountAbstraction.json").toString("ascii"));
const { transaction_hash: declTH, class_hash: decCH } =
    await account0.declare({contract: compiledAAaccount});
console.log('Customized account class hash =', decCH);
await provider.waitForTransaction(declTH);

// Calculate future address of the account
const AAaccountConstructorCallData = CallData.compile({
    super_admin_address: account0.address,
    publicKey: AAstarkKeyPub
});
const AAcontractAddress = hash.calculateContractAddressFromHash(
    AAstarkKeyPub,
    AAaccountClassHash,
    AAaccountConstructorCallData,
    0
);
console.log('Precalculated account address=', AAcontractAddress);

// fund account address before account creation
const { data: answer } = await axios.post('http://127.0.0.1:5050/mint', { "address": AAcontractAddress, "amount": 50_000_000_000_000_000_000, "lite": true }, { headers: { "Content-Type": "application/json" } });
console.log('Answer mint =', answer);

// deploy account
const AAaccount = new Account(provider, AAcontractAddress, AAprivateKey);
// add ,"1" after AAprivateKey if this account is not a Cairo 0 contract
const { transaction_hash, contract_address } = await AAaccount.deployAccount({
    classHash: AAaccountClassHash,
    constructorCalldata: AAaccountConstructorCallData,
    addressSalt: AAstarkKeyPub
});
await provider.waitForTransaction(transaction_hash);
console.log('✅ New customized account created.\n   address =', contract_address);
```

### Abstraction with a specific signature

We have already seen this case with the deployement of a [**Braavos account**](#create-a-braavos-account).  
To perform :

- Define a list of specific functions of signature. There are 5 possible functions :

|                                           Starknet.js method |  Custom hash function   | Custom signature function | Custom hash + signature function |       Account contract function        |
| -----------------------------------------------------------: | :---------------------: | :-----------------------: | :------------------------------: | :------------------------------------: |
| myContract.invoke myAccount.execute myAccount.deployContract |           N/A           |            N/A            |   abstractedTransactionSign()    | \_\_validate\_\_ <br />\_\_execute\_\_ |
|                                      myAccount.deployAccount |           N/A           |            N/A            |  abstractedDeployAccountSign()   |        \_\_validate-deploy\_\_         |
|                                            myAccount.declare |           N/A           |            N/A            |     abstractedDeclareSign()      |        \_\_validate-declare\_\_        |
|                  myAccount.signMessage myAccount.hashMessage | abstractedMessageHash() |  abstractedMessageSign()  |               N/A                |           isValidSignature()           |

> Create only the necessary functions ; the missing functions will be replaced by standard hashs and signs.

An example of definition :

```typescript
export const abstractionFns: AbstractionFunctions = {
    abstractedDeployAccountSign: signDeployAccount,
    abstractedTransactionSign: signTransaction,
    abstractedDeclareSign: signDeclare,
    abstractedMessageHash: hashMessage,
    abstractedMessageSign: signMessage
}
```

- Create the code of these functions.

You have to respect the followings signatures :

```typescript
export type AbstractionDeployAccountFunctionSign = (
  standardInputData: DeployAccountSignerDetails,
  privateKey: string,
  ...additionalParams: string[]
) => Signature;

export type AbstractionTransactionFunctionSign = (
  standardInputData: {
    contractAddress: BigNumberish;
    version: BigNumberish;
    calldata: RawCalldata;
    maxFee: BigNumberish;
    chainId: StarknetChainId;
    nonce: BigNumberish;
  },
  privateKey: string,
  ...additionalParams: string[]
) => Signature;

export type AbstractionDeclareFunctionSign = (
  standardInputData: DeclareSignerDetails,
  privateKey: string,
  ...additionalParams: string[]
) => Signature;

export type AbstractionMessageFunctionHash = (
  typedData: TypedData,
  accountAddress: string,
  ...additionalParams: string[]
) => string;

export type AbstractionMessageFunctionSign = (
  msgHash: string,
  privateKey: string,
  ...additionalParams: string[]
) => Signature;
```

For Example, the function for the deploy account signature, using a 2FA code on 3 felts :

```typescript
export function signDeployAccount(standardInputData: DeployAccountSignerDetails,
    privateKey: string,
    ...additionalParams: string[]
): Signature {
    if (additionalParams.length < 3) {
        throw new Error(`Abstracted deploy account signer is waiting 3 additional parameters. Got: ${additionalParams.length} params!`);
    }
    const signer2FA = additionalParams;

    const txnHash = hash.computeHashOnElements([hash.calculateDeployAccountTransactionHash(
        standardInputData.contractAddress,
        standardInputData.classHash,
        CallData.compile(standardInputData.constructorCalldata),
        standardInputData.addressSalt,
        standardInputData.version,
        standardInputData.maxFee,
        standardInputData.chainId,
        standardInputData.nonce
    ),
    ...signer2FA // the smart contract will check that the 2FA is 0x01, 0x02, 0x03
    ]);

    const { r, s } = ec.starkCurve.sign(
        txnHash,
        privateKey,
    );
    const signature = [r.toString(), s.toString(), ...signer2FA];
    return signature
}
```

- Create a specific signer, using this list of functions.

```typescript
const signerAbstraction = new Signer(privateKeyAbstraction, abstractionFns);
```

- Create an Account instance, using this signer.

```typescript
const accountAbstraction = new Account(provider, addressAbstraction, signerAbstraction, "1"); // "1" for a Cairo 1 account contract
```

- Interact with Starknet, with some additional sign parameters (if needed).

```typescript
const { transaction_hash, contract_address } = await accountAbstraction.deployAccount({
        classHash: classHashContract,
        constructorCalldata: constructor,
        contractAddress: addressAbstraction,
        addressSalt: starkKeyPubAbstraction
    },
        undefined,
        1, 2, 3 // abstraction is here
    );
```

## Account update

For ArgentX and Braavos wallets, if you have created the private key inside the browser wallet, necessary upgrades will be automatically managed in the wallet.  
However, if you have created the private key by yourself, it becomes your responsibility to update the account implementation class when it's necessary. It can be done with the `upgrade` function of the implementation class.
