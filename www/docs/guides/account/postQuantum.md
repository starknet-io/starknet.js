---
sidebar_position: 4.5
---

# Post-quantum signature (Falcon-512)

Starknet.js can sign the transactions of a Falcon-512 account. Falcon is a signature scheme designed to resist quantum computers. This page explains why it matters, how to use it, and its limits.

## Why a post-quantum signature?

A standard Starknet account signs with ECDSA, on the Stark curve. The public key is computed from the private key. The reverse, finding the private key from the public key, is a problem that normal computers cannot solve: the security of ECDSA rests on it.

A large quantum computer could solve this problem. For NIST, the US standards agency, ECDSA is "no longer secure" against such a computer ([NISTIR 8105](https://nvlpubs.nist.gov/nistpubs/ir/2016/NIST.IR.8105.pdf), table 1). If a large quantum computer is ever built, it could compute the private key of an ECDSA account from its public key, which is visible on-chain. No such computer exists today: NIST describes these machines as "years or decades away" ([NIST PQC project](https://csrc.nist.gov/projects/post-quantum-cryptography)).

Changing the cryptography of a system takes years, so NIST prepares the change now:

- In 2022, NIST selected three post-quantum signature algorithms for standardization. Falcon is one of them, "for applications that need smaller signatures" ([NIST, July 2022](https://www.nist.gov/news-events/news/2022/07/nist-announces-first-four-quantum-resistant-cryptographic-algorithms)).
- In a draft report ([NIST IR 8547](https://csrc.nist.gov/pubs/ir/8547/ipd), November 2024), NIST proposes to disallow ECDSA in its standards after 2035.

Falcon rests on another kind of math problem, based on lattices, which is believed to be hard even for a quantum computer.

On Starknet, every account is a smart contract, so an account can check any kind of signature. Today, Falcon-512 signatures are checked by the [S2morrow](https://github.com/feltroidprime/s2morrow) account, and by the two Falcon-512 accounts of [OpenZeppelin Contracts for Cairo](https://github.com/OpenZeppelin/cairo-contracts) (pre-release v4.1.0-rc.0). The `starknet/falcon` entry point of Starknet.js signs for all of them.

## Use a Falcon-512 account

The Falcon tools are imported from `starknet/falcon`, an entry point of the `starknet` package: there is nothing else to install.

```typescript
import { Account, CallData, RpcProvider, cairo, hash } from 'starknet';
import { Falcon512Signer, falcon512 } from 'starknet/falcon';
```

### Create a key pair

```typescript
const { secretKey, publicKey } = falcon512.generateKeyPair();
const falconSigner = new Falcon512Signer(secretKey);
```

The secret key is a `Uint8Array` of 1281 bytes, and the public key a `Uint8Array` of 897 bytes.

:::warning
Store the secret key safely: whoever has it controls the account. `Falcon512Signer` also accepts the key as a hex string, but a string cannot be erased from memory: prefer a `Uint8Array`.
:::

### Compute the address

The account class is already declared on Sepolia and Mainnet. Its constructor takes the public key as 29 felts (`pk_packed`), given by `getPackedPublicKey()`.

```typescript
const myProvider = new RpcProvider({ nodeUrl: `${myNodeUrl}` });

const falconClassHash = '0x37c7626b50ba517835c9556b53bce57cb6633704bb702f8c2f13a44cf151d5';
const packedPublicKey = falconSigner.getPackedPublicKey(); // 29 felts
const constructorCalldata = CallData.compile(packedPublicKey);
// The salt can be any felt. Like the public key of an OZ account, the first felt of the key
// makes the address depend on the key only.
const addressSalt = packedPublicKey[0];
const falconAddress = hash.calculateContractAddressFromHash(
  addressSalt,
  falconClassHash,
  constructorCalldata,
  0 // deployer address: 0 when the account deploys itself
);
console.log('Precalculated account address =', falconAddress);
```

Then send STRK to this address, as for [any new account](./create_account.md).

### Deploy the account

```typescript
const falconAccount = new Account({
  provider: myProvider,
  address: falconAddress,
  signer: falconSigner,
});

const { transaction_hash } = await falconAccount.deployAccount(
  {
    classHash: falconClassHash,
    constructorCalldata,
    addressSalt,
    contractAddress: falconAddress,
  },
  { skipValidate: false }
);
await myProvider.waitForTransaction(transaction_hash);
```

### Send transactions

`falconAccount` works like any other account. For example, a STRK transfer:

```typescript
const strkAddress = '0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d';
const { transaction_hash: transferHash } = await falconAccount.execute(
  {
    contractAddress: strkAddress,
    entrypoint: 'transfer',
    calldata: { recipient: recipientAddress, amount: cairo.uint256(10n ** 15n) },
  },
  { skipValidate: false }
);
await myProvider.waitForTransaction(transferHash);
```

`declare` takes the same `{ skipValidate: false }` option.

:::info Fees
Checking a Falcon signature on-chain costs much more than checking an ECDSA one: a STRK transfer uses 13 to 40 times more L2 gas, depending on the account (see [On-chain cost](#on-chain-cost)).

By default, Starknet.js estimates the fees without running the validation of the account, so the estimate would miss this cost. Always pass `{ skipValidate: false }`, as in the examples above.
:::

### Sign and verify a message

Messages follow SNIP-12, as with any account (see [Signature](./signature.md#sign-and-verify-following-eip712)). A Falcon signature is 61 felts for S2morrow, 60 or 31 for the OpenZeppelin accounts.

```typescript
const signature = await falconAccount.signMessage(myTypedData);

// Off-chain, with the public key:
const isValid = falcon512.verifyMessage(myTypedData, signature, publicKey, falconAccount.address);

// On-chain, with the account contract:
const isValidOnChain = await myProvider.verifyMessageInStarknet(
  myTypedData,
  signature,
  falconAccount.address
);
```

### Keys created with falcon-rs

If your secret key comes from falcon-rs (3584 bytes), build the signer with:

```typescript
const falconSigner = Falcon512Signer.fromFalconRs(falconRsSecretKey);
```

:::warning
falcon-rs derives the random seed of each signature from its public salt, so the signatures it produced may leak information about the secret key. Use such a key only to keep using an existing account. For real funds, generate a new key with `falcon512.generateKeyPair()`. The S2morrow account cannot change its key, so this means a new account; an OpenZeppelin account can [change its key](#change-the-key).
:::

Complete scripts for a devnet (deployment, transfer, SNIP-12 message, declaration, import of a falcon-rs key) are in the [Starknet.js workshop](https://github.com/PhilippeR26/starknet.js-workshop-typescript/tree/main/src/scripts/signature/falcon512/snjs).

## OpenZeppelin accounts

OpenZeppelin Contracts for Cairo has two Falcon-512 accounts, in its pre-release v4.1.0-rc.0. Their signatures differ from the S2morrow ones: tell the signer which account it signs for, with the `accountType` option. With a wrong `accountType`, the account rejects every transaction.

| Account                                  | `accountType` | Signature | Class hash                                                           |
| ---------------------------------------- | ------------- | --------- | -------------------------------------------------------------------- |
| `Falcon512ShakeAccountUpgradeable`       | `'oz-hint'`   | 60 felts  | `0x014660ce3739fbde6e33d994cebd6a9fb20e800516b2e1b6c253d4d09baa9ae0` |
| `Falcon512ShakeDirectAccountUpgradeable` | `'oz-direct'` | 31 felts  | `0x016111958d61eedfa5a950b608997abb4981b548f1862d620cc9247461ddeeb1` |

Both classes are declared on Sepolia; they are not declared on Mainnet yet.

The hint is a product added to the signature: the account checks it instead of computing it, so the check costs less gas.

The key pair is created as for S2morrow (see [Create a key pair](#create-a-key-pair)): the same kind of key works for the three accounts. Only the signer gets the option.

```typescript
const { secretKey, publicKey } = falcon512.generateKeyPair();
const falconSigner = new Falcon512Signer(secretKey, { accountType: 'oz-hint' });
```

The steps above stay the same, with this class hash and another constructor calldata: the public key is an array, so its length comes first.

```typescript
const falconClassHash = '0x014660ce3739fbde6e33d994cebd6a9fb20e800516b2e1b6c253d4d09baa9ae0';
const packedPublicKey = falconSigner.getPackedPublicKey(); // 29 felts
const constructorCalldata = CallData.compile({ public_key: packedPublicKey }); // ['29', …]
```

### Change the key

An OpenZeppelin account can change its key, and keep its address. The account calls its own `set_public_key`: the current key signs this transaction, and the new key signs its acceptance.

```typescript
// A new key pair, created as in "Create a key pair". Store its secret key as safely as the first one.
const { secretKey: newSecretKey } = falcon512.generateKeyPair();
const newSigner = new Falcon512Signer(newSecretKey, { accountType: 'oz-hint' });
const acceptance = await newSigner.signOwnershipAcceptance(
  falconAccount.address,
  falconSigner.getPackedPublicKey() // the current key of the account
);
const { transaction_hash: changeHash } = await falconAccount.execute(
  {
    contractAddress: falconAccount.address,
    entrypoint: 'set_public_key',
    calldata: CallData.compile({
      new_public_key: newSigner.getPackedPublicKey(),
      signature: acceptance,
    }),
  },
  { skipValidate: false }
);
await myProvider.waitForTransaction(changeHash);
// From now on, sign with newSigner:
const renewedAccount = new Account({
  provider: myProvider,
  address: falconAccount.address,
  signer: newSigner,
});
```

### Verify a signature off-chain

`falcon512.verify` and `falcon512.verifyMessage` take the same `accountType` option. The public key can also be the 29 felts that the account stores (read with `get_public_key`):

```typescript
const isValid = falcon512.verifyMessage(
  myTypedData,
  signature,
  packedPublicKey,
  falconAccount.address,
  { accountType: 'oz-hint' }
);
```

## Performance

![Time to sign one INVOKE transaction: 4.5 ms with ECDSA, 15.1 ms with Falcon-512 (starknet/falcon), 8.5 ms with Falcon-512 (falcon-rs WASM)](./pictures/falcon-sign-tx-time.svg)

The falcon-rs WASM is shown for comparison only: its signatures may leak information about the secret key (see [Keys created with falcon-rs](#keys-created-with-falcon-rs)).

### On-chain cost

Checking a Falcon signature costs much more L2 gas than checking an ECDSA one. L2 gas used by a STRK transfer:

| Account                                | Signature | L2 gas of a STRK transfer | Compared with ECDSA |
| -------------------------------------- | --------- | ------------------------- | ------------------- |
| Standard (ECDSA, OpenZeppelin account) | 2 felts   | 1.85 million              | ×1                  |
| S2morrow                               | 61 felts  | 24.9 million              | ×13.5               |
| OpenZeppelin, hint                     | 60 felts  | 67.2 million              | ×36                 |
| OpenZeppelin, direct                   | 31 felts  | 74.8 million              | ×40                 |

Measured with starknet-devnet 0.11.0. The fee is this gas multiplied by the price of the gas, which changes every day.

## Limits

- **Falcon, not yet FN-DSA.** This is Falcon as submitted to Round 3 of the NIST process. The NIST standard based on Falcon, FN-DSA (FIPS 206), is still in development ([NIST](https://csrc.nist.gov/projects/post-quantum-cryptography/post-quantum-cryptography-standardization), August 2026). The README of noble, the library this code comes from, says that FN-DSA would most likely be incompatible with Falcon.
- **A copy of noble, without independent audit.** The Falcon code is a copy of [`@noble/post-quantum`](https://github.com/paulmillr/noble-post-quantum) 0.7.1, with one addition: signing a hash point computed outside noble. This addition is proposed to noble ([PR #55](https://github.com/paulmillr/noble-post-quantum/pull/55)). Once noble publishes it, Starknet.js will use the npm package, with no change for you. noble has no independent audit: its author audited version 0.6.1 (April 2026).
- **Not constant-time.** The time needed to sign can depend on the secret key. Do not sign on a machine where an attacker can measure this time closely, like a shared server.
- **S2morrow: one key per account.** The S2morrow account cannot change its key: a new key means a new account. An OpenZeppelin account can [change its key](#change-the-key).
- **The account contracts** come from the [S2morrow](https://github.com/feltroidprime/s2morrow) project and from [OpenZeppelin Contracts for Cairo](https://github.com/OpenZeppelin/cairo-contracts) (pre-release v4.1.0-rc.0), not from Starknet.js.

For more details, see the [security notes](https://github.com/starknet-io/starknet.js/blob/develop/src/falcon/SECURITY.md) of `starknet/falcon`, and its [API](../../API/falcon/index.md).
