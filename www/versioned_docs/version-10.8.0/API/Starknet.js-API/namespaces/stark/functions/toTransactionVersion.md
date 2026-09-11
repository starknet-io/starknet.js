# Function: toTransactionVersion()

> **toTransactionVersion**(`defaultVersion`, `providedVersion?`): [`ETransactionVersion3`](../../RPC/namespaces/RPCSPEC09/type-aliases/ETransactionVersion3.md)

Defined in: [src/utils/stark/index.ts:428](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/stark/index.ts#L428)

Convert input versions to ETransactionVersion or throw an error.
Returns providedVersion if specified, otherwise returns defaultVersion.

## Parameters

### defaultVersion

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)

The default transaction version to use if providedVersion is not specified

### providedVersion?

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)

Optional transaction version that takes precedence if provided

## Returns

[`ETransactionVersion3`](../../RPC/namespaces/RPCSPEC09/type-aliases/ETransactionVersion3.md)

The transaction version - either providedVersion if specified or defaultVersion

## Throws

If either version is not a valid ETransactionVersion

## Example

```typescript
const result = stark.toTransactionVersion(
  '0x100000000000000000000000000000003',
  stark.toFeeVersion(2)
);
// result = "0x100000000000000000000000000000002"
```
