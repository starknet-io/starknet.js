---
id: 'RPC.RPCSPEC08.API.CONTRACT'
title: 'Namespace: CONTRACT'
sidebar_label: 'CONTRACT'
custom_edit_url: null
---

[RPCSPEC08](RPC.RPCSPEC08.md).[API](RPC.RPCSPEC08.API.md).CONTRACT

## Type Aliases

### ABI

Ƭ **ABI**: ([`FUNCTION`](RPC.RPCSPEC08.API.CONTRACT.md#function) \| [`CONSTRUCTOR`](RPC.RPCSPEC08.API.CONTRACT.md#constructor) \| [`L1_HANDLER`](RPC.RPCSPEC08.API.CONTRACT.md#l1_handler) \| [`EVENT`](RPC.RPCSPEC08.API.CONTRACT.md#event) \| [`STRUCT`](RPC.RPCSPEC08.API.CONTRACT.md#struct) \| [`ENUM`](RPC.RPCSPEC08.API.CONTRACT.md#enum) \| [`INTERFACE`](RPC.RPCSPEC08.API.CONTRACT.md#interface) \| [`IMPL`](RPC.RPCSPEC08.API.CONTRACT.md#impl))[]

Cairo v>=2 Contract ABI

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/contract.d.ts:11

---

### FUNCTION

Ƭ **FUNCTION**: `Object`

#### Type declaration

| Name               | Type                                                            | Description                  |
| :----------------- | :-------------------------------------------------------------- | :--------------------------- |
| `type`             | [`ABI_TYPE_FUNCTION`](RPC.RPCSPEC08.API.md#abi_type_function)   | -                            |
| `name`             | `string`                                                        | the function's name          |
| `inputs`           | [`ABI_NAME_AND_TYPE`](RPC.RPCSPEC08.API.md#abi_name_and_type)[] | the arguments name and type. |
| `outputs`          | [`ABI_TYPE`](RPC.RPCSPEC08.API.md#abi_type)[]                   | the output type.             |
| `state_mutability` | [`STATE_MUTABILITY`](RPC.RPCSPEC08.API.md#state_mutability)     | -                            |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/contract.d.ts:12

---

### CONSTRUCTOR

Ƭ **CONSTRUCTOR**: `Object`

#### Type declaration

| Name     | Type                                                                |
| :------- | :------------------------------------------------------------------ |
| `type`   | [`ABI_TYPE_CONSTRUCTOR`](RPC.RPCSPEC08.API.md#abi_type_constructor) |
| `name`   | [`ABI_TYPE_CONSTRUCTOR`](RPC.RPCSPEC08.API.md#abi_type_constructor) |
| `inputs` | [`ABI_NAME_AND_TYPE`](RPC.RPCSPEC08.API.md#abi_name_and_type)[]     |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/contract.d.ts:28

---

### L1_HANDLER

Ƭ **L1_HANDLER**: `Object`

#### Type declaration

| Name               | Type                                                              |
| :----------------- | :---------------------------------------------------------------- |
| `type`             | [`ABI_TYPE_L1_HANDLER`](RPC.RPCSPEC08.API.md#abi_type_l1_handler) |
| `name`             | `string`                                                          |
| `inputs`           | [`ABI_NAME_AND_TYPE`](RPC.RPCSPEC08.API.md#abi_name_and_type)[]   |
| `outputs`          | [`ABI_TYPE`](RPC.RPCSPEC08.API.md#abi_type)[]                     |
| `state_mutability` | [`STATE_MUTABILITY`](RPC.RPCSPEC08.API.md#state_mutability)       |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/contract.d.ts:33

---

### EVENT

Ƭ **EVENT**: \{ `type`: [`EVENT_ABI_TYPE`](RPC.RPCSPEC08.API.md#event_abi_type) ; `name`: `string` } & `SimpleOneOf`<[`ENUM_EVENT`](RPC.RPCSPEC08.API.CONTRACT.md#enum_event), [`STRUCT_EVENT`](RPC.RPCSPEC08.API.CONTRACT.md#struct_event)\>

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/contract.d.ts:40

---

### STRUCT_EVENT

Ƭ **STRUCT_EVENT**: `Object`

#### Type declaration

| Name      | Type                                                         | Description    |
| :-------- | :----------------------------------------------------------- | :------------- |
| `kind`    | [`STRUCT_ABI_TYPE`](RPC.RPCSPEC08.API.md#struct_abi_type)    | -              |
| `members` | [`EVENT_FIELD`](RPC.RPCSPEC08.API.CONTRACT.md#event_field)[] | struct members |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/contract.d.ts:47

---

### ENUM_EVENT

Ƭ **ENUM_EVENT**: `Object`

#### Type declaration

| Name       | Type                                                         | Description   |
| :--------- | :----------------------------------------------------------- | :------------ |
| `kind`     | [`ABI_TYPE_ENUM`](RPC.RPCSPEC08.API.md#abi_type_enum)        | -             |
| `variants` | [`EVENT_FIELD`](RPC.RPCSPEC08.API.CONTRACT.md#event_field)[] | enum variants |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/contract.d.ts:54

---

### STRUCT

Ƭ **STRUCT**: `Object`

#### Type declaration

| Name      | Type                                                            | Description                                                                  |
| :-------- | :-------------------------------------------------------------- | :--------------------------------------------------------------------------- |
| `type`    | [`STRUCT_ABI_TYPE`](RPC.RPCSPEC08.API.md#struct_abi_type)       | -                                                                            |
| `name`    | `string`                                                        | the (Cairo) struct name, including namespacing                               |
| `members` | [`ABI_NAME_AND_TYPE`](RPC.RPCSPEC08.API.md#abi_name_and_type)[] | name of the struct member. type of the struct member, including namespacing. |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/contract.d.ts:61

---

### ENUM

Ƭ **ENUM**: `Object`

#### Type declaration

| Name       | Type                                                            | Description                                                                |
| :--------- | :-------------------------------------------------------------- | :------------------------------------------------------------------------- |
| `type`     | [`ABI_TYPE_ENUM`](RPC.RPCSPEC08.API.md#abi_type_enum)           | -                                                                          |
| `name`     | `string`                                                        | the (Cairo) enum name, including namespacing                               |
| `variants` | [`ABI_NAME_AND_TYPE`](RPC.RPCSPEC08.API.md#abi_name_and_type)[] | name of the enum variant. type of the enum variant, including namespacing. |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/contract.d.ts:73

---

### INTERFACE

Ƭ **INTERFACE**: `Object`

#### Type declaration

| Name    | Type                                                   |
| :------ | :----------------------------------------------------- |
| `type`  | `"interface"`                                          |
| `name`  | `string`                                               |
| `items` | [`FUNCTION`](RPC.RPCSPEC08.API.CONTRACT.md#function)[] |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/contract.d.ts:85

---

### IMPL

Ƭ **IMPL**: `Object`

#### Type declaration

| Name             | Type     | Description                                          |
| :--------------- | :------- | :--------------------------------------------------- |
| `type`           | `"impl"` | -                                                    |
| `name`           | `string` | the name of an impl containing contract entry points |
| `interface_name` | `string` | the name of the trait corresponding to this impl     |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/contract.d.ts:90

---

### EVENT_KIND

Ƭ **EVENT_KIND**: [`STRUCT_ABI_TYPE`](RPC.RPCSPEC08.API.md#struct_abi_type) \| [`ABI_TYPE_ENUM`](RPC.RPCSPEC08.API.md#abi_type_enum)

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/contract.d.ts:101

---

### EVENT_FIELD

Ƭ **EVENT_FIELD**: `Object`

#### Type declaration

| Name   | Type                                          | Description                                                    |
| :----- | :-------------------------------------------- | :------------------------------------------------------------- |
| `name` | `string`                                      | the name of the struct member or enum variant                  |
| `type` | `string`                                      | the Cairo type of the member or variant, including namespacing |
| `kind` | `"key"` \| `"data"` \| `"nested"` \| `"flat"` | -                                                              |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/contract.d.ts:102
