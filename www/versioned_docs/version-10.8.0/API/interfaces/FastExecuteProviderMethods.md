# Interface: FastExecuteProviderMethods

Defined in: [src/plugins/fast-execute/types.ts:27](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/plugins/fast-execute/types.ts#L27)

Provider methods added by the FastExecute plugin

## Extended by

- [`RpcProvider`](../classes/RpcProvider.md)

## Methods

### fastWaitForTransaction()

> **fastWaitForTransaction**(`txHash`, `address`, `initNonce`, `options?`): `Promise`\<`boolean`\>

Defined in: [src/plugins/fast-execute/types.ts:60](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/plugins/fast-execute/types.ts#L60)

Wait for transaction confirmation with polling optimization for gaming.

This method is fast but Events and transaction reports are not yet available.
Useful for gaming activity and rapid-fire transaction scenarios.

Only available on RPC 0.9 and onwards.

#### Parameters

##### txHash

[`BigNumberish`](../type-aliases/BigNumberish.md)

Transaction hash to monitor

##### address

`string`

Address of the account (used to track nonce changes)

##### initNonce

[`BigNumberish`](../type-aliases/BigNumberish.md)

Initial nonce of the account (before the transaction)

##### options?

[`FastWaitForTransactionOptions`](../type-aliases/FastWaitForTransactionOptions.md)

Polling configuration
options. `retries` is the number of times to retry (default: 50), `retryInterval` is the time in ms
between retries (default: 500).

#### Returns

`Promise`\<`boolean`\>

Returns true if the next transaction is possible (nonce increment detected),
false if the timeout has been reached, or throws an error in case of provider communication failure
or transaction reversion.

#### Example

```typescript
const isReady = await provider.fastWaitForTransaction('0x123abc...', '0x456def...', 10, {
  retries: 30,
  retryInterval: 500,
});

if (isReady) {
  // Next transaction can be sent
}
```
