# Function: assertCallsAreStrictlyEqual()

> **assertCallsAreStrictlyEqual**(`originalCalls`, `unsafeCalls`, `isSponsored?`): `void`

Defined in: [src/utils/paymaster.ts:98](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/paymaster.ts#L98)

Asserts that the given calls are strictly equal, otherwise throws an error.

## Parameters

### originalCalls

[`Call`](../../../../type-aliases/Call.md)[]

The original calls.

### unsafeCalls

([`OutsideCallV1`](../../RPC/type-aliases/OutsideCallV1.md) \| [`OutsideCallV2`](../../RPC/type-aliases/OutsideCallV2.md))[]

The unsafe calls.

### isSponsored?

`boolean` = `false`

Whether the transaction is sponsored. A sponsored
transaction appends no gas-token fee-transfer call; a non-sponsored one appends exactly
one. Defaults to `false` for backward compatibility.

## Returns

`void`

## Throws

Throws an error if the calls are not strictly equal.

## Example

```typescript
paymaster.assertCallsAreStrictlyEqual(originalCalls, unsafeCalls, true); // sponsored: no fee call
```
