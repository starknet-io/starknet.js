# Function: getOutsideCall()

> **getOutsideCall**(`call`): [`OutsideCall`](../../../../interfaces/OutsideCall.md)

Defined in: [src/utils/outsideExecution.ts:47](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/outsideExecution.ts#L47)

Converts a Call object to an OutsideCall object that can be used for an Outside Execution.

## Parameters

### call

[`Call`](../../../../type-aliases/Call.md)

transaction to proceed.

## Returns

[`OutsideCall`](../../../../interfaces/OutsideCall.md)

transaction formatted in conformity to SNIP-9

## Example

```typescript
const call1: Call = {
  contractAddress: '0x0123',
  entrypoint: 'transfer',
  calldata: { recipient: '0xabcd', amount: cairo.uint256(10) },
};
const result = outsideExecution.getOutsideCall(call1);
// result = {
//  to: '0x0123',
//  selector: getSelectorFromName(call1.entrypoint),
//  calldata: ['43981', '10', '0'],
//}
```
