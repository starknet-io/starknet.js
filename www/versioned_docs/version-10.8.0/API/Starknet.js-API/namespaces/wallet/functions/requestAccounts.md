# Function: requestAccounts()

> **requestAccounts**(`swo`, `silent_mode?`): `Promise`\<`string`[]\>

Defined in: [src/wallet/connect.ts:26](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/wallet/connect.ts#L26)

Request Permission for wallet account, return addresses that are allowed by user

## Parameters

### swo

[`StarknetWindowObject`](../../RPC/interfaces/StarknetWindowObject.md)

### silent_mode?

`boolean` = `false`

false: request user interaction allowance. true: return only pre-allowed

## Returns

`Promise`\<`string`[]\>

allowed accounts addresses
