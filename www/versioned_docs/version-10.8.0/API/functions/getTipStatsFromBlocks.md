# Function: getTipStatsFromBlocks()

> **getTipStatsFromBlocks**(`provider`, `blockIdentifier?`, `options?`): `Promise`\<[`TipEstimate`](../type-aliases/TipEstimate.md)\>

Defined in: [src/provider/modules/tip.ts:482](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/modules/tip.ts#L482)

Analyzes tip statistics from recent blocks to help determine optimal tip amounts.

This function examines V3 invoke transactions across multiple recent blocks to calculate
minimum, maximum, and average tip amounts. This data can be used to determine an
appropriate tip for new transactions.

**Performance Notes:**

- Automatically detects if your provider has batching enabled
- When batching is enabled, all block requests are made in parallel and automatically
  batched into a single HTTP request for maximum efficiency
- When batching is not enabled, requests are made sequentially with early exit capability

## Parameters

### provider

[`ProviderInterface`](../classes/ProviderInterface.md)

RPC provider for blockchain communication

### blockIdentifier?

[`BlockIdentifier`](../type-aliases/BlockIdentifier.md) = `BlockTag.LATEST`

Starting block for analysis (goes backwards from this block)

### options?

[`TipAnalysisOptions`](../type-aliases/TipAnalysisOptions.md) = `{}`

Configuration options for the analysis

## Returns

`Promise`\<[`TipEstimate`](../type-aliases/TipEstimate.md)\>

Promise resolving to TipEstimate object

## Throws

When invalid parameters are provided

## Throws

When RPC calls fail, data is invalid, or insufficient transaction data is found

## Example

```typescript
import { RpcProvider } from 'starknet';

// Create provider with batching for optimal performance
const provider = new RpcProvider({
  nodeUrl: 'your_node_url',
  batch: 50, // 50ms batch interval - automatically detected and used
});

// Basic usage - automatically uses best strategy
const tipStats = await getTipStatsFromBlocks(provider, 'latest');
console.log(`Recommended tip (median): ${tipStats.recommendedTip}`);
console.log(`90th percentile tip: ${tipStats.p90Tip}`);
console.log(`95th percentile tip: ${tipStats.p95Tip}`);

// Advanced usage with custom options
const tipStats = await getTipStatsFromBlocks(provider, 'latest', {
  maxBlocks: 10,
  minTxsNecessary: 5,
  includeZeroTips: true,
});

// Check if we have sufficient data
if (tipStats.recommendedTip === 0n) {
  console.log('Insufficient transaction data for reliable tip estimation');
} else {
  console.log(`Recommended tip: ${tipStats.recommendedTip}`);
  console.log(`Average tip: ${tipStats.averageTip}`);
  console.log(`Median tip: ${tipStats.medianTip}`);
  console.log(`Mode tip: ${tipStats.modeTip}`);
  console.log(`Min tip: ${tipStats.minTip}, Max tip: ${tipStats.maxTip}`);
  console.log(`P90 tip: ${tipStats.p90Tip} (90% of tips are below this)`);
  console.log(`P95 tip: ${tipStats.p95Tip} (95% of tips are below this)`);

  // Access performance metrics if available
  if (tipStats.metrics) {
    console.log(`Analyzed ${tipStats.metrics.transactionsFound} transactions`);
    console.log(`Across ${tipStats.metrics.blocksAnalyzed} blocks`);
  }
}

// Using specific block number
const blockNumber = 650000;
const historicalTips = await getTipStatsFromBlocks(provider, blockNumber);
```
