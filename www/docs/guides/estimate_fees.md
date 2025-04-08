---
sidebar_position: 11
---

# Estimate fees

By default, all non-free Starknet commands (declare, deploy, invoke) work without any limitation of cost.

You might want to inform the DAPP user of the cost of the incoming paid command before proceeding and requesting its validation.

Starknet.js proposes several functions to estimate the fees:

## estimateInvokeFee

To estimate the cost to invoke a contract in the network:

```typescript
const { suggestedMaxFee, unit } = await account0.estimateInvokeFee({
  contractAddress: testAddress,
  entrypoint: 'increase_balance',
  calldata: ['10', '30'],
});
```

The result is in `suggestedMaxFee`, of type BigInt. The unit of this number is in `unit`. it's WEI for "legacy" transactions, and FRI for V3 transactions.

:::tip
More details about the complex subject of Starknet fees in [Starknet docs](https://docs.starknet.io/architecture-and-concepts/network-architecture/fee-mechanism/)
:::

The complete answer for a rpc 0.7 "legacy" transaction :

```typescript
{
  overall_fee: 123900000000000n,
  unit: 'WEI',
  l1_gas_consumed: 1047n,
  l1_gas_price: 100000000000n,
  l1_data_gas_consumed: 192n,
  l1_data_gas_price: 100000000000n,
  suggestedMaxFee: 185850000000000n,
  resourceBounds: {
    l2_gas: { max_amount: '0x0', max_price_per_unit: '0x0' },
    l1_gas: { max_amount: '0x742', max_price_per_unit: '0x22ecb25c00' }
  }
}
```

The complete answer for a rpc 0.7 V3 transaction :

```typescript
{
  overall_fee: 123900000000000n,
  unit: 'FRI',
  l1_gas_consumed: 1047n,
  l1_gas_price: 100000000000n,
  l1_data_gas_consumed: 192n,
  l1_data_gas_price: 100000000000n,
  suggestedMaxFee: 185850000000000n,
  resourceBounds: {
    l2_gas: { max_amount: '0x0', max_price_per_unit: '0x0' },
    l1_gas: { max_amount: '0x742', max_price_per_unit: '0x22ecb25c00' }
  }
}
```

The complete answer for a rpc 0.8 V3 transaction :

```typescript
{
  overall_fee: 4188627200000000000n,
  unit: 'FRI',
  l1_gas_consumed: 0n,
  l1_gas_price: 100000000000n,
  l2_gas_consumed: 41886080n,
  l2_gas_price: 100000000000n,
  l1_data_gas_consumed: 192n,
  l1_data_gas_price: 100000000000n,
  suggestedMaxFee: 6282940800000000000n,
  resourceBounds: {
    l2_gas: { max_amount: '0x3beb240', max_price_per_unit: '0x22ecb25c00' },
    l1_gas: { max_amount: '0x0', max_price_per_unit: '0x22ecb25c00' },
    l1_data_gas: { max_amount: '0x120', max_price_per_unit: '0x22ecb25c00' }
  }
}
```

## estimateDeclareFee

To estimate the cost to declare a contract in the network:

```typescript
const { suggestedMaxFee } = await account0.estimateDeclareFee({
  contract: compiledTest,
  classHash: testClassHash,
});
```

The result is in `suggestedMaxFee`, of type BigInt. Units and full response format are the same than `invoke`.

## estimateDeployFee

To estimate the cost to deploy a contract in the network:

```typescript
const { suggestedMaxFee } = await account0.estimateDeployFee({
  classHash: testClassHash,
  // `constructorCalldata` is not necessary if the contract to deploy has no constructor
  constructorCalldata: callData,
});
```

The result is in `suggestedMaxFee`, of type BigInt. Units and full response format are the same than `invoke`.

## estimateAccountDeployFee

To estimate the cost to deploy an account in the network:

```typescript
const { suggestedMaxFee } = await account0.estimateAccountDeployFee({
  classHash: OZaccountClassHash,
  constructorCalldata: OZaccountConstructorCallData,
  contractAddress: OZcontractAddress,
});
```

The result is in `suggestedMaxFee`, of type BigInt. Units and full response format are the same than `invoke`.

## Fee limitation

In some cases, a transaction can fail due to underestimation of the fees. You can increase these limits by setting a global config setting (default values are 50) :

```typescript
config.set('feeMarginPercentage', {
  bounds: {
    l1_gas: {
      max_amount: 75,
      max_price_per_unit: 60,
    },
    l2_gas: {
      max_amount: 100,
      max_price_per_unit: 60,
    },
    l1_data_gas: {
      max_amount: 80,
      max_price_per_unit: 70,
    },
  },
  maxFee: 22,
});
```

:::note

- Values are additional percentage: 75 means 75% additional fees.
- To get back to normal values: set all values to 50.
  :::

Example for declaring, with 80% additional fees:

```typescript
config.set('feeMarginPercentage', {
  bounds: {
    l1_gas: {
      max_amount: 80,
      max_price_per_unit: 80,
    },
    l2_gas: {
      max_amount: 80,
      max_price_per_unit: 80,
    },
    l1_data_gas: {
      max_amount: 80,
      max_price_per_unit: 80,
    },
  },
  maxFee: 80,
});
const declareResponse = await account0.declareIfNot({ contract: testSierra, casm: testCasm });
```

## Real fees paid

After the processing of the transaction, you can read the fees that have really been paid :

```typescript
const txR = await provider.waitForTransaction(declareResponse.transaction_hash);
txR.match({
  success: (txR: SuccessfulTransactionReceiptResponse) => {
    console.log('Fees paid =', txR.actual_fee);
  },
  _: () => {},
});
```

For STRK fees, the result is:

```json
{ "unit": "FRI", "amount": "0x3a4f43814e180000" }
```

For ETH fees :

```json
{ "unit": "WEI", "amount": "0x70c6fff3c000" }
```
