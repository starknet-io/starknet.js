---
sidebar_position: 3
---

# Estimate fees

By default, all non-free Starknet commands (declare, deploy, invoke) work without any cost limits.

You might want to inform the DAPP user of the cost of the incoming paid command before proceeding and requesting its validation.

Starknet.js proposes several functions to estimate the fees:

## estimateInvokeFee

To estimate the cost to invoke a contract in the network:

```typescript
const { resourceBounds, overall_fee, unit } = await account0.estimateInvokeFee({
  contractAddress: testAddress,
  entrypoint: 'increase_balance',
  calldata: ['10', '30'],
});
```

`resourceBounds` holds the limits to pass to the transaction, already increased by the configured overhead. `overall_fee`, of type BigInt, is the maximum these limits can cost — the worst case, not the expected cost. `unit` is the currency of that amount, `FRI`.

:::tip
More details about the complex subject of Starknet fees in [Starknet docs](https://docs.starknet.io/architecture-and-concepts/network-architecture/fee-mechanism/)
:::

The complete answer:

```typescript
{
  resourceBounds: {
    l2_gas: { max_amount: 62829120n, max_price_per_unit: 150000000000n },
    l1_gas: { max_amount: 0n, max_price_per_unit: 150000000000n },
    l1_data_gas: { max_amount: 288n, max_price_per_unit: 150000000000n }
  },
  overall_fee: 9424411200000000000n,
  unit: 'FRI'
}
```

Every amount is a `bigint`. Here the node reported 41886080 units of L2 gas at 100000000000 FRI each; with the default 50% overhead applied to both the amount and the price, `resourceBounds` carries 62829120 units at 150000000000 FRI, and `overall_fee` is the sum of `max_amount * max_price_per_unit` over the three resources.

## estimateDeclareFee

To estimate the cost to declare a contract in the network:

```typescript
const { resourceBounds, overall_fee } = await account0.estimateDeclareFee({
  contract: compiledTest,
  classHash: testClassHash,
});
```

The response format is the same as `invoke`.

## estimateDeployFee

To estimate the cost to deploy a contract in the network:

```typescript
const { resourceBounds, overall_fee } = await account0.estimateDeployFee({
  classHash: testClassHash,
  // `constructorCalldata` is not necessary if the contract to deploy has no constructor
  constructorCalldata: callData,
});
```

The response format is the same as `invoke`.

## estimateAccountDeployFee

To estimate the cost to deploy an account in the network:

```typescript
const { resourceBounds, overall_fee } = await account0.estimateAccountDeployFee({
  classHash: OZaccountClassHash,
  constructorCalldata: OZaccountConstructorCallData,
  contractAddress: OZcontractAddress,
});
```

The response format is the same as `invoke`.

## Fee limitation

In some cases, a transaction can fail due to the fees being underestimated. You can increase these limits by setting a global config setting (default values are 50):

```typescript
config.set('resourceBoundsOverhead', {
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
});
```

:::note

- Values are additional percentage: 75 means 75% additional fees.
- To get back to normal values: set all values to 50.
- In v8, `feeMarginPercentage` has been replaced with `resourceBoundsOverhead`.

:::

Example for declaring, with 80% additional fees:

```typescript
config.set('resourceBoundsOverhead', {
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
});
const declareResponse = await account0.declareIfNot({ contract: testSierra, casm: testCasm });
```

## Real fees paid

After a transaction has been processed, you can read the fees that have actually been paid:

```typescript
const txR = await myProvider.waitForTransaction(declareResponse.transaction_hash);
txR.match({
  success: (txR: SuccessfulTransactionReceiptResponse) => {
    console.log('Fees paid =', txR.actual_fee);
  },
  _: () => {},
});
```

The result is:

```json
{ "unit": "FRI", "amount": "0x3a4f43814e180000" }
```
