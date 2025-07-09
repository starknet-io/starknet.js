import { config } from '../global/config';
import { NetworkName, RPC_DEFAULT_NODES, SupportedRpcVersion } from '../global/constants';
import { logger } from '../global/logger';
import {
  BlockIdentifier,
  BlockTag,
  CompiledContract,
  CompiledSierra,
  ContractClass,
  LegacyContractClass,
  SierraContractClass,
} from '../types';
import { isSierra } from './contract';
import { formatSpaces } from './hash';
import { parse, stringify } from './json';
import { isHex, toHex } from './num';
import { toApiVersion } from './resolve';
import { isDecimalString } from './shortString';
import { compressProgram } from './stark';
import { isBigInt, isNumber, isString } from './typed';

/**
 * Helper - Async Sleep for 'delay' time
 *
 * @param {number} delay - Number of milliseconds to delay
 * @returns {Promise<unknown>}
 * @example
 * ```typescript
 * await provider.wait(1000) // 1000 milliseconds == 1 second
 * ```
 */
export function wait(delay: number): Promise<unknown> {
  return new Promise((res) => {
    setTimeout(res, delay);
  });
}

/**
 * Create Sierra compressed Contract Class from a given Compiled Sierra
 *
 * CompiledSierra -> SierraContractClass
 *
 * @param {CompiledSierra} contract sierra code from the Cairo compiler
 * @returns {SierraContractClass} compressed Sierra
 * @example
 * ```typescript
 * const result = provider.createSierraContractClass({
    "sierra_program": [
        "0x1",
        "0x4",
        "0x0",
        "0x2",
        "0x4",
        "0x1",
        "0x3b4",
        "0x4c",
        "0x65",
        "0x52616e6765436865636b",...})
 * // result = {sierra_program: 'H4sIAAAAAAAAA6x9WZbsrI7uVGqd53qgb8ZynwzYY7jDv5JAAmxHZuQ+96yq/L0jIzEINZ8axP/5j/q/+j//+z/wH9f/o/p/zPbh+Iot49+u9v8G3//rTdDhDDF4Z0MKPthQ+m+S2v6n1S//638VvdXW2PQ6RvxuDG+jiybCXKJ7Hef6ZRi9E+Q89WmKLilfqbrsL6PUCf8...}
 * ```
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
 * Create a compressed contract from a given compiled Cairo 0 & 1 contract or a string.
 * @param {CompiledContract | string} contract - Compiled Cairo 0 or Cairo 1 contract, or string
 * @returns {ContractClass} Cairo 0 or Cairo 1 compressed contract
 * @example
 * ```typescript
 * const result = provider.parseContract({
    "sierra_program": [
        "0x1",
        "0x4",
        "0x0",
        "0x2",
        "0x4",
        "0x1",
        "0x3b4",
        "0x4c",
        "0x65",
        "0x52616e6765436865636b",...})
 * // result = {sierra_program: 'H4sIAAAAAAAAA6x9WZbsrI7uVGqd53qgb8ZynwzYY7jDv5JAAmxHZuQ+96yq/L0jIzEINZ8axP/5j/q/+j//+z/wH9f/o/p/zPbh+Iot49+u9v8G3//rTdDhDDF4Z0MKPthQ+m+S2v6n1S//638VvdXW2PQ6RvxuDG+jiybCXKJ7Hef6ZRi9E+Q89WmKLilfqbrsL6PUCf8...}
 * ```
 */
