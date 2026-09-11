# Function: extractContractHashes()

> **extractContractHashes**(`payload`, `starknetVersion?`): [`CompleteDeclareContractPayload`](../type-aliases/CompleteDeclareContractPayload.md)

Defined in: [src/utils/contract.ts:50](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/contract.ts#L50)

Extracts contract hashes from `DeclareContractPayload`.

## Parameters

### payload

[`DeclareContractPayload`](../type-aliases/DeclareContractPayload.md)

The payload containing contract information.

### starknetVersion?

`string`

## Returns

[`CompleteDeclareContractPayload`](../type-aliases/CompleteDeclareContractPayload.md)

- The `CompleteDeclareContractPayload` with extracted contract hashes.

## Throws

- If extraction of compiledClassHash or classHash fails.

## Example

```typescript
const result = extractContractHashes(contract);
// result = {
//   contract: ...,
//   classHash: ...,
//   casm: ...,
//   compiledClassHash: ...,
// }
```
