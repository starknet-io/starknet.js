# Function: getLedgerPathBuffer111()

> **getLedgerPathBuffer111**(`accountId`, `applicationName?`): `Uint8Array`

Defined in: [src/signer/ledgerSigner111.ts:337](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/signer/ledgerSigner111.ts#L337)

Format the Ledger wallet path to an Uint8Array
for a Ledger Starknet DAPP v1.1.1.

EIP2645 path = 2645'/starknet/application/0/accountId/0

## Parameters

### accountId

`number`

Id of account. < 2\*\*31.

### applicationName?

`string` = `'LedgerW'`

utf8 string of application name.

## Returns

`Uint8Array`

an Uint8array of 24 bytes.

## Example

```typescript
const result = getLedgerPathBuffer111(0);
// result = Uint8Array(24) [
  128,   0,  10,  85,  71, 65, 233, 201,
   43, 206, 231, 219,   0,  0,   0,   0,
    0,   0,   0,   0,   0,  0,   0,   0
]
```
