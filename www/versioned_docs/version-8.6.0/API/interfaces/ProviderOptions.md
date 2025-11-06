---
id: 'ProviderOptions'
title: 'Interface: ProviderOptions'
sidebar_label: 'ProviderOptions'
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- [`RpcProviderOptions`](../modules.md#rpcprovideroptions)

  ↳ **`ProviderOptions`**

## Properties

### nodeUrl

• `Optional` **nodeUrl**: `string`

#### Inherited from

RpcProviderOptions.nodeUrl

#### Defined in

[src/provider/types/configuration.type.ts:8](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/types/configuration.type.ts#L8)

---

### retries

• `Optional` **retries**: `number`

Define the number of retries for waitForTransaction

#### Inherited from

RpcProviderOptions.retries

#### Defined in

[src/provider/types/configuration.type.ts:12](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/types/configuration.type.ts#L12)

---

### transactionRetryIntervalFallback

• `Optional` **transactionRetryIntervalFallback**: `number`

Define the time interval between retries in milliseconds

#### Inherited from

RpcProviderOptions.transactionRetryIntervalFallback

#### Defined in

[src/provider/types/configuration.type.ts:16](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/types/configuration.type.ts#L16)

---

### headers

• `Optional` **headers**: `object`

Define the headers

#### Inherited from

RpcProviderOptions.headers

#### Defined in

[src/provider/types/configuration.type.ts:20](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/types/configuration.type.ts#L20)

---

### blockIdentifier

• `Optional` **blockIdentifier**: [`BlockIdentifier`](../modules.md#blockidentifier)

#### Inherited from

RpcProviderOptions.blockIdentifier

#### Defined in

[src/provider/types/configuration.type.ts:21](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/types/configuration.type.ts#L21)

---

### chainId

• `Optional` **chainId**: `"0x534e5f4d41494e"` \| `"0x534e5f5345504f4c4941"`

#### Inherited from

RpcProviderOptions.chainId

#### Defined in

[src/provider/types/configuration.type.ts:22](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/types/configuration.type.ts#L22)

---

### specVersion

• `Optional` **specVersion**: `"0.8.1"` \| `"0.9.0"`

#### Inherited from

RpcProviderOptions.specVersion

#### Defined in

[src/provider/types/configuration.type.ts:23](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/types/configuration.type.ts#L23)

---

### default

• `Optional` **default**: `boolean`

#### Inherited from

RpcProviderOptions.default

#### Defined in

[src/provider/types/configuration.type.ts:24](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/types/configuration.type.ts#L24)

---

### waitMode

• `Optional` **waitMode**: `boolean`

#### Inherited from

RpcProviderOptions.waitMode

#### Defined in

[src/provider/types/configuration.type.ts:25](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/types/configuration.type.ts#L25)

---

### baseFetch

• `Optional` **baseFetch**: (`input`: `RequestInfo` \| `URL`, `init?`: `RequestInit`) => `Promise`<`Response`\>

#### Type declaration

▸ (`input`, `init?`): `Promise`<`Response`\>

[MDN Reference](https://developer.mozilla.org/docs/Web/API/fetch)

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

[src/provider/types/configuration.type.ts:26](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/types/configuration.type.ts#L26)

---

### resourceBoundsOverhead

• `Optional` **resourceBoundsOverhead**: `false` \| [`ResourceBoundsOverhead`](../modules.md#resourceboundsoverhead)

#### Inherited from

RpcProviderOptions.resourceBoundsOverhead

#### Defined in

[src/provider/types/configuration.type.ts:27](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/types/configuration.type.ts#L27)

---

### batch

• `Optional` **batch**: `number` \| `false`

#### Inherited from

RpcProviderOptions.batch

#### Defined in

[src/provider/types/configuration.type.ts:28](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/types/configuration.type.ts#L28)
