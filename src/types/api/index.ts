import { BigNumberish } from '../../utils/number/number';
import { Signature } from '../lib';

export type Calldata = string[];

export type Overrides = {
  maxFee?: BigNumberish;
  nonce?: BigNumberish;
  signature?: Signature;
  parseRequest: Boolean;
};
