# Variable: SYSTEM_MESSAGES

> `const` **SYSTEM_MESSAGES**: `object`

Defined in: [src/global/constants.ts:232](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/global/constants.ts#L232)

## Type Declaration

### legacyTxWarningMessage

> **legacyTxWarningMessage**: `string` = 'You are using a deprecated transaction version (V0,V1,V2)!\nUpdate to the latest V3 transactions!'

### legacyTxRPC08Message

> **legacyTxRPC08Message**: `string` = `'RPC 0.8+ do not support legacy transactions, use RPC 0.8+ v3 transactions!'`

### SWOldV3

> **SWOldV3**: `string` = `'RPC 0.7 V3 tx (improper resource bounds) not supported in RPC 0.8+'`

### channelVersionMismatch

> **channelVersionMismatch**: `string` = `'Channel specification version is not compatible with the connected node Specification Version'`

### unsupportedSpecVersion

> **unsupportedSpecVersion**: `string` = `'The connected node specification version is not supported by this library'`

### maxFeeInV3

> **maxFeeInV3**: `string` = `'maxFee is not supported in V3 transactions, use resourceBounds instead'`

### declareNonSierra

> **declareNonSierra**: `string` = `'Declaring non Sierra (Cairo0)contract using RPC 0.8+'`

### unsupportedMethodForRpcVersion

> **unsupportedMethodForRpcVersion**: `string` = `'Unsupported method for RPC version'`

### txEvictedFromMempool

> **txEvictedFromMempool**: `string` = `'Transaction TTL, evicted from the mempool, try to increase the tip'`

### consensusFailed

> **consensusFailed**: `string` = `'Consensus failed to finalize the block proposal'`

### txFailsBlockBuildingValidation

> **txFailsBlockBuildingValidation**: `string` = `'Transaction fails block building validation'`

### snip36RequiresRPC010

> **snip36RequiresRPC010**: `string` = ``'SNIP-36 `proof` and `proofFacts` are not supported by RPC 0.9, connect to a RPC 0.10.1+ node!'``
