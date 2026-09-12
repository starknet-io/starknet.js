# Function: getTypedData()

> **getTypedData**(`chainId`, `options`, `nonce`, `myCalls`, `version`): [`TypedData`](../../RPC/interfaces/TypedData.md)

Defined in: [src/utils/outsideExecution.ts:117](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/outsideExecution.ts#L117)

Build a TypedData message that will be used for an Outside execution.

## Parameters

### chainId

`string`

The encoded string of the name of network.

### options

[`OutsideExecutionOptions`](../../../../interfaces/OutsideExecutionOptions.md)

Parameters related to an Outside Execution.

### nonce

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)

Outside execution nonce (not to confuse with normal transaction nonce).

### myCalls

[`Call`](../../../../type-aliases/Call.md)[]

transaction(s) to proceed.

### version

`"0"` \| `"1"` \| `"2"`

SNIP-9 V1 or V2.

## Returns

[`TypedData`](../../RPC/interfaces/TypedData.md)

SNIP-12 message conform to SNIP-9.

## Example

```typescript
const callOptions: OutsideExecutionOptions = {
  caller: '0x1234',
  execute_after: 100,
  execute_before: 200,
};
const result: TypedData = outsideExecution.getTypedData(
  constants.StarknetChainId.SN_SEPOLIA,
  callOptions,
  21,
  [call1],
  EOutsideExecutionVersion.V2
);
// result = {
//  domain: {
//    chainId: '0x534e5f5345504f4c4941',
//    name: 'Account.execute_from_outside',
//    revision: '1',
//    version: '2',
//  },
//  message: {
//    Caller: '0x1234',
//  ...
```
