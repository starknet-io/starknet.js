# Function: getStarknetIdPfpContract()

> **getStarknetIdPfpContract**(`chainId`): `string`

Defined in: [src/utils/starknetId.ts:264](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/starknetId.ts#L264)

Retrieves the contract address of the Starknet.id profile picture verifier contract based on the given chain ID.

## Parameters

### chainId

`"0x534e5f4d41494e"` \| `"0x534e5f5345504f4c4941"`

The chain ID of the network.

## Returns

`string`

- The contract address of the Starknet.id profile picture verifier contract.

## Throws

- Throws an error if the Starknet.id profile picture verifier contract is not yet deployed on the network.

## Example

```typescript
const result = starknetId.getStarknetIdPfpContract(constants.StarknetChainId.SN_SEPOLIA);
// result = "0x9e7bdb8dabd02ea8cfc23b1d1c5278e46490f193f87516ed5ff2dfec02"
```
