# Function: getStarknetIdIdentityContract()

> **getStarknetIdIdentityContract**(`chainId`): `string`

Defined in: [src/utils/starknetId.ts:176](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/starknetId.ts#L176)

Returns the Starknet ID identity contract address for the given chain ID.

## Parameters

### chainId

`"0x534e5f4d41494e"` \| `"0x534e5f5345504f4c4941"`

The chain ID for the specified network.

## Returns

`string`

The Starknet ID identity contract address for the specified network.

## Throws

If the Starknet ID verifier contract is not deployed on the network.

## Example

```typescript
const result = starknetId.getStarknetIdIdentityContract(constants.StarknetChainId.SN_SEPOLIA);
// result = "0x3697660a0981d734780731949ecb2b4a38d6a58fc41629ed611e8defda"
```
