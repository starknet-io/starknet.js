# Abstract Class: ResponseParser

Defined in: [src/provider/modules/responseParser/interface.ts:13](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/modules/responseParser/interface.ts#L13)

## Constructors

### Constructor

> **new ResponseParser**(): `ResponseParser`

#### Returns

`ResponseParser`

## Methods

### parseGetBlockResponse()

> `abstract` **parseGetBlockResponse**(`res`): [`GetBlockResponse`](../type-aliases/GetBlockResponse.md)

Defined in: [src/provider/modules/responseParser/interface.ts:14](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/modules/responseParser/interface.ts#L14)

#### Parameters

##### res

[`BlockWithTxHashes`](../type-aliases/BlockWithTxHashes.md)

#### Returns

[`GetBlockResponse`](../type-aliases/GetBlockResponse.md)

---

### parseGetTransactionResponse()

> `abstract` **parseGetTransactionResponse**(`res`): [`TransactionWithHash`](../type-aliases/TransactionWithHash.md)

Defined in: [src/provider/modules/responseParser/interface.ts:16](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/modules/responseParser/interface.ts#L16)

#### Parameters

##### res

`any`

#### Returns

[`TransactionWithHash`](../type-aliases/TransactionWithHash.md)

---

### parseGetTransactionReceiptResponse()

> `abstract` **parseGetTransactionReceiptResponse**(`res`): [`GetTransactionReceiptResponse`](../type-aliases/GetTransactionReceiptResponse.md)

Defined in: [src/provider/modules/responseParser/interface.ts:18](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/modules/responseParser/interface.ts#L18)

#### Parameters

##### res

`any`

#### Returns

[`GetTransactionReceiptResponse`](../type-aliases/GetTransactionReceiptResponse.md)

---

### parseCallContractResponse()

> `abstract` **parseCallContractResponse**(`res`): [`CallContractResponse`](../type-aliases/CallContractResponse.md)

Defined in: [src/provider/modules/responseParser/interface.ts:20](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/modules/responseParser/interface.ts#L20)

#### Parameters

##### res

`any`

#### Returns

[`CallContractResponse`](../type-aliases/CallContractResponse.md)

---

### parseInvokeFunctionResponse()

> `abstract` **parseInvokeFunctionResponse**(`res`): `object`

Defined in: [src/provider/modules/responseParser/interface.ts:22](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/modules/responseParser/interface.ts#L22)

#### Parameters

##### res

`any`

#### Returns

`object`

##### transaction_hash

> **transaction_hash**: `string`

---

### parseDeployContractResponse()

> `abstract` **parseDeployContractResponse**(`res`): [`DeployContractResponse`](../interfaces/DeployContractResponse.md)

Defined in: [src/provider/modules/responseParser/interface.ts:24](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/modules/responseParser/interface.ts#L24)

#### Parameters

##### res

`any`

#### Returns

[`DeployContractResponse`](../interfaces/DeployContractResponse.md)

---

### parseDeclareContractResponse()

> `abstract` **parseDeclareContractResponse**(`res`): `object`

Defined in: [src/provider/modules/responseParser/interface.ts:26](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/modules/responseParser/interface.ts#L26)

#### Parameters

##### res

`any`

#### Returns

`object`

##### class_hash

> **class_hash**: `string`

##### transaction_hash

> **transaction_hash**: `string`

---

### parseSimulateTransactionResponse()

> `abstract` **parseSimulateTransactionResponse**(`res`): [`SimulateTransactionOverheadResponse`](../type-aliases/SimulateTransactionOverheadResponse.md)

Defined in: [src/provider/modules/responseParser/interface.ts:28](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/modules/responseParser/interface.ts#L28)

#### Parameters

##### res

`any`

#### Returns

[`SimulateTransactionOverheadResponse`](../type-aliases/SimulateTransactionOverheadResponse.md)
