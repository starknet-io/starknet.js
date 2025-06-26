---
id: 'src5'
title: 'Namespace: src5'
sidebar_label: 'src5'
sidebar_position: 0
custom_edit_url: null
---

## Functions

### supportsInterface

▸ **supportsInterface**(`provider`, `contractAddress`, `interfaceId`): `Promise`<`boolean`\>

Implementation of ERC165 introspection.
Verify if a contract has implemented some standard functionalities.

#### Parameters

| Name              | Type                                    | Description                             |
| :---------------- | :-------------------------------------- | :-------------------------------------- |
| `provider`        | [`Provider`](../classes/Provider.md)    | the provider to access to Starknet.     |
| `contractAddress` | [`BigNumberish`](types.md#bignumberish) | the address of the contract to check.   |
| `interfaceId`     | [`BigNumberish`](types.md#bignumberish) | the hash of the functionality to check. |

#### Returns

`Promise`<`boolean`\>

true if the interfaceId is implemented in this contract.

**`Example`**

```typescript
const snip9InterfaceV2Id = constants.SNIP9_V2_INTERFACE_ID;
const result = src5.supportsInterface(myProvider, accountContractAddress, snip9InterfaceV2Id);
// result = true
```

#### Defined in

[src/utils/src5.ts:19](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/utils/src5.ts#L19)
