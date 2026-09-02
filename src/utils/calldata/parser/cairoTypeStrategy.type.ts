import type { AbiEntryType, AllowArray } from '../../../types';
import type { CairoType } from '../../cairoDataTypes/cairoType.interface';
import type { CairoOptionVariant, CairoResultVariant } from '../enum';

/**
 * Which branch of an enum a value stands for.
 *
 * `Option` and `Result` have their own named variants; a custom enum names its own, and a bare
 * index is accepted for the abi order.
 */
export type VariantType = CairoOptionVariant | CairoResultVariant | string | number;

/**
 * How to build a Cairo type from an abi type, and how to read one back.
 *
 * This is the shape the composite classes drive : unlike `ParsingStrategy`, whose entries go
 * straight from a value to its felts, a constructor here returns a {@link CairoType} **instance**.
 * That is what lets a composite hold its elements as a tree and serialize the whole of it at once,
 * rather than each level having to flatten what it contains.
 *
 * Every constructor receives the strategy back, because building a composite means building its
 * children : an array of tuples of u8 has to reach this map three times.
 * @example
 * ```typescript
 * const strategy: CairoTypeStrategy = {
 *   constructors: {
 *     [CairoUint8.abiSelector]: (input) => new CairoUint8(input),
 *   },
 *   response: {
 *     [CairoUint8.abiSelector]: (instance) => (instance as CairoUint8).toBigInt(),
 *   },
 *   dynamicSelectors: {},
 * };
 * const felts = strategy.constructors['core::integer::u8'](44, strategy).toApiRequest();
 * // felts = ["44"]
 * ```
 */
export type CairoTypeStrategy = {
  /**
   * Build a Cairo type, from raw data on the way out or from response felts on the way in.
   *
   * The two directions share one entry because they build the same thing : `input` is whatever a
   * caller passed for a request, and the iterator positioned on this value for a response. `type`
   * and `variant` are given only where the abi key is not enough to know what to build — a
   * dynamic selector matches a family of types, and an enum has to be told which branch it holds.
   */
  constructors: Record<
    AbiEntryType,
    (
      input: Iterator<string> | unknown,
      strategy: AllowArray<CairoTypeStrategy>,
      type?: string,
      variant?: VariantType
    ) => CairoType
  >;

  /**
   * Turn a built Cairo type back into the plain JS value a caller reads.
   *
   * The strategy comes along for the same reason as above : decomposing a composite means
   * decomposing its elements.
   */
  response: Record<
    AbiEntryType,
    (instance: CairoType, strategy: AllowArray<CairoTypeStrategy>) => any
  >;

  /**
   * Recognize the types whose abi string is not a fixed key.
   *
   * An array, a tuple, a fixed array, an `Option` or a `NonZero` write their element type into
   * their own name, so there is no one string to key them by. Each entry here is a predicate on
   * the abi type, and its key names the constructor to use — which is why a composite class
   * carries a `dynamicSelector` telling which one built it.
   */
  dynamicSelectors: Record<string, (type: string) => boolean>;
};
