import {
  AbiParser0,
  AbiParser1,
  AbiParser2,
  createAbiParser,
  getAbiVersion,
  isNoConstructorValid,
} from '../../../../src';
import { getFunctionAbi, getInterfaceAbi } from '../../../factories/abi';

describe('createAbiParser', () => {
  test('should create an AbiParser2 instance', () => {
    const abiParser = createAbiParser([getInterfaceAbi()]);
    expect(abiParser instanceof AbiParser2).toEqual(true);
  });

  test('should create an AbiParser1 instance', () => {
    const abiParser = createAbiParser([getFunctionAbi('core::bool')]);
    expect(abiParser instanceof AbiParser1).toEqual(true);
  });

  // a Cairo 0 abi is the one whose types carry no '::', and it gets its own parser so that the
  // Cairo 1 ones can move to the Cairo type classes without it
  test('should create an AbiParser0 instance', () => {
    const abiParser = createAbiParser([getFunctionAbi('felt')]);
    expect(abiParser instanceof AbiParser0).toEqual(true);
    expect(abiParser instanceof AbiParser1).toEqual(false);
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
  test('should return true if no constructor valid', () => {
    expect(isNoConstructorValid('constructor', [])).toEqual(true);
  });

  test('should return false if constructor valid', () => {
    expect(isNoConstructorValid('test', ['test'])).toEqual(false);
  });
});
