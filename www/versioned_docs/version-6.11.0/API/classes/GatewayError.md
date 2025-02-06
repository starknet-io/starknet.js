---
id: 'GatewayError'
title: 'Class: GatewayError'
sidebar_label: 'GatewayError'
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- [`LibraryError`](LibraryError.md)

  ↳ **`GatewayError`**

## Constructors

### constructor

• **new GatewayError**(`message`, `errorCode`): [`GatewayError`](GatewayError.md)

#### Parameters

| Name        | Type     |
| :---------- | :------- |
| `message`   | `string` |
| `errorCode` | `string` |

#### Returns

[`GatewayError`](GatewayError.md)

#### Overrides

[LibraryError](LibraryError.md).[constructor](LibraryError.md#constructor)

#### Defined in

[src/provider/errors.ts:40](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/provider/errors.ts#L40)

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

node_modules/@types/node/globals.d.ts:28

---

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

[LibraryError](LibraryError.md).[stackTraceLimit](LibraryError.md#stacktracelimit)

#### Defined in

node_modules/@types/node/globals.d.ts:30

---

### errorCode

• **errorCode**: `string`

#### Defined in

[src/provider/errors.ts:42](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/provider/errors.ts#L42)

---

### name

• **name**: `string`

#### Inherited from

[LibraryError](LibraryError.md).[name](LibraryError.md#name)

#### Defined in

[src/provider/errors.ts:16](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/provider/errors.ts#L16)

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

node_modules/@types/node/globals.d.ts:21
