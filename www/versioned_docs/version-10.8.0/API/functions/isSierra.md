# Function: isSierra()

> **isSierra**(`contract`): contract is CompiledSierra \| SierraContractClass

Defined in: [src/utils/contract.ts:26](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/contract.ts#L26)

Checks if a given contract is in Sierra (Safe Intermediate Representation) format.

## Parameters

### contract

`string` \| [`CairoContract`](../type-aliases/CairoContract.md)

The contract to check. Can be either a CairoContract object or a string representation of the contract.

## Returns

contract is CompiledSierra \| SierraContractClass

- Returns true if the contract is a Sierra contract, otherwise false.

## Example

```typescript
const result = isSierra(contract);
// result = true | false
```
