---
id: 'LibraryError'
title: 'Class: LibraryError'
sidebar_label: 'LibraryError'
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- `CustomError`

  ↳ **`LibraryError`**

  ↳↳ [`RpcError`](RpcError.md)

  ↳↳ [`TimeoutError`](TimeoutError.md)

  ↳↳ [`WebSocketNotConnectedError`](WebSocketNotConnectedError.md)

## Constructors

### constructor

• **new LibraryError**(`message?`): [`LibraryError`](LibraryError.md)

#### Parameters

| Name       | Type     |
| :--------- | :------- |
| `message?` | `string` |

#### Returns

[`LibraryError`](LibraryError.md)

#### Inherited from

CustomError.constructor

#### Defined in

[src/utils/errors/index.ts:23](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/utils/errors/index.ts#L23)

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

CustomError.prepareStackTrace

#### Defined in

node_modules/@types/node/globals.d.ts:143

---

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

CustomError.stackTraceLimit

#### Defined in

node_modules/@types/node/globals.d.ts:145

---

### name

• **name**: `string`

#### Inherited from

CustomError.name

#### Defined in

[src/utils/errors/index.ts:21](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/utils/errors/index.ts#L21)

---

### message

• **message**: `string`

#### Inherited from

CustomError.message

#### Defined in

www/node_modules/typescript/lib/lib.es5.d.ts:1055

---

### stack

• `Optional` **stack**: `string`

#### Inherited from

CustomError.stack

#### Defined in

www/node_modules/typescript/lib/lib.es5.d.ts:1056

---

### cause

• `Optional` **cause**: `unknown`

#### Inherited from

CustomError.cause

#### Defined in

www/node_modules/typescript/lib/lib.es2022.error.d.ts:24

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

CustomError.captureStackTrace

#### Defined in

node_modules/@types/node/globals.d.ts:136
