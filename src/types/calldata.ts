export enum ValidateType {
  DEPLOY = 'DEPLOY',
  CALL = 'CALL',
  INVOKE = 'INVOKE',
}

export enum Uint {
  u8 = 'core::integer::u8',
  u16 = 'core::integer::u16',
  u32 = 'core::integer::u32',
  u64 = 'core::integer::u64',
  u128 = 'core::integer::u128',
  u256 = 'core::integer::u256', // This one is struct
}

export enum Litteral {
  ClassHash = 'core::starknet::class_hash::ClassHash',
  ContractAddress = 'core::starknet::contract_address::ContractAddress',
}
