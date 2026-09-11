# Function: getStarknetIdPopContract()

> **getStarknetIdPopContract**(`chainId`): `string`

Defined in: [src/utils/starknetId.ts:296](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/starknetId.ts#L296)

Retrieves the Starknet ID Proof of Personhood (IdPop) verifier contract address for the given chain ID.

## Parameters

### chainId

`"0x534e5f4d41494e"` \| `"0x534e5f5345504f4c4941"`

The chain ID of the Starknet network.

## Returns

`string`

- The Starknet ID Pop contract address.

## Throws

- If the Starknet ID Pop contract is not deployed on the specified network.

## Example

```typescript
const result = starknetId.getStarknetIdPopContract(constants.StarknetChainId.SN_SEPOLIA);
// result = "0x15ae88ae054caa74090b89025c1595683f12edf7a4ed2ad0274de3e1d4a"
```
