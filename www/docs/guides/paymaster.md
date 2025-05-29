---
sidebar_position: 20
---

# Execute calls using paymaster

## Overview

A Paymaster in Starknet allows your account to pay gas fees using alternative tokens (e.g. ETH, USDC, ...) instead of
STRK.

:::info
There are 2 types of paymaster transaction:

- `default` when the account is paying the fees.
- `sponsored` when a dApp wants to cover the gas fees on behalf of users.
  :::

In `starknet.js`, you can interact with a Paymaster in two ways:

- Through the `Account` or `WalletAccount` classes
- Or directly via the `PaymasterRpc` class

:::warning IMPORTANT
To be able to use the Paymaster, accounts must be compatible with SNIP-9 (Outside execution).  
See [SNIP-9 compatibility](./outsideExecution.md#check-snip-9-support)
:::

## Paymaster service

Paymaster service is provided by specific backends compatible with [SNIP-29](https://github.com/starknet-io/SNIPs/blob/main/SNIPS/snip-29.md).

By default, a random service is selected in the list of available services:

```typescript
const myPaymasterRpc = new PaymasterRpc({ default: true });
```

If you want a specific paymaster service:

```typescript
const myPaymasterRpc = new PaymasterRpc({ nodeUrl: 'https://sepolia.paymaster.avnu.fi' });
```

Current available services are:

| Name |              Mainnet               |              Testnet              |
| :--: | :--------------------------------: | :-------------------------------: |
| AVNU | https://starknet.paymaster.avnu.fi | https://sepolia.paymaster.avnu.fi |

## Account with paymaster feature

To instantiate a new account compatible with paymaster:

```typescript
const myAccount = new Account(
  myProvider,
  accountAddress,
  privateKey,
  undefined,
  undefined,
  myPaymasterRpc
);
```

## Getting Supported Gas Tokens

Before sending a transaction with a Paymaster, you must first know which tokens are accepted:

```typescript
const supported = await myAccount.paymaster.getSupportedTokens();
// or
const supported = await myPaymaster.getSupportedTokens();

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

To send a [`Call`](./define_call_message.md#call-or-call) (result of [`myContract.populate()`](./define_call_message.md#object-with-abi-conformity-check) or `myCallData.compile()`), here for a `default` paymaster transaction:

```typescript
const gasToken = '0x53b40a647cedfca6ca84f542a0fe36736031905a9639a7f19a3c1e66bfd5080'; // USDC in Testnet
const feesDetails: PaymasterDetails = {
  feeMode: { mode: 'default', gasToken },
};
const feeEstimation = await myAccount.estimatePaymasterTransactionFee([myCall], feesDetails);
// ask here to the user to accept this fee
const res = await myAccount.executePaymasterTransaction(
  [myCall],
  feesDetails,
  feeEstimation.suggested_max_fee_in_gas_token
);
const txR = await myProvider.waitForTransaction(res.transaction_hash);
```

### Sponsored paymaster

For a sponsored transaction, use :

```typescript
const myPaymasterRpc = new PaymasterRpc({
  nodeUrl: 'https://sepolia.paymaster.avnu.fi',
  headers: { 'api-key': process.env.PAYMASTER_API_KEY },
});
const myAccount = new Account(
  myProvider,
  accountAddress,
  privateKey,
  undefined,
  undefined,
  myPaymasterRpc
);
const feesDetails: PaymasterDetails = {
  feeMode: { mode: 'sponsored' },
};
const res = await myAccount.executePaymasterTransaction([myCall], feesDetails);
const txR = await myProvider.waitForTransaction(res.transaction_hash);
```

### Time bounds

Optional execution window with `executeAfter` and `executeBefore` dates:

```typescript
const feesDetails: PaymasterDetails = {
  feeMode: { mode: 'default', gasToken },
  timeBounds: {
    executeBefore: Date.now() / 1000 + 60, // 60 seconds
    executeAfter: Date.now() / 1000,
  },
};
```

:::note
Time unit is the Starknet blockchain time unit: seconds.
:::

### Deploy Account

:::warning important
If the account selected in the Wallet extension (Braavos, ArgentX, ...) is not deployed, you can't process a Paymaster transaction.
:::

If necessary, deploy first the account, using:

```typescript
// starknetWalletObject is the wallet selected by get-starknet v4.
// Get data to deploy the account:
const deploymentData: AccountDeploymentData = await wallet.deploymentData(starknetWalletObject);
const feesDetails: PaymasterDetails = {
  feeMode: { mode: 'default', gasToken },
  deploymentData: { ...deploymentData, version: 1 as 1 },
};
// MyWalletAccount is the WalletAccount instance related to the selected wallet.
const estimatedFees: PaymasterFeeEstimate = await MyWalletAccount.estimatePaymasterTransactionFee(
  [],
  feesDetails
);
const resp = await MyWalletAccount.executePaymasterTransaction(
  [],
  feesDetails,
  estimatedFees.suggested_max_fee_in_gas_token
);
const txR = await newAccount.waitForTransaction(resp.transaction_hash);
```

## PaymasterRpc Functions

The `account.paymaster` property is an instance of `PaymasterRpc`.

Here are the available methods:

| Method                       | Description                                                                     |
| ---------------------------- | ------------------------------------------------------------------------------- |
| `isAvailable()   `           | Returns `true` if the Paymaster service is up and running.                      |
| ` getSupportedTokens()`      | Returns the accepted tokens and their price in STRK.                            |
| `buildTransaction(...)     ` | Builds the required data (could include a typed data to sign) for the execution |
| `executeTransaction(...)`    | Calls the paymasters service to execute the transaction                         |

## Examples

### Demo DAPP

A demo DAPP is available [here](https://starknet-paymaster-snip-29.vercel.app/) (needs some USDC in an account to process).

## Full Example – React + starknet.js + Paymaster

```tsx
import { FC, useEffect, useState } from 'react';
import { connect } from 'get-starknet'; // v4 only
import { Account, PaymasterRpc, TokenData, WalletAccount } from 'starknet'; // v7.4.0+

const paymasterRpc = new PaymasterRpc({ default: true });

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
      .executePaymasterTransaction(calls, {
        feeMode: { mode: 'default', gasToken: gasToken.address },
      })
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
