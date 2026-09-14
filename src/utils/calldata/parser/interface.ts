import { Abi, AbiEntry, Args, EventEntry, FunctionAbi, ParsedStruct } from '../../../types';
import type { CairoTypeStrategy } from './cairoTypeStrategy.type';

/**
 * Abi parser interface
 *
 * Beyond reading the abi's shape, a parser is what turns a value into felts and reads one back.
 * Both directions go through `parseRequestField` and `parseResponse`, so that a caller — `CallData`,
 * `parseEvents` — never has to know which parser it holds, nor how that one serializes.
 */
export abstract class AbiParserInterface {
  /**
   * The strategies this parser drives the Cairo type classes with, assembled from the abi.
   *
   * Reachable because it is the only way to get a strategy that knows a contract's own types: the
   * language's types are in `cairoTypeStrategy`, but a struct or a custom enum is keyed by the
   * name the contract chose, and this is where those names are registered. Building a
   * `CairoStruct` or a `CairoArray` over one of them takes what is here:
   *
   * ```typescript
   * const strategies = myCallData.parser.parsingStrategies;
   * const points = new CairoArray(list, 'core::array::Array::<my::Point>', strategies);
   * ```
   *
   * Empty on a Cairo 0 parser, which serializes without those classes — never absent, so that a
   * caller reading it does not have to prove it exists before using it.
   */
  abstract parsingStrategies: CairoTypeStrategy[];

  /**
   * Helper to calculate inputs length from abi
   * @param abiMethod FunctionAbi
   * @return number
   */
  public abstract methodInputsLength(abiMethod: FunctionAbi): number;

  /**
   * get method definition from abi
   * @param name string
   * @returns FunctionAbi | undefined
   */
  public abstract getMethod(name: string): FunctionAbi | undefined;

  /**
   * Return Abi in legacy format
   * @return Abi
   */
  public abstract getLegacyFormat(): Abi;

  /**
   * Check the arguments of a method before any of them is serialized
   *
   * Only a parser that does not build Cairo types has anything to do here: where those classes are
   * what serializes, they check as they build, and checking beforehand would build twice.
   * @param abiMethod the method the arguments are meant for
   * @param args the arguments, in the abi's order
   */
  public abstract validateRequestFields(abiMethod: FunctionAbi, args: any[]): void;

  /**
   * Serialize one argument to the felts a contract call carries
   * @param value the argument to serialize
   * @param input the abi entry this argument stands for, whose name the errors quote
   * @returns string | string[]
   */
  public abstract parseRequestField(value: unknown, input: AbiEntry): string | string[];

  /**
   * Read one value off a contract response, advancing the iterator past it
   * @param responseIterator the response felts, positioned on this value
   * @param output the abi entry describing what to read
   * @param parsedResult what has been read so far, where a Cairo 0 array finds its `${name}_len`
   * @returns any
   */
  public abstract parseResponse(
    responseIterator: Iterator<string>,
    output: AbiEntry | EventEntry,
    parsedResult?: Args | ParsedStruct
  ): any;
}
