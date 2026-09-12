# Function: getLedgerPathBuffer221()

> **getLedgerPathBuffer221**(`accountId`, `applicationName?`): `Uint8Array`

Defined in: [src/signer/ledgerSigner221.ts:460](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/signer/ledgerSigner221.ts#L460)

Format the Ledger wallet path to an Uint8Array.
for a Ledger Starknet DAPP v2.2.0
EIP2645 path = 2645'/starknet'/application'/0'/accountId'/0

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
const result = getLedgerPathBuffer211(0);
// result = Uint8Array(24) [
  128,   0,  10,  85, 199, 65, 233, 201,
  171, 206, 231, 219, 128,  0,   0,   0,
  128,   0,   0,   0,   0,  0,   0,   0
]
```
