# Function: stringToSha256ToArrayBuff4()

> **stringToSha256ToArrayBuff4**(`str`): `Uint8Array`

Defined in: [src/utils/num.ts:372](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/num.ts#L372)

Calculate the sha256 hash of an utf8 string, then encode the
result in an uint8Array of 4 elements.
Useful in wallet path calculation.

## Parameters

### str

`string`

utf8 string (hex string not handled).

## Returns

`Uint8Array`

a uint8Array of 4 bytes.

## Example

```typescript
const ledgerPathApplicationName = 'LedgerW';
const path2Buffer = num.stringToSha256ToArrayBuff4(ledgerPathApplicationName);
// path2Buffer = Uint8Array(4) [43, 206, 231, 219]
```
