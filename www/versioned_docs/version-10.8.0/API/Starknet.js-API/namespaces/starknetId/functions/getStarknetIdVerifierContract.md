# Function: getStarknetIdVerifierContract()

> **getStarknetIdVerifierContract**(`chainId`): `string`

Defined in: [src/utils/starknetId.ts:234](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/starknetId.ts#L234)

Returns the address of the Starknet ID Verifier contract based on the specified chain ID.

## Parameters

### chainId

`"0x534e5f4d41494e"` \| `"0x534e5f5345504f4c4941"`

The ID of the Starknet chain.

## Returns

`string`

- The address of the Starknet ID Verifier contract.

## Throws

- If the Starknet ID Verifier contract is not deployed on the specified network.

## Example

```typescript
const result = starknetId.getStarknetIdVerifierContract(constants.StarknetChainId.SN_SEPOLIA);
// result = "0x60B94fEDe525f815AE5E8377A463e121C787cCCf3a36358Aa9B18c12c4D566"
```
