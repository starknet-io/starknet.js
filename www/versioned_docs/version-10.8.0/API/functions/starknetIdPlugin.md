# Function: starknetIdPlugin()

> **starknetIdPlugin**(): [`StarknetPlugin`](../interfaces/StarknetPlugin.md)\<[`StarknetIdProviderMethods`](../interfaces/StarknetIdProviderMethods.md), [`StarknetIdAccountMethods`](../interfaces/StarknetIdAccountMethods.md)\>

Defined in: [src/plugins/starknet-id/index.ts:312](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/plugins/starknet-id/index.ts#L312)

StarknetId plugin - adds domain name resolution methods.

Exported from the package root as `starknetIdPlugin`, because the bare
`starknetId` name is taken by the utility namespace.

## Returns

[`StarknetPlugin`](../interfaces/StarknetPlugin.md)\<[`StarknetIdProviderMethods`](../interfaces/StarknetIdProviderMethods.md), [`StarknetIdAccountMethods`](../interfaces/StarknetIdAccountMethods.md)\>

## Example

```typescript
import { RpcProvider, starknetIdPlugin } from 'starknet';
const provider = new RpcProvider({ plugins: [starknetIdPlugin()] });
const name = await provider.getStarkName('0x123...');
```
