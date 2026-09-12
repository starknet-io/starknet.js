# Variable: utils

> `const` **utils**: `object`

Defined in: node_modules/@scure/starknet/lib/esm/index.d.ts:46

## Type Declaration

### normPrivateKeyToScalar

> **normPrivateKeyToScalar**: (`key`) => `bigint`

#### Parameters

##### key

`u.PrivKey`

#### Returns

`bigint`

### randomPrivateKey

> **randomPrivateKey**: () => `Uint8Array`

#### Returns

`Uint8Array`

### precompute

> **precompute**: (`windowSize?`, `point?`) => [`ProjPointType`](../../weierstrass/interfaces/ProjPointType.md)\<`bigint`\>

#### Parameters

##### windowSize?

`number`

##### point?

[`ProjPointType`](../../weierstrass/interfaces/ProjPointType.md)\<`bigint`\>

#### Returns

[`ProjPointType`](../../weierstrass/interfaces/ProjPointType.md)\<`bigint`\>

### isValidPrivateKey()

> **isValidPrivateKey**(`privateKey`): `boolean`

#### Parameters

##### privateKey

`PrivKey`

#### Returns

`boolean`
