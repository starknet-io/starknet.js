import { AbiParser2 } from '../../../../src/utils/calldata/parser/parser-2.0.0';
import { getFunctionAbi, getInterfaceAbi } from '../../../factories/abi';
import { PRIME } from '../../../../src/global/constants';
import { toHex } from '../../../../src/utils/num';

describe('AbiParser2', () => {
  test('should create an instance', () => {
    const abiParser = new AbiParser2([getFunctionAbi('struct')]);
    expect(abiParser instanceof AbiParser2).toEqual(true);
    expect(abiParser.abi).toStrictEqual([getFunctionAbi('struct')]);
  });

  describe('methodInputsLength', () => {
    test('should return inputs length', () => {
      const abiParser = new AbiParser2([getFunctionAbi('struct')]);
      expect(abiParser.methodInputsLength(getFunctionAbi('test'))).toEqual(1);
    });

    test('should return 0 if inputs are empty', () => {
      const abiParser = new AbiParser2([getFunctionAbi('struct')]);
      const functionAbi = getFunctionAbi('test');
      functionAbi.inputs = [];
      expect(abiParser.methodInputsLength(functionAbi)).toEqual(0);
    });
  });

  describe('getMethod', () => {
    test('should return method definition from ABI', () => {
      const abiParser = new AbiParser2([getFunctionAbi('struct'), getInterfaceAbi()]);
      expect(abiParser.getMethod('test')).toEqual(getFunctionAbi('struct'));
    });

    test('should return undefined if method is not found', () => {
      const abiParser = new AbiParser2([getFunctionAbi('struct')]);
      expect(abiParser.getMethod('test')).toBeUndefined();
    });
  });

  describe('getLegacyFormat', () => {
    test('should return method definition from ABI', () => {
      const abiParser = new AbiParser2([getFunctionAbi('struct'), getInterfaceAbi()]);
      const legacyFormat = abiParser.getLegacyFormat();
      const result = [getFunctionAbi('struct'), getFunctionAbi('struct')];
      expect(legacyFormat).toEqual(result);
    });
  });

  describe('default parsing strategy', () => {
    test('decodes a negative i128 response without an explicit parsingStrategy (GHSA-mv8m-rfr4-jcq8)', () => {
      const abiParser = new AbiParser2([getFunctionAbi('struct')]);
      const responseIterator = [toHex(PRIME - 1n)].values();
      const parse = abiParser.getResponseParser('core::integer::i128');
      expect(parse(responseIterator)).toEqual(-1n);
    });
  });
});
