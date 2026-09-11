# Interface: ProviderOptions

Defined in: [src/provider/types/configuration.type.ts:6](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/types/configuration.type.ts#L6)

## Extends

- [`RpcProviderOptions`](../type-aliases/RpcProviderOptions.md)

## Properties

### nodeUrl?

> `optional` **nodeUrl?**: `string`

Defined in: [src/provider/types/configuration.type.ts:9](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/types/configuration.type.ts#L9)

#### Inherited from

`RpcProviderOptions.nodeUrl`

---

### retries?

> `optional` **retries?**: `number`

Defined in: [src/provider/types/configuration.type.ts:13](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/types/configuration.type.ts#L13)

Define the number of retries for waitForTransaction

#### Inherited from

`RpcProviderOptions.retries`

---

### transactionRetryIntervalFallback?

> `optional` **transactionRetryIntervalFallback?**: `number`

Defined in: [src/provider/types/configuration.type.ts:17](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/types/configuration.type.ts#L17)

Define the time interval between retries in milliseconds

#### Inherited from

`RpcProviderOptions.transactionRetryIntervalFallback`

---

### headers?

> `optional` **headers?**: `object`

Defined in: [src/provider/types/configuration.type.ts:21](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/types/configuration.type.ts#L21)

Define the headers

#### Inherited from

`RpcProviderOptions.headers`

---

### blockIdentifier?

> `optional` **blockIdentifier?**: [`BlockIdentifier`](../type-aliases/BlockIdentifier.md)

Defined in: [src/provider/types/configuration.type.ts:22](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/types/configuration.type.ts#L22)

#### Inherited from

`RpcProviderOptions.blockIdentifier`

---

### chainId?

> `optional` **chainId?**: `"0x534e5f4d41494e"` \| `"0x534e5f5345504f4c4941"`

Defined in: [src/provider/types/configuration.type.ts:23](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/types/configuration.type.ts#L23)

#### Inherited from

`RpcProviderOptions.chainId`

---

### specVersion?

> `optional` **specVersion?**: `"0.9.0"` \| `"0.10.0"` \| `"0.10.2"` \| `"0.10.3"` \| `"0.10.4"`

Defined in: [src/provider/types/configuration.type.ts:24](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/types/configuration.type.ts#L24)

#### Inherited from

`RpcProviderOptions.specVersion`

---

### waitMode?

> `optional` **waitMode?**: `boolean`

Defined in: [src/provider/types/configuration.type.ts:25](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/types/configuration.type.ts#L25)

#### Inherited from

`RpcProviderOptions.waitMode`

---

### baseFetch?

> `optional` **baseFetch?**: (`input`, `init?`) => `Promise`\<`Response`\>

Defined in: [src/provider/types/configuration.type.ts:26](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/types/configuration.type.ts#L26)

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/fetch)

#### Parameters

##### input

`RequestInfo` \| `URL`

##### init?

`RequestInit`

#### Returns

`Promise`\<`Response`\>

#### Inherited from

`RpcProviderOptions.baseFetch`

---

### resourceBoundsOverhead?

> `optional` **resourceBoundsOverhead?**: `false` \| [`ResourceBoundsOverhead`](../type-aliases/ResourceBoundsOverhead.md)

Defined in: [src/provider/types/configuration.type.ts:27](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/types/configuration.type.ts#L27)

#### Inherited from

`RpcProviderOptions.resourceBoundsOverhead`

---

### batch?

> `optional` **batch?**: `number` \| `false`

Defined in: [src/provider/types/configuration.type.ts:28](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/types/configuration.type.ts#L28)

#### Inherited from

`RpcProviderOptions.batch`

---

### plugins?

> `optional` **plugins?**: `false` \| [`StarknetPlugin`](StarknetPlugin.md)\<`any`, `any`\>[]

Defined in: [src/plugins/types.ts:103](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/plugins/types.ts#L103)

Plugins to install.

- `undefined` (default): install defaultPlugins (starknetId, brotherId)
- explicit array: install exactly these plugins
- `false`: no plugins

#### Inherited from

`RpcProviderOptions.plugins`
