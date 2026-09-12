# Function: transformCallsToMulticallArrays()

> **transformCallsToMulticallArrays**(`calls`): `object`

Defined in: [src/utils/transaction/transaction.ts:37](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/transaction/transaction.ts#L37)

Transforms a list of Calls, each with their own calldata, into
two arrays: one with the entry points, and one with the concatenated calldata

## Parameters

### calls

[`Call`](../../../../type-aliases/Call.md)[]

the list of calls to transform.

## Returns

`object`

An object containing two arrays: callArray and calldata.

### callArray

> **callArray**: [`ParsedStruct`](../../../../type-aliases/ParsedStruct.md)[]

### calldata

> **calldata**: [`Calldata`](../../../../type-aliases/Calldata.md)

## Example

```typescript
const calls: Call[] = [
  {
    contractAddress: '0x1234567890123456789012345678901234567890',
    entrypoint: 'functionName',
    calldata: [1, 2, 3],
  },
  {
    contractAddress: '0x0987654321098765432109876543210987654321',
    entrypoint: 'anotherFunction',
    calldata: [4, 5, 6],
  },
];
const result = transaction.transformCallsToMulticallArrays(calls);
// result = {
// callArray: [
// { to: "0x1234567890123456789012345678901234567890", selector: "1234567890",
// data_offset: "0", data_len: "3" },
// { to: "0x0987654321098765432109876543210987654321", selector: "1234567890",
// data_offset: "0987654321", data_offset: "3", data_len: "3"}
// ], calldata: [1, 2, 3, 4, 5, 6]
// }
```
