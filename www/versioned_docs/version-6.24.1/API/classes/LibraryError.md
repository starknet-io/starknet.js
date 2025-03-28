---
id: 'LibraryError'
title: 'Class: LibraryError'
sidebar_label: 'LibraryError'
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- [`CustomError`](CustomError.md)

  ↳ **`LibraryError`**

  ↳↳ [`RpcError`](RpcError.md)

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

[CustomError](CustomError.md).[constructor](CustomError.md#constructor)

#### Defined in

[src/utils/errors/index.ts:23](https://github.com/starknet-io/starknet.js/blob/v6.24.1/src/utils/errors/index.ts#L23)

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

[CustomError](CustomError.md).[prepareStackTrace](CustomError.md#preparestacktrace)

#### Defined in

node_modules/@types/node/globals.d.ts:143

---

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

[CustomError](CustomError.md).[stackTraceLimit](CustomError.md#stacktracelimit)

#### Defined in

node_modules/@types/node/globals.d.ts:145

---

### name

• **name**: `string`

#### Inherited from

[CustomError](CustomError.md).[name](CustomError.md#name)

#### Defined in

[src/utils/errors/index.ts:21](https://github.com/starknet-io/starknet.js/blob/v6.24.1/src/utils/errors/index.ts#L21)

---

### message

• **message**: `string`

#### Inherited from

[CustomError](CustomError.md).[message](CustomError.md#message)

#### Defined in

www/node_modules/typescript/lib/lib.es5.d.ts:1055

---

### stack

• `Optional` **stack**: `string`

#### Inherited from

[CustomError](CustomError.md).[stack](CustomError.md#stack)

#### Defined in

www/node_modules/typescript/lib/lib.es5.d.ts:1056

---

### cause

• `Optional` **cause**: `unknown`

#### Inherited from

[CustomError](CustomError.md).[cause](CustomError.md#cause)

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

[CustomError](CustomError.md).[captureStackTrace](CustomError.md#capturestacktrace)

#### Defined in

node_modules/@types/node/globals.d.ts:136
