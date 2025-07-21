import { RANGE_FELT } from '../../global/constants';
import { logger } from '../../global/logger';
import type { ProviderInterface } from '../../provider';
import { BlockTag, type BlockIdentifier, type RPC } from '../../types';
import type { BlockWithTxs } from '../../types/api';
import assert from '../assert';
import { LibraryError } from '../errors';
import { isNumber, isString } from '../typed';

/**
 * Result of provider.getTipStatsFromBlocks().
 * @param {bigint} minTip - minimum tip encountered in the analyzed blocks.
 * @param {bigint} maxTip - maximum tip encountered in the analyzed blocks.
 * @param {bigint} averageTip - average tip encountered in the analyzed blocks.
 * @param {bigint} medianTip - median (middle value) tip encountered in the analyzed blocks.
 * @param {bigint} modeTip - mode (most frequent) tip encountered in the analyzed blocks.
 * @param {bigint} recommendedTip - suggested tip amount (median tip) for optimal inclusion probability.
 * @param {bigint} p90Tip - 90th percentile tip (90% of tips are below this value).
 * @param {bigint} p95Tip - 95th percentile tip (95% of tips are below this value).
 * @param {object} metrics - Optional performance metrics for the analysis.
 */
export type TipEstimate = {
  minTip: bigint;
  maxTip: bigint;
  averageTip: bigint;
  medianTip: bigint;
  modeTip: bigint;
  recommendedTip: bigint;
  p90Tip: bigint;
  p95Tip: bigint;
  metrics?: {
    blocksAnalyzed: number;
    transactionsTipsFound: bigint[];
  };
};

/**
 * Options for customizing tip analysis behavior.
 */
export type TipAnalysisOptions = {
  /**
   * Maximum number of blocks to analyze going backwards from the starting block.
   * @default 3
   */
  maxBlocks?: number;
  /**
   * Minimum number of transactions required to generate reliable statistics.
   * @default 10
   */
  minTxsNecessary?: number;
  /**
   * Whether to include transactions with zero tips in the analysis.
   * @default true
   */
  includeZeroTips?: boolean;
};

/**
 * Type guard to check if a transaction is a V3 transaction with a tip.
 * Includes INVOKE, DECLARE, and DEPLOY_ACCOUNT transaction types.
 */
function isV3TransactionWithTip(tx: RPC.TXN_WITH_HASH): tx is RPC.TXN_WITH_HASH & { tip: string } {
  return (
    tx.version === '0x3' &&
    'tip' in tx &&
    isString(tx.tip) &&
    (tx.type === 'INVOKE' || tx.type === 'DECLARE' || tx.type === 'DEPLOY_ACCOUNT')
  );
}

/**
 * Determines if the provider has batching enabled by checking for batchClient.
 * @param provider RPC provider to check
 * @returns true if batching is enabled, false otherwise
 */
function isBatchingEnabled(provider: ProviderInterface): boolean {
  // Type assertion needed because batchClient is a private property in RPC channel classes
  // This checks if the channel has a batchClient property to determine if batching is enabled
  const channel = provider.channel as unknown as { batchClient?: unknown };
  return !!channel.batchClient;
}

/**
 * Extracts tip values from V3 transactions in a block.
 * @param blockData Block data containing transactions
 * @param includeZeroTips Whether to include transactions with zero tips
 * @returns Array of tip values as bigints
 */
function extractTipsFromBlock(blockData: BlockWithTxs, includeZeroTips: boolean = true): bigint[] {
  return blockData.transactions
    .filter(isV3TransactionWithTip)
    .map((tx) => BigInt(tx.tip))
    .filter((tip) => includeZeroTips || tip > 0n);
}

/**
 * Creates a TipEstimate object with all zero values for insufficient data cases.
 * @param blocksAnalyzed Number of blocks that were analyzed
 * @param transactionsTipsFound Array of transaction tips found
 * @returns TipEstimate object with all zero values
 */
function createZeroTipEstimate(
  blocksAnalyzed: number,
  transactionsTipsFound: bigint[]
): TipEstimate {
  return {
    minTip: 0n,
    maxTip: 0n,
    averageTip: 0n,
    medianTip: 0n,
    modeTip: 0n,
    recommendedTip: 0n,
    p90Tip: 0n,
    p95Tip: 0n,
    metrics: {
      blocksAnalyzed,
      transactionsTipsFound,
    },
  };
}

/**
 * Calculates a specific percentile from a sorted array.
 * @param sortedArray Sorted array of values
 * @param percentile Percentile to calculate (0-100)
 * @returns The percentile value
 */
