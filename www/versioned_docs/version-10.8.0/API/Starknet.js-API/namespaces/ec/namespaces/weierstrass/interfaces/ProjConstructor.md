# Interface: ProjConstructor\<T\>

Defined in: node_modules/@noble/curves/esm/abstract/weierstrass.d.ts:75

## Extends

- `GroupConstructor`\<[`ProjPointType`](ProjPointType.md)\<`T`\>\>

## Type Parameters

### T

`T`

## Constructors

### Constructor

> **new ProjConstructor**(`x`, `y`, `z`): [`ProjPointType`](ProjPointType.md)\<`T`\>

Defined in: node_modules/@noble/curves/esm/abstract/weierstrass.d.ts:76

#### Parameters

##### x

`T`

##### y

`T`

##### z

`T`

#### Returns

[`ProjPointType`](ProjPointType.md)\<`T`\>

#### Inherited from

`GroupConstructor<ProjPointType<T>>.constructor`

## Properties

### BASE

> **BASE**: [`ProjPointType`](ProjPointType.md)

Defined in: node_modules/@noble/curves/esm/abstract/curve.d.ts:19

#### Inherited from

`GroupConstructor.BASE`

---

### ZERO

> **ZERO**: [`ProjPointType`](ProjPointType.md)

Defined in: node_modules/@noble/curves/esm/abstract/curve.d.ts:20

#### Inherited from

`GroupConstructor.ZERO`

## Methods

### fromAffine()

> **fromAffine**(`p`): [`ProjPointType`](ProjPointType.md)\<`T`\>

Defined in: node_modules/@noble/curves/esm/abstract/weierstrass.d.ts:77

#### Parameters

##### p

[`AffinePoint`](../type-aliases/AffinePoint.md)\<`T`\>

#### Returns

[`ProjPointType`](ProjPointType.md)\<`T`\>

---

### fromHex()

> **fromHex**(`hex`): [`ProjPointType`](ProjPointType.md)\<`T`\>

Defined in: node_modules/@noble/curves/esm/abstract/weierstrass.d.ts:78

#### Parameters

##### hex

`Hex`

#### Returns

[`ProjPointType`](ProjPointType.md)\<`T`\>

---

### fromPrivateKey()

> **fromPrivateKey**(`privateKey`): [`ProjPointType`](ProjPointType.md)\<`T`\>

Defined in: node_modules/@noble/curves/esm/abstract/weierstrass.d.ts:79

#### Parameters

##### privateKey

`PrivKey`

#### Returns

[`ProjPointType`](ProjPointType.md)\<`T`\>

---

### normalizeZ()

> **normalizeZ**(`points`): [`ProjPointType`](ProjPointType.md)\<`T`\>[]

Defined in: node_modules/@noble/curves/esm/abstract/weierstrass.d.ts:80

#### Parameters

##### points

[`ProjPointType`](ProjPointType.md)\<`T`\>[]

#### Returns

[`ProjPointType`](ProjPointType.md)\<`T`\>[]

---

### msm()

> **msm**(`points`, `scalars`): [`ProjPointType`](ProjPointType.md)\<`T`\>

Defined in: node_modules/@noble/curves/esm/abstract/weierstrass.d.ts:81

#### Parameters

##### points

[`ProjPointType`](ProjPointType.md)\<`T`\>[]

##### scalars

`bigint`[]

#### Returns

[`ProjPointType`](ProjPointType.md)\<`T`\>
