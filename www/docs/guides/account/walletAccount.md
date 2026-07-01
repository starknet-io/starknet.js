---
sidebar_position: 6
---

# WalletAccount

**Use wallets to sign transactions in your DAPP.**

The [`WalletAccount`](../../API/classes/WalletAccount) class is similar to the regular [`Account`](../../API/classes/Account) class, with the added ability to ask a browser wallet to sign and send transactions. Some other cool functionalities will be detailed hereunder.

The private key of a `WalletAccount` is held in the Wallet, so any signature is managed by the wallet. With this approach DAPPs don't need to manage the security for any private key.

:::caution
This class functions only within the scope of a DAPP. It can't be used in a Node.js script.
:::

## Architecture

In your DAPP, you have to use the `get-starknet` library to select and interact with a wallet.

![](./pictures/WalletAccountArchitecture.png)

When retrieving information from Starknet, a `WalletAccount` instance will read directly from the blockchain. That is why at the initialization of a `WalletAccount` a provider is a required parameter - either [`ProviderOptions`](../../API/interfaces/ProviderOptions) (e.g. `{ nodeUrl }`) or a [`ProviderInterface`](../../API/classes/ProviderInterface) instance such as `RpcProvider`. It will be used for all reading activities.

## With get-starknet v5

When retrieving information from Starknet, a `WalletAccountV5` instance will read directly from the blockchain. That is why at the initialization of a `WalletAccountV5` a provider is a required parameter - either [`ProviderOptions`](../../API/interfaces/ProviderOptions) (e.g. `{ nodeUrl }`) or a [`ProviderInterface`](../../API/classes/ProviderInterface) instance such as `RpcProvider`. It will be used for all reading activities.

If you want to write to Starknet the `WalletAccountV5` will ask the wallet to sign and send the transaction using the Starknet Wallet API to communicate.

As several wallets can be installed in your desktop/mobile, the `WalletAccountV5` needs the ID of one of the available wallets. You can ask `get-starknet v5` to provide a list of available wallets, and you have to select one of them, called a `WalletWithStarknetFeatures` Object.

### Select a Wallet

