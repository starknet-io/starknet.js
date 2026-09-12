# Function: buildExecuteFromOutsideCallData()

> **buildExecuteFromOutsideCallData**(`outsideTransaction`): [`Calldata`](../../../../type-aliases/Calldata.md)

Defined in: [src/utils/outsideExecution.ts:175](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/outsideExecution.ts#L175)

Builds a Calldata for the execute_from_outside() entrypoint.

## Parameters

### outsideTransaction

[`OutsideTransaction`](../../../../interfaces/OutsideTransaction.md)

an object that contains all the data for a Outside Execution.

## Returns

[`Calldata`](../../../../type-aliases/Calldata.md)

The Calldata related to this Outside transaction

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

const result: Calldata = outsideExecution.buildExecuteFromOutsideCallData(outsideTransaction);
// result =      ['2846891009026995430665703316224827616914889274105712248413538305735679628945',
//   '3534941323322368687588030484849371698982661160919690922146419787802417549486',
//   '500', '600', '1', '1656', '2192', '2', '12', '13', '2', '291', '1110']
```
