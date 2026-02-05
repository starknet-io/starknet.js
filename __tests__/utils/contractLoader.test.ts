import path from 'path';
import { contractLoader } from '../../src/utils/contract';

describe('contractLoader', () => {
  const mocksBase = path.resolve(__dirname, '../../__mocks__');
  const mockDir = path.join(mocksBase, 'cairo/cairo210');
  const sierraFile = path.join(mockDir, 'cairo210.sierra.json');
  const casmFile = path.join(mockDir, 'cairo210.casm');

  describe('Loading from directory', () => {
    test('should load both sierra and casm from directory', () => {
      const contract = contractLoader(mockDir);

      expect(contract).toBeDefined();
      expect(contract.casm).toBeDefined();
      expect(contract.sierra).toBeDefined();
      expect(contract.compiler).toBe('2.1.0');
    });
  });

  describe('Loading from sierra file', () => {
    test('should load sierra and find casm in same directory', () => {
      const contract = contractLoader(sierraFile);

      expect(contract).toBeDefined();
      expect(contract.casm).toBeDefined();
      expect(contract.sierra).toBeDefined();
      expect(contract.compiler).toBe('2.1.0');
    });
  });

  describe('Loading from casm file', () => {
    test('should load casm and find sierra in same directory', () => {
      const contract = contractLoader(casmFile);

      expect(contract).toBeDefined();
      expect(contract.casm).toBeDefined();
      expect(contract.sierra).toBeDefined();
      expect(contract.compiler).toBe('2.1.0');
    });
  });

  describe('Error handling', () => {
    test('should throw error if no sierra file found', () => {
      // Try to load a casm-only file (blake2s) which should fail
      const casmOnlyFile = path.join(mocksBase, 'cairo/blake2s_verification_contract.casm');

      expect(() => contractLoader(casmOnlyFile)).toThrow('No .sierra.json file found');
    });
  });

  describe('Sierra-only contracts', () => {
    test('should throw error if no casm file and no compiledClassHash', () => {
      // Use complexInput which has only sierra file
      const sierraOnlyDir = path.join(mocksBase, 'cairo/complexInput');

      expect(() => contractLoader(sierraOnlyDir)).toThrow(
        'No .casm file found for complex_sierra.sierra.json and no compiledClassHash provided'
      );
    });

    test('should return sierra with compiledClassHash when casm does not exist', () => {
      // Use complexInput which has only sierra file
      const sierraOnlyDir = path.join(mocksBase, 'cairo/complexInput');
      const mockCompiledClassHash = '0x1234567890abcdef';
      const contract = contractLoader(sierraOnlyDir, mockCompiledClassHash);

      expect(contract).toBeDefined();
      expect(contract.sierra).toBeDefined();
      expect(contract.casm).toBeUndefined();
      expect(contract.compiler).toBeUndefined();
      expect(contract.compiledClassHash).toBe(mockCompiledClassHash);
    });
  });

  describe('Integration with Contract class and declare', () => {
    test('loaded contract should have correct structure for Contract and declare', () => {
      // Load contract using contractLoader
      const loadedContract = contractLoader(mockDir);

      // Verify the contract has correct structure for declare/deploy
      expect(loadedContract.sierra).toBeDefined();
      expect(loadedContract.casm).toBeDefined();

      // Verify sierra has required properties for Contract class
      expect(loadedContract.sierra.abi).toBeDefined();
      expect(Array.isArray(loadedContract.sierra.abi)).toBe(true);
      expect('sierra_program' in loadedContract.sierra).toBe(true);

      // Verify casm has required properties for declare
      expect('bytecode' in loadedContract.casm!).toBe(true);
      expect('compiler_version' in loadedContract.casm!).toBe(true);

      // Verify compiler version is extracted
      expect(loadedContract.compiler).toBe('2.1.0');
      // Note: compiler_version exists on CompiledSierraCasm but not on LegacyContractClass
      if (loadedContract.casm && 'compiler_version' in loadedContract.casm) {
        expect(loadedContract.compiler).toBe(loadedContract.casm.compiler_version);
      }

      // Verify the loaded contract structure matches what declareAndDeploy expects
      // This validates that contractLoader returns properly parsed contracts with correct types
      const declarePayload = {
        contract: loadedContract.sierra,
        casm: loadedContract.casm,
      };

      expect(declarePayload.contract).toBeDefined();
      expect(declarePayload.contract.abi).toBeDefined();
      expect(declarePayload.casm).toBeDefined();

      // Verify ABI is properly parsed (not just a string)
      expect(typeof declarePayload.contract.abi).toBe('object');
      expect(Array.isArray(declarePayload.contract.abi)).toBe(true);
    });
  });
});
