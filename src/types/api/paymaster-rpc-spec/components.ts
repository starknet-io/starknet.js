/**
 * PRIMITIVES
 */
/**
 * A field element. represented by a hex string of length at most 63
 * @pattern ^0x(0|[a-fA-F1-9]{1}[a-fA-F0-9]{0,62})$
 */
export type FELT = string;
/**
 * A contract address on Starknet
 */
export type ADDRESS = FELT;
/**
 * 256 bit unsigned integers, represented by a hex string of length at most 64
 * @pattern ^0x(0|[a-fA-F1-9]{1}[a-fA-F0-9]{0,63})$
 */
export type u256 = string;
/**
 * A string representing an unsigned integer
 * @pattern ^(0|[1-9]{1}[0-9]*)$
 */
export type NUMERIC = string;
/**
 * UNIX time
 */
export type TIMESTAMP = NUMERIC;
/**
 * A transaction signature
 */
export type SIGNATURE = FELT[];
/**
 * The object that defines an invocation of a function in a contract
 */
export type CALL = {
  to: ADDRESS;
  selector: FELT;
  calldata: FELT[];
};
/**
 * The transaction hash
 */
export type TRANSACTION_HASH = FELT;
/**
 * A unique identifier corresponding to an `execute` request to the paymaster
 */
export type TRACKING_ID = FELT;
/**
 * "A typed data object (in the sense of SNIP-12) which represents an outside execution payload, according to SNIP-9
 */
export type OUTSIDE_EXECUTION_TYPED_DATA =
  | OUTSIDE_EXECUTION_TYPED_DATA_V1
  | OUTSIDE_EXECUTION_TYPED_DATA_V2;
export type OUTSIDE_EXECUTION_TYPED_DATA_V1 = {
  types: Record<string, STARKNET_TYPE[]>;
  primaryType: string;
  domain: STARKNET_DOMAIN;
  message: OUTSIDE_EXECUTION_MESSAGE_V1;
};
export type OUTSIDE_EXECUTION_TYPED_DATA_V2 = {
  types: Record<string, STARKNET_TYPE[]>;
  primaryType: string;
  domain: STARKNET_DOMAIN;
  message: OUTSIDE_EXECUTION_MESSAGE_V2;
};
/**
 * A single type, as part of a struct. The `type` field can be any of the EIP-712 supported types
 */
export type STARKNET_TYPE =
  | {
      name: string;
      type: string;
    }
  | STARKNET_ENUM_TYPE
  | STARKNET_MERKLE_TYPE;
export type STARKNET_ENUM_TYPE = {
  name: string;
  type: 'enum';
  contains: string;
};
export type STARKNET_MERKLE_TYPE = {
  name: string;
  type: 'merkletree';
  contains: string;
};
/**
 * A single type, as part of a struct. The `type` field can be any of the EIP-712 supported types
 */
export type STARKNET_DOMAIN = {
  name?: string;
  version?: string;
  chainId?: string | number;
  revision?: string | number;
};
export type OUTSIDE_EXECUTION_MESSAGE_V1 = {
  caller: FELT;
  nonce: FELT;
  execute_after: FELT;
  execute_before: FELT;
  calls_len: FELT;
  calls: OUTSIDE_CALL_V1[];
};
export type OUTSIDE_CALL_V1 = {
  to: ADDRESS;
  selector: FELT;
  calldata_len: FELT[];
  calldata: FELT[];
};
export type OUTSIDE_EXECUTION_MESSAGE_V2 = {
  Caller: FELT;
  Nonce: FELT;
  'Execute After': FELT;
  'Execute Before': FELT;
  Calls: OUTSIDE_CALL_V2[];
};
export type OUTSIDE_CALL_V2 = {
  To: ADDRESS;
  Selector: FELT;
  Calldata: FELT[];
};

/**
 * User transaction
 */
export type USER_DEPLOY_TRANSACTION = {
  type: 'deploy';
  deployment: ACCOUNT_DEPLOYMENT_DATA;
};
export type USER_INVOKE_TRANSACTION = {
  type: 'invoke';
  invoke: USER_INVOKE;
};
export type USER_INVOKE = {
  user_address: ADDRESS;
  calls: CALL[];
};
export type USER_DEPLOY_AND_INVOKE_TRANSACTION = {
  type: 'deploy_and_invoke';
  deployment: ACCOUNT_DEPLOYMENT_DATA;
  invoke: USER_INVOKE;
};
export type USER_TRANSACTION =
  | USER_DEPLOY_TRANSACTION
  | USER_INVOKE_TRANSACTION
  | USER_DEPLOY_AND_INVOKE_TRANSACTION;

/**
 * User transaction
 */
export type EXECUTABLE_USER_DEPLOY_TRANSACTION = {
  type: 'deploy';
  deployment: ACCOUNT_DEPLOYMENT_DATA;
};
export type EXECUTABLE_USER_INVOKE_TRANSACTION = {
  type: 'invoke';
  invoke: EXECUTABLE_USER_INVOKE;
};
export type EXECUTABLE_USER_INVOKE = {
  user_address: ADDRESS;
  typed_data: OUTSIDE_EXECUTION_TYPED_DATA;
  signature: SIGNATURE;
};
export type EXECUTABLE_USER_DEPLOY_AND_INVOKE_TRANSACTION = {
  type: 'deploy_and_invoke';
  deployment: ACCOUNT_DEPLOYMENT_DATA;
  invoke: EXECUTABLE_USER_INVOKE;
};
export type EXECUTABLE_USER_TRANSACTION =
  | EXECUTABLE_USER_DEPLOY_TRANSACTION
  | EXECUTABLE_USER_INVOKE_TRANSACTION
  | EXECUTABLE_USER_DEPLOY_AND_INVOKE_TRANSACTION;

/**
 * Execution parameters
 */
export type SPONSORED_TRANSACTION = {
  mode: 'sponsored';
};
export type GASLESS_TRANSACTION = {
  mode: 'default';
  gas_token: FELT;
};
export type FEE_MODE = SPONSORED_TRANSACTION | GASLESS_TRANSACTION;
export type EXECUTION_PARAMETERS_V1 = {
  version: '0x1';
  fee_mode: FEE_MODE;
  time_bounds?: TIME_BOUNDS;
};
export type EXECUTION_PARAMETERS = EXECUTION_PARAMETERS_V1;
/**
 * Data required to deploy an account at an address
 */
export type ACCOUNT_DEPLOYMENT_DATA = {
  address: ADDRESS;
  class_hash: FELT;
  salt: FELT;
  calldata: FELT[];
  sigdata?: FELT[];
  version: 1;
};
/**
 * Object containing timestamps corresponding to `Execute After` and `Execute Before`
 */
export type TIME_BOUNDS = {
  execute_after: TIMESTAMP;
  execute_before: TIMESTAMP;
};
/**
 * Object containing data about the token: contract address, number of decimals and current price in STRK
 */
export type TOKEN_DATA = {
  address: ADDRESS;
  decimals: number;
  price_in_strk: u256;
};

export type FEE_ESTIMATE = {
  gas_token_price_in_strk: FELT;
  estimated_fee_in_strk: FELT;
  estimated_fee_in_gas_token: FELT;
  suggested_max_fee_in_strk: FELT;
  suggested_max_fee_in_gas_token: FELT;
};
