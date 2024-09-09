import { AbiParser2 } from '../../../../src/utils/calldata/parser/parser-2.0.0';
import type { AbiEntry, FunctionAbi, InterfaceAbi } from '../../../../src';

const getAbiEntry = (type: string): AbiEntry => ({ name: 'test', type });

const getFunctionAbi = (inputsType: string): FunctionAbi => ({
  inputs: [getAbiEntry(inputsType)],
  name: 'test',
  outputs: [getAbiEntry(inputsType)],
  stateMutability: 'view',
  type: 'function',
});

const getInterfaceAbi = (): InterfaceAbi => ({
  items: [getFunctionAbi('struct')],
  name: 'test_interface_abi',
  type: 'interface',
});

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
});
