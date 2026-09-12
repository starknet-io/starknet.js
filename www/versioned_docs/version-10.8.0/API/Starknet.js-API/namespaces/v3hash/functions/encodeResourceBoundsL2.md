# Function: encodeResourceBoundsL2()

> **encodeResourceBoundsL2**(`bounds`): `bigint`

Defined in: [src/utils/hash/transactionHash/v3.ts:49](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/hash/transactionHash/v3.ts#L49)

Encode the L2 bound of a V3 transaction

## Parameters

### bounds

[`ResourceBoundsBN`](../../../../type-aliases/ResourceBoundsBN.md)

{l1_gas: {max_amount: u64, max_price_per_unit: u128},
l2_gas: {max_amount: u64, max_price_per_unit: u128}}
}

## Returns

`bigint`

encoded data
