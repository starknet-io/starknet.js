/* eslint-disable no-plusplus */
import { isCairo1Type, isTypeNamedTuple } from './cairo';

function parseNamedTuple(namedTuple: string): any {
  const name = namedTuple.substring(0, namedTuple.indexOf(':'));
  const type = namedTuple.substring(name.length + ':'.length);
  return { name, type };
}

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

function posClosure(input: string, open: string, close: string): number {
  let posEnd: number = 0;
  let i = 0;
  while (i < input.length) {
    if (input[i] === open) {
      let counter = 1;
      i++;
      while (counter) {
        if (input[i] === close) counter--;
        if (input[i] === open) counter++;
        i++;
      }
      posEnd = i;
      break;
    }
    i++;
  }
  return posEnd;
}

function extractCairo1Tuple(type: string): string[] {
  // un-named tuples support
  const input = type.slice(1, -1); // remove first lvl ()
  const result: string[] = [];
  let posStart: number = 0;
  while (posStart < input.length) {
    switch (true) {
      case input[posStart] === '(': {
        // Tuple
        const posEnd = posClosure(input.slice(posStart), '(', ')');
        result.push(input.slice(posStart, posStart + posEnd));
        posStart = posStart + posEnd + 2; // +2 to skip ', '
        break;
      }
      case input.slice(posStart).startsWith('core::result::Result::<'): {
        const posEnd = posClosure(input.slice(posStart), '<', '>');
        result.push(input.slice(posStart, posStart + posEnd));
        posStart = posStart + posEnd + 2;
        break;
      }
      case input.slice(posStart).startsWith('core::array::Array::<'): {
        const posEnd = posClosure(input.slice(posStart), '<', '>');
        result.push(input.slice(posStart, posStart + posEnd));
        posStart = posStart + posEnd + 2;
        break;
      }
      case input.slice(posStart).startsWith('core::option::Option::<'): {
        const posEnd = posClosure(input.slice(posStart), '<', '>');
        result.push(input.slice(posStart, posStart + posEnd));
        posStart = posStart + posEnd + 2;
        break;
      }
      default: {
        const posEnd = input.slice(posStart).indexOf(',');
        if (posEnd === -1) {
          result.push(input.slice(posStart));
          posStart = input.length;
        } else {
          result.push(input.slice(posStart, posStart + posEnd));
          posStart = posStart + posEnd + 2;
          break;
        }
      }
    }
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
