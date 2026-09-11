# Type Alias: NewTransactionEvent

> **NewTransactionEvent** = `object`

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:182

Notification to the client of a new transaction, with its current finality status

## Properties

### subscription_id

> **subscription_id**: [`SUBSCRIPTION_ID`](SUBSCRIPTION_ID.md)

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:183

---

### result

> **result**: [`TXN_WITH_HASH`](TXN_WITH_HASH.md) & `object`

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:187

A transaction and its current finality status

#### Type Declaration

##### finality_status

> **finality_status**: [`TXN_STATUS_WITHOUT_L1`](TXN_STATUS_WITHOUT_L1.md)
