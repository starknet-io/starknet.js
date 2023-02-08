---
sidebar_position: 14
---

# Signature

You can use Starknet.js to sign a message outside of the network, using the standard methods of hash and sign of StarkNet.

## Sign and send a message

Your message has to be an array of `BigNumberish`. You calculate the hash of this message, then you calculate the signature.

```typescript
import {ec, hash, number, json, Contract } from "starknet";

const privateKey = "0x1234567890987654321";
const starkKeyPair = ec.getKeyPair(privateKey);
const starknetPublicKey = ec.getStarkKey(starkKeyPair);
const fullPublicKey=starkKeyPair.getPublic("hex");

const message : BigNumberish[] = [1, 128, 18, 14];

const msgHash = hash.computeHashOnElements(message);
const signature = ec.sign(starkKeyPair, msgHash);
```

Then you can send, by any means, to the recipient of the message :

- the message.
- the signature.
- the full public key (or a wallet address).

## Receive and verify a message

On receiver side, you can verify that : 
- the message has not been modified,
- the sender of this message owns the private key corresponding to the public key.

2 ways to perform this verification :
- outside of the network, using the full public key (very fast, but only for standard StarkNet hash & sign).
- in the network, using the account address (slow, add workload to the node/sequencer, but can manage exotic account abstraction about hash or sign).

### Verify outside of StarkNet :

The sender provides the message, the signature and the full public key. Verification :
```typescript
const starkKeyPair1 = ec.getKeyPairFromPublicKey(fullPublicKey);
const msgHash1 = hash.computeHashOnElements(message);
const result1 = ec.verify(starkKeyPair1, msgHash1, signature);
console.log("Result (boolean) =", result1);
```
> The sender can also provide its account address. Then, you can check that this full public key is linked to this account. The pubKey that you can read in the account contract is part (part X) of the full pubKey (parts X & Y) :

Read the pubKey of the account :
```typescript
const provider = new Provider({ sequencer: { baseUrl: "http://127.0.0.1:5050" } }); //devnet
const compiledAccount = json.parse(fs.readFileSync("./compiled_contracts/Account_0_5_1.json").toString("ascii"));
const accountAddress ="0x...."; // account of sender
const contractAccount = new Contract(compiledAccount.abi, accountAddress, provider);
const pubKey3 = await contractAccount.call("getPublicKey");
```
Check that the pubKey of the account is part of the full pubKey :
```typescript
const isFullPubKeyRelatedToAccount: boolean = 
    BigInt(pubKey3.publicKey.toString()) == 
    BigInt(encode.addHexPrefix(fullPublicKey.slice(4, 68)));
console.log("Result (boolean)=", isFullPubKeyRelatedToAccount);
```

### Verify in StarkNet network, with the account :

The sender can provide an account address, in spite of a full public key. 

```typescript
const provider = new Provider({ sequencer: { baseUrl: "http://127.0.0.1:5050" } }); //devnet
const compiledAccount = json.parse(fs.readFileSync("./compiled_contracts/Account_0_5_1.json").toString("ascii"));

const accountAddress ="0x..."; // account of sender
const contractAccount = new Contract(compiledAccount.abi, accountAddress, provider);
const msgHash2 = hash.computeHashOnElements(message);
// The call of isValidSignature will generate an error if not valid
    let result2: boolean;
    try {
        await contractAccount.call("isValidSignature", [msgHash2, signature]);
        result2 = true;
    } catch {
        result2 = false;
    }
console.log("Result (boolean) =", result2);
```

## Sign and verify following EIP712

Previous example are valid for an array of numbers. In case of more complex structure of object, you have to work in accordance with [EIP 712](https://eips.ethereum.org/EIPS/eip-712). This json structure has 4 mandatory items : `types`, `primaryType`, `domain` and `message`.  
These items are designed to be able to be an interface with a wallet. At sign request, the wallet will display :
- `message` will be displayed at the botton of the wallet display, showing clearly (not in hexa) the message to sign. Its structure has to be in accordance with the type listed in `primaryType`, described in `types`.
- `domain` will be shown above the message. Its structure has to be in accordance with `StarkNetDomain`.

``` typescript
import { Account, typedData } from "starknet";

const typedDataValidate: typedData.TypedData = {
    types: {
        StarkNetDomain: [
            { name: 'name', type: 'string' },
            { name: 'version', type: 'felt' },
            { name: 'chainId', type: 'felt' },
            { name: 'verifyingContract', type: 'felt' },
        ],
        Validate: [
            { name: 'from', type: 'felt' },
            { name: 'starknetAddress', type: 'felt' },
            { name: 'yourSelection', type: 'felt' },
        ],
    },
    primaryType: 'Validate',
    domain: {
        name: 'Confirm the address',
        version: '1',
        chainId: "0x534e5f474f45524c49",
        verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
    },
    message: {
        from: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
        starknetAddress: "0x7e00d496e324876bbc8531f2d9a82bf154d1a04a50218ee74cdd372f75a551a",
        yourSelection: "4",
    },
};

// connect your account, then
const signature4 = await account.signMessage(typedDataValidate);
```
On receiver side, you receive the json, the signature and the account address. To verify the message :

``` typescript
const compiledAccount = json.parse(fs.readFileSync("./compiledContracts/Account_0_5_1.json").toString("ascii"));
const contractAccount = new Contract(compiledAccount.abi, accountAddress, provider);

const msgHash5 = typedData.getMessageHash(typedDataValidate, accountAddress);
// The call of isValidSignature will generate an error if not valid
let result5: boolean;
try {
    await contractAccount.call("isValidSignature", [msgHash5, signature5]);
    result5 = true;
} catch {
    result5 = false;
}
console.log("Result5 (boolean) =", result5);
```
