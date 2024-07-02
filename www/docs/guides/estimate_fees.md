---
sidebar_position: 11
---

# Estimate fees

By default, all nonfree Starknet commands (declare, deploy, invoke) work without any limitation of cost.

Nevertheless, you might want to inform the DAPP user of the cost of the incoming transaction before proceeding and requesting its validation.

Starknet.js proposes several functions to estimate the fees:

## estimateInvokeFee

To estimate the cost to invoke a contract in the network:

```typescript
const { suggestedMaxFee: estimatedFee1 } = await account0.estimateInvokeFee({
  contractAddress: testAddress,
  entrypoint: 'increase_balance',
  calldata: ['10', '30'],
});
```

The result is in `estimatedFee1`, of type BigInt. Unit is WEI for "legacy" transactions, and FRI for V3 transactions.

The complete answer for a "legacy" transaction :

```typescript
{
  overall_fee: 2499000034986n,
  gas_consumed: 2499n,
  gas_price: 1000000014n,
  unit: 'WEI',
  suggestedMaxFee: 3748500052479n,
  resourceBounds: {
    l2_gas: { max_amount: '0x0', max_price_per_unit: '0x0' },
    l1_gas: { max_amount: '0xabc', max_price_per_unit: '0x59682f15' }
  }
}
```

The complete answer for a V3 transaction :

```typescript
{
  overall_fee: 46098414083169n,
  gas_consumed: 2499n,
  gas_price: 18446744331n,
  unit: 'FRI',
  suggestedMaxFee: 69147621124753n,
  resourceBounds: {
    l2_gas: { max_amount: '0x0', max_price_per_unit: '0x0' },
    l1_gas: { max_amount: '0xabc', max_price_per_unit: '0x671447890' }
  }
}
```

## estimateDeclareFee

To estimate the cost to declare a contract in the network:

```typescript
const { suggestedMaxFee: estimatedFee1 } = await account0.estimateDeclareFee({
  contract: compiledTest,
  classHash: testClassHash,
});
```

The result is in `estimatedFee1`, of type BigInt.

## estimateDeployFee

To estimate the cost to deploy a contract in the network:

```typescript
const { suggestedMaxFee: estimatedFee1 } = await account0.estimateDeployFee({
  classHash: testClassHash,
  // constructorCalldata is not necessary if the contract to deploy has no constructor
  constructorCalldata: callData,
});
```

The result is in `estimatedFee1`, of type BigInt.

## estimateAccountDeployFee

To estimate the cost to deploy an account in the network:

```typescript
const { suggestedMaxFee: estimatedFee1 } = await account0.estimateAccountDeployFee({
  classHash: OZaccountClassHash,
  constructorCalldata: OZaccountConstructorCallData,
  contractAddress: OZcontractAddress,
});
```

The result is in `estimatedFee1`, of type BigInt.

## Fee limitation

In all non-free functions, you can add an optional parameter limiting the fee consumption.  
If the fee has been previously estimated, you can use this value for this parameter, but sometimes this value is under-evaluated: **don't hesitate to add a margin of approximately 10%**:

```typescript
(estimatedFee1 * 11n) / 10n;
```

You can also use the `stark.estimatedFeeToMaxFee` function:

```typescript
import { stark } from 'starknet';
stark.estimatedFeeToMaxFee(estimatedFee1, 0.1);
```

Example for declaring:

```typescript
const { suggestedMaxFee: estimatedFee1 } = await account0.estimateDeclareFee({
  contract: compiledTest,
});

const declareResponse = await account0.declare(
  { contract: compiledTest },
  { maxFee: (estimatedFee1 * 11n) / 10n }
);
```

## Real fee paid

After the processing of the transaction, you can read the fee that has really been paid :

```typescript
const txR = await provider.waitForTransaction(txH);
if (txR.isSuccess()) {
  console.log('Fee paid =', txR.actual_fee);
}
```