function calculatePercentile(sortedArray: bigint[], percentile: number): bigint {
  const index = (percentile / 100) * (sortedArray.length - 1);
  const lower = Math.floor(index);
  const upper = Math.ceil(index);

  if (lower === upper) {
    return sortedArray[lower];
  }

  // Interpolate between the two values
  const weight = index - lower;
  const lowerValue = sortedArray[lower];
  const upperValue = sortedArray[upper];

  // For bigint interpolation, we need to handle the fractional part carefully
  const diff = upperValue - lowerValue;
  const weightedDiff = (diff * BigInt(Math.round(weight * 1000))) / 1000n;

  return lowerValue + weightedDiff;
}

/**
 * Calculates tip statistics from collected tip values.
 * @param tips Array of tip values
 * @returns TipEstimate object with min, max, average, median, mode, percentiles, and recommended tip
 */
function calculateTipStats(tips: bigint[]): TipEstimate {
  assert(tips.length > 0, 'Cannot calculate statistics from empty tip array');

  const minTip = tips.reduce((min, tip) => (tip < min ? tip : min), RANGE_FELT.max);
  const maxTip = tips.reduce((max, tip) => (tip > max ? tip : max), 0n);
  const sumTip = tips.reduce((sum, tip) => sum + tip, 0n);
  const averageTip = sumTip / BigInt(tips.length);

  // Calculate median tip (middle value when sorted)
  const sortedTips = [...tips].sort((a, b) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  });
  const midIndex = Math.floor(sortedTips.length / 2);
  let medianTip: bigint;
  if (sortedTips.length % 2 === 0) {
    medianTip = (sortedTips[midIndex - 1] + sortedTips[midIndex]) / 2n;
  } else {
    medianTip = sortedTips[midIndex];
  }

  // Calculate mode tip (most frequently occurring value)
  const tipCounts = new Map<bigint, number>();
  tips.forEach((tip) => {
    tipCounts.set(tip, (tipCounts.get(tip) || 0) + 1);
  });

  const { modeTip } = Array.from(tipCounts.entries()).reduce(
    (acc, [tip, count]) => {
      if (count > acc.maxCount || (count === acc.maxCount && tip < acc.modeTip)) {
        return { maxCount: count, modeTip: tip };
      }
      return acc;
    },
    { maxCount: 0, modeTip: 0n }
  );

  // Calculate percentiles
  const p90Tip = calculatePercentile(sortedTips, 90);
  const p95Tip = calculatePercentile(sortedTips, 95);

  // Use median tip directly as recommended tip
  const recommendedTip = medianTip;

  return { minTip, maxTip, averageTip, medianTip, modeTip, recommendedTip, p90Tip, p95Tip };
}

/**
 * Determines the starting block number for analysis.
 * @param provider RPC provider for blockchain communication
 * @param blockIdentifier Block identifier to start from
 * @returns Block number to start analysis from
 */
