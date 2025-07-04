/**
 * Result of provider.getTipStatsFromBlock().
 * @param {bigint} minTip - minimum tip encountered in the analyzed blocks.
 * @param {bigint} maxTip - maximum tip encountered in the analyzed blocks.
 * @param {bigint} averageTip - average tip encountered in the analyzed blocks.
 */
export type TipStats = {
  minTip: bigint;
  maxTip: bigint;
  averageTip: bigint;
};

/**
 * Result of provider.getGasPrices().
 * @param {bigint} l1DataGasPrice - price in fri of the layer 1 data gas price.
 * @param {bigint} l1GasPrice - price in fri of the layer 1 gas price.
 * @param {bigint} l2GasPrice - price in fri of the layer 2 gas price.
 */
export type GasPrices = {
  l1DataGasPrice: bigint;
  l1GasPrice: bigint;
  l2GasPrice: bigint;
};
