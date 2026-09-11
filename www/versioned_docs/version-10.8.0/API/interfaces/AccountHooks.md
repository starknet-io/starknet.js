# Interface: AccountHooks

Defined in: [src/plugins/types.ts:24](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/plugins/types.ts#L24)

## Extends

- [`ProviderHooks`](ProviderHooks.md)

## Methods

### beforeExecute()?

> `optional` **beforeExecute**(`ctx`): `void` \| \{ `calls`: [`AllowArray`](../type-aliases/AllowArray.md)\<[`Call`](../type-aliases/Call.md)\>; `details`: [`UniversalDetails`](UniversalDetails.md); \}

Defined in: [src/plugins/types.ts:29](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/plugins/types.ts#L29)

Called before Account.execute().
Return modified context to transform calls/details, or void to pass through.

#### Parameters

##### ctx

###### calls

[`AllowArray`](../type-aliases/AllowArray.md)\<[`Call`](../type-aliases/Call.md)\>

###### details

[`UniversalDetails`](UniversalDetails.md)

#### Returns

`void` \| \{ `calls`: [`AllowArray`](../type-aliases/AllowArray.md)\<[`Call`](../type-aliases/Call.md)\>; `details`: [`UniversalDetails`](UniversalDetails.md); \}

---

### afterExecute()?

> `optional` **afterExecute**(`ctx`): `void`

Defined in: [src/plugins/types.ts:37](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/plugins/types.ts#L37)

Called after Account.execute() with the result.

#### Parameters

##### ctx

###### calls

[`AllowArray`](../type-aliases/AllowArray.md)\<[`Call`](../type-aliases/Call.md)\>

###### result

\{ `transaction_hash`: `string`; \}

###### result.transaction_hash

`string`

#### Returns

`void`

---

### beforeSign()?

> `optional` **beforeSign**(`ctx`): `void` \| \{ `typedData`: [`TypedData`](../Starknet.js-API/namespaces/RPC/interfaces/TypedData.md); \}

Defined in: [src/plugins/types.ts:43](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/plugins/types.ts#L43)

Called before Account.signMessage().
Return modified context to transform typedData, or void to pass through.

#### Parameters

##### ctx

###### typedData

[`TypedData`](../Starknet.js-API/namespaces/RPC/interfaces/TypedData.md)

#### Returns

`void` \| \{ `typedData`: [`TypedData`](../Starknet.js-API/namespaces/RPC/interfaces/TypedData.md); \}

---

### afterSign()?

> `optional` **afterSign**(`ctx`): `void`

Defined in: [src/plugins/types.ts:48](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/plugins/types.ts#L48)

Called after Account.signMessage() with the result.

#### Parameters

##### ctx

###### typedData

[`TypedData`](../Starknet.js-API/namespaces/RPC/interfaces/TypedData.md)

###### signature

[`Signature`](../type-aliases/Signature.md)

#### Returns

`void`

---

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

#### Inherited from

[`ProviderHooks`](ProviderHooks.md).[`beforeRequest`](ProviderHooks.md#beforerequest)

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

#### Inherited from

[`ProviderHooks`](ProviderHooks.md).[`afterRequest`](ProviderHooks.md#afterrequest)
