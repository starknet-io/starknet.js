---
id: 'typedData.TypedData'
title: 'Interface: TypedData'
sidebar_label: 'TypedData'
custom_edit_url: null
---

[typedData](../namespaces/typedData.md).TypedData

The complete typed data, with all the structs, domain data, primary type of the message, and the message itself.

## Properties

### types

• **types**: `Record`<`string`, [`StarkNetType`](../namespaces/typedData.md#starknettype)[]\>

#### Defined in

[src/utils/typedData/types.ts:33](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/typedData/types.ts#L33)

---

### primaryType

• **primaryType**: `string`

#### Defined in

[src/utils/typedData/types.ts:34](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/typedData/types.ts#L34)

---

### domain

• **domain**: [`StarkNetDomain`](typedData.StarkNetDomain.md)

#### Defined in

[src/utils/typedData/types.ts:35](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/typedData/types.ts#L35)

---

### message

• **message**: `Record`<`string`, `unknown`\>

#### Defined in

[src/utils/typedData/types.ts:36](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/typedData/types.ts#L36)
