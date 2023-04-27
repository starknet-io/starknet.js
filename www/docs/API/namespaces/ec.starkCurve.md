---
id: 'ec.starkCurve'
title: 'Namespace: starkCurve'
sidebar_label: 'starkCurve'
custom_edit_url: null
---

[ec](ec.md).starkCurve

## Type Aliases

### ProjectivePoint

Ƭ **ProjectivePoint**: [`ProjPointType`](../interfaces/ec.weierstrass.ProjPointType.md)<`bigint`\>

#### Defined in

node_modules/@noble/curves/stark.d.ts:4

node_modules/@noble/curves/stark.d.ts:41

---

### PoseidonOpts

Ƭ **PoseidonOpts**: `Object`

#### Type declaration

| Name            | Type               |
| :-------------- | :----------------- |
| `Fp`            | `Field`<`bigint`\> |
| `rate`          | `number`           |
| `capacity`      | `number`           |
| `roundsFull`    | `number`           |
| `roundsPartial` | `number`           |

#### Defined in

node_modules/@noble/curves/stark.d.ts:60

## Variables

### \_starkCurve

• `Const` **\_starkCurve**: [`weierstrass`](ec.weierstrass.md)

#### Defined in

node_modules/@noble/curves/stark.d.ts:5

---

### CURVE

• `Const` **CURVE**: `Readonly`<{ `nBitLength`: `number` ; `nByteLength`: `number` ; `Fp`: `Field`<`bigint`\> ; `n`: `bigint` ; `h`: `bigint` ; `hEff?`: `bigint` ; `Gx`: `bigint` ; `Gy`: `bigint` ; `allowInfinityPoint?`: `boolean` ; `a`: `bigint` ; `b`: `bigint` ; `allowedPrivateKeyLengths?`: readonly `number`[] ; `wrapPrivateKey?`: `boolean` ; `endo?`: { `beta`: `bigint` ; `splitScalar`: (`k`: `bigint`) => { `k1neg`: `boolean` ; `k1`: `bigint` ; `k2neg`: `boolean` ; `k2`: `bigint` } } ; `isTorsionFree?`: (`c`: [`weierstrass`](ec.weierstrass.md), `point`: [`ProjPointType`](../interfaces/ec.weierstrass.ProjPointType.md)<`bigint`\>) => `boolean` ; `clearCofactor?`: (`c`: [`weierstrass`](ec.weierstrass.md), `point`: [`ProjPointType`](../interfaces/ec.weierstrass.ProjPointType.md)<`bigint`\>) => [`ProjPointType`](../interfaces/ec.weierstrass.ProjPointType.md)<`bigint`\> ; `hash`: `CHash` ; `hmac`: (`key`: `Uint8Array`, ...`messages`: `Uint8Array`[]) => `Uint8Array` ; `randomBytes`: (`bytesLength?`: `number`) => `Uint8Array` ; `lowS`: `boolean` ; `bits2int?`: (`bytes`: `Uint8Array`) => `bigint` ; `bits2int_modN?`: (`bytes`: `Uint8Array`) => `bigint` }\>

#### Defined in

node_modules/@noble/curves/stark.d.ts:10

---

### ProjectivePoint

• **ProjectivePoint**: [`ProjConstructor`](../interfaces/ec.weierstrass.ProjConstructor.md)<`bigint`\>

#### Defined in

node_modules/@noble/curves/stark.d.ts:4

node_modules/@noble/curves/stark.d.ts:41

---

### Signature

• `Const` **Signature**: [`weierstrass`](ec.weierstrass.md)

#### Defined in

node_modules/@noble/curves/stark.d.ts:41

---

### utils

• `Const` **utils**: `Object`

#### Type declaration

| Name                     | Type                                                                                                                                                                                            |
| :----------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `normPrivateKeyToScalar` | (`key`: `PrivKey`) => `bigint`                                                                                                                                                                  |
| `randomPrivateKey`       | () => `Uint8Array`                                                                                                                                                                              |
| `precompute`             | (`windowSize?`: `number`, `point?`: [`ProjPointType`](../interfaces/ec.weierstrass.ProjPointType.md)<`bigint`\>) => [`ProjPointType`](../interfaces/ec.weierstrass.ProjPointType.md)<`bigint`\> |
| `isValidPrivateKey`      | (`privateKey`: `PrivKey`) => `boolean`                                                                                                                                                          |