async function getStartingBlockNumber(
  provider: ProviderInterface,
  blockIdentifier: BlockIdentifier
): Promise<number> {
  try {
    const blockData = (await provider.getBlockWithTxs(blockIdentifier)) as BlockWithTxs;

    if (isNumber(blockData.block_number)) {
      return blockData.block_number;
    }

    // If block_number is undefined, fall back to latest accepted block number
    const latestBlock = await provider.getBlockLatestAccepted();
    return latestBlock.block_number;
  } catch (error) {
    throw new LibraryError(
      `Failed to determine starting block number: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Fetches block data with error handling.
 * @param provider RPC provider for blockchain communication
 * @param blockNumber Block number to fetch
 * @returns Block data or null if failed
 */
async function fetchBlockSafely(
  provider: ProviderInterface,
  blockNumber: number
): Promise<BlockWithTxs | null> {
  try {
    return (await provider.getBlockWithTxs(blockNumber)) as BlockWithTxs;
  } catch (error) {
    logger.warn(`Failed to fetch block ${blockNumber}:`, error);
    return null;
  }
}

/**
 * Generates an array of block numbers to analyze.
 * @param startingBlockNumber Starting block number
 * @param maxBlocks Maximum number of blocks to analyze
 * @returns Array of block numbers in descending order
 */
function generateBlockNumbers(startingBlockNumber: number, maxBlocks: number): number[] {
  const oldestBlockNumber = Math.max(0, startingBlockNumber - maxBlocks + 1);
  const blockCount = startingBlockNumber - oldestBlockNumber + 1;

  return Array.from({ length: blockCount }, (_, index) => startingBlockNumber - index);
}

/**
 * Fetches multiple blocks in parallel (uses batching if provider supports it).
 * @param provider RPC provider for blockchain communication
 * @param blockNumbers Array of block numbers to fetch
 * @returns Array of BlockWithTxs data (nulls for failed fetches)
 */
async function fetchBlocksInParallel(
  provider: ProviderInterface,
  blockNumbers: number[]
): Promise<(BlockWithTxs | null)[]> {
  const fetchPromises = blockNumbers.map(async (blockNumber) => {
    try {
      return (await provider.getBlockWithTxs(blockNumber)) as BlockWithTxs;
    } catch (error) {
      logger.warn(`Failed to fetch block ${blockNumber} in parallel:`, error);
      return null;
    }
  });

  return Promise.all(fetchPromises);
}

/**
 * Analyzes tip statistics from recent blocks using parallel requests.
 * This version fetches all blocks simultaneously, which is more efficient
 * when using a provider with batching enabled.
 *
 * @param provider RPC provider for blockchain communication
 * @param blockIdentifier Starting block for analysis
 * @param options Configuration options for the analysis
 * @returns Promise resolving to TipEstimate object (returns zero values if insufficient data)
 */
async function getTipStatsParallel(
  provider: ProviderInterface,
  blockIdentifier: BlockIdentifier,
  options: TipAnalysisOptions
): Promise<TipEstimate> {
  const { maxBlocks = 3, minTxsNecessary = 10, includeZeroTips = true } = options;

  try {
    // Determine the starting block number
    const startingBlockNumber = await getStartingBlockNumber(provider, blockIdentifier);
    const blockNumbers = generateBlockNumbers(startingBlockNumber, maxBlocks);

    // Fetch all blocks in parallel (automatically batched if provider supports it)
    const blocks = await fetchBlocksInParallel(provider, blockNumbers);

    // Extract tips from all successfully fetched blocks
    const allTips: bigint[] = blocks
      .filter((blockData) => blockData !== null)
      .flatMap((blockData) => extractTipsFromBlock(blockData, includeZeroTips));

    const analyzedBlocks = blocks.filter((b) => b !== null).length;

    // Handle insufficient transaction data
    if (allTips.length < minTxsNecessary) {
      logger.error(
        `Insufficient transaction data: found ${allTips.length} V3 transactions with tips in ${analyzedBlocks} blocks ` +
          `(block range: ${Math.max(0, startingBlockNumber - maxBlocks + 1)}-${startingBlockNumber}). ` +
          `Required: ${minTxsNecessary} transactions. Consider reducing minTxsNecessary or increasing maxBlocks.`
      );
      return createZeroTipEstimate(analyzedBlocks, allTips);
    }

    const tipStats = calculateTipStats(allTips);
    return {
      ...tipStats,
      metrics: {
        blocksAnalyzed: analyzedBlocks,
        transactionsTipsFound: allTips,
      },
    };
  } catch (error) {
    throw new LibraryError(
      `Failed to analyze tip statistics (parallel): ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Analyzes tip statistics from recent blocks using sequential requests with early exit.
 * This version processes blocks one by one and can exit early when enough
 * transactions are found, which may be more efficient when batching is not available.
 *
 * @param provider RPC provider for blockchain communication
 * @param blockIdentifier Starting block for analysis
 * @param options Configuration options for the analysis
 * @returns Promise resolving to TipEstimate object (returns zero values if insufficient data)
 */
async function getTipStatsSequential(
  provider: ProviderInterface,
  blockIdentifier: BlockIdentifier,
  options: TipAnalysisOptions
): Promise<TipEstimate> {
  const { maxBlocks = 3, minTxsNecessary = 10, includeZeroTips = true } = options;

  try {
    // Determine the starting block number
    const startingBlockNumber = await getStartingBlockNumber(provider, blockIdentifier);
    const blockNumbers = generateBlockNumbers(startingBlockNumber, maxBlocks);

    const allTips: bigint[] = [];
    let blocksAnalyzed = 0;

    // Process blocks sequentially to avoid overwhelming the RPC and enable early exit
    // eslint-disable-next-line no-restricted-syntax
    for (const blockNumber of blockNumbers) {
      // eslint-disable-next-line no-await-in-loop
      const blockData = await fetchBlockSafely(provider, blockNumber);

      if (blockData) {
        blocksAnalyzed += 1;
        const tips = extractTipsFromBlock(blockData, includeZeroTips);
        allTips.push(...tips);

        // Early exit if we have enough transactions
        if (allTips.length >= minTxsNecessary) {
          break;
        }
      }
    }

    // Handle insufficient transaction data
    if (allTips.length < minTxsNecessary) {
      logger.error(
        `Insufficient transaction data: found ${allTips.length} V3 transactions with tips in ${blocksAnalyzed} blocks ` +
          `(block range: ${Math.max(0, startingBlockNumber - maxBlocks + 1)}-${startingBlockNumber}). ` +
          `Required: ${minTxsNecessary} transactions. Consider reducing minTxsNecessary or increasing maxBlocks.`
      );
      return createZeroTipEstimate(blocksAnalyzed, allTips);
    }

    const tipStats = calculateTipStats(allTips);
    return {
      ...tipStats,
      metrics: {
        blocksAnalyzed,
        transactionsTipsFound: allTips,
      },
    };
  } catch (error) {
    throw new LibraryError(
      `Failed to analyze tip statistics (sequential): ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Analyzes tip statistics from recent blocks to help determine optimal tip amounts.
 *
 * This function examines V3 invoke transactions across multiple recent blocks to calculate
 * minimum, maximum, and average tip amounts. This data can be used to determine an
 * appropriate tip for new transactions.
 *
 * **Performance Notes:**
 * - Automatically detects if your provider has batching enabled
 * - When batching is enabled, all block requests are made in parallel and automatically
 *   batched into a single HTTP request for maximum efficiency
 * - When batching is not enabled, requests are made sequentially with early exit capability
 *
 * @param provider - RPC provider for blockchain communication
 * @param blockIdentifier - Starting block for analysis (goes backwards from this block)
 * @param options - Configuration options for the analysis
 * @returns Promise resolving to TipEstimate object
 *
 * @throws {Error} When invalid parameters are provided
 * @throws {LibraryError} When RPC calls fail, data is invalid, or insufficient transaction data is found
 *
 * @example
 * ```typescript
 * import { RpcProvider } from 'starknet';
 *
 * // Create provider with batching for optimal performance
 * const provider = new RpcProvider({
 *   nodeUrl: 'your_node_url',
 *   batch: 50  // 50ms batch interval - automatically detected and used
 * });
 *
 * // Basic usage - automatically uses best strategy
 * const tipStats = await getTipStatsFromBlocks(provider, 'latest');
 * console.log(`Recommended tip (median): ${tipStats.recommendedTip}`);
 * console.log(`90th percentile tip: ${tipStats.p90Tip}`);
 * console.log(`95th percentile tip: ${tipStats.p95Tip}`);
 *
 * // Advanced usage with custom options
 * const tipStats = await getTipStatsFromBlocks(
 *   provider,
 *   'latest',
 *   {
 *     maxBlocks: 10,
 *     minTxsNecessary: 5,
 *     includeZeroTips: true
 *   }
 * );
 *
 * // Check if we have sufficient data
 * if (tipStats.recommendedTip === 0n) {
 *   console.log('Insufficient transaction data for reliable tip estimation');
 * } else {
 *   console.log(`Recommended tip: ${tipStats.recommendedTip}`);
 *   console.log(`Average tip: ${tipStats.averageTip}`);
 *   console.log(`Median tip: ${tipStats.medianTip}`);
 *   console.log(`Mode tip: ${tipStats.modeTip}`);
 *   console.log(`Min tip: ${tipStats.minTip}, Max tip: ${tipStats.maxTip}`);
 *   console.log(`P90 tip: ${tipStats.p90Tip} (90% of tips are below this)`);
 *   console.log(`P95 tip: ${tipStats.p95Tip} (95% of tips are below this)`);
 *
 *   // Access performance metrics if available
 *   if (tipStats.metrics) {
 *     console.log(`Analyzed ${tipStats.metrics.transactionsFound} transactions`);
 *     console.log(`Across ${tipStats.metrics.blocksAnalyzed} blocks`);
 *   }
 * }
 *
 * // Using specific block number
 * const blockNumber = 650000;
 * const historicalTips = await getTipStatsFromBlocks(provider, blockNumber);
 * ```
 */
export async function getTipStatsFromBlocks(
  provider: ProviderInterface,
  blockIdentifier: BlockIdentifier = BlockTag.LATEST,
  options: TipAnalysisOptions = {}
): Promise<TipEstimate> {
  const { maxBlocks = 3, minTxsNecessary = 10 } = options;

  // Input validation
  assert(Number.isInteger(maxBlocks), 'maxBlocks parameter must be an integer');
  assert(maxBlocks >= 1, 'maxBlocks parameter must be greater than or equal to 1');
  assert(maxBlocks <= 100, 'maxBlocks parameter must be less than or equal to 100 for performance');
  assert(Number.isInteger(minTxsNecessary), 'minTxsNecessary parameter must be an integer');
  assert(minTxsNecessary >= 1, 'minTxsNecessary parameter must be greater than or equal to 1');

  // Automatically choose the best strategy based on batching capability
  if (isBatchingEnabled(provider)) {
    return getTipStatsParallel(provider, blockIdentifier, options);
  }
  return getTipStatsSequential(provider, blockIdentifier, options);
}
