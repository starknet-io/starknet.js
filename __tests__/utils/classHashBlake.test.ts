import { config, hash } from '../../src';
import { CONTRACTS } from '../config/fixtures';

// Lazy load Blake2s implementations to avoid early native module loading
// Note: Native modules like @napi-rs/blake-hash will still cause Jest open handle
// warnings, but this is expected behavior and safe to ignore for this test file
let blake2s: any;
let blake2sNapi: any;

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

  describe('Custom Napi implementation Cross-validation', () => {
    beforeAll(async () => {
      const napiModule = await import('@napi-rs/blake-hash');
      blake2sNapi = napiModule.blake2s;
      config.set('blake', (uint8Array: Uint8Array) => {
        return blake2sNapi(uint8Array);
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

  describe('Performance comparison', () => {
    const iterations = 100;

    beforeAll(async () => {
      // Load both implementations for performance tests
      const blakejsModule = await import('blakejs');
      blake2s = blakejsModule.blake2s;
      const napiModule = await import('@napi-rs/blake-hash');
      blake2sNapi = napiModule.blake2s;
    });

    test('Compare speed: Default vs Custom blakejs vs Napi', () => {
      const { casm } = CONTRACTS.Blake2sVerificationContract;

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

      // Suppress unused variable warnings for timing variables
      expect(defaultTime).toBeGreaterThan(0);
      expect(blakejsTime).toBeGreaterThan(0);
      expect(napiTime).toBeGreaterThan(0);
    });

    test('Performance on complex contract (ERC20)', () => {
      const { casm } = CONTRACTS.Erc20Oz100;

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

      // Suppress unused variable warnings for timing variables
      expect(defaultTime).toBeGreaterThan(0);
      expect(blakejsTime).toBeGreaterThan(0);
      expect(napiTime).toBeGreaterThan(0);
    });
  });
});
