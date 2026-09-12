# Type Alias: CurveFn

> **CurveFn** = `object`

Defined in: node_modules/@noble/curves/esm/abstract/weierstrass.d.ts:211

## Properties

### CURVE

> **CURVE**: `ReturnType`\<_typeof_ `validateOpts`\>

Defined in: node_modules/@noble/curves/esm/abstract/weierstrass.d.ts:212

---

### getPublicKey

> **getPublicKey**: (`privateKey`, `isCompressed?`) => `Uint8Array`

Defined in: node_modules/@noble/curves/esm/abstract/weierstrass.d.ts:213

#### Parameters

##### privateKey

`PrivKey`

##### isCompressed?

`boolean`

#### Returns

`Uint8Array`

---

### getSharedSecret

> **getSharedSecret**: (`privateA`, `publicB`, `isCompressed?`) => `Uint8Array`

Defined in: node_modules/@noble/curves/esm/abstract/weierstrass.d.ts:214

#### Parameters

##### privateA

`PrivKey`

##### publicB

`Hex`

##### isCompressed?

`boolean`

#### Returns

`Uint8Array`

---

### sign

> **sign**: (`msgHash`, `privKey`, `opts?`) => [`RecoveredSignatureType`](RecoveredSignatureType.md)

Defined in: node_modules/@noble/curves/esm/abstract/weierstrass.d.ts:215

#### Parameters

##### msgHash

`Hex`

##### privKey

`PrivKey`

##### opts?

[`SignOpts`](SignOpts.md)

#### Returns

[`RecoveredSignatureType`](RecoveredSignatureType.md)

---

### verify

> **verify**: (`signature`, `msgHash`, `publicKey`, `opts?`) => `boolean`

Defined in: node_modules/@noble/curves/esm/abstract/weierstrass.d.ts:216

#### Parameters

##### signature

`Hex` \| `SignatureLike`

##### msgHash

`Hex`

##### publicKey

`Hex`

##### opts?

[`VerOpts`](VerOpts.md)

#### Returns

`boolean`

---

### ProjectivePoint

> **ProjectivePoint**: [`ProjConstructor`](../interfaces/ProjConstructor.md)\<`bigint`\>

Defined in: node_modules/@noble/curves/esm/abstract/weierstrass.d.ts:217

---

### Signature

> **Signature**: [`SignatureConstructor`](SignatureConstructor.md)

Defined in: node_modules/@noble/curves/esm/abstract/weierstrass.d.ts:218

---

### utils

> **utils**: `object`

Defined in: node_modules/@noble/curves/esm/abstract/weierstrass.d.ts:219

#### normPrivateKeyToScalar

> **normPrivateKeyToScalar**: (`key`) => `bigint`

##### Parameters

###### key

`PrivKey`

##### Returns

`bigint`

#### randomPrivateKey

> **randomPrivateKey**: () => `Uint8Array`

##### Returns

`Uint8Array`

#### precompute

> **precompute**: (`windowSize?`, `point?`) => [`ProjPointType`](../interfaces/ProjPointType.md)\<`bigint`\>

##### Parameters

###### windowSize?

`number`

###### point?

[`ProjPointType`](../interfaces/ProjPointType.md)\<`bigint`\>

##### Returns

[`ProjPointType`](../interfaces/ProjPointType.md)\<`bigint`\>

#### isValidPrivateKey()

> **isValidPrivateKey**(`privateKey`): `boolean`

##### Parameters

###### privateKey

`PrivKey`

##### Returns

`boolean`
