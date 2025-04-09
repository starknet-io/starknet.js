/**
 * Common interface response
 * Intersection (sequencer response ∩ (∪ rpc responses))
 */

import { BigNumberish } from '../lib';
import { OutsideExecutionTypedData } from '../api/paymaster-rpc-spec/nonspec';

export type TypedDataWithTokenAmountAndPrice = {
  typedData: OutsideExecutionTypedData;
  tokenAmountAndPrice: {
    estimatedAmount: BigNumberish;
    priceInStrk: BigNumberish;
  };
};

export interface TokenData {
  tokenAddress: string;
  decimals: number;
  priceInStrk: BigNumberish;
}
