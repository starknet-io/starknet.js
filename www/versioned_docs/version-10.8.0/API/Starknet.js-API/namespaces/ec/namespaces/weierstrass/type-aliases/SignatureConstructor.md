# Type Alias: SignatureConstructor()

> **SignatureConstructor** = [`SignatureType`](../interfaces/SignatureType.md)

Defined in: node_modules/@noble/curves/esm/abstract/weierstrass.d.ts:168

> **new SignatureConstructor**(`r`, `s`): [`SignatureType`](../interfaces/SignatureType.md)

## Parameters

### r

`bigint`

### s

`bigint`

## Returns

[`SignatureType`](../interfaces/SignatureType.md)

## Methods

### fromCompact()

> **fromCompact**(`hex`): [`SignatureType`](../interfaces/SignatureType.md)

Defined in: node_modules/@noble/curves/esm/abstract/weierstrass.d.ts:170

#### Parameters

##### hex

`Hex`

#### Returns

[`SignatureType`](../interfaces/SignatureType.md)

---

### fromDER()

> **fromDER**(`hex`): [`SignatureType`](../interfaces/SignatureType.md)

Defined in: node_modules/@noble/curves/esm/abstract/weierstrass.d.ts:171

#### Parameters

##### hex

`Hex`

#### Returns

[`SignatureType`](../interfaces/SignatureType.md)
