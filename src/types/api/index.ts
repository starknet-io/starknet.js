import { BigNumberish } from '../../utils/number';
import { Signature } from '../lib';

export type RawArgs = {
  [inputName: string]: string | string[] | { type: 'struct'; [k: string]: BigNumberish };
};

export type Calldata = string[];

export type Overrides = {
  maxFee?: BigNumberish;
  nonce?: BigNumberish;
  signature?: Signature;
};

export * from './gateway';
export * from './rpc';
