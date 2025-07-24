---
id: 'types.PaymasterOptions'
title: 'Interface: PaymasterOptions'
sidebar_label: 'PaymasterOptions'
custom_edit_url: null
---

[types](../namespaces/types.md).PaymasterOptions

## Hierarchy

- [`PaymasterRpcOptions`](../namespaces/types.md#paymasterrpcoptions)

  ↳ **`PaymasterOptions`**

## Properties

### nodeUrl

• `Optional` **nodeUrl**: `string`

#### Inherited from

PaymasterRpcOptions.nodeUrl

#### Defined in

[src/types/paymaster/configuration.ts:6](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/types/paymaster/configuration.ts#L6)

---

### default

• `Optional` **default**: `boolean`

#### Inherited from

PaymasterRpcOptions.default

#### Defined in

[src/types/paymaster/configuration.ts:7](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/types/paymaster/configuration.ts#L7)

---

### headers

• `Optional` **headers**: `object`

#### Inherited from

PaymasterRpcOptions.headers

#### Defined in

[src/types/paymaster/configuration.ts:8](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/types/paymaster/configuration.ts#L8)

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

PaymasterRpcOptions.baseFetch

#### Defined in

[src/types/paymaster/configuration.ts:9](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/types/paymaster/configuration.ts#L9)
