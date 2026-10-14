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
// `isCairoTypeStrategy` stays in: it only tells this shape from the one Cairo 0 uses.
export {
  cairoTypeStrategy,
  enumStrategy,
  fastCairoTypeStrategy,
  structStrategy,
} from './cairoTypeStrategy';
export * from './cairoTypeStrategy.type';

/**
 * Create the parser of an abi. It is chosen from the format of the abi ({@link getAbiVersion}),
 * not from the version of Cairo.
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
  // Cairo 0 specific: when Cairo 0 support is dropped, if Starknet still holds Cairo 0 contracts,
  // replace this branch by a clear error; otherwise remove it.
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
 * Get the format of an abi, which tells which parser reads it: {@link AbiParser0},
 * {@link AbiParser1} or {@link AbiParser2}. It is the shape of the abi, not the version of Cairo.
 * - 0: a Cairo 0 abi.
 * - 1: a Cairo 1 abi with its functions at the top level. It comes from a Cairo V1 contract, or
 *   from a Cairo V2 contract with no `interface` entry: one with no external function, or one
 *   that declares its functions one by one with `#[external(v0)]`.
 * - 2: a Cairo 1 abi with `interface` entries, from a Cairo V2 contract written with interfaces.
 *
 * @param {Abi} abi
 * @returns {1 | 2 | 0} the format of the abi
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
  // Cairo 0 specific: when Cairo 0 support is dropped, keep this detection only if Starknet still
  // holds Cairo 0 contracts; otherwise an abi without an interface is always version 1.
  if (isCairo1Abi(abi)) return 1;
  return 0;
}

/**
 * Checks a constructor call to a contract that has no constructor in its abi:
 * it is valid only with an empty calldata, an empty array or an empty object.
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
 * const result3 = isNoConstructorValid('constructor', { a: 1 })
 * // result3 === false
 */
export function isNoConstructorValid(
  method: string,
  argsCalldata: RawArgs,
  abiMethod?: FunctionAbi
): boolean {
  // No constructor in abi and validly empty args. Counting the keys works for an array and for
  // an object: an object has no length, so `!argsCalldata.length` took a filled object for empty.
  return method === 'constructor' && !abiMethod && Object.keys(argsCalldata).length === 0;
}
