import {
  BN_FEE_TRANSACTION_VERSION_3,
  HEX_STR_TRANSACTION_VERSION_3,
  NetworkName,
  RPC_GOERLI_NODES,
  RPC_MAINNET_NODES,
} from '../constants';
import {
  BigNumberish,
  BlockIdentifier,
  BlockNumber,
  BlockTag,
  CompiledContract,
  CompiledSierra,
  ContractClass,
  InvocationsDetailsWithNonce,
  LegacyContractClass,
  RPC,
  SequencerIdentifier,
  SierraContractClass,
  V3TransactionDetails,
} from '../types';
import { isSierra } from './contract';
import { formatSpaces } from './hash';
import { parse, stringify } from './json';
import { isHex, toHex } from './num';
import { compressProgram } from './stark';

/**
 * Helper - Async Sleep for 'delay' time
 */
export function wait(delay: number) {
  return new Promise((res) => {
    setTimeout(res, delay);
  });
}

/**
 * Create Sierra Contract Class from a given Compiled Sierra
 *
 * CompiledSierra -> SierraContractClass
 */
export function createSierraContractClass(contract: CompiledSierra): SierraContractClass {
  const result = { ...contract } as any;
  delete result.sierra_program_debug_info;
  result.abi = formatSpaces(stringify(contract.abi));
  result.sierra_program = formatSpaces(stringify(contract.sierra_program));
  result.sierra_program = compressProgram(result.sierra_program);
  return result;
}

/**
 * Create Contract Class from a given CompiledContract or string
 *
 * (CompiledContract or string) -> ContractClass
 */
export function parseContract(contract: CompiledContract | string): ContractClass {
  const parsedContract =
    typeof contract === 'string' ? (parse(contract) as CompiledContract) : contract;

  if (!isSierra(contract)) {
    return {
      ...parsedContract,
      ...('program' in parsedContract && { program: compressProgram(parsedContract.program) }),
    } as LegacyContractClass;
  }

  return createSierraContractClass(parsedContract as CompiledSierra);
}

/**
 * Return randomly select available public node
 * @param networkName NetworkName
 * @param mute mute public node warning
 * @returns default node url
 */
export const getDefaultNodeUrl = (networkName?: NetworkName, mute: boolean = false): string => {
  if (!mute)
    // eslint-disable-next-line no-console
    console.warn('Using default public node url, please provide nodeUrl in provider options!');
  const nodes = networkName === NetworkName.SN_MAIN ? RPC_MAINNET_NODES : RPC_GOERLI_NODES;
  const randIdx = Math.floor(Math.random() * nodes.length);
  return nodes[randIdx];
};

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

export function defStateUpdate(
  state: RPC.SPEC.STATE_UPDATE | RPC.SPEC.PENDING_STATE_UPDATE,
  accepted: (state: RPC.SPEC.STATE_UPDATE) => unknown,
  pending: (state: RPC.SPEC.PENDING_STATE_UPDATE) => unknown
) {
  if ('block_hash' in state) {
    return accepted(state);
  }
  return pending(state);
}

export function isV3Tx(details: InvocationsDetailsWithNonce): details is V3TransactionDetails {
  const version = details.version ? toHex(details.version) : HEX_STR_TRANSACTION_VERSION_3;
  return (
    version === HEX_STR_TRANSACTION_VERSION_3 || version === toHex(BN_FEE_TRANSACTION_VERSION_3)
  );
}
