# Function: onAccountChange()

> **onAccountChange**(`swo`, `callback`): `void`

Defined in: [src/wallet/connect.ts:156](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/wallet/connect.ts#L156)

Attaches an event handler function to the "accountsChanged" event of a StarknetWindowObject.
When the accounts are changed, the specified callback function will be called.

## Parameters

### swo

[`StarknetWindowObject`](../../RPC/interfaces/StarknetWindowObject.md)

The StarknetWindowObject to attach the event handler to.

### callback

[`AccountChangeEventHandler`](../../RPC/type-aliases/AccountChangeEventHandler.md)

The function to be called when the accounts are changed.
It will receive the changed accounts as a parameter.

## Returns

`void`
