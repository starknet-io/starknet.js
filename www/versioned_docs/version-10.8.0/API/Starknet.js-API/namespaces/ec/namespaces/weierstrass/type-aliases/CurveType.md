# Type Alias: CurveType

> **CurveType** = [`BasicWCurve`](BasicWCurve.md)\<`bigint`\> & `object`

Defined in: node_modules/@noble/curves/esm/abstract/weierstrass.d.ts:178

## Type Declaration

### hash

> **hash**: `CHash`

### hmac

> **hmac**: `HmacFnSync`

### randomBytes

> **randomBytes**: (`bytesLength?`) => `Uint8Array`

#### Parameters

##### bytesLength?

`number`

#### Returns

`Uint8Array`

### lowS?

> `optional` **lowS?**: `boolean`

### bits2int?

> `optional` **bits2int?**: (`bytes`) => `bigint`

#### Parameters

##### bytes

`Uint8Array`

#### Returns

`bigint`

### bits2int_modN?

> `optional` **bits2int_modN?**: (`bytes`) => `bigint`

#### Parameters

##### bytes

`Uint8Array`

#### Returns

`bigint`
