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

  ↳↳ [`GatewayError`](GatewayError.md)

  ↳↳ [`HttpError`](HttpError.md)

## Constructors

### constructor

• **new LibraryError**(`message?`)

#### Parameters

| Name       | Type     |
| :--------- | :------- |
| `message?` | `string` |

#### Inherited from

[CustomError](CustomError.md).[constructor](CustomError.md#constructor)

#### Defined in

[src/provider/errors.ts:18](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/provider/errors.ts#L18)

## Properties

### prepareStackTrace

▪ `Static` `Optional` **prepareStackTrace**: (`err`: `Error`, `stackTraces`: `CallSite`[]) => `any`

#### Type declaration

▸ (`err`, `stackTraces`): `any`

Optional override for formatting stack traces

**`See`**

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

##### Parameters

| Name          | Type         |
| :------------ | :----------- |
| `err`         | `Error`      |
| `stackTraces` | `CallSite`[] |

##### Returns

`any`

#### Inherited from

[CustomError](CustomError.md).[prepareStackTrace](CustomError.md#preparestacktrace)

#### Defined in

node_modules/@types/node/globals.d.ts:11

---

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

[CustomError](CustomError.md).[stackTraceLimit](CustomError.md#stacktracelimit)

#### Defined in

node_modules/@types/node/globals.d.ts:13

---

### name

• **name**: `string`

#### Inherited from

[CustomError](CustomError.md).[name](CustomError.md#name)

#### Defined in

[src/provider/errors.ts:16](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/provider/errors.ts#L16)

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

## Methods

### captureStackTrace

▸ `Static` **captureStackTrace**(`targetObject`, `constructorOpt?`): `void`

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

node_modules/@types/node/globals.d.ts:4
