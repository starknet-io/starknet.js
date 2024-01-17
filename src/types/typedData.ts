// TODO: adjust starknet casing in v6

export enum TypedDataRevision {
  Active = '1',
  Legacy = '0',
}

export type StarkNetEnumType = {
  name: string;
  type: 'enum';
  contains: string;
};

export type StarkNetMerkleType = {
  name: string;
  type: 'merkletree';
  contains: string;
};

/**
 * A single type, as part of a struct. The `type` field can be any of the EIP-712 supported types.
 *
 * Note that the `uint` and `int` aliases like in Solidity, and fixed point numbers are not supported by the EIP-712
 * standard.
 */
export type StarkNetType =
  | {
      name: string;
      type: string;
    }
  | StarkNetEnumType
  | StarkNetMerkleType;

/**
 * The EIP712 domain struct. Any of these fields are optional, but it must contain at least one field.
 */
export interface StarkNetDomain extends Record<string, unknown> {
  name?: string;
  version?: string;
  chainId?: string | number;
  revision?: string;
}

/**
 * The complete typed data, with all the structs, domain data, primary type of the message, and the message itself.
 */
export interface TypedData {
  types: Record<string, StarkNetType[]>;
  primaryType: string;
  domain: StarkNetDomain;
  message: Record<string, unknown>;
}
