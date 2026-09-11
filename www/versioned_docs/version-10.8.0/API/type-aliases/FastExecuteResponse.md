# Type Alias: FastExecuteResponse

> **FastExecuteResponse** = `object`

Defined in: [src/plugins/fast-execute/types.ts:17](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/plugins/fast-execute/types.ts#L17)

Response from fastExecute() containing transaction result and readiness status

## Properties

### txResult

> **txResult**: [`InvokeFunctionResponse`](InvokeFunctionResponse.md)

Defined in: [src/plugins/fast-execute/types.ts:19](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/plugins/fast-execute/types.ts#L19)

The transaction invoke response with transaction hash

---

### isReady

> **isReady**: `boolean`

Defined in: [src/plugins/fast-execute/types.ts:21](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/plugins/fast-execute/types.ts#L21)

Whether the next transaction can be executed immediately
