import { Abi, FunctionAbi, RawArgs } from '../../../types';
import { isCairo1Abi } from '../cairo';
import { AbiParserInterface } from './interface';
import { AbiParser0 } from './parser-0';
import { AbiParser1 } from './parser-1';
import { AbiParser2 } from './parser-2';
import { ParsingStrategy } from './parsingStrategy';
import type { CairoTypeStrategy } from './cairoTypeStrategy.type';

export { AbiParser2 };
export { AbiParser1 };
export { AbiParser0 };
export { AbiParserInterface };
export * from './parsingStrategy';
// The strategy the Cairo type classes run on, the shape a caller writes to override it, and the
// two factories that turn a contract's own structs and enums into one. All of it has to be
// reachable: `new CairoFixedArray(items, type, strategy)` cannot be called without a strategy, the
// second argument of `new CallData(abi, strategy)` is this shape from Cairo 1 on, and a
// `CairoStruct` built for a contract's struct needs a strategy carrying that struct's name — which
// only `structStrategy` produces.
//
// `isCairoTypeStrategy` stays in: it tells this shape from the one Cairo 0 uses, and it goes with
// that island.
export {
  cairoTypeStrategy,
  enumStrategy,
  fastCairoTypeStrategy,
  structStrategy,
} from './cairoTypeStrategy';
export * from './cairoTypeStrategy.type';

/**
 * Creates ABI parser
 *
 * A Cairo 0 abi gets its own parser, kept apart from the Cairo 1 ones so that those can move to
 * the Cairo type classes without dragging along types — `felt`, `felt*` — that no class registers.
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
 *
 * const abiParser0 = createAbiParser([getFunctionAbi('felt')]);
 * // abiParser0 instanceof AbiParser0 === true
 */
export function createAbiParser(
  abi: Abi,
  parsingStrategy?: ParsingStrategy | CairoTypeStrategy
): AbiParserInterface {
  const version = getAbiVersion(abi);
  if (version === 0) {
    return new AbiParser0(abi, parsingStrategy);
  }
  if (version === 1) {
    return new AbiParser1(abi, parsingStrategy);
  }
  if (version === 2) {
    return new AbiParser2(abi, parsingStrategy);
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
