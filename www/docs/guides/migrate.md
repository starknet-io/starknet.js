---
sidebar_position: 101
---

# Migrate from v6 to v7

This document only covers the features present in v6 which have changed in some significant way in v7.

If you encounter any missing changes, please let us know and we will update this guide.

## Fetch dependencies

`isomorphic-fetch` and `fetch-cookie` have been removed as dependencies.

For users who might require the features of either library, a `baseFetch` override parameter has been enabled for the `RpcProvider` and `RpcChannel` classes, including classes that inherit from them such as `Account` and `WalletAccount`.

```typescript
import makeFetchCookie from 'fetch-cookie';
import isomorphicFetch from 'isomorphic-fetch';

const provider = new RpcProvider({
  baseFetch: makeFetchCookie(isomorphicFetch),
});
```

## Rpc compatibility

Starknet.js v6 is compatible with Starknet RPC **0.6** and **0.7** nodes.

Starknet.js v7 drops support for RPC **0.6**, and introduces support for RPC **0.8**, it supports RPC **0.7** and **0.8** nodes.

By default, Starknet.js v7 uses RPC **0.8** with **V3** transactions (STRK fees). This means that you can no longer execute **V1** transactions (ETH fees) by default.

|                   | RPC 0.7  | RPC 0.8 <br /> (default) |
| ----------------: | :------: | :----------------------: |
|  V1 tx (ETH fees) | Possible |        Impossible        |
| V3 tx (STRK fees) | Default  |         Default          |

You can configure your code to use RPC **0.7** with ETH and STRK fees available by using the following options:

- Define `specVersion: '0.7'` when instantiating an RpcProvider
- Use `config.set('legacyMode', true)` to enable **V1** transactions
- Use `logger.setLogLevel('ERROR')` if you want to remove the warnings when processing **V1** transactions

```typescript
import { RpcProvider, Account, config, logger, ETransactionVersion } from 'starknet';

const myProvider = new RpcProvider({
  nodeUrl: 'https://free-rpc.nethermind.io/sepolia-juno/v0_7',
  specVersion: '0.7',
});

config.set('legacyMode', true);

logger.setLogLevel('ERROR');
```

With the above settings the code still uses **V3** transactions with RPC **0.7** by default. To utilize **V1** transactions there are two approaches:

- either configure it at the `Account` instance level by setting the appropriate constructor parameter:

```typescript
const account0 = new Account(
  myProvider,
  accountAddress0,
  privateKey0,
  undefined,
  ETransactionVersion.V2
);
```

- or configure it for individual method invocations by setting the corresponding options parameter property:

```typescript
const res = await account0.execute(myCall, { version: 1 });
```

## Removal of deprecated functions

Some functions & namespaces are deprecated for a long time. They are now deleted:

1. `number` namespace removed. Use existing `num` namespace
2. Usage of `new WalletAccount(...)` is removed. Use existing `WalletAccount.connect(...)` or `WalletAccount.silentConnect(...)`
3. `UINT_128_MAX, UINT_256_MAX` are no more available in `uint256` namespace. Use existing direct import `import { UINT_256_MAX } from "starknet";`
4. `TypedDataRevision, StarknetEnumType, StarknetMerkleType, StarknetType, StarknetDomain, TypedData` are no more available in `typeData` namespace. Use existing direct import `import { StarknetDomain } from "starknet";`
5. In `transaction` namespace, functions `fromCallsToExecuteCalldataWithNonce(), transformCallsToMulticallArrays_cairo1()` are removed.
6. **`BigNumberish` is no more available in `num` namespace.** Use existing direct import `import { BigNumberish } from "starknet";`
7. `stringifyAlwaysAsBig()` is no more available in `json` namespace. Use existing `json.stringify()`
8. `stringToArrayBuffer()` is no more available in `encode` namespace. Use existing `encode.utf8ToArray()`
9. In `stark` namespace, function `makeAddress()` is removed.
10. `CallStruct` type is removed.
11. **`getEstimatefee()` method of `ProviderInterface` and of `RpcProvider` is removed.** Use `myAccount.estimateInvokeFee()` or `myAccount.estimateDeclareFee()`
12. `getPendingTransactions()` method of `RpcProvider` is removed. Use `myProvider.getBlockWithTxHashes(BlockTag.PENDING)`
13. **In `Account.execute()`, the `abi` parameter is removed in `execute(transactions: AllowArray<Call>, abis?: Abi[], transactionsDetail?: InvocationsDetails)`.** Use only `myAccount.execute(transactions: AllowArray<Call>, transactionsDetail?: InvocationsDetails)`

## Verification of SNIP-12 messages

As the verification of a message in Starknet network is not related to the Account class:

- In `Account` class, function `verifyMessageHash` is removed. Use existing `myProvider.verifyMessageInStarknet()`
- In `Account` class, function `verifyMessage` is removed. Use existing `myProvider.verifyMessageInStarknet()`

## Transaction receipt

In the transaction receipt `ReceiptTx` class, the status [`isRejected`](https://starknetjs.com/docs/6.23.1/API/classes/ReceiptTx#isrejected) has been removed.
