# Type Alias: RpcMessage

> **RpcMessage** = `{ [K in keyof RpcTypeToMessageMap]: { type: K } & RpcTypeToMessageMap[K] }`\[keyof [`RpcTypeToMessageMap`](../interfaces/RpcTypeToMessageMap.md)\]

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/wallet-api/methods.d.ts:218
