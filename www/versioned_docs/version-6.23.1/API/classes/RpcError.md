---
id: 'RpcError'
title: 'Class: RpcError<BaseErrorT>'
sidebar_label: 'RpcError'
sidebar_position: 0
custom_edit_url: null
---

## Type parameters

| Name         | Type                                                                                                      |
| :----------- | :-------------------------------------------------------------------------------------------------------- |
| `BaseErrorT` | extends [`RPC_ERROR`](../namespaces/types.md#rpc_error) = [`RPC_ERROR`](../namespaces/types.md#rpc_error) |

## Hierarchy

- [`LibraryError`](LibraryError.md)

  ↳ **`RpcError`**

## Constructors

### constructor

• **new RpcError**<`BaseErrorT`\>(`baseError`, `method`, `params`): [`RpcError`](RpcError.md)<`BaseErrorT`\>

#### Type parameters

| Name         | Type                                                                                                      |
| :----------- | :-------------------------------------------------------------------------------------------------------- |
| `BaseErrorT` | extends [`RPC_ERROR`](../namespaces/types.md#rpc_error) = [`RPC_ERROR`](../namespaces/types.md#rpc_error) |

#### Parameters

| Name        | Type         |
| :---------- | :----------- |
| `baseError` | `BaseErrorT` |
| `method`    | `string`     |
| `params`    | `any`        |

#### Returns

[`RpcError`](RpcError.md)<`BaseErrorT`\>

#### Overrides

[LibraryError](LibraryError.md).[constructor](LibraryError.md#constructor)

#### Defined in

[src/utils/errors/index.ts:50](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/utils/errors/index.ts#L50)

## Properties

### prepareStackTrace

▪ `Static` `Optional` **prepareStackTrace**: (`err`: `Error`, `stackTraces`: `CallSite`[]) => `any`

#### Type declaration

▸ (`err`, `stackTraces`): `any`

Optional override for formatting stack traces

##### Parameters

| Name          | Type         |
| :------------ | :----------- |
| `err`         | `Error`      |
| `stackTraces` | `CallSite`[] |

##### Returns

`any`

**`See`**

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

#### Inherited from

[LibraryError](LibraryError.md).[prepareStackTrace](LibraryError.md#preparestacktrace)

#### Defined in

node_modules/@types/node/globals.d.ts:143

---

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

[LibraryError](LibraryError.md).[stackTraceLimit](LibraryError.md#stacktracelimit)

#### Defined in

node_modules/@types/node/globals.d.ts:145

---

### request

• `Readonly` **request**: `Object`

#### Type declaration

| Name     | Type     |
| :------- | :------- |
| `method` | `string` |
| `params` | `any`    |

#### Defined in

[src/utils/errors/index.ts:45](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/utils/errors/index.ts#L45)

---

### baseError

• `Readonly` **baseError**: `BaseErrorT`

#### Defined in

[src/utils/errors/index.ts:51](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/utils/errors/index.ts#L51)

---

### name

• **name**: `string`

#### Inherited from

[LibraryError](LibraryError.md).[name](LibraryError.md#name)

#### Defined in

[src/utils/errors/index.ts:21](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/utils/errors/index.ts#L21)

---

### message

• **message**: `string`

#### Inherited from

[LibraryError](LibraryError.md).[message](LibraryError.md#message)

#### Defined in

www/node_modules/typescript/lib/lib.es5.d.ts:1055

---

### stack

• `Optional` **stack**: `string`

#### Inherited from

[LibraryError](LibraryError.md).[stack](LibraryError.md#stack)

#### Defined in

www/node_modules/typescript/lib/lib.es5.d.ts:1056

---

### cause

• `Optional` **cause**: `unknown`

#### Inherited from

[LibraryError](LibraryError.md).[cause](LibraryError.md#cause)

#### Defined in

www/node_modules/typescript/lib/lib.es2022.error.d.ts:24

## Accessors

### code

• `get` **code**(): `1` \| `32` \| `10` \| `20` \| `24` \| `27` \| `28` \| `29` \| `31` \| `33` \| `34` \| `40` \| `41` \| `51` \| `52` \| `53` \| `54` \| `55` \| `56` \| `57` \| `58` \| `59` \| `60` \| `61` \| `62` \| `63`

#### Returns

`1` \| `32` \| `10` \| `20` \| `24` \| `27` \| `28` \| `29` \| `31` \| `33` \| `34` \| `40` \| `41` \| `51` \| `52` \| `53` \| `54` \| `55` \| `56` \| `57` \| `58` \| `59` \| `60` \| `61` \| `62` \| `63`

#### Defined in

[src/utils/errors/index.ts:62](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/utils/errors/index.ts#L62)

## Methods

### captureStackTrace

▸ **captureStackTrace**(`targetObject`, `constructorOpt?`): `void`

Create .stack property on a target object

#### Parameters

| Name              | Type       |
| :---------------- | :--------- |
| `targetObject`    | `object`   |
| `constructorOpt?` | `Function` |

#### Returns

`void`

#### Inherited from

[LibraryError](LibraryError.md).[captureStackTrace](LibraryError.md#capturestacktrace)

#### Defined in

node_modules/@types/node/globals.d.ts:136

---

### isType

▸ **isType**<`N`, `C`\>(`typeName`): this is RpcError<RPC_ERROR_SET[N] & Object\>

Verifies the underlying RPC error, also serves as a type guard for the _baseError_ property

#### Type parameters

| Name | Type                                                                                                                                                                                                                |
| :--- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `N`  | extends keyof [`RPC_ERROR_SET`](../namespaces/types.md#rpc_error_set)                                                                                                                                               |
| `C`  | extends `1` \| `32` \| `10` \| `20` \| `24` \| `27` \| `28` \| `29` \| `31` \| `33` \| `34` \| `40` \| `41` \| `51` \| `52` \| `53` \| `54` \| `55` \| `56` \| `57` \| `58` \| `59` \| `60` \| `61` \| `62` \| `63` |

#### Parameters

| Name       | Type |
| :--------- | :--- |
| `typeName` | `N`  |

#### Returns

this is RpcError<RPC_ERROR_SET[N] & Object\>

**`Example`**

```typescript
SomeError.isType('UNEXPECTED_ERROR');
```

#### Defined in

[src/utils/errors/index.ts:73](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/utils/errors/index.ts#L73)
