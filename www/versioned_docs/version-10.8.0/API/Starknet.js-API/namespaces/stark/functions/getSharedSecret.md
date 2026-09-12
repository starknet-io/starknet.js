# Function: getSharedSecret()

> **getSharedSecret**(`privateKey`, `fullPublicKey`): `string`

Defined in: [src/utils/stark/index.ts:234](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/stark/index.ts#L234)

Calculate the shared secret using ECDH key agreement protocol with a given private key and a full public key.

## Parameters

### privateKey

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)

a Starknet 252 bits private key.

### fullPublicKey

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)

a 520 bit number, representing the full public key related to `privateKey`, which can be obtained by `getFullPublicKey` function. This number needs to start with '0x04' to indicate that it's a full public key, and the remaining 128 bytes represent the x and y coordinates of the public key point on the elliptic curve (64 bytes for x and 64 bytes for y).

## Returns

`string`

an hex string of a 256 bit number, representing the shared secret calculated by ECDH key agreement protocol using `privateKey` and `fullPublicKey`.

## Example

```typescript
const myPrivateKey = '0x67d0bd238e266b6defbb1ad4de4cf1dde2dc55b3518596e0bae29e439165596';
const bobFullPublicKey =
  '0x0402d6b3ff569186d67a2ff0b8548328798d3500c16191f6c021f929134d48a15405f9fc5a11467b96a59b8fce3c0c919c337f11337c815bb9d0dc42bac7ac42a9';
const result = stark.getSharedSecret(myPrivateKey, bobFullPublicKey);
// result = "0x020619d1a277a5bc51aac6ab0c22d97e414d4bee9711a2d0aa421997f5efd68bab"
```
