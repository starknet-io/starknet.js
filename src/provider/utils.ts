/* eslint-disable max-classes-per-file */
import {
  BigNumberish,
  BlockIdentifier,
  BlockNumber,
  BlockTag,
  SequencerIdentifier,
} from '../types';
import { isHex, toHex } from '../utils/num';

/** @deprecated prefer importing from 'types' over 'provider/utils' */
export type { BlockIdentifier };

/**
 * [Reference](https://github.com/starkware-libs/cairo-lang/blob/fc97bdd8322a7df043c87c371634b26c15ed6cee/src/starkware/starknet/services/api/feeder_gateway/feeder_gateway_client.py#L148-L153)
 */
export function formatHash(hashValue: BigNumberish): string {
  if (typeof hashValue === 'string') return hashValue;
  return toHex(hashValue);
}

/**
 * [Reference](https://github.com/starkware-libs/cairo-lang/blob/fc97bdd8322a7df043c87c371634b26c15ed6cee/src/starkware/starknet/services/api/feeder_gateway/feeder_gateway_client.py#L156-L161)
 */
export function txIdentifier(txHash?: BigNumberish, txId?: BigNumberish): string {
  if (!txHash) {
    return `transactionId=${JSON.stringify(txId)}`;
  }
  const hashString = formatHash(txHash);

  return `transactionHash=${hashString}`;
}

export const validBlockTags = Object.values(BlockTag);

export class Block {
  hash: BlockIdentifier = null;

  number: BlockIdentifier = null;

  tag: BlockIdentifier = null;

  private setIdentifier(__identifier: BlockIdentifier) {
    if (typeof __identifier === 'string' && isHex(__identifier)) {
      this.hash = __identifier;
    } else if (typeof __identifier === 'bigint') {
      this.hash = toHex(__identifier);
    } else if (typeof __identifier === 'number') {
      this.number = __identifier;
    } else if (
      typeof __identifier === 'string' &&
      validBlockTags.includes(__identifier as BlockTag)
    ) {
      this.tag = __identifier;
    } else {
      // default
      this.tag = BlockTag.pending;
    }
  }

  constructor(_identifier: BlockIdentifier) {
    this.setIdentifier(_identifier);
  }

  // TODO: fix any
  get queryIdentifier(): any {
    if (this.number !== null) {
      return `blockNumber=${this.number}`;
    }

    if (this.hash !== null) {
      return `blockHash=${this.hash}`;
    }

    return `blockNumber=${this.tag}`;
  }

  // TODO: fix any
  get identifier(): any {
    if (this.number !== null) {
      return { block_number: this.number };
    }

    if (this.hash !== null) {
      return { block_hash: this.hash };
    }

    return this.tag;
  }

  set identifier(_identifier: BlockIdentifier) {
    this.setIdentifier(_identifier);
  }

  valueOf = () => this.number;

  toString = () => this.hash;

  get sequencerIdentifier(): SequencerIdentifier {
    return this.hash !== null
      ? { blockHash: this.hash as string }
      : { blockNumber: (this.number ?? this.tag) as BlockNumber };
  }
}
