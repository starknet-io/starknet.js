import { poseidonHashMany } from '@scure/starknet';

import { constants, hash, v3hash } from '../../src';
import { EDAMode } from '../../src/types/api';
import { toHex } from '../../src/utils/num';

describe('TxV3 Invoke proofFacts Hash Tests', () => {
  const baseArgs = {
    senderAddress: '0x12fd538',
    version: '0x3' as const,
    compiledCalldata: ['0x11', '0x26'],
    chainId: constants.StarknetChainId.SN_SEPOLIA,
    nonce: 9,
    accountDeploymentData: [],
    nonceDataAvailabilityMode: EDAMode.L1,
    feeDataAvailabilityMode: EDAMode.L1,
    resourceBounds: {
      l2_gas: { max_amount: 0n, max_price_per_unit: 0n },
      l1_gas: { max_amount: 0x7c9n, max_price_per_unit: 1n },
      l1_data_gas: { max_amount: 0n, max_price_per_unit: 0n },
    },
    tip: 0n,
    paymasterData: [],
  };

  test('empty proofFacts produces the same hash as omitted proofFacts', () => {
    const hashWithoutProof = hash.calculateInvokeTransactionHash(baseArgs);
    const hashWithEmptyProof = hash.calculateInvokeTransactionHash({
      ...baseArgs,
      proofFacts: [],
    });
    expect(hashWithEmptyProof).toBe(hashWithoutProof);
  });

  test('non-empty proofFacts changes the hash', () => {
    const hashWithoutProof = hash.calculateInvokeTransactionHash(baseArgs);
    const hashWithProof = hash.calculateInvokeTransactionHash({
      ...baseArgs,
      proofFacts: ['0x1', '0x2'],
    });
    expect(hashWithProof).not.toBe(hashWithoutProof);
  });

  test('proofFacts order matters for the hash', () => {
    const hashWithProof1 = hash.calculateInvokeTransactionHash({
      ...baseArgs,
      proofFacts: ['0x1', '0x2'],
    });
    const hashWithProof2 = hash.calculateInvokeTransactionHash({
      ...baseArgs,
      proofFacts: ['0x2', '0x1'],
    });
    expect(hashWithProof2).not.toBe(hashWithProof1);
  });

  test('proofFacts are hashed as one additional poseidon element', () => {
    const result = hash.calculateInvokeTransactionHash({
      ...baseArgs,
      proofFacts: ['0x1', '0x2'],
    });

    const expected = v3hash.calculateTransactionHashCommon(
      constants.TransactionHashPrefix.INVOKE,
      baseArgs.version,
      baseArgs.senderAddress,
      baseArgs.chainId,
      baseArgs.nonce,
      baseArgs.tip,
      baseArgs.paymasterData,
      baseArgs.nonceDataAvailabilityMode,
      baseArgs.feeDataAvailabilityMode,
      baseArgs.resourceBounds,
      [poseidonHashMany([]), poseidonHashMany([0x11n, 0x26n]), poseidonHashMany([0x1n, 0x2n])]
    );

    expect(result).toBe(expected);
  });
});

describe('TxV3 hashFeeFieldV3B3 — blockifier test vectors', () => {
  test('should throw error when l1_data_gas is not provided', () => {
    expect(() => {
      v3hash.hashFeeFieldV3B3(0n, {
        l1_gas: { max_amount: 0x1000n, max_price_per_unit: 0x2000n },
        l2_gas: { max_amount: 0n, max_price_per_unit: 0n },
      } as any);
    }).toThrow();
  });

  test('should match blockifier test vector 2 (AllResources Variant)', () => {
    const result = v3hash.hashFeeFieldV3B3(0n, {
      l1_gas: { max_amount: 0x1000n, max_price_per_unit: 0x2000n },
      l2_gas: { max_amount: 0x3000n, max_price_per_unit: 0x4000n },
      l1_data_gas: { max_amount: 0x5000n, max_price_per_unit: 0x6000n },
    });
    expect(toHex(result)).toBe('0x3d848944220686a0d567e2a3895f3651ad616d4eccb473a03a93150c40b5e13');
  });

  test('should match blockifier test vector 3 (AllResources with Zero l1_data_gas)', () => {
    const result = v3hash.hashFeeFieldV3B3(0n, {
      l1_gas: { max_amount: 0x1000n, max_price_per_unit: 0x2000n },
      l2_gas: { max_amount: 0x3000n, max_price_per_unit: 0x4000n },
      l1_data_gas: { max_amount: 0n, max_price_per_unit: 0n },
    });
    expect(toHex(result)).toBe('0x6916420cf10b91926a408900e0e8f5548bbd3baccb11b2e0ad1a58246b0ffe0');
  });
});

