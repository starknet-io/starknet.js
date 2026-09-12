# Function: intDAM()

> **intDAM**(`dam`): [`EDAMode`](../../RPC/type-aliases/EDAMode.md)

Defined in: [src/utils/stark/index.ts:409](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/stark/index.ts#L409)

Converts the data availability mode from EDataAvailabilityMode to EDAMode.

## Parameters

### dam

[`EDataAvailabilityMode`](../../RPC/type-aliases/EDataAvailabilityMode.md)

The data availability mode to be converted.

## Returns

[`EDAMode`](../../RPC/type-aliases/EDAMode.md)

The converted data availability mode.

## Throws

If the data availability mode is not a valid value.

## Example

```typescript
const result = stark.intDAM(RPC.EDataAvailabilityMode.L1);
// result = 0
```
