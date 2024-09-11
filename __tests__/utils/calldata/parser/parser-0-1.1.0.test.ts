import { AbiParser1 } from '../../../../src/utils/calldata/parser/parser-0-1.1.0';
import { getFunctionAbi, getInterfaceAbi } from '../../../factories/abi';

describe('AbiParser1', () => {
  test('should create an instance', () => {
    const abiParser = new AbiParser1([getFunctionAbi('struct')]);
    expect(abiParser instanceof AbiParser1).toEqual(true);
    expect(abiParser.abi).toStrictEqual([getFunctionAbi('struct')]);
  });

  describe('methodInputsLength', () => {
    test('should return inputs length', () => {
      const abiParser = new AbiParser1([getFunctionAbi('struct')]);
      expect(abiParser.methodInputsLength(getFunctionAbi('felt'))).toEqual(1);
    });

    test('should return 0 if inputs are empty', () => {
      const abiParser = new AbiParser1([getFunctionAbi('felt')]);
      const functionAbi = getFunctionAbi('felt');
      functionAbi.inputs[0].name = 'test_len';
      expect(abiParser.methodInputsLength(functionAbi)).toEqual(0);
    });
  });

  describe('getMethod', () => {
    test('should return method definition from ABI', () => {
      const abiParser = new AbiParser1([getFunctionAbi('struct'), getInterfaceAbi()]);
      expect(abiParser.getMethod('test')).toEqual(getFunctionAbi('struct'));
    });

    test('should return undefined if method is not found', () => {
      const abiParser = new AbiParser1([getFunctionAbi('struct')]);
      expect(abiParser.getMethod('struct')).toBeUndefined();
    });
  });

  describe('getLegacyFormat', () => {
    test('should return method definition from ABI', () => {
      const abiParser = new AbiParser1([getFunctionAbi('struct'), getInterfaceAbi()]);
      const legacyFormat = abiParser.getLegacyFormat();
      expect(legacyFormat).toStrictEqual(abiParser.abi);
    });
  });
});
