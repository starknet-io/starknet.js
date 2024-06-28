---
sidebar_position: 19
---

# Outside Execution (SNIP-9)

Outside Execution, also known as meta-transactions, allows a protocol to submit transactions on behalf of a user account, as long as they have the relevant signatures. This feature is implemented according to [SNIP-9](https://github.com/starknet-io/SNIPs/blob/main/SNIPS/snip-9.md).

## Why Use Outside Execution?

Outside Execution provides several benefits:

1. **Delayed Orders**: Protocols can have more atomic control over transaction execution, useful for scenarios like matching limit orders.
2. **Fee Subsidy**: The sender of the transaction pays gas fees, allowing accounts without gas tokens to still execute transactions.

## Using Outside Execution

### Check SNIP-9 Support

Before using Outside Execution, check if the account supports it:

```typescript
const account = new Account(provider, address, privateKey);
const version = await account.getSnip9Version();

if (version) {
  console.log(`Account supports SNIP-9 version ${version}`);
} else {
  console.log('Account does not support SNIP-9');
}
```

### Create an OutsideExecution Object

To create an OutsideExecution object, you need to prepare the calls and options:

```typescript
import { OutsideExecution, OutsideExecutionOptions } from 'starknet';

const calls = [
  {
    contractAddress: erc20Address,
    entrypoint: 'transfer',
    calldata: {
      recipient: recipientAddress,
      amount: cairo.uint256(100),
    },
  },
];

const options: OutsideExecutionOptions = {
  caller: senderAddress,
  nonce: await account.getNonce(),
  execute_after: Math.floor(Date.now() / 1000) - 3600, // 1 hour ago
  execute_before: Math.floor(Date.now() / 1000) + 3600, // 1 hour from now
};

const outsideExecution = new OutsideExecution(calls, options);
```

### Sign the Outside Execution

The account owner needs to sign the Outside Execution:

```typescript
const chainId = await account.getChainId();
const data = outsideExecution.getTypedData(chainId, version);
const signature = await account.signMessage(data);
```

### Execute the Outside Execution

Finally, execute the Outside Execution from another account:

```typescript
const senderAccount = new Account(provider, senderAddress, senderPrivateKey);
const response = await senderAccount.executeFromOutside(
  outsideExecution,
  signature,
  account.address,
  {},
  version
);

await provider.waitForTransaction(response.transaction_hash);
```

## Related Documentation

- [Signatures](./signature.md)
- [Accounts](./accounts.md)
