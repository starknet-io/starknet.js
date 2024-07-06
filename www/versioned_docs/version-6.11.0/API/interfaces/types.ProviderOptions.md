---
id: 'types.ProviderOptions'
title: 'Interface: ProviderOptions'
sidebar_label: 'ProviderOptions'
custom_edit_url: null
---

[types](../namespaces/types.md).ProviderOptions

## Hierarchy

- [`RpcProviderOptions`](../namespaces/types.md#rpcprovideroptions)

  ↳ **`ProviderOptions`**

## Properties

### nodeUrl

• `Optional` **nodeUrl**: `string`

#### Inherited from

RpcProviderOptions.nodeUrl

#### Defined in

[src/types/provider/configuration.ts:7](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/provider/configuration.ts#L7)

---

### retries

• `Optional` **retries**: `number`

#### Inherited from

RpcProviderOptions.retries

#### Defined in

[src/types/provider/configuration.ts:8](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/provider/configuration.ts#L8)

---

### transactionRetryIntervalFallback

• `Optional` **transactionRetryIntervalFallback**: `number`

#### Inherited from

RpcProviderOptions.transactionRetryIntervalFallback

#### Defined in

[src/types/provider/configuration.ts:9](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/provider/configuration.ts#L9)

---

### headers

• `Optional` **headers**: `object`

#### Inherited from

RpcProviderOptions.headers

#### Defined in

[src/types/provider/configuration.ts:10](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/provider/configuration.ts#L10)

---

### blockIdentifier

• `Optional` **blockIdentifier**: [`BlockIdentifier`](../namespaces/types.md#blockidentifier)

#### Inherited from

RpcProviderOptions.blockIdentifier

#### Defined in

[src/types/provider/configuration.ts:11](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/provider/configuration.ts#L11)

---

### chainId

• `Optional` **chainId**: [`StarknetChainId`](../enums/constants.StarknetChainId.md)

#### Inherited from

RpcProviderOptions.chainId

#### Defined in

[src/types/provider/configuration.ts:12](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/provider/configuration.ts#L12)

---

### specVersion

• `Optional` **specVersion**: `string`

#### Inherited from

RpcProviderOptions.specVersion

#### Defined in

[src/types/provider/configuration.ts:13](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/provider/configuration.ts#L13)

---

### default

• `Optional` **default**: `boolean`

#### Inherited from

RpcProviderOptions.default

#### Defined in

[src/types/provider/configuration.ts:14](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/provider/configuration.ts#L14)

---

### waitMode

• `Optional` **waitMode**: `boolean`

#### Inherited from

RpcProviderOptions.waitMode

#### Defined in

[src/types/provider/configuration.ts:15](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/provider/configuration.ts#L15)

---

### feeMarginPercentage

• `Optional` **feeMarginPercentage**: `Object`

#### Type declaration

| Name                     | Type     |
| :----------------------- | :------- |
| `l1BoundMaxAmount`       | `number` |
| `l1BoundMaxPricePerUnit` | `number` |
| `maxFee`                 | `number` |

#### Inherited from

RpcProviderOptions.feeMarginPercentage

#### Defined in

[src/types/provider/configuration.ts:16](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/provider/configuration.ts#L16)
