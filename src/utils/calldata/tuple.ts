/* eslint-disable no-plusplus */
import { isCairo1Type, isTypeNamedTuple } from './cairo';

/**
 * Parses a named tuple.
 *
 * @param {string} namedTuple - The named tuple to parse in the format "name:type".
 * @returns - The parsed named tuple as an object with properties "name" and "type".
 */
function parseNamedTuple(namedTuple: string): any {
  const name = namedTuple.substring(0, namedTuple.indexOf(':'));
  const type = namedTuple.substring(name.length + ':'.length);
  return { name, type };
}

/**
 * Parses and extracts sub-tuples from a given string.
 *
 * @param {string} s - The input string to parse.
 * @return - An object containing the sub-tuples and the remaining string.
 *   - subTuple: {Array} - An array of strings representing the extracted sub-tuples.
 *   - result: {string} - The remaining string after extracting the sub-tuples.
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
 * Extracts tuples from a given type.
 *
 * @param {string} type - The type containing tuples.
 * @returns {string[]} - An array of extracted tuples.
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
 * Finds the offset at which a closure ends in a given input string.
 *
 * @param {string} input - The input string.
 * @param {string} open - The opening closure character.
 * @param {string} close - The closing closure character.
 * @return {number} - The offset at which the closure ends, or Number.POSITIVE_INFINITY if no closure is found.
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
 * Extracts individual elements from a tuple string.
 *
 * @param {string} type - The tuple string to extract elements from.
 * @returns {string[]} - An array containing the individual elements of the tuple string.
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
 * Convert tuple string definition into object like definition
 * @param type tuple string definition
 * @returns object like tuple
 */
export default function extractTupleMemberTypes(type: string): (string | object)[] {
  if (isCairo1Type(type)) {
    return extractCairo1Tuple(type);
  }
  return extractCairo0Tuple(type);
}
