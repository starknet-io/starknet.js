import {
  getTipStatsFromBlocks,
  type TipAnalysisOptions,
  RpcProvider,
  LibraryError,
  type RPC,
} from '../../src';

// Mock the RpcProvider
jest.mock('../../src/provider/rpc');

describe('Tip Analysis', () => {
  let mockProvider: jest.Mocked<RpcProvider>;

  beforeEach(() => {
    mockProvider = {
      getBlockWithTxs: jest.fn(),
      getBlockLatestAccepted: jest.fn(),
      channel: {
        batchClient: undefined, // No batching by default
      } as any,
    } as any;
  });

  describe('getTipStatsFromBlocks', () => {
    const createMockBlock = (
      blockNumber: number,
      transactions: Array<Partial<RPC.TXN_WITH_HASH>>
    ): RPC.BlockWithTxs =>
      ({
        status: 'ACCEPTED_ON_L1',
        block_number: blockNumber,
        transactions: transactions as any,
        block_hash: '0x123',
        parent_hash: '0x456',
        new_root: '0x789',
        timestamp: 123456789,
        sequencer_address: '0xabc',
        l1_gas_price: { price_in_fri: '0x1', price_in_wei: '0x1' },
        l1_data_gas_price: { price_in_fri: '0x1', price_in_wei: '0x1' },
        l2_gas_price: { price_in_fri: '0x1', price_in_wei: '0x1' },
        starknet_version: '0.13.0',
      }) as any;

    const createMockInvokeTransaction = (tip: string): Partial<RPC.TXN_WITH_HASH> => ({
      type: 'INVOKE',
      version: '0x3',
      tip,
      transaction_hash: '0x123',
      sender_address: '0x456',
      calldata: [],
      signature: [],
      nonce: '0x0',
      resource_bounds: {
        l1_gas: { max_amount: '0x1', max_price_per_unit: '0x1' },
        l2_gas: { max_amount: '0x1', max_price_per_unit: '0x1' },
        l1_data_gas: { max_amount: '0x1', max_price_per_unit: '0x1' },
      },
      paymaster_data: [],
      account_deployment_data: [],
      nonce_data_availability_mode: 'L1',
      fee_data_availability_mode: 'L1',
    });

    const createMockDeclareTransaction = (tip: string): Partial<RPC.TXN_WITH_HASH> => ({
      type: 'DECLARE',
      version: '0x3',
      tip,
      transaction_hash: '0x456',
      sender_address: '0x789',
      signature: [],
      nonce: '0x0',
      resource_bounds: {
        l1_gas: { max_amount: '0x1', max_price_per_unit: '0x1' },
        l2_gas: { max_amount: '0x1', max_price_per_unit: '0x1' },
        l1_data_gas: { max_amount: '0x1', max_price_per_unit: '0x1' },
      },
      paymaster_data: [],
      account_deployment_data: [],
      nonce_data_availability_mode: 'L1',
      fee_data_availability_mode: 'L1',
      class_hash: '0xabc',
      compiled_class_hash: '0xdef',
    });

    const createMockDeployAccountTransaction = (tip: string): Partial<RPC.TXN_WITH_HASH> => ({
      type: 'DEPLOY_ACCOUNT',
      version: '0x3',
      tip,
      transaction_hash: '0x789',
      signature: [],
      nonce: '0x0',
      resource_bounds: {
        l1_gas: { max_amount: '0x1', max_price_per_unit: '0x1' },
        l2_gas: { max_amount: '0x1', max_price_per_unit: '0x1' },
        l1_data_gas: { max_amount: '0x1', max_price_per_unit: '0x1' },
      },
      paymaster_data: [],
      nonce_data_availability_mode: 'L1',
      fee_data_availability_mode: 'L1',
      class_hash: '0xabc',
      constructor_calldata: [],
      contract_address_salt: '0xdef',
    });

    test('should calculate statistics correctly with various tip amounts', async () => {
      const transactions = [
        createMockInvokeTransaction('10'), // min
        createMockInvokeTransaction('20'),
        createMockInvokeTransaction('20'), // mode (appears twice)
        createMockInvokeTransaction('30'), // median
        createMockInvokeTransaction('40'),
        createMockInvokeTransaction('100'), // max
      ];

      const mockBlock = createMockBlock(100, transactions);
      mockProvider.getBlockWithTxs.mockResolvedValue(mockBlock);

      const options: TipAnalysisOptions = { minTxsNecessary: 6 };
      const result = await getTipStatsFromBlocks(mockProvider, 'latest', options);

      expect(result).toEqual({
        minTip: 10n,
        maxTip: 100n,
        averageTip: 36n, // (10+20+20+30+40+100)/6 = 36.67 -> 36
        medianTip: 25n, // (20+30)/2 = 25
        modeTip: 20n, // appears twice
        recommendedTip: 25n, // median tip directly (no buffer)
        p90Tip: expect.any(BigInt), // 90th percentile
        p95Tip: expect.any(BigInt), // 95th percentile
        metrics: expect.objectContaining({
          blocksAnalyzed: expect.any(Number),
          transactionsFound: expect.any(Number),
        }),
      });
    });

    test('should use median tip directly as recommended tip', async () => {
      const transactions = [
        createMockInvokeTransaction('100'),
        createMockInvokeTransaction('200'),
        createMockInvokeTransaction('300'),
      ];

      const mockBlock = createMockBlock(100, transactions);
      mockProvider.getBlockWithTxs.mockResolvedValue(mockBlock);

      const options: TipAnalysisOptions = { minTxsNecessary: 3 };
      const result = await getTipStatsFromBlocks(mockProvider, 'latest', options);

      expect(result).toEqual({
        minTip: 100n,
        maxTip: 300n,
        averageTip: 200n,
        medianTip: 200n,
        modeTip: 100n, // First occurrence when all have same count
        recommendedTip: 200n, // median tip directly (no buffer)
        p90Tip: expect.any(BigInt), // 90th percentile
        p95Tip: expect.any(BigInt), // 95th percentile
        metrics: expect.objectContaining({
          blocksAnalyzed: expect.any(Number),
          transactionsFound: expect.any(Number),
        }),
      });
    });

    test('should exclude zero tips by default', async () => {
      const transactions = [
        createMockInvokeTransaction('0'),
        createMockInvokeTransaction('10'),
        createMockInvokeTransaction('20'),
        createMockInvokeTransaction('30'),
      ];

      const mockBlock = createMockBlock(100, transactions);
      mockProvider.getBlockWithTxs.mockResolvedValue(mockBlock);

      const options: TipAnalysisOptions = { minTxsNecessary: 3 };
      const result = await getTipStatsFromBlocks(mockProvider, 'latest', options);

      expect(result.minTip).toBe(10n); // Zero tip excluded
      expect(result.averageTip).toBe(20n); // (10+20+30)/3 = 20
    });

    test('should include zero tips when specified', async () => {
      const transactions = [
        createMockInvokeTransaction('0'),
        createMockInvokeTransaction('10'),
        createMockInvokeTransaction('20'),
        createMockInvokeTransaction('30'),
      ];

      const mockBlock = createMockBlock(100, transactions);
      mockProvider.getBlockWithTxs.mockResolvedValue(mockBlock);

      const options: TipAnalysisOptions = { includeZeroTips: true };
      const result = await getTipStatsFromBlocks(mockProvider, 'latest', options);

      expect(result.minTip).toBe(0n); // Zero tip included
      expect(result.averageTip).toBe(15n); // (0+10+20+30)/4 = 15
    });

    test('should filter V3 transactions from all transaction types', async () => {
      const transactions = [
        createMockInvokeTransaction('10'),
        createMockDeclareTransaction('20'),
        createMockDeployAccountTransaction('30'),
        // Add non-V3 transactions that should be filtered out
        { type: 'INVOKE', version: '0x1', tip: '100' } as any, // V1 - should be excluded
        { type: 'INVOKE', version: '0x3' } as any, // V3 but no tip - should be excluded
        { type: 'L1_HANDLER', version: '0x3', tip: '50' } as any, // Not supported type - should be excluded
      ];

      const mockBlock = createMockBlock(100, transactions);
      mockProvider.getBlockWithTxs.mockResolvedValue(mockBlock);

      const options: TipAnalysisOptions = { minTxsNecessary: 3 };
      const result = await getTipStatsFromBlocks(mockProvider, 'latest', options);

      expect(result.minTip).toBe(10n);
      expect(result.maxTip).toBe(30n);
      expect(result.averageTip).toBe(20n); // (10+20+30)/3 = 20
    });

    test('should return zero values when insufficient transaction data', async () => {
      const transactions = [createMockInvokeTransaction('10'), createMockInvokeTransaction('20')]; // Only 2 transactions, and we'll test with default minTxsNecessary of 10

      const mockBlock = createMockBlock(100, transactions);
      mockProvider.getBlockWithTxs.mockResolvedValue(mockBlock);

      const result = await getTipStatsFromBlocks(mockProvider, 'latest');
      expect(result).toEqual({
        recommendedTip: 0n,
        medianTip: 0n,
        modeTip: 0n,
        averageTip: 0n,
        minTip: 0n,
        maxTip: 0n,
        p90Tip: 0n,
        p95Tip: 0n,
        metrics: expect.objectContaining({
          blocksAnalyzed: expect.any(Number),
          transactionsFound: expect.any(Number),
        }),
      });
    });

    test('should respect custom minTxsNecessary', async () => {
      const transactions = [createMockInvokeTransaction('10'), createMockInvokeTransaction('20')];

      const mockBlock = createMockBlock(100, transactions);
      mockProvider.getBlockWithTxs.mockResolvedValue(mockBlock);

      const options: TipAnalysisOptions = { minTxsNecessary: 2 };
      const result = await getTipStatsFromBlocks(mockProvider, 'latest', options);

      expect(result.averageTip).toBe(15n);
    });

    test('should analyze multiple blocks', async () => {
      const block1 = createMockBlock(100, [
        createMockInvokeTransaction('10'),
        createMockInvokeTransaction('20'),
      ]);
      const block2 = createMockBlock(99, [
        createMockInvokeTransaction('30'),
        createMockInvokeTransaction('40'),
      ]);

      mockProvider.getBlockWithTxs
        .mockResolvedValueOnce(block1) // Starting block
        .mockResolvedValueOnce(block1) // Block 100
        .mockResolvedValueOnce(block2); // Block 99

      const options: TipAnalysisOptions = { maxBlocks: 2, minTxsNecessary: 4 };
      const result = await getTipStatsFromBlocks(mockProvider, 'latest', options);

      expect(result.averageTip).toBe(25n); // (10+20+30+40)/4 = 25
    });

    test('should use parallel strategy when batching is enabled', async () => {
      // Enable batching
      (mockProvider.channel as any).batchClient = {};

      const mockBlock = createMockBlock(
        100,
        Array(10)
          .fill(null)
          .map(() => createMockInvokeTransaction('10'))
      );

      mockProvider.getBlockWithTxs.mockResolvedValue(mockBlock);

      const result = await getTipStatsFromBlocks(mockProvider, 'latest');

      expect(result.averageTip).toBe(10n);
      // Verify that getBlockWithTxs was called (parallel strategy would call it multiple times)
      expect(mockProvider.getBlockWithTxs).toHaveBeenCalled();
    });

    test('should validate input parameters', async () => {
      await expect(getTipStatsFromBlocks(mockProvider, 'latest', { maxBlocks: 0 })).rejects.toThrow(
        'maxBlocks parameter must be greater than or equal to 1'
      );

      await expect(
        getTipStatsFromBlocks(mockProvider, 'latest', { maxBlocks: 101 })
      ).rejects.toThrow('maxBlocks parameter must be less than or equal to 100');

      await expect(
        getTipStatsFromBlocks(mockProvider, 'latest', { minTxsNecessary: 0 })
      ).rejects.toThrow('minTxsNecessary parameter must be greater than or equal to 1');

      await expect(
        getTipStatsFromBlocks(mockProvider, 'latest', { maxBlocks: 1.5 as any })
      ).rejects.toThrow('maxBlocks parameter must be an integer');
    });

    test('should handle RPC errors gracefully', async () => {
      mockProvider.getBlockWithTxs.mockRejectedValue(new Error('RPC Error'));

      await expect(getTipStatsFromBlocks(mockProvider, 'latest')).rejects.toThrow(LibraryError);
    });

    test('should handle blocks with no valid transactions', async () => {
      const emptyBlock = createMockBlock(100, []);
      mockProvider.getBlockWithTxs.mockResolvedValue(emptyBlock);

      const result = await getTipStatsFromBlocks(mockProvider, 'latest');
      expect(result).toEqual({
        recommendedTip: 0n,
        medianTip: 0n,
        modeTip: 0n,
        averageTip: 0n,
        minTip: 0n,
        maxTip: 0n,
        p90Tip: 0n,
        p95Tip: 0n,
        metrics: expect.objectContaining({
          blocksAnalyzed: expect.any(Number),
          transactionsFound: expect.any(Number),
        }),
      });
    });

    test('should calculate median correctly for even number of values', async () => {
      const transactions = [
        createMockInvokeTransaction('10'),
        createMockInvokeTransaction('20'),
        createMockInvokeTransaction('30'),
        createMockInvokeTransaction('40'),
      ];

      const mockBlock = createMockBlock(100, transactions);
      mockProvider.getBlockWithTxs.mockResolvedValue(mockBlock);

      const options: TipAnalysisOptions = { minTxsNecessary: 4 };
      const result = await getTipStatsFromBlocks(mockProvider, 'latest', options);

      expect(result.medianTip).toBe(25n); // (20+30)/2 = 25
    });

    test('should calculate median correctly for odd number of values', async () => {
      const transactions = [
        createMockInvokeTransaction('10'),
        createMockInvokeTransaction('20'),
        createMockInvokeTransaction('30'),
      ];

      const mockBlock = createMockBlock(100, transactions);
      mockProvider.getBlockWithTxs.mockResolvedValue(mockBlock);

      const options: TipAnalysisOptions = { minTxsNecessary: 3 };
      const result = await getTipStatsFromBlocks(mockProvider, 'latest', options);

      expect(result.medianTip).toBe(20n); // Middle value
    });

    test('should calculate mode correctly with ties', async () => {
      const transactions = [
        createMockInvokeTransaction('10'), // appears once
        createMockInvokeTransaction('20'), // appears twice
        createMockInvokeTransaction('20'),
        createMockInvokeTransaction('30'), // appears twice
        createMockInvokeTransaction('30'),
      ];

      const mockBlock = createMockBlock(100, transactions);
      mockProvider.getBlockWithTxs.mockResolvedValue(mockBlock);

      const options: TipAnalysisOptions = { minTxsNecessary: 5 };
      const result = await getTipStatsFromBlocks(mockProvider, 'latest', options);

      // When tied, should choose the smaller value (20 < 30)
      expect(result.modeTip).toBe(20n);
    });
  });
});
