# Variable: DER

> `const` **DER**: `object`

Defined in: node_modules/@noble/curves/esm/abstract/weierstrass.d.ts:122

ASN.1 DER encoding utilities. ASN is very complex & fragile. Format:

    [0x30 (SEQUENCE), bytelength, 0x02 (INTEGER), intLength, R, 0x02 (INTEGER), intLength, S]

Docs: https://letsencrypt.org/docs/a-warm-welcome-to-asn1-and-der/, https://luca.ntop.org/Teaching/Appunti/asn1.html

## Type Declaration

### Err

> **Err**: (`m?`) => `object`

#### Parameters

##### m?

`string`

#### Returns

`object`

##### name

> **name**: `string`

##### message

> **message**: `string`

##### stack?

> `optional` **stack?**: `string`

### \_tlv

> **\_tlv**: `object`

#### \_tlv.encode

> **encode**: (`tag`, `data`) => `string`

##### Parameters

###### tag

`number`

###### data

`string`

##### Returns

`string`

#### \_tlv.decode()

> **decode**(`tag`, `data`): `object`

##### Parameters

###### tag

`number`

###### data

`Uint8Array`

##### Returns

`object`

###### v

> **v**: `Uint8Array`

###### l

> **l**: `Uint8Array`

### \_int

> **\_int**: `object`

#### \_int.encode()

> **encode**(`num`): `string`

##### Parameters

###### num

`bigint`

##### Returns

`string`

#### \_int.decode()

> **decode**(`data`): `bigint`

##### Parameters

###### data

`Uint8Array`

##### Returns

`bigint`

### toSig()

> **toSig**(`hex`): `object`

#### Parameters

##### hex

`string` \| `Uint8Array`\<`ArrayBufferLike`\>

#### Returns

`object`

##### r

> **r**: `bigint`

##### s

> **s**: `bigint`

### hexFromSig()

> **hexFromSig**(`sig`): `string`

#### Parameters

##### sig

###### r

`bigint`

###### s

`bigint`

#### Returns

`string`
