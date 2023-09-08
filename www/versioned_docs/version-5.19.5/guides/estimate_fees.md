---
sidebar_position: 10
---

# Estimate fees

By default, all nonfree Starknet commands (declare, deploy, invoke) work without any limitation of cost.

Nevertheless, you might want to inform the DAPP user of the cost of the incoming transaction before proceeding and requesting its validation.

Starknet.js proposes several functions to estimate the fees:

## estimateDeclareFee

To estimate the cost to declare a contract in the network:

```typescript
const { suggestedMaxFee: estimatedFee1 } = await account0.estimateDeclareFee({
	contract: compiledTest,
	classHash: testClassHash
});
```

The result is in `estimatedFee1`, of type BigInt.

## estimateDeployFee

To estimate the cost to deploy a contract in the network:

```typescript
const { suggestedMaxFee: estimatedFee1 } = await account0.estimateDeployFee({ classHash: testClassHash });
```

The result is in `estimatedFee1`, of type BigInt.

## estimateAccountDeployFee

To estimate the cost to deploy an account in the network:

```typescript
const { suggestedMaxFee: estimatedFee1 } = await account0.estimateAccountDeployFee({
	classHash: OZaccountClashHass,
	constructorCalldata: OZaccountConstructorCallData,
	contractAddress: OZcontractAddress
});
```

The result is in `estimatedFee1`, of type BigInt.

## estimateInvokeFee

To estimate the cost to invoke a contract in the network:

```typescript
const { suggestedMaxFee: estimatedFee1 } = await account0.estimateInvokeFee({
	contractAddress: testAddress,
	entrypoint: "increase_balance",
	calldata: ["10", "30"]
});
```

The result is in `estimatedFee1`, of type BigInt.

## Fee limitation

In all non-free functions, you can add an optional parameter limiting the fee consumption.  
If the fee has been previously estimated, you can use this value for this parameter, but sometimes this value is under-evaluated: **don't hesitate to add a margin of approximately 10%**:

```typescript
estimatedFee1 * 11n / 10n
```

You can also use the `stark.estimatedFeeToMaxFee` function:

```typescript
import { stark } from "starknet";
stark.estimatedFeeToMaxFee(estimatedFee1, 0.1);
```

Example for declaring:

```typescript
const { suggestedMaxFee: estimatedFee1 } = await account0.estimateDeclareFee({ contract: compiledTest });

const declareResponse = await account0.declare({ contract: compiledTest},
  { maxFee: estimatedFee1 * 11n / 10n}
);
```
