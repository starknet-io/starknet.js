# Function: getStarknetIdContract()

> **getStarknetIdContract**(`chainId`): `string`

Defined in: [src/utils/starknetId.ts:144](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/starknetId.ts#L144)

Returns the Starknet ID contract address based on the provided chain ID.

## Parameters

### chainId

`"0x534e5f4d41494e"` \| `"0x534e5f5345504f4c4941"`

The chain ID of the Starknet network.

## Returns

`string`

The Starknet ID contract address.

## Throws

Throws an error if the Starknet ID contract is not deployed on the network.

## Example

```typescript
const result = starknetId.getStarknetIdContract(constants.StarknetChainId.SN_SEPOLIA);
// result = "0x154bc2e1af9260b9e66af0e9c46fc757ff893b3ff6a85718a810baf1474"
```
