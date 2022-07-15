import BN from 'bn.js';

import { BlockIdentifier } from '../provider/utils';
import { BigNumberish } from '../utils/number';

export interface EstimateFee {
  amount: BN;
  unit: string;
  suggestedMaxFee: BN;
}

export interface EstimateFeeDetails {
  nonce?: BigNumberish;
  blockIdentifier?: BlockIdentifier;
}
