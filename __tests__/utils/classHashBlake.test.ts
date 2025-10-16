import { blake2s } from 'blakejs';
import { blake2s as blake2sNapi } from '@napi-rs/blake-hash';
import { config, hash } from '../../src';
import { contracts } from '../config/fixtures';

// Helper to print without Jest annotations
const print = (message: string) => process.stdout.write(`${message}\n`);

describe('Blake2s Compiled Class Hash Tests', () => {
  describe('Default implementation Cross-validation with Rust', () => {
    test('Rust test_contract.casm - Blake2s hash matches expected value', () => {
      // This is the exact test contract used in the Rust sequencer tests
      // Source: /sequencer/crates/blockifier_test_utils/resources/feature_contracts/cairo1/compiled/test_contract.casm.json
      const { casm } = contracts.Blake2sVerificationContract;

      const blake2sHash = hash.computeCompiledClassHashBlake(casm);

      // Expected hash from Rust test:
      // Source: /sequencer/crates/starknet_os/src/hints/hint_implementation/compiled_class/compiled_class_test.rs:60
      // EXPECTED_V2_HASH = "2689583419938872958442025345786838859037300790815341992713990941323459178113"
      const expectedBlake2sHash =
        '0x5f24011a3e6e287472f502666e474891655b77e333524830412b0d5988e2e81';

      expect(blake2sHash).toBe(expectedBlake2sHash);
    });

    test('Rust test_contract.casm - Poseidon hash for comparison', () => {
      const { casm } = contracts.Blake2sVerificationContract;

      const poseidonHash = hash.computeCompiledClassHash(casm);

      // Expected Poseidon hash from Rust test (for reference):
      // EXPECTED_V1_HASH = "2245949284953925157128824309232222003190483648336643262590914808143560524294"
      const expectedPoseidonHash =
        '0x4f7298904d21e4f3d90898687f3eae693ad915c5167068568b6c6b265c74206';

      expect(poseidonHash).toBe(expectedPoseidonHash);
    });

    test('Rust test_contract.casm - Blake2s differs from Poseidon', () => {
      const { casm } = contracts.Blake2sVerificationContract;

      const blake2sHash = hash.computeCompiledClassHashBlake(casm);
      const poseidonHash = hash.computeCompiledClassHash(casm);

      expect(blake2sHash).not.toBe(poseidonHash);
    });
  });

  describe('Custom blakejs implementation Cross-validation', () => {
    config.set('blake', (uint8Array: Uint8Array) => {
      return blake2s(uint8Array, undefined, 32);
    });
    test('Rust test_contract.casm - Blake2s hash matches expected value', () => {
      // This is the exact test contract used in the Rust sequencer tests
      // Source: /sequencer/crates/blockifier_test_utils/resources/feature_contracts/cairo1/compiled/test_contract.casm.json
      const { casm } = contracts.Blake2sVerificationContract;

      const blake2sHash = hash.computeCompiledClassHashBlake(casm);

      // Expected hash from Rust test:
      // Source: /sequencer/crates/starknet_os/src/hints/hint_implementation/compiled_class/compiled_class_test.rs:60
      // EXPECTED_V2_HASH = "2689583419938872958442025345786838859037300790815341992713990941323459178113"
      const expectedBlake2sHash =
        '0x5f24011a3e6e287472f502666e474891655b77e333524830412b0d5988e2e81';

      expect(blake2sHash).toBe(expectedBlake2sHash);
    });

    test('Rust test_contract.casm - Poseidon hash for comparison', () => {
      const { casm } = contracts.Blake2sVerificationContract;

      const poseidonHash = hash.computeCompiledClassHash(casm);

      // Expected Poseidon hash from Rust test (for reference):
      // EXPECTED_V1_HASH = "2245949284953925157128824309232222003190483648336643262590914808143560524294"
      const expectedPoseidonHash =
        '0x4f7298904d21e4f3d90898687f3eae693ad915c5167068568b6c6b265c74206';

      expect(poseidonHash).toBe(expectedPoseidonHash);
    });

    test('Rust test_contract.casm - Blake2s differs from Poseidon', () => {
      const { casm } = contracts.Blake2sVerificationContract;

      const blake2sHash = hash.computeCompiledClassHashBlake(casm);
      const poseidonHash = hash.computeCompiledClassHash(casm);

      expect(blake2sHash).not.toBe(poseidonHash);
    });
  });

  describe('Custom Napi implementation Cross-validation', () => {
    config.set('blake', (uint8Array: Uint8Array) => {
      return blake2sNapi(uint8Array);
    });
    test('Rust test_contract.casm - Blake2s hash matches expected value', () => {
      // This is the exact test contract used in the Rust sequencer tests
      // Source: /sequencer/crates/blockifier_test_utils/resources/feature_contracts/cairo1/compiled/test_contract.casm.json
      const { casm } = contracts.Blake2sVerificationContract;

      const blake2sHash = hash.computeCompiledClassHashBlake(casm);

      // Expected hash from Rust test:
      // Source: /sequencer/crates/starknet_os/src/hints/hint_implementation/compiled_class/compiled_class_test.rs:60
      // EXPECTED_V2_HASH = "2689583419938872958442025345786838859037300790815341992713990941323459178113"
      const expectedBlake2sHash =
        '0x5f24011a3e6e287472f502666e474891655b77e333524830412b0d5988e2e81';

      expect(blake2sHash).toBe(expectedBlake2sHash);
    });

    test('Rust test_contract.casm - Poseidon hash for comparison', () => {
      const { casm } = contracts.Blake2sVerificationContract;

      const poseidonHash = hash.computeCompiledClassHash(casm);

      // Expected Poseidon hash from Rust test (for reference):
      // EXPECTED_V1_HASH = "2245949284953925157128824309232222003190483648336643262590914808143560524294"
      const expectedPoseidonHash =
        '0x4f7298904d21e4f3d90898687f3eae693ad915c5167068568b6c6b265c74206';

      expect(poseidonHash).toBe(expectedPoseidonHash);
    });

    test('Rust test_contract.casm - Blake2s differs from Poseidon', () => {
      const { casm } = contracts.Blake2sVerificationContract;

      const blake2sHash = hash.computeCompiledClassHashBlake(casm);
      const poseidonHash = hash.computeCompiledClassHash(casm);

      expect(blake2sHash).not.toBe(poseidonHash);
    });
  });

  describe('Basic functionality', () => {
    test('Hello Cairo2.6.0 - CompiledClassHash with Blake2s', () => {
      const compiledClassHash = hash.computeCompiledClassHashBlake(contracts.C260.casm);

      // This will initially show the computed value for verification
      print(`Blake2s hash: ${compiledClassHash}`);

      expect(compiledClassHash).toBeTruthy();
      expect(compiledClassHash).toMatch(/^0x[0-9a-f]+$/);
    });

    test('Hash Sierra - CompiledClassHash with Blake2s', () => {
      const compiledClassHash = hash.computeCompiledClassHashBlake(contracts.HashSierra.casm);

      print(`Hash Sierra Blake2s hash: ${compiledClassHash}`);

      expect(compiledClassHash).toBeTruthy();
      expect(compiledClassHash).toMatch(/^0x[0-9a-f]+$/);
    });

    test('Complex Sierra - CompiledClassHash with Blake2s', () => {
      const compiledClassHash = hash.computeCompiledClassHashBlake(contracts.Erc20OZ.casm);

      print(`Erc20OZ Blake2s hash: ${compiledClassHash}`);

      expect(compiledClassHash).toBeTruthy();
      expect(compiledClassHash).toMatch(/^0x[0-9a-f]+$/);
    });
  });

  describe('Entry point handling', () => {
    test('Contract with constructor', () => {
      const compiledClassHash = hash.computeCompiledClassHashBlake(contracts.Erc20OZ.casm);

      expect(compiledClassHash).toBeTruthy();
      expect(compiledClassHash).toMatch(/^0x[0-9a-f]+$/);
    });

    test('Contract without constructor (only constructor)', () => {
      const compiledClassHash = hash.computeCompiledClassHashBlake(contracts.OnlyConstructor.casm);

      print(`OnlyConstructor Blake2s hash: ${compiledClassHash}`);

      expect(compiledClassHash).toBeTruthy();
      expect(compiledClassHash).toMatch(/^0x[0-9a-f]+$/);
    });
  });

  describe('Bytecode segment handling', () => {
    test('Contract with bytecode segments (Cairo 2.6.0+)', () => {
      const { casm } = contracts.C260;

      // Verify it has bytecode segments
      expect(casm.bytecode_segment_lengths).toBeDefined();

      const compiledClassHash = hash.computeCompiledClassHashBlake(casm);

      expect(compiledClassHash).toBeTruthy();
      expect(compiledClassHash).toMatch(/^0x[0-9a-f]+$/);
    });

    test('Contract without bytecode segments (older Cairo)', () => {
      const { casm } = contracts.HashSierra;

      // Check if it doesn't have bytecode segments
      const hasSegments = casm.bytecode_segment_lengths !== undefined;
      print(`HashSierra has bytecode segments: ${hasSegments}`);

      const compiledClassHash = hash.computeCompiledClassHashBlake(casm);

      expect(compiledClassHash).toBeTruthy();
      expect(compiledClassHash).toMatch(/^0x[0-9a-f]+$/);
    });
  });

  describe('Different from Poseidon hash', () => {
    test('Blake2s hash should differ from Poseidon hash', () => {
      const blake2sHash = hash.computeCompiledClassHashBlake(contracts.C260.casm);
      const poseidonHash = hash.computeCompiledClassHash(contracts.C260.casm);

      print(`Blake2s: ${blake2sHash}`);
      print(`Poseidon: ${poseidonHash}`);

      // They should be different
      expect(blake2sHash).not.toEqual(poseidonHash);
    });
  });

  describe('Performance comparison', () => {
    const iterations = 100;

    test('Compare speed: Default vs Custom blakejs vs Napi', () => {
      const { casm } = contracts.Blake2sVerificationContract;

      print(`\n${'='.repeat(60)}`);
      print('Blake2s Implementation Performance Comparison');
      print(`Running ${iterations} iterations on test contract`);
      print('='.repeat(60));

      // Test 1: Default implementation
      config.set('blake', undefined);
      const defaultStart = performance.now();
      for (let i = 0; i < iterations; i += 1) {
        hash.computeCompiledClassHashBlake(casm);
      }
      const defaultEnd = performance.now();
      const defaultTime = defaultEnd - defaultStart;

      // Test 2: Custom blakejs implementation
      config.set('blake', (uint8Array: Uint8Array) => {
        return blake2s(uint8Array, undefined, 32);
      });
      const blakejsStart = performance.now();
      for (let i = 0; i < iterations; i += 1) {
        hash.computeCompiledClassHashBlake(casm);
      }
      const blakejsEnd = performance.now();
      const blakejsTime = blakejsEnd - blakejsStart;

      // Test 3: Napi implementation
      config.set('blake', (uint8Array: Uint8Array) => {
        return blake2sNapi(uint8Array);
      });
      const napiStart = performance.now();
      for (let i = 0; i < iterations; i += 1) {
        hash.computeCompiledClassHashBlake(casm);
      }
      const napiEnd = performance.now();
      const napiTime = napiEnd - napiStart;

      // Reset to default
      config.set('blake', undefined);

      // Calculate statistics
      const fastest = Math.min(defaultTime, blakejsTime, napiTime);
      const defaultSpeedup = (defaultTime / fastest).toFixed(2);
      const blakejsSpeedup = (blakejsTime / fastest).toFixed(2);
      const napiSpeedup = (napiTime / fastest).toFixed(2);

      print('\nResults:');
      print(`  Default:       ${defaultTime.toFixed(2)}ms (${defaultSpeedup}x)`);
      print(`  Custom blakejs: ${blakejsTime.toFixed(2)}ms (${blakejsSpeedup}x)`);
      print(`  Napi:          ${napiTime.toFixed(2)}ms (${napiSpeedup}x)`);
      print('\nAverage per iteration:');
      print(`  Default:       ${(defaultTime / iterations).toFixed(3)}ms`);
      print(`  Custom blakejs: ${(blakejsTime / iterations).toFixed(3)}ms`);
      print(`  Napi:          ${(napiTime / iterations).toFixed(3)}ms`);
      print('='.repeat(60));

      // Verify all implementations produce the same result
      config.set('blake', undefined);
      const defaultHash = hash.computeCompiledClassHashBlake(casm);
      config.set('blake', (uint8Array: Uint8Array) => blake2s(uint8Array, undefined, 32));
      const blakejsHash = hash.computeCompiledClassHashBlake(casm);
      config.set('blake', (uint8Array: Uint8Array) => blake2sNapi(uint8Array));
      const napiHash = hash.computeCompiledClassHashBlake(casm);
      config.set('blake', undefined);

      expect(defaultHash).toBe(blakejsHash);
      expect(defaultHash).toBe(napiHash);
      expect(defaultHash).toBe('0x5f24011a3e6e287472f502666e474891655b77e333524830412b0d5988e2e81');
    });

    test('Performance on complex contract (ERC20)', () => {
      const { casm } = contracts.Erc20OZ;

      print(`\n${'='.repeat(60)}`);
      print('Complex Contract (ERC20) Performance Comparison');
      print(`Running ${iterations} iterations on ERC20 contract`);
      print('='.repeat(60));

      // Test 1: Default implementation
      config.set('blake', undefined);
      const defaultStart = performance.now();
      for (let i = 0; i < iterations; i += 1) {
        hash.computeCompiledClassHashBlake(casm);
      }
      const defaultEnd = performance.now();
      const defaultTime = defaultEnd - defaultStart;

      // Test 2: Custom blakejs implementation
      config.set('blake', (uint8Array: Uint8Array) => {
        return blake2s(uint8Array, undefined, 32);
      });
      const blakejsStart = performance.now();
      for (let i = 0; i < iterations; i += 1) {
        hash.computeCompiledClassHashBlake(casm);
      }
      const blakejsEnd = performance.now();
      const blakejsTime = blakejsEnd - blakejsStart;

      // Test 3: Napi implementation
      config.set('blake', (uint8Array: Uint8Array) => {
        return blake2sNapi(uint8Array);
      });
      const napiStart = performance.now();
      for (let i = 0; i < iterations; i += 1) {
        hash.computeCompiledClassHashBlake(casm);
      }
      const napiEnd = performance.now();
      const napiTime = napiEnd - napiStart;

      // Reset to default
      config.set('blake', undefined);

      // Calculate statistics
      const fastest = Math.min(defaultTime, blakejsTime, napiTime);
      const defaultSpeedup = (defaultTime / fastest).toFixed(2);
      const blakejsSpeedup = (blakejsTime / fastest).toFixed(2);
      const napiSpeedup = (napiTime / fastest).toFixed(2);

      print('\nResults:');
      print(`  Default:       ${defaultTime.toFixed(2)}ms (${defaultSpeedup}x)`);
      print(`  Custom blakejs: ${blakejsTime.toFixed(2)}ms (${blakejsSpeedup}x)`);
      print(`  Napi:          ${napiTime.toFixed(2)}ms (${napiSpeedup}x)`);
      print('\nAverage per iteration:');
      print(`  Default:       ${(defaultTime / iterations).toFixed(3)}ms`);
      print(`  Custom blakejs: ${(blakejsTime / iterations).toFixed(3)}ms`);
      print(`  Napi:          ${(napiTime / iterations).toFixed(3)}ms`);
      print('='.repeat(60));

      // Verify all implementations produce the same result
      config.set('blake', undefined);
      const defaultHash = hash.computeCompiledClassHashBlake(casm);
      config.set('blake', (uint8Array: Uint8Array) => blake2s(uint8Array, undefined, 32));
      const blakejsHash = hash.computeCompiledClassHashBlake(casm);
      config.set('blake', (uint8Array: Uint8Array) => blake2sNapi(uint8Array));
      const napiHash = hash.computeCompiledClassHashBlake(casm);
      config.set('blake', undefined);

      expect(defaultHash).toBe(blakejsHash);
      expect(defaultHash).toBe(napiHash);
    });
  });
});
