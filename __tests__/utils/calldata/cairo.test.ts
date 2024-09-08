import {
  isLen,
  isTypeFelt,
  isTypeUint,
  isTypeUint256,
  isTypeArray,
  isTypeTuple,
  isTypeNamedTuple,
  isTypeStruct,
  isTypeEnum,
  isTypeOption,
  isTypeResult,
  isTypeLiteral,
  isTypeBool,
  isTypeContractAddress,
  isTypeEthAddress,
} from '../../../src/utils/calldata/cairo';
import { ETH_ADDRESS, Literal, Uint, type AbiEnums, type AbiStructs } from '../../../src';

const getAbiStructs = (): AbiStructs => ({
  struct: {
    members: [
      {
        name: 'test_name',
        type: 'test_type',
        offset: 1,
      },
    ],
    size: 2,
    name: 'cairo_struct',
    type: 'struct',
  },
});

const getAbiEnums = (): AbiEnums => ({
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

describe('isLen', () => {
  test('should return true if name ends with "_len"', () => {
    expect(isLen('test_len')).toEqual(true);
  });

  test('should return false if name does not end with "_len"', () => {
    expect(isLen('test')).toEqual(false);
  });
});

describe('isTypeFelt', () => {
  test('should return true if given type is Felt', () => {
    expect(isTypeFelt('felt')).toEqual(true);
    expect(isTypeFelt('core::felt252')).toEqual(true);
  });

  test('should return false if given type is not Felt', () => {
    expect(isTypeFelt('core::bool')).toEqual(false);
  });
});

describe('isTypeArray', () => {
  test('should return true if given type is an Array', () => {
    expect(isTypeArray('core::array::Array::<core::bool>')).toEqual(true);
    expect(isTypeArray('core::array::Span::<core::bool>')).toEqual(true);
    expect(isTypeArray('felt*')).toEqual(true);
  });

  test('should return false if given type is not an Array ', () => {
    expect(isTypeArray('core::bool')).toEqual(false);
  });
});

describe('isTypeTuple', () => {
  test('should return true if given type is Tuple', () => {
    expect(isTypeTuple('(core::bool, felt)')).toEqual(true);
  });

  test('should return false if given type is not Tuple ', () => {
    expect(isTypeTuple('core::bool')).toEqual(false);
  });
});

describe('isTypeNamedTuple', () => {
  test('should return true if given type is named Tuple', () => {
    expect(isTypeNamedTuple('(core::bool, core::bool)')).toEqual(true);
    expect(isTypeNamedTuple('(core::bool, felt)')).toEqual(true);
  });

  test('should return false if given type is not named Tuple ', () => {
    expect(isTypeNamedTuple('(felt, felt)')).toEqual(false);
  });
});

describe('isTypeStruct', () => {
  test('should return true if given type is Struct', () => {
    expect(isTypeStruct('struct', getAbiStructs())).toEqual(true);
  });

  test('should return false if given type is not Struct', () => {
    expect(isTypeStruct('struct', { test: getAbiStructs().struct })).toEqual(false);
  });
});

describe('isTypeEnum', () => {
  test('should return true if given type is Enum', () => {
    expect(isTypeEnum('enum', getAbiEnums())).toEqual(true);
  });

  test('should return false if given type is not Enum', () => {
    expect(isTypeEnum('enum', { test: getAbiEnums().enum })).toEqual(false);
  });
});

describe('isTypeOption', () => {
  test('should return true if given type is Option', () => {
    expect(isTypeOption('core::option::Option::core::bool')).toEqual(true);
  });

  test('should return false if given type is not Option', () => {
    expect(isTypeOption('core::bool')).toEqual(false);
  });
});

describe('isTypeResult', () => {
  test('should return true if given type is Result', () => {
    expect(isTypeResult('core::result::Result::core::bool')).toEqual(true);
  });

  test('should return false if given type is not Result', () => {
    expect(isTypeResult('core::bool')).toEqual(false);
  });
});

describe('isTypeUint', () => {
  test('should return true if given type is Uint', () => {
    Object.values(Uint).forEach((uint) => {
      expect(isTypeUint(uint)).toEqual(true);
    });
  });

  test('should return false if given type is not Uint', () => {
    expect(isTypeUint('core::bool')).toEqual(false);
  });
});

describe('isTypeUint256', () => {
  test('should return true if given type is Uint256', () => {
    expect(isTypeUint256('core::integer::u256')).toEqual(true);
  });

  test('should return false if given type is not Uint256', () => {
    expect(isTypeUint256('core::bool')).toEqual(false);
  });
});

describe('isTypeLiteral', () => {
  test('should return true if given type is Literal', () => {
    Object.values(Literal).forEach((literal) => {
      expect(isTypeLiteral(literal)).toEqual(true);
    });
  });

  test('should return false if given type is not Literal', () => {
    expect(isTypeLiteral('core::bool')).toEqual(false);
  });
});

describe('isTypeBool', () => {
  test('should return true if given type is Bool', () => {
    expect(isTypeBool('core::bool')).toEqual(true);
  });

  test('should return false if given type is not Bool', () => {
    expect(isTypeBool(Uint.u8)).toEqual(false);
  });
});

describe('isTypeContractAddress', () => {
  test('should return true if given type is ContractAddress', () => {
    expect(isTypeContractAddress(Literal.ContractAddress)).toEqual(true);
  });

  test('should return false if given type is not ContractAddress', () => {
    expect(isTypeContractAddress(Uint.u8)).toEqual(false);
  });
});

describe('isTypeEthAddress', () => {
  test('should return true if given type is EthAddress', () => {
    expect(isTypeEthAddress(ETH_ADDRESS)).toEqual(true);
  });

  test('should return false if given type is not EthAddress', () => {
    expect(isTypeEthAddress(Literal.ContractAddress)).toEqual(false);
  });
});
