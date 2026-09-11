# Type Alias: CurvePointsRes\<T\>

> **CurvePointsRes**\<`T`\> = `object`

Defined in: node_modules/@noble/curves/esm/abstract/weierstrass.d.ts:108

## Type Parameters

### T

`T`

## Properties

### CURVE

> **CURVE**: `ReturnType`\<_typeof_ `validatePointOpts`\>

Defined in: node_modules/@noble/curves/esm/abstract/weierstrass.d.ts:109

---

### ProjectivePoint

> **ProjectivePoint**: [`ProjConstructor`](../interfaces/ProjConstructor.md)\<`T`\>

Defined in: node_modules/@noble/curves/esm/abstract/weierstrass.d.ts:110

---

### normPrivateKeyToScalar

> **normPrivateKeyToScalar**: (`key`) => `bigint`

Defined in: node_modules/@noble/curves/esm/abstract/weierstrass.d.ts:111

#### Parameters

##### key

`PrivKey`

#### Returns

`bigint`

---

### weierstrassEquation

> **weierstrassEquation**: (`x`) => `T`

Defined in: node_modules/@noble/curves/esm/abstract/weierstrass.d.ts:112

#### Parameters

##### x

`T`

#### Returns

`T`

---

### isWithinCurveOrder

> **isWithinCurveOrder**: (`num`) => `boolean`

Defined in: node_modules/@noble/curves/esm/abstract/weierstrass.d.ts:113

#### Parameters

##### num

`bigint`

#### Returns

`boolean`
