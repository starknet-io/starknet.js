import type { BlockNumber } from '../types';
import { BigNumberish, toBN, toHex } from '../utils/number';

/**
 *
 * [Reference](https://github.com/starkware-libs/cairo-lang/blob/fc97bdd8322a7df043c87c371634b26c15ed6cee/src/starkware/starknet/services/api/feeder_gateway/feeder_gateway_client.py#L148-L153)
 *
 * @param hashValue
 * @param hashField
 */
export function formatHash(hashValue: BigNumberish): string {
  if (typeof hashValue === 'string') return hashValue;
  return toHex(toBN(hashValue));
}

/**
 *
 * [Reference](https://github.com/starkware-libs/cairo-lang/blob/fc97bdd8322a7df043c87c371634b26c15ed6cee/src/starkware/starknet/services/api/feeder_gateway/feeder_gateway_client.py#L156-L161)
 * @param txHash
 * @param txId
 */
export function txIdentifier(txHash?: BigNumberish, txId?: BigNumberish): string {
  if (!txHash) {
    return `transactionId=${JSON.stringify(txId)}`;
  }
  const hashString = formatHash(txHash);

  return `transactionHash=${hashString}`;
}

// hex string and BN are detected as block hashes
// decimal string and number are detected as block numbers
// null appends nothing to the request url
export type BlockIdentifier = BlockNumber | BigNumberish;
type BlockIdentifierObject =
  | { type: 'BLOCK_NUMBER'; data: BlockNumber }
  | { type: 'BLOCK_HASH'; data: BigNumberish };

/**
 * Identifies the block to be queried.
 *
 * @param blockIdentifier - block identifier
 * @returns block identifier object
 */
export function getBlockIdentifier(blockIdentifier: BlockIdentifier): BlockIdentifierObject {
  if (blockIdentifier === null || blockIdentifier === 'latest') {
    return { type: 'BLOCK_NUMBER', data: 'latest' }; // default to latest block
  }
  if (blockIdentifier === 'pending') {
    return { type: 'BLOCK_NUMBER', data: 'pending' };
  }
  if (typeof blockIdentifier === 'number') {
    return { type: 'BLOCK_NUMBER', data: blockIdentifier };
  }
  if (typeof blockIdentifier === 'string' && blockIdentifier.startsWith('0x')) {
    return { type: 'BLOCK_HASH', data: blockIdentifier };
  }
  if (typeof blockIdentifier === 'string' && !Number.isNaN(parseInt(blockIdentifier, 10))) {
    return { type: 'BLOCK_NUMBER', data: parseInt(blockIdentifier, 10) };
  }
  if (typeof blockIdentifier === 'string') {
    throw new Error(`Invalid block identifier: ${blockIdentifier}`);
  }
  return { type: 'BLOCK_HASH', data: blockIdentifier };
}

/**
 * Gets the block identifier for API request
 *
 * [Reference](https://github.com/starkware-libs/cairo-lang/blob/fc97bdd8322a7df043c87c371634b26c15ed6cee/src/starkware/starknet/services/api/feeder_gateway/feeder_gateway_client.py#L164-L173)
 *
 * @param blockIdentifier
 * @returns block identifier for API request
 */
export function getFormattedBlockIdentifier(blockIdentifier: BlockIdentifier = null): string {
  const blockIdentifierObject = getBlockIdentifier(blockIdentifier);
  if (blockIdentifierObject.type === 'BLOCK_NUMBER' && blockIdentifierObject.data === null) {
    return '';
  }
  if (blockIdentifierObject.type === 'BLOCK_NUMBER') {
    return `blockNumber=${blockIdentifierObject.data}`;
  }
  return `blockHash=${toHex(toBN(blockIdentifierObject.data))}`;
}
