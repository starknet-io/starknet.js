```typescript
// export * as starkCurve from '@noble/curves/stark';
export * as poseidon from '@noble/curves/abstract/poseidon';
export * as weierstrass from '@noble/curves/abstract/weierstrass';
import {

} from '@noble/curves/stark';


V4:
accessible with :
import { ec } from "starknet";
const a = ec.xxx(...)

export const ec =
export const genKeyPair =
export function getKeyPair(pk: BigNumberish): KeyPair
export function getStarkKey(keyPair: KeyPair): string
export function getKeyPairFromPublicKey(publicKey: BigNumberish): KeyPair
export function sign(keyPair: KeyPair, msgHash: string): Signature
export function verify(keyPair: KeyPair | KeyPair[], msgHash: string, sig: Signature): boolean

accessible with :
import { hash } from "starknet";
const a = hash.xxx(...)

export function pedersen(input: [BigNumberish, BigNumberish])



V5(with Noble 0.7.2):
accessible with :
import { ec } from "starknet";
const a = ec.starkCurve.getStarkKey(...)

// for ec
export function getPublicKey(privKey: Hex, isCompressed = false): Uint8Array
export function getSharedSecret(privKeyA: Hex, pubKeyB: Hex): Uint8Array
export function sign(msgHash: Hex, privKey: Hex, opts?: any): SignatureType
export function verify(signature: SignatureType | Hex, msgHash: Hex, pubKey: Hex)
export { CURVE, ProjectivePoint, Signature, utils };
export function grindKey(seed: Hex)
export function getStarkKey(privateKey: Hex): string
export function ethSigToPrivate(signature: string): string
export function getAccountPath(layer: string, application: string, ethereumAddress: string, index: number): string
// for hash
export function pedersen(x: PedersenArg, y: PedersenArg): string
export function hashChain(data: PedersenArg[], fn = pedersen)
export const computeHashOnElements
export const keccak = (data: Uint8Array): bigint
// Poseidon, for hash
export const Fp253 =
export const Fp251 =
export function _poseidonMDS(Fp: Field<bigint>, name: string, m: number, attempt = 0)
export type PoseidonOpts = { Fp: Field<bigint>; rate: number; capacity: number; roundsFull: number; roundsPartial: number; };
export function poseidonBasic(opts: PoseidonOpts, mds: bigint[][])
export function poseidonCreate(opts: PoseidonOpts, mdsAttempt = 0)
export const poseidonSmall
export function poseidonHash(x: bigint, y: bigint, fn = poseidonSmall)

accessible with :
import { hash } from "starknet";
const a = hash.xxx(...)
export default function computeHintedClassHash(compiledContract: CompiledContract)
export function computeContractClassHash(contract: CompiledContract | string)
```
