---
sidebar_position: 11
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

- Define `specVersion: '0.7.1'` when instantiating an RpcProvider
- Use `config.set('legacyMode', true)` to enable **V1** transactions
- Use `logger.setLogLevel('ERROR')` if you want to remove the warnings when processing **V1** transactions

```typescript
import { RpcProvider, Account, config, logger, ETransactionVersion } from 'starknet';

const myProvider = new RpcProvider({
  nodeUrl: 'https://starknet-sepolia.public.blastapi.io/rpc/v0_8',
  specVersion: '0.7.1',
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

## Transaction receipt

In the `ReceiptTx` class, the status [`isRejected`](https://starknetjs.com/docs/6.23.1/API/classes/ReceiptTx#isrejected) has been removed.

## Removed deprecated functionalities

### RpcProvider

|                                                     method                                                      | replacement                                                                                                                                                                                                                                                                                                                                                 |
| :-------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`getPendingTransactions(...)`](https://starknetjs.com/docs/6.23.1/API/classes/Provider#getpendingtransactions) | [`getBlockWithTxHashes(BlockTag.PENDING)`](https://starknetjs.com/docs/6.23.1/API/classes/Provider#getblockwithtxhashes)<br/>[`getBlock(BlockTag.PENDING)`](https://starknetjs.com/docs/6.23.1/API/classes/Provider#getblock)                                                                                                                               |
|         [`getEstimateFee(...)`](https://starknetjs.com/docs/6.23.1/API/classes/Provider#getestimatefee)         | [`getInvokeEstimateFee(...)`](https://starknetjs.com/docs/6.23.1/API/classes/Provider#getinvokeestimatefee)<br/>[`getDeclareEstimateFee(...)`](https://starknetjs.com/docs/6.23.1/API/classes/Provider#getdeclareestimatefee)<br/>[`getDeployAccountEstimateFee(...)`](https://starknetjs.com/docs/6.23.1/API/classes/Provider#getdeployaccountestimatefee) |

### Account

|                                                                                                    method                                                                                                    | details                                                                                                                                                                                                                                                                                                                                                                                                          |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|                                                               [`execute(...)`](https://starknetjs.com/docs/6.23.1/API/classes/Account#execute)                                                               | The deprecated [`execute(transactions, abis?, transactionsDetail?)`](https://starknetjs.com/docs/6.23.1/API/classes/Account#parameters-20) override with the optional (and unused) `abis` parameter has been removed.<br/><br/> [`execute(transactions, transactionsDetail?)`](https://starknetjs.com/docs/6.23.1/API/classes/Account#parameters-19) now only accepts two parameters and should be used as such. |
| [`verifyMessage(...)`](https://starknetjs.com/docs/6.23.1/API/classes/Account#verifymessage) <br/><br/> [`verifyMessageHash(...)`](https://starknetjs.com/docs/6.23.1/API/classes/Account#verifymessagehash) | The deprecated `Account` message verification methods have been removed. <br/><br/> The `RpcProvider` [`verifyMessageInStarknet(...)`](https://starknetjs.com/docs/6.23.1/API/classes/Provider#verifymessageinstarknet) method should be used instead.                                                                                                                                                           |

### WalletAccount

When initializing a `WalletAccount` instance through the constructor [`new WalletAccount(...)`](https://starknetjs.com/docs/6.23.1/API/classes/WalletAccount#constructor) the `address` parameter has been made mandatory with the deprecated eager address retrieval removed.

To initialize a `WalletAccount` instance [`WalletAccount.connect(...)`](https://starknetjs.com/docs/6.23.1/API/classes/WalletAccount#connect) should be used.

### Removed namespace

The `number` namespace alias has been removed in favor of `num` as noted in the v5 migration guide.

### Removed utility functions

|   namespace   |                                                                                                                                                  function                                                                                                                                                   |                                              replacement                                               |
| :-----------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------: |
|   `encode`    |                                                                                                 [`stringToArrayBuffer(...)`](https://starknetjs.com/docs/6.23.1/API/namespaces/encode#stringtoarraybuffer)                                                                                                  |        [`utf8ToArray(...)`](https://starknetjs.com/docs/next/API/namespaces/encode#utf8toarray)        |
|    `json`     |                                                                                                 [`stringifyAlwaysAsBig(...)`](https://starknetjs.com/docs/6.23.1/API/namespaces/json#stringifyalwaysasbig)                                                                                                  |           [`stringify(...)`](https://starknetjs.com/docs/next/API/namespaces/json#stringify)           |
|    `stark`    |                                                                                                          [`makeAddress(...)`](https://starknetjs.com/docs/6.23.1/API/namespaces/stark#makeaddress)                                                                                                          | [`validateAndParseAddress(...)`](https://starknetjs.com/docs/next/API/modules#validateandparseaddress) |
| `transaction` | [`fromCallsToExecuteCalldataWithNonce(...)`](https://starknetjs.com/docs/6.23.1/API/namespaces/transaction#fromcallstoexecutecalldatawithnonce) <br/> [`transformCallsToMulticallArrays_cairo1(...)`](https://starknetjs.com/docs/6.23.1/API/namespaces/transaction#transformcallstomulticallarrays_cairo1) |                                                   /                                                    |

- the [`CallStruct`](https://starknetjs.com/docs/6.23.1/API/interfaces/types.CallStruct) type that was used by the `transaction` methods has also been removed

### Removed type alias exports

Multiple TypeScript types have had their old location re-exports removed. They are no longer available within their old namespace but are available as direct imports: `import { *type* } from 'starknet'`.

|  namespace  |                                                                                                                                                                                                                                                                                                            type                                                                                                                                                                                                                                                                                                             |
| :---------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|    `num`    |                                                                                                                                                                                                                                                                    [`BigNumberish`](https://starknetjs.com/docs/6.23.1/API/namespaces/num#bignumberish)                                                                                                                                                                                                                                                                     |
| `typedData` | [`TypedDataRevision`](https://starknetjs.com/docs/6.23.1/API/namespaces/typedData#typeddatarevision) <br/> [`StarknetEnumType`](https://starknetjs.com/docs/6.23.1/API/namespaces/typedData#starknetenumtype) <br/> [`StarknetMerkleType`](https://starknetjs.com/docs/6.23.1/API/namespaces/typedData#starknetmerkletype) <br/> [`StarknetType`](https://starknetjs.com/docs/6.23.1/API/namespaces/typedData#starknettype) <br/> [`StarknetDomain`](https://starknetjs.com/docs/6.23.1/API/namespaces/typedData#starknetdomain) <br/> [`TypedData`](https://starknetjs.com/docs/6.23.1/API/namespaces/typedData#typeddata) |
|  `uint256`  |                                                                                                                                                                                                                   [`UINT_128_MAX`](https://starknetjs.com/docs/6.23.1/API/namespaces/uint256#uint_128_max) <br/> [`UINT_256_MAX`](https://starknetjs.com/docs/6.23.1/API/namespaces/uint256#uint_256_max)                                                                                                                                                                                                                   |
