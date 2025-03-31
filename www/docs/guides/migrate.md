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

Starknet.js v6 is compatible with Starknet nodes Rpc 0.6 & 0.7.  
Starknet.js v7 is no more compatible with Rpc 0.6, and is now compatible with Rpc 0.8. It means that it's compatible only for Rpc 0.7 & 0.8.

By default, Starknet.js v7 is using only Rpc 0.8 with V3 transactions (STRK fees). It means that by default, you can no more execute V1 transactions (ETH fees).

|                   | Rpc 0.7  | Rpc 0.8 <br /> (default) |
| ----------------: | :------: | :----------------------: |
|  V1 tx (ETH fees) | Possible |        Impossible        |
| V3 tx (STRK fees) | Default  |         Default          |

You can configure your code to be able to use Rpc 0.7, with ETH & STRK fees available:

- Add `specVersion: "0.7"` property to the instantiation of the RpcProvider.
- Add `config.set("legacyMode", true)` to authorize V1 transactions.
- Add `logger.setLogLevel('ERROR')` if you want to remove the warnings when processing V1 transactions.

```typescript
import { RpcProvider, Account, config, logger, ETransactionVersion } from 'starknet';
const myProvider = new RpcProvider({
  nodeUrl: 'https://free-rpc.nethermind.io/sepolia-juno/v0_7',
  specVersion: '0.7',
});
config.set('legacyMode', true);
logger.setLogLevel('ERROR');
```

By default, you are now processing V3 transactions with Rpc 0.7. To process a V1 transaction,

- you can configure the Account to process by default V1 transactions:

```typescript
const account0 = new Account(
  myProvider,
  accountAddress0,
  privateKey0,
  undefined,
  ETransactionVersion.V2
);
```

- if the account is not configured for V1 transactions, you can add an option to any transaction:

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

In transaction receipt, the status `isRejected` is removed.
