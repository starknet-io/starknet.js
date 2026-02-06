---
id: 'RPC.RPCSPEC010.WALLET_API.TypedData'
title: 'Interface: TypedData'
sidebar_label: 'TypedData'
custom_edit_url: null
---

[RPCSPEC010](../namespaces/RPC.RPCSPEC010.md).[WALLET_API](../namespaces/RPC.RPCSPEC010.WALLET_API.md).TypedData

SPEC: TYPED_DATA
The complete typed data, with all the structs, domain data, primary type of the message, and the message itself.

## Properties

### types

• **types**: `Record`\<`string`, [`StarknetType`](../namespaces/RPC.RPCSPEC010.WALLET_API.md#starknettype)[]\>

#### Defined in

node_modules/@starknet-io/starknet-types-010/dist/types/wallet-api/typedData.d.ts:50

---

### primaryType

• **primaryType**: `string`

#### Defined in

node_modules/@starknet-io/starknet-types-010/dist/types/wallet-api/typedData.d.ts:51

---

### domain

• **domain**: [`StarknetDomain`](RPC.RPCSPEC010.WALLET_API.StarknetDomain.md)

#### Defined in

node_modules/@starknet-io/starknet-types-010/dist/types/wallet-api/typedData.d.ts:52

---

### message

• **message**: `object`

#### Defined in

node_modules/@starknet-io/starknet-types-010/dist/types/wallet-api/typedData.d.ts:53
