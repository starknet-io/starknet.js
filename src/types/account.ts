import BN from 'bn.js';

import { EstimateFeeResponse } from './api';

export interface EstimateFee extends EstimateFeeResponse {
  suggestedMaxFee: BN;
}
