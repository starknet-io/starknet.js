import { isSierra, extractContractHashes } from '../../src/utils/contract';
import { compiledHelloSierra, compiledHelloSierraCasm, compiledErc20 } from '../config/fixtures';

describe('isSierra', () => {
  test('should return true for a contract in Sierra format', () => {
    expect(isSierra(compiledHelloSierra)).toBe(true);
  });

  test('should return false for a contract not in Sierra format', () => {
    expect(isSierra(compiledErc20)).toBe(false);
  });
});

describe('extractContractHashes', () => {
  test('should properly extract hashes from contract', () => {
    const declareContractPayload = {
      contract: compiledHelloSierra,
      casm: compiledHelloSierraCasm,
    };
    const result = extractContractHashes(declareContractPayload);

    expect(result).toHaveProperty(
      'classHash',
      '0x50f3c3b9bb088969310de339fd1c1da88945f5db15bd5ea0810e4d954308734'
    );
    expect(result).toHaveProperty(
      'compiledClassHash',
      '0x31c736e739e4bd35116ed6cdcbb99c94e6f4fa8268d339da23e1ca80fe1de8d'
    );
  });
});