#### Defined in

node_modules/@noble/curves/stark.d.ts:41

---

### Fp253

• `Const` **Fp253**: `Readonly`<`Field`<`bigint`\> & `Required`<`Pick`<`Field`<`bigint`\>, `"isOdd"`\>\>\>

#### Defined in

node_modules/@noble/curves/stark.d.ts:57

---

### Fp251

• `Const` **Fp251**: `Readonly`<`Field`<`bigint`\> & `Required`<`Pick`<`Field`<`bigint`\>, `"isOdd"`\>\>\>

#### Defined in

node_modules/@noble/curves/stark.d.ts:58

## Functions

### getPublicKey

▸ **getPublicKey**(`privKey`, `isCompressed?`): `Uint8Array`

#### Parameters

| Name            | Type      |
| :-------------- | :-------- |
| `privKey`       | `Hex`     |
| `isCompressed?` | `boolean` |

#### Returns

`Uint8Array`

#### Defined in

node_modules/@noble/curves/stark.d.ts:6

---

### getSharedSecret

▸ **getSharedSecret**(`privKeyA`, `pubKeyB`): `Uint8Array`

#### Parameters

| Name       | Type  |
| :--------- | :---- |
| `privKeyA` | `Hex` |
| `pubKeyB`  | `Hex` |

#### Returns

`Uint8Array`

#### Defined in

node_modules/@noble/curves/stark.d.ts:7

---

### sign

▸ **sign**(`msgHash`, `privKey`, `opts?`): [`SignatureType`](../interfaces/ec.weierstrass.SignatureType.md)

#### Parameters

| Name      | Type  |
| :-------- | :---- |
| `msgHash` | `Hex` |
| `privKey` | `Hex` |
| `opts?`   | `any` |

#### Returns

[`SignatureType`](../interfaces/ec.weierstrass.SignatureType.md)

#### Defined in

node_modules/@noble/curves/stark.d.ts:8

---

### verify

▸ **verify**(`signature`, `msgHash`, `pubKey`): `boolean`

#### Parameters

| Name        | Type                                                                      |
| :---------- | :------------------------------------------------------------------------ |
| `signature` | [`SignatureType`](../interfaces/ec.weierstrass.SignatureType.md) \| `Hex` |
| `msgHash`   | `Hex`                                                                     |
| `pubKey`    | `Hex`                                                                     |

#### Returns

`boolean`

#### Defined in

node_modules/@noble/curves/stark.d.ts:9

---

### grindKey

▸ **grindKey**(`seed`): `string`

#### Parameters

| Name   | Type  |
| :----- | :---- |
| `seed` | `Hex` |

#### Returns

`string`

#### Defined in

node_modules/@noble/curves/stark.d.ts:48

---

### getStarkKey

▸ **getStarkKey**(`privateKey`): `string`

#### Parameters

| Name         | Type  |
| :----------- | :---- |
| `privateKey` | `Hex` |

#### Returns

`string`

#### Defined in

node_modules/@noble/curves/stark.d.ts:49

---

### ethSigToPrivate

▸ **ethSigToPrivate**(`signature`): `string`

#### Parameters

| Name        | Type     |
| :---------- | :------- |
| `signature` | `string` |

#### Returns

`string`

#### Defined in

node_modules/@noble/curves/stark.d.ts:50

---

### getAccountPath

▸ **getAccountPath**(`layer`, `application`, `ethereumAddress`, `index`): `string`

#### Parameters

| Name              | Type     |
| :---------------- | :------- |
| `layer`           | `string` |
| `application`     | `string` |
| `ethereumAddress` | `string` |
| `index`           | `number` |

#### Returns

`string`

#### Defined in

node_modules/@noble/curves/stark.d.ts:51

---

### pedersen

▸ **pedersen**(`x`, `y`): `string`

#### Parameters

| Name | Type          |
| :--- | :------------ |
| `x`  | `PedersenArg` |
| `y`  | `PedersenArg` |

