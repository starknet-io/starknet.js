# Type Alias: TipEstimate

> **TipEstimate** = `object`

Defined in: [src/provider/modules/tip.ts:22](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/modules/tip.ts#L22)

Result of provider.getTipStatsFromBlocks().

## Param

minimum tip encountered in the analyzed blocks.

## Param

maximum tip encountered in the analyzed blocks.

## Param

average tip encountered in the analyzed blocks.

## Param

median (middle value) tip encountered in the analyzed blocks.

## Param

mode (most frequent) tip encountered in the analyzed blocks.

## Param

suggested tip amount (median tip) for optimal inclusion probability.

## Param

90th percentile tip (90% of tips are below this value).

## Param

95th percentile tip (95% of tips are below this value).

## Param

Optional performance metrics for the analysis.

## Properties

### minTip

> **minTip**: `bigint`

Defined in: [src/provider/modules/tip.ts:23](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/modules/tip.ts#L23)

---

### maxTip

> **maxTip**: `bigint`

Defined in: [src/provider/modules/tip.ts:24](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/modules/tip.ts#L24)

---

### averageTip

> **averageTip**: `bigint`

Defined in: [src/provider/modules/tip.ts:25](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/modules/tip.ts#L25)

---

### medianTip

> **medianTip**: `bigint`

Defined in: [src/provider/modules/tip.ts:26](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/modules/tip.ts#L26)

---

### modeTip

> **modeTip**: `bigint`

Defined in: [src/provider/modules/tip.ts:27](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/modules/tip.ts#L27)

---

### recommendedTip

> **recommendedTip**: `bigint`

Defined in: [src/provider/modules/tip.ts:28](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/modules/tip.ts#L28)

---

### p90Tip

> **p90Tip**: `bigint`

Defined in: [src/provider/modules/tip.ts:29](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/modules/tip.ts#L29)

---

### p95Tip

> **p95Tip**: `bigint`

Defined in: [src/provider/modules/tip.ts:30](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/modules/tip.ts#L30)

---

### metrics?

> `optional` **metrics?**: `object`

Defined in: [src/provider/modules/tip.ts:31](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/modules/tip.ts#L31)

#### blocksAnalyzed

> **blocksAnalyzed**: `number`

#### transactionsTipsFound

> **transactionsTipsFound**: `bigint`[]
