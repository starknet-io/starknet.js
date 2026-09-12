# Function: fromCallsToExecuteCalldata()

> **fromCallsToExecuteCalldata**(`calls`): [`Calldata`](../../../../type-aliases/Calldata.md)

Defined in: [src/utils/transaction/transaction.ts:82](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/transaction/transaction.ts#L82)

Transforms a list of calls into the Cairo 0 `__execute__` calldata.

## Parameters

### calls

[`Call`](../../../../type-aliases/Call.md)[]

the list of calls to transform

## Returns

[`Calldata`](../../../../type-aliases/Calldata.md)

the Cairo 0 `__execute__` calldata

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
const result = transaction.fromCallsToExecuteCalldata(calls);
// result = ['2', '103929005307130220006098923584552504982110632080',
//   '784552248838722632831848474045274978537388011177294206940059575485454596699', '0',
//   '3', '54400338722927882010739357306608455014511100705',
//   '836430224577382061379420368022192503799782058803937958828224424676927281484',
//   '3', '3', '6', '1', '2', '3', '4', '5', '6']
```
