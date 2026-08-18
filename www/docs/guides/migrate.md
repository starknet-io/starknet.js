---
sidebar_position: 12
---

# Migrate from v10 to v11

This guide covers every breaking change between v10 (10.7.0) and v11, and how to resolve it. Two
shorter parts follow: the deprecations, which break nothing today, and what v11 adds.

If you hit a change that is not described here, please tell us and we will complete this guide.

## Quick summary

v11 carries two independent workstreams. The cryptographic dependencies move to their v2, ESM-only
generation (`@noble/curves` 1.7 → 2.3, `@noble/hashes` 1.6 → 2.3, `@scure/base` 1.2 → 2.3,
`@scure/starknet` 1.1 → 2.3), and RPC requests now travel through a pluggable transport, which lets
a single WebSocket serve both requests and subscriptions.

**Only the first one breaks anything.** The transport layer is added underneath the existing API,
which is why the list below is short.

| Change                                           | Severity   | What you have to do                            |
| ------------------------------------------------ | ---------- | ---------------------------------------------- |
| Node.js >= 22.12 is now required                 | **High**   | Upgrade Node, or use the ESM build             |
| Jest: the crypto dependencies are ESM-only       | **High**   | Add one line to your `transformIgnorePatterns` |
| Signature objects lost their v1 encoding methods | **Medium** | Rename `toDERHex()` and its three siblings     |
| `@noble` / `@scure` import paths changed         | **Low**    | Only if you import these packages directly     |

Two deprecations ship with the release — `stark.randomAddress()` and `Provider` — but neither of
them breaks existing code. They are covered in [Part 2](#part-2--deprecations).

### What did not change

Worth stating, because the release is a major: `Account`, `Contract`, `CallData`, the Cairo type
helpers and the `Signer` interface are untouched. `WebSocketChannel` keeps exactly the API it had in
v10 — same constructor options, same `subscribe*` methods, same events. No RPC spec version is added
or dropped: 0.9 and 0.10.x remain supported, with 0.10.3 as the default. And nothing was removed
from the package exports.

### Migration in three minutes

```bash
# while v11 is in beta
npm install starknet@beta

# once v11 is released
npm install starknet@^11.0.0
```

```typescript
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

### 2. Jest: the crypto dependencies must be transformed

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

### 3. Signature objects are plain `ECDSASignature` values

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

### 4. `@noble` / `@scure` import paths changed

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

## Need Help?

Ask your questions on the
[Starknet.js Discord channel](https://discord.com/channels/793094838509764618/1270119831559078061),
in the [Starknet Discord](https://discord.com/invite/starknet-community).
