# Interface: FastExecuteAccountMethods

Defined in: [src/plugins/fast-execute/types.ts:71](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/plugins/fast-execute/types.ts#L71)

Account methods added by the FastExecute plugin

## Extended by

- [`Account`](../classes/Account.md)

## Methods

### fastExecute()

> **fastExecute**(`transactions`, `transactionsDetail?`, `waitDetail?`): `Promise`\<[`FastExecuteResponse`](../type-aliases/FastExecuteResponse.md)\>

Defined in: [src/plugins/fast-execute/types.ts:119](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/plugins/fast-execute/types.ts#L119)

Execute one or multiple calls through the account contract,
responding as soon as a new transaction is possible with the same account.
Useful for gaming usage where rapid consecutive transactions are needed.

This method requires the provider to be initialized with `pre_confirmed` blockIdentifier option.
RPC 0.9 minimum.

In a normal `account.execute()` call followed by `provider.waitForTransaction()`, you have immediate access
to the events and transaction report. Here, we process consecutive transactions faster, but events and
transaction reports are not available immediately.

As a consequence of the above, do not use contract/account deployment with this method.

#### Parameters

##### transactions

`any`

Single call or array of calls to execute

##### transactionsDetail?

`any`

Transaction execution options

##### waitDetail?

[`FastWaitForTransactionOptions`](../type-aliases/FastWaitForTransactionOptions.md)

Options to scan the
network for the next possible transaction. `retries` is the number of times to retry (default: 50),
`retryInterval` is the time in ms between retries (default: 500).

#### Returns

`Promise`\<[`FastExecuteResponse`](../type-aliases/FastExecuteResponse.md)\>

Response containing the transaction result and status for the next
transaction. If `isReady` is true, you can execute the next transaction immediately. If false,
timeout has been reached before the next transaction was possible.

#### Example

```typescript
const myProvider = new RpcProvider({
  nodeUrl: url,
  blockIdentifier: BlockTag.PRE_CONFIRMED,
});
const myAccount = new Account({
  provider: myProvider,
  address: accountAddress0,
  signer: privateKey0,
});

const resp = await myAccount.fastExecute(
  call,
  { tip: recommendedTip },
  { retries: 30, retryInterval: 500 }
);

// if resp.isReady is true, you can launch immediately a new tx
if (resp.isReady) {
  // send next transaction
}
```
