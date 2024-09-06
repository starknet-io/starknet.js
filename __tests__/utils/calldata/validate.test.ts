import validateFields from '../../../src/utils/calldata/validate';
import type { AbiEntry, AbiEnums, AbiStructs, FunctionAbi } from '../../../src';

const getAbiEventEntry = (type: string): AbiEntry => ({ name: 'test', type });

const getFunctionAbi = (inputsType: string): FunctionAbi => ({
  inputs: [getAbiEventEntry(inputsType)],
  name: 'test',
  outputs: [getAbiEventEntry(inputsType)],
  stateMutability: 'view',
  type: 'function',
});

const functionAbi: FunctionAbi = {
  inputs: [{ name: 'test', type: 'felt' }],
  name: 'test',
  outputs: [{ name: 'test', type: 'felt' }],
  stateMutability: 'view',
  type: 'function',
};

const abiStructs: AbiStructs = {
  abi_structs: {
    members: [
      {
        name: 'test_name',
        type: 'test_type',
        offset: 1,
      },
    ],
    size: 2,
    name: 'cairo_event_struct',
    type: 'struct',
  },
};

const abiEnums: AbiEnums = {
  abi_enums: {
    variants: [
      {
        name: 'test_name',
        type: 'cairo_event_struct_variant',
        offset: 1,
      },
    ],
    size: 2,
    name: 'test_cairo_event',
    type: 'enum',
  },
};

validateFields(functionAbi, [1n], abiStructs, abiEnums);

const getAbiStructs = (): AbiStructs => ({
  abi_structs: {
    members: [
      {
        name: 'test_name',
        type: 'test_type',
        offset: 1,
      },
    ],
    size: 2,
    name: 'cairo_event_struct',
    type: 'struct',
  },
});

const getAbiEnums = (): AbiEnums => ({
  abi_enums: {
    variants: [
      {
        name: 'test_name',
        type: 'cairo_event_struct_variant',
        offset: 1,
      },
    ],
    size: 2,
    name: 'test_cairo_event',
    type: 'enum',
  },
});

describe('validateFields', () => {
  describe('felt validation', () => {
    test('should return undefined if felt validation passes', () => {
      const result = validateFields(
        getFunctionAbi('felt'),
        ['test'],
        getAbiStructs(),
        getAbiEnums()
      );
      expect(result).toBeUndefined();
    });

    test('should throw an error if felt is not the type of string, number or big int', () => {
      const validateFelt = (params: unknown[]) =>
        validateFields(getFunctionAbi('felt'), params, getAbiStructs(), getAbiEnums());

      const error = new Error(
        'Validate: arg test should be a felt typed as (String, Number or BigInt)'
      );
      expect(() => validateFelt([{}])).toThrow(error);
      expect(() => validateFelt([new Map()])).toThrow(error);
      expect(() => validateFelt([true])).toThrow(error);
      expect(() => validateFelt([])).toThrow(error);
      expect(() => validateFelt([Symbol('test')])).toThrow(error);
    });

    test('should throw an error if felt is not in the range', () => {
      const validateFelt = (params: unknown[]) =>
        validateFields(getFunctionAbi('felt'), params, getAbiStructs(), getAbiEnums());

      const error = new Error(
        'Validate: arg test cairo typed felt should be in range [0, 2^252-1]'
      );
      expect(() => validateFelt([-1])).toThrow(error);
      expect(() => validateFelt([2n ** 252n])).toThrow(error);
    });
  });
});
