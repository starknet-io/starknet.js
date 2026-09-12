# Type Alias: FEE_ESTIMATE_COMMON

> **FEE_ESTIMATE_COMMON** = `object`

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:769

## Properties

### l1_gas_consumed

> **l1_gas_consumed**: [`u64`](u64.md)

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:774

The Ethereum gas consumption of the transaction, charged for L1->L2 messages and, depending on the block's DA_MODE, state diffs.
Prev. name gas_consumed

---

### l1_gas_price

> **l1_gas_price**: [`u128`](u128.md)

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:779

The gas price (in wei or fri, depending on the tx version) that was used in the cost estimation.
Prev. name gas_price

---

### l2_gas_consumed

> **l2_gas_consumed**: [`u64`](u64.md)

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:783

The L2 gas consumption of the transaction.

---

### l2_gas_price

> **l2_gas_price**: [`u128`](u128.md)

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:787

The L2 gas price (in wei or fri, depending on the tx version) that was used in the cost estimation.

---

### l1_data_gas_consumed

> **l1_data_gas_consumed**: [`u64`](u64.md)

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:792

The Ethereum data gas consumption of the transaction.
Prev. name data_gas_consumed

---

### l1_data_gas_price

> **l1_data_gas_price**: [`u128`](u128.md)

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:797

The data gas price (in wei or fri, depending on the tx version) that was used in the cost estimation.
Prev. name data_gas_price

---

### overall_fee

> **overall_fee**: [`u128`](u128.md)

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:801

The estimated fee for the transaction (in wei or fri, depending on the tx version), equals to l1_gas_consumed*l1_gas_price + l1_data_gas_consumed*l1_data_gas_price + l2_gas_consumed\*l2_gas_price
