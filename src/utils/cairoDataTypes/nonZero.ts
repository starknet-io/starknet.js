import type { AllowArray } from '../../types';
import assert from '../assert';
import { getArrayType, isTypeFelt, isTypeNonZero, isTypeUint } from '../calldata/cairo';
import type { CairoTypeStrategy } from '../calldata/parser/cairoTypeStrategy.type';
import { addCompiledFlag } from '../helpers';
import { CairoFelt252 } from './felt';
import { CairoUint8 } from './uint8';
import { CairoUint16 } from './uint16';
import { CairoUint32 } from './uint32';
import { CairoUint64 } from './uint64';
import { CairoUint96 } from './uint96';
import { CairoUint128 } from './uint128';
import { CairoUint256 } from './uint256';
import { CairoUint512 } from './uint512';
import { isCairoType, type CairoType } from './cairoType.interface';
import { findConstructor, findResponseParser } from './strategyLookup';

/**
 * The classes a NonZero may hold, which are the ones that carry a number it can compare to zero.
 *
 * Cairo restricts `NonZero` to the purely numeric types and to `EcPoint`; the latter carries no
 * `Serde` implementation, so it never appears in an abi. `u512` is left out because Cairo does not
 * support it here, and the signed integers because `NonZero::<i*>` did not work in Cairo 2.6.3.
 */
const NON_ZERO_TYPES = [
  CairoUint8,
  CairoUint16,
  CairoUint32,
  CairoUint64,
  CairoUint96,
  CairoUint128,
  CairoUint256,
  CairoFelt252,
] as const;

/**
 * A Cairo `core::zeroable::NonZero::<T>` : a value of type `T` that is guaranteed not to be zero.
 *
 * It adds nothing to the wire — a `NonZero<u8>` is the felt a `u8` is. Its whole job is the check
 * it performs while being built, which is why a contract can then divide by it without a guard.
 *
 * Only the types Cairo allows are accepted : the unsigned integers up to `u256`, and `felt252`.
 * @example
 * ```typescript
 * const nonZero = new CairoNonZero(2, 'core::zeroable::NonZero::<core::integer::u8>', cairoTypeStrategy);
 * nonZero.toApiRequest(); //                  ["2"]     no wrapper felt
 * nonZero.decompose(cairoTypeStrategy); //    2n
 * ```
 */
export class CairoNonZero {
  /**
   * The name this class is registered under in a strategy's `dynamicSelectors`.
   * @example
   * ```typescript
   * const result = CairoNonZero.dynamicSelector;
   * // result = "CairoNonZero"
   * ```
   */
  static dynamicSelector = 'CairoNonZero' as const;

  /**
   * The selector on the instance, which is how a composite holding it knows what built it.
   * @example
   * ```typescript
   * const type = 'core::zeroable::NonZero::<core::integer::u8>';
   * const result = new CairoNonZero(2, type, cairoTypeStrategy).dynamicSelector;
   * // result = "CairoNonZero"
   * ```
   */
  public readonly dynamicSelector = CairoNonZero.dynamicSelector;

  /**
   * The value, built as the type the `NonZero` wraps.
   * @example
   * ```typescript
   * const type = 'core::zeroable::NonZero::<core::integer::u8>';
   * const result = new CairoNonZero(2, type, cairoTypeStrategy).content.toApiRequest();
   * // result = ["2"]
   * ```
   */
  public readonly content: CairoType;

  /**
   * The abi type this value was built for, brackets included.
   * @example
   * ```typescript
   * const type = 'core::zeroable::NonZero::<core::integer::u8>';
   * const result = new CairoNonZero(2, type, cairoTypeStrategy).contentType;
   * // result = "core::zeroable::NonZero::<core::integer::u8>"
   * ```
   */
  public readonly contentType: string;

