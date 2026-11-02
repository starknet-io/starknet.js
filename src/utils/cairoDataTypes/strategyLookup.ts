import type { CairoTypeStrategy } from '../calldata/parser/cairoTypeStrategy.type';
import type { CairoType } from './cairoType.interface';

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
 * How many elements a collection of a zero-width type — `()`, an empty struct — may hold. It is
 * also how many elements one felt can make, through nested arrays, so it stays small.
 */
const MAX_ZERO_WIDTH_ELEMENTS = 256;

/**
 * Build `count` elements of one type from the response felts, for an array or a fixed array.
 *
 * An element that reads no felt at all leaves the count as the only thing the response decides,
 * so a single felt could ask for billions of them: past {@link MAX_ZERO_WIDTH_ELEMENTS}, such a
 * collection is refused. Elements that read felts need no bound, since the response runs out first.
 * @param {Iterator<string>} responseIterator the response felts, positioned on the first element
 * @param {number} count how many elements to build
 * @param {Function} build the constructor of the element type
 * @param {CairoTypeStrategy[]} strategies the strategies to build with
 * @param {string} elementType the abi type of an element
 * @returns {CairoType[]} the elements
 * @example
 * ```typescript
 * const build = findConstructor([cairoTypeStrategy], 'core::integer::u8')!;
 * buildElements(['0x1', '0x2'].values(), 2, build, [cairoTypeStrategy], 'core::integer::u8');
 * // [CairoUint8(1), CairoUint8(2)]
 * ```
 */
export function buildElements(
  responseIterator: Iterator<string>,
  count: number,
  build: CairoTypeStrategy['constructors'][string],
  strategies: CairoTypeStrategy[],
  elementType: string
): CairoType[] {
  let read = 0;
  const counted: Iterator<string> = {
    next: () => {
      const it = responseIterator.next();
      if (!it.done) read += 1;
      return it;
    },
  };
  const elements: CairoType[] = [];
  for (let i = 0; i < count; i += 1) {
    elements.push(build(counted, strategies, elementType));
    if (read === 0 && count > MAX_ZERO_WIDTH_ELEMENTS) {
      throw new Error(
        `${count} elements of ${elementType} requested, which reads no felt: at most ${MAX_ZERO_WIDTH_ELEMENTS} allowed`
      );
    }
  }
  return elements;
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
