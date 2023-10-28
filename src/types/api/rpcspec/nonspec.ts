/**
 * Types that are not in spec but are required for UX
 */

import { BLOCK_HASH, BLOCK_NUMBER, TXN, TXN_HASH } from './components';

export type TransactionWithHash = TXN & { transaction_hash: TXN_HASH };
export type BlockHashAndNumber = {
  block_hash: BLOCK_HASH;
  block_number: BLOCK_NUMBER;
};