describe('TxV3 hashDAMode', () => {
  test('DaMode', () => {
    const result = v3hash.hashDAMode(EDAMode.L1, EDAMode.L1);
    expect(result.toString(16)).toBe('0');

    const result1 = v3hash.hashDAMode(EDAMode.L1, EDAMode.L2);
    expect(result1.toString(16)).toBe('1');

    const result2 = v3hash.hashDAMode(EDAMode.L2, EDAMode.L1);
    expect(result2.toString(16)).toBe('100000000');

    const result3 = v3hash.hashDAMode(EDAMode.L2, EDAMode.L2);
    expect(result3.toString(16)).toBe('100000001');
  });
});

// Every expected hash below comes from outside this SDK: three Sepolia transactions, whose hash
// the sequencer computed and which starknet_getTransactionByHash returns again, and one fixture
// from the Starkware sequencer repository.
describe('TxV3 transaction hash — sequencer test vectors', () => {
  test('invoke matches Sepolia transaction from block 15616497', () => {
    const result = hash.calculateInvokeTransactionHash({
      senderAddress: '0x77dfdc45ba4695eac4c961f3d9bf820ed7e925a44d9963de7b7a0daf8768af0',
      version: '0x3',
      compiledCalldata: [
        '0x2',
        '0x248cf60e8ef4895e30dd49801c993ae6271cc52f5207da46c9d81d34f02c029',
        '0x3c06b1ab163ddde6495ff43fed0ed7a913edc2b078bc89d460f235b09f950e8',
        '0x0',
        '0x248cf60e8ef4895e30dd49801c993ae6271cc52f5207da46c9d81d34f02c029',
        '0x5df99ae77df976b4f0e5cf28c7dcfe09bd6e81aab787b19ac0c08e03d928cf',
        '0x1',
        '0x1d0',
      ],
      chainId: constants.StarknetChainId.SN_SEPOLIA,
      nonce: '0x14c1aa',
      accountDeploymentData: [],
      nonceDataAvailabilityMode: EDAMode.L1,
      feeDataAvailabilityMode: EDAMode.L1,
      resourceBounds: {
        l1_gas: { max_amount: 0x11170n, max_price_per_unit: 0x8d79883d20000n },
        l2_gas: { max_amount: 0x5f5e100n, max_price_per_unit: 0xba43b7400n },
        l1_data_gas: { max_amount: 0x2710n, max_price_per_unit: 0x62448724953354n },
      },
      tip: '0x5f5e100',
      paymasterData: [],
    });

    expect(result).toBe('0x381be3aec32afcfe7bbc6c62b7b5050d136424cac29a74022de5385bf4acf7c');
  });

  test('invoke with proofFacts matches the Starkware reexecution fixture', () => {
    // starkware-libs/sequencer, crates/blockifier_reexecution/resources/raw_rpc_json_objects/
    // transactions.json, key invoke_v3_with_proof_facts — hashed with the mainnet chain id
    const result = hash.calculateInvokeTransactionHash({
      senderAddress: '0x51258c78dba24ee15c3aed60fb6fbbfb91a7cb2f739c82e39871847823aa410',
      version: '0x3',
      compiledCalldata: [
        '0x1',
        '0x40337b1af3c663e86e333bab5a4b28da8d4652a15a69beee2b677776ffe812a',
        '0x246333a752c1ac637ff1591c5c885e27d56060d241a29aad8475072da0777db',
        '0x11',
        '0x3',
        '0x0',
        '0x3281798780c9e6efc0ee82884b785d68842631b3f2803619bf7507d6065f4fb',
        '0x1',
        '0x30b5bc96ceb941beb82123f24621c4973884cb60a7679cc4a1ed633cca491ce',
        '0x0',
        '0x419f54c4dbeda02c50bee99eebbc316821ed92e3cc53ac41d18a5852c8c31b1',
        '0x3',
        '0x1eed60b8d483b3bede62d1cc0f32874aea30747e6943437c858359b41801bf7',
        '0x579a974f400c4f6a633117462be5470f01ccffb6ad70448bc3cd649097ea73f',
        '0x6669cc2d160a654555944c71584d9058265b6e8a686f497f43bddab8a2592d3',
        '0x4',
        '0x51258c78dba24ee15c3aed60fb6fbbfb91a7cb2f739c82e39871847823aa410',
        '0x30b5bc96ceb941beb82123f24621c4973884cb60a7679cc4a1ed633cca491ce',
        '0x1eed60b8d483b3bede62d1cc0f32874aea30747e6943437c858359b41801bf7',
        '0x579a974f400c4f6a633117462be5470f01ccffb6ad70448bc3cd649097ea73f',
        '0x6669cc2d160a654555944c71584d9058265b6e8a686f497f43bddab8a2592d3',
      ],
      chainId: constants.StarknetChainId.SN_MAIN,
      nonce: '0x2',
      accountDeploymentData: [],
      nonceDataAvailabilityMode: EDAMode.L1,
      feeDataAvailabilityMode: EDAMode.L1,
      resourceBounds: {
        l1_gas: { max_amount: 0n, max_price_per_unit: 0x816b7355ba6fn },
        l2_gas: { max_amount: 0x700c740n, max_price_per_unit: 0x861c46800n },
        l1_data_gas: { max_amount: 0x360n, max_price_per_unit: 0x4c0e358c66n },
      },
      tip: '0x0',
      paymasterData: [],
      proofFacts: [
        '0x50524f4f4630',
        '0x5649525455414c5f534e4f53',
        '0x3e98c2d7703b03a7edb73ed7f075f97f1dcbaa8f717cdf6e1a57bf058265473',
        '0x5649525455414c5f534e4f5330',
        '0x89ae2e',
        '0x397ebc55c4146288c6abca9bec8d3b3cc308ba73ac4ddac1fb6f8605d603d9c',
        '0x70c7b342f93155315d1cb2da7a4e13a3c2430f51fb5696c1b224c3da5508dfb',
        '0x1',
        '0xbc200cc5fc8d6d0b0d7331c76d3416a75f4a527b24dae1a80c60329a54e347',
      ],
    });

    expect(result).toBe('0x3f600e8af3f94178298d7f56a396b81a8083db1b2cc0f16eaa09f5d79221730');
  });

  test('declare matches Sepolia transaction from block 15616673', () => {
    const result = hash.calculateDeclareTransactionHash({
      classHash: '0x7ed4eda23a0d7309967487acbfc7fffc84821366895dea6114aa68000c818a8',
      compiledClassHash: '0x40547df7390fa6dd0955a25bc6a779d4116a1e1371b26db22c5b2a7a1ffbf19',
      senderAddress: '0x475b12c58fe3e0543f947998babd3ad1e913750466ba7c525322a5d1c56e4a7',
      version: '0x3',
      chainId: constants.StarknetChainId.SN_SEPOLIA,
      nonce: '0xd5',
      accountDeploymentData: [],
      nonceDataAvailabilityMode: EDAMode.L1,
      feeDataAvailabilityMode: EDAMode.L1,
      resourceBounds: {
        l1_gas: { max_amount: 0n, max_price_per_unit: 0xb7530345df55n },
        l2_gas: { max_amount: 0x1d2739a0n, max_price_per_unit: 0x77b7a5b8fn },
        l1_data_gas: { max_amount: 0x120n, max_price_per_unit: 0x15cf21f3954n },
      },
      tip: '0x0',
      paymasterData: [],
    });

    expect(result).toBe('0x16de62b01042d202177c320cbafafc6b1adcf37ca18a9ce5a212fac3980ae43');
  });

  test('deploy account matches Sepolia transaction from block 15617429', () => {
    const result = hash.calculateDeployAccountTransactionHash({
      // not part of the transaction itself: read from its receipt
      contractAddress: '0x21b2f3b6f4f707a5630ef1476549951bd7ed401c921580c5b3bb4bd945cd062',
      classHash: '0x6e150953b26271a740bf2b6e9bca17cc52c68d765f761295de51ceb8526ee72',
      compiledConstructorCalldata: [
        '0x1',
        '0x2',
        '0x75bde96776c18004db282868166cb249278738af82f536b645a796741f4fcb2',
        '0x9db5d788e62a61c4144ca2c6594434def70200dc38ed4708e10d65f7d5efa',
      ],
      salt: '0x75bde96776c18004db282868166cb249278738af82f536b645a796741f4fcb2',
      version: '0x3',
      chainId: constants.StarknetChainId.SN_SEPOLIA,
      nonce: '0x0',
      nonceDataAvailabilityMode: EDAMode.L1,
      feeDataAvailabilityMode: EDAMode.L1,
      resourceBounds: {
        l1_gas: { max_amount: 0n, max_price_per_unit: 0x18c24e65c6dfen },
        l2_gas: { max_amount: 0x79a707n, max_price_per_unit: 0x1026d6ed66n },
        l1_data_gas: { max_amount: 0x5a7n, max_price_per_unit: 0x281c7ca653cn },
      },
      tip: '0x0',
      paymasterData: [],
    });

    expect(result).toBe('0x761a414cb50fecb10f8fac3ccc6f8e38e827a23831ea54e71e765ac4e7f2d78');
  });
});