#### Returns

`string`

#### Defined in

node_modules/@noble/curves/stark.d.ts:53

---

### hashChain

▸ **hashChain**(`data`, `fn?`): `PedersenArg`

#### Parameters

| Name   | Type                                                 |
| :----- | :--------------------------------------------------- |
| `data` | `PedersenArg`[]                                      |
| `fn?`  | (`x`: `PedersenArg`, `y`: `PedersenArg`) => `string` |

#### Returns

`PedersenArg`

#### Defined in

node_modules/@noble/curves/stark.d.ts:54

---

### \_poseidonMDS

▸ **\_poseidonMDS**(`Fp`, `name`, `m`, `attempt?`): `bigint`[][]

#### Parameters

| Name       | Type               |
| :--------- | :----------------- |
| `Fp`       | `Field`<`bigint`\> |
| `name`     | `string`           |
| `m`        | `number`           |
| `attempt?` | `number`           |

#### Returns

`bigint`[][]

#### Defined in

node_modules/@noble/curves/stark.d.ts:59

---

### poseidonBasic

▸ **poseidonBasic**(`opts`, `mds`): (`values`: `bigint`[]) => `bigint`[]

#### Parameters

| Name   | Type                                            |
| :----- | :---------------------------------------------- |
| `opts` | [`PoseidonOpts`](ec.starkCurve.md#poseidonopts) |
| `mds`  | `bigint`[][]                                    |

#### Returns

`fn`

▸ (`values`): `bigint`[]

##### Parameters

| Name     | Type       |
| :------- | :--------- |
| `values` | `bigint`[] |

##### Returns

`bigint`[]

| Name             | Type         |
| :--------------- | :----------- |
| `roundConstants` | `bigint`[][] |

#### Defined in

node_modules/@noble/curves/stark.d.ts:67

---

### poseidonCreate

▸ **poseidonCreate**(`opts`, `mdsAttempt?`): (`values`: `bigint`[]) => `bigint`[]

#### Parameters

| Name          | Type                                            |
| :------------ | :---------------------------------------------- |
| `opts`        | [`PoseidonOpts`](ec.starkCurve.md#poseidonopts) |
| `mdsAttempt?` | `number`                                        |

#### Returns

`fn`

▸ (`values`): `bigint`[]

##### Parameters

| Name     | Type       |
| :------- | :--------- |
| `values` | `bigint`[] |

##### Returns

`bigint`[]

| Name             | Type         |
| :--------------- | :----------- |
| `roundConstants` | `bigint`[][] |

#### Defined in

node_modules/@noble/curves/stark.d.ts:71

---

### poseidonHash

▸ **poseidonHash**(`x`, `y`, `fn?`): `bigint`

#### Parameters

| Name                | Type                                 |
| :------------------ | :----------------------------------- |
| `x`                 | `bigint`                             |
| `y`                 | `bigint`                             |
| `fn?`               | (`values`: `bigint`[]) => `bigint`[] |
| `fn.roundConstants` | `bigint`[][]                         |

#### Returns

`bigint`

#### Defined in

node_modules/@noble/curves/stark.d.ts:79

---

### computeHashOnElements

▸ **computeHashOnElements**(`data`, `fn?`): `PedersenArg`

#### Parameters

| Name   | Type                                                 |
| :----- | :--------------------------------------------------- |
| `data` | `PedersenArg`[]                                      |
| `fn?`  | (`x`: `PedersenArg`, `y`: `PedersenArg`) => `string` |

#### Returns

`PedersenArg`

#### Defined in

node_modules/@noble/curves/stark.d.ts:55

---

### keccak

▸ **keccak**(`data`): `bigint`

#### Parameters

| Name   | Type         |
| :----- | :----------- |
| `data` | `Uint8Array` |

#### Returns

`bigint`

#### Defined in

node_modules/@noble/curves/stark.d.ts:56

---

### poseidonSmall

▸ **poseidonSmall**(`values`): `bigint`[]

#### Parameters

| Name     | Type       |
| :------- | :--------- |
| `values` | `bigint`[] |

#### Returns

`bigint`[]

#### Defined in

node_modules/@noble/curves/stark.d.ts:76
