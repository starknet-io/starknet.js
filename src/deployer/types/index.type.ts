import type { Call } from '../../types';

/**
 * Interface for Deployer contract payload
 */
export type DeployerCall = {
  /** an array of Call */
  calls: Call[];
  /** an array of addresses made of hex string */
  addresses: string[];
};

export type DeployContractUDCResponse = {
  contract_address: string;
  transaction_hash: string;
  address: string;
  deployer: string;
  unique: string;
  classHash: string;
  calldata_len: string;
  calldata: Array<string>;
  salt: string;
};
