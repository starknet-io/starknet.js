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

node_modules/@noble/curves/abstract/weierstrass.d.ts:97

---

### s

• `Readonly` **s**: `bigint`

#### Defined in

node_modules/@noble/curves/abstract/weierstrass.d.ts:98

---

### recovery

• `Optional` `Readonly` **recovery**: `number`

#### Defined in

node_modules/@noble/curves/abstract/weierstrass.d.ts:99

## Methods

### assertValidity

▸ **assertValidity**(): `void`

#### Returns

`void`

#### Defined in

node_modules/@noble/curves/abstract/weierstrass.d.ts:100

---

### addRecoveryBit

▸ **addRecoveryBit**(`recovery`): [`SignatureType`](ec.weierstrass.SignatureType.md)

#### Parameters

| Name       | Type     |
| :--------- | :------- |
| `recovery` | `number` |

#### Returns

[`SignatureType`](ec.weierstrass.SignatureType.md)

#### Defined in

node_modules/@noble/curves/abstract/weierstrass.d.ts:101

---

### hasHighS

▸ **hasHighS**(): `boolean`

#### Returns

`boolean`

#### Defined in

node_modules/@noble/curves/abstract/weierstrass.d.ts:102

---

### normalizeS

▸ **normalizeS**(): [`SignatureType`](ec.weierstrass.SignatureType.md)

#### Returns

[`SignatureType`](ec.weierstrass.SignatureType.md)

#### Defined in

node_modules/@noble/curves/abstract/weierstrass.d.ts:103

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

node_modules/@noble/curves/abstract/weierstrass.d.ts:104

---

### toCompactRawBytes

▸ **toCompactRawBytes**(): `Uint8Array`

#### Returns

`Uint8Array`

#### Defined in

node_modules/@noble/curves/abstract/weierstrass.d.ts:105

---

### toCompactHex

▸ **toCompactHex**(): `string`

#### Returns

`string`

#### Defined in

node_modules/@noble/curves/abstract/weierstrass.d.ts:106

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

node_modules/@noble/curves/abstract/weierstrass.d.ts:107

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

node_modules/@noble/curves/abstract/weierstrass.d.ts:108
