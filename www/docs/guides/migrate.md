---
sidebar_position: 18
---

# Migrate from v4 to v5

This document only covers the features present in v4 which have changed in some significant way in v5.

If you encounter any missing changes, please let us know and we will update this guide.

## _number_ utility replaced by _num_

To avoid confusion with the native `number` type, the `number` namespace has been renamed to `num`.

```typescript
// v4
const res = number.isHex(d1);

// v5
const res = num.isHex(d1);
```

`number.toFelt()` has been removed, if manual handling is necessary `cairo.felt()` can be used.

## _bn.js_ no longer supported

The `bn.js` library has been removed in favor of using the native JavaScript `BigInt` data type.

```typescript
// v4
const qty = new BN("0x4a8bc");

// v5
const qty1 = BigInt("0x4a8bc");
const qty2 = 32786324915918425n;
```

The `BigNumberish` type is now defined as:

- String representing a number: "123", "0xabc2"
- Number (max 53 bits): 123
- BigInt (max 255 bits): 12345612345n

Some commonly used `BN` utility methods are of course no longer present, however, they have simple equivalents:

- `.mul()` and `.div()`: common operators can be used with bigints: `+` `-` `*` `/`
- `.umod()` can be easily replaced with:

```typescript
// v4
const c = a.umod(b);

// v5
const tmp = a % b; // a and b are bigint
const c = tmp >= 0n ? tmp : tmp + b;
```

- `.toarray()` can be replaced with `num.hexToBytes(a)`

## ec (elliptic curve)

With the `bn.js` removal the accompanying elliptic curve libraries have also been replaced,
consequently many functions have been relocated or modified.

The concept of a key pair, where the private and public key are used as a single entity, has been removed.
`ec.getKeyPair()`, `ec.getKeyPairFromPublicKey()` and `ec.genKeyPair()` do not exist anymore, corresponding
methods use the private key directly. Check the following examples:

`Account` creation:

```typescript
// v4
const privateKey0 = accountTestnet4PrivateKey;
const account0Address: string = accountTestnet4Address;
const starkKeyPair0 = ec.getKeyPair(privateKey0);
const account0 = new Account(provider, account0Address, starkKeyPair0);

// v5
const privateKey0 = accountTestnet4PrivateKey;
const account0Address: string = accountTestnet4Address;
const account0 = new Account(provider, account0Address, privateKey0);
```

Derive partial public key (`starknetPubKey`):

```typescript
// v4
const starknetPubKey = ec.getStarkKey(keyPair);

// v5
const starknetPubKey = ec.starkCurve.getStarkKey(privateKey); // only X part of full pubKey
```

Derive full public key (`fullPubKey`):

```typescript
// v4
const fullPubKey = encode.addHexPrefix(keyPair.getPublic("hex"));

// v5
const fullPubKey = encode.addHexPrefix(encode.buf2hex(ec.starkCurve.getPublicKey(privateKey, false))); // full key
```

`ec.sign` and `ec.verify`:

```typescript
// v4
const signature = ec.sign(keyPair, msgHash);
const isVerified = ec.verify(inferredKeyPair, msgHash, signature);

// v5
const signature = ec.starkCurve.sign(msgHash, privateKey);
const verifStarknet = ec.starkCurve.verify(signature, msgHash, fullPubKeySource);
```

`pedersen` hash calculation:

```typescript
// v4
const hashMsg = hash.pedersen([account, price]);

// v5
const hashMsg = ec.starkCurve.pedersen(account, price);
```

## 'declare**And**Deploy' renaming

The `account.declareDeploy()` method has been renamed to `declareAndDeploy()`:

```typescript
// v4
const response = await account0.declareDeploy({ contract: compiledTest, classHash: testClassHash });

// v5
const response = await account0.declareAndDeploy({ contract: compiledHelloSierra, casm: compiledHelloCasm });
```

> Note: `declare` and `declareAndDeploy` no longer require `classHash`! The new ec library is now able to calculate it quickly
> and does so automatically when it is not provided. If a contract has been written in Cairo 1 the `casm` property is needed.

## Calldata and returned values

Deep modifications and improvements have been performed concerning exchange of data with the Cairo contract functions.
The complete new rules are listed in this **[guide](define_call_message.md)**.  
In short, it is easier to construct a list of parameters while relying on the built-in verification of the conformity to the abi.  
Returned values from a Cairo 0 contract are identical, but returned values from a Cairo 1 contract are easier to recover.

`stark.compileCalldata()` has been replaced by `CallData.compile()`. Regardless, the new `Contract.populate()` and `myCallData.compile()` methods are the recommended way to create calldata.

## Provider

Constants for `Provider` initialization have been updated:

```typescript
// v4
const providerTestnet = new Provider({ sequencer: { network: "goerli-alpha" } });

// v5
 const providerTestnet = new Provider({ sequencer: { network: constants.NetworkName.SN_GOERLI } }); // or SN_MAIN
```

`Provider.chainId()` has been removed, `Provider.getChainId()` should be used.

```typescript
// v4
const chainId = myProvider.chainId();

// v5
const chainId = await myProvider.getChainId();
```

## Uint256

The approach to create a `uint256` variable has changed:

```typescript
// v4
const amountIn = uint256.bnToUint256(amountToSwap);

// v5
const amountIn: Uint256 = cairo.uint256(50000n);
```

## get-starknet

In your DAPP React code you can connect to ArgentX or Braavos wallets using the `get-starknet` library.

The current v2.1.0 version is not yet compatible with starknet.js v5.  
An update is expected.
