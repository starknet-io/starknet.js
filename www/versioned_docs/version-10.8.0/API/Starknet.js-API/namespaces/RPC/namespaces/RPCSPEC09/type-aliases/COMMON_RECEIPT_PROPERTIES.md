# Type Alias: COMMON_RECEIPT_PROPERTIES

> **COMMON_RECEIPT_PROPERTIES** = `object` & `SimpleOneOf`\<`SUCCESSFUL_COMMON_RECEIPT_PROPERTIES`, `REVERTED_COMMON_RECEIPT_PROPERTIES`\>

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:566

Common properties shared by all transaction receipts

## Type Declaration

### transaction_hash

> **transaction_hash**: [`TXN_HASH`](TXN_HASH.md)

### actual_fee

> **actual_fee**: [`FEE_PAYMENT`](FEE_PAYMENT.md)

### finality_status

> **finality_status**: [`TXN_FINALITY_STATUS`](TXN_FINALITY_STATUS.md)

### messages_sent

> **messages_sent**: [`MSG_TO_L1`](MSG_TO_L1.md)[]

### events

> **events**: [`EVENT`](EVENT.md)[]

### execution_resources

> **execution_resources**: [`EXECUTION_RESOURCES`](EXECUTION_RESOURCES.md)
