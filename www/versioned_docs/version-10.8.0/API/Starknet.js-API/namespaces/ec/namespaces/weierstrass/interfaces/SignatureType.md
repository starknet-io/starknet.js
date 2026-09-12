# Interface: SignatureType

Defined in: node_modules/@noble/curves/esm/abstract/weierstrass.d.ts:151

## Properties

### r

> `readonly` **r**: `bigint`

Defined in: node_modules/@noble/curves/esm/abstract/weierstrass.d.ts:152

---

### s

> `readonly` **s**: `bigint`

Defined in: node_modules/@noble/curves/esm/abstract/weierstrass.d.ts:153

---

### recovery?

> `readonly` `optional` **recovery?**: `number`

Defined in: node_modules/@noble/curves/esm/abstract/weierstrass.d.ts:154

## Methods

### assertValidity()

> **assertValidity**(): `void`

Defined in: node_modules/@noble/curves/esm/abstract/weierstrass.d.ts:155

#### Returns

`void`

---

### addRecoveryBit()

> **addRecoveryBit**(`recovery`): [`RecoveredSignatureType`](../type-aliases/RecoveredSignatureType.md)

Defined in: node_modules/@noble/curves/esm/abstract/weierstrass.d.ts:156

#### Parameters

##### recovery

`number`

#### Returns

[`RecoveredSignatureType`](../type-aliases/RecoveredSignatureType.md)

---

### hasHighS()

> **hasHighS**(): `boolean`

Defined in: node_modules/@noble/curves/esm/abstract/weierstrass.d.ts:157

#### Returns

`boolean`

---

### normalizeS()

> **normalizeS**(): `SignatureType`

Defined in: node_modules/@noble/curves/esm/abstract/weierstrass.d.ts:158

#### Returns

`SignatureType`

---

### recoverPublicKey()

> **recoverPublicKey**(`msgHash`): [`ProjPointType`](ProjPointType.md)\<`bigint`\>

Defined in: node_modules/@noble/curves/esm/abstract/weierstrass.d.ts:159

#### Parameters

##### msgHash

`Hex`

#### Returns

[`ProjPointType`](ProjPointType.md)\<`bigint`\>

---

### toCompactRawBytes()

> **toCompactRawBytes**(): `Uint8Array`

Defined in: node_modules/@noble/curves/esm/abstract/weierstrass.d.ts:160

#### Returns

`Uint8Array`

---

### toCompactHex()

> **toCompactHex**(): `string`

Defined in: node_modules/@noble/curves/esm/abstract/weierstrass.d.ts:161

#### Returns

`string`

---

### toDERRawBytes()

> **toDERRawBytes**(`isCompressed?`): `Uint8Array`

Defined in: node_modules/@noble/curves/esm/abstract/weierstrass.d.ts:162

#### Parameters

##### isCompressed?

`boolean`

#### Returns

`Uint8Array`

---

### toDERHex()

> **toDERHex**(`isCompressed?`): `string`

Defined in: node_modules/@noble/curves/esm/abstract/weierstrass.d.ts:163

#### Parameters

##### isCompressed?

`boolean`

#### Returns

`string`
