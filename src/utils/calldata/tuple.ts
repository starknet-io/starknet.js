/* eslint-disable no-plusplus */
import { isCairo1Type, isTypeNamedTuple } from './cairo';

/**
 * Parse a named tuple string into an object containing its name and type.
 * @param namedTuple - The named tuple string in the format "name:type".
 * @returns An object with `name` and `type` properties.
 */
function parseNamedTuple(namedTuple: string): any {
  const name = namedTuple.substring(0, namedTuple.indexOf(':'));
  const type = namedTuple.substring(name.length + ':'.length);
  return { name, type };
}

/**
 * Parse a sub-tuple within a tuple string.
 * @param s - The tuple string.
 * @returns An object containing the sub-tuple array and the remaining string.
 */
function parseSubTuple(s: string) {
  if (!s.includes('(')) return { subTuple: [], result: s };
  const subTuple: string[] = [];
  let result = '';
  let i = 0;
  while (i < s.length) {
    if (s[i] === '(') {
      let counter = 1;
      const lBracket = i;
      i++;
      while (counter) {
        if (s[i] === ')') counter--;
        if (s[i] === '(') counter++;
        i++;
      }
      subTuple.push(s.substring(lBracket, i));
      result += ' ';
      i--;
    } else {
      result += s[i];
    }
    i++;
  }

  return {
    subTuple,
    result,
  };
}

/**
 * Extract and parse a Cairo 0 tuple into its components.
 * @param type - The Cairo 0 tuple string.
 * @returns An array of tuple components or named tuple objects.
 */
function extractCairo0Tuple(type: string) {
  const cleanType = type.replace(/\s/g, '').slice(1, -1); // remove first lvl () and spaces

  // Decompose subTuple
  const { subTuple, result } = parseSubTuple(cleanType);

  // Recompose subTuple
  let recomposed = result.split(',').map((it) => {
    return subTuple.length ? it.replace(' ', subTuple.shift() as string) : it;
  });

  // Parse named tuple
  if (isTypeNamedTuple(type)) {
    recomposed = recomposed.reduce((acc, it) => {
      return acc.concat(parseNamedTuple(it));
    }, []);
  }

  return recomposed;
}

/**
 * Get the offset of the closure in a string.
 * @param input - The input string.
 * @param open - The opening character (e.g., '(', '{').
 * @param close - The closing character (e.g., ')', '}').
 * @returns The offset of the closing character.
 */
function getClosureOffset(input: string, open: string, close: string): number {
  for (let i = 0, counter = 0; i < input.length; i++) {
    if (input[i] === open) {
      counter++;
    } else if (input[i] === close && --counter === 0) {
      return i;
    }
  }
  return Number.POSITIVE_INFINITY;
}

/**
 * Extract and parse a Cairo 1 tuple into its components.
 * @param type - The Cairo 1 tuple string.
 * @returns An array of tuple components as strings.
 */
function extractCairo1Tuple(type: string): string[] {
  // un-named tuples support
  const input = type.slice(1, -1); // remove first lvl ()
  const result: string[] = [];

  let currentIndex: number = 0;
  let limitIndex: number;

  while (currentIndex < input.length) {
    switch (true) {
      // Tuple
      case input[currentIndex] === '(': {
        limitIndex = currentIndex + getClosureOffset(input.slice(currentIndex), '(', ')') + 1;
        break;
      }
      case input.startsWith('core::result::Result::<', currentIndex) ||
        input.startsWith('core::array::Array::<', currentIndex) ||
        input.startsWith('core::option::Option::<', currentIndex): {
        limitIndex = currentIndex + getClosureOffset(input.slice(currentIndex), '<', '>') + 1;
        break;
      }
      default: {
        const commaIndex = input.indexOf(',', currentIndex);
        limitIndex = commaIndex !== -1 ? commaIndex : Number.POSITIVE_INFINITY;
      }
    }

    result.push(input.slice(currentIndex, limitIndex));
    currentIndex = limitIndex + 2; // +2 to skip ', '
  }

  return result;
}

/**
 * Convert a tuple string definition into an object-like definition.
 * Supports both Cairo 0 and Cairo 1 tuple formats.
 * 
 * @param type - The tuple string definition (e.g., "(u8, u8)" or "(x:u8, y:u8)").
 * @returns An array of strings or objects representing the tuple components.
 * 
 * @example
 * // Cairo 0 Tuple
 * const cairo0Tuple = "(u8, u8)";
 * const result = extractTupleMemberTypes(cairo0Tuple);
 * // result: ["u8", "u8"]
 * 
 * @example
 * // Named Cairo 0 Tuple
 * const namedCairo0Tuple = "(x:u8, y:u8)";
 * const namedResult = extractTupleMemberTypes(namedCairo0Tuple);
 * // namedResult: [{ name: "x", type: "u8" }, { name: "y", type: "u8" }]
 * 
 * @example
 * // Cairo 1 Tuple
 * const cairo1Tuple = "(core::result::Result::<u8, u8>, u8)";
 * const cairo1Result = extractTupleMemberTypes(cairo1Tuple);
 * // cairo1Result: ["core::result::Result::<u8, u8>", "u8"]
 */
export default function extractTupleMemberTypes(type: string): (string | object)[] {
  if (isCairo1Type(type)) {
    return extractCairo1Tuple(type);
  }
  return extractCairo0Tuple(type);
}
