import {
  computeCompiledClassHash,
  computeContractClassHash,
  getSelectorFromName,
} from '../../src/utils/hash';
import {
  compiledErc20,
  compiledHelloSiera,
  compiledOpenZeppelinAccount,
  compiledTestDapp,
  erc20ClassHash,
} from '../fixtures';

describe('Hash Tester', () => {
  test('Test getSelectorFromName', () => {
    const hash = getSelectorFromName('__validate__');
    expect(hash).toEqual('0x162da33a4585851fe8d3af3c2a9c60b557814e221e0d4f30ff0b2189d9c7775');
  });

  describe('Compute ClassHash of various contracts', () => {
    test('ERC20 Contract ClassHash', () => {
      const classHash = computeContractClassHash(compiledErc20);

      expect(classHash).toEqual(erc20ClassHash);
      expect(classHash).toMatchInlineSnapshot(
        `"0x54328a1075b8820eb43caf0caa233923148c983742402dcfc38541dd843d01a"`
      );
    });

    test('OZ ERC20 Contract ClassHash', () => {
      const classHash = computeContractClassHash(compiledOpenZeppelinAccount);

      expect(classHash).toMatchInlineSnapshot(
        `"0x58d97f7d76e78f44905cc30cb65b91ea49a4b908a76703c54197bca90f81773"`
      );
    });

    test('Test DApp Contract ClassHash', () => {
      const classHash = computeContractClassHash(compiledTestDapp);

      expect(classHash).toMatchInlineSnapshot(
        `"0x4367b26fbb92235e8d1137d19c080e6e650a6889ded726d00658411cc1046f5"`
      );
    });
  });

  describe('Compute Compiled Class Hash', () => {
    test('Hello Contract ClassHash', () => {
      const classHash = computeCompiledClassHash(compiledHelloSiera);
      expect(classHash).toEqual(
        '0x5308ae7d698bdb9cb9ee6e9c7dab4d3082a3db40933634645f179d9cad06446'
      );
    });
  });
});
