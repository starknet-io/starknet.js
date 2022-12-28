import { SignatureType as Signature } from '@noble/curves/abstract/weierstrass';

import { BigNumberish } from '../../utils/number';

export type Calldata = string[];

export type Overrides = {
  maxFee?: BigNumberish;
  nonce?: BigNumberish;
  signature?: Signature;
};
