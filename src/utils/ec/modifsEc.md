## genKeyPair :

| V4                | current V5 | will be                       |
| :---------------- | :--------- | :---------------------------- |
| `ec.genKeyPair()` |            | `@deprecated ec.genKeyPair()` |

## getKeyPair :

| V4                                      | current V5 | will be                                             |
| :-------------------------------------- | :--------- | :-------------------------------------------------- |
| `getKeyPair(pk: BigNumberish): KeyPair` |            | `@deprecated getKeyPair(pk: BigNumberish): KeyPair` |

## KeyPair.getPublic :

| V4                    | current V5                                                                   | will be                                                                           |
| :-------------------- | :--------------------------------------------------------------------------- | :-------------------------------------------------------------------------------- |
| `keyPair.getPublic()` | `ec.StarkCurve.getPublicKey(privKey: Hex, isCompressed = false): Uint8Array` | `@deprecated keyPair.getPublic()`                                                 |
|                       |                                                                              | `ec.StarkCurve.getPublicKey(privKey: BigNumberish, isCompressed = false): string` |

Current V5 output is **Uint8Array**.  
Will be **Hex string**.

## KeyPair.getPrivate :

| V4                     | current V5 | will be                            |
| :--------------------- | :--------- | :--------------------------------- |
| `keyPair.getPrivate()` |            | `@deprecated keyPair.getPrivate()` |

## getStarkKey :

| V4                                         | current V5                                           | will be                                                |
| :----------------------------------------- | :--------------------------------------------------- | :----------------------------------------------------- |
| `ec.getStarkKey(keyPair: KeyPair): string` | `ec.starkCurve.getStarkKey(privateKey: Hex): string` | `ec.starkCurve.getStarkKey(privateKey: Hex): string`   |
|                                            |                                                      | `@deprecated ec.getStarkKey(keyPair: KeyPair): string` |

## getKeyPairFromPublicKey :

| V4                                                             | current V5 | will be                                                                    |
| :------------------------------------------------------------- | :--------- | :------------------------------------------------------------------------- |
| `ec.getKeyPairFromPublicKey(publicKey: BigNumberish): KeyPair` |            | `@deprecated ec.getKeyPairFromPublicKey(publicKey: BigNumberish): KeyPair` |

## sign :

| V4                                                   | current V5                                                                   | will be                                                                      |
| :--------------------------------------------------- | :--------------------------------------------------------------------------- | :--------------------------------------------------------------------------- |
| `ec.sign(keyPair: KeyPair, msgHash: string): string` | `ec.starkCourve.sign(msgHash: Hex, privKey: Hex, opts?: any): SignatureType` | `ec.starkCourve.sign(msgHash: Hex, privKey: Hex, opts?: any): SignatureType` |
|                                                      |                                                                              | `@deprecated ec.sign(keyPair: KeyPair, msgHash: string): string`             |

## verify :

| V4                                                                                   | current V5                                                                         | will be                                                                                          |
| :----------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------- |
| `ec.verify(keyPair: KeyPair \| KeyPair[], msgHash: string, sig: Signature): boolean` | `ec.starkCurve.verify(signature: SignatureType \| Hex, msgHash: Hex, pubKey: Hex)` | `ec.starkCurve.verify(signature: SignatureType \| Hex, msgHash: Hex, pubKey: Hex)`               |
|                                                                                      |                                                                                    | `@deprecated ec.verify(keyPair: KeyPair \| KeyPair[], msgHash: string, sig: Signature): boolean` |

V4 `ec.verify` do not handle starknet public key, **only** full public key.  
Same thing with V5 `ec.verify`  
V5 `ec.starkCurve.verify` handles full **and** Starknet public keys

## ec :

| V4      | current V5            | will be               |
| :------ | :-------------------- | :-------------------- |
| `ec.ec` | `ec.starkCurve.CURVE` | `ec.starkCurve.CURVE` |

ec.ec is not documented in API and is not migrated to V5 (too complex).

## other :

The following Noble constants/methods/interfaces about `ec` are rexeported without modification, and have no equivalence in V4 :

- getSharedSecret,
- ProjectivePoint,
- Signature,
- utils,
- grindKey,
- getStarkKey,
- ethSigToPrivate,
- getAccountPath,
- Fp251,
- Fp253,
