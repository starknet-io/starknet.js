# Function: isPreConfirmedBlock()

> **isPreConfirmedBlock**(`response`): `response is { transactions: string[]; block_number: number; timestamp: number; sequencer_address: string; l1_gas_price: RESOURCE_PRICE; l2_gas_price: RESOURCE_PRICE; l1_data_gas_price: RESOURCE_PRICE; l1_da_mode: L1_DA_MODE; starknet_version: string }`

Defined in: [src/utils/resolve.ts:176](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/resolve.ts#L176)

Guard Pre Confirmed Block

## Parameters

### response

[`GetBlockResponse`](../type-aliases/GetBlockResponse.md)

answer of myProvider.getBlock()

## Returns

`response is { transactions: string[]; block_number: number; timestamp: number; sequencer_address: string; l1_gas_price: RESOURCE_PRICE; l2_gas_price: RESOURCE_PRICE; l1_data_gas_price: RESOURCE_PRICE; l1_da_mode: L1_DA_MODE; starknet_version: string }`

true if block is the pre confirmed block

## Example

```typescript
const block = await myProvider.getBlock('pre_confirmed');
const result = provider.isPreConfirmedBlock(block);
// result = true
```
