---
sidebar_position: 12
---

# Migrate from v10 to v11

This guide covers every breaking change between v10 (10.7.0) and v11, and how to resolve it. Two
shorter parts follow: the deprecations, which break nothing today, and what v11 adds.

If you hit a change that is not described here, please tell us and we will complete this guide.

## Quick summary

v11 carries three independent workstreams. The cryptographic dependencies move to their v2,
ESM-only generation (`@noble/curves` 1.7 → 2.3, `@noble/hashes` 1.6 → 2.3, `@scure/base` 1.2 → 2.3,
`@scure/starknet` 1.1 → 2.3), RPC requests now travel through a pluggable transport, which lets a
single WebSocket serve both requests and subscriptions, and the string helpers deprecated back in
v8.2.0 are finally removed. Three much smaller passes follow: one clears out what remained of the
V0–V2 transaction API, another puts the type an abi declares back in charge of the values that
cross it — the calldata codec is rebuilt on the Cairo type classes, and every value is now read and
written by the class its type names — and the last makes Starknet ID refuse a name it cannot encode
instead of quietly encoding a different one.

**The transport layer breaks nothing** — it is added underneath the existing API. The other two do.

| Change                                            | Severity   | What you have to do                                     |
| ------------------------------------------------- | ---------- | ------------------------------------------------------- |
| Node.js >= 22.12 is now required                  | **High**   | Upgrade Node, or use the ESM build                      |
| `encodeShortString` / `decodeShortString` removed | **High**   | Switch to `CairoBytes31`                                |
| Jest: the crypto dependencies are ESM-only        | **High**   | Add one line to your `transformIgnorePatterns`          |
| `cairo.felt()` only accepts a number              | **Medium** | Encode text yourself before passing it                  |
| Signature objects lost their v1 encoding methods  | **Medium** | Rename `toDERHex()` and its three siblings              |
| Signed integers decode as signed                  | **Medium** | Drop your own field-element conversion                  |
| An out-of-range argument is refused               | **Medium** | Fix the value, or opt into `fastCairoTypeStrategy`      |
| An out-of-range response is refused               | **Medium** | Fix the value, or opt into `fastCairoTypeStrategy`      |
| A custom parsing strategy changed shape           | **Medium** | Only if you passed one to `CallData` or `Contract`      |
| `CairoFixedArray` takes a parsing strategy        | **Medium** | Only if you built one by hand                           |
| `CairoFelt()` and `encode.utf8ToArray()` removed  | **Low**    | Rename to `CairoFelt252` / `utf8ToUint8Array`           |
| `@noble` / `@scure` import paths changed          | **Low**    | Only if you import these packages directly              |
| The `ReceiptTx` class removed                     | **Low**    | Only if you used `instanceof ReceiptTx`                 |
| The leftover v1 transaction API removed           | **Low**    | Only if you imported `v2hash` or `ETransactionVersion2` |
| Starknet ID names are validated, not truncated    | **Low**    | Only if you resolve or encode `.stark` names            |
| The feeder gateway `BaseUrl` constant removed     | **Low**    | Only if you imported `constants.BaseUrl`                |

