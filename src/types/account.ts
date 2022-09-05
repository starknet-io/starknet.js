import BN from 'bn.js';

import { BlockIdentifier } from '../provider/utils';
import { BigNumberish } from '../utils/number';
import { EstimateFeeResponse } from './provider';

export interface EstimateFee extends EstimateFeeResponse {
  suggestedMaxFee: BN;
}

export interface EstimateFeeDetails {
  nonce?: BigNumberish;
  blockIdentifier?: BlockIdentifier;
}
