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

On Starknet, every account is a smart contract, so an account can check any kind of signature. The [S2morrow](https://github.com/feltroidprime/s2morrow) account contract checks Falcon-512 signatures today, and the `starknet/falcon` entry point of Starknet.js signs for it.

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
Checking a Falcon signature on-chain costs much more than checking an ECDSA one. Measured on devnet: a STRK transfer uses about 25 million units of L2 gas, about 13 times more than from an ECDSA account, and the deployment of the account about 39 million.

By default, Starknet.js estimates the fees without running the validation of the account, so the estimate would miss this cost. Always pass `{ skipValidate: false }`, as in the examples above.
:::

### Sign and verify a message

Messages follow SNIP-12, as with any account (see [Signature](./signature.md#sign-and-verify-following-eip712)). A Falcon signature is 61 felts.

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
falcon-rs derives the random seed of each signature from its public salt, so the signatures it produced may leak information about the secret key. Use such a key only to keep using an existing account. For real funds, generate a new key with `falcon512.generateKeyPair()`: the S2morrow account cannot change its key, so this means a new account.
:::

## Limits

- **Falcon, not yet FN-DSA.** This is Falcon as submitted to Round 3 of the NIST process. The NIST standard based on Falcon, FN-DSA (FIPS 206), is still in development ([NIST](https://csrc.nist.gov/projects/post-quantum-cryptography/post-quantum-cryptography-standardization), August 2026). The README of noble, the library this code comes from, says that FN-DSA would most likely be incompatible with Falcon.
- **A copy of noble, without independent audit.** The Falcon code is a copy of [`@noble/post-quantum`](https://github.com/paulmillr/noble-post-quantum) 0.7.1, with one addition: signing a hash point computed outside noble. This addition is proposed to noble ([PR #55](https://github.com/paulmillr/noble-post-quantum/pull/55)). Once noble publishes it, Starknet.js will use the npm package, with no change for you. noble has no independent audit: its author audited version 0.6.1 (April 2026).
- **Not constant-time.** The time needed to sign can depend on the secret key. Do not sign on a machine where an attacker can measure this time closely, like a shared server.
- **One key per account.** The S2morrow account cannot change its key: a new key means a new account.
- **The account contract** comes from the [S2morrow](https://github.com/feltroidprime/s2morrow) project, not from Starknet.js.

For more details, see the [security notes](https://github.com/starknet-io/starknet.js/blob/develop/src/falcon/SECURITY.md) of `starknet/falcon`, and its [API](../../API/falcon/index.md).
