# Interface: ProviderHooks

Defined in: [src/plugins/types.ts:8](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/plugins/types.ts#L8)

## Extended by

- [`AccountHooks`](AccountHooks.md)

## Methods

### beforeRequest()?

> `optional` **beforeRequest**(`ctx`): `void` \| \{ `method`: `string`; `params`: `any`; \}

Defined in: [src/plugins/types.ts:13](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/plugins/types.ts#L13)

Called before every RPC request through the channel.
Return modified context to transform the request, or void to pass through.

#### Parameters

##### ctx

###### method

`string`

###### params

`any`

#### Returns

`void` \| \{ `method`: `string`; `params`: `any`; \}

---

### afterRequest()?

> `optional` **afterRequest**(`ctx`): `any`

Defined in: [src/plugins/types.ts:19](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/plugins/types.ts#L19)

Called after every RPC request through the channel.
Return a value to replace the result, or void to pass through.

#### Parameters

##### ctx

###### method

`string`

###### params

`any`

###### result

`any`

#### Returns

`any`
