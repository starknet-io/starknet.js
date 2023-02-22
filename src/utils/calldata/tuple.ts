/* eslint-disable no-plusplus */
import { isTypeNamedTuple } from './cairo';

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

/**
 * Convert tuple string definition into object like definition
 * @param type tuple string definition
 * @returns object like tuple
 */
export default function extractTupleMemberTypes(type: string): (string | object)[] {
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
