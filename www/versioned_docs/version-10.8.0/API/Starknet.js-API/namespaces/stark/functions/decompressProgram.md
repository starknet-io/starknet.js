# Function: decompressProgram()

> **decompressProgram**(`base64`): `Promise`\<`string`[] \| [`Program`](../../../../interfaces/Program.md)\>

Defined in: [src/utils/stark/index.ts:99](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/stark/index.ts#L99)

Decompress compressed compiled Cairo 0 program

## Parameters

### base64

`string` \| `string`[]

Compressed Cairo 0 program

## Returns

`Promise`\<`string`[] \| [`Program`](../../../../interfaces/Program.md)\>

Parsed decompressed compiled Cairo 0 program

## Example

```typescript
const contractCairo0 = json.parse(fs.readFileSync('./cairo0contract.json').toString('ascii'));
const compressedCairo0 = stark.compressProgram(contractCairo0);
const result = stark.decompressProgram(compressedCairo0);
// result = {
//   abi: [
//     {
//       inputs: [Array],
//       name: 'increase_balance',
//       outputs: [],
//       type: 'function'
//     }
//   ],
//   entry_points_by_type: { CONSTRUCTOR: [], EXTERNAL: [ [Object], [Object] ], L1_HANDLER: [] },
//   program: {
//     attributes: [],
//     builtins: [ 'pedersen', 'range_check' ],
//     compiler_version: '0.10.2',
//     data: [
//       '0x480680017fff8000',
// ...
```
