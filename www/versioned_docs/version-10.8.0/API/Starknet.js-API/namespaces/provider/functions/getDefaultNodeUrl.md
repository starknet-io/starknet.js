# Function: getDefaultNodeUrl()

> **getDefaultNodeUrl**(`networkName?`, `rpcVersion?`): `string`

Defined in: [src/utils/provider.ts:132](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/provider.ts#L132)

Return randomly select available public node

## Parameters

### networkName?

`"SN_MAIN"` \| `"SN_SEPOLIA"`

NetworkName

### rpcVersion?

`"0.9.0"` \| `"0.10.0"` \| `"0.10.2"` \| `"0.10.3"` \| `"0.10.4"`

## Returns

`string`

default node url

## Example

```typescript
const result = provider.getDefaultNodeUrl(constants.NetworkName.SN_MAIN);
// console : "Using default public node url, please provide nodeUrl in provider options!"
// result = "https://starknet-mainnet.public.blastapi.io/rpc/v0_9"
```
