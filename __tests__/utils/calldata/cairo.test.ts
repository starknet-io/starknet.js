import {
  isLen,
  isTypeFelt,
  isTypeUint,
  isTypeUint256,
  isTypeArray,
  uint256,
  uint512,
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
  isTypeBytes31,
  isTypeByteArray,
  isTypeSecp256k1Point,
  isCairo1Type,
  getArrayType,
  isCairo1Abi,
  isTypeNonZero,
  getAbiContractVersion,
  tuple,
  felt,
} from '../../../src/utils/calldata/cairo';
import { ETH_ADDRESS, Literal, Uint, type ContractVersion, NON_ZERO_PREFIX } from '../../../src';
import { getFunctionAbi, getAbiEnums, getAbiStructs, getInterfaceAbi } from '../../factories/abi';

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

describe('isTypeBytes31', () => {
  test('should return true if given type is Bytes31', () => {
    expect(isTypeBytes31('core::bytes_31::bytes31')).toEqual(true);
  });

  test('should return false if given type is not Bytes31', () => {
    expect(isTypeBytes31('core::bool')).toEqual(false);
  });
});

describe('isTypeByteArray', () => {
  test('should return true if given type is ByteArray', () => {
    expect(isTypeByteArray('core::byte_array::ByteArray')).toEqual(true);
  });

  test('should return false if given type is not ByteArray', () => {
    expect(isTypeByteArray('core::bool')).toEqual(false);
  });
});

describe('isTypeSecp256k1Point', () => {
  test('should return true if given type is Secp256k1Point', () => {
    expect(isTypeSecp256k1Point(Literal.Secp256k1Point)).toEqual(true);
  });

  test('should return false if given type is not Secp256k1Point', () => {
    expect(isTypeSecp256k1Point('core::bool')).toEqual(false);
  });
});

describe('isCairo1Type', () => {
  test('should return true if given type is Cairo1', () => {
    expect(isCairo1Type('core::bool')).toEqual(true);
  });

  test('should return false if given type is not Cairo1', () => {
    expect(isCairo1Type('felt')).toEqual(false);
  });
});

describe('getArrayType', () => {
  test('should extract type from an array', () => {
    expect(getArrayType('felt*')).toEqual('felt');
    expect(getArrayType('core::array::Array::<core::bool>')).toEqual('core::bool');
  });
});

describe('isTypeNonZero', () => {
  test('should return true if given type is NonZero', () => {
    expect(isTypeNonZero(`${NON_ZERO_PREFIX}core::bool`)).toEqual(true);
  });

  test('should return false if given type is not NonZero', () => {
    expect(isTypeNonZero('core::bool')).toEqual(false);
  });
});

describe('isCairo1Abi', () => {
  test('should return true if ABI comes from Cairo 1 contract', () => {
    expect(isCairo1Abi([getInterfaceAbi()])).toEqual(true);
  });

  test('should return false if ABI comes from Cairo 0 contract', () => {
    expect(isCairo1Abi([getFunctionAbi('felt')])).toEqual(false);
  });

  test('should throw an error if ABI does not come from Cairo 1 contract ', () => {
    expect(() => isCairo1Abi([{}])).toThrow(new Error('Unable to determine Cairo version'));
  });
});

describe('getAbiContractVersion', () => {
  test('should return Cairo 0 contract version', () => {
    const contractVersion: ContractVersion = getAbiContractVersion([getFunctionAbi('felt')]);
    expect(contractVersion).toEqual({ cairo: '0', compiler: '0' });
  });

  test('should return Cairo 1 with compiler 2 contract version', () => {
    const contractVersion: ContractVersion = getAbiContractVersion([getInterfaceAbi()]);
    expect(contractVersion).toEqual({ cairo: '1', compiler: '2' });
  });

  test('should return Cairo 1 with compiler 1 contract version', () => {
    const contractVersion: ContractVersion = getAbiContractVersion([getFunctionAbi('core::bool')]);
    expect(contractVersion).toEqual({ cairo: '1', compiler: '1' });
  });

  test('should return undefined values for cairo and compiler', () => {
    const contractVersion: ContractVersion = getAbiContractVersion([{}]);
    expect(contractVersion).toEqual({ cairo: undefined, compiler: undefined });
  });
});

describe('uint256', () => {
  test('should create Uint256 Cairo type', () => {
    const uint = uint256('892349863487563453485768723498');
    expect(uint).toEqual({ low: '892349863487563453485768723498', high: '0' });
  });
});

describe('uint512', () => {
  test('should create Uint512 Cairo type', () => {
    const uint = uint512('345745685892349863487563453485768723498');
    expect(uint).toEqual({
      limb0: '5463318971411400024188846054000512042',
      limb1: '1',
      limb2: '0',
      limb3: '0',
    });
  });
});

describe('tuple', () => {
  test('should create unnamed Cairo type tuples', () => {
    const tuples = [tuple(true, false), tuple(1, '0x101', 16)];
    expect(tuples).toEqual([
      { '0': true, '1': false },
      { '0': 1, '1': '0x101', '2': 16 },
    ]);
  });
});

describe('felt', () => {
  test('should create Cairo type felts', () => {
    const felts = [felt('test'), felt(256n), felt(1234)];
    expect(felts).toEqual(['1952805748', '256', '1234']);
  });
});
