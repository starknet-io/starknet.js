# Function: hexToBytes()

> **hexToBytes**(`str`): `Uint8Array`

Defined in: [src/utils/num.ts:328](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/num.ts#L328)

Convert hex-string to an array of Bytes (Uint8Array)

## Parameters

### str

`string`

hex-string

## Returns

`Uint8Array`

array containing the converted elements

## Throws

str must be a hex-string

## Example

```typescript
let result;

result = hexToBytes('0x64');
// result = [100]

result = hexToBytes('test');
// throws Error: test needs to be a hex-string
```
