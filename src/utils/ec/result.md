| V4                                                                                   | current V5                                                                         | will be                                                                                          |
| :----------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------- |
| `ec.verify(keyPair: KeyPair \| KeyPair[], msgHash: string, sig: Signature): boolean` | `ec.starkCurve.verify(signature: SignatureType \| Hex, msgHash: Hex, pubKey: Hex)` | `ec.starkCurve.verify(signature: SignatureType \| Hex, msgHash: Hex, pubKey: Hex)`               |
|                                                                                      |                                                                                    | `@deprecated ec.verify(keyPair: KeyPair \| KeyPair[], msgHash: string, sig: Signature): boolean` |

Flawless migration of V4 DAPP code to V5.  
`@deprecated ec.verify` : use noble lib and bigint (no ec lib or BN)

V4 `ec.verify` do not handle starknet public key.  
Same thing with V5 `ec.verify`

V5 `ec.starkCurve.verify` handles full and Starknet public keys
