# Function: encodeProof()

> **encodeProof**(`proof`): `string`

Defined in: [src/utils/stark/index.ts:140](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/stark/index.ts#L140)

Encode proof array to base64 string for RPC 0.10.1+

## Parameters

### proof

`number`[]

Array of proof integers

## Returns

`string`

Base64 encoded proof

## Example

```typescript
const proofArray = [1, 2, 3, 4, 5];
const result = stark.encodeProof(proofArray);
// result = "AQAAAAIAAAADAAAABAAAAAUAAAA="
```
