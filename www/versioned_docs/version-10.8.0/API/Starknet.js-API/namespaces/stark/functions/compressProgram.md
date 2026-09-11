# Function: compressProgram()

> **compressProgram**(`jsonProgram`): `Promise`\<`string`\>

Defined in: [src/utils/stark/index.ts:58](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/stark/index.ts#L58)

Compress compiled Cairo 0 program

[Reference](https://github.com/starkware-libs/cairo-lang/blob/master/src/starkware/starknet/services/api/gateway/transaction.py#L54-L58)

## Parameters

### jsonProgram

`string` \| [`Program`](../../../../interfaces/Program.md)

Representing the compiled Cairo 0 program

## Returns

`Promise`\<`string`\>

Compressed Cairo 0 program

## Example

```typescript
const contractCairo0 = json.parse(fs.readFileSync('./cairo0contract.json').toString('ascii'));
const result = stark.compressProgram(contractCairo0);
// result = "H4sIAAAAAAAAA+1dC4/bOJL+K4aBu01me7r5EEUyixzQk/TuB..."
```
