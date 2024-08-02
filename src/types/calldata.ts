import { ValuesType } from './helpers/valuesType';

export const ValidateType = {
  DEPLOY: 'DEPLOY',
  CALL: 'CALL',
  INVOKE: 'INVOKE',
} as const;

export type ValidateType = ValuesType<typeof ValidateType>;

export const Uint = {
  u8: 'core::integer::u8',
  u16: 'core::integer::u16',
  u32: 'core::integer::u32',
  u64: 'core::integer::u64',
  u128: 'core::integer::u128',
  u256: 'core::integer::u256', // This one is struct
  u512: 'core::integer::u512', // This one is struct
} as const;

export type Uint = ValuesType<typeof Uint>;

export const Literal = {
  ClassHash: 'core::starknet::class_hash::ClassHash',
  ContractAddress: 'core::starknet::contract_address::ContractAddress',
  Secp256k1Point: 'core::starknet::secp256k1::Secp256k1Point',
} as const;

export type Literal = ValuesType<typeof Literal>;
