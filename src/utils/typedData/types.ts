import {
  Infer,
  array,
  intersection,
  number,
  object,
  optional,
  record,
  refine,
  string,
  type as t,
  union,
} from 'superstruct';

export const ATOMIC_TYPES = ['felt', 'felt*'];

// Source: https://github.com/Mrtenz/eip-712/blob/master/src/eip-712.ts
// and modified to support starknet types

/**
 * Checks if a type is valid with the given `typedData`. The following types are valid:
 * - Atomic types: felt, felt*
 * - Reference types: struct type (e.g. SomeStruct)
 *
 * @param {Record<string, unknown>} types
 * @param {string} type
 * @return {boolean}
 */
export const isValidType = (types: Record<string, unknown>, type: string): boolean => {
  if (ATOMIC_TYPES.includes(type as string)) {
    return true;
  }

  if (types[type]) {
    return true;
  }

  return false;
};

const TYPE = refine(string(), 'Type', (type, context) => {
  return isValidType(context.branch[0].types, type);
});

export const STARKNET_TYPE = object({
  name: string(),
  type: TYPE,
});

/**
 * A single type, as part of a struct. The `type` field can be any of the EIP-712 supported types.
 *
 * Note that the `uint` and `int` aliases like in Solidity, and fixed point numbers are not supported by the EIP-712
 * standard.
 */
export type StarkNetType = Infer<typeof STARKNET_TYPE>;

export const STARKNET_DOMAIN_TYPE = object({
  name: optional(string()),
  version: optional(string()),
  chainId: optional(union([string(), number()])),
});

/**
 * The EIP712 domain struct. Any of these fields are optional, but it must contain at least one field.
 */
export type StarkNetDomain = Infer<typeof STARKNET_DOMAIN_TYPE>;

export const STARKNET_TYPED_DATA_TYPE = object({
  types: intersection([
    t({ StarkNetDomain: array(STARKNET_TYPE) }),
    record(string(), array(STARKNET_TYPE)),
  ]),
  primaryType: string(),
  domain: STARKNET_DOMAIN_TYPE,
  message: object(),
});

/**
 * The complete typed data, with all the structs, domain data, primary type of the message, and the message itself.
 */
export type TypedData = Infer<typeof STARKNET_TYPED_DATA_TYPE>;
