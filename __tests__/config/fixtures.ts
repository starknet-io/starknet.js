/**
 * Test Artifacts & Environment Configuration
 *
 * This module provides:
 * - Compiled contract artifacts
 * - Precomputed class hashes for common contracts
 * - Conditional test suite helpers (describeIf*, testIf*)
 */
import { config, hash } from '../../src';
import { autoDiscoverContracts } from './helpers/contract';

/**
 * Auto-discovered contracts from __mocks__ directory.
 * Contracts are automatically loaded based on their file structure:
 * - Cairo contracts: __mocks__/cairo/**\/*.sierra.json + matching .casm files
 * - Grouped contracts: __mocks__/{groupName}/**\/*.sierra.json + matching .casm files
 *   (e.g., StarknetId contracts in __mocks__/starknetId/)
 *
 * Contract keys are generated from filenames in PascalCase:
 * - cairo210.sierra.json -> Cairo210
 * - openzeppelin_EthAccount090.sierra.json -> OpenzeppelinEthAccount090
 * - starknetId directory -> StarknetId group
 */
export const CONTRACTS = autoDiscoverContracts();

config.set('logLevel', 'ERROR');

export const { TEST_WS_URL } = process.env;

const describeIf = (condition: boolean) => (condition ? describe : describe.skip);
export const describeIfRpc = describeIf(process.env.IS_RPC === 'true');
export const describeIfNotDevnet = describeIf(process.env.IS_DEVNET === 'false');
export const describeIfDevnet = describeIf(process.env.IS_DEVNET === 'true');
export const describeIfTestnet = describeIf(process.env.IS_TESTNET === 'true');
export const testIfRpc010 = describeIf(process.env.RPC_SPEC_VERSION === '0.10.0');
export const describeIfRpc09 = describeIf(process.env.RPC_SPEC_VERSION === '0.9.0');

export const erc20ClassHash: string = hash.computeContractClassHash(CONTRACTS.Erc20Oz100.sierra); // Cairo 1
export const C1v2ClassHash: string = hash.computeContractClassHash(CONTRACTS.C1v2.sierra); // Cairo 1
export const wrongClassHash = '0x000000000000000000000000000000000000000000000000000000000000000';
