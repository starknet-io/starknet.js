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
 * Class hash of a class on Starknet
 */
export type CLASS_HASH = FELT;
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
  token_address: ADDRESS;
  decimals: number;
  price_in_strk: u256;
};
