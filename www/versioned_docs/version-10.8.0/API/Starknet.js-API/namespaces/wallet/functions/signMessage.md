# Function: signMessage()

> **signMessage**(`swo`, `typedData`): `Promise`\<[`SIGNATURE`](../../RPC/type-aliases/SIGNATURE.md)\>

Defined in: [src/wallet/connect.ts:127](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/wallet/connect.ts#L127)

Sign typed data using the wallet.

## Parameters

### swo

[`StarknetWindowObject`](../../RPC/interfaces/StarknetWindowObject.md)

the starknet (wallet) window object to request the signature.

### typedData

[`TypedData`](../../RPC/interfaces/TypedData.md)

The typed data to sign.

## Returns

`Promise`\<[`SIGNATURE`](../../RPC/type-aliases/SIGNATURE.md)\>

An array of signatures as strings.
