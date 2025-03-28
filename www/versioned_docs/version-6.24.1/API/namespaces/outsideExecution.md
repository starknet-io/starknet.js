---
id: 'outsideExecution'
title: 'Namespace: outsideExecution'
sidebar_label: 'outsideExecution'
sidebar_position: 0
custom_edit_url: null
---

## Functions

### getOutsideCall

▸ **getOutsideCall**(`call`): [`OutsideCall`](../interfaces/types.OutsideCall.md)

Converts a Call object to an OutsideCall object that can be used for an Outside Execution.

#### Parameters

| Name   | Type                    | Description             |
| :----- | :---------------------- | :---------------------- |
| `call` | [`Call`](types.md#call) | transaction to proceed. |

#### Returns

[`OutsideCall`](../interfaces/types.OutsideCall.md)

transaction formatted in conformity to SNIP-9

**`Example`**

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

#### Defined in

[src/utils/outsideExecution.ts:35](https://github.com/starknet-io/starknet.js/blob/v6.24.1/src/utils/outsideExecution.ts#L35)

---

### getTypedData

▸ **getTypedData**(`chainId`, `options`, `nonce`, `myCalls`, `version`): [`TypedData`](../interfaces/types.RPC.RPCSPEC07.WALLET_API.TypedData.md)

Build a TypedData message that will be used for an Outside execution.

#### Parameters

| Name      | Type                                                                        | Description                                                             |
| :-------- | :-------------------------------------------------------------------------- | :---------------------------------------------------------------------- |
| `chainId` | `string`                                                                    | The encoded string of the name of network.                              |
| `options` | [`OutsideExecutionOptions`](../interfaces/types.OutsideExecutionOptions.md) | Parameters related to an Outside Execution.                             |
| `nonce`   | [`BigNumberish`](types.md#bignumberish)                                     | Outside execution nonce (not to confuse with normal transaction nonce). |
| `myCalls` | [`Call`](types.md#call)[]                                                   | transaction(s) to proceed.                                              |
| `version` | [`OutsideExecutionVersion`](../enums/types.OutsideExecutionVersion.md)      | SNIP-9 V1 or V2.                                                        |

#### Returns

[`TypedData`](../interfaces/types.RPC.RPCSPEC07.WALLET_API.TypedData.md)

SNIP-12 message conform to SNIP-9.

**`Example`**

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

#### Defined in

[src/utils/outsideExecution.ts:105](https://github.com/starknet-io/starknet.js/blob/v6.24.1/src/utils/outsideExecution.ts#L105)

---

### buildExecuteFromOutsideCallData

▸ **buildExecuteFromOutsideCallData**(`outsideTransaction`): [`Calldata`](types.md#calldata)

Builds a Calldata for the execute_from_outside() entrypoint.

#### Parameters

| Name                 | Type                                                              | Description                                                   |
| :------------------- | :---------------------------------------------------------------- | :------------------------------------------------------------ |
| `outsideTransaction` | [`OutsideTransaction`](../interfaces/types.OutsideTransaction.md) | an object that contains all the data for a Outside Execution. |

#### Returns

[`Calldata`](types.md#calldata)

The Calldata related to this Outside transaction

**`Example`**

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

#### Defined in

[src/utils/outsideExecution.ts:163](https://github.com/starknet-io/starknet.js/blob/v6.24.1/src/utils/outsideExecution.ts#L163)

---

### buildExecuteFromOutsideCall

▸ **buildExecuteFromOutsideCall**(`outsideTransaction`): [`Call`](types.md#call)[]

Builds a Call for execute(), estimateFee() and simulateTransaction() functions.

#### Parameters

| Name                 | Type                                                                                                    | Description                                                    |
| :------------------- | :------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------- |
| `outsideTransaction` | [`AllowArray`](types.md#allowarray)<[`OutsideTransaction`](../interfaces/types.OutsideTransaction.md)\> | an object that contains all the data for an Outside Execution. |

#### Returns

[`Call`](types.md#call)[]

The Call related to this Outside transaction

**`Example`**

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

#### Defined in

[src/utils/outsideExecution.ts:197](https://github.com/starknet-io/starknet.js/blob/v6.24.1/src/utils/outsideExecution.ts#L197)
