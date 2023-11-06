---
sidebar_position: 8
---

# Create account

Since there are no Externally Owned Accounts (EOA) in Starknet, all Accounts in Starknet are contracts.

Unlike in Ethereum where a wallet is created with a public and private key pair, Starknet Accounts are the only way to sign transactions and messages, and verify signatures. Therefore a Account - Contract interface is needed.

Account contracts on Starknet cannot be deployed without paying a fee.
Create an account is a bit tricky ; you have several steps:

1. Decide on your account type (OpenZeppelin, Argent, ...).
2. Compute the address of your future account.
3. Send funds to this pre-computed address. The funds will be used to pay for the account contract deployment, and remains will fund the new account.
4. Actual deployment of the Account

## Create OZ (Open Zeppelin) account:

Here, we will create a wallet with the Open Zeppelin smart contract v0.5.1. The contract class is already implemented in both Testnet 1 & 2.

```typescript
import { Account, ec, json, stark, Provider, hash } from "starknet";
```

### compute address:

```typescript
// connect provider
const provider = new Provider({ sequencer: { network: "goerli-alpha" } });

// new Open Zeppelin account v0.5.1:
    // Generate public and private key pair.
const privateKey = stark.randomAddress();
console.log('New OZ account:\nprivateKey=', privateKey);
const starkKeyPair = ec.getKeyPair(privateKey);
const starkKeyPub = ec.getStarkKey(starkKeyPair);
console.log('publicKey=', starkKeyPub);

const OZaccountClassHash = "0x2794ce20e5f2ff0d40e632cb53845b9f4e526ebd8471983f7dbd355b721d5a";
// Calculate future address of the account
const OZaccountConstructorCallData = stark.compileCalldata({ publicKey: starkKeyPub });
const OZcontractAddress = hash.calculateContractAddressFromHash(
    starkKeyPub,
    OZaccountClassHash,
    OZaccountConstructorCallData,
    0
);
console.log('Precalculated account address=', OZcontractAddress);
```

If you want a specific private key, replace `stark.randomAddress()` by your choice.

Then you have to fund this address!

How to proceed is out of the scope of this guide, by you can for example:

