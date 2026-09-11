# Type Alias: TipAnalysisOptions

> **TipAnalysisOptions** = `object`

Defined in: [src/provider/modules/tip.ts:42](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/modules/tip.ts#L42)

Options for customizing tip analysis behavior.

## Properties

### maxBlocks?

> `optional` **maxBlocks?**: `number`

Defined in: [src/provider/modules/tip.ts:47](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/modules/tip.ts#L47)

Maximum number of blocks to analyze going backwards from the starting block.

#### Default

```ts
3;
```

---

### minTxsNecessary?

> `optional` **minTxsNecessary?**: `number`

Defined in: [src/provider/modules/tip.ts:52](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/modules/tip.ts#L52)

Minimum number of transactions required to generate reliable statistics.

#### Default

```ts
10;
```

---

### includeZeroTips?

> `optional` **includeZeroTips?**: `boolean`

Defined in: [src/provider/modules/tip.ts:57](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/modules/tip.ts#L57)

Whether to include transactions with zero tips in the analysis.

#### Default

```ts
true;
```
