---
sidebar_position: 101
---

# Migrate from v5 to v6

This document only covers the features present in v5 which have changed in some significant way in v6.

If you encounter any missing changes, please let us know and we will update this guide.

## Transaction receipt

When sending a transaction, the receipt type has changed.
In V5, it's an object that can have varied definitions, depending of the status and the type of transaction.
In V6, this object is in `TxR.value`, and several helpers are available (`.statusReceipt`, `isSuccess()`, `isRejected()`, `isReverted()`, `.isError()`, `match`, ...)

```typescript
const response = await ethContract.approve(swapContractAddress, cairo.uint256(100000));
const transactionReceipt = await provider.waitForTransaction(response.transaction_hash);

// v5 : transactionReceipt is just an object
{
type: 'INVOKE',
  transaction_hash: '0x5286217518c621581ac85505a99ffe182ce1114abaa8fce8b418d2b27c3c04c',
  actual_fee: { unit: 'WEI', amount: '0x1c1902fe99800' },
  messages_sent: [],
  execution_status: 'SUCCEEDED',
  finality_status: 'ACCEPTED_ON_L2',
  // ...
}
// v6 : transactionReceipt is an object + helpers
const receipt = transactionReceipt.value;
const status: boolean = transactionReceipt.isSuccess();

```

> See this [guide](./interact.md#transaction-receipt-response)

## Long strings

Starknet.js v6 is compatible with Cairo v2.4.0. It means that long strings (>31 characters) are automatically handled and converted to the Cairo `ByteArray` type.
This means that the approach to convert a long string to an array of felts (for Cairo 0 contracts for example) has changed:

```typescript
// v5
const feltArray: BigNumberish[] = CallData.compile(
  'http://addressOfMyERC721pictures/storage/image1.jpg'
);

// v6
const feltArray: BigNumberish[] = CallData.compile(
  shortString.splitLongString('http://addressOfMyERC721pictures/storage/image1.jpg')
);
```

## Fees

All functions related to gas price and fee estimation have changed output types.

For example, if you read the content of a block with v5 the ETH gas price was a top level property, with v6 the same information is nested a level deeper:

```typescript
const resp: GetBlockResponse = await myProvider.getBlock('latest');

// v5
const gasPrice = resp.gas_price;

// v6
const gasPrice = resp.l1_gas_price.price_in_wei;
```

Another example is `estimateDeclareFee()` where the response object has changed:

```typescript
const fee = await account0.estimateDeclareFee({ contract: compiledContract });

// v5 response
fee = {
  overall_fee: 247700000000000n,
  gas_consumed: 2477n,
  gas_price: 100000000000n,
  suggestedMaxFee: 371550000000000n,
};

// v6 response
fee = {
  overall_fee: 247700000000000n,
  gas_consumed: 2477n,
  gas_price: 100000000000n,
  unit: undefined,
  suggestedMaxFee: 371550000000000n,
  resourceBounds: {
    l2_gas: { max_amount: '0x0', max_price_per_unit: '0x0' },
    l1_gas: { max_amount: '0xaa4', max_price_per_unit: '0x22ecb25c00' },
  },
};
```

You have to adapt your code to all these new entries.
In general, pay attention to the result types of methods that return a response from an RPC node.

<br/>
<hr/>

For the old v4 to v5 migration instructions check [here](./migrate_v4).
