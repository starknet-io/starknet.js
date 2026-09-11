# Function: signatureToDecimalArray()

> **signatureToDecimalArray**(`sig?`): [`ArraySignatureType`](../../../../type-aliases/ArraySignatureType.md)

Defined in: [src/utils/stark/index.ts:200](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/stark/index.ts#L200)

Format Signature to decimal string array

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
const result = stark.signatureToDecimalArray(signature);
// result = ['329619989660444495690615805546674399714973829707166906185976654753023887767',
//  '2994745480203297689255012826403147585778741462125743754529207781488706428188']
```
