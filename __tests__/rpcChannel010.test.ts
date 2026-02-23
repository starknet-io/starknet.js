import { LibraryError, RPC010, RpcError } from '../src';
import {
  createBlockForDevnet,
  createTestProvider,
  initializeMatcher,
  testIfRpc010,
} from './config';

testIfRpc010('RpcChannel', () => {
  let nodeUrl: string;
  let channel08: RPC010.RpcChannel;
  initializeMatcher(expect);

  beforeAll(async () => {
    nodeUrl = (await createTestProvider(false)).channel.nodeUrl;
    channel08 = new RPC010.RpcChannel({ nodeUrl });

    await createBlockForDevnet();
  });

  test('baseFetch override', async () => {
    const baseFetch = jest.fn();
    const fetchChannel08 = new RPC010.RpcChannel({ nodeUrl, baseFetch });
    (fetchChannel08.fetch as any)();
    expect(baseFetch).toHaveBeenCalledTimes(1);
    baseFetch.mockClear();
  });

  test('RPC error handling', async () => {
    const fetchSpy = jest.spyOn(channel08, 'fetch');
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
      await channel08.fetchEndpoint('starknet_chainId');
    } catch (error) {
      expect(error).toBeInstanceOf(LibraryError);
      expect(error).toBeInstanceOf(RpcError);
      expect((error as RpcError).isType('BLOCK_NOT_FOUND')).toBe(true);
    }
    fetchSpy.mockRestore();
  });

  describe('RPC 0.8.1', () => {
    test('getBlockWithReceipts', async () => {
      const response = await channel08.getBlockWithReceipts('latest');
      expect(response).toMatchSchemaRef('BlockWithTxReceipts08');
    });
  });
});

