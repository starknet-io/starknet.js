# Interface: PaymasterOptions

Defined in: [src/paymaster/types/configuration.type.ts:3](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/paymaster/types/configuration.type.ts#L3)

## Extends

- [`PaymasterRpcOptions`](../type-aliases/PaymasterRpcOptions.md)

## Properties

### nodeUrl?

> `optional` **nodeUrl?**: `string`

Defined in: [src/paymaster/types/configuration.type.ts:6](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/paymaster/types/configuration.type.ts#L6)

#### Inherited from

`PaymasterRpcOptions.nodeUrl`

---

### headers?

> `optional` **headers?**: `object`

Defined in: [src/paymaster/types/configuration.type.ts:7](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/paymaster/types/configuration.type.ts#L7)

#### Inherited from

`PaymasterRpcOptions.headers`

---

### baseFetch?

> `optional` **baseFetch?**: (`input`, `init?`) => `Promise`\<`Response`\>

Defined in: [src/paymaster/types/configuration.type.ts:8](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/paymaster/types/configuration.type.ts#L8)

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/fetch)

#### Parameters

##### input

`RequestInfo` \| `URL`

##### init?

`RequestInit`

#### Returns

`Promise`\<`Response`\>

#### Inherited from

`PaymasterRpcOptions.baseFetch`

---

### mute?

> `optional` **mute?**: `boolean`

Defined in: [src/paymaster/types/configuration.type.ts:9](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/paymaster/types/configuration.type.ts#L9)

#### Inherited from

`PaymasterRpcOptions.mute`
