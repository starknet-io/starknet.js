# Function: computeHintedClassHash()

> **computeHintedClassHash**(`compiledContract`): `string`

Defined in: [src/utils/hash/classHash/pedersen.ts:69](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/hash/classHash/pedersen.ts#L69)

Compute hinted class hash for legacy compiled contract (Cairo 0)

## Parameters

### compiledContract

[`LegacyCompiledContract`](../../../../type-aliases/LegacyCompiledContract.md)

## Returns

`string`

hex-string

## Example

```typescript
const compiledCairo0 = json.parse(fs.readFileSync('./cairo0contract.json').toString('ascii'));
const result = hash.computeHintedClassHash(compiledCairo0);
// result = "0x293eabb06955c0a1e55557014675aa4e7a1fd69896147382b29b2b6b166a2ac"
```
