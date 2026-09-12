# Type Alias: L1L2MessageStatus

> **L1L2MessageStatus** = `object`

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/api/nonspec.d.ts:103

Ethereum l1_handler tx hash and status for L1 -> L2 messages sent by the l1 transaction

## Properties

### transaction_hash

> **transaction_hash**: [`TXN_HASH`](TXN_HASH.md)

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/api/nonspec.d.ts:107

l1_handler tx hash

---

### finality_status

> **finality_status**: [`TXN_FINALITY_STATUS`](TXN_FINALITY_STATUS.md)

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/api/nonspec.d.ts:111

finality status of the L1 -> L2 messages sent by the l1 transaction

---

### execution_status

> **execution_status**: [`TXN_EXECUTION_STATUS`](TXN_EXECUTION_STATUS.md)

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/api/nonspec.d.ts:115

the failure reason, only appears if finality_status is REJECTED

---

### failure_reason?

> `optional` **failure_reason?**: `string`

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/api/nonspec.d.ts:119

The failure reason. Only appears if `execution_status` is REVERTED
