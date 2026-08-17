import { config, hash } from '../../src';
import { CONTRACTS } from '../config/fixtures';

// Lazy load Blake2s implementation to avoid early module loading
let blake2s: any;

describe('Blake2s Compiled Class Hash Tests', () => {
  describe('Default implementation Cross-validation with Rust', () => {
    test('Rust test_contract.casm - Blake2s hash matches expected value', () => {
      // This is the exact test contract used in the Rust sequencer tests
      // Source: /sequencer/crates/blockifier_test_utils/resources/feature_CONTRACTS/cairo1/compiled/test_contract.casm.json
      const { casm } = CONTRACTS.Blake2sVerificationContract;

      const blake2sHash = hash.computeCompiledClassHashBlake(casm);

      // Expected hash from Rust test:
      // Source: /sequencer/crates/starknet_os/src/hints/hint_implementation/compiled_class/compiled_class_test.rs:60
      // EXPECTED_V2_HASH = "2689583419938872958442025345786838859037300790815341992713990941323459178113"
      const expectedBlake2sHash =
        '0x5f24011a3e6e287472f502666e474891655b77e333524830412b0d5988e2e81';

      expect(blake2sHash).toBe(expectedBlake2sHash);
    });

    test('Rust test_contract.casm - Poseidon hash for comparison', () => {
      const { casm } = CONTRACTS.Blake2sVerificationContract;

      const poseidonHash = hash.computeCompiledClassHash(casm, '0.13.1');

      // Expected Poseidon hash from Rust test (for reference):
      // EXPECTED_V1_HASH = "2245949284953925157128824309232222003190483648336643262590914808143560524294"
      const expectedPoseidonHash =
        '0x4f7298904d21e4f3d90898687f3eae693ad915c5167068568b6c6b265c74206';

      expect(poseidonHash).toBe(expectedPoseidonHash);
    });

    test('Rust test_contract.casm - Blake2s differs from Poseidon', () => {
      const { casm } = CONTRACTS.Blake2sVerificationContract;

      const blake2sHash = hash.computeCompiledClassHashBlake(casm);
      const poseidonHash = hash.computeCompiledClassHash(casm, '0.13.1');

      expect(blake2sHash).not.toBe(poseidonHash);
    });
  });

  describe('Custom blakejs implementation Cross-validation', () => {
    beforeAll(async () => {
      const blakejsModule = await import('blakejs');
      blake2s = blakejsModule.blake2s;
      config.set('blake', (uint8Array: Uint8Array) => {
        return blake2s(uint8Array, undefined, 32);
      });
    });

    test('Rust test_contract.casm - Blake2s hash matches expected value', () => {
      // This is the exact test contract used in the Rust sequencer tests
      // Source: /sequencer/crates/blockifier_test_utils/resources/feature_CONTRACTS/cairo1/compiled/test_contract.casm.json
      const { casm } = CONTRACTS.Blake2sVerificationContract;

      const blake2sHash = hash.computeCompiledClassHashBlake(casm);

      // Expected hash from Rust test:
      // Source: /sequencer/crates/starknet_os/src/hints/hint_implementation/compiled_class/compiled_class_test.rs:60
      // EXPECTED_V2_HASH = "2689583419938872958442025345786838859037300790815341992713990941323459178113"
      const expectedBlake2sHash =
        '0x5f24011a3e6e287472f502666e474891655b77e333524830412b0d5988e2e81';

      expect(blake2sHash).toBe(expectedBlake2sHash);
    });

    test('Rust test_contract.casm - Poseidon hash for comparison', () => {
      const { casm } = CONTRACTS.Blake2sVerificationContract;

      const poseidonHash = hash.computeCompiledClassHash(casm, '0.13.1');

      // Expected Poseidon hash from Rust test (for reference):
      // EXPECTED_V1_HASH = "2245949284953925157128824309232222003190483648336643262590914808143560524294"
      const expectedPoseidonHash =
        '0x4f7298904d21e4f3d90898687f3eae693ad915c5167068568b6c6b265c74206';

      expect(poseidonHash).toBe(expectedPoseidonHash);
    });

    test('Rust test_contract.casm - Blake2s differs from Poseidon', () => {
      const { casm } = CONTRACTS.Blake2sVerificationContract;

      const blake2sHash = hash.computeCompiledClassHashBlake(casm);
      const poseidonHash = hash.computeCompiledClassHash(casm, '0.13.1');

      expect(blake2sHash).not.toBe(poseidonHash);
    });
  });

  describe('Basic functionality', () => {
    test('Hello Cairo2.6.0 - CompiledClassHash with Blake2s', () => {
      const compiledClassHash = hash.computeCompiledClassHashBlake(CONTRACTS.Hello260.casm);

      expect(compiledClassHash).toBeTruthy();
      expect(compiledClassHash).toMatch(/^0x[0-9a-f]+$/);
    });

    test('Hash Sierra - CompiledClassHash with Blake2s', () => {
      const compiledClassHash = hash.computeCompiledClassHashBlake(CONTRACTS.Hash.casm);

      expect(compiledClassHash).toBeTruthy();
      expect(compiledClassHash).toMatch(/^0x[0-9a-f]+$/);
    });

    test('Complex Sierra - CompiledClassHash with Blake2s', () => {
      const compiledClassHash = hash.computeCompiledClassHashBlake(CONTRACTS.Erc20Oz100.casm);

      expect(compiledClassHash).toBeTruthy();
      expect(compiledClassHash).toMatch(/^0x[0-9a-f]+$/);
    });
  });

  describe('Entry point handling', () => {
    test('Contract with constructor', () => {
      const compiledClassHash = hash.computeCompiledClassHashBlake(CONTRACTS.Erc20Oz100.casm);

      expect(compiledClassHash).toBeTruthy();
      expect(compiledClassHash).toMatch(/^0x[0-9a-f]+$/);
    });

    test('Contract without constructor (only constructor)', () => {
      const compiledClassHash = hash.computeCompiledClassHashBlake(CONTRACTS.OnlyConstructor.casm);

      expect(compiledClassHash).toBeTruthy();
      expect(compiledClassHash).toMatch(/^0x[0-9a-f]+$/);
    });
  });

  describe('Bytecode segment handling', () => {
    test('Contract with bytecode segments (Cairo 2.6.0+)', () => {
      const { casm } = CONTRACTS.Hello260;

      // Verify it has bytecode segments
      expect(casm.bytecode_segment_lengths).toBeDefined();

      const compiledClassHash = hash.computeCompiledClassHashBlake(casm);

      expect(compiledClassHash).toBeTruthy();
      expect(compiledClassHash).toMatch(/^0x[0-9a-f]+$/);
    });

    test('Contract without bytecode segments (older Cairo)', () => {
      const { casm } = CONTRACTS.Hash;

      const compiledClassHash = hash.computeCompiledClassHashBlake(casm);

      expect(compiledClassHash).toBeTruthy();
      expect(compiledClassHash).toMatch(/^0x[0-9a-f]+$/);
    });
  });

  describe('Different from Poseidon hash', () => {
    test('Blake2s hash should differ from Poseidon hash', () => {
      const blake2sHash = hash.computeCompiledClassHashBlake(CONTRACTS.Hello260.casm);
      const poseidonHash = hash.computeCompiledClassHash(CONTRACTS.Hello260.casm, '0.13.1');

      // They should be different
      expect(blake2sHash).not.toEqual(poseidonHash);
    });
  });
});