describe('UNIT TEST: RPC 0.10.1 Channel - New API features', () => {
  let channel: RPC010.RpcChannel;
  let fetchSpy: jest.SpyInstance;

  const mockJsonResponse = (result: any) => ({
    json: async () => ({ jsonrpc: '2.0', result, id: 1 }),
  });

  beforeAll(() => {
    channel = new RPC010.RpcChannel({ nodeUrl: 'http://localhost:5050/rpc' });
  });

  afterEach(() => {
    fetchSpy?.mockRestore();
  });

  describe('response_flags (includeProofFacts)', () => {
    test('getBlockWithTxs with includeProofFacts sends response_flags', async () => {
      fetchSpy = jest.spyOn(channel, 'fetch');
      fetchSpy.mockResolvedValueOnce(mockJsonResponse({ block_hash: '0x1' }) as any);

      await channel.getBlockWithTxs('latest', { includeProofFacts: true });

      expect(fetchSpy).toHaveBeenCalledWith(
        'starknet_getBlockWithTxs',
        expect.objectContaining({
          response_flags: ['INCLUDE_PROOF_FACTS'],
        }),
        expect.any(Number)
      );
    });

    test('getBlockWithTxs without includeProofFacts omits response_flags', async () => {
      fetchSpy = jest.spyOn(channel, 'fetch');
      fetchSpy.mockResolvedValueOnce(mockJsonResponse({ block_hash: '0x1' }) as any);

      await channel.getBlockWithTxs('latest');

      const params = fetchSpy.mock.calls[0][1];
      expect(params).not.toHaveProperty('response_flags');
    });

    test('getBlockWithReceipts with includeProofFacts sends response_flags', async () => {
      fetchSpy = jest.spyOn(channel, 'fetch');
      fetchSpy.mockResolvedValueOnce(mockJsonResponse({ block_hash: '0x1' }) as any);

      await channel.getBlockWithReceipts('latest', { includeProofFacts: true });

      expect(fetchSpy).toHaveBeenCalledWith(
        'starknet_getBlockWithReceipts',
        expect.objectContaining({
          response_flags: ['INCLUDE_PROOF_FACTS'],
        }),
        expect.any(Number)
      );
    });

    test('getTransactionByHash with includeProofFacts sends response_flags', async () => {
      fetchSpy = jest.spyOn(channel, 'fetch');
      fetchSpy.mockResolvedValueOnce(mockJsonResponse({ type: 'INVOKE' }) as any);

      await channel.getTransactionByHash('0x123', { includeProofFacts: true });

      expect(fetchSpy).toHaveBeenCalledWith(
        'starknet_getTransactionByHash',
        expect.objectContaining({
          transaction_hash: '0x123',
          response_flags: ['INCLUDE_PROOF_FACTS'],
        }),
        expect.any(Number)
      );
    });

    test('getTransactionByHash without options omits response_flags', async () => {
      fetchSpy = jest.spyOn(channel, 'fetch');
      fetchSpy.mockResolvedValueOnce(mockJsonResponse({ type: 'INVOKE' }) as any);

      await channel.getTransactionByHash('0x123');

      const params = fetchSpy.mock.calls[0][1];
      expect(params).not.toHaveProperty('response_flags');
    });

    test('getTransactionByBlockIdAndIndex with includeProofFacts sends response_flags', async () => {
      fetchSpy = jest.spyOn(channel, 'fetch');
      fetchSpy.mockResolvedValueOnce(mockJsonResponse({ type: 'INVOKE' }) as any);

      await channel.getTransactionByBlockIdAndIndex('latest', 0, { includeProofFacts: true });

      expect(fetchSpy).toHaveBeenCalledWith(
        'starknet_getTransactionByBlockIdAndIndex',
        expect.objectContaining({
          index: 0,
          response_flags: ['INCLUDE_PROOF_FACTS'],
        }),
        expect.any(Number)
      );
    });
  });

  describe('trace_flags (returnInitialReads)', () => {
    test('getBlockTransactionsTraces with returnInitialReads sends trace_flags', async () => {
      fetchSpy = jest.spyOn(channel, 'fetch');
      fetchSpy.mockResolvedValueOnce(mockJsonResponse([]) as any);

      await channel.getBlockTransactionsTraces('latest', { returnInitialReads: true });

      expect(fetchSpy).toHaveBeenCalledWith(
        'starknet_traceBlockTransactions',
        expect.objectContaining({
          trace_flags: ['RETURN_INITIAL_READS'],
        }),
        expect.any(Number)
      );
    });

    test('getBlockTransactionsTraces without returnInitialReads omits trace_flags', async () => {
      fetchSpy = jest.spyOn(channel, 'fetch');
      fetchSpy.mockResolvedValueOnce(mockJsonResponse([]) as any);

      await channel.getBlockTransactionsTraces('latest');

      const params = fetchSpy.mock.calls[0][1];
      expect(params).not.toHaveProperty('trace_flags');
    });

    test('simulateTransaction with returnInitialReads sends trace_flags', async () => {
      fetchSpy = jest.spyOn(channel, 'fetch');
      fetchSpy.mockResolvedValueOnce(
        mockJsonResponse({
          simulated_transactions: [],
        }) as any
      );

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

      await channel.simulateTransaction([mockInvocation], { returnInitialReads: true });

      expect(fetchSpy).toHaveBeenCalledWith(
        'starknet_simulateTransactions',
        expect.objectContaining({
          trace_flags: ['RETURN_INITIAL_READS'],
          simulation_flags: expect.any(Array),
        }),
        expect.any(Number)
      );
    });

    test('simulateTransaction without returnInitialReads omits trace_flags', async () => {
      fetchSpy = jest.spyOn(channel, 'fetch');
      fetchSpy.mockResolvedValueOnce(mockJsonResponse([]) as any);

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

      await channel.simulateTransaction([mockInvocation]);

      const params = fetchSpy.mock.calls[0][1];
      expect(params).not.toHaveProperty('trace_flags');
    });
  });

  describe('buildTransaction with proofFacts', () => {
    test('INVOKE transaction includes proof_facts when provided', async () => {
      const invocation = {
        type: 'INVOKE' as const,
        contractAddress: '0x123',
        calldata: ['0x1'],
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
        proofFacts: ['0xabc', '0xdef'],
      };

      const result = await channel.buildTransaction(invocation);

      expect(result).toHaveProperty('proof_facts');
      expect(result.proof_facts).toEqual(['0xabc', '0xdef']);
    });

    test('INVOKE transaction omits proof_facts when not provided', async () => {
      const invocation = {
        type: 'INVOKE' as const,
        contractAddress: '0x123',
        calldata: ['0x1'],
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

      const result = await channel.buildTransaction(invocation);

      expect(result).not.toHaveProperty('proof_facts');
    });
  });
});
