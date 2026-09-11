# Function: weierstrass()

> **weierstrass**(`curveDef`): [`CurveFn`](../type-aliases/CurveFn.md)

Defined in: node_modules/@noble/curves/esm/abstract/weierstrass.d.ts:233

Creates short weierstrass curve and ECDSA signature methods for it.

## Parameters

### curveDef

[`CurveType`](../type-aliases/CurveType.md)

## Returns

[`CurveFn`](../type-aliases/CurveFn.md)

## Example

```ts
import { Field } from '@noble/curves/abstract/modular';
// Before that, define BigInt-s: a, b, p, n, Gx, Gy
const curve = weierstrass({ a, b, Fp: Field(p), n, Gx, Gy, h: 1n });
```
