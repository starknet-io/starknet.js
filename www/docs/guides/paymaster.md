---
sidebar_position: 20
---

# Execute calls using paymaster

## Overview

A **Paymaster** in Starknet allows your account to pay gas fees using alternative tokens (e.g., ETH, USDC) instead of
STRK.

In `starknet.js`, you can interact with a Paymaster in two ways:

- Through the `Account` class (via `account.execute(...)` with a `paymaster` option)
- Or directly via the `PaymasterRpc` class

This guide shows how to use the Paymaster with `Account`, how to configure it, and how to retrieve the list of supported
tokens.

---

## Getting Supported Gas Tokens

Before sending a transaction with a Paymaster, you must first know **which tokens are accepted**.

Use the following method:

```ts
const supported = await account.paymaster.getSupportedTokens();

console.log(supported);
/*
[
    {
        "address": "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
        "decimals": 18,
        "priceInStrk": "0x5ffeeacbaf058dfee0"
    },
    {
        "address": "0x53b40a647cedfca6ca84f542a0fe36736031905a9639a7f19a3c1e66bfd5080",
        "decimals": 6,
        "priceInStrk": "0x38aea"
    }
]
*/
```

## Sending a Transaction with a Paymaster

To use a Paymaster, pass a `paymaster` field in the `options` of your `account.execute(...)` call. Here you must define the fee mode (sponsored or not):

```ts
await account.execute(
  [
    {
      contractAddress: '0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
      entrypoint: 'approve',
      calldata: ['0xSPENDER', '0x1', '0'],
    },
  ],
  {
    paymaster: {
      feeMode: { mode: 'default', gasToken: '0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7' } } }
    },
  }
);
```

### Paymaster Options

| Field                       | Type    | Description                                                                   |
| --------------------------- | ------- | ----------------------------------------------------------------------------- |
| `feeMode`                   | FeeMode | When not sponsored, you need to use 'default' mode and specify the gas token. |
| `maxEstimatedFeeInGasToken` | bigint  | Max fee you're willing to pay in the gas token.                               |
| `maxGasTokenPriceInStrk`    | bigint  | Max token price in STRK.                                                      |
| `deploymentData`            | object  | Data required if your account is being deployed.                              |
| `timeBounds`                | object  | Optional execution window with `executeAfter` and `executeBefore` dates.      |

### How It Works Behind the Scenes

When `paymaster` option is provided in `account.execute()`, this happens:

1. `account.buildPaymasterTransaction()` is called to prepare the transaction.
2. `account.signMessage()` signs the returned typed data.
3. `paymaster.executeTransaction()` is called with your address, typed data, and signature.

## PaymasterRpc Functions

The `account.paymaster` property is an instance of `PaymasterRpc`.

Here are the available methods:

| Method                       | Description                                                                     |
| ---------------------------- | ------------------------------------------------------------------------------- |
| `isAvailable()   `           | Returns `true` if the Paymaster service is up and running.                      |
| ` getSupportedTokens()`      | Returns the accepted tokens and their price in STRK.                            |
| `buildTransaction(...)     ` | Builds the required data (could include a typed data to sign) for the execution |
| `executeTransaction(...)`    | Calls the paymasters service to execute the transaction                         |

## Full Example – React + starknet.js + Paymaster

```tsx
import { FC, useEffect, useState } from 'react';
import { connect } from 'get-starknet';
import { Account, PaymasterRpc, TokenData, WalletAccount } from 'starknet';

const paymasterRpc = new PaymasterRpc({ default: true });
// const paymasterRpc = new PaymasterRpc({ nodeUrl: 'https://sepolia.paymaster.avnu.fi' });

const App: FC = () => {
  const [account, setAccount] = useState<Account>();
  const [loading, setLoading] = useState(false);
  const [tx, setTx] = useState<string>();
  const [gasToken, setGasToken] = useState<TokenData>();
  const [gasTokens, setGasTokens] = useState<TokenData[]>([]);

  const handleConnect = async () => {
    const starknet = await connect();
    if (!starknet) return;
    await starknet.enable();
    if (starknet.isConnected && starknet.provider && starknet.account.address) {
      setAccount(
        new WalletAccount(starknet.provider, starknet, undefined, undefined, paymasterRpc)
      );
    }
  };

  useEffect(() => {
    paymasterRpc.getSupportedTokens().then((tokens) => {
      setGasTokens(tokens);
    });
  }, []);

  if (!account) {
    return <button onClick={handleConnect}>Connect Wallet</button>;
  }

  const onClickExecute = () => {
    const calls = [
      {
        entrypoint: 'approve',
        contractAddress: '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
        calldata: [
          '0x0498E484Da80A8895c77DcaD5362aE483758050F22a92aF29A385459b0365BFE',
          '0xf',
          '0x0',
        ],
      },
    ];
    setLoading(true);
    account
      .execute(calls, { paymaster: { feeMode: { mode: 'default', gasToken: gasToken.address } } })
      .then((res) => {
        setTx(res.transaction_hash);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  return (
    <div>
      <div>
        <p>
          <strong>Gas tokens</strong>
        </p>
        {gasTokens.map((token) => (
          <button
            disabled={token.tokenAddress === gasToken?.tokenAddress}
            onClick={() => setGasToken(token)}
          >
            {token.tokenAddress}
          </button>
        ))}
      </div>
      {tx && (
        <a href={`https://sepolia.voyager.online/tx/${tx}`} target={'_blank'} rel="noreferrer">
          Success:{tx}
        </a>
      )}
      {!gasToken && <p>Select a gas token</p>}
      <div>
        {account && (
          <button disabled={loading || !gasToken} onClick={onClickExecute}>
            {loading ? 'Loading' : 'Execute'}
          </button>
        )}
      </div>
    </div>
  );
};

export default App;
```
