---
sidebar_position: 15
---

# Signature

You can use Starknet.js to sign a message outside of the network, using the standard methods of hash and sign of Starknet. In this way, in some cases, you can avoid paying fees to store data in-chain; you transfer the signed message off-chain, and the recipient can verify (without fee) on-chain the validity of the message.

## Sign and send a message

Your message has to be an array of `BigNumberish`. First, calculate the hash of this message, then calculate the signature.

> If the message does not respect some safety rules of composition, this method could be a way of attack of your smart contract. If you have any doubt, prefer the [EIP712 like method](#sign-and-verify-following-eip712), which is safe, but is also more complicated.

```typescript
import { ec, hash, type BigNumberish, type WeierstrassSignatureType } from 'starknet';

const privateKey = '0x1234567890987654321';
const starknetPublicKey = ec.starkCurve.getStarkKey(privateKey);
const fullPublicKey = stark.getFullPublicKey(privateKey);
const message: BigNumberish[] = [1, 128, 18, 14];

const msgHash = hash.computeHashOnElements(message);
const signature: WeierstrassSignatureType = ec.starkCurve.sign(msgHash, privateKey);
```

Then you can send, by any means, to the recipient of the message:

- the message.
- the signature.
- the full public key (or an account address using this private key).

## Receive and verify a message

On the receiver side, you can verify that:

- the message has not been modified,
- the sender of this message owns the private key corresponding to the public key.

2 ways to perform this verification:

- off-chain, using the full public key (very fast, but only for standard Starknet hash & sign).
- on-chain, using the account address (slow, add workload to the node/sequencer, but can manage exotic account abstraction about hash or sign).

### Verify outside of Starknet:

The sender provides the message, the signature, and the full public key. Verification:

```typescript
const msgHash1 = hash.computeHashOnElements(message);
const isValid1 = typedData.verifyMessage(msgHash1, signature, fullPublicKey);
console.log('Result (boolean) =', isValid1);

// with a low level function (take care of Types limitations) :
const isValid2 = ec.starkCurve.verify(signature1, msgHash, fullPublicKey);
```

> The sender can also provide their account address. Then you can check that this full public key is linked to this account. The public Key that you can read in the account contract is part (part X) of the full public Key (parts X & Y):

Read the Public Key of the account:

```typescript
const provider = new RpcProvider({ nodeUrl: 'http://127.0.0.1:5050/rpc' }); //devnet
const compiledAccount = json.parse(
  fs.readFileSync('./__mocks__/cairo/account/accountOZ080.json').toString('ascii')
);
const accountAddress = '0x....'; // account of sender
const contractAccount = new Contract(compiledAccount.abi, accountAddress, provider);
const pubKey3 = await contractAccount.call('getPublicKey');
```

Check that the Public Key of the account is part of the full public Key:

```typescript
const isFullPubKeyRelatedToAccount: boolean =
  pubKey3 == BigInt(encode.addHexPrefix(fullPublicKey.slice(4, 68)));
console.log('Result (boolean) =', isFullPubKeyRelatedToAccount);
```

### Verify in the Starknet network, with the account:

The sender can provide an account address, despite a full public key.

```typescript
const myProvider = new RpcProvider({ nodeUrl: 'http://127.0.0.1:5050/rpc' }); //devnet-rs
const accountAddress = '0x...'; // account of sender

const msgHash2 = hash.computeHashOnElements(message);
const result2: Boolean = rpcProvider.verifyMessageInStarknet(msgHash2, signature, accountAddress);
console.log('Result (boolean) =', result2);
```

## Sign and verify following EIP712

Previous examples are valid for an array of numbers. In the case of a more complex structure, you have to work in the spirit of [EIP 712](https://eips.ethereum.org/EIPS/eip-712). This JSON structure has 4 mandatory items: `types`, `primaryType`, `domain`, and `message`.  
These items are designed to be able to be an interface with a browser wallet. At sign request, the wallet will display:

- the `message` at the bottom of the wallet window, showing clearly (not in hex) the message to sign. Its structure has to be in accordance with the type listed in `primaryType`, defined in `types`.
- the `domain` above the message. Its structure has to be in accordance with `StarknetDomain`.

The types than can be used are defined in [SNIP-12](https://github.com/starknet-io/SNIPs/blob/main/SNIPS/snip-12.md). An example of simple message :

```typescript
const myTypedData: TypedData = {
  domain: {
    name: 'DappLand',
    chainId: constants.StarknetChainId.SN_SEPOLIA,
    version: '1.0.2',
    revision: TypedDataRevision.ACTIVE,
  },
  message: {
    name: 'MonKeyCollection',
    value: 2312,
    // do not use BigInt type if message sent to a web browser
  },
  primaryType: 'Simple',
  types: {
    Simple: [
      {
        name: 'name',
        type: 'shortstring',
      },
      {
        name: 'value',
        type: 'u128',
      },
    ],
    StarknetDomain: [
      {
        name: 'name',
        type: 'shortstring',
      },
      {
        name: 'chainId',
        type: 'shortstring',
      },
      {
        name: 'version',
        type: 'shortstring',
      },
    ],
  },
};

const account0 = new Account(myProvider, address, privateKey);
const fullPublicKey = stark.getFullPublicKey(privateKey);

const msgHash = await account0.hashMessage(myTypedData);
const signature: Signature = (await account0.signMessage(myTypedData)) as WeierstrassSignatureType;
```

:::note
A message can be more complex, with nested types. See an example [here](https://github.com/PhilippeR26/starknet.js-workshop-typescript/blob/main/src/scripts/signature/4c.signSnip12vActive.ts).
:::

### Verify TypedData outside Starknet

On the receiver side, you receive the message, the signature, the full public key and the account address.  
To verify the message:

```typescript
const isValid = typedData.verifyMessage(myTypedData, signature, fullPublicKey, account0Address);
```

A verification is also possible if you have the message hash, the signature and the full public key.

```typescript
const isValid2 = typedData.verifyMessage(msgHash, signature, fullPublicKey);

// with a low level function (take care of Types limitations) :
const isValid3 = ec.starkCurve.verify(signature, msgHash, fullPublicKey);
```

### Verify TypedData in Starknet

On the receiver side, you receive the message, the signature, and the account address.  
To verify the message:

```typescript
const isValid4 = await myProvider.verifyMessageInStarknet(
  myTypedData,
  signature2,
  account0.address
);
```

A verification is also possible if you have the message hash, the signature and the account address:

```typescript
const isValid5 = await myProvider.verifyMessageInStarknet(msgHash, signature2, account0.address);
```

## Signing with an Ethereum signer

All the previous examples are using the standard Starknet signature process, but you can also use the Ethereum one.

```typescript
const myEthPrivateKey = '0x525bc68475c0955fae83869beec0996114d4bb27b28b781ed2a20ef23121b8de';
const myEthAccountAddressInStarknet =
  '0x65a822fbee1ae79e898688b5a4282dc79e0042cbed12f6169937fddb4c26641';
const myEthSigner = new EthSigner(myEthPrivateKey);
console.log('Complete public key =', await myEthSigner.getPubKey());
const sig0 = await myEthSigner.signMessage(message, myEthAccountAddressInStarknet);
console.log('signature message =', sig0);
```

## Signing with a Ledger hardware wallet

![](./pictures/LedgerTitle.png)

Starknet.js has a support for Ledger Nano S+ or X, to sign your Starknet transactions.
You have to use a transporter to interact with the Ledger Nano. Depending if you use an USB or a Bluetooth connection, depending of your framework (Node, Web, Mobile), you have to use the appropriate library to create your transporter.

The Ledger documentation is listing all the available cases :
![](./pictures/LedgerConnectivity.png)

The libs available are :

```typescript
import TransportNodeHid from '@ledgerhq/hw-transport-node-hid';
import TransportWebHid from '@ledgerhq/hw-transport-webhid';
import TransportWebBluetooth from '@ledgerhq/hw-transport-web-ble';
import TransportHID from '@ledgerhq/react-native-hid';
import TransportBLE from '@ledgerhq/react-native-hw-transport-ble';
import type Transport from '@ledgerhq/hw-transport'; // type for the transporter
```

In a Web DAPP, take care that some browsers are not compatible (FireFox, ...), and that the Bluetooth is not working in all cases and in all operating systems.

:::note
The last version of the Ledger Starknet APP (v1.1.1) only supports blind signing of the hash of your action. Sign only hashes from a code that you trust.
:::

For example, for a Node script :

```typescript
import TransportNodeHid from '@ledgerhq/hw-transport-node-hid';
const myLedgerTransport: Transport = await TransportNodeHid.create();
const myLedgerSigner = new LedgerSigner(myLedgerTransport, 0);
const pubK = await myLedgerSigner.getPubKey();
const fullPubK = await myLedgerSigner.getFullPubKey();
// ...
// deploy here an account related to this public key
// ...
const ledgerAccount = new Account(myProvider, ledger0addr, myLedgerSigner);
```

:::warning important
The Ledger shall be connected, unlocked, with the Starknet internal APP activated, before launch of the script.
:::

Some complete examples :  
A Node script : [here](https://github.com/PhilippeR26/starknet.js-workshop-typescript/blob/main/src/scripts/ledgerNano/5.testLedgerAccount.ts).  
A test Web DAPP, to use in devnet-rs network : [here](https://github.com/PhilippeR26/Starknet-Ledger-Wallet).

If you want to read the version of the Ledger Starknet APP :

```typescript
const resp = await myLedgerTransport.send(Number('0x5a'), 0, 0, 0);
const appVersion = resp[0] + '.' + resp[1] + '.' + resp[2];
console.log('version=', appVersion);
```
