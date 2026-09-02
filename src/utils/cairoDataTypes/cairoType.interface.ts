/**
 * What the Cairo data type classes have in common: each one turns itself into the felts a
 * contract call carries.
 *
 * This is an interface rather than a base class on purpose. TypeScript matches it structurally,
 * so every class in this directory already satisfies it without declaring anything — a base class
 * would have had to be added to each of them, and any class that forgot would not have raised :
 * an `instanceof` check would simply have answered false and sent the value down the wrong branch.
 *
 * The composite types are what this exists for : an array, a tuple or a struct holds elements of
 * types it does not know, and only ever needs to ask each of them for its felts.
 * @example
 * ```typescript
 * const elements: CairoType[] = [new CairoUint8(1), new CairoFelt252('Hello')];
 * const felts = elements.flatMap((element) => element.toApiRequest());
 * // felts = ["1", "310939249775"]
 * ```
 */
export interface CairoType {
  /**
   * Serialize to the felts a contract call carries, as decimal strings.
   */
  toApiRequest(): string[];
}

/**
 * Is this value one of the Cairo type classes, rather than the raw data one is built from?
 *
 * The composites accept both — `[1, 2]` and `[new CairoUint8(1), new CairoUint8(2)]` describe the
 * same array — and this is what tells them apart. It asks for a callable `toApiRequest`, so an
 * object merely carrying a property of that name is not mistaken for one.
 * @param {unknown} value the value to test
 * @returns {boolean} true when the value can serialize itself
 * @example
 * ```typescript
 * const result = isCairoType(new CairoUint8(44));
 * // result = true
 * const result2 = isCairoType(44);
 * // result2 = false
 * const result3 = isCairoType({ toApiRequest: 'not a function' });
 * // result3 = false
 * ```
 */
export function isCairoType(value: unknown): value is CairoType {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof (value as CairoType).toApiRequest === 'function'
  );
}
