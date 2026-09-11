# Function: formatSignature()

> **formatSignature**(`sig?`): [`ArraySignatureType`](../../../../type-aliases/ArraySignatureType.md)

Defined in: [src/utils/stark/index.ts:174](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/stark/index.ts#L174)

Format Signature to standard type (hex array)

## Parameters

### sig?

[`Signature`](../../../../type-aliases/Signature.md)

## Returns

[`ArraySignatureType`](../../../../type-aliases/ArraySignatureType.md)

Custom hex string array

## Throws

if sig not defined, or wrong format

## Example

```typescript
const signature = ec.starkCurve.sign('0x12de34', '0x3487123eac');
const result = stark.formatSignature(signature);
// result = ['0xba8eecee2d69c417e8c6a20cf331c821f716b58ba9e47166c7476afdb38997',
//  '0x69ef7438c94104839a6e2aa2385482a77399d2f46e894ae4f50ab6d69239d1c']
```
