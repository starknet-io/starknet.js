/**
 * Merge Latest and Letest-1 version Spec to create types that can be used across codebase that interact with both specifications
 */
import * as RPCSPEC07 from 'starknet-types-07';
import * as RPCSPEC08 from 'starknet-types-08';

import { OneOf } from '../helpers';

export type TransactionReceipt = OneOf<
  [RPCSPEC08.TransactionReceipt, RPCSPEC07.TransactionReceipt]
>;
