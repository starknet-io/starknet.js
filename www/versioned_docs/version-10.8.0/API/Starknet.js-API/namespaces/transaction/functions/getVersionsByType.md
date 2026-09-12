# Function: getVersionsByType()

> **getVersionsByType**(`versionType?`): \{ `v3`: `"0x100000000000000000000000000000003"`; \} \| \{ `v3`: `"0x3"`; \}

Defined in: [src/utils/transaction/transaction.ts:176](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/transaction/transaction.ts#L176)

Return transaction versions based on version type, default version type is 'transaction'.

## Parameters

### versionType?

`"fee"` \| `"transaction"`

the type of version ("fee" or "transaction")

## Returns

\{ `v3`: `"0x100000000000000000000000000000003"`; \} \| \{ `v3`: `"0x3"`; \}

an object containing the transaction versions.

## Example

```typescript
const result = transaction.getVersionsByType('fee');
// result = {
//   v1: '0x100000000000000000000000000000001',
//   v2: '0x100000000000000000000000000000002',
//   v3: '0x100000000000000000000000000000003'
// }
```
