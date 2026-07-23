/**
 * Test Artifacts & Environment Configuration
 *
 * This module provides:
 * - Compiled contract artifacts
 * - Precomputed class hashes for common contracts
 * - Conditional test suite helpers (describeIf*, testIf*)
 */
import { config, hash, isVersion } from '../../src';
import { CONTRACTS } from './helpers/contract';

export { CONTRACTS };

config.set('logLevel', 'ERROR');
if (process.env.IS_DEVNET === 'true') {
  // accelerate the tests when running locally devnet
  config.set('channelDefaults.options.transactionRetryIntervalFallback', 0);
}
export const { TEST_WS_URL } = process.env;

const describeIf = (condition: boolean) => (condition ? describe : describe.skip);
export const describeIfRpc = describeIf(process.env.IS_RPC === 'true');
export const describeIfNotDevnet = describeIf(process.env.IS_DEVNET === 'false');
export const describeIfDevnet = describeIf(process.env.IS_DEVNET === 'true');
export const describeIfTestnet = describeIf(process.env.IS_TESTNET === 'true');
// Match the whole spec family: nodes report patch and pre-release versions
// (ex. '0.10.2', '0.10.3-rc.0'), which are all served by the 0.10 channel.
const specVersion = process.env.RPC_SPEC_VERSION ?? '';
export const describeIfRpc010 = describeIf(isVersion('0.10', specVersion));
export const describeIfRpc09 = describeIf(isVersion('0.9', specVersion));

export const erc20ClassHash: string = hash.computeContractClassHash(CONTRACTS.Erc20Oz100.sierra); // Cairo 1
export const C1v2ClassHash: string = hash.computeContractClassHash(CONTRACTS.C1v2.sierra); // Cairo 1
export const wrongClassHash = '0x000000000000000000000000000000000000000000000000000000000000000';
