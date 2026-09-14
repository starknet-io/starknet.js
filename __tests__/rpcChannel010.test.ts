import { LibraryError, RPC0102, RpcError } from '../src';
import {
  createBlockForDevnet,
  createTestProvider,
  initializeMatcher,
  describeIfRpc010,
  spyOnTransport,
  rpcResult,
  rpcErrorReply,
  sentEnvelope,
} from './config';

describeIfRpc010('RpcChannel', () => {
  let nodeUrl: string;
  let channel08: RPC0102.RpcChannel;
  initializeMatcher(expect);

  beforeAll(async () => {
    nodeUrl = (await createTestProvider()).channel.nodeUrl;
    channel08 = new RPC0102.RpcChannel({ nodeUrl });

    await createBlockForDevnet();
  });

  test('baseFetch override', async () => {
    const baseFetch = jest.fn();
    const fetchChannel08 = new RPC0102.RpcChannel({ nodeUrl, baseFetch });
    (fetchChannel08.fetch as any)();
    expect(baseFetch).toHaveBeenCalledTimes(1);
    baseFetch.mockClear();
  });

  test('RPC error handling', async () => {
    const transportSpy = spyOnTransport(channel08);
    transportSpy.mockResolvedValue(rpcErrorReply(24, 'Block not found'));

    expect.assertions(3);
    try {
      await (channel08 as any).fetchEndpoint('starknet_chainId');
    } catch (error) {
      expect(error).toBeInstanceOf(LibraryError);
      expect(error).toBeInstanceOf(RpcError);
      expect((error as RpcError).isType('BLOCK_NOT_FOUND')).toBe(true);
    }
    transportSpy.mockRestore();
  });

  describe('RPC 0.8.1', () => {
    test('getBlockWithReceipts', async () => {
      const response = await channel08.getBlockWithReceipts('latest');
      expect(response).toMatchSchemaRef('BlockWithTxReceipts08');
    });
  });
});

