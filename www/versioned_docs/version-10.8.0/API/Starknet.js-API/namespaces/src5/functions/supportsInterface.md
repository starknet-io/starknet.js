# Function: supportsInterface()

> **supportsInterface**(`provider`, `contractAddress`, `interfaceId`): `Promise`\<`boolean`\>

Defined in: [src/utils/src5.ts:19](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/src5.ts#L19)

Implementation of ERC165 introspection.
Verify if a contract has implemented some standard functionalities.

## Parameters

### provider

[`RpcProvider`](../../../../classes/RpcProvider.md)

the provider to access to Starknet.

### contractAddress

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)

the address of the contract to check.

### interfaceId

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)

the hash of the functionality to check.

## Returns

`Promise`\<`boolean`\>

true if the interfaceId is implemented in this contract.

## Example

```typescript
const snip9InterfaceV2Id = constants.SNIP9_V2_INTERFACE_ID;
const result = src5.supportsInterface(myProvider, accountContractAddress, snip9InterfaceV2Id);
// result = true
```
