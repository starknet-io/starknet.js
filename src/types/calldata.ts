export const ValidateType = {
  DEPLOY: 'DEPLOY',
  CALL: 'CALL',
  INVOKE: 'INVOKE',
} as const;

// eslint-disable-next-line @typescript-eslint/no-redeclare -- intentionally naming the variable the same as the type
export type ValidateType = (typeof ValidateType)[keyof typeof ValidateType];

export const Uint = {
  u8: 'core::integer::u8',
  u16: 'core::integer::u16',
  u32: 'core::integer::u32',
  u64: 'core::integer::u64',
  u128: 'core::integer::u128',
  u256: 'core::integer::u256', // This one is struct
  u512: 'core::integer::u512', // This one is struct
} as const;

// eslint-disable-next-line @typescript-eslint/no-redeclare -- intentionally naming the variable the same as the type
export type Uint = (typeof Uint)[keyof typeof Uint];

export const Literal = {
  ClassHash: 'core::starknet::class_hash::ClassHash',
  ContractAddress: 'core::starknet::contract_address::ContractAddress',
  Secp256k1Point: 'core::starknet::secp256k1::Secp256k1Point',
} as const;

// eslint-disable-next-line @typescript-eslint/no-redeclare -- intentionally naming the variable the same as the type
export type Literal = (typeof Literal)[keyof typeof Literal];
