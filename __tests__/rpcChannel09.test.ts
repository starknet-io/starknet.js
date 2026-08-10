import { constants, LibraryError, RPC09, RpcError } from '../src';
import {
  createBlockForDevnet,
  createTestProvider,
  describeIfRpc09,
  initializeMatcher,
  spyOnTransport,
  rpcResult,
  rpcErrorReply,
} from './config';

describeIfRpc09('UNIT TEST: RPC 0.9.0 Channel', () => {
  let nodeUrl: string;
  let channel09: RPC09.RpcChannel;
  initializeMatcher(expect);

  beforeAll(async () => {
    nodeUrl = (await createTestProvider(false)).channel.nodeUrl;
    channel09 = new RPC09.RpcChannel({ nodeUrl });

    await createBlockForDevnet();
  });

  test('baseFetch override', async () => {
    const baseFetch = jest.fn();
    const fetchChannel09 = new RPC09.RpcChannel({ nodeUrl, baseFetch });
    (fetchChannel09.fetch as any)();
    expect(baseFetch).toHaveBeenCalledTimes(1);
    baseFetch.mockClear();
  });

  test('RPC error handling', async () => {
    const transportSpy = spyOnTransport(channel09);
    transportSpy.mockResolvedValue(rpcErrorReply(24, 'Block not found'));

    expect.assertions(3);
    try {
      // @ts-expect-error
      await channel09.fetchEndpoint('starknet_chainId');
    } catch (error) {
      expect(error).toBeInstanceOf(LibraryError);
      expect(error).toBeInstanceOf(RpcError);
      expect((error as RpcError).isType('BLOCK_NOT_FOUND')).toBe(true);
    }
    transportSpy.mockRestore();
  });

  test('throws a clear error when response has neither result nor error', async () => {
    // Issue #1238: a malformed/empty reply (no result, no error) must throw a
    // LibraryError instead of silently returning undefined.
    const transportSpy = spyOnTransport(channel09);
    transportSpy.mockResolvedValueOnce({ jsonrpc: '2.0', id: 1 } as any);

    await expect(
      // @ts-expect-error private method accessed for testing
      channel09.fetchEndpoint('starknet_chainId')
    ).rejects.toThrow(LibraryError);
    transportSpy.mockRestore();
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
      const transportSpy = spyOnTransport(channel09);
      transportSpy.mockResolvedValueOnce(rpcResult([]));

      const response = await channel09.getMessagesStatus(dummyTxHash);
      expect(Array.isArray(response)).toBe(true);

      transportSpy.mockRestore();
    });

    test('getStorageProof', async () => {
      // Test storage proof with empty arrays
      const transportSpy = spyOnTransport(channel09);
      transportSpy.mockResolvedValueOnce(
        rpcResult({
          classes_proof: [],
          contracts_proof: [],
          contracts_storage_proofs: [],
        })
      );

      const response = await channel09.getStorageProof();
      expect(response).toHaveProperty('classes_proof');
      expect(response).toHaveProperty('contracts_proof');
      expect(response).toHaveProperty('contracts_storage_proofs');

      transportSpy.mockRestore();
    });

    test('getCompiledCasm', async () => {
      // Test with a dummy class hash
      const dummyClassHash = '0x123456789abcdef';

      const transportSpy = spyOnTransport(channel09);
      transportSpy.mockResolvedValueOnce(
        rpcResult({
          bytecode: [],
          hints: [],
          pythonic_hints: [],
          compiler_version: '2.0.0',
        })
      );

      const response = await channel09.getCompiledCasm(dummyClassHash);
      expect(response).toHaveProperty('bytecode');
      expect(response).toHaveProperty('hints');
      expect(response).toHaveProperty('pythonic_hints');
      expect(response).toHaveProperty('compiler_version');

      transportSpy.mockRestore();
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

      const transportSpy = spyOnTransport(channel09);
      transportSpy.mockResolvedValueOnce(mockSimulateResponse as any);

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

      transportSpy.mockRestore();
    });
  });
});

describe('UNIT TEST: RPC 0.9.0 Channel transport option', () => {
  // These run on any node version: nothing here reaches one. They are what proves the 0.9
  // channel is wired to the transport, since the `describeIfRpc09` block above is skipped
  // whenever the test node serves 0.10.
  test('uses an injected transport and never touches baseFetch', async () => {
    const baseFetch = jest.fn();
    const request = jest.fn(async () => ({ jsonrpc: '2.0', id: 1, result: '0x1' }));
    const injected = new RPC09.RpcChannel({
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
    const injected = new RPC09.RpcChannel({
      nodeUrl: 'http://localhost:5050/rpc',
      transport: { request } as any,
    });

    await (injected as any).fetchEndpoint('starknet_chainId');
    await (injected as any).fetchEndpoint('starknet_chainId');

    expect(request.mock.calls.map(([envelope]: any) => envelope.id)).toEqual([1, 2]);
  });
});

describe('UNIT TEST: RPC 0.9.0 Channel waitForTransaction', () => {
  let channel: RPC09.RpcChannel;

  beforeEach(() => {
    channel = new RPC09.RpcChannel({ nodeUrl: 'http://localhost:5050/rpc' });
  });

  test('returns immediately after the receipt is available', async () => {
    jest.useFakeTimers();
    const receipt = { transaction_hash: '0x123' };
    const transactionStatusSpy = jest.spyOn(channel, 'getTransactionStatus').mockResolvedValueOnce({
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
    const transactionStatusSpy = jest.spyOn(channel, 'getTransactionStatus').mockResolvedValueOnce({
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

// No node needed: `buildTransaction` is a pure payload builder, so this suite runs
// on every RPC version of the CI matrix.
describe('UNIT TEST: RPC 0.9.0 Channel - SNIP-36 guard', () => {
  const channel09 = new RPC09.RpcChannel({ nodeUrl: 'http://dummy-node.invalid/rpc' });

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

  // RPC 0.9 has no `proof_facts` field, but the transaction hash commits to it
  // anyway. Building the payload silently would produce an invalid signature.
  test('buildTransaction rejects an INVOKE carrying proofFacts', async () => {
    await expect(
      channel09.buildTransaction({ ...invocation, proofFacts: ['0xabc', '0xdef'] })
    ).rejects.toThrow(constants.SYSTEM_MESSAGES.snip36RequiresRPC010);
  });

  test('buildTransaction rejects an INVOKE carrying a proof', async () => {
    await expect(channel09.buildTransaction({ ...invocation, proof: 'AAECAw==' })).rejects.toThrow(
      constants.SYSTEM_MESSAGES.snip36RequiresRPC010
    );
  });

  test('buildTransaction accepts an empty proofFacts array', async () => {
    const result = await channel09.buildTransaction({ ...invocation, proofFacts: [] });

    expect(result).not.toHaveProperty('proof_facts');
  });

  test('buildTransaction accepts an INVOKE without any SNIP-36 field', async () => {
    const result = await channel09.buildTransaction(invocation);

    expect(result).not.toHaveProperty('proof_facts');
    expect(result).not.toHaveProperty('proof');
  });
});
