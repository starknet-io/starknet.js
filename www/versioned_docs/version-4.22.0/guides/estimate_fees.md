---
sidebar_position: 10
---

# Estimate fees

By default, all non free Starknet commands (declare, deploy, invoke) work without any limitation of cost.

Nevertheless, you might want to inform the DAPP user of the cost of the incoming transaction before proceeding, and request its validation.

Starknet.js proposes several functions to estimate the fees:

## estimateDeclareFee

To estimate the cost to declare a contract in the network:

```typescript
const { suggestedMaxFee: estimatedFee1 } = await account0.estimateDeclareFee({
	contract: compiledTest,
	classHash: testClassHash
});
```

The result is in `estimatedFee1`, of type BN.

## estimateDeployFee

To estimate the cost to deploy a contract in the network:

```typescript
const { suggestedMaxFee: estimatedFee1 } = await account0.estimateDeployFee({ classHash: testClassHash });
```

The result is in `estimatedFee1`, of type BN.

## estimateAccountDeployFee

To estimate the cost to deploy an account in the network:

```typescript
const { suggestedMaxFee: estimatedFee1 } = await account0.estimateAccountDeployFee({
	classHash: OZaccountClashHass,
	constructorCalldata: OZaccountConstructorCallData,
	contractAddress: OZcontractAddress
});
```

The result is in `estimatedFee1`, of type BN.

## estimateInvokeFee

To estimate the cost to invoke a contract in the network:

```typescript
const { suggestedMaxFee: estimatedFee1 } = await account0.estimateInvokeFee({
	contractAddress: testAddress,
	entrypoint: "increase_balance",
	calldata: ["10", "30"]
});
```

The result is in `estimatedFee1`, of type BN.

## Fee limitation

In all non-free functions, you can add an optional parameter limiting the fee consumption.  
If the fee has been previously estimated, you can use this value for this parameter, **but do not forget to add a margin of approximately 10%**:

```typescript
import BN from "bn.js";
estimatedFee1.mul(new BN(11)).div(new BN(10))
```

You can also use the `stark.estimatedFeeToMaxFee` function:

```typescript
import { stark } from "starknet";
stark.estimatedFeeToMaxFee(estimatedFee1, 0.1)
```

Example for declare:

```typescript
const { suggestedMaxFee: estimatedFee1 } = await account0.estimateDeclareFee({
	contract: compiledTest,
	classHash: testClassHash
});

const declareResponse = await account0.declare(
  {
    contract: compiledTest,
    classHash: testClassHash
  },
  {
    maxFee: estimatedFee1.mul(new BN(11)).div(new BN(10))
  }
);
```
