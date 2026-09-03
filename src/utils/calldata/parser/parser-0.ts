import {
  Abi,
  AbiEntry,
  AbiEntryType,
  AbiEnums,
  AbiStructs,
  Args,
  EventEntry,
  FunctionAbi,
  ParsedStruct,
} from '../../../types';
import { getAbiEnum, getAbiStruct } from '../calldataUtils';
import { isLen } from '../cairo';
import { parseCalldataField } from '../requestParser';
import responseParser from '../responseParser';
import validateFields from '../validate';
import assert from '../../assert';
import { isCairoTypeStrategy } from './cairoTypeStrategy';
import type { CairoTypeStrategy } from './cairoTypeStrategy.type';
import { AbiParserInterface } from './interface';
import { hdParsingStrategy, ParsingStrategy } from './parsingStrategy';

/**
 * The abi parser for Cairo 0 contracts.
 *
 * It is an exact twin of {@link AbiParser1} at the moment it was split off, and the split is the
 * whole point : a Cairo 0 abi speaks of `felt` and `felt*`, types the Cairo type classes do not
 * register, so it stays on the parsers that predate them while Cairo 1 moves over. Everything
 * Cairo 0 needs then sits in one place — this class, `requestParser.ts`, `responseParser.ts` and
 * `validate.ts` — and the day support for it is dropped, that is what gets deleted.
 *
 * A Cairo 0 abi is recognized by `getAbiVersion` returning 0, which happens when the first
 * function that has any input or output declares it with a type carrying no `::`.
 * @example
 * ```typescript
 * const abi = [
 *   {
 *     type: 'function',
 *     name: 'get_balance',
 *     inputs: [],
 *     outputs: [{ name: 'balance', type: 'felt' }],
 *     stateMutability: 'view',
 *   },
 * ];
 * const parser = new AbiParser0(abi);
 * const result = parser.getLegacyFormat() === abi;
 * // result = true
 * ```
 */
export class AbiParser0 implements AbiParserInterface {
  /**
   * The abi this parser was built from, untouched.
   * @example
   * ```typescript
   * const result = new AbiParser0(abi).abi.length;
   * // result = 1
   * ```
   */
  abi: Abi;

  /**
   * How each abi type is turned into felts and read back.
   * @example
   * ```typescript
   * const result = new AbiParser0(abi).parsingStrategy === hdParsingStrategy;
   * // result = true     (the default, when none is given)
   * ```
   */
  parsingStrategy: ParsingStrategy;

  /**
   * The strategies driving the Cairo type classes — none, here.
   *
   * This parser serializes through `requestParser` and `responseParser`, which predate those
   * classes, so there is nothing to carry. Empty rather than absent: the field is on the interface
   * so that reading `myCallData.parser.parsingStrategies` never has to be guarded, and a Cairo 0
   * abi has no `core::` type a strategy could hold anyway.
   * @example
   * ```typescript
   * const result = new AbiParser0(abi).parsingStrategies;
   * // result = []
   * ```
   */
  parsingStrategies: CairoTypeStrategy[] = [];

  /** The structs the abi declares, read once here rather than at every field. */
  protected readonly structs: AbiStructs;

  /** The enums the abi declares, `core::bool` excepted — a Cairo 0 abi declares none. */
  protected readonly enums: AbiEnums;

  /**
   * Build a parser for a Cairo 0 abi.
   *
   * The two strategy shapes share one argument across the three parsers, so this one refuses the
   * other's rather than ignore it : a `CairoTypeStrategy` registers `core::` types, which a Cairo 0
   * abi never names, and accepting it would do nothing the caller asked for.
   * @param {Abi} abi the contract's abi
   * @param {ParsingStrategy} [parsingStrategy] how to serialize each type, `hdParsingStrategy`
   * when not given
   * @throws {Error} when handed a strategy of Cairo type classes
   * @example
   * ```typescript
   * const parser = new AbiParser0(abi);
   * const result = parser.getMethod('get_balance')?.name;
   * // result = "get_balance"
   * ```
   */
  constructor(abi: Abi, parsingStrategy?: ParsingStrategy | CairoTypeStrategy) {
    assert(
      !isCairoTypeStrategy(parsingStrategy),
      'A Cairo 0 abi is parsed without the Cairo type classes, so `cairoTypeStrategy` does not apply to it — use `hdParsingStrategy` or `fastParsingStrategy`.'
    );
    this.abi = abi;
    this.parsingStrategy = parsingStrategy || hdParsingStrategy;
    this.structs = getAbiStruct(abi);
    this.enums = getAbiEnum(abi);
  }

  /**
   * Check the arguments of a method before any of them is serialized.
   *
   * This parser does the checking and the serializing in two separate passes, which is why it has
   * something to do here where {@link AbiParser1} has not : its Cairo type classes check as they
   * build, so a pass beforehand would build everything twice.
   * @param {FunctionAbi} abiMethod the method the arguments are meant for
   * @param {any[]} args the arguments, in the abi's order
   * @throws {Error} when an argument does not fit the type its input declares
   * @example
   * ```typescript
   * const method = {
   *   type: 'function',
   *   name: 'f',
   *   inputs: [{ name: 'x', type: 'felt' }],
   *   outputs: [],
   *   stateMutability: 'view',
   * };
   * new AbiParser0(abi).validateRequestFields(method, [1000]); // passes
   * ```
   */
  public validateRequestFields(abiMethod: FunctionAbi, args: any[]): void {
    validateFields(abiMethod, args, this.structs, this.enums);
  }

