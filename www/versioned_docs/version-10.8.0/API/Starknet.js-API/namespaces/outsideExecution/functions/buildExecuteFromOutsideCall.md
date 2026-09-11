# Function: buildExecuteFromOutsideCall()

> **buildExecuteFromOutsideCall**(`outsideTransaction`): [`Call`](../../../../type-aliases/Call.md)[]

Defined in: [src/utils/outsideExecution.ts:209](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/outsideExecution.ts#L209)

Builds a Call for execute(), estimateFee() and simulateTransaction() functions.

## Parameters

### outsideTransaction

[`AllowArray`](../../../../type-aliases/AllowArray.md)\<[`OutsideTransaction`](../../../../interfaces/OutsideTransaction.md)\>

an object that contains all the data for an Outside Execution.

## Returns

[`Call`](../../../../type-aliases/Call.md)[]

The Call related to this Outside transaction

## Example

```typescript
const outsideTransaction: OutsideTransaction = {
  outsideExecution: {
    caller: '0x64b48806902a367c8598f4f95c305e8c1a1acba5f082d294a43793113115691',
    nonce: '0x7d0b4b4fce4b236e63d2bb5fc321935d52935cd3b268248cf9cf29c496bd0ae',
    execute_after: 500,
    execute_before: 600,
    calls: [{ to: '0x678', selector: '0x890', calldata: [12, 13] }],
  },
  signature: ['0x123', '0x456'],
  signerAddress: '0x3b278ebae434f283f9340587a7f2dd4282658ac8e03cb9b0956db23a0a83657',
  version: EOutsideExecutionVersion.V2,
};

const result: Call[] = outsideExecution.buildExecuteFromOutsideCall(outsideTransaction);
// result = [{contractAddress: '0x64b48806902a367c8598f4f95c305e8c1a1acba5f082d294a43793113115691',
//   entrypoint: 'execute_from_outside_v2',
//   calldata: [ ... ],
// }]
```
