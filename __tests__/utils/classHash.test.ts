import { hash } from '../../src';
import {
  compiledC260Casm,
  compiledErc20,
  compiledHashSierra,
  compiledHashSierraCasm,
  compiledOpenZeppelinAccount,
  compiledTestDapp,
  erc20ClassHash,
} from '../config/fixtures';

describe('Hash Tester', () => {
  test('Test getSelectorFromName', () => {
    const hash0 = hash.getSelectorFromName('__validate__');
    expect(hash0).toEqual('0x162da33a4585851fe8d3af3c2a9c60b557814e221e0d4f30ff0b2189d9c7775');
  });

  describe('Compute ClassHash of various contracts Cairo0', () => {
    test('ERC20 Contract ClassHash', () => {
      const classHash = hash.computeContractClassHash(compiledErc20);

      expect(classHash).toEqual(erc20ClassHash);
      expect(classHash).toMatchInlineSnapshot(
        `"0x54328a1075b8820eb43caf0caa233923148c983742402dcfc38541dd843d01a"`
      );
      const hintedClassH = hash.computeHintedClassHash(compiledErc20);
      expect(hintedClassH).toBe(
        '0x2819cbfc03fb25e1816c2aa6ec990062539a4470a8f57b78d27a6efbd8e1446'
      );
    });

    test('OZ ERC20 Contract ClassHash', () => {
      const classHash = hash.computeContractClassHash(compiledOpenZeppelinAccount);

      expect(classHash).toMatchInlineSnapshot(
        `"0x36c7e49a16f8fc760a6fbdf71dde543d98be1fee2eda5daff59a0eeae066ed9"`
      );
    });

    test('Test DApp Contract ClassHash', () => {
      const classHash = hash.computeContractClassHash(compiledTestDapp);

      expect(classHash).toMatchInlineSnapshot(
        `"0x4367b26fbb92235e8d1137d19c080e6e650a6889ded726d00658411cc1046f5"`
      );
    });
  });

  describe('Compute CompiledClassHash & ClassHash Cairo1', () => {
    test('Hello - CompiledClassHash', () => {
      const compiledClassHash = hash.computeCompiledClassHash(compiledHashSierraCasm);
      expect(compiledClassHash).toEqual(
        '0x5c82c98f2ab111bd50293ba64bb18cf49037374783ad2486c712709c4ba0d89'
      );
    });

    test('Hello - CompiledClassHash Cairo2.6.0 Sierra1.5.0', () => {
      const compiledClassHash = hash.computeCompiledClassHash(compiledC260Casm);
      expect(compiledClassHash).toEqual(
        '0x1725af24fbfa8050f4514651990b30e06bb9993e4e5c1051206f1bef218b1c6'
      );
    });

    test('Hello - ClassHash', () => {
      const classHash = hash.computeSierraContractClassHash(compiledHashSierra);
      expect(classHash).toEqual(
        '0x345df0a9b35ce05d03772ba7938acad66921c5c39c1a5af74aee72aa25c363e'
      );
    });
  });
});
