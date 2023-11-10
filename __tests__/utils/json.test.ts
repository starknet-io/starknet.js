import { defaultProvider } from '../../src';
import { parse, parseAlwaysAsBig, stringify } from '../../src/utils/json';

const bi = (x: bigint) => BigInt(Number.MAX_SAFE_INTEGER) + x;
const objString = `{"constructor":"c","n0":${bi(0n)},"n1":${bi(1n)},"n2":12,"n3":1.1}`;

describe('JSON utility tests', () => {
  xtest('stringify', () => {
    // Disabled due to random nodeUrl nad diff params for RPC
    expect(stringify(defaultProvider)).toMatchSnapshot();
  });

  test('parse', () => {
    const parsed: any = parse(objString);
    expect(parsed).toMatchSnapshot();
    expect(parsed.n0).toEqual(expect.any(Number));
    expect(parsed.n1).toEqual(expect.any(BigInt));
  });

  test('parseAlwaysAsBig', () => {
    const parsed: any = parseAlwaysAsBig(objString);
    expect(parsed).toMatchSnapshot();
    expect(parsed.n0).toEqual(expect.any(BigInt));
    expect(parsed.n1).toEqual(expect.any(BigInt));
  });
});