Using the `get-starknet/discovery v5` library you have to create your own UI and logic to select one of the available wallets. An example in a DAPP: [**here**](<https://github.com/PhilippeR26/Cairo1JS/blob/getStarknetv5/src/app/(site)/components/client/ConnectWallet/SelectWallet.tsx>). In this example you can select only the wallets compatible with the Starknet Wallet API.  
![](./pictures/SelectWalletV5.png)

Instantiating a new `WalletAccountV5`:

```typescript
import { createStore, type Store } from '@starknet-io/get-starknet/discovery'; // v5.0.0 min
import { type WalletWithStarknetFeatures } from '@starknet-io/get-starknet/standard/features';
import { WalletAccountV5, walletV5 } from 'starknet'; // v7.2.0 min
const myFrontendProviderUrl = 'https://free-rpc.nethermind.io/sepolia-juno/v0_8';
const store: Store = createStore();
const walletsList: WalletWithStarknetFeatures[] = store.getWallets();
// Create you own Component to select one of these wallets.
// Hereunder, selection of 2nd wallet of the list.
const selectedWallet: WalletWithStarknetFeatures = walletsList[1];
const myWalletAccount: WalletAccountV5 = await WalletAccountV5.connect(
  { nodeUrl: myFrontendProviderUrl },
  selectedWallet
);
```

The wallet is connected to this blockchain to write in Starknet:

```typescript
const writeChainId = await walletV5.requestChainId(myWalletAccount.walletProvider);
```

and to this blockchain to read Starknet:

```typescript
const readChainId = await myWalletAccount.getChainId();
```

### Subscription to events

You can subscribe to one event with `get-starknet v5`:

`onChange`: Triggered each time you change the current account or the current network in the wallet.

```typescript
import type { StandardEventsChangeProperties } from "@wallet-standard/features";
const addEvent = useCallback((change: StandardEventsChangeProperties) => {
    console.log("Event detected", change.accounts);
    if (change.accounts?.length) {
        console.log("account event=", change.accounts[0].address);
        setCurrentAccount(change.accounts[0].address);
        console.log("network event=", change.accounts[0].chains[0]);
        setCurrentChainId(change.accounts[0].chains[0].slice(9));
    }
}, []);
...
useEffect(() => {
    console.log("Subscribe events...");
    selectedWalletAccountV5?.onChange(addEvent);
    return () => {
        console.log("Unsubscribe to events...");
        selectedWalletAccountV5?.unsubscribeChange();
}
}
, [selectedWalletAccountV5, addEvent]);
```

## With get-starknet v6

`WalletAccountV6` extends `WalletAccountV5` with support for the **STRK20 privacy protocol** — a privacy layer for token operations using zero-knowledge proofs.

When retrieving information from Starknet, a `WalletAccountV6` instance reads directly from the blockchain via its provider. If you want to write to Starknet, `WalletAccountV6` asks the wallet to sign and send the transaction using the Starknet Wallet API v6.

:::note
`WalletAccountV6` requires `get-starknet v6` (v6.0.2 min).
:::

### Select a Wallet

The wallet selection follows the same pattern as v5:

```typescript
import { createStore, type Store } from '@starknet-io/get-starknet/discovery'; // v6.0.2 min
import { type WalletWithStarknetFeatures } from '@starknet-io/get-starknet-wallet-standard/features'; // v6
import { WalletAccountV6, walletV6 } from 'starknet';

const myFrontendProviderUrl = 'https://free-rpc.nethermind.io/sepolia-juno/v0_10';
const store: Store = createStore();
const walletsList: WalletWithStarknetFeatures[] = store.getWallets();
// Create your own component to select one of these wallets.
// Hereunder, selection of 2nd wallet of the list.
const selectedWallet: WalletWithStarknetFeatures = walletsList[1];
const myWalletAccount: WalletAccountV6 = await WalletAccountV6.connect(
  { nodeUrl: myFrontendProviderUrl },
  selectedWallet
);
```

### STRK20 privacy protocol

STRK20 is a **note-based privacy pool** for ERC-20 assets: a single pool contract holds the deposited tokens, but inside the pool funds are encrypted **notes**, so observers can't tell who owns what. Every state change is backed by a zero-knowledge proof verified on-chain. The mental model is: **deposit (shield) → transact privately inside the pool → withdraw (unshield)**. The wallet holds the private state and generates the proof; your DAPP only _describes the actions_ it wants.

:::info
As of 2026-06, the **Ready** and **Xverse** wallets support the STRK20 wallet API.
:::

`WalletAccountV6` exposes three dedicated methods for these operations, plus `executeWithProof()`.

#### STRK20 actions

A DAPP describes what it wants with an array of `STRK20_ACTION`. There are exactly four action types:

| Action   | `type`       | Fields                                            | Effect                                                                   |
| -------- | ------------ | ------------------------------------------------- | ------------------------------------------------------------------------ |
| Deposit  | `"deposit"`  | `token`, `amount`                                 | Public funds → pool (always to self).                                    |
| Withdraw | `"withdraw"` | `token`, `amount`, `recipient`                    | Pool → public `recipient` address.                                       |
| Transfer | `"transfer"` | `token`, `amount` (FELT or `"OPEN"`), `recipient` | Private transfer inside the pool to another registered user.             |
| Invoke   | `"invoke"`   | `contract`, `calldata`                            | Calls an arbitrary contract entrypoint atomically, executed by the pool. |

`amount` is always expressed in the token's smallest unit.

:::note About `amount: "OPEN"`
`"OPEN"` is only meaningful inside a **multi-action transaction**. It creates an empty _open note_ whose value is unknown at build time (e.g. the output of an AMM swap) and is filled later in the **same transaction** by a paired `invoke` action. It is never used on its own.
:::

A simple deposit, for example:

```typescript
import type { STRK20_ACTION } from 'starknet';

const actions: STRK20_ACTION[] = [
  {
    type: 'deposit',
    token: '0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d', // STRK
    amount: '0xde0b6b3a7640000', // 1e18, smallest unit
  },
];
```

#### Get STRK20 balances

```typescript
import type { STRK20_BALANCE_ENTRY } from 'starknet';

const balances: STRK20_BALANCE_ENTRY[] = await myWalletAccount.strk20Balances([
  '0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d', // STRK token address
]);
console.log('balance =', balances[0].balance);
```

#### Prepare a STRK20 invoke

Before executing a private transaction, request the wallet to compute the associated ZK proof:

```typescript
import type { STRK20_CALL_AND_PROOF } from 'starknet';

const prepared: STRK20_CALL_AND_PROOF = await myWalletAccount.strk20PrepareInvoke(actions);
// `prepared.call` is the Starknet call to submit, `prepared.proof` the attached ZK proof.

// or in simulation mode (no proof generated, not submittable — useful for fee estimation / previews):
const simulated: STRK20_CALL_AND_PROOF = await myWalletAccount.strk20PrepareInvoke(actions, true);
```

#### Execute a STRK20 transaction

```typescript
const result = await myWalletAccount.strk20InvokeTransaction(actions);
console.log('transaction hash =', result.transaction_hash);
```

#### Execute with a privacy proof

The `executeWithProof()` method has the same signature as `execute()`, with an extra parameter to attach a STRK20 ZK proof to a standard invoke. The proof comes from `strk20PrepareInvoke()`:

```typescript
// Obtain the privacy proof for the actions:
const { proof } = await myWalletAccount.strk20PrepareInvoke(actions);

// Attach it to a standard invoke of your own call(s):
const myCall = myContract.populate('my_method', {
  /* ... */
});
const resp = await myWalletAccount.executeWithProof(myCall, proof);
```

### Subscription to events

Subscription works identically to v5 — see the [v5 section](#subscription-to-events) above.

## With get-starknet v4

The concept of Starknet reading/writing is the same when using `get-starknet v4` and the `WalletAccount` class.

### Select a Wallet

You can ask the `get-starknet v4` library to display a window with a list of wallets, then it will ask you to make a choice. It will return the `StarknetWindowObject` Object (referred to as SWO hereunder) of the wallet the user selected.
![](./pictures/SelectWalletV4.png)

Instantiating a new `WalletAccount`:

```typescript
import { connect } from '@starknet-io/get-starknet'; // v4.0.3 min
import { WalletAccount, wallet } from 'starknet'; // v7.0.1 min
const myFrontendProviderUrl = 'https://starknet-sepolia.public.blastapi.io/rpc/v0_8';
// standard UI to select a wallet:
const selectedWalletSWO = await connect({ modalMode: 'alwaysAsk', modalTheme: 'light' });
const myWalletAccount = await WalletAccount.connect(
  { nodeUrl: myFrontendProviderUrl },
  selectedWalletSWO
);
```

:::tip
Using the `get-starknet-core` v4 library you can create your own UI and logic to select the wallet. An example of DAPP using a custom UI [**here**](https://github.com/PhilippeR26/Starknet-WalletAccount/blob/53514a5529c4aebe9e7c6331186e83b7a7310ce0/src/app/components/client/WalletHandle/SelectWallet.tsx), in this example you can select only the wallets compatible with the Starknet Wallet API.  
:::

The wallet is connected to this blockchain to write in Starknet:

```typescript
const writeChainId = await wallet.requestChainId(myWalletAccount.walletProvider);
```

and to this blockchain to read Starknet:

```typescript
const readChainId = await myWalletAccount.getChainId();
```

### Subscription to events

You can subscribe to 2 events with `get-starknet v4`:

- `accountsChanged`: Triggered each time you change the current account in the wallet.
- `networkChanged`: Triggered each time you change the current network in the wallet.

At each change of the network, both account and network events are emitted.  
At each change of the account, only the account event is emitted.

#### Subscribe

##### accountsChanged

```typescript
const handleAccount: AccountChangeEventHandler = (accounts: string[] | undefined) => {
  if (accounts?.length) {
    const textAddr = accounts[0]; // hex string
    setChangedAccount(textAddr); // from a React useState
  }
};
selectedWalletSWO.on('accountsChanged', handleAccount);
```

##### networkChanged

```typescript
const handleNetwork: NetworkChangeEventHandler = (chainId?: string, accounts?: string[]) => {
  if (!!chainId) {
    setChangedNetwork(chainId); // from a React useState
  }
};
selectedWalletSWO.on('networkChanged', handleNetwork);
```

#### Unsubscribe

Similar to subscription, by using the `.off` method.

```typescript
selectedWalletSWO.off('accountsChanged', handleAccount);
selectedWalletSWO.off('networkChanged', handleNetwork);
```

:::info
You can subscribe both with the SWO or with a `WalletAccount` instance.  
The above examples are using the SWO, because it is the simpler way to process.
:::

## WalletAccount usage

### Use as an Account

Once a new `WalletAccount` or `WalletAccountV5` is created, you can use all the power of Starknet.js, exactly as a with a normal `Account` instance, for example `myWalletAccount.execute(call)` or `myWalletAccount.signMessage(typedMessage)`:

```typescript
const claimCall = airdropContract.populate('claim_airdrop', {
  amount: amount,
  proof: proof,
});
const resp = await myWalletAccount.execute(claimCall);
```

![](./pictures/executeTx.png)

### Use in a Contract instance

You can connect a `WalletAccount` with a [`Contract`](../API/classes/Contract) instance. All reading actions are performed by the provider of the `WalletAccount`, and all writing actions (that need a signature) are performed by the wallet.

```typescript
const lendContract = new Contract(contract.abi, contractAddress, myWalletAccount);
const qty = await lendContract.get_available_asset(addr); // use of the WalletAccount provider
const resp = await lendContract.process_lend_asset(addr); // use of the wallet
```

### Use as a Provider

Your `WalletAccount` instance can be used as a provider:

```typescript
const bl = await myWalletAccount.getBlockNumber();
// bl = 2374543
```

You can use all the methods of the `RpcProvider` class. Under the hood, the `WalletAccount` will use the RPC node that you indicated at its instantiation.

### Direct access to the wallet API entry points

The `WalletAccount` class is able to interact with all the entrypoints of the Starknet Wallet API, including some functionalities that do not exists in the `Account` class.

A full description of this API can be found [**here**](https://github.com/starknet-io/get-starknet/blob/master/packages/core/documentation/walletAPIdocumentation.md).

Some examples:

#### Request to change the wallet network

Using your `WalletAccount`, you can ask the wallet to change its current network:

```typescript
useEffect(
  () => {
    if (!isValidNetwork()) {
      const tryChangeNetwork = async () => {
        await myWalletAccount.switchStarknetChain(constants.StarknetChainId.SN_SEPOLIA);
      };
      tryChangeNetwork().catch(console.error);
    }
  },
  [chainId] // from a networkChanged event
);
```

![](./pictures/switchNetwork.png)

#### Request to display a token in the wallet

Using your `WalletAccount`, you can ask the wallet to display a new token:

```typescript
useEffect(
  () => {
    const fetchAddToken = async () => {
      const resp = await myWalletAccount.watchAsset({
        type: 'ERC20',
        options: {
          address: erc20Address,
        },
      });
    };
    if (isAirdropSuccess) {
      fetchAddToken().catch(console.error);
    }
  },
  [isAirdropSuccess] // from a React useState
);
```

![](./pictures/addToken.png)

### Changing the network or account

When you change the network or the account address a `WalletAccount` instance is automatically updated, however, this can lead to unexpected behavior if one is not careful (reads and writes targeting different networks, problems with Cairo versions of the accounts, ...).

:::warning RECOMMENDATION
It is strongly recommended to create a new `WalletAccount` instance each time the network or the account address is changed.
:::
