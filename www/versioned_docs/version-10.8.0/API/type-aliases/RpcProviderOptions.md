# Type Alias: RpcProviderOptions

> **RpcProviderOptions** = `object` & [`PluginConfig`](../interfaces/PluginConfig.md)

Defined in: [src/provider/types/configuration.type.ts:8](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/types/configuration.type.ts#L8)

## Type Declaration

### nodeUrl?

> `optional` **nodeUrl?**: `string` \| [`NetworkName`](../Starknet.js-API/namespaces/constants/type-aliases/NetworkName.md)

### retries?

> `optional` **retries?**: [`waitForTransactionOptions`](waitForTransactionOptions.md)\[`"retries"`\]

Define the number of retries for waitForTransaction

### transactionRetryIntervalFallback?

> `optional` **transactionRetryIntervalFallback?**: `number`

Define the time interval between retries in milliseconds

### headers?

> `optional` **headers?**: `object`

Define the headers

### blockIdentifier?

> `optional` **blockIdentifier?**: [`BlockIdentifier`](BlockIdentifier.md)

### chainId?

> `optional` **chainId?**: [`StarknetChainId`](../Starknet.js-API/namespaces/constants/type-aliases/StarknetChainId.md)

### specVersion?

> `optional` **specVersion?**: [`SupportedRpcVersion`](../Starknet.js-API/namespaces/constants/type-aliases/SupportedRpcVersion.md)

### waitMode?

> `optional` **waitMode?**: `boolean`

### baseFetch?

> `optional` **baseFetch?**: `WindowOrWorkerGlobalScope`\[`"fetch"`\]

### resourceBoundsOverhead?

> `optional` **resourceBoundsOverhead?**: [`ResourceBoundsOverhead`](ResourceBoundsOverhead.md) \| `false`

### batch?

> `optional` **batch?**: `false` \| `number`
