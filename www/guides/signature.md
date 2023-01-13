---
sidebar_position: 14
---

# Signature

You can use Starknet.js to sign a message outside of the network.

## Sign and send a message

Your message has to be an array of `BigNumberish`. You calculate the hash of this message, then you calculate the signature.

```typescript
import {ec, hash, number, json, Contract } from "starknet";

const privateKey = "0x1234567890987654321";
const starkKeyPair = ec.getKeyPair(privateKey);
const publicKey = ec.getStarkKey(starkKeyPair);

const message : BigNumberish[] = [1, 128, 18, 14];

const msgHash = hash.computeHashOnElements(message);
const signature = ec.sign(starkKeyPair, msgHash);
```

Then you can send, by any means, to the recipient of the message :

- the message.
- the signature.
- the public key (or a wallet address).

## Receive and verify a message

On receiver side, you can verify that the sender of this message owns the private key corresponding to the public key sent.

```typescript
const starkKeyPair1 = ec.getKeyPairFromPublicKey(publicKey);
const msgHash1 = hash.computeHashOnElements(message);
const result = ec.verify(starkKeyPair, msgHash1, signature);
console.log("Result (boolean) =", result);
```

The sender can provide an account address, in spite of a public key. You can read the public key of this account to perform the check :

```typescript
const provider = new Provider({ sequencer: { baseUrl: "http://127.0.0.1:5050" } }); //devnet
const compiledAccount = json.parse(fs.readFileSync("./compiled_contracts/Account_0_5_1.json").toString("ascii"));

const accountAddress ="0x051158d244c7636dde39ec822873b29e6c9a758c6a9812d005b6287564908610"; //existing account
const contractAccount = new Contract(compiledAccount.abi, accountAddress, provider);
const pubKey2 = await contractAccount.call("getPublicKey");
const starkKeyPair2 = ec.getKeyPairFromPublicKey(pubKey2);

const msgHash2 = hash.computeHashOnElements(message);
const result = ec.verify(starkKeyPair2, msgHash2, signature);
console.log("Result (boolean) =", result);
```
