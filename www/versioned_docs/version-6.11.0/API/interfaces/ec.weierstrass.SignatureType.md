---
id: 'ec.weierstrass.SignatureType'
title: 'Interface: SignatureType'
sidebar_label: 'SignatureType'
custom_edit_url: null
---

[ec](../namespaces/ec.md).[weierstrass](../namespaces/ec.weierstrass.md).SignatureType

## Properties

### r

• `Readonly` **r**: `bigint`

#### Defined in

node_modules/@noble/curves/esm/abstract/weierstrass.d.ts:136

---

### s

• `Readonly` **s**: `bigint`

#### Defined in

node_modules/@noble/curves/esm/abstract/weierstrass.d.ts:137

---

### recovery

• `Optional` `Readonly` **recovery**: `number`

#### Defined in

node_modules/@noble/curves/esm/abstract/weierstrass.d.ts:138

## Methods

### assertValidity

▸ **assertValidity**(): `void`

#### Returns

`void`

#### Defined in

node_modules/@noble/curves/esm/abstract/weierstrass.d.ts:139

---

### addRecoveryBit

▸ **addRecoveryBit**(`recovery`): [`RecoveredSignatureType`](../namespaces/ec.weierstrass.md#recoveredsignaturetype)

#### Parameters

| Name       | Type     |
| :--------- | :------- |
| `recovery` | `number` |

#### Returns

[`RecoveredSignatureType`](../namespaces/ec.weierstrass.md#recoveredsignaturetype)

#### Defined in

node_modules/@noble/curves/esm/abstract/weierstrass.d.ts:140

---

### hasHighS

▸ **hasHighS**(): `boolean`

#### Returns

`boolean`

#### Defined in

node_modules/@noble/curves/esm/abstract/weierstrass.d.ts:141

---

### normalizeS

▸ **normalizeS**(): [`SignatureType`](ec.weierstrass.SignatureType.md)

#### Returns

[`SignatureType`](ec.weierstrass.SignatureType.md)

#### Defined in

node_modules/@noble/curves/esm/abstract/weierstrass.d.ts:142

---

### recoverPublicKey

▸ **recoverPublicKey**(`msgHash`): [`ProjPointType`](ec.weierstrass.ProjPointType.md)<`bigint`\>

#### Parameters

| Name      | Type  |
| :-------- | :---- |
| `msgHash` | `Hex` |

#### Returns

[`ProjPointType`](ec.weierstrass.ProjPointType.md)<`bigint`\>

#### Defined in

node_modules/@noble/curves/esm/abstract/weierstrass.d.ts:143

---

### toCompactRawBytes

▸ **toCompactRawBytes**(): `Uint8Array`

#### Returns

`Uint8Array`

#### Defined in

node_modules/@noble/curves/esm/abstract/weierstrass.d.ts:144

---

### toCompactHex

▸ **toCompactHex**(): `string`

#### Returns

`string`

#### Defined in

node_modules/@noble/curves/esm/abstract/weierstrass.d.ts:145

---

### toDERRawBytes

▸ **toDERRawBytes**(`isCompressed?`): `Uint8Array`

#### Parameters

| Name            | Type      |
| :-------------- | :-------- |
| `isCompressed?` | `boolean` |

#### Returns

`Uint8Array`

#### Defined in

node_modules/@noble/curves/esm/abstract/weierstrass.d.ts:146

---

### toDERHex

▸ **toDERHex**(`isCompressed?`): `string`

#### Parameters

| Name            | Type      |
| :-------------- | :-------- |
| `isCompressed?` | `boolean` |

#### Returns

`string`

#### Defined in

node_modules/@noble/curves/esm/abstract/weierstrass.d.ts:147