  /**
   * Build a non-zero value, from what a caller passed or from the felts of a response.
   *
   * A value given raw is built as the wrapped type and then checked against zero. A value already
   * built is taken as it stands, and a response is read as the wrapped type would be — in neither
   * case is zero rejected, since what a node answers is not the caller's mistake to catch.
   * @param {unknown} content the value, an instance already built, or the response iterator
   * @param {string} type the abi type, `core::zeroable::NonZero::<T>`
   * @param {AllowArray<CairoTypeStrategy>} parsingStrategy how to build the value
   * @throws {Error} when the type is not a NonZero, when the wrapped type is one Cairo does not
   * allow there, or when a value given raw is zero
   * @example
   * ```typescript
   * const type = 'core::zeroable::NonZero::<core::integer::u8>';
   * new CairoNonZero(2, type, cairoTypeStrategy).toApiRequest(); //  ["2"]
   * new CairoNonZero(['0x9'].values(), type, cairoTypeStrategy).toApiRequest(); //  ["9"]
   * ```
   */
  constructor(content: unknown, type: string, parsingStrategy: AllowArray<CairoTypeStrategy>) {
    this.contentType = type;
    const strategies = Array.isArray(parsingStrategy) ? parsingStrategy : [parsingStrategy];

    if (content && typeof content === 'object' && 'next' in content) {
      this.content = CairoNonZero.parser(content as Iterator<string>, type, strategies);
      return;
    }
    if (content instanceof CairoNonZero) {
      this.content = content.content;
      this.contentType = content.contentType;
      return;
    }

    CairoNonZero.validate(content, type);
    const contentType = CairoNonZero.getNonZeroType(type);

    if (isCairoType(content)) {
      this.content = content;
      return;
    }

    const build = findConstructor(strategies, contentType);
    if (!build) {
      throw new Error(`"${contentType}" is not a valid Cairo type`);
    }
    const cairoInstance = build(content, strategies, contentType);
    this.validateValue(cairoInstance);
    this.content = cairoInstance;
  }

  /**
   * Read the wrapped value off a response.
   *
   * A NonZero adds no felt of its own, so this reads exactly what the wrapped type reads.
   * @param {Iterator<string>} responseIterator the response felts, positioned on the value
   * @param {string} nonZeroType the abi type, `core::zeroable::NonZero::<T>`
   * @param {CairoTypeStrategy[]} strategies how to build the value
   * @returns {CairoType} the value that was read
   * @throws {Error} when the wrapped type is one no strategy knows
   * @example
   * ```typescript
   * // called from the constructor when it is handed an iterator
   * const type = 'core::zeroable::NonZero::<core::integer::u8>';
   * new CairoNonZero(['0x9'].values(), type, cairoTypeStrategy).toApiRequest();
   * // ["9"]
   * ```
   */
  private static parser(
    responseIterator: Iterator<string>,
    nonZeroType: string,
    strategies: CairoTypeStrategy[]
  ): CairoType {
    const elementType = CairoNonZero.getNonZeroType(nonZeroType);
    const build = findConstructor(strategies, elementType);
    if (!build) {
      throw new Error(`No parser found for element type: ${elementType} in parsing strategy`);
    }
    return build(responseIterator, strategies, elementType);
  }

  /**
   * The type a NonZero wraps.
   * @param {string} type the abi type to read
   * @returns {string} the type between the angle brackets
   * @example
   * ```typescript
   * const result = CairoNonZero.getNonZeroType('core::zeroable::NonZero::<core::integer::u8>');
   * // result = "core::integer::u8"
   * ```
   */
  static getNonZeroType(type: string): string {
    return getArrayType(type);
  }

  /**
   * Throw unless this is a NonZero of a type Cairo allows there.
   *
   * The value is not read here : whether it is zero is checked once it has been built, since that
   * is what turns `'0x0'` and `0` into the same thing.
   * @param {unknown} input the value, which this does not read
   * @param {string} type the abi type it is meant for
   * @throws {Error} when the type is not a NonZero, or wraps a type Cairo does not allow
   * @example
   * ```typescript
   * CairoNonZero.validate(1, 'core::zeroable::NonZero::<core::integer::u8>'); // passes
   * CairoNonZero.validate(1, 'core::zeroable::NonZero::<core::integer::u512>');
   * // throws Error("Validate: core::integer::u512 type is not authorized for NonZero type.")
   * ```
   */
  static validate(input: unknown, type: string): void {
    assert(
      CairoNonZero.isAbiType(type),
      `The type ${type} is not a Cairo Non Zero. Needs core::zeroable::NonZero::<T>.`
    );
    // "NonZero is only supported for purely numeric types (u*, i* and felt252) and EcPoint."
    // Ori Ziv, 8 April 2024 — https://t.me/sncorestars/11902/45433
    // EcPoint carries no Serde, so it never appears in an abi; u512 is not compatible; and
    // core::zeroable::NonZero::<i*> did not work in Cairo 2.6.3. What is left is u8 to u256 and
    // felt252.
    const baseType = CairoNonZero.getNonZeroType(type);
    assert(
      (isTypeUint(baseType) && baseType !== CairoUint512.abiSelector) || isTypeFelt(baseType),
      `Validate: ${baseType} type is not authorized for NonZero type.`
    );
  }

