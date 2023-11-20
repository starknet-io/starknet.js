---
sidebar_position: 14
---

# Signature

You can use Starknet.js to sign a message outside of the network, using the standard methods of hash and sign of Starknet. In this way, in some cases, you can avoid paying fees to store data in-chain; you transfer the signed message off-chain, and the recipient can verify (without fee) on-chain the validity of the message.

## Sign and send a message

Your message has to be an array of `BigNumberish`. First calculate the hash of this message, then calculate the signature.

> If the message does not respect some safety rules of composition, this method could be a way of attack of your smart contract. If you have any doubts, prefer the [EIP712 like method](#sign-and-verify-following-eip712), which is safe, but is also more complicated.

```typescript
import {ec, hash, number, json, Contract } from "starknet";

const privateKey = "0x1234567890987654321";
const starkKeyPair = ec.getKeyPair(privateKey);
const starknetPublicKey = ec.getStarkKey(starkKeyPair);
const fullPublicKey=encode.addHexPrefix(starkKeyPair.getPublic("hex"));

const message: BigNumberish[] = [1, 128, 18, 14];

const msgHash = hash.computeHashOnElements(message);
const signature = ec.sign(starkKeyPair, msgHash);
```

Then you can send, by any means, to the recipient of the message:

- the message.
- the signature.
- the full public key (or a wallet address).

## Receive and verify a message

On receiver side, you can verify that:

- the message has not been modified,
- the sender of this message owns the private key corresponding to the public key.

2 ways to perform this verification:

- off-chain, using the full public key (very fast, but only for standard Starknet hash & sign).
- on-chain, using the account address (slow, add workload to the node/sequencer, but can manage exotic account abstraction about hash or sign).

### Verify outside of Starknet:

The sender provides the message, the signature and the full public key. Verification:

```typescript
const starkKeyPair1 = ec.getKeyPairFromPublicKey(fullPublicKey);
const msgHash1 = hash.computeHashOnElements(message);
const result1 = ec.verify(starkKeyPair1, msgHash1, signature);
console.log("Result (boolean) =", result1);
```

> The sender can also provide their account address. Then you can check that this full public key is linked to this account. The pubKey that you can read in the account contract is part (part X) of the full pubKey (parts X & Y):

Read the pubKey of the account:

```typescript
const provider = new Provider({ sequencer: { baseUrl: "http://127.0.0.1:5050" } }); //devnet
const compiledAccount = json.parse(fs.readFileSync("./compiled_contracts/Account_0_5_1.json").toString("ascii"));
const accountAddress = "0x...."; // account of sender
const contractAccount = new Contract(compiledAccount.abi, accountAddress, provider);
const pubKey3 = await contractAccount.call("getPublicKey");
```

Check that the pubKey of the account is part of the full pubKey:

```typescript
const isFullPubKeyRelatedToAccount: boolean =
    BigInt(pubKey3.publicKey.toString()) ==
    BigInt(encode.addHexPrefix(fullPublicKey.slice(4, 68)));
console.log("Result (boolean)=", isFullPubKeyRelatedToAccount);
```

### Verify in Starknet network, with the account:

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

Previous examples are valid for an array of numbers. In case of more complex structure of object, you have to work in the spirit of [EIP 712](https://eips.ethereum.org/EIPS/eip-712). This json structure has 4 mandatory items: `types`, `primaryType`, `domain` and `message`.  
These items are designed to be able to be an interface with a wallet. At sign request, the wallet will display:

- `message` will be displayed at the bottom of the wallet display, showing clearly (not in hex) the message to sign. Its structure has to be in accordance with the type listed in `primaryType`, defined in `types`.
- `domain` will be shown above the message. Its structure has to be in accordance with `StarkNetDomain`.

The predefined types that you can use:

- felt: for an integer on 251 bits.
- felt\*: for an array of felt.
- string: for a shortString of 31 ASCII characters max.
- selector: for a name of a smartcontract function.
- merkletree: for a Root of a Merkle tree. root is calculated with the provided data.

```typescript
import { Account, typedData } from "starknet";

const typedDataValidate: typedData.TypedData = {
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

// connect your account, then
const signature4 = await account.signMessage(typedDataValidate);
```

On receiver side, you receive the json, the signature and the account address. To verify the message:

```typescript
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
