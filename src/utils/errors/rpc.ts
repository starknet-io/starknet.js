import { RPC_ERROR_SET } from '../../types';

// NOTE: generated with scripts/generateRpcErrorMap.js
const errorCodes: { [K in keyof RPC_ERROR_SET]: RPC_ERROR_SET[K]['code'] } = {
  FAILED_TO_RECEIVE_TXN: 1,
  NO_TRACE_AVAILABLE: 10,
  CONTRACT_NOT_FOUND: 20,
  BLOCK_NOT_FOUND: 24,
  INVALID_TXN_INDEX: 27,
  CLASS_HASH_NOT_FOUND: 28,
  TXN_HASH_NOT_FOUND: 29,
  PAGE_SIZE_TOO_BIG: 31,
  NO_BLOCKS: 32,
  INVALID_CONTINUATION_TOKEN: 33,
  TOO_MANY_KEYS_IN_FILTER: 34,
  CONTRACT_ERROR: 40,
  TRANSACTION_EXECUTION_ERROR: 41,
  CLASS_ALREADY_DECLARED: 51,
  INVALID_TRANSACTION_NONCE: 52,
  INSUFFICIENT_MAX_FEE: 53,
  INSUFFICIENT_ACCOUNT_BALANCE: 54,
  VALIDATION_FAILURE: 55,
  COMPILATION_FAILED: 56,
  CONTRACT_CLASS_SIZE_IS_TOO_LARGE: 57,
  NON_ACCOUNT: 58,
  DUPLICATE_TX: 59,
  COMPILED_CLASS_HASH_MISMATCH: 60,
  UNSUPPORTED_TX_VERSION: 61,
  UNSUPPORTED_CONTRACT_CLASS_VERSION: 62,
  UNEXPECTED_ERROR: 63,
  INVALID_ADDRESS: 150,
  TOKEN_NOT_SUPPORTED: 151,
  INVALID_SIGNATURE: 153,
  MAX_AMOUNT_TOO_LOW: 154,
  CLASS_HASH_NOT_SUPPORTED: 155,
  PAYMASTER_TRANSACTION_EXECUTION_ERROR: 156,
  INVALID_TIME_BOUNDS: 157,
  INVALID_DEPLOYMENT_DATA: 158,
  INVALID_CLASS_HASH: 159,
  INVALID_ID: 160,
  UNKNOWN_ERROR: 163,
};
export default errorCodes;
