import { BigNumberish } from '../utils/number';
import { Invocation } from './lib';

export interface TransactionDetails extends Omit<Invocation, 'nonce' | 'signature'> {
  walletAddress: string;
  nonce: BigNumberish;
}
