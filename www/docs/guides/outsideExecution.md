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

The account that will sign the outside transaction has to be compatible with SNIP-9 (V1 or V2).  
At mid-2024 :

|    account     | compatibility |
| :------------: | :-----------: |
| ArgentX v0.3.0 |      v1       |
| ArgentX v0.4.0 |      v2       |
| Braavos v1.0.0 |      v2       |
|  OpenZeppelin  |      ❌       |

Before using Outside Execution, check if the account that will sign the transaction supports SNIP-9:

```typescript
const signerAccount = new Account(myProvider, accountAddress, privateKey);
const version = await signerAccount.getSnip9Version();
if (version === EOutsideExecutionVersion.UNSUPPORTED) {
  throw new Error('This account is not SNIP-9 compatible.');
}
```

:::info
The account that will sign the transaction needs to be compatible with SNIP-9.  
Nevertheless, the account that will execute the transaction do not needs to be SNIP-9 compatible ; it just needs to have enough fees to pay the transaction.
:::

### Create an `OutsideTransaction` Object

To create an OutsideExecution object, you need first to prepare the call:

```typescript
const call1: Call = {
  contractAddress: erc20Address,
  entrypoint: 'transfer',
  calldata: {
    recipient: recipientAddress,
    amount: cairo.uint256(3n * 10n ** 16n),
  },
};
```

Then, you have to initialize some parameters :

- The `caller` is the address of the account that will execute the outside transaction.
- The transaction can be executed in a time frame that is defined in `execute_after` and `execute_before`, using Unix timestamp.

```typescript
const callOptions: OutsideExecutionOptions = {
  caller: executorAccount.address,
  execute_after: Math.floor(Date.now() / 1000) - 3600, // 1 hour ago
  execute_before: Math.floor(Date.now() / 1000) + 3600, // 1 hour from now
};
```

:::warning
You can use the string `"ANY_CALLER"` as content of the `caller` property. To use with care, as anybody that get your `OutsideTransaction` object and execute it.
:::

To create the `OutsideTransaction` object, you just have to use:

```typescript
const outsideTransaction1: OutsideTransaction = await signerAccount.getOutsideTransaction(
  callOptions,
  call1
);
```

:::note
In the same `OutsideTransaction` object, you can include several transactions. So, with only one signature of the signer Account, you can generate an `OutsideTransaction` object that performs many things:

```typescript
const callOptions: OutsideExecutionOptions = {
  caller: executorAccount.address,
  execute_after: 100,
  execute_before: 200,
};
const call1 = {
  contractAddress: ethAddress,
  entrypoint: 'approve',
  calldata: {
    spender: account2.address,
    amount: cairo.uint256(2n * 10n ** 16n),
  },
};
const call2 = {
  contractAddress: ethAddress,
  entrypoint: 'transfer',
  calldata: {
    recipient: account1.address,
    amount: cairo.uint256(1n * 10n ** 16n),
  },
};
const outsideTransaction1: OutsideTransaction = await signerAccount.getOutsideTransaction(
  callOptions,
  [call1, call2]
);
```

:::

### Process the Outside Execution

Finally, if you are in the time frame, you can perform the Outside Execution, using the executor Account :

```typescript
const executorAccount = new Account(provider, executorAddress, executorPrivateKey);
const response = await executorAccount.executeFromOutside(outsideTransaction1);
await provider.waitForTransaction(response.transaction_hash);
```

:::info
If you have created several `OutsideTransaction` objects using the same signer account, you can execute them in any order (no nonce problems).
:::

:::note
In the same command, you can use several `OutsideTransaction` objects created by several signer accounts, even if they are not compatible with the same version of SNIP-9 (V1 or V2):

```typescript
const outsideTransaction1: OutsideTransaction = await accountAX3.getOutsideTransaction(
  callOptions,
  call1
); // V1 compatible
const outsideTransaction2: OutsideTransaction = await accountAX4.getOutsideTransaction(
  callOptions,
  call2
); // V2 compatible
const res = await executorAccount.executeFromOutside([outsideTransaction1, outsideTransaction2]);
```

:::

## Example of Outside Execution using a Ledger Nano

