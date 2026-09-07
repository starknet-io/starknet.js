import validateFields from '../../../src/utils/calldata/validate';
import {
  CairoOption,
  CairoResult,
  ETH_ADDRESS,
  Literal,
  NON_ZERO_PREFIX,
  Uint,
} from '../../../src';
import { getFunctionAbi, getAbiEnums, getAbiStructs } from '../../factories/abi';

describe('validateFields', () => {
  test('should throw an error if validation is unhandled', () => {
    expect(() => {
      validateFields(getFunctionAbi('test_test'), [true], getAbiStructs(), getAbiEnums());
    }).toThrow(new Error('Validate Unhandled: argument test, type test_test, value true'));
  });

  describe('felt validation', () => {
    test('should validate a felt', () => {
      expect(() =>
        validateFields(getFunctionAbi('felt'), ['test'], getAbiStructs(), getAbiEnums())
      ).not.toThrow();
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
    test('should validate a bytes31', () => {
      expect(() =>
        validateFields(
          getFunctionAbi('core::bytes_31::bytes31'),
          ['test'],
          getAbiStructs(),
          getAbiEnums()
        )
      ).not.toThrow();
    });
  });

  describe('Uint validation', () => {
    test('should validate Uint "u8"', () => {
      expect(() =>
        validateFields(getFunctionAbi(Uint.u8), [255n], getAbiStructs(), getAbiEnums())
      ).not.toThrow();
    });

    test('should validate Uint "u16"', () => {
      expect(() =>
        validateFields(getFunctionAbi(Uint.u16), [65535n], getAbiStructs(), getAbiEnums())
      ).not.toThrow();
    });

    test('should validate Uint "u32"', () => {
      expect(() =>
        validateFields(getFunctionAbi(Uint.u32), [4294967295n], getAbiStructs(), getAbiEnums())
      ).not.toThrow();
    });

    test('should validate Uint "u64"', () => {
      expect(() =>
        validateFields(getFunctionAbi(Uint.u64), [2n ** 64n - 1n], getAbiStructs(), getAbiEnums())
      ).not.toThrow();
    });

    test('should validate Uint "u128"', () => {
      expect(() =>
        validateFields(getFunctionAbi(Uint.u128), [2n ** 128n - 1n], getAbiStructs(), getAbiEnums())
      ).not.toThrow();
    });

    test('should validate Uint "u256"', () => {
      expect(() =>
        validateFields(getFunctionAbi(Uint.u256), [2n ** 256n - 1n], getAbiStructs(), getAbiEnums())
      ).not.toThrow();
    });

    test('should validate Uint "u512"', () => {
      expect(() =>
        validateFields(getFunctionAbi(Uint.u512), [2n ** 512n - 1n], getAbiStructs(), getAbiEnums())
      ).not.toThrow();
    });

    test('should throw an error if parameter is too large', () => {
      const validateUint = (params: unknown[]) =>
        validateFields(getFunctionAbi(Uint.u8), params, getAbiStructs(), getAbiEnums());

      const error = new Error(
        'Validation: Parameter is too large to be typed as Number use (BigInt or String)'
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

    test('should throw an error if Uint "u8" is not in range', () => {
      const validateUint = (params: unknown[]) =>
        validateFields(getFunctionAbi(Uint.u8), params, getAbiStructs(), getAbiEnums());

      const error = new Error(
        `Validate: arg test cairo typed ${Uint.u8} should be in range [0 - 255]`
      );

      expect(() => validateUint([-1])).toThrow(error);
      expect(() => validateUint([256n])).toThrow(error);
    });

    test('should throw an error if Uint "u16" is not in range', () => {
      const validateUint = (params: unknown[]) =>
        validateFields(getFunctionAbi(Uint.u16), params, getAbiStructs(), getAbiEnums());

      const error = new Error(
        `Validate: arg test cairo typed ${Uint.u16} should be in range [0, 65535]`
      );

      expect(() => validateUint([65536n])).toThrow(error);
    });

    test('should throw an error if Uint "u32" is not in range', () => {
      const validateUint = (params: unknown[]) =>
        validateFields(getFunctionAbi(Uint.u32), params, getAbiStructs(), getAbiEnums());

      const error = new Error(
        `Validate: arg test cairo typed ${Uint.u32} should be in range [0, 4294967295]`
      );

      expect(() => validateUint([4294967296n])).toThrow(error);
    });

    test('should throw an error if Uint "u64" is not in range', () => {
      const validateUint = (params: unknown[]) =>
        validateFields(getFunctionAbi(Uint.u64), params, getAbiStructs(), getAbiEnums());

      const error = new Error(
        `Validate: arg test cairo typed ${Uint.u64} should be in range [0, 2^64-1]`
      );

      expect(() => validateUint([2n ** 64n])).toThrow(error);
    });

    test('should throw an error if Uint "u128" is not in range', () => {
      const validateUint = (params: unknown[]) =>
        validateFields(getFunctionAbi(Uint.u128), params, getAbiStructs(), getAbiEnums());

      const error = new Error(
        `Validate: arg test cairo typed ${Uint.u128} should be in range [0, 2^128-1]`
      );

      expect(() => validateUint([2n ** 128n])).toThrow(error);
    });

    test('should throw an error if Uint "u256" is not in range', () => {
      const validateUint = (params: unknown[]) =>
        validateFields(getFunctionAbi(Uint.u256), params, getAbiStructs(), getAbiEnums());

      const error = new Error('bigNumberish is bigger than UINT_256_MAX');

      expect(() => validateUint([2n ** 256n])).toThrow(error);
    });

    test('should throw an error if Uint "u512" is not in range', () => {
      const validateUint = (params: unknown[]) =>
        validateFields(getFunctionAbi(Uint.u512), params, getAbiStructs(), getAbiEnums());

      const error = new Error('bigNumberish is bigger than UINT_512_MAX.');

      expect(() => validateUint([2n ** 512n])).toThrow(error);
    });

    test('should throw an error if "Literal.ClassHash" is not in range', () => {
      const validateUint = (params: unknown[]) =>
        validateFields(getFunctionAbi(Literal.ClassHash), params, getAbiStructs(), getAbiEnums());

      const error = new Error(
        `Validate: arg test cairo typed ${Literal.ClassHash} should be in range [0, 2^252-1]`
      );

      expect(() => validateUint([2n ** 252n])).toThrow(error);
    });

    test('should throw an error if "Literal.ContractAddress" is not in range', () => {
      const validateUint = (params: unknown[]) =>
        validateFields(
          getFunctionAbi(Literal.ContractAddress),
          params,
          getAbiStructs(),
          getAbiEnums()
        );

      const error = new Error(
        `Validate: arg test cairo typed ${Literal.ContractAddress} should be in range [0, 2^252-1]`
      );

      expect(() => validateUint([2n ** 252n])).toThrow(error);
    });

    test('should throw an error if "Literal.Secp256k1Point" is not in range', () => {
      const validateUint = (params: unknown[]) =>
        validateFields(
          getFunctionAbi(Literal.Secp256k1Point),
          params,
          getAbiStructs(),
          getAbiEnums()
        );

      const error = new Error(
        `Validate: arg test must be ${Literal.Secp256k1Point} : a 512 bits number.`
      );

      expect(() => validateUint([2n ** 512n])).toThrow(error);
    });
  });

  describe('Boolean validation', () => {
    test('should validate a boolean', () => {
      expect(() =>
        validateFields(getFunctionAbi('core::bool'), [true], getAbiStructs(), getAbiEnums())
      ).not.toThrow();
    });

    test('should throw an error if boolean validation fails', () => {
      const validateBool = (params: unknown[]) =>
        validateFields(getFunctionAbi('core::bool'), params, getAbiStructs(), getAbiEnums());

      const error = new Error(
        `Validate: arg test of cairo type core::bool should be type (Boolean)`
      );

      expect(() => validateBool(['bool', 22, Symbol('test'), BigInt(2)])).toThrow(error);
    });
  });

  describe('Boolean validation', () => {
    test('should validate a boolean', () => {
      expect(() =>
        validateFields(getFunctionAbi('core::bool'), [true], getAbiStructs(), getAbiEnums())
      ).not.toThrow();
    });

    test('should throw an error if boolean validation fails', () => {
      const validateBool = (params: unknown[]) =>
        validateFields(getFunctionAbi('core::bool'), params, getAbiStructs(), getAbiEnums());

      const error = new Error(
        `Validate: arg test of cairo type core::bool should be type (Boolean)`
      );

      expect(() => validateBool(['bool'])).toThrow(error);
    });
  });

  describe('ByteArray validation', () => {
    test('should validate a byte array', () => {
      expect(() =>
        validateFields(
          getFunctionAbi('core::byte_array::ByteArray'),
          ['byte_array'],
          getAbiStructs(),
          getAbiEnums()
        )
      ).not.toThrow();
    });
  });

  describe('Tuple validation', () => {
    test('should validate a tuple', () => {
      expect(() =>
        validateFields(
          getFunctionAbi('(core::bool, core::bool)'),
          [{ min: true, max: true }],
          getAbiStructs(),
          getAbiEnums()
        )
      ).not.toThrow();
    });

    test('should throw an error if tupple validation fails', () => {
      const error = new Error(`Validate: arg test should be a tuple (defined as object)`);

      expect(() =>
        validateFields(
          getFunctionAbi('(core::bool, core::bool)'),
          [],
          getAbiStructs(),
          getAbiEnums()
        )
      ).toThrow(error);
    });
  });

  describe('Struct validation', () => {
    test('should validate a common struct', () => {
      expect(() =>
        validateFields(
          getFunctionAbi('struct'),
          [{ test_name: 'test' }],
          getAbiStructs(),
          getAbiEnums()
        )
      ).not.toThrow();
    });

    test('should validate Uint 256 and Uint 512 structs', () => {
      const abiStructs256 = {
        [Uint.u256]: getAbiStructs().struct,
      };
      expect(() =>
        validateFields(getFunctionAbi(Uint.u256), [2n ** 256n - 1n], abiStructs256, getAbiEnums())
      ).not.toThrow();

      const abiStructs512 = {
        [Uint.u512]: getAbiStructs().struct,
      };
      expect(() =>
        validateFields(getFunctionAbi(Uint.u512), [2n ** 512n - 1n], abiStructs512, getAbiEnums())
      ).not.toThrow();
    });

    test('should validate an EthAddress struct', () => {
      const abiStructs = {
        [ETH_ADDRESS]: getAbiStructs().struct,
      };
      expect(() =>
        validateFields(getFunctionAbi(ETH_ADDRESS), [1n], abiStructs, getAbiEnums())
      ).not.toThrow();
    });

    test('should throw an error for EthAddress struct if type is not a BigNumberish', () => {
      const error = new Error('EthAddress type is waiting a BigNumberish. Got "[object Object]"');

      expect(() => {
        const abiStructs = {
          [ETH_ADDRESS]: getAbiStructs().struct,
        };

        validateFields(getFunctionAbi(ETH_ADDRESS), [{ test: 1 }], abiStructs, getAbiEnums());
      }).toThrow(error);
    });

    test('should throw an error for EthAddress struct if it is not in range', () => {
      const error = new Error(
        `Validate: arg test cairo typed ${ETH_ADDRESS} should be in range [0, 2^160-1]`
      );

      expect(() => {
        const abiStructs = {
          [ETH_ADDRESS]: getAbiStructs().struct,
        };

        validateFields(getFunctionAbi(ETH_ADDRESS), [2n ** 160n], abiStructs, getAbiEnums());
      }).toThrow(error);
    });

    test('should throw an error if arg is not an JS object', () => {
      const error = new Error(
        'Validate: arg test is cairo type struct (struct), and should be defined as a js object (not array)'
      );

      expect(() =>
        validateFields(getFunctionAbi('struct'), [2], getAbiStructs(), getAbiEnums())
      ).toThrow(error);
    });

    test('should throw an error if arg property name does not exist in the struct members', () => {
      const error = new Error('Validate: arg test should have a property test_name');

      expect(() =>
        validateFields(
          getFunctionAbi('struct'),
          [{ example: 'test' }],
          getAbiStructs(),
          getAbiEnums()
        )
      ).toThrow(error);
    });
  });

  describe('Enum validation', () => {
    test('should validate a custom enum', () => {
      expect(() =>
        validateFields(
          getFunctionAbi('enum'),
          [{ variant: 'test', activeVariant: 'test' }],
          getAbiStructs(),
          getAbiEnums()
        )
      ).not.toThrow();
    });

    test('should validate an option enum', () => {
      const enumOption = 'core::option::Option::core::bool';

      const abiEnums = {
        [enumOption]: getAbiEnums().enum,
      };
      expect(() =>
        validateFields(
          getFunctionAbi(enumOption),
          [new CairoOption<string>(0, 'content')],
          getAbiStructs(),
          abiEnums
        )
      ).not.toThrow();
    });

    test('should validate a result enum', () => {
      const enumResult = 'core::result::Result::bool';

      const abiEnums = {
        [enumResult]: getAbiEnums().enum,
      };
      expect(() =>
        validateFields(
          getFunctionAbi(enumResult),
          [new CairoResult<number, string>(0, 'content')],
          getAbiStructs(),
          abiEnums
        )
      ).not.toThrow();
    });

    test('should throw an error if arg is not an JS object', () => {
      const error = new Error(
        'Validate: arg test is cairo type Enum (enum), and should be defined as a js object (not array)'
      );

      expect(() =>
        validateFields(getFunctionAbi('enum'), [2], getAbiStructs(), getAbiEnums())
      ).toThrow(error);
    });

    test('should throw an error if arg is not an enum', () => {
      const error = new Error(
        'Validate Enum: argument test, type enum, value received "[object Object]", is not an Enum.'
      );

      expect(() =>
        validateFields(
          getFunctionAbi('enum'),
          [{ example: 'test' }],
          getAbiStructs(),
          getAbiEnums()
        )
      ).toThrow(error);
    });
  });

  describe('NonZero validation', () => {
    test('should validate a non-zero felt', () => {
      expect(() =>
        validateFields(
          getFunctionAbi(`${NON_ZERO_PREFIX}<felt>`),
          [1n],
          getAbiStructs(),
          getAbiEnums()
        )
      ).not.toThrow();
    });

    test('should validate a non-zero Uint', () => {
      expect(() =>
        validateFields(
          getFunctionAbi(`${NON_ZERO_PREFIX}<${Uint.u8}>`),
          [1n],
          getAbiStructs(),
          getAbiEnums()
        )
      ).not.toThrow();
    });

    test('should throw an error if type is not authorized', () => {
      const error = new Error('Validate: test type is not authorized for NonZero type.');

      expect(() =>
        validateFields(
          getFunctionAbi(`${NON_ZERO_PREFIX}<core::bool>`),
          [true],
          getAbiStructs(),
          getAbiEnums()
        )
      ).toThrow(error);
    });

    test('should throw an error if value 0 iz provided for felt252 type', () => {
      const error = new Error('Validate: value 0 is not authorized in NonZero felt252 type.');

      expect(() =>
        validateFields(
          getFunctionAbi(`${NON_ZERO_PREFIX}<core::felt252>`),
          [0],
          getAbiStructs(),
          getAbiEnums()
        )
      ).toThrow(error);
    });

    test('should throw an error if value 0 iz provided for uint256 type', () => {
      const error = new Error('Validate: value 0 is not authorized in NonZero uint256 type.');

      expect(() =>
        validateFields(
          getFunctionAbi(`${NON_ZERO_PREFIX}<${Uint.u256}>`),
          [0],
          getAbiStructs(),
          getAbiEnums()
        )
      ).toThrow(error);
    });

    test('should throw an error if value 0 iz provided for any uint type', () => {
      const error = new Error('Validate: value 0 is not authorized in NonZero uint type.');

      expect(() =>
        validateFields(
          getFunctionAbi(`${NON_ZERO_PREFIX}<${Uint.u8}>`),
          [0],
          getAbiStructs(),
          getAbiEnums()
        )
      ).toThrow(error);
    });
  });

  describe('Array validation', () => {
    test('should validate arrays of each type', () => {
      const validateArray = (type: string, param: unknown) =>
        validateFields(getFunctionAbi(type), [[param]], getAbiStructs(), getAbiEnums());

      expect(validateArray('core::array::Array::<core::bool>', true)).toBeUndefined();
      expect(validateArray('core::array::Array::<felt>', 'test')).toBeUndefined();
      expect(validateArray('core::array::Span::<core::bool>', true)).toBeUndefined();
      expect(validateArray('core::array::Array::<felt>', 'felt')).toBeUndefined();
      expect(validateArray(`core::array::Array::<${Uint.u8}>`, 2n)).toBeUndefined();
      expect(validateArray('core::array::Array::<felt>', 'felt')).toBeUndefined();
      expect(
        validateArray('core::array::Array::<(core::bool, core::bool)>', { min: true, max: true })
      ).toBeUndefined();
      expect(
        validateArray('core::array::Array::<core::array::Array::<core::bool>>', [true])
      ).toBeUndefined();

      const enumArrayResult = 'core::array::Array::<core::result::Result::core::bool>';

      const abiEnums = { 'core::result::Result::core::bool': getAbiEnums().enum };
      expect(() =>
        validateFields(
          getFunctionAbi(enumArrayResult),
          [[new CairoResult<number, string>(0, 'content')]],
          getAbiStructs(),
          abiEnums
        )
      ).not.toThrow();

      const structArrayEth = `core::array::Array::<${ETH_ADDRESS}>`;
      const abiStructs = { [ETH_ADDRESS]: getAbiStructs().struct };

      expect(() =>
        validateFields(getFunctionAbi(structArrayEth), [[1n]], abiStructs, getAbiEnums())
      ).not.toThrow();
    });

    test('should throw an error if parameter is not an array', () => {
      expect(() => {
        validateFields(
          getFunctionAbi('core::array::Span::<core::bool>'),
          [true],
          getAbiStructs(),
          getAbiEnums()
        );
      }).toThrow(new Error('Validate: arg test should be an Array'));
    });

    test('should throw an error if array validation is unhandled', () => {
      expect(() => {
        validateFields(
          getFunctionAbi('core::array::Span::<core::test>'),
          [[true]],
          getAbiStructs(),
          getAbiEnums()
        );
      }).toThrow(
        new Error(
          'Validate Unhandled: argument test, type core::array::Span::<core::test>, value true'
        )
      );
    });
  });
});
