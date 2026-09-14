import type { InterfaceAbi, AbiEntry, AbiEnums, AbiStructs, FunctionAbi } from '../../src';

export const getAbiEntry = (type: string): AbiEntry => ({ name: 'test', type });

export const getFunctionAbi = (inputsType: string): FunctionAbi => ({
  inputs: [getAbiEntry(inputsType)],
  name: 'test',
  outputs: [getAbiEntry(inputsType)],
  stateMutability: 'view',
  type: 'function',
});

export const getConstructorAbi = (inputsType: string): FunctionAbi => ({
  inputs: [getAbiEntry(inputsType)],
  name: 'test',
  outputs: [getAbiEntry(inputsType)],
  type: 'constructor',
});

export const getInterfaceAbi = (functionAbiType: string = 'struct'): InterfaceAbi => ({
  items: [getFunctionAbi(functionAbiType)],
  name: 'test_interface_abi',
  type: 'interface',
});

export const getAbiStructs = (): AbiStructs => ({
  struct: {
    members: [
      {
        name: 'test_name',
        type: 'test_type',
        offset: 1,
      },
    ],
    size: 2,
    name: 'cairo__struct',
    type: 'struct',
  },
  struct_with_felt_array: {
    members: [
      {
        name: 'felt_array',
        type: 'core::array::Array::<core::felt252>',
        offset: 0,
      },
    ],
    size: 1,
    name: 'cairo__struct_with_felt_array',
    type: 'struct',
  },
  struct_with_u8_array: {
    members: [
      {
        name: 'u8_array',
        type: 'core::array::Array::<core::integer::u8>',
        offset: 0,
      },
    ],
    size: 1,
    name: 'cairo__struct_with_u8_array',
    type: 'struct',
  },
});

export const getAbiEnums = (): AbiEnums => ({
  enum: {
    variants: [
      {
        name: 'test_name',
        type: 'cairo_struct_variant',
        offset: 1,
      },
    ],
    size: 2,
    name: 'test_cairo',
    type: 'enum',
  },
  'core::option::Option::<core::array::Array::<core::felt252>>': {
    variants: [
      {
        name: 'Some',
        type: 'core::array::Array::<core::felt252>',
        offset: 0,
      },
      {
        name: 'None',
        type: '()',
        offset: 1,
      },
    ],
    size: 2,
    name: 'core::option::Option::<core::array::Array::<core::felt252>>',
    type: 'enum',
  },
});