export function parseContract(contract: CompiledContract | string): ContractClass {
  const parsedContract = isString(contract) ? (parse(contract) as CompiledContract) : contract;

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
 * @param {NetworkName} networkName NetworkName
 * @param {boolean} mute mute public node warning
 * @returns {string} default node url
 * @example
 * ```typescript
 * const result= provider.getDefaultNodeUrl(constants.NetworkName.SN_MAIN,false);
 * // console : "Using default public node url, please provide nodeUrl in provider options!"
 * // result = "https://starknet-mainnet.public.blastapi.io/rpc/v0_7"
 * ```
 */
export const getDefaultNodeUrl = (
  networkName?: NetworkName,
  mute: boolean = false,
  rpcVersion?: SupportedRpcVersion
): string => {
  if (!mute) {
    logger.info('Using default public node url, please provide nodeUrl in provider options!');
  }
  const rpcNodes = getDefaultNodes(rpcVersion ?? config.get('rpcVersion'));

  const nodes = rpcNodes[networkName ?? NetworkName.SN_SEPOLIA];
  const randIdx = Math.floor(Math.random() * nodes.length);
  return nodes[randIdx];
};

/**
 * return Defaults RPC Nodes endpoints
 */
export function getDefaultNodes(rpcVersion: SupportedRpcVersion) {
  const nodes: any = { ...RPC_DEFAULT_NODES };

  Object.keys(nodes).forEach(function (key, _) {
    nodes[key] = nodes[key].map((it: any) => {
      return `${it}${toApiVersion(rpcVersion)}`;
    });
  });

  return nodes;
}

/**
 * Return supported RPC versions
 * @returns {SupportedRpcVersion[]} available RPC versions
 */
export function getSupportedRpcVersions(): SupportedRpcVersion[] {
  return [...new Set(Object.values(SupportedRpcVersion))];
}

export const validBlockTags = Object.values(BlockTag);

/**
 * This class is formatting the identifier of a block.
 *
 * hex string and BigInt are detected as block hashes. identifier return { block_hash: hash }
 *
 * decimal string and number are detected as block numbers. identifier return { block_number: number }
 *
 * text string are detected as block tag. identifier return tag
 *
 * null is detected as 'pending' block tag. identifier return 'pending'
 * @example
 * ```typescript
 * const result = new provider.Block(null).identifier;
 * // result = "pending"
 * ```
 */
export class Block {
  /**
   * @param {BlockIdentifier} hash if not null, contains the block hash
   */
  hash: BlockIdentifier = null;

  /**
   * @param {BlockIdentifier} number if not null, contains the block number
   */
  number: BlockIdentifier = null;

  /**
   * @param {BlockIdentifier} tag if not null, contains "pending" or "latest"
   */
  tag: BlockIdentifier = null;

  private setIdentifier(__identifier: BlockIdentifier): void {
    if (isString(__identifier)) {
      if (isDecimalString(__identifier)) {
        this.number = parseInt(__identifier, 10);
      } else if (isHex(__identifier)) {
        this.hash = __identifier;
      } else if (validBlockTags.includes(__identifier as BlockTag)) {
        this.tag = __identifier;
      } else {
        throw TypeError(`Block identifier unmanaged: ${__identifier}`);
      }
    } else if (isBigInt(__identifier)) {
      this.hash = toHex(__identifier);
    } else if (isNumber(__identifier)) {
      this.number = __identifier;
    } else {
      this.tag = BlockTag.PRE_CONFIRMED;
    }

    if (isNumber(this.number) && this.number < 0) {
      throw TypeError(`Block number (${this.number}) can't be negative`);
    }
  }

  /**
   * Create a Block instance
   * @param {BlockIdentifier} _identifier  hex string and BigInt are detected as block hashes.
   * decimal string and number are detected as block numbers.
   * text string are detected as block tag.
   * null is considered as a 'pending' block tag.
   */
  constructor(_identifier: BlockIdentifier) {
    this.setIdentifier(_identifier);
  }

  // TODO: fix any
  /**
   * @returns {any} the identifier as a string
   * @example
   * ```typescript
   * const result = new provider.Block(123456n).queryIdentifier;
   * // result = "blockHash=0x1e240"
   * ```
   */
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
  /**
   * @returns {any} the identifier as an object
   * @example
   * ```typescript
   * const result = new provider.Block(56789).identifier;
   * // result = { block_number: 56789 }
   * ```
   */
  get identifier(): any {
    if (this.number !== null) {
      return { block_number: this.number };
    }

    if (this.hash !== null) {
      return { block_hash: this.hash };
    }

    return this.tag;
  }

  /**
   * change the identifier of an existing Block instance
   * @example
   * ```typescript
   * const myBlock = new provider.Block("latest");
   * myBlock.identifier ="0x3456789abc";
   * const result = myBlock.identifier;
   * // result = { block_hash: '0x3456789abc' }
   * ```
   */
  set identifier(_identifier: BlockIdentifier) {
    this.setIdentifier(_identifier);
  }

  valueOf = () => this.number;

  toString = () => this.hash;
}
