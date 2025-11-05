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
