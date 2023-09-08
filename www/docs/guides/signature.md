---
sidebar_position: 14
---

# Signature

You can use Starknet.js to sign a message outside of the network, using the standard methods of hash and sign of Starknet. In this way, in some cases, you can avoid paying fees to store data in-chain; you transfer the signed message off-chain, and the recipient can verify (without fee) on-chain the validity of the message.

## Standard signature & verification of a BigNumberish[]

### Standard signature of a BigNumberish[]

Your message has to be an array of `BigNumberish`. First, calculate the hash of this message, then calculate the signature.

> If the message does not respect some safety rules of composition, this method could be a way of attack of your smart contract. If you have any doubt, prefer the [EIP712 like method](#sign-and-verify-following-eip712-like-standard), which is safe, but is also more complicated.

```typescript
import {ec, hash, num, json, Contract, WeierstrassSignatureType } from "starknet";

const privateKey = "0x1234567890987654321";
const starknetPublicKey = ec.starkCurve.getStarkKey(privateKey);
const fullPublicKey = encode.addHexPrefix( encode.buf2hex( ec.starkCurve.getPublicKey( privateKey, false)));

const message: BigNumberish[] = [1, 128, 18, 14];

const msgHash = hash.computeHashOnElements(message);
const signature: WeierstrassSignatureType = ec.starkCurve.sign(msgHash,privateKey);
```

Then you can send, by any means, to the recipient of the message:

- the message.
- the signature.
- the full public key (or an account address using this private key).

### Receive and verify a message

On the receiver side, you can verify that:

- the message has not been modified,
- the sender of this message owns the private key corresponding to the public key.

2 ways to perform this verification:

- off-chain, using the full public key (very fast, but only for standard Starknet hash & sign).
- on-chain, using the account address (slow, add workload to the node/sequencer, but can manage exotic account abstraction about hash or sign).

#### Verify outside of Starknet

The sender provides the message, the signature, and the full public key.  
Verification:

```typescript
const msgHash1 = hash.computeHashOnElements(message);
const result1 = ec.starkCurve.verify(signature, msgHash1, fullPublicKey);
console.log("Result (boolean) =", result1);
```

> The sender can also provide their account address. Then you can check that this full public key is linked to this account. The public Key that you can read in the account contract is part (part X) of the full public Key (parts X & Y):

Read the Public Key of the account:

```typescript
const provider = new Provider({ sequencer: { baseUrl: "http://127.0.0.1:5050" } }); //devnet
const compiledAccount = json.parse(fs.readFileSync("./compiled_contracts/Account_0_5_1.json").toString("ascii"));
const accountAddress ="0x...."; // account of sender
const contractAccount = new Contract(compiledAccount.abi, accountAddress, provider);
const pubKey3 = await contractAccount.call("getPublicKey");
```

Check that the Public Key of the account is part of the full public Key:

```typescript
const isFullPubKeyRelatedToAccount: boolean =
publicKey.publicKey == BigInt(encode.addHexPrefix( fullPublicKey.slice( 4, 68)));
```

#### Verify in the Starknet network, with the account

The sender can provide an account address, instead of a full public key.

```typescript
const provider = new Provider({ sequencer: { baseUrl: "http://127.0.0.1:5050" } }); //devnet
const compiledAccount = json.parse(fs.readFileSync("./compiled_contracts/Account_0_5_1.json").toString("ascii"));

const accountAddress ="0x..."; // account of sender
const contractAccount = new Contract(compiledAccount.abi, accountAddress, provider);
const msgHash2 = hash.computeHashOnElements(message);
// The call of isValidSignature will generate an error if not valid
    let result2: boolean;
    try {
        await contractAccount.isValidSignature(msgHash2, [signature.r,signature.s]);
        result2 = true;
    } catch {
        result2 = false;
    }
console.log("Result (boolean) =", result2);
```

## Abstracted signature & verification of a BigNumberish[]

### Abstracted signature of a BigNumberish[]

Define the function that will perform the abstracted signature :

```typescript
function signMyMessage(
    msgHash: string,
    privateKey: string,
    ...additionalParams: string[]
): Signature {
    if (additionalParams.length < 3) {
        throw new Error(`Abstracted message signer is waiting 3 additional parameters. Got: ${additionalParams.length} params!`);
    }
    const signer2FA = additionalParams;
    const { r, s } = ec.starkCurve.sign(
        msgHash,
        privateKey,
    );
    const signature = [r.toString(), s.toString(), ...signer2FA]; // the smart contract will check that the 2FA is 0x0a, 0x0b, 0x0c
    return signature;
}
```

Sign the message with the abstraction parameters at the end :

```typescript
const signer2FA = [10, 11, 12];
const msgHash = hash.computeHashOnElements([...message, ...signer2FA]);
const signature = signMyMessage(
    msgHash,
    privateKey,
    ...signer2FA // abstraction is here
    );
```

### Abstracted verification of a BigNumberish[]

The sender provides the contract address, the message, the signature and the signer2FA.
The verification can be done only in Starknet.

```typescript
const provider = new Provider({ sequencer: { baseUrl: "http://127.0.0.1:5050" } }); //devnet
const compiledAccount = json.parse(fs.readFileSync("./compiled_contracts/Account_abstracted.json").toString("ascii"));

const signer2FA = [10, 11, 12];
const accountAddress ="0x..."; // account of sender
const contractAccount = new Contract(compiledAccount.abi, accountAddress, provider);
const msgHash2 = hash.computeHashOnElements([...message, ...signer2FA]);
// The call of isValidSignature will generate an error if not valid
    let result2: boolean;
    try {
        await contractAccount.isValidSignature(msgHash2, signature);
        result2 = true;
    } catch {
        result2 = false;
    }
console.log("Result (boolean) =", result2);
```

## Sign and verify, following EIP712 like standard

Previous examples are valid for an array of numbers. In the case of a more complex structure of an object, you have to work in the spirit of [EIP 712](https://eips.ethereum.org/EIPS/eip-712). This JSON structure has 4 mandatory items: `types`, `primaryType`, `domain`, and `message`.  
These items are designed to be able to be an interface with a wallet. At sign request, the wallet will display:

- the `message` will be displayed at the bottom of the wallet display, showing clearly (not in hex) the message to sign. Its structure has to be in accordance with the type listed in `primaryType`, defined in `types`.
- the `domain` will be shown above the message. Its structure has to be in accordance with `StarkNetDomain`.

The predefined types that you can use :

- felt: for an integer on 251 bits.
- felt\*: for an array of felt.
- string: for a shortString of 31 ASCII characters max.
- selector: for a name of a smart contract function.
- merkletree: for a Root of a Merkle tree. the root is calculated with the provided data.

```typescript
const typedDataValidate: TypedData = {
        types: {
            StarkNetDomain: [
                { name: "name", type: "string" },
                { name: "version", type: "felt" },
                { name: "chainId", type: "felt" },
            ],
            Airdrop: [
                { name: "address", type: "felt" },
                { name: "amount", type: "felt" }
            ],
            Validate: [
                { name: "id", type: "felt" },
                { name: "from", type: "felt" },
                { name: "amount", type: "felt" },
                { name: "nameGamer", type: "string" },
                { name: "endDate", type: "felt" },
                { name: "itemsAuthorized", type: "felt*" }, // array of felt
                { name: "chkFunction", type: "selector" }, // name of function
                { name: "rootList", type: "merkletree", contains: "Airdrop" } // root of a merkle tree
            ]
        },
        primaryType: "Validate",
        domain: {
            name: "myDapp", // put the name of your dapp to ensure that the signatures will not be used by other DAPP
            version: "1",
            chainId: shortString.encodeShortString("SN_GOERLI"), // shortString of 'SN_GOERLI' (or 'SN_MAIN' or 'SN_GOERLI2'), to be sure that signature can't be used by other network.
        },
        message: {
            id: "0x0000004f000f",
            from: "0x2c94f628d125cd0e86eaefea735ba24c262b9a441728f63e5776661829a4066",
            amount: "400",
            nameGamer: "Hector26",
            endDate: "0x27d32a3033df4277caa9e9396100b7ca8c66a4ef8ea5f6765b91a7c17f0109c",
            itemsAuthorized: ["0x01", "0x03", "0x0a", "0x0e"],
            chkFunction: "check_authorization",
            rootList: [
                {
                    address: "0x69b49c2cc8b16e80e86bfc5b0614a59aa8c9b601569c7b80dde04d3f3151b79",
                    amount: "1554785",
                }, {
                    address: "0x7447084f620ba316a42c72ca5b8eefb3fe9a05ca5fe6430c65a69ecc4349b3b",
                    amount: "2578248",
                }, {
                    address: "0x3cad9a072d3cf29729ab2fad2e08972b8cfde01d4979083fb6d15e8e66f8ab1",
                    amount: "4732581",
                }, {
                    address: "0x7f14339f5d364946ae5e27eccbf60757a5c496bf45baf35ddf2ad30b583541a",
                    amount: "913548",
                },
            ]
        },
    };
```

### Sign EIP712 message with abstraction

Define the functions that hash and sign the JSON message :

```typescript
export function hashMessage(
    eip712json: TypedData,
    accountAddress: string,
    ...additionalParams: string[]
): string {
    if (additionalParams.length < 3) {
        throw new Error(`Abstracted message hasher is waiting 3 additional parameters. Got: ${additionalParams.length} params!`);
    }
    const signer2FA = additionalParams;
    const msgHash = hash.computeHashOnElements([
        typedData.getMessageHash(eip712json, accountAddress),
        ...signer2FA // the smart contract will check that the 2FA is 0x0a, 0x0b, 0x0c
    ]);
    return msgHash;
}

export function signMessage(
    msgHash: string,
    privateKey: string,
    ...additionalParams: string[]
): Signature {
    if (additionalParams.length < 3) {
        throw new Error(`Abstracted message signer is waiting 3 additional parameters. Got: ${additionalParams.length} params!`);
    }
    const signer2FA = additionalParams;
    const { r, s } = ec.starkCurve.sign(
        msgHash,
        privateKey,
    );
    const signature = [r.toString(), s.toString(), ...signer2FA]; // the smart contract will check that the 2FA is 0x0a, 0x0b, 0x0c
    return signature;
}
export const abstractionFns: AbstractionFunctions = {
    abstractedMessageHash: hashMessage,
    abstractedMessageSign: signMessage
}
```

```typescript
const signerAbstraction = new Signer(privateKeyAbstraction, abstractionFns);
const accountAbstraction = new Account(provider, addressAbstraction, signerAbstraction, "1");
const signature = await accountAbstraction.signMessage(typedDataValidate);
```

### Verify EIP712 message with abstraction

On the receiver side, you receive the JSON, the signature, and the account address.  
To verify the message, create a dummy Account instance, using the same signer than the Account instance that created the signature (whatever the privateKey ; it's not used for this operation).  
Then, verify the message in Starknet :

```typescript
const result5 = await accountAbstraction.verifyMessage(typedDataValidate, signature);
console.log("Result5 (boolean) =", result5);
```
