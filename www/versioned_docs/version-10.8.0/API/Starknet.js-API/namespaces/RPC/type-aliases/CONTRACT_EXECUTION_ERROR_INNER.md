# Type Alias: CONTRACT_EXECUTION_ERROR_INNER

> **CONTRACT_EXECUTION_ERROR_INNER** = \{ `contract_address`: [`ADDRESS`](ADDRESS.md); `class_hash`: [`FELT`](FELT.md); `selector`: [`FELT`](FELT.md); `error`: [`CONTRACT_EXECUTION_ERROR`](CONTRACT_EXECUTION_ERROR.md); \} \| `string`

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/api/components.d.ts:1240

structured error that can later be processed by wallets or sdks.
error frame or the error raised during execution