  /**
   * Serialize one argument to the felts a contract call carries.
   *
   * The abi entry is passed whole rather than just its type, because the error messages name the
   * field : `ABI expected parameter tokens to be array, got abc`.
   * @param {unknown} value the argument to serialize
   * @param {AbiEntry} input the abi entry this argument stands for
   * @returns {string | string[]} the felts, one string for a single-felt type
   * @throws {Error} when the value does not fit the declared type
   * @example
   * ```typescript
   * const parser = new AbiParser0(abi);
   * const result = parser.parseRequestField(1000, { name: 'x', type: 'felt' });
   * // result = ["1000"]
   * ```
   */
  public parseRequestField(value: unknown, input: AbiEntry): string | string[] {
    return parseCalldataField({
      argsIterator: [value][Symbol.iterator](),
      input,
      structs: this.structs,
      enums: this.enums,
      parser: this,
    });
  }

  /**
   * Read one value off a contract response, advancing the iterator past it.
   *
   * `parsedResult` is what makes a Cairo 0 array readable : its length is a separate output,
   * `${name}_len`, read just before it, and there is nothing in the felts themselves to say where
   * the array stops.
   * @param {Iterator<string>} responseIterator the response felts, positioned on this value
   * @param {AbiEntry | EventEntry} output the abi entry describing what to read
   * @param {Args | ParsedStruct} [parsedResult] what has been read so far, which is where an
   * array finds its `${name}_len`
   * @returns {any} the value, as the plain JS type the caller reads
   * @example
   * ```typescript
   * const parser = new AbiParser0(abi);
   * const result = parser.parseResponse(['0x3e8'].values(), { name: 'x', type: 'felt' });
   * // result = 1000n
   * const response = ['0x1', '0x2', '0x3'].values();
   * const result2 = parser.parseResponse(response, { name: 'r', type: 'felt*' }, { r_len: 3n });
   * // result2 = [1n, 2n, 3n]
   * ```
   */
  public parseResponse(
    responseIterator: Iterator<string>,
    output: AbiEntry | EventEntry,
    parsedResult?: Args | ParsedStruct
  ): any {
    return responseParser({
      responseIterator,
      output,
      structs: this.structs,
      enums: this.enums,
      parsedResult,
      parser: this,
    });
  }

  /**
   * How to serialize a value of this abi type.
   *
   * Cairo 0's own type names never reach here : `parseBaseTypes` asks for `core::felt252` for
   * everything it does not recognize, which is what a `felt` ends up being.
   * @param {AbiEntryType} abiType the abi type to serialize
   * @returns {Function} the function turning a value into its felts
   * @throws {Error} when the strategy has no entry for this type
   * @example
   * ```typescript
   * const result = new AbiParser0(abi).getRequestParser('core::felt252')(1000);
   * // result = ["1000"]
   * ```
   */
  public getRequestParser(abiType: AbiEntryType): (val: unknown) => any {
    if (this.parsingStrategy.request[abiType]) {
      return this.parsingStrategy.request[abiType];
    }
    throw new Error(`Parser for ${abiType} not found`);
  }

  /**
   * How to read a value of this abi type off a response.
   * @param {AbiEntryType} abiType the abi type to read
   * @returns {Function} the function reading the value from the response felts
   * @throws {Error} when the strategy has no entry for this type
   * @example
   * ```typescript
   * const response = ['0x3e8'].values();
   * const result = new AbiParser0(abi).getResponseParser('core::felt252')(response);
   * // result = 1000n
   * ```
   */
  public getResponseParser(abiType: AbiEntryType): (responseIterator: Iterator<string>) => any {
    if (this.parsingStrategy.response[abiType]) {
      return this.parsingStrategy.response[abiType];
    }
    throw new Error(`Parser for ${abiType} not found`);
  }

  /**
   * How many arguments a caller has to provide for this method.
   *
   * A Cairo 0 array is declared as two inputs, `a_len` and `a`, but a caller passes one value :
   * the length is derived from it. So the `_len` inputs are not counted.
   * @param {FunctionAbi} abiMethod the method to measure
   * @returns {number} the number of arguments expected
   * @example
   * ```typescript
   * const method = {
   *   type: 'function',
   *   name: 'sum',
   *   inputs: [
   *     { name: 'a_len', type: 'felt' },
   *     { name: 'a', type: 'felt*' },
   *   ],
   *   outputs: [],
   *   stateMutability: 'view',
   * };
   * const result = new AbiParser0(abi).methodInputsLength(method);
   * // result = 1     (two inputs declared, one value to pass)
   * ```
   */
  public methodInputsLength(abiMethod: FunctionAbi) {
    return abiMethod.inputs.reduce((acc, input) => (!isLen(input.name) ? acc + 1 : acc), 0);
  }

  /**
   * Find a method by name in the abi.
   * @param {string} name the method to look for
   * @returns {FunctionAbi | undefined} the method, or nothing when the abi has no such name
   * @example
   * ```typescript
   * const result = new AbiParser0(abi).getMethod('get_balance')?.outputs[0].type;
   * // result = "felt"
   * ```
   */
  public getMethod(name: string): FunctionAbi | undefined {
    return this.abi.find((it) => it.name === name);
  }

  /**
   * The abi as a flat list of entries.
   *
   * A Cairo 0 abi is already flat — there is no `interface` entry to unwrap, as there is from
   * Cairo 2 on — so this hands back what it was given.
   * @returns {Abi} the abi, unchanged
   * @example
   * ```typescript
   * const result = new AbiParser0(abi).getLegacyFormat().length;
   * // result = 1
   * ```
   */
  public getLegacyFormat() {
    return this.abi;
  }
}
