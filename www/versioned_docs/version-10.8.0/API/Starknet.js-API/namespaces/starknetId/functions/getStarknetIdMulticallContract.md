# Function: getStarknetIdMulticallContract()

> **getStarknetIdMulticallContract**(`chainId`): `string`

Defined in: [src/utils/starknetId.ts:204](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/starknetId.ts#L204)

Returns the Starknet.id multicall contract address based on the provided chainId.

## Parameters

### chainId

`"0x534e5f4d41494e"` \| `"0x534e5f5345504f4c4941"`

The chainId of the network.

## Returns

`string`

- The address of the Starknet.id multicall contract.

## Throws

- If the Starknet.id multicall contract is not deployed on the network.

## Example

```typescript
const result = starknetId.getStarknetIdMulticallContract(constants.StarknetChainId.SN_SEPOLIA);
// result = "0x034ffb8f4452df7a613a0210824d6414dbadcddce6c6e19bf4ddc9e22ce5f970"
```
