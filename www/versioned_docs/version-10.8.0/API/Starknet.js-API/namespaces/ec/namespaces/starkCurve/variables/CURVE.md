# Variable: CURVE

> `const` **CURVE**: `Readonly`\<\{ `nBitLength`: `number`; `nByteLength`: `number`; `Fp`: `IField`\<`bigint`\>; `n`: `bigint`; `h`: `bigint`; `hEff?`: `bigint`; `Gx`: `bigint`; `Gy`: `bigint`; `allowInfinityPoint?`: `boolean`; `a`: `bigint`; `b`: `bigint`; `allowedPrivateKeyLengths?`: readonly `number`[]; `wrapPrivateKey?`: `boolean`; `endo?`: \{ `beta`: `bigint`; `splitScalar`: (`k`) => `object`; \}; `isTorsionFree?`: (`c`, `point`) => `boolean`; `clearCofactor?`: (`c`, `point`) => [`ProjPointType`](../../weierstrass/interfaces/ProjPointType.md)\<`bigint`\>; `hash`: `u.CHash`; `hmac`: (`key`, ...`messages`) => `Uint8Array`; `randomBytes`: (`bytesLength?`) => `Uint8Array`; `lowS`: `boolean`; `bits2int?`: (`bytes`) => `bigint`; `bits2int_modN?`: (`bytes`) => `bigint`; `p`: `bigint`; \}\>

Defined in: node_modules/@scure/starknet/lib/esm/index.d.ts:14
