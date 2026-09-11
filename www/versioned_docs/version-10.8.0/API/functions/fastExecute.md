# Function: fastExecute()

> **fastExecute**(): [`StarknetPlugin`](../interfaces/StarknetPlugin.md)\<[`FastExecuteProviderMethods`](../interfaces/FastExecuteProviderMethods.md), [`FastExecuteAccountMethods`](../interfaces/FastExecuteAccountMethods.md)\>

Defined in: [src/plugins/fast-execute/index.ts:44](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/plugins/fast-execute/index.ts#L44)

FastExecute plugin - adds gaming-optimized transaction execution

Provides fastExecute() on accounts and fastWaitForTransaction() on providers
for rapid successive transaction execution with minimal confirmation latency.

Requires:

- RPC 0.9 or later
- Provider initialized with BlockTag.PRE_CONFIRMED

## Returns

[`StarknetPlugin`](../interfaces/StarknetPlugin.md)\<[`FastExecuteProviderMethods`](../interfaces/FastExecuteProviderMethods.md), [`FastExecuteAccountMethods`](../interfaces/FastExecuteAccountMethods.md)\>

## Example

```typescript
import { RpcProvider, Account } from 'starknet';

const provider = new RpcProvider({
  nodeUrl: url,
  blockIdentifier: BlockTag.PRE_CONFIRMED,
});

const account = new Account({ provider, address, signer });

const resp = await account.fastExecute(
  call,
  { tip: recommendedTip },
  { retries: 30, retryInterval: 500 }
);

if (resp.isReady) {
  // Next transaction can be sent immediately
}
```