In this example, we want to sign, with a Ledger Nano X, several transactions at 6PM. Then a code is automatically launched each hour until the next day at 8AM, verifying if some conditions are reached. The code will then trigger the execution of some of the transactions signed earlier with the Ledger Nano.
By this way, you can pre-sign some transactions with the Ledger, and if during the night something occurs, a backend can execute automatically some of these transactions, **in any order**.  
In this process, **the private key of the Ledger account is never exposed**.

First, create a Ledger account in devnet-rs. You will find some documentation [here](./signature.md#signing-with-a-ledger-hardware-wallet), and an example [here](https://github.com/PhilippeR26/starknet.js-workshop-typescript/blob/main/src/scripts/ledgerNano/4.deployLedgerAccount.ts).

The initial balances are :

|                 account | ETH balance |
| ----------------------: | ----------- |
|          Ledger Account | 20.0        |
| Backend executorAccount | 999.9902013 |
|                Account1 | 1000.0      |
|                Account2 | 1000.0      |

Now, we can ask the user to sign on its Ledger some outside transactions:

```typescript
const callOptions: OutsideExecutionOptions = {
  caller: executorAccount.address,
  execute_after: Math.floor(Date.now() / 1000) - 3600, // 1 hour ago
  execute_before: Math.floor(Date.now() / 1000) + 3600 * 14, // 14 hours from now
};
const call1 = {
  contractAddress: ethAddress,
  entrypoint: 'transfer',
  calldata: {
    recipient: account1.address,
    amount: cairo.uint256(1n * 10n ** 18n),
  },
};
const call2 = {
  contractAddress: ethAddress,
  entrypoint: 'transfer',
  calldata: {
    recipient: account2.address,
    amount: cairo.uint256(2n * 10n ** 18n),
  },
};
const call3 = {
  contractAddress: ethAddress,
  entrypoint: 'transfer',
  calldata: {
    recipient: account1.address,
    amount: cairo.uint256(3n * 10n ** 18n),
  },
};
const call4 = {
  contractAddress: ethAddress,
  entrypoint: 'transfer',
  calldata: {
    recipient: account2.address,
    amount: cairo.uint256(4n * 10n ** 18n),
  },
};
console.log("It's 6PM. Before night, we will now pre-sign 3 outside transactions:");
console.log(
  'Sign now on the Ledger Nano for :\n- Transfer 1 ETH to account1.\n- Transfer 2 ETH to account2.'
);
const outsideTransaction1: OutsideTransaction = await ledgerAccount.getOutsideTransaction(
  callOptions,
  [call1, call2]
);

console.log('Sign now on the Ledger Nano for :\n- Transfer 3 ETH to account1.');
const outsideTransaction2: OutsideTransaction = await ledgerAccount.getOutsideTransaction(
  callOptions,
  call3
);

console.log('Sign now on the Ledger Nano for :\n- Transfer 4 ETH to account1.');
const outsideTransaction3: OutsideTransaction = await ledgerAccount.getOutsideTransaction(
  callOptions,
  call4
);
```

Transfer these 3 `OutsideTransaction` objects to the backend.

Imagine we are 5 hours later, the backend has decided to execute a transaction:

```typescript
console.log('The backend has detected a situation that execute Transaction 2.');
const res0 = await executorAccount.executeFromOutside(outsideTransaction2);
await myProvider.waitForTransaction(res0.transaction_hash);
```

The balances are now :

|                 account | ETH balance |
| ----------------------: | ----------- |
|          Ledger Account | 17.0        |
| Backend executorAccount | 999.9901592 |
|                Account1 | 1003.0      |
|                Account2 | 1000.0      |

2 hours later, the backend has decided to execute several transactions:

```typescript
console.log('The backend has detected a situation that execute simultaneously Transactions 1 & 3.');
const res1 = await executorAccount.executeFromOutside([outsideTransaction1, outsideTransaction3]);
await myProvider.waitForTransaction(res1.transaction_hash);
```

The balances are finally :

|                 account | ETH balance |
| ----------------------: | ----------- |
|          Ledger Account | 10.0        |
| Backend executorAccount | 999.9901005 |
|                Account1 | 1004.0      |
|                Account2 | 1006.0      |

:::info
The complete code of this example is available [here](https://github.com/PhilippeR26/starknet.js-workshop-typescript/blob/main/src/scripts/Starknet131/Starknet131-devnet/17.outsideExecuteLedger.ts).
:::