- Transfer ETH from another wallet.
- Bridge ETH to this Starknet address.
- Use a faucet. (https://faucet.goerli.starknet.io/)
- Mint ETH on starknet-devnet, like so:

```bash
curl -X POST http://127.0.0.1:5050/mint -d '{"address":"0x04a093c37ab61065d001550089b1089922212c60b34e662bb14f2f91faee2979","amount":50000000000000000000,"lite":true}' -H "Content-Type:application/json"
// {"new_balance":50000000000000000000,"tx_hash":null,"unit":"wei"}
```

### deployment of the new account

If you have sent enough fund to this new address, you can go forward to the final step:

```typescript
const OZaccount = new Account(provider, OZcontractAddress, starkKeyPair);

const { transaction_hash, contract_address } = await OZaccount.deployAccount({
    classHash: OZaccountClassHash,
    constructorCalldata: OZaccountConstructorCallData,
    addressSalt: starkKeyPub
});

await provider.waitForTransaction(transaction_hash);
console.log('✅ New OpenZeppelin account created.\n   address =', contract_address);
```

## Create Argent account

Here, we will create a wallet with the Argent smart contract v0.2.3. This case is more complicated, because we will have the wallet behind a proxy contract (this way, the wallet contract can be updated). The contract classes of both contracts are already implemented in both Testnet 1 & 2.

> If necessary OZ contracts can also be created with a proxy.

```typescript
import { Account, ec, json, stark, Provider, hash } from "starknet";
```

### compute address

```typescript
// connect provider
const provider = new Provider({ sequencer: { network: "goerli-alpha" } });

//new Argent X account v0.2.3:
const argentXproxyClassHash = "0x25ec026985a3bf9d0cc1fe17326b245dfdc3ff89b8fde106542a3ea56c5a918";
const argentXaccountClassHash = "0x033434ad846cdd5f23eb73ff09fe6fddd568284a0fb7d1be20ee482f044dabe2";

// Generate public and private key pair.
const privateKeyAX = stark.randomAddress();
console.log('AX_ACCOUNT_PRIVATE_KEY=', privateKeyAX);
const starkKeyPairAX = ec.getKeyPair(privateKeyAX);
const starkKeyPubAX = ec.getStarkKey(starkKeyPairAX);
console.log('AX_ACCOUNT_PUBLIC_KEY=', starkKeyPubAX);

// Calculate future address of the ArgentX account
const AXproxyConstructorCallData = stark.compileCalldata({
    implementation: argentXaccountClassHash,
    selector: hash.getSelectorFromName("initialize"),
    calldata: stark.compileCalldata({ signer: starkKeyPubAX, guardian: "0" }),
});
const AXcontractAddress = hash.calculateContractAddressFromHash(
    starkKeyPubAX,
    argentXproxyClassHash,
    AXproxyConstructorCallData,
    0
);
console.log('Precalculated account address=', AXcontractAddress);
```

If you want a specific private key, replace `stark.randomAddress()` by your choice.

Then you have to fund this address.

### deployment of the new account

If you have sent enough fund to this new address, you can go forward to the final step:

```typescript
const accountAX = new Account(provider, AXcontractAddress, starkKeyPairAX);

const deployAccountPayload = {
    classHash: argentXproxyClassHash,
    constructorCalldata: AXproxyConstructorCallData,
    contractAddress: AXcontractAddress,
    addressSalt: starkKeyPubAX };

const { transaction_hash: AXdAth, contract_address: AXcontractFinalAddress } = await accountAX.deployAccount(deployAccountPayload);
console.log('✅ ArgentX wallet deployed at:', AXcontractFinalAddress);
```

## Create your account abstraction

You are not limited to OZ or Argent contracts. You can create your own contract for wallet. It's the concept of Account Abstraction.

You can customize entirely the wallet - for example:

- use a different concept of keys.

- add a guardian to save your account.

- have the possibility to transfer the ownership of the wallet.

- add some administrators or a super-administrator.

- whitelist of address for transfer.

- multisig

The only limitation is your imagination...

> Prior to the declaration of the contract, do not forget to read the compiled contract with `json.parse`:

```typescript
const compiledAAaccount = json.parse(fs.readFileSync("./compiled_contracts/myAccountAbstraction.json").toString("ascii")
```

Here is an example of a customized wallet, including super administrator management, on a local starknet-devnet:

> launch `starknet-devnet --seed 0` before using this script

```typescript
import { Account, ec, json, stark, Provider, hash } from "starknet";
import axios from "axios";
```

```typescript
// connect provider
const provider = new Provider({ sequencer: { network: "http://127.0.0.1:5050" } });

// initialize existing predeployed account 0 of Devnet
const privateKey0 = "0xe3e70682c2094cac629f6fbed82c07cd";
const starkKeyPair0 = ec.getKeyPair(privateKey0);
const accountAddress0 = "0x7e00d496e324876bbc8531f2d9a82bf154d1a04a50218ee74cdd372f75a551a";
const account0 = new Account(provider, accountAddress0, starkKeyPair0);

// new account abstraction:
// Generate public and private key pair.
const AAprivateKey = stark.randomAddress();
console.log('New account:\nprivateKey=', AAprivateKey);
const AAstarkKeyPair = ec.getKeyPair(AAprivateKey);
const AAstarkKeyPub = ec.getStarkKey(AAstarkKeyPair);
console.log('publicKey=', AAstarkKeyPub);

// declare the contract
const compiledAAaccount = json.parse(fs.readFileSync("./compiled_contracts/myAccountAbstraction.json").toString("ascii");
const AAaccountClassHash = "0x5139780c7ec8246e21a22e49f4fa0ce430237df4a4b241214a3a5a5c120120d";
const { transaction_hash: declTH, class_hash: decCH } = await account0.declare({
    classHash: AAaccountClassHash,
    contract: compiledAAaccount
});
console.log('Customized account class hash =', decCH);
await provider.waitForTransaction(declTH);

// Calculate future address of the account
const AAaccountConstructorCallData = stark.compileCalldata({
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
const AAaccount = new Account(provider, AAcontractAddress, AAstarkKeyPair);
const { transaction_hash, contract_address } = await AAaccount.deployAccount({
    classHash: AAaccountClassHash,
    constructorCalldata: AAaccountConstructorCallData,
    addressSalt: AAstarkKeyPub
});
await provider.waitForTransaction(transaction_hash);
console.log('✅ New customized account created.\n   address =', contract_address);
```

The pre-computed address has been funded automatically by minting new dummy ETH in Starknet devnet!
