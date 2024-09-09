import {
  createAbiParser,
  getAbiVersion,
  isNoConstructorValid,
} from '../../../../src/utils/calldata/parser';
import type { AbiEntry, FunctionAbi, InterfaceAbi } from '../../../../src';
import { AbiParser2 } from '../../../../src/utils/calldata/parser/parser-2.0.0';
import { AbiParser1 } from '../../../../src/utils/calldata/parser/parser-0-1.1.0';

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

describe('createAbiParser', () => {
  test('should create an AbiParser2 instance', () => {
    const abiParser = createAbiParser([getInterfaceAbi()]);
    expect(abiParser instanceof AbiParser2).toEqual(true);
  });

  test('should create an AbiParser1 instance', () => {
    const abiParser = createAbiParser([getFunctionAbi('struct')]);
    expect(abiParser instanceof AbiParser1).toEqual(true);
  });
});

describe('getAbiVersion', () => {
  test('should return ABI version 2', () => {
    expect(getAbiVersion([getInterfaceAbi()])).toEqual(2);
  });

  test('should return ABI version 1', () => {
    expect(getAbiVersion([getFunctionAbi('core::bool')])).toEqual(1);
  });

  test('should return ABI version 0', () => {
    expect(getAbiVersion([getFunctionAbi('felt')])).toEqual(0);
  });
});

describe('isNoConstructorValid', () => {
  test('should return true if no constructor valid ', () => {
    expect(isNoConstructorValid('constructor', [])).toEqual(true);
  });

  test('should return false if constructor valid', () => {
    expect(isNoConstructorValid('test', ['test'])).toEqual(false);
  });
});
