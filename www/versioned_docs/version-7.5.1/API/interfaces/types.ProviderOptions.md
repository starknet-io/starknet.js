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

[src/provider/types/configuration.type.ts:13](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/configuration.type.ts#L13)

---

### retries

• `Optional` **retries**: `number`

#### Inherited from

RpcProviderOptions.retries

#### Defined in

[src/provider/types/configuration.type.ts:14](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/configuration.type.ts#L14)

---

### transactionRetryIntervalFallback

• `Optional` **transactionRetryIntervalFallback**: `number`

#### Inherited from

RpcProviderOptions.transactionRetryIntervalFallback

#### Defined in

[src/provider/types/configuration.type.ts:15](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/configuration.type.ts#L15)

---

### headers

• `Optional` **headers**: `object`

#### Inherited from

RpcProviderOptions.headers

#### Defined in

[src/provider/types/configuration.type.ts:16](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/configuration.type.ts#L16)

---

### blockIdentifier

• `Optional` **blockIdentifier**: [`BlockIdentifier`](../namespaces/types.md#blockidentifier)

#### Inherited from

RpcProviderOptions.blockIdentifier

#### Defined in

[src/provider/types/configuration.type.ts:17](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/configuration.type.ts#L17)

---

### chainId

• `Optional` **chainId**: `"0x534e5f4d41494e"` \| `"0x534e5f5345504f4c4941"`

#### Inherited from

RpcProviderOptions.chainId

#### Defined in

[src/provider/types/configuration.type.ts:18](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/configuration.type.ts#L18)

---

### specVersion

• `Optional` **specVersion**: `"0.7.1"` \| `"0.8.1"`

#### Inherited from

RpcProviderOptions.specVersion

#### Defined in

[src/provider/types/configuration.type.ts:19](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/configuration.type.ts#L19)

---

### default

• `Optional` **default**: `boolean`

#### Inherited from

RpcProviderOptions.default

#### Defined in

[src/provider/types/configuration.type.ts:20](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/configuration.type.ts#L20)

---

### waitMode

• `Optional` **waitMode**: `boolean`

#### Inherited from

RpcProviderOptions.waitMode

#### Defined in

[src/provider/types/configuration.type.ts:21](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/configuration.type.ts#L21)

---

### baseFetch

• `Optional` **baseFetch**: (`input`: `RequestInfo` \| `URL`, `init?`: `RequestInit`) => `Promise`<`Response`\>

#### Type declaration

▸ (`input`, `init?`): `Promise`<`Response`\>

##### Parameters

| Name    | Type                   |
| :------ | :--------------------- |
| `input` | `RequestInfo` \| `URL` |
| `init?` | `RequestInit`          |

##### Returns

`Promise`<`Response`\>

#### Inherited from

RpcProviderOptions.baseFetch

#### Defined in

[src/provider/types/configuration.type.ts:22](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/configuration.type.ts#L22)

---

### feeMarginPercentage

• `Optional` **feeMarginPercentage**: [`FeeMarginPercentage`](../namespaces/types.md#feemarginpercentage)

#### Inherited from

RpcProviderOptions.feeMarginPercentage

#### Defined in

[src/provider/types/configuration.type.ts:23](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/configuration.type.ts#L23)

---

### batch

• `Optional` **batch**: `number` \| `false`

#### Inherited from

RpcProviderOptions.batch

#### Defined in

[src/provider/types/configuration.type.ts:24](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/configuration.type.ts#L24)
