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

  ↳↳ [`GatewayError`](GatewayError.md)

  ↳↳ [`HttpError`](HttpError.md)

## Constructors

### constructor

• **new LibraryError**(`message?`, `options?`)

#### Parameters

| Name       | Type           |
| :--------- | :------------- |
| `message?` | `string`       |
| `options?` | `ErrorOptions` |

#### Inherited from

CustomError.constructor

#### Defined in

node_modules/ts-custom-error/dist/custom-error.d.ts:6

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

CustomError.prepareStackTrace

#### Defined in

node_modules/@types/node/globals.d.ts:11

---

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

CustomError.stackTraceLimit

#### Defined in

node_modules/@types/node/globals.d.ts:13

---

### name

• **name**: `string`

#### Inherited from

CustomError.name

#### Defined in

node_modules/ts-custom-error/dist/custom-error.d.ts:5

---

### message

• **message**: `string`

#### Inherited from

CustomError.message

#### Defined in

www/node_modules/typescript/lib/lib.es5.d.ts:1054

---

### stack

• `Optional` **stack**: `string`

#### Inherited from

CustomError.stack

#### Defined in

www/node_modules/typescript/lib/lib.es5.d.ts:1055

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

CustomError.captureStackTrace

#### Defined in

node_modules/@types/node/globals.d.ts:4
