---
sidebar_position: 17
---

# Migration from v4 to v5

This document only covers the features present in v4 which have changed in some important way in v5.

If you encounter any missing changes, please let us know and we will update this guide.

## ~~number~~ replaced by num

To avoid confusion with the native `number` command, the `number` namspace has been renamed `num`.

```typescript
// v4
const res = number.isHex(d1);

// v5
const res = num.isHex(d1);
```

`Number.toFelt()` has been removed.

## 🪦 R.I.P. BigNumbers

Bignumber are very slow to process ; too slow for Starknet.js. They have been replaced by native bigint.

```typescript
// v4
const qty = new BN("0x4a8bc");

// v5
const qty1 = BigInt("0x4a8bc");
const qty2 = 32786324915918425n;
```

So, the BigNumberish type is now defined as :

- String representing a number : "123", "0xabc2"
- Number (max 53 bits) : 123
- BigInt (max 255 bits): 12345612345n

All methods of BN type are of course removed, but have equivalences :

- .mul() and .div() : common operators can be used with bigints : + - \* /
- .umod() : can easily be replaced :

```typescript
// v4
const c = a.umod(b);

// v5
const tmp = a % b; // a & b are bigint
const c = tmp >= 0n ? tmp : tmp + b;
```

- .toarray() : can be replaced by `num.hexToBytes(a)`.

## ec (elliptic curve)

BN elliptic curves library has been replaced by a bigint library.  
Many functions have been relocated/modified.
The concept of key pair has been removed :  
`ec.getKeyPair(privateKey)`, `ec.getKeyPairFromPublicKey(pubKey)` and `ec.genKeyPair()` do not exists anymore. Methods are using now directly the private key :  
For an Account creation :

```typescript
// v4
const privateKey0 = accountTestnet4privateKey;
const account0Address: string = accountTestnet4Address;
const starkKeyPair0 = ec.getKeyPair(privateKey0);
const account0 = new Account(provider, account0Address, starkKeyPair0);

// v5
const privateKey0 = accountTestnet4privateKey;
const account0Address: string = accountTestnet4Address;
const account0 = new Account(provider, account0Address, privateKey0);
```

For starknetPubKey :

```typescript
// v4
const starknetPubKey = ec.getStarkKey(keyPair);

// v5
const starknetPubKey = ec.starkCurve.getStarkKey(privateKey); // only X part of full pubKey
```

For fullPublicKey :

```typescript
// v4
const fullPubKey = encode.addHexPrefix(keyPair.getPublic("hex"));

// v5
const fullPubKey = encode.addHexPrefix(encode.buf2hex(ec.starkCurve.getPublicKey(privateKey, false))); // full key
```

For ec.sign and ec.verify :

```typescript
// v4
const signature = ec.sign(keyPair, msgHash);
const isVerified = ec.verify(inferredKeyPair, msgHash, signature);

// v5
const signature = ec.starkCurve.sign(msgHash, privateKey);
const verifStarknet = ec.starkCurve.verify(signature, msgHash, fullPubKeySource);
```

For pedersen hash :

```typescript
// v4
const hashMsg = hash.pedersen([account, price]);

// v5
const hashMsg = ec.starkCurve.pedersen(account, price);
```

## Declare**And**Deploy

It has been considered advantageous to replace `DeclareDeploy` by `DeclareAndDeploy` :

```typescript
// v4
const response = await account0.declareDeploy({ contract: compiledTest, classHash: testClassHash });
// v5
const response = await account0.declareAndDeploy({ contract: compiledHelloSierra, casm: compiledHelloCasm });
```

> Nota : `declare` and `declareAndDeploy` do not needs anymore the classHash ; the new ec library is now able to calculate it quickly and automatically. If the contrat has been written in Cairo 1, the casm property is needed.

## Calldata and returned values

Deep modifications and improvements have been performed concerning exchange of data with the Cairo contract functions.  
The complete new rules are listed in this [guide](define_call_message.md).
In summary, it's easier to construct a list of parameters, with an automatic verification of the conformity to the abi.  
Returned values from a Cairo 0 contract are identical, but returned values from a Cairo 1 contract are easier to recover.

`stark.compileCalldata()` has been replaced by `CallData.compile()`. Anyway, the new `Contract.populate()` and `myCallData.compile()` are the recommended methods to create a calldata.

## provider

Constants for initialization of the provider have been updated:

```typescript
// v4
const providerTestnet2 = new Provider({ sequencer: { network: "goerli-alpha-2" } });

// v5
 const providerTestnet2 = new Provider({ sequencer: { network: constants.NetworkName.SN_GOERLI2 } }); // or SN_GOERLI or SN_MAIN
```

`Provider.chainId()` has been removed. You have to use `Provider.getChainId()`

```typescript
// v4
const chainId = myProvider.chainId();
// v5
const chainId = myProvider.getChainId();
```

## uint256

The command to create an uint256 variable has changed :

```typescript
// v4
const amountIn = uint256.bnToUint256(amountToSwap);

// v5
const amountIn: uint256.Uint256 = cairo.uint256(50000n);
```

## get-Starknet

In your DAPP React code, you can connect to ArgentX or Braavos wallets, using get-starknet library. The current v2.1.0 version isn't compatible with starknet.js v5.  
An update is expected.

```typescript
// v4

// v5
```
