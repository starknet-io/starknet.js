# Type Alias: BasicWCurve\<T\>

> **BasicWCurve**\<`T`\> = `BasicCurve`\<`T`\> & `object`

Defined in: node_modules/@noble/curves/esm/abstract/weierstrass.d.ts:16

## Type Declaration

### a

> **a**: `T`

### b

> **b**: `T`

### allowedPrivateKeyLengths?

> `optional` **allowedPrivateKeyLengths?**: readonly `number`[]

### wrapPrivateKey?

> `optional` **wrapPrivateKey?**: `boolean`

### endo?

> `optional` **endo?**: `EndomorphismOpts`

### isTorsionFree?

> `optional` **isTorsionFree?**: (`c`, `point`) => `boolean`

#### Parameters

##### c

[`ProjConstructor`](../interfaces/ProjConstructor.md)\<`T`\>

##### point

[`ProjPointType`](../interfaces/ProjPointType.md)\<`T`\>

#### Returns

`boolean`

### clearCofactor?

> `optional` **clearCofactor?**: (`c`, `point`) => [`ProjPointType`](../interfaces/ProjPointType.md)\<`T`\>

#### Parameters

##### c

[`ProjConstructor`](../interfaces/ProjConstructor.md)\<`T`\>

##### point

[`ProjPointType`](../interfaces/ProjPointType.md)\<`T`\>

#### Returns

[`ProjPointType`](../interfaces/ProjPointType.md)\<`T`\>

## Type Parameters

### T

`T`
