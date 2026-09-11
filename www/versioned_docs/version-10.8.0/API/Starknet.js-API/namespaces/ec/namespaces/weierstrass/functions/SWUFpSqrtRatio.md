# Function: SWUFpSqrtRatio()

> **SWUFpSqrtRatio**\<`T`\>(`Fp`, `Z`): (`u`, `v`) => `object`

Defined in: node_modules/@noble/curves/esm/abstract/weierstrass.d.ts:243

Implementation of the Shallue and van de Woestijne method for any weierstrass curve.
TODO: check if there is a way to merge this with uvRatio in Edwards; move to modular.
b = True and y = sqrt(u / v) if (u / v) is square in F, and
b = False and y = sqrt(Z \* (u / v)) otherwise.

## Type Parameters

### T

`T`

## Parameters

### Fp

`IField`\<`T`\>

### Z

`T`

## Returns

(`u`, `v`) => `object`
