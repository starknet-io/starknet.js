---
id: 'CustomError'
title: 'Class: CustomError'
sidebar_label: 'CustomError'
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- `Error`

  ↳ **`CustomError`**

  ↳↳ [`LibraryError`](LibraryError.md)

## Constructors

### constructor

• **new CustomError**(`message?`): [`CustomError`](CustomError.md)

#### Parameters

| Name       | Type     |
| :--------- | :------- |
| `message?` | `string` |

#### Returns

[`CustomError`](CustomError.md)

#### Overrides

Error.constructor

#### Defined in

[src/provider/errors.ts:18](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/provider/errors.ts#L18)

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

Error.prepareStackTrace

#### Defined in

node_modules/@types/node/globals.d.ts:28

---

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

Error.stackTraceLimit

#### Defined in

node_modules/@types/node/globals.d.ts:30

---

### name

• **name**: `string`

#### Overrides

Error.name

#### Defined in

[src/provider/errors.ts:16](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/provider/errors.ts#L16)

---

### message

• **message**: `string`

#### Inherited from

Error.message

#### Defined in

www/node_modules/typescript/lib/lib.es5.d.ts:1055

---

### stack

• `Optional` **stack**: `string`

#### Inherited from

Error.stack

#### Defined in

www/node_modules/typescript/lib/lib.es5.d.ts:1056

---

### cause

• `Optional` **cause**: `unknown`

#### Inherited from

Error.cause

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

Error.captureStackTrace

#### Defined in

node_modules/@types/node/globals.d.ts:21
