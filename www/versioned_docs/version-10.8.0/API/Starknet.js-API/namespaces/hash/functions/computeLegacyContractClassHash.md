# Function: computeLegacyContractClassHash()

> **computeLegacyContractClassHash**(`contract`): `string`

Defined in: [src/utils/hash/classHash/pedersen.ts:87](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/hash/classHash/pedersen.ts#L87)

Computes the class hash for legacy compiled contract (Cairo 0)

## Parameters

### contract

`string` \| [`LegacyCompiledContract`](../../../../type-aliases/LegacyCompiledContract.md)

legacy compiled contract content

## Returns

`string`

hex-string of class hash

## Example

```typescript
const compiledCairo0 = json.parse(fs.readFileSync('./cairo0contract.json').toString('ascii'));
const result = hash.computeLegacyContractClassHash(compiledCairo0);
// result = "0x4a5cae61fa8312b0a3d0c44658b403d3e4197be80027fd5020ffcdf0c803331"
```
