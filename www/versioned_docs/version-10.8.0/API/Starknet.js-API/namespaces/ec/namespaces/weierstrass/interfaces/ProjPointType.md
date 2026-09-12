# Interface: ProjPointType\<T\>

Defined in: node_modules/@noble/curves/esm/abstract/weierstrass.d.ts:57

### Design rationale for types

- Interaction between classes from different curves should fail:
  `k256.Point.BASE.add(p256.Point.BASE)`
- For this purpose we want to use `instanceof` operator, which is fast and works during runtime
- Different calls of `curve()` would return different classes -
  `curve(params) !== curve(params)`: if somebody decided to monkey-patch their curve,
  it won't affect others

TypeScript can't infer types for classes created inside a function. Classes is one instance of nominative types in TypeScript and interfaces only check for shape, so it's hard to create unique type for every function call.

We can use generic types via some param, like curve opts, but that would: 1. Enable interaction between `curve(params)` and `curve(params)` (curves of same params)
which is hard to debug. 2. Params can be generic and we can't enforce them to be constant value:
if somebody creates curve from non-constant params,
it would be allowed to interact with other curves with non-constant params

TODO: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-7.html#unique-symbol

## Extends

- `Group`\<`ProjPointType`\<`T`\>\>

## Type Parameters

### T

`T`

## Properties

### px

> `readonly` **px**: `T`

Defined in: node_modules/@noble/curves/esm/abstract/weierstrass.d.ts:58

---

### py

> `readonly` **py**: `T`

Defined in: node_modules/@noble/curves/esm/abstract/weierstrass.d.ts:59

---

### pz

> `readonly` **pz**: `T`

Defined in: node_modules/@noble/curves/esm/abstract/weierstrass.d.ts:60

## Accessors

### x

#### Get Signature

> **get** **x**(): `T`

Defined in: node_modules/@noble/curves/esm/abstract/weierstrass.d.ts:61

##### Returns

`T`

---

### y

#### Get Signature

> **get** **y**(): `T`

Defined in: node_modules/@noble/curves/esm/abstract/weierstrass.d.ts:62

##### Returns

`T`

## Methods

### multiply()

> **multiply**(`scalar`): `ProjPointType`\<`T`\>

Defined in: node_modules/@noble/curves/esm/abstract/weierstrass.d.ts:63

#### Parameters

##### scalar

`bigint`

#### Returns

`ProjPointType`\<`T`\>

#### Overrides

`Group.multiply`

---

### toAffine()

> **toAffine**(`iz?`): [`AffinePoint`](../type-aliases/AffinePoint.md)\<`T`\>

Defined in: node_modules/@noble/curves/esm/abstract/weierstrass.d.ts:64

#### Parameters

##### iz?

`T`

#### Returns

[`AffinePoint`](../type-aliases/AffinePoint.md)\<`T`\>

---

### isTorsionFree()

> **isTorsionFree**(): `boolean`

Defined in: node_modules/@noble/curves/esm/abstract/weierstrass.d.ts:65

#### Returns

`boolean`

---

### clearCofactor()

> **clearCofactor**(): `ProjPointType`\<`T`\>

Defined in: node_modules/@noble/curves/esm/abstract/weierstrass.d.ts:66

#### Returns

`ProjPointType`\<`T`\>

---

### assertValidity()

> **assertValidity**(): `void`

Defined in: node_modules/@noble/curves/esm/abstract/weierstrass.d.ts:67

#### Returns

`void`

---

### hasEvenY()

> **hasEvenY**(): `boolean`

Defined in: node_modules/@noble/curves/esm/abstract/weierstrass.d.ts:68

#### Returns

`boolean`

---

### toRawBytes()

> **toRawBytes**(`isCompressed?`): `Uint8Array`

Defined in: node_modules/@noble/curves/esm/abstract/weierstrass.d.ts:69

#### Parameters

##### isCompressed?

`boolean`

#### Returns

`Uint8Array`

---

### toHex()

> **toHex**(`isCompressed?`): `string`

Defined in: node_modules/@noble/curves/esm/abstract/weierstrass.d.ts:70

#### Parameters

##### isCompressed?

`boolean`

#### Returns

`string`

---

### multiplyUnsafe()

> **multiplyUnsafe**(`scalar`): `ProjPointType`\<`T`\>

Defined in: node_modules/@noble/curves/esm/abstract/weierstrass.d.ts:71

#### Parameters

##### scalar

`bigint`

#### Returns

`ProjPointType`\<`T`\>

---

### multiplyAndAddUnsafe()

> **multiplyAndAddUnsafe**(`Q`, `a`, `b`): `ProjPointType`\<`T`\> \| `undefined`

Defined in: node_modules/@noble/curves/esm/abstract/weierstrass.d.ts:72

#### Parameters

##### Q

`ProjPointType`\<`T`\>

##### a

`bigint`

##### b

`bigint`

#### Returns

`ProjPointType`\<`T`\> \| `undefined`

---

### \_setWindowSize()

> **\_setWindowSize**(`windowSize`): `void`

Defined in: node_modules/@noble/curves/esm/abstract/weierstrass.d.ts:73

#### Parameters

##### windowSize

`number`

#### Returns

`void`

---

### double()

> **double**(): `ProjPointType`

Defined in: node_modules/@noble/curves/esm/abstract/curve.d.ts:11

#### Returns

`ProjPointType`

#### Inherited from

`Group.double`

---

### negate()

> **negate**(): `ProjPointType`

Defined in: node_modules/@noble/curves/esm/abstract/curve.d.ts:12

#### Returns

`ProjPointType`

#### Inherited from

`Group.negate`

---

### add()

> **add**(`other`): `ProjPointType`

Defined in: node_modules/@noble/curves/esm/abstract/curve.d.ts:13

#### Parameters

##### other

`ProjPointType`

#### Returns

`ProjPointType`

#### Inherited from

`Group.add`

---

### subtract()

> **subtract**(`other`): `ProjPointType`

Defined in: node_modules/@noble/curves/esm/abstract/curve.d.ts:14

#### Parameters

##### other

`ProjPointType`

#### Returns

`ProjPointType`

#### Inherited from

`Group.subtract`

---

### equals()

> **equals**(`other`): `boolean`

Defined in: node_modules/@noble/curves/esm/abstract/curve.d.ts:15

#### Parameters

##### other

`ProjPointType`

#### Returns

`boolean`

#### Inherited from

`Group.equals`
