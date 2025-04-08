import { NetworkName, PAYMASTER_RPC_NODES } from '../global/constants';
import { logger } from '../global/logger';

/**
 * Return randomly select available public paymaster node url
 * @param {NetworkName} networkName NetworkName
 * @param {boolean} mute mute public node warning
 * @returns {string} default node url
 */
export const getDefaultPaymasterNodeUrl = (
  networkName?: NetworkName,
  mute: boolean = false
): string => {
  if (!mute) {
    logger.info('Using default public node url, please provide nodeUrl in provider options!');
  }
  const nodes = PAYMASTER_RPC_NODES[networkName ?? NetworkName.SN_SEPOLIA];
  const randIdx = Math.floor(Math.random() * nodes.length);
  return nodes[randIdx];
};
