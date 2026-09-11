# Function: brotherId()

> **brotherId**(): [`StarknetPlugin`](../interfaces/StarknetPlugin.md)\<[`BrotherIdProviderMethods`](../interfaces/BrotherIdProviderMethods.md)\>

Defined in: [src/plugins/brother-id/index.ts:180](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/plugins/brother-id/index.ts#L180)

BrotherId plugin - adds .brother domain resolution methods.

## Returns

[`StarknetPlugin`](../interfaces/StarknetPlugin.md)\<[`BrotherIdProviderMethods`](../interfaces/BrotherIdProviderMethods.md)\>

## Example

```typescript
import { RpcProvider, brotherId } from 'starknet';
const provider = new RpcProvider({ plugins: [brotherId()] });
const name = await provider.getBrotherName('0x123...');
```
