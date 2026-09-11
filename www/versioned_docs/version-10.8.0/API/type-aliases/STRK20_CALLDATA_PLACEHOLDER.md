# Type Alias: STRK20_CALLDATA_PLACEHOLDER

> **STRK20_CALLDATA_PLACEHOLDER** = `string`

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/wallet-api/components.d.ts:177

A wallet-resolved placeholder that the wallet substitutes with a single felt
during STRK20 action assembly. ${openNoteIds[N]} expands to the ID of the Nth
open note in the same transaction (i.e. the Nth transfer action with amount
"OPEN"); ${poolAddress} expands to the privacy pool contract address. N is a
zero-based index.

## Pattern

^\${(?:openNoteIds\[[0-9]+\]|poolAddress)}$
