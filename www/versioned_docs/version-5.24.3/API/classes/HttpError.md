---
id: 'HttpError'
title: 'Class: HttpError'
sidebar_label: 'HttpError'
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- [`LibraryError`](LibraryError.md)

  ↳ **`HttpError`**

## Constructors

### constructor

• **new HttpError**(`message`, `errorCode`)

#### Parameters

| Name        | Type     |
| :---------- | :------- |
| `message`   | `string` |
| `errorCode` | `number` |

#### Overrides

[LibraryError](LibraryError.md).[constructor](LibraryError.md#constructor)

#### Defined in

[src/provider/errors.ts:46](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/provider/errors.ts#L46)

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

[LibraryError](LibraryError.md).[prepareStackTrace](LibraryError.md#preparestacktrace)

#### Defined in

node_modules/@types/node/globals.d.ts:11

---

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

[LibraryError](LibraryError.md).[stackTraceLimit](LibraryError.md#stacktracelimit)

#### Defined in

node_modules/@types/node/globals.d.ts:13

---

### errorCode

• **errorCode**: `number`

#### Defined in

[src/provider/errors.ts:46](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/provider/errors.ts#L46)

---

### name

• **name**: `string`

#### Inherited from

[LibraryError](LibraryError.md).[name](LibraryError.md#name)

#### Defined in

[src/provider/errors.ts:16](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/provider/errors.ts#L16)

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

[LibraryError](LibraryError.md).[captureStackTrace](LibraryError.md#capturestacktrace)

#### Defined in

node_modules/@types/node/globals.d.ts:4
