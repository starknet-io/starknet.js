import { getKeyPair, getStarkKey, getStarkPublicKey } from '@authereum/starkware-crypto';
import { BigNumber } from '@ethersproject/bignumber';
import { ensure0x, ensureNo0x } from '../src';
import { ecAdd, igcdex, privateToStarkKey } from '../src/math';

describe('igcdex()', () => {
  test('works with (0, 0)', () => {
    const result = igcdex(BigNumber.from(0), BigNumber.from(0));

    expect(result).toStrictEqual([BigNumber.from(0), BigNumber.from(1), BigNumber.from(0)]);
  });
  test('works with (0, 2004)', () => {
    const result = igcdex(BigNumber.from(0), BigNumber.from(2004));

    expect(result).toStrictEqual([BigNumber.from(0), BigNumber.from(1), BigNumber.from(2004)]);
  });
  test('works with (100, 0)', () => {
    const result = igcdex(BigNumber.from(100), BigNumber.from(0));

    expect(result).toStrictEqual([BigNumber.from(1), BigNumber.from(0), BigNumber.from(100)]);
  });
  test('works with (100, 2004)', () => {
    const result = igcdex(BigNumber.from(100), BigNumber.from(2004));

    expect(result).toStrictEqual([BigNumber.from(-20), BigNumber.from(1), BigNumber.from(4)]);
  });
});
describe('ecAdd()', () => {
  test('works with ([10,20], [21,32], 5)', () => {
    const result = ecAdd(
      [BigNumber.from(10), BigNumber.from(20)],
      [BigNumber.from(21), BigNumber.from(32)],
      BigNumber.from(5)
    );
    expect(result).toStrictEqual([BigNumber.from(3), BigNumber.from(4)]);
  });
});
describe('privateToStarkKey()', () => {
  test('works with valid pk', () => {
    const pk = '0x019800ea6a9a73f94aee6a3d2edf018fc770443e90c7ba121e8303ec6b349279';
    const pub = privateToStarkKey(pk);

    expect(pub).toBe('0x033f45f07e1bd1a51b45fc24ec8c8c9908db9e42191be9e169bfcac0c0d99745');
  });
  test('doesnt work with package', () => {
    const pk = ensureNo0x('0x019800ea6a9a73f94aee6a3d2edf018fc770443e90c7ba121e8303ec6b349279');
    const pair = getKeyPair(pk);
    // somehow needed, returns error else
    getStarkPublicKey(pair);
    expect(BigNumber.from(ensure0x(getStarkKey(pair))).toHexString()).toBe(
      '0x033f45f07e1bd1a51b45fc24ec8c8c9908db9e42191be9e169bfcac0c0d99745'
    );
  });
});
