import { hash } from '../../src';
import { contracts } from '../config/fixtures';

describe('Hash Tester', () => {
  test('Test getSelectorFromName', () => {
    const hash0 = hash.getSelectorFromName('__validate__');
    expect(hash0).toEqual('0x162da33a4585851fe8d3af3c2a9c60b557814e221e0d4f30ff0b2189d9c7775');
  });

  describe('Compute CompiledClassHash & ClassHash Cairo1', () => {
    test('Hello - CompiledClassHash', () => {
      const compiledClassHash = hash.computeCompiledClassHash(contracts.HashSierra.casm, '0.13.1');
      expect(compiledClassHash).toEqual(
        '0x5c82c98f2ab111bd50293ba64bb18cf49037374783ad2486c712709c4ba0d89'
      );
    });

    test('Hello - CompiledClassHash Cairo2.6.0 Sierra1.5.0', () => {
      const compiledClassHash = hash.computeCompiledClassHash(contracts.C260.casm, '0.13.1');
      expect(compiledClassHash).toEqual(
        '0x1725af24fbfa8050f4514651990b30e06bb9993e4e5c1051206f1bef218b1c6'
      );
    });

    test('Hello - ClassHash', () => {
      const classHash = hash.computeSierraContractClassHash(contracts.HashSierra.sierra);
      expect(classHash).toEqual(
        '0x345df0a9b35ce05d03772ba7938acad66921c5c39c1a5af74aee72aa25c363e'
      );
    });
  });
});
