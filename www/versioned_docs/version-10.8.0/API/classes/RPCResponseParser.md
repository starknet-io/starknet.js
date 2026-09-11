# Class: RPCResponseParser

Defined in: [src/provider/modules/responseParser/rpc.ts:27](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/modules/responseParser/rpc.ts#L27)

## Implements

- `Omit`\<[`ResponseParser`](ResponseParser.md), `"parseDeclareContractResponse"` \| `"parseDeployContractResponse"` \| `"parseInvokeFunctionResponse"` \| `"parseGetTransactionReceiptResponse"` \| `"parseGetTransactionResponse"` \| `"parseCallContractResponse"`\>

## Constructors

### Constructor

> **new RPCResponseParser**(`resourceBoundsOverhead?`): `RPCResponseParser`

Defined in: [src/provider/modules/responseParser/rpc.ts:38](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/modules/responseParser/rpc.ts#L38)

#### Parameters

##### resourceBoundsOverhead?

`false` \| [`ResourceBoundsOverhead`](../type-aliases/ResourceBoundsOverhead.md)

#### Returns

`RPCResponseParser`

## Methods

### parseGetBlockResponse()

> **parseGetBlockResponse**(`res`): [`GetBlockResponse`](../type-aliases/GetBlockResponse.md)

Defined in: [src/provider/modules/responseParser/rpc.ts:42](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/modules/responseParser/rpc.ts#L42)

#### Parameters

##### res

[`BlockWithTxHashes`](../type-aliases/BlockWithTxHashes.md)

#### Returns

[`GetBlockResponse`](../type-aliases/GetBlockResponse.md)

#### Implementation of

[`ResponseParser`](ResponseParser.md).[`parseGetBlockResponse`](ResponseParser.md#parsegetblockresponse)

---

### parseTransactionReceipt()

> **parseTransactionReceipt**(`res`): [`TXN_RECEIPT_WITH_BLOCK_INFO`](../Starknet.js-API/namespaces/RPC/type-aliases/TXN_RECEIPT_WITH_BLOCK_INFO.md)

Defined in: [src/provider/modules/responseParser/rpc.ts:46](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/modules/responseParser/rpc.ts#L46)

#### Parameters

##### res

[`TransactionReceipt`](../type-aliases/TransactionReceipt.md)

#### Returns

[`TXN_RECEIPT_WITH_BLOCK_INFO`](../Starknet.js-API/namespaces/RPC/type-aliases/TXN_RECEIPT_WITH_BLOCK_INFO.md)

---

### parseFeeEstimateBulkResponse()

> **parseFeeEstimateBulkResponse**(`res`): [`EstimateFeeResponseBulkOverhead`](../type-aliases/EstimateFeeResponseBulkOverhead.md)

Defined in: [src/provider/modules/responseParser/rpc.ts:50](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/modules/responseParser/rpc.ts#L50)

#### Parameters

##### res

[`ApiEstimateFeeResponse`](../type-aliases/ApiEstimateFeeResponse.md)

#### Returns

[`EstimateFeeResponseBulkOverhead`](../type-aliases/EstimateFeeResponseBulkOverhead.md)

---

### parseSimulateTransactionResponse()

> **parseSimulateTransactionResponse**(`res`): [`SimulateTransactionOverheadResponse`](../type-aliases/SimulateTransactionOverheadResponse.md)

Defined in: [src/provider/modules/responseParser/rpc.ts:60](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/modules/responseParser/rpc.ts#L60)

#### Parameters

##### res

[`SimulateTransactionResponse`](../type-aliases/SimulateTransactionResponse.md)

#### Returns

[`SimulateTransactionOverheadResponse`](../type-aliases/SimulateTransactionOverheadResponse.md)

#### Implementation of

[`ResponseParser`](ResponseParser.md).[`parseSimulateTransactionResponse`](ResponseParser.md#parsesimulatetransactionresponse)

---

### parseContractClassResponse()

> **parseContractClassResponse**(`res`): [`ContractClassResponse`](../type-aliases/ContractClassResponse.md)

Defined in: [src/provider/modules/responseParser/rpc.ts:78](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/modules/responseParser/rpc.ts#L78)

#### Parameters

##### res

[`ContractClassPayload`](../type-aliases/ContractClassPayload.md)

#### Returns

[`ContractClassResponse`](../type-aliases/ContractClassResponse.md)

---

### parseL1GasPriceResponse()

> **parseL1GasPriceResponse**(`res`): `string`

Defined in: [src/provider/modules/responseParser/rpc.ts:85](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/modules/responseParser/rpc.ts#L85)

#### Parameters

##### res

[`BlockWithTxHashes`](../type-aliases/BlockWithTxHashes.md)

#### Returns

`string`

---

### parseStorageResponse()

> **parseStorageResponse**(`res`): [`STORAGE_RESULT`](../Starknet.js-API/namespaces/RPC/type-aliases/STORAGE_RESULT.md)

Defined in: [src/provider/modules/responseParser/rpc.ts:89](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/modules/responseParser/rpc.ts#L89)

#### Parameters

##### res

`string` \| [`STORAGE_RESULT`](../Starknet.js-API/namespaces/RPC/type-aliases/STORAGE_RESULT.md)

#### Returns

[`STORAGE_RESULT`](../Starknet.js-API/namespaces/RPC/type-aliases/STORAGE_RESULT.md)
