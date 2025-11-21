---
id: 'PaymasterOptions'
title: 'Interface: PaymasterOptions'
sidebar_label: 'PaymasterOptions'
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- [`PaymasterRpcOptions`](../modules.md#paymasterrpcoptions)

  ↳ **`PaymasterOptions`**

## Properties

### nodeUrl

• `Optional` **nodeUrl**: `string`

#### Inherited from

PaymasterRpcOptions.nodeUrl

#### Defined in

[src/paymaster/types/configuration.type.ts:6](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/paymaster/types/configuration.type.ts#L6)

---

### default

• `Optional` **default**: `boolean`

#### Inherited from

PaymasterRpcOptions.default

#### Defined in

[src/paymaster/types/configuration.type.ts:7](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/paymaster/types/configuration.type.ts#L7)

---

### headers

• `Optional` **headers**: `object`

#### Inherited from

PaymasterRpcOptions.headers

#### Defined in

[src/paymaster/types/configuration.type.ts:8](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/paymaster/types/configuration.type.ts#L8)

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

PaymasterRpcOptions.baseFetch

#### Defined in

[src/paymaster/types/configuration.type.ts:9](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/paymaster/types/configuration.type.ts#L9)
