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
