# Type Alias: CurvePointsType\<T\>

> **CurvePointsType**\<`T`\> = [`BasicWCurve`](BasicWCurve.md)\<`T`\> & `object`

Defined in: node_modules/@noble/curves/esm/abstract/weierstrass.d.ts:83

## Type Declaration

### fromBytes?

> `optional` **fromBytes?**: (`bytes`) => [`AffinePoint`](AffinePoint.md)\<`T`\>

#### Parameters

##### bytes

`Uint8Array`

#### Returns

[`AffinePoint`](AffinePoint.md)\<`T`\>

### toBytes?

> `optional` **toBytes?**: (`c`, `point`, `isCompressed`) => `Uint8Array`

#### Parameters

##### c

[`ProjConstructor`](../interfaces/ProjConstructor.md)\<`T`\>

##### point

[`ProjPointType`](../interfaces/ProjPointType.md)\<`T`\>

##### isCompressed

`boolean`

#### Returns

`Uint8Array`

## Type Parameters

### T

`T`