describe('UNIT TEST: RPC 0.10.1 Channel - New API features', () => {
  let channel: RPC0102.RpcChannel;
  let transportSpy: jest.SpyInstance;

  beforeAll(() => {
    channel = new RPC0102.RpcChannel({ nodeUrl: 'http://localhost:5050/rpc' });
  });

  afterEach(() => {
    transportSpy?.mockRestore();
  });

  describe('waitForTransaction', () => {
    test('returns immediately after the receipt is available', async () => {
      jest.useFakeTimers();
      const receipt = { transaction_hash: '0x123' };
      const transactionStatusSpy = jest
        .spyOn(channel, 'getTransactionStatus')
        .mockResolvedValueOnce({
          finality_status: 'ACCEPTED_ON_L2',
          execution_status: 'SUCCEEDED',
        });
      const transactionReceiptSpy = jest
        .spyOn(channel, 'getTransactionReceipt')
        .mockResolvedValueOnce(receipt as any);

      const promise = channel.waitForTransaction('0x123', { retryInterval: 1_000 });
      let settled = false;
      const settledPromise = promise.then((result) => {
        settled = true;
        return result;
      });

      try {
        await jest.advanceTimersByTimeAsync(1_000);
        await Promise.resolve();

        expect(settled).toBe(true);
        await expect(settledPromise).resolves.toBe(receipt);
      } finally {
        transactionStatusSpy.mockRestore();
        transactionReceiptSpy.mockRestore();
        jest.useRealTimers();
      }
    });

    test('waits one retry interval when the receipt is not available yet', async () => {
      jest.useFakeTimers();
      const receipt = { transaction_hash: '0x123' };
      const transactionStatusSpy = jest
        .spyOn(channel, 'getTransactionStatus')
        .mockResolvedValueOnce({
          finality_status: 'ACCEPTED_ON_L2',
          execution_status: 'SUCCEEDED',
        });
      const transactionReceiptSpy = jest
        .spyOn(channel, 'getTransactionReceipt')
        .mockRejectedValueOnce(new Error('Transaction hash not found'))
        .mockResolvedValueOnce(receipt as any);

      const promise = channel.waitForTransaction('0x123', { retryInterval: 1_000 });
      let settled = false;
      const settledPromise = promise.then((result) => {
        settled = true;
        return result;
      });

      try {
        // status polling interval elapsed, first receipt attempt rejected
        await jest.advanceTimersByTimeAsync(1_000);
        expect(transactionReceiptSpy).toHaveBeenCalledTimes(1);
        expect(settled).toBe(false);

        // pacing between two receipt attempts is preserved
        await jest.advanceTimersByTimeAsync(999);
        expect(transactionReceiptSpy).toHaveBeenCalledTimes(1);
        expect(settled).toBe(false);

        await jest.advanceTimersByTimeAsync(1);
        expect(transactionReceiptSpy).toHaveBeenCalledTimes(2);
        expect(settled).toBe(true);
        await expect(settledPromise).resolves.toBe(receipt);
      } finally {
        transactionStatusSpy.mockRestore();
        transactionReceiptSpy.mockRestore();
        jest.useRealTimers();
      }
    });
  });

  describe('response_flags (includeProofFacts)', () => {
    test('getBlockWithTxs with includeProofFacts sends response_flags', async () => {
      transportSpy = spyOnTransport(channel);
      transportSpy.mockResolvedValueOnce(rpcResult({ block_hash: '0x1' }));

      await channel.getBlockWithTxs('latest', { includeProofFacts: true });

      expect(transportSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          method: 'starknet_getBlockWithTxs',
          params: expect.objectContaining({
            response_flags: ['INCLUDE_PROOF_FACTS'],
          }),
        })
      );
    });

    test('getBlockWithTxs without includeProofFacts omits response_flags', async () => {
      transportSpy = spyOnTransport(channel);
      transportSpy.mockResolvedValueOnce(rpcResult({ block_hash: '0x1' }));

      await channel.getBlockWithTxs('latest');

      expect(sentEnvelope(transportSpy).params).not.toHaveProperty('response_flags');
    });

    test('getBlockWithReceipts with includeProofFacts sends response_flags', async () => {
      transportSpy = spyOnTransport(channel);
      transportSpy.mockResolvedValueOnce(rpcResult({ block_hash: '0x1' }));

      await channel.getBlockWithReceipts('latest', { includeProofFacts: true });

      expect(transportSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          method: 'starknet_getBlockWithReceipts',
          params: expect.objectContaining({
            response_flags: ['INCLUDE_PROOF_FACTS'],
          }),
        })
      );
    });

    test('getTransactionByHash with includeProofFacts sends response_flags', async () => {
      transportSpy = spyOnTransport(channel);
      transportSpy.mockResolvedValueOnce(rpcResult({ type: 'INVOKE' }));

      await channel.getTransactionByHash('0x123', { includeProofFacts: true });

      expect(transportSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          method: 'starknet_getTransactionByHash',
          params: expect.objectContaining({
            transaction_hash: '0x123',
            response_flags: ['INCLUDE_PROOF_FACTS'],
          }),
        })
      );
    });

    test('getTransactionByHash without options omits response_flags', async () => {
      transportSpy = spyOnTransport(channel);
      transportSpy.mockResolvedValueOnce(rpcResult({ type: 'INVOKE' }));

      await channel.getTransactionByHash('0x123');

      expect(sentEnvelope(transportSpy).params).not.toHaveProperty('response_flags');
    });

    test('getTransactionByBlockIdAndIndex with includeProofFacts sends response_flags', async () => {
      transportSpy = spyOnTransport(channel);
      transportSpy.mockResolvedValueOnce(rpcResult({ type: 'INVOKE' }));

      await channel.getTransactionByBlockIdAndIndex('latest', 0, { includeProofFacts: true });

      expect(transportSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          method: 'starknet_getTransactionByBlockIdAndIndex',
          params: expect.objectContaining({
            index: 0,
            response_flags: ['INCLUDE_PROOF_FACTS'],
          }),
        })
      );
    });
  });

  describe('trace_flags (returnInitialReads)', () => {
    test('getBlockTransactionsTraces with returnInitialReads sends trace_flags', async () => {
      transportSpy = spyOnTransport(channel);
      transportSpy.mockResolvedValueOnce(rpcResult([]));

      await channel.getBlockTransactionsTraces('latest', { returnInitialReads: true });

      expect(transportSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          method: 'starknet_traceBlockTransactions',
          params: expect.objectContaining({
            trace_flags: ['RETURN_INITIAL_READS'],
          }),
        })
      );
    });

    test('getBlockTransactionsTraces without returnInitialReads omits trace_flags', async () => {
      transportSpy = spyOnTransport(channel);
      transportSpy.mockResolvedValueOnce(rpcResult([]));

      await channel.getBlockTransactionsTraces('latest');

      expect(sentEnvelope(transportSpy).params).not.toHaveProperty('trace_flags');
    });

    test('simulateTransaction with returnInitialReads sends trace_flags', async () => {
      transportSpy = spyOnTransport(channel);
      transportSpy.mockResolvedValueOnce(
        rpcResult({
          simulated_transactions: [],
        })
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

      expect(transportSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          method: 'starknet_simulateTransactions',
          params: expect.objectContaining({
            trace_flags: ['RETURN_INITIAL_READS'],
            simulation_flags: expect.any(Array),
          }),
        })
      );
    });

    test('simulateTransaction without returnInitialReads omits trace_flags', async () => {
      transportSpy = spyOnTransport(channel);
      transportSpy.mockResolvedValueOnce(rpcResult([]));

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

      expect(sentEnvelope(transportSpy).params).not.toHaveProperty('trace_flags');
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

  describe('transport option', () => {
    test('uses an injected transport and never touches baseFetch', async () => {
      const baseFetch = jest.fn();
      const request = jest.fn(async () => ({ jsonrpc: '2.0', id: 1, result: '0x1' }));
      const injected = new RPC0102.RpcChannel({
        nodeUrl: 'http://localhost:5050/rpc',
        baseFetch: baseFetch as any,
        transport: { request } as any,
      });

      await expect((injected as any).fetchEndpoint('starknet_chainId')).resolves.toBe('0x1');

      expect(baseFetch).not.toHaveBeenCalled();
      expect(request).toHaveBeenCalledWith(
        expect.objectContaining({ jsonrpc: '2.0', method: 'starknet_chainId' })
      );
    });

    test('numbers its own requests, starting at 1', async () => {
      const request = jest.fn(async () => ({ jsonrpc: '2.0', id: 1, result: '0x1' }));
      const injected = new RPC0102.RpcChannel({
        nodeUrl: 'http://localhost:5050/rpc',
        transport: { request } as any,
      });

      await (injected as any).fetchEndpoint('starknet_chainId');
      await (injected as any).fetchEndpoint('starknet_chainId');

      expect(request.mock.calls.map(([envelope]: any) => envelope.id)).toEqual([1, 2]);
    });
  });

  describe('malformed RPC response', () => {
    test('throws a clear error when response has neither result nor error', async () => {
      // Reproduces issue #1238: a node (e.g. Alchemy returning 404) replies with a
      // body that is missing both `result` and `error`. Previously this returned
      // `undefined` and crashed downstream with `response.flat is not a function`.
      transportSpy = spyOnTransport(channel);
      transportSpy.mockResolvedValueOnce({ jsonrpc: '2.0', id: 1 } as any);

      await expect((channel as any).fetchEndpoint('starknet_chainId')).rejects.toThrow(
        LibraryError
      );
    });

    test('preserves a falsy but valid result (genesis block number 0)', async () => {
      // Guards against the naive `if (!result)` check: 0 is a legitimate Starknet
      // result (e.g. genesis block number) and must be returned, not treated as an error.
      transportSpy = spyOnTransport(channel);
      transportSpy.mockResolvedValueOnce(rpcResult(0));

      await expect((channel as any).fetchEndpoint('starknet_blockNumber')).resolves.toBe(0);
    });
  });
});
