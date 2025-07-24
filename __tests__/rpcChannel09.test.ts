import { LibraryError, RPC09, RpcError } from '../src';
import { createBlockForDevnet } from './config/fixtures';
import { createTestProvider } from './config/fixturesInit';
import { initializeMatcher } from './config/schema';

// Force RPC 0.9.0 for testing purposes (bypasses auto-detection)
const originalRpcSpecVersion = process.env.RPC_SPEC_VERSION;
const describeIfRpc09ForTesting =
  process.env.FORCE_RPC09_TESTS === 'true' ? describe : describe.skip;

describeIfRpc09ForTesting('UNIT TEST: RPC 0.9.0 Channel', () => {
  let nodeUrl: string;
  let channel09: RPC09.RpcChannel;
  initializeMatcher(expect);

  beforeAll(async () => {
    // Temporarily set RPC_SPEC_VERSION to 0.9.0 for these tests
    process.env.RPC_SPEC_VERSION = '0.9.0';

    nodeUrl = (await createTestProvider(false)).channel.nodeUrl;
    channel09 = new RPC09.RpcChannel({ nodeUrl });

    await createBlockForDevnet();
  });

  afterAll(() => {
    // Restore original RPC_SPEC_VERSION
    if (originalRpcSpecVersion) {
      process.env.RPC_SPEC_VERSION = originalRpcSpecVersion;
    } else {
      delete process.env.RPC_SPEC_VERSION;
    }
  });

  test('baseFetch override', async () => {
    const baseFetch = jest.fn();
    const fetchChannel09 = new RPC09.RpcChannel({ nodeUrl, baseFetch });
    (fetchChannel09.fetch as any)();
    expect(baseFetch).toHaveBeenCalledTimes(1);
    baseFetch.mockClear();
  });

  test('RPC error handling', async () => {
    const fetchSpy = jest.spyOn(channel09, 'fetch');
    fetchSpy.mockResolvedValue({
      json: async () => ({
        jsonrpc: '2.0',
        error: {
          code: 24,
          message: 'Block not found',
        },
        id: 0,
      }),
    } as any);

    expect.assertions(3);
    try {
      // @ts-expect-error
      await channel09.fetchEndpoint('starknet_chainId');
    } catch (error) {
      expect(error).toBeInstanceOf(LibraryError);
      expect(error).toBeInstanceOf(RpcError);
      expect((error as RpcError).isType('BLOCK_NOT_FOUND')).toBe(true);
    }
    fetchSpy.mockRestore();
  });

  describe('RPC 0.9.0 specific methods', () => {
    test('getBlockWithReceipts', async () => {
      const response = await channel09.getBlockWithReceipts('latest');
      expect(response).toMatchSchemaRef('BlockWithTxReceipts');
    });

    test('getMessagesStatus', async () => {
      // Test with a dummy transaction hash
      const dummyTxHash = '0x123456789abcdef';

      // Since this is a new method that may not have real data in devnet,
      // we'll mock the response to test the method structure
      const fetchSpy = jest.spyOn(channel09, 'fetch');
      fetchSpy.mockResolvedValueOnce({
        json: async () => ({
          jsonrpc: '2.0',
          result: [],
          id: 1,
        }),
      } as any);

      const response = await channel09.getMessagesStatus(dummyTxHash);
      expect(Array.isArray(response)).toBe(true);

      fetchSpy.mockRestore();
    });

    test('getStorageProof', async () => {
      // Test storage proof with empty arrays
      const fetchSpy = jest.spyOn(channel09, 'fetch');
      fetchSpy.mockResolvedValueOnce({
        json: async () => ({
          jsonrpc: '2.0',
          result: {
            classes_proof: [],
            contracts_proof: [],
            contracts_storage_proofs: [],
          },
          id: 1,
        }),
      } as any);

      const response = await channel09.getStorageProof();
      expect(response).toHaveProperty('classes_proof');
      expect(response).toHaveProperty('contracts_proof');
      expect(response).toHaveProperty('contracts_storage_proofs');

      fetchSpy.mockRestore();
    });

    test('getCompiledCasm', async () => {
      // Test with a dummy class hash
      const dummyClassHash = '0x123456789abcdef';

      const fetchSpy = jest.spyOn(channel09, 'fetch');
      fetchSpy.mockResolvedValueOnce({
        json: async () => ({
          jsonrpc: '2.0',
          result: {
            bytecode: [],
            hints: [],
            pythonic_hints: [],
            compiler_version: '2.0.0',
          },
          id: 1,
        }),
      } as any);

      const response = await channel09.getCompiledCasm(dummyClassHash);
      expect(response).toHaveProperty('bytecode');
      expect(response).toHaveProperty('hints');
      expect(response).toHaveProperty('pythonic_hints');
      expect(response).toHaveProperty('compiler_version');

      fetchSpy.mockRestore();
    });

    test('simulateTransaction supports V3 transactions', async () => {
      // Test that simulate transaction works with resource bounds (V3 feature)
      const mockSimulateResponse = {
        jsonrpc: '2.0',
        result: [
          {
            fee_estimation: {
              l1_gas_consumed: '0x1000',
              l1_gas_price: '0x64',
              l1_data_gas_consumed: '0x500',
              l1_data_gas_price: '0x32',
              l2_gas_consumed: '0x200',
              l2_gas_price: '0x20',
              overall_fee: '0x10000',
              unit: 'FRI',
            },
            transaction_trace: {
              type: 'INVOKE',
              execution_resources: {},
            },
          },
        ],
        id: 1,
      };

      const fetchSpy = jest.spyOn(channel09, 'fetch');
      fetchSpy.mockResolvedValueOnce({
        json: async () => mockSimulateResponse,
      } as any);

      // Mock invocation with V3 transaction structure
      const mockInvocation = {
        type: 'INVOKE' as const,
        contractAddress: '0x123',
        calldata: [],
        signature: [],
        nonce: '0x1',
        version: '0x3',
        resourceBounds: {
          l1_gas: { max_amount: 1000n, max_price_per_unit: 100n },
          l2_gas: { max_amount: 2000n, max_price_per_unit: 200n },
          l1_data_gas: { max_amount: 500n, max_price_per_unit: 50n },
        },
        tip: 0n,
        paymasterData: [],
        accountDeploymentData: [],
        nonceDataAvailabilityMode: 'L1' as const,
        feeDataAvailabilityMode: 'L1' as const,
      };

      const response = await channel09.simulateTransaction([mockInvocation]);
      expect(Array.isArray(response)).toBe(true);

      fetchSpy.mockRestore();
    });
  });
});
