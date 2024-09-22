import { Abi, FunctionAbi, RawArgs } from '../../../types';
import { isCairo1Abi } from '../cairo';
import { AbiParserInterface } from './interface';
import { AbiParser1 } from './parser-0-1.1.0';
import { AbiParser2 } from './parser-2.0.0';

/**
 * Creates ABI parser
 *
 * @param {Abi} abi
 * @returns {AbiParserInterface} abi parser interface
 *
 * @example
 * const abiParser2 = createAbiParser([getInterfaceAbi('struct')]);
 * // abiParser2 instanceof AbiParser2 === true
 *
 * const abiParser1 = createAbiParser([getFunctionAbi('struct')]);
 * // abiParser1 instanceof AbiParser1 === true
 */
export function createAbiParser(abi: Abi): AbiParserInterface {
  const version = getAbiVersion(abi);
  if (version === 0 || version === 1) {
    return new AbiParser1(abi);
  }
  if (version === 2) {
    return new AbiParser2(abi);
  }
  throw Error(`Unsupported ABI version ${version}`);
}

/**
 * Retrieves ABI version
 *
 * @param {Abi} abi
 * @returns {1 | 2 | 0} abi 1, 2 or 0 version
 *
 * @example
 * // Example 1: Return ABI version 2
 * const version = getAbiVersion([getInterfaceAbi()]);
 * // version === 2
 *
 * // Example 2: Return ABI version 1
 * const version = getAbiVersion([getInterfaceAbi('core::bool')]);
 * // version === 1
 *
 * // Example 3: Return ABI version 0
 * const version = getAbiVersion([getInterfaceAbi('felt')]);
 * // version === 0
 */
export function getAbiVersion(abi: Abi): 1 | 2 | 0 {
  if (abi.find((it) => it.type === 'interface')) return 2;
  if (isCairo1Abi(abi)) return 1;
  return 0;
}

/**
 * Checks if no constructor valid
 *
 * @param {string} method
 * @param {RawArgs} argsCalldata
 * @param {FunctionAbi} abiMethod
 * @returns boolean
 *
 * @example
 * const result1 = isNoConstructorValid('constructor', [])
 * // result1 === true
 * const result2 = isNoConstructorValid('test', ['test'])
 * // result2 === false
 */
export function isNoConstructorValid(
  method: string,
  argsCalldata: RawArgs,
  abiMethod?: FunctionAbi
): boolean {
  // No constructor in abi and validly empty args
  return method === 'constructor' && !abiMethod && !argsCalldata.length;
}
