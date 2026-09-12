# Interface: PluginConfig

Defined in: [src/plugins/types.ts:96](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/plugins/types.ts#L96)

## Properties

### plugins?

> `optional` **plugins?**: `false` \| [`StarknetPlugin`](StarknetPlugin.md)\<`any`, `any`\>[]

Defined in: [src/plugins/types.ts:103](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/plugins/types.ts#L103)

Plugins to install.

- `undefined` (default): install defaultPlugins (starknetId, brotherId)
- explicit array: install exactly these plugins
- `false`: no plugins
