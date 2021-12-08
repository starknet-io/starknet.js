import {
  Infer,
  array,
  intersection,
  number,
  object,
  optional,
  pattern,
  record,
  refine,
  string,
  type as t,
  union,
} from 'superstruct';

export const STATIC_TYPES = ['felt', 'felt*', 'shortString'];

// Source: https://github.com/Mrtenz/eip-712/blob/master/src/eip-712.ts
// and modified to support starknet types

/**
 * Checks if a type is valid with the given `typedData`. The following types are valid:
 * - Atomic types: felt, felt*
 * - Dynamic types: shortString
 * - Reference types: struct type (e.g. SomeStruct)
 *
 * @param {Record<string, unknown>} types
 * @param {string} type
 * @return {boolean}
 */
export const isValidType = (types: Record<string, unknown>, type: string): boolean => {
  if (STATIC_TYPES.includes(type as string)) {
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

export const EIP_712_TYPE = object({
  name: string(),
  type: TYPE,
});

/**
 * A single type, as part of a struct. The `type` field can be any of the EIP-712 supported types.
 *
 * Note that the `uint` and `int` aliases like in Solidity, and fixed point numbers are not supported by the EIP-712
 * standard.
 */
export type EIP712Type = Infer<typeof EIP_712_TYPE>;

export const EIP_712_DOMAIN_TYPE = object({
  name: optional(string()),
  version: optional(string()),
  chainId: optional(union([string(), number()])),
  verifyingContract: optional(pattern(string(), /^0x[0-9a-z]{40}$/i)),
  salt: optional(union([array(number()), pattern(string(), /^0x[0-9a-z]{64}$/i)])),
});

/**
 * The EIP712 domain struct. Any of these fields are optional, but it must contain at least one field.
 */
export type EIP712Domain = Infer<typeof EIP_712_DOMAIN_TYPE>;

export const EIP_712_TYPED_DATA_TYPE = object({
  types: intersection([
    t({ EIP712Domain: array(EIP_712_TYPE) }),
    record(string(), array(EIP_712_TYPE)),
  ]),
  primaryType: string(),
  domain: EIP_712_DOMAIN_TYPE,
  message: object(),
});

/**
 * The complete typed data, with all the structs, domain data, primary type of the message, and the message itself.
 */
export type TypedData = Infer<typeof EIP_712_TYPED_DATA_TYPE>;
