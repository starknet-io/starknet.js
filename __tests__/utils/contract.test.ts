import type { CompiledSierra } from '../../src';
import { isSierra, extractContractHashes } from '../../src/utils/contract';
import { contracts } from '../config/fixtures';

describe('isSierra', () => {
  test('should return true for a contract in Sierra format', () => {
    expect(isSierra(contracts.Erc20OZ.sierra)).toBe(true);
  });

  test('should return false for a contract not in Sierra format', () => {
    expect(isSierra(contracts.Erc20OZ.casm as any as CompiledSierra)).toBe(false);
  });
});

describe('extractContractHashes', () => {
  test('should properly extract hashes from contract', () => {
    const declareContractPayload = {
      contract: contracts.Erc20OZ.sierra,
      casm: contracts.Erc20OZ.casm,
    };
    const result = extractContractHashes(declareContractPayload);

    expect(result).toHaveProperty(
      'classHash',
      '0x393ef3ce29284a4fbf7abfe301d894ff9e7720a13c37f4aac58f2376f0c12ff'
    );
    expect(result).toHaveProperty(
      'compiledClassHash',
      '0x7e4b13e7b1de8e3555b04b2ef2c8757b4329b83420dc502ae5384c9748cdab5'
    );
  });
});
