import { BN } from 'bn.js';

import { StarknetChainId } from '../../src/constants';
import { getStarknetIdContract, useDecoded, useEncoded } from '../../src/utils/starknetId';

function randomWithSeed(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function generateString(length: number, seed: number): string {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789-这来';

  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(randomWithSeed(seed + i) * charactersLength));
  }

  return result;
}

describe('Should tets StarknetId utils', () => {
  test('Should test useEncoded and useDecoded hook with a random string', () => {
    for (let index = 0; index < 2500; index += 1) {
      const randomString = generateString(10, index);
      expect(useDecoded([useEncoded(randomString)])).toBe(randomString.concat('.stark'));
    }
  });

  test('Should test useDecoded and useEncoded hook with an encoded number', () => {
    for (let index = 0; index < 2500; index += 1) {
      const decoded = useDecoded([new BN(index)]);
      expect(useEncoded(decoded.substring(0, decoded.length - 6)).toString()).toBe(
        index.toString()
      );
    }
  });

  test('Should test getStarknetIdContract', () => {
    expect(getStarknetIdContract(StarknetChainId.TESTNET)).toBe(
      '0x05cf267a0af6101667013fc6bd3f6c11116a14cda9b8c4b1198520d59f900b17'
    );

    expect(() => {
      getStarknetIdContract(StarknetChainId.TESTNET2);
    }).toThrow();

    expect(getStarknetIdContract(StarknetChainId.MAINNET)).toBe(
      '0x6ac597f8116f886fa1c97a23fa4e08299975ecaf6b598873ca6792b9bbfb678'
    );
  });
});