  /**
   * Throw unless this built value is one a NonZero may hold, and is not zero.
   *
   * Only a value given raw goes through here : one already built is taken as it stands, and a
   * response is read as it comes.
   * @param {CairoType} cairoInstance the value that was just built
   * @throws {Error} when the value is zero, or of a class a NonZero may not hold
   * @example
   * ```typescript
   * // called from the constructor
   * const type = 'core::zeroable::NonZero::<core::integer::u8>';
   * new CairoNonZero(0, type, cairoTypeStrategy);
   * // throws Error("ValidateValue: value 0 is not authorized in NonZero type.")
   * ```
   */
  validateValue(cairoInstance: CairoType): void {
    const isNumeric = NON_ZERO_TYPES.some((cairoType) => cairoInstance instanceof cairoType);
    if (!isNumeric) {
      throw new Error(`ValidateValue: ${cairoInstance} is not authorized for NonZero type.`);
    }
    assert(
      (cairoInstance as CairoType & { toBigInt: Function }).toBigInt() > 0n,
      'ValidateValue: value 0 is not authorized in NonZero type.'
    );
  }

  /**
   * Can this be read as a NonZero of this type?
   *
   * The non-throwing form of {@link CairoNonZero.validate}, so it says nothing about whether the
   * value is zero.
   * @param {unknown} input the value to test
   * @param {string} type the abi type it is meant for
   * @returns {boolean} true when the type is a NonZero of an allowed type
   * @example
   * ```typescript
   * const result = CairoNonZero.is(1, 'core::zeroable::NonZero::<core::integer::u8>');
   * // result = true
   * const result2 = CairoNonZero.is(1, 'core::integer::u8');
   * // result2 = false
   * ```
   */
  static is(input: unknown, type: string): boolean {
    try {
      CairoNonZero.validate(input, type);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Is this abi type a NonZero?
   * @param {string} type the abi type to test
   * @returns {boolean} true for `core::zeroable::NonZero::<T>`
   * @example
   * ```typescript
   * const result = CairoNonZero.isAbiType('core::zeroable::NonZero::<core::integer::u8>');
   * // result = true
   * const result2 = CairoNonZero.isAbiType('core::integer::u8');
   * // result2 = false
   * ```
   */
  static isAbiType(type: string): boolean {
    return isTypeNonZero(type);
  }

  /**
   * Serialize to the felts a contract call carries.
   *
   * Exactly the felts of the wrapped value : a NonZero is a promise about a value, not a shape
   * around it.
   * @returns {string[]} the wrapped value's felts, flagged as compiled
   * @example
   * ```typescript
   * const type = 'core::zeroable::NonZero::<core::integer::u8>';
   * const result = new CairoNonZero(2, type, cairoTypeStrategy).toApiRequest();
   * // result = ["2"]
   * ```
   */
  public toApiRequest(): string[] {
    return addCompiledFlag(this.content.toApiRequest());
  }

  /**
   * Read the wrapped value back as the plain value a caller reads.
   * @param {AllowArray<CairoTypeStrategy>} strategyDecompose how to read the value back
   * @returns {any} the value the NonZero wraps
   * @throws {Error} when no strategy can read it back
   * @example
   * ```typescript
   * const type = 'core::zeroable::NonZero::<core::integer::u8>';
   * const result = new CairoNonZero(2, type, cairoTypeStrategy).decompose(cairoTypeStrategy);
   * // result = 2n
   * ```
   */
  public decompose(strategyDecompose: AllowArray<CairoTypeStrategy>): any {
    const strategies = Array.isArray(strategyDecompose) ? strategyDecompose : [strategyDecompose];
    const elementType = CairoNonZero.getNonZeroType(this.contentType);
    const parserName =
      'dynamicSelector' in this.content
        ? (this.content as { dynamicSelector: string }).dynamicSelector
        : elementType;
    const read = findResponseParser(strategies, parserName);
    if (!read) {
      throw new Error(
        `No response parser found for element type: ${elementType} in parsing strategy`
      );
    }
    return read(this.content, strategies);
  }
}
