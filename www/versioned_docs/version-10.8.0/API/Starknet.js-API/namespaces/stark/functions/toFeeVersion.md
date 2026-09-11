# Function: toFeeVersion()

> **toFeeVersion**(`providedVersion?`): [`ETransactionVersion`](../../RPC/namespaces/RPCSPEC09/type-aliases/ETransactionVersion.md) \| `undefined`

Defined in: [src/utils/stark/index.ts:452](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/stark/index.ts#L452)

Convert Transaction version to Fee version or throw an error

## Parameters

### providedVersion?

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)

0..3 number representing the transaction version

## Returns

[`ETransactionVersion`](../../RPC/namespaces/RPCSPEC09/type-aliases/ETransactionVersion.md) \| `undefined`

the fee estimation version corresponding to the transaction version provided

## Throws

if the transaction version is unknown

## Example

```typescript
const result = stark.toFeeVersion(2);
// result = "0x100000000000000000000000000000002"
```
