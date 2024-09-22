import type { InterfaceAbi, AbiEntry, AbiEnums, AbiStructs, FunctionAbi } from '../../src';

export const getAbiEntry = (type: string): AbiEntry => ({ name: 'test', type });

export const getFunctionAbi = (inputsType: string): FunctionAbi => ({
  inputs: [getAbiEntry(inputsType)],
  name: 'test',
  outputs: [getAbiEntry(inputsType)],
  stateMutability: 'view',
  type: 'function',
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
});
