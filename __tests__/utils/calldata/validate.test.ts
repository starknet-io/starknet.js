import validateFields from '../../../src/utils/calldata/validate';
import {
  Uint,
  type AbiEntry,
  type AbiEnums,
  type AbiStructs,
  type FunctionAbi,
} from '../../../src';

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
    test('should return void if felt validation passes', () => {
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

  describe('bytes31 validation', () => {
    test('should return void if bytes31 validation passes', () => {
      const result = validateFields(
        getFunctionAbi('core::bytes_31::bytes31'),
        ['test'],
        getAbiStructs(),
        getAbiEnums()
      );
      expect(result).toBeUndefined();
    });

    test('should throw an error if parameter is not the type of string', () => {
      const validateBytes31 = (params: unknown[]) =>
        validateFields(
          getFunctionAbi('core::bytes_31::bytes31'),
          params,
          getAbiStructs(),
          getAbiEnums()
        );

      const error = new Error('Validate: arg test should be a string.');

      expect(() => validateBytes31([0])).toThrow(error);
      expect(() => validateBytes31([BigInt(22)])).toThrow(error);
      expect(() => validateBytes31([new Map()])).toThrow(error);
      expect(() => validateBytes31([true])).toThrow(error);
      expect(() => validateBytes31([])).toThrow(error);
      expect(() => validateBytes31([Symbol('test')])).toThrow(error);
    });

    test('should throw an error if parameter is less than 32 chars', () => {
      const validateBytes31 = (params: unknown[]) =>
        validateFields(
          getFunctionAbi('core::bytes_31::bytes31'),
          params,
          getAbiStructs(),
          getAbiEnums()
        );

      const error = new Error(
        'Validate: arg test cairo typed core::bytes_31::bytes31 should be a string of less than 32 characters.'
      );
      expect(() => validateBytes31(['String_that_is_bigger_than_32_characters'])).toThrow(error);
    });
  });

  describe('Uint validation', () => {
    test('should return void if Uint "u8" validation passes', () => {
      const result = validateFields(
        getFunctionAbi(Uint.u8),
        [255n],
        getAbiStructs(),
        getAbiEnums()
      );
      expect(result).toBeUndefined();
    });

    test('should return void if Uint "u16" validation passes', () => {
      const result = validateFields(
        getFunctionAbi(Uint.u16),
        [65535n],
        getAbiStructs(),
        getAbiEnums()
      );
      expect(result).toBeUndefined();
    });

    test('should return void if Uint "u32" validation passes', () => {
      const result = validateFields(
        getFunctionAbi(Uint.u32),
        [4294967295n],
        getAbiStructs(),
        getAbiEnums()
      );
      expect(result).toBeUndefined();
    });

    test('should return void if Uint "u64" validation passes', () => {
      const result = validateFields(
        getFunctionAbi(Uint.u64),
        [2n ** 64n - 1n],
        getAbiStructs(),
        getAbiEnums()
      );
      expect(result).toBeUndefined();
    });

    test('should return void if Uint "u128" validation passes', () => {
      const result = validateFields(
        getFunctionAbi(Uint.u128),
        [2n ** 128n - 1n],
        getAbiStructs(),
        getAbiEnums()
      );
      expect(result).toBeUndefined();
    });

    test('should return void if Uint "u256" validation passes', () => {
      const result = validateFields(
        getFunctionAbi(Uint.u256),
        [2n ** 256n - 1n],
        getAbiStructs(),
        getAbiEnums()
      );
      expect(result).toBeUndefined();
    });

    test('should return void if Uint "u512" validation passes', () => {
      const result = validateFields(
        getFunctionAbi(Uint.u512),
        [2n ** 512n - 1n],
        getAbiStructs(),
        getAbiEnums()
      );
      expect(result).toBeUndefined();
    });

    test('should throw an error if parameter is too large', () => {
      const validateUint = (params: unknown[]) =>
        validateFields(getFunctionAbi(Uint.u8), params, getAbiStructs(), getAbiEnums());

      const error = new Error(
        'Validation: Parameter is to large to be typed as Number use (BigInt or String)'
      );

      expect(() => validateUint([Number.MAX_SAFE_INTEGER + 1])).toThrow(error);
    });

    test('should throw an error if parameter type is not valid', () => {
      const validateUint = (params: unknown[]) =>
        validateFields(getFunctionAbi(Uint.u8), params, getAbiStructs(), getAbiEnums());

      const getError = (param: any) =>
        new Error(
          `Validate: arg test of cairo type ${Uint.u8} should be type (String, Number or BigInt), but is ${typeof param} ${param}.`
        );

      expect(() => validateUint([new Map()])).toThrow(getError(new Map()));
      expect(() => validateUint([true])).toThrow(getError(true));
      expect(() => validateUint([{ test: 'test' }])).toThrow(getError({ test: 'test' }));
    });
  });
});
