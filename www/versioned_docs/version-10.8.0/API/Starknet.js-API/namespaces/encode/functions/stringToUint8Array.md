# Function: stringToUint8Array()

> **stringToUint8Array**(`str`): `Uint8Array`

Defined in: [src/utils/encode.ts:403](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/encode.ts#L403)

Convert any string to Uint8Array

Handles three types of strings:

- Hex strings (e.g., '0x123f') - converts hex bytes to Uint8Array
- Decimal strings (e.g., '124324332') - converts decimal number to bytes
- Text strings (e.g., 'I am cool ☥') - converts UTF-8 text to bytes

## Parameters

### str

`string`

The string to convert

## Returns

`Uint8Array`

The converted byte array

## Example

```typescript
// Hex string
const hex = stringToUint8Array('0x48656c6c6f');
// result = Uint8Array(5) [ 72, 101, 108, 108, 111 ]

// Decimal string
const decimal = stringToUint8Array('256');
// result = Uint8Array(2) [ 1, 0 ]

// Text string
const text = stringToUint8Array('Hello ☥');
// result = UTF-8 encoded bytes
```
