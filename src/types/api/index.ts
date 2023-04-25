import { BigNumberish } from '../../utils/num';
import { Signature } from '../lib';

export type Calldata = string[] & { readonly compiled?: boolean };

export type Overrides = {
  maxFee?: BigNumberish;
  nonce?: BigNumberish;
  signature?: Signature;
  parseRequest?: Boolean;
};