Two deprecations ship with the release — `stark.randomAddress()` and `Provider` — but neither of
them breaks existing code. They are covered in [Part 2](#part-2--deprecations).

### What did not change

Worth stating, because the release is a major: `Account`, `Contract`, `CallData` and the `Signer`
interface are untouched. `WebSocketChannel` keeps exactly the API it had in v10 — same constructor
options, same `subscribe*` methods, same events. No RPC spec version is added or dropped: 0.9 and
0.10.x remain supported, with 0.10.3 as the default. What left the package exports is listed above.
Most of it had been marked `@deprecated` for at least three major versions; the rest is the v1
transaction API, which no live network has accepted for a long time.

### Migration in three minutes

```bash
# while v11 is in beta
npm install starknet@beta

# once v11 is released
npm install starknet@^11.0.0
```

```typescript
// Text to a felt, and back
const felt = CairoBytes31.fromText('Stark').toHexString(); // ✅ was shortString.encodeShortString()
const text = new CairoBytes31(felt).decodeUtf8(); //          ✅ was shortString.decodeShortString()

// Verifying a signature: the encoding step is gone
const isValid = ec.starkCurve.verify(signature, msgHash, pubKey); // ✅ was signature.toDERHex()

// Recommended, not required — both of these still work as before
const privateKey = stark.randomStarkPrivateKey(); // was stark.randomAddress()
```

And, if your project is tested with Jest, in `jest.config.js`:

```javascript
transformIgnorePatterns: ['node_modules/(?!(@noble|@scure)/)'],
```

## Part 1 — Breaking changes

Ordered by how likely you are to hit them.

### 1. Node.js >= 22.12 is now required

The `engines` field moves from `>=22` to `>=22.12`.

The crypto dependencies are ESM-only in their v2 generation, and the CJS build of starknet.js
`require()`s them. Node only supports requiring an ESM module from 22.12 onwards. On Node 22.0 to
22.11, `require('starknet')` therefore fails:

```
Error [ERR_REQUIRE_ESM]: require() of ES Module …
```

**Resolution:** upgrade to Node 22.12 or later — the maintained 22.x line is well past it, so
`nvm install 22` is enough.

ESM consumers (`import` / `"type": "module"`) and the browser IIFE build are **not** affected, and
work on any Node 22.

### 2. The deprecated string helpers are removed

`shortString.encodeShortString()` and `shortString.decodeShortString()` were marked `@deprecated` in
v8.2.0 (August 2025) and survived v8, v9 and v10 untouched. They are now gone, along with
`CairoFelt()` and `encode.utf8ToArray()`.

| v10                                   | v11                                              |
| ------------------------------------- | ------------------------------------------------ |
| `shortString.encodeShortString(text)` | `CairoBytes31.fromText(text).toHexString()`      |
| `shortString.decodeShortString(felt)` | `new CairoBytes31(num.toHex(felt)).decodeUtf8()` |
| `CairoFelt(value)`                    | `new CairoFelt252(value).toBigInt().toString()`  |
| `encode.utf8ToArray(text)`            | `encode.utf8ToUint8Array(text)`                  |

The rest of the `shortString` namespace — `isASCII`, `isShortString`, `isText`, `splitLongString`,
`isDecimalString`, `isShortText`, `isLongText` — is untouched.

**Use `fromText()`, not the constructor.** This is the one detail to get right. The `CairoBytes31`
constructor reads a string the way calldata does: `'0x1a'` as a hexadecimal number, `'12345'` as a
decimal one. A string that spells a number would therefore become that number instead of its text,
without any error. `fromText()` has no such ambiguity — whatever it is given is text.

```typescript
CairoBytes31.fromText('12345').toHexString(); // 0x3132333435 — the text
new CairoBytes31('12345').toHexString(); //     0x3039       — the number 12345
```

**Passing the result to a contract.** For a `bytes31` parameter, hand over the object itself: v11
accepts it. For a `felt252` parameter, convert it first, because a felt252 reads a number.

```typescript
await contract.set_word(CairoBytes31.fromText('12345')); //             a bytes31 parameter
await contract.set_id(CairoBytes31.fromText('12345').toHexString()); // a felt252 parameter
```

**What you gain.** The removed encoder was ASCII-only, and for any byte below `0x10` it emitted a
single hex digit instead of two, which misaligned every following byte:

```
shortString.encodeShortString('a\tb')        ->  0x61962    (wrong)
CairoBytes31.fromText('a\tb').toHexString()  ->  0x610962   (right)
```

The decoder had the symmetric defect on an odd-length hex string — which is exactly the form a node
returns for such a felt, since `NUM_AS_HEX` carries no leading zero. Both are fixed, and text is now
UTF-8 instead of ASCII-only.

The same correction reaches two places that decoded through the old helper:
`byteArray.stringFromByteArray()` and the `formatResponse` option of `Contract`. For
`stringFromByteArray`, a multi-byte character split across two 31-byte words now survives the round
trip as well.

One edge case changes with them: an empty string passed where a `u8`, `u16`, `u64`, `u96` or `u128`
is expected used to raise `Cannot convert 0x to a BigInt`, and is now read as `0` — which is what
`felt252`, `u32` and the ABI-less `CallData.compile()` have always done with it.

### 3. Jest: the crypto dependencies must be transformed

Jest ignores `node_modules` when transforming, so the ESM-only `@noble/*` and `@scure/*` packages
reach the runtime untranspiled. Importing starknet.js from a test then fails with:

```
SyntaxError: Unexpected token 'export'
```

**Resolution:** allow these two scopes through, in your own Jest configuration:

```javascript
// jest.config.js
module.exports = {
  // …
  transformIgnorePatterns: ['node_modules/(?!(@noble|@scure)/)'],
};
```

**Vitest needs no change** — it transforms ESM dependencies by default.

One consequence, if you spy on the crypto packages: their exports are now non-configurable ESM
getters, which `jest.spyOn()` cannot redefine. Replace the module with a writable copy of itself
first, keeping the real implementations:

```typescript
jest.mock('@scure/starknet', () => ({
  __esModule: true,
  ...jest.requireActual('@scure/starknet'),
}));
```

### 4. `cairo.felt()` only accepts a number

Its signature has always been `felt(it: BigNumberish)`, and `BigNumberish` is
`string | number | bigint`, where a string means a number written in hexadecimal or in decimal.
Passing text was therefore a use the signature never announced — it happened to work, by stretching
the type past what it declares. v11 aligns the implementation with the type it has always claimed.

```typescript
cairo.felt('0x101'); // ✅ 257
cairo.felt('257'); //   ✅ 257
cairo.felt(257n); //    ✅ 257
cairo.felt('hello'); // ❌ throws, and the message names the replacement
```

Booleans and non-integer numbers are refused for the same reason: neither is a `BigNumberish`. To
carry text in a `felt252`, encode it first with `CairoBytes31.fromText(text).toHexString()`.

Honouring the type also removes an ambiguity: `cairo.felt('-123')` used to return `758198835`,
which is the text `-123` encoded as a felt, rather than failing on a value it cannot represent.

`CallData.compile()` is **not** affected. Without an ABI it still accepts text for a felt252
argument, and with an ABI a `core::felt252` parameter goes through `CairoFelt252`, which accepts
text exactly as it did in v10.

### 5. Signature objects are plain `ECDSASignature` values

`WeierstrassSignatureType` was an alias of `weierstrass.SignatureType`, the `@noble/curves` v1
signature **class**. It is now an alias of `weierstrass.ECDSASignature`, which carries `r`, `s` and
an optional `recovery`, plus a smaller set of methods.

Reading `signature.r` and `signature.s` is unchanged, and so is everything starknet.js does with a
signature on your behalf — `account.execute()`, `signer.signMessage()`, `stark.formatSignature()`.
Only code calling methods **on the returned object** has to be adapted:

| v10                   | v11                  |
| --------------------- | -------------------- |
| `toDERHex()`          | `toHex('der')`       |
| `toDERRawBytes()`     | `toBytes('der')`     |
| `toCompactHex()`      | `toHex('compact')`   |
| `toCompactRawBytes()` | `toBytes('compact')` |
| `normalizeS()`        | removed              |
| `assertValidity()`    | removed              |

The most common occurrence is a signature verification, where the encoding step is simply no longer
needed — `verify()` accepts the signature object itself:

**❌ v10:**

```typescript
const signature = ec.starkCurve.sign(msgHash, privateKey);
const isValid = ec.starkCurve.verify(signature.toDERHex(), msgHash, publicKey);
```

**✅ v11:**

```typescript
const signature = ec.starkCurve.sign(msgHash, privateKey);
const isValid = ec.starkCurve.verify(signature, msgHash, publicKey);
```

`recoverPublicKey()`, `hasHighS()` and `addRecoveryBit()` are still there, unchanged. And
`ec.starkCurve.sign()` still returns an instance of `ec.starkCurve.Signature`, so an `instanceof`
test against it keeps working.

### 6. `@noble` / `@scure` import paths changed

This one only concerns you if you import these packages **directly**, alongside starknet.js. Their
v2 generation requires explicit `.js` suffixes, and moved some entry points:

| v10                                  | v11                                     |
| ------------------------------------ | --------------------------------------- |
| `@noble/curves/abstract/utils`       | `@noble/curves/utils.js`                |
| `@noble/curves/secp256k1`            | `@noble/curves/secp256k1.js`            |
| `@noble/curves/abstract/weierstrass` | `@noble/curves/abstract/weierstrass.js` |
| `@noble/hashes/sha256`               | `@noble/hashes/sha2.js`                 |
| `@noble/hashes/sha3`                 | `@noble/hashes/sha3.js`                 |
| `@noble/hashes/blake2s`              | `@noble/hashes/blake2.js`               |

Two API changes come with them:

**Hash functions no longer accept a string.** Encode it first:

```typescript
import { sha256 } from '@noble/hashes/sha2.js';
import { utf8ToBytes } from '@noble/hashes/utils.js';

const digest = sha256(utf8ToBytes('hello')); // ✅ was sha256('hello')
```

**`randomPrivateKey()` is renamed on the noble curves.** On secp256k1:

```typescript
import { secp256k1 } from '@noble/curves/secp256k1.js';

const key = secp256k1.utils.randomSecretKey(); // ✅ was randomPrivateKey()
```

Note that `ec.starkCurve.utils.randomPrivateKey()` keeps its name — but prefer
`stark.randomStarkPrivateKey()`, which returns a `0x`-prefixed hex string instead of bytes.

### 7. The `ReceiptTx` class is removed

`ReceiptTx` was marked `@deprecated` in v6.24.0 (February 2025) in favour of the
`createTransactionReceipt()` factory, and survived v7, v8, v9 and v10. It is now gone.

Receipts themselves do not change: `getTransactionReceipt()` and `waitForTransaction()` already
returned the factory's object, with the same properties and the same helpers. Only code naming the
class breaks — `new ReceiptTx()`, which the library never used internally, and `instanceof`:

```typescript
const receipt = await provider.waitForTransaction(transaction_hash);

receipt.isSuccess(); // the helpers are unchanged
receipt.statusReceipt; // ✅ 'SUCCEEDED' | 'REVERTED' | 'ERROR', replaces `instanceof ReceiptTx`
```

The `TransactionReceiptStatus` and `TransactionReceiptValue` types are unaffected.

### 8. The leftover v1 transaction API is removed

Starknet stopped accepting V0, V1 and V2 transactions, and RPC 0.9+ does not define them for
broadcasting. This release removes the symbols that only existed to build or describe them:

- **`v2hash`** — its `calculate*TransactionHash` helpers computed V0–V2 hashes from a `maxFee`.
  `v3hash` is untouched. The one function of that module that was never version-specific,
  `hash.calculateL2MessageTxHash()`, keeps its name, its signature and its result: an `L1_HANDLER`
  transaction is current Starknet, not an old transaction version.
- **`ETransactionVersion2`** — the `{ V0, V1, V2, F0, F1, F2 }` enum. `ETransactionVersion` and
  `ETransactionVersion3` are untouched.
- **`Details`** — the `{ nonce, maxFee, version, chainId }` type, which the library never used.
- **`InvocationsDetails.maxFee`** — the field was already ignored at runtime, since `Account`
  reads a `UniversalDetails`, which has no `maxFee`. Pass `resourceBounds` instead.
- **`TransactionHashPrefix.DEPLOY`** — the prefix of the V0 `deploy` transaction. The four other
  prefixes are unchanged.
- **`SYSTEM_MESSAGES`** — `legacyTxWarningMessage` and `maxFeeInV3` are removed, neither having
  ever been emitted, and `legacyTxRPC08Message` is renamed `nonV3Tx`.

Sending a transaction is unaffected: `Account` has been building V3 transactions only since v8.

### 9. The type the abi declares is the one that reads your value

Both abi parsers defaulted to `fastParsingStrategy`, which reaches `CairoFelt252` instead of the
class the abi declares. Two consequences follow, and both change in v11.

**A negative `i8`…`i128` came back from a call as its field element.** It now comes back as the
negative number it is. If you were converting it yourself, drop that conversion.

```typescript
const delta = await myContract.get_delta(); // an i128 holding -5
// v10: 3618502788666131213697322783095070105623107215331596699973092056135872020476n
// v11: -5n
```

**An argument that does not fit its declared type is refused rather than serialized.** This covers
`u8`, `u16`, `u32`, `u64`, `u96`, `u128` and `EthAddress`, which reached the calldata unchecked
when the arguments were passed as an array.

```typescript
myCallData.compile('set_age', [256]); // a u8 parameter
// v10: ["256"], sent as it is
// v11: throws — Value is out of u8 range [0, 255]
```

Three of those were bounded nowhere before: `u32` and `EthAddress` had no branch of their own, and
`u96` had one only for the argument-array form. `CairoUint32.abiSelector` is corrected with them,
from `core::u32::u32` — which no abi ever spells — to `core::integer::u32`.

**A response is refused the same way.** Reading one builds the declared type from the felts, and
building it is what checks the range — one and the same pass, so a node answering outside the
bounds of the type you named raises where v10 handed the value back. This applies at any depth: an
item of an array, a member of a struct.

```typescript
myCallData.decodeParameters('core::integer::u8', ['0x123456']);
// v10: 1193046n
// v11: throws — Value is out of u8 range [0, 255]
```

The former behaviour is still available, per `CallData`, under a new name — see
[the strategy shapes](#12-the-calldata-codec-runs-on-the-cairo-type-classes) below:

```typescript
const myCallData = new CallData(abi, fastCairoTypeStrategy);
```

That strategy gives up the range checks, in both directions. It does **not** give up reading a
signed integer back as a negative number, which `fastParsingStrategy` did in v10: turning a field
element back into a negative is a conversion, not a check, and there is nothing left to trade away.

### 10. A Starknet ID name that cannot be encoded is refused

`useEncoded()` used to skip any character outside the two Starknet ID alphabets (`a-z`, `0-9`, `-`
and `这来`) instead of refusing it. A skipped character did not yield an invalid felt: it yielded the
felt of a **different, existing name**, which the naming contract resolved to somebody else's
address.

```typescript
starknetId.useEncoded('Grug');
// v10: 9441n — the encoding of 'rug', which resolves to a real mainnet account
// v11: throws — Invalid character "G" in a Starknet.id name
```

`encodeBrotherDomain()` calls the encoder with no guard of its own, so `.brother` names gain the
same protection.

`isStarkDomain()` now derives validity from the encoder instead of restating the alphabets — that
duplication is what let the guard and the encoding disagree. It also compares the encoded value to
the field prime, so the set of names it accepts moves in both directions: `这来` names are accepted
and resolve, where they were wrongly refused since v6.21.2, while **no 48-character label fits in a
felt** and every one of them is now refused. The real ceiling is 47 ASCII characters, 40 for `这`
and 20 for `来`.

`getAddressFromStarkName()` already threw on a name its guard turned down, so nothing changes in
its shape — only in which names it turns down. If you hand it user input, keep it wrapped: an
unencodable name is an exception, never a silent resolution to the wrong account.

### 11. The feeder gateway `BaseUrl` constant is removed

`constants.BaseUrl` held the two roots of the feeder gateway, `https://alpha-mainnet.starknet.io`
and `https://alpha-sepolia.starknet.io`. Starknet v0.14.4 removes six of that gateway's endpoints —
`call`, `get_storage_at`, `get_nonce`, `get_class_hash_at`, `get_code` and `get_full_contract`. The
library has spoken JSON-RPC only since v7 and no longer read this constant anywhere, so all it
exported was a pair of urls about to stop answering.

The replacement depends on what you took from it. To name a network and let the library pick a
public RPC node for it, use `constants.NetworkName`:

```typescript
// v10
const nodeUrl = constants.BaseUrl.SN_MAIN;
// v11
const nodeUrl = provider.getDefaultNodeUrl(constants.NetworkName.SN_MAIN);
```

`RpcProvider` accepts that network name directly, and resolves it the same way:

```typescript
const myProvider = new RpcProvider({ nodeUrl: constants.NetworkName.SN_MAIN });
```

To reach a node you chose yourself — the better approach, as the public ones are shared and
throttled — pass its RPC url:

```typescript
const myProvider = new RpcProvider({
  nodeUrl: 'https://api.zan.top/public/starknet-mainnet/rpc/v0_10',
});
```

### 12. The calldata codec runs on the Cairo type classes

Serializing an argument and reading a response used to be two long switch statements walking the
abi. Both now build a Cairo type — `CairoArray`, `CairoTuple`, `CairoStruct`, `CairoTypeOption`… —
and ask it for its felts. Nothing changes in the calldata a contract receives, nor in the values a
call returns. Four things change around it.

**The strategy you may pass to `CallData` or `Contract` has a new shape, and a new name.** The
second argument was `hdParsingStrategy` or `fastParsingStrategy`; those two now serve a Cairo 0 abi
alone. For anything Cairo 1 or Cairo 2 — every contract compiled since 2023 — use
`cairoTypeStrategy` or `fastCairoTypeStrategy`. Handing over the wrong shape raises and names the
one to use, rather than being quietly ignored.

```typescript
// v10
const myCallData = new CallData(abi, hdParsingStrategy);
// v11
const myCallData = new CallData(abi, cairoTypeStrategy);
```

A **custom** strategy changes with it. Its `response` entries are handed the value already built,
where they used to be handed the felts to read:

```typescript
// v10
const custom: ParsingStrategy = {
  request: hdParsingStrategy.request,
  response: {
    ...hdParsingStrategy.response,
    [CairoByteArray.abiSelector]: (it) => CairoByteArray.factoryFromApiResponse(it).toBuffer(),
  },
};
// v11
const custom: CairoTypeStrategy = {
  ...cairoTypeStrategy,
  response: {
    ...cairoTypeStrategy.response,
    [CairoByteArray.abiSelector]: (instance) => (instance as CairoByteArray).toBuffer(),
  },
};
```

**An abi type nothing recognizes raises.** It used to fall through to `core::felt252`, so a typo in
a hand-written abi produced a plausible number instead of an error.

**`CairoFixedArray` takes the strategy that builds its items**, and holds them built. The class was
the odd one out — every other composite already worked this way — and it now serializes itself
instead of only preparing an object for `CallData.compile()`. Its static `compile()`,
`isTypeFixedArray()` and the two type readers are unchanged, so an existing call through
`CallData.compile()` still reads the same.

```typescript
// v10
const myArray = new CairoFixedArray([10, 20, 30], '[core::integer::u32; 3]');
myArray.content; // [10, 20, 30]
// v11
const myArray = new CairoFixedArray([10, 20, 30], '[core::integer::u32; 3]', cairoTypeStrategy);
myArray.content; // three CairoUint32 — `decompose(cairoTypeStrategy)` gives [10n, 20n, 30n] back
myArray.toApiRequest(); // ["10", "20", "30"] — it serializes itself now
```

**`myCallData.validate()` speaks with the classes' voice**, since building a value is what checks
it. The messages change, and one asymmetry disappears: the named and positional call forms used to
disagree — `compile('fn', { v: 1 })` was refused for a `core::bool` parameter where
`compile('fn', [1])` was accepted. Both now accept it, and both refuse `2`.

## Part 2 — Deprecations

Neither of these breaks anything today. Existing code keeps working; migrate at your own pace.

### `stark.randomAddress()`

The name was misleading from the start: the function never returned an address. In v10 it derived a
Stark **public key** from a random private key, and the guides then used that value as a private
key. v11 replaces it with two functions that each say what they produce:

- **`stark.randomStarkPrivateKey()`** — a private key of the Stark curve, always 32 bytes, always
  inside the valid key range.
- **`stark.randomFelt()`** — a uniformly random felt, for a deployment salt, a SNIP-9 nonce or a
  test value.

`randomAddress()` is kept as a deprecated alias of `randomFelt()`. Its implementation therefore
changed — from a curve point's x-coordinate to a uniform draw — but the two remain interchangeable
in practice, including as a private key: the felt range and the private-key range differ by a
relative 2.7 × 10⁻³⁸, so a draw falling outside the key range will not happen. Code calling
`randomAddress()` keeps working exactly as before.

```typescript
const privateKey = stark.randomStarkPrivateKey(); // ✅ was stark.randomAddress()
const publicKey = ec.starkCurve.getStarkKey(privateKey);

const salt = stark.randomFelt(); // ✅ was stark.randomAddress()
```

See [Create an account](./account/create_account.md), which uses the new form throughout.

### `Provider`

`Provider` is an alias of `RpcProvider`, kept for backward compatibility. It is now marked
`@deprecated` and will be removed in a future major version. They are the same class, so the
migration is a rename with no behavior change.

```typescript
import { RpcProvider } from 'starknet'; // ✅ was Provider

const myProvider = new RpcProvider({ nodeUrl: myNodeUrl });
```

## Part 3 — What is new in v11

Nothing here requires any change on your side. Each item links to the guide that covers it in full.

### A provider whose requests and subscriptions share one socket

`RpcProvider` over HTTP remains the default. `WebSocketProvider` is the opt-in variant that keeps
one connection open and uses it for both:

```typescript
import { WebSocketProvider } from 'starknet';

const myProvider = new WebSocketProvider({ nodeUrl: 'wss://your-starknet-node/rpc/v0_10' });

const blockNumber = await myProvider.getBlockNumber(); // the usual provider surface
const sub = await myProvider.subscriptions.subscribeNewHeads(); // plus the subscriptions

myProvider.dispose(); // it holds an open connection: release it
```

It **is** an `RpcProvider`, so `Account` and `Contract` accept it without knowing the difference.
See [Requests and subscriptions over WebSocket](./provider_instance.md#requests-and-subscriptions-over-websocket),
and [Choosing HTTP or WebSocket](./provider_instance.md#choosing-http-or-websocket) to decide which
one your application needs.

### A pluggable transport layer

The object that carries JSON-RPC envelopes to the node is now a separate value implementing
`RpcTransport`, with three implementations shipped: `HttpTransport`, `WsTransport` and
`ReconnectingWsTransport`. Any provider or channel accepts a `transport` in place of a `nodeUrl`.

The practical consequence is that one socket can be built once and lent to everything talking to the
same node — the form to use in React, where the socket lives at module scope and components own only
their subscriptions:

```typescript
import { ReconnectingWsTransport, WebSocketProvider } from 'starknet';

const transport = new ReconnectingWsTransport({ nodeUrl: 'wss://your-starknet-node/rpc/v0_10' });
const myProvider = new WebSocketProvider({ transport });
```

A transport passed in is borrowed, not owned. See [Sharing one socket](./websocket_channel.md#sharing-one-socket).

### Two named random generators

`stark.randomFelt()` for a salt or a nonce, `stark.randomStarkPrivateKey()` for a key — see
[`stark.randomAddress()`](#starkrandomaddress) in Part 2.

### Subscriptions that fit a component lifecycle

`Subscription` gains what a React effect needs: `onClose()` to be told when a stream ends on its own
— including a stream the node refused to restore after a reconnection — and `off()` to detach a
handler without tearing the subscription down. Re-attaching the same handler with `on()` is now a
no-op instead of an error, so StrictMode's double invocation no longer fails a correct component.

See [When a subscription closes](./websocket_channel.md#when-a-subscription-closes) and
[In a React app](./websocket_channel.md#in-a-react-app).

### Subscription channels exposed per spec version

`src/channel/` is reorganized into per-version directories, and the `RPC09`, `RPC0102` and `RPC0103`
namespaces now export a `SubscriptionChannel` alongside their `RpcChannel`. Pairing the two of the
same version is what makes a version mismatch between requests and subscriptions impossible.

### Text for a `ByteArray` parameter

A `ByteArray` is a sequence of bytes, so its constructor reads a string the way calldata does:
`'12345'` is the number 12345, `'0x4142'` is the two bytes `0x41 0x42`, which spell `AB`. A text
that spells a number had no way through. `CairoByteArray.fromText()` is that way, and mirrors
`CairoBytes31.fromText()`.

```typescript
CairoByteArray.fromText('12345').toHexString(); // 0x3132333435 — the text
new CairoByteArray('12345').toHexString(); //     0x3039       — the number 12345
```

Hand the result to the contract as it is — v11 accepts an already built `CairoByteArray`, and also
the object returned by `byteArray.byteArrayFromString()`, which a contract call used to refuse.

```typescript
await contract.set_label(CairoByteArray.fromText('12345'));
```

### A Cairo type as an argument, with or without an abi

What holds for `CairoByteArray` now holds for every Cairo type class: an instance can be passed
wherever its own type is declared, at any depth, and `CallData.compile()` serializes one through
that class instead of walking its fields.

```typescript
await myContract.set_amount(new CairoUint64(44)); //          a u64 parameter
CallData.compile({ label: CairoByteArray.fromText('hi') }); // and with no abi at all
```

Without an abi this used to produce silently wrong calldata — a `CairoByteArray` came out with its
pending word spelled one felt per byte, a `CairoBytes31` as its 31-byte buffer. It now produces the
felts the abi path produces.

An instance fills the slot of its own type only: a `CairoUint128` handed to a `u64` parameter is
refused, whatever number it holds.

### The composite Cairo types, and the strategy that builds them

`CairoArray`, `CairoTuple`, `CairoStruct`, `CairoTypeOption`, `CairoTypeResult`,
`CairoTypeCustomEnum` and `CairoNonZero` join the leaf classes on the public surface. Each takes a
value, the abi type it stands for, and the strategy that builds what it holds — `cairoTypeStrategy`
carries the language's own types.

A type **your contract** declares — a struct, a custom enum — is keyed by the name it was given, so
building one over it takes the strategy the abi parser assembled. That is what
`parser.parsingStrategies` is, and a `Contract` exposes its `callData` to reach it:

```typescript
const strategies = myContract.callData.parser.parsingStrategies;
const points = new CairoArray(list, 'core::array::Array::<my_contract::Point>', strategies);

points.toApiRequest(); //           the felts, ready for a call
points.decompose(strategies); //    and back to plain values
```

`structStrategy()` and `enumStrategy()` build such a strategy from abi declarations directly, when
you have no parser at hand.

## Need Help?

Ask your questions on the
[Starknet.js Discord channel](https://discord.com/channels/793094838509764618/1270119831559078061),
in the [Starknet Discord](https://discord.com/invite/starknet-community).
