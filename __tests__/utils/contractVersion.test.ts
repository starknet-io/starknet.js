import { RpcProvider } from '../../src';
import { CONTRACTS } from '../config/fixtures';

// These tests need no node: getClass is replaced, and returns the class given by each test.
// So the class hash given to getContractVersion is not used.
const providerReturning = (contractClass: any): RpcProvider => {
  const provider = new RpcProvider({ nodeUrl: 'http://127.0.0.1:1' });
  jest.spyOn(provider, 'getClass').mockResolvedValue(contractClass);
  return provider;
};

describe('getContractVersion', () => {
  test('Cairo V2 contract with no `interface` entry in its abi: compiler 2', async () => {
    // compiled by Cairo 2.8.2: its Sierra program starts with 0x1, 0x6, 0x0, 0x2, 0x8, 0x2
    const provider = providerReturning(CONTRACTS.OnlyConstructor.sierra);

    const version = await provider.getContractVersion(undefined, '0x1');

    expect(version).toEqual({ cairo: '1', compiler: '2' });
  });

  test('Cairo V2 contract with an `interface` entry in its abi: compiler 2', async () => {
    // compiled by Cairo 2.1.0: its Sierra program starts with 0x1, 0x3, 0x0, 0x2, 0x1, 0x0
    const provider = providerReturning(CONTRACTS.C1v2.sierra);

    const version = await provider.getContractVersion(undefined, '0x1');

    expect(version).toEqual({ cairo: '1', compiler: '2' });
  });

  test('Cairo V1 contract compiled by Cairo 1.0.0-rc0: compiler 1', async () => {
    // Cairo 1.0.0-rc0 writes Sierra 1.0.0, then compiler 1.0.0. Only these first felts are read.
    const provider = providerReturning({
      ...CONTRACTS.ComplexSierra.sierra,
      sierra_program: ['0x1', '0x0', '0x0', '0x1', '0x0', '0x0'],
    });

    const version = await provider.getContractVersion(undefined, '0x1');

    expect(version).toEqual({ cairo: '1', compiler: '1' });
  });

  test('Cairo V1 contract in the oldest format (Sierra 0.1.0): compiler 1', async () => {
    // Cairo 1.0.0-alpha wrote the text '0.1.0' (0x302e312e30) first, and no compiler version
    const provider = providerReturning(CONTRACTS.ComplexSierra.sierra);

    const version = await provider.getContractVersion(undefined, '0x1');

    expect(version).toEqual({ cairo: '1', compiler: '1' });
  });

  test('compiler not known by this version of starknet.js: compiler undefined', async () => {
    // a future compiler 3.0.0. The abi has an `interface` entry: a guess from the abi would say 2.
    const provider = providerReturning({
      ...CONTRACTS.C1v2.sierra,
      sierra_program: ['0x1', '0x9', '0x0', '0x3', '0x0', '0x0'],
    });

    const version = await provider.getContractVersion(undefined, '0x1');

    expect(version).toEqual({ cairo: '1', compiler: undefined });
  });

  test('Sierra format not known by this version of starknet.js: compiler undefined', async () => {
    // a future Sierra 2.0.0. The 4th felt is 2, but in an unknown format it may not be
    // the compiler version.
    const provider = providerReturning({
      ...CONTRACTS.C1v2.sierra,
      sierra_program: ['0x2', '0x0', '0x0', '0x2', '0x0', '0x0'],
    });

    const version = await provider.getContractVersion(undefined, '0x1');

    expect(version).toEqual({ cairo: '1', compiler: undefined });
  });

  test('Sierra program that cannot be read: compiler undefined, and no error', async () => {
    // a compressed program, as sent in a declare transaction, instead of a list of felts
    const provider = providerReturning({
      ...CONTRACTS.C1v2.sierra,
      sierra_program: 'H4sIAAAAAAAAA6x9WZbs',
    });

    const version = await provider.getContractVersion(undefined, '0x1');

    expect(version).toEqual({ cairo: '1', compiler: undefined });
  });

  test('option compiler false: compiler undefined', async () => {
    const provider = providerReturning(CONTRACTS.OnlyConstructor.sierra);

    const version = await provider.getContractVersion(undefined, '0x1', { compiler: false });

    expect(version).toEqual({ cairo: '1', compiler: undefined });
  });

  test('Cairo 0 contract: cairo 0, compiler 0', async () => {
    // No network accepts a Cairo 0 declaration any more, and devnet cannot run Cairo 0.
    // A Cairo 0 class has a `program`, and no `sierra_program`: that is all that is read here.
    const provider = providerReturning({
      program: 'H4sIAAAAAAAAA6x9WZbs',
      entry_points_by_type: {},
      abi: [],
    });

    const version = await provider.getContractVersion(undefined, '0x1');

    expect(version).toEqual({ cairo: '0', compiler: '0' });
  });
});
