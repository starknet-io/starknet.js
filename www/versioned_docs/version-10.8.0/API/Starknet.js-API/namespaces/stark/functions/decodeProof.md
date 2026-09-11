# Function: decodeProof()

> **decodeProof**(`proofBase64`): `number`[]

Defined in: [src/utils/stark/index.ts:155](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/stark/index.ts#L155)

Decode base64 proof string to proof array for RPC 0.10.1+

## Parameters

### proofBase64

`string`

Base64 encoded proof string

## Returns

`number`[]

Array of proof integers

## Example

```typescript
const proofBase64 = 'AQAAAAIAAAADAAAABAAAAAUAAAA=';
const result = stark.decodeProof(proofBase64);
// result = [1, 2, 3, 4, 5]
```
