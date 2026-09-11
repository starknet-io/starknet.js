# Variable: DEFAULT_GLOBAL_CONFIG

> `const` **DEFAULT_GLOBAL_CONFIG**: `object`

Defined in: [src/global/constants.ts:157](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/global/constants.ts#L157)

## Type Declaration

### logLevel

> **logLevel**: [`LogLevel`](../../../../type-aliases/LogLevel.md)

### rpcVersion

> **rpcVersion**: [`SupportedRpcVersion`](../type-aliases/SupportedRpcVersion.md)

### transactionVersion

> **transactionVersion**: [`SupportedTransactionVersion`](../type-aliases/SupportedTransactionVersion.md)

### resourceBoundsOverhead

> **resourceBoundsOverhead**: [`ResourceBoundsOverhead`](../../../../type-aliases/ResourceBoundsOverhead.md)

### defaultTipType

> **defaultTipType**: [`TipType`](../../../../type-aliases/TipType.md)

### channelDefaults

> **channelDefaults**: [`ChannelDefaults`](../type-aliases/ChannelDefaults.md)

### fetch

> **fetch**: `any`

### websocket

> **websocket**: `any`

### buffer

> **buffer**: `any`

### blake

> **blake**: ((`uint8Array`) => `Uint8Array`) \| `undefined`

Custom blake function

#### Param

The uint8Array to hash

#### Returns

The hash of the uint8Array

#### Example

```typescript
config.set('blake', (uint8Array: Uint8Array) => {
  return blake2s(uint8Array, { dkLen: 32 });
});
```
