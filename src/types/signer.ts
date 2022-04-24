import { StarknetChainId } from '../constants';
import { InvocationsDetails } from './lib';

export interface InvocationsSignerDetails extends Required<InvocationsDetails> {
  walletAddress: string;
  chainId: StarknetChainId;
}
