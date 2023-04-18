import { BigNumberish } from '../../utils/num';
import { Signature } from '../lib';

export type Calldata = string[];

export type Overrides = {
  maxFee?: BigNumberish;
  nonce?: BigNumberish;
  signature?: Signature;
  parseRequest?: Boolean;
};
