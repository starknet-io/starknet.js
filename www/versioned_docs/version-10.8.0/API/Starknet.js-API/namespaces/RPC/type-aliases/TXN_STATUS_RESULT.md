# Type Alias: TXN_STATUS_RESULT

> **TXN_STATUS_RESULT** = `object`

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/api/components.d.ts:1467

Transaction status result, including finality status and execution status

## Properties

### finality_status

> **finality_status**: [`TXN_STATUS`](TXN_STATUS.md)

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/api/components.d.ts:1468

---

### execution_status?

> `optional` **execution_status?**: [`TXN_EXECUTION_STATUS`](TXN_EXECUTION_STATUS.md)

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/api/components.d.ts:1469

---

### failure_reason?

> `optional` **failure_reason?**: `string`

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/api/components.d.ts:1473

The failure reason, only appears if execution_status is REVERTED
