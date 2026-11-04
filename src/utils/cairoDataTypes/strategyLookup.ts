import type { CairoTypeStrategy } from '../calldata/parser/cairoTypeStrategy.type';

/**
 * Find what builds a given abi type, among the strategies given, or nothing.
 *
 * A type is looked up twice : first among the constructors keyed by an exact abi type, which is
 * how every leaf is registered, then among the dynamic selectors, which recognize the composite
 * shapes no single string can key — an array, a tuple, an option all write their element type
 * into their own name.
 *
 * Every composite needs this, and needs it identically, which is why it lives here rather than in
 * each of them.
 * @param {CairoTypeStrategy[]} strategies the strategies to search, in order
 * @param {string} type the abi type to build
 * @returns {Function | undefined} the constructor, or undefined when no strategy knows the type
 * @example
 * ```typescript
 * const build = findConstructor([cairoTypeStrategy], 'core::integer::u8');
 * build?.(44, [cairoTypeStrategy]).toApiRequest();
 * // ["44"]
 * const missing = findConstructor([cairoTypeStrategy], 'core::foo::Bar');
 * // missing = undefined
 * ```
 */
export function findConstructor(
  strategies: CairoTypeStrategy[],
  type: string
): CairoTypeStrategy['constructors'][string] | undefined {
  const direct = strategies.find((strategy) => strategy.constructors[type]);
  if (direct) {
    return direct.constructors[type];
  }
  const dynamic = strategies
    .flatMap((strategy) =>
      Object.entries(strategy.dynamicSelectors).map(([name, matches]) => ({
        strategy,
        name,
        matches,
      }))
    )
    .find((entry) => entry.matches(type) && entry.strategy.constructors[entry.name]);
  return dynamic ? dynamic.strategy.constructors[dynamic.name] : undefined;
}

/**
 * Find what reads a built Cairo type back, among the strategies given, or nothing.
 *
 * The lookup is by one name only, and the caller decides which : the abi type for a leaf, and
 * what built it — its `dynamicSelector` — for a composite, since that is what knows how to walk
 * the elements it holds.
 * @param {CairoTypeStrategy[]} strategies the strategies to search, in order
 * @param {string} parserName the abi type, or the dynamic selector of a composite
 * @returns {Function | undefined} the response parser, or undefined when no strategy has one
 * @example
 * ```typescript
 * const read = findResponseParser([cairoTypeStrategy], 'core::integer::u8');
 * read?.(new CairoUint8(44), [cairoTypeStrategy]);
 * // 44n
 * ```
 */
export function findResponseParser(
  strategies: CairoTypeStrategy[],
  parserName: string
): CairoTypeStrategy['response'][string] | undefined {
  return strategies.find((strategy) => strategy.response[parserName])?.response[parserName];
}
