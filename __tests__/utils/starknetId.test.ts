import { StarknetChainId } from '../../src/constants';
import {
  generateString,
  getStarknetIdContract,
  useDecoded,
  useEncoded,
} from '../../src/utils/starknetId';

describe('Should tets StarknetId utils', () => {
  test('Should test useEncoded and useDecoded hook with 100 random strings', () => {
    for (let index = 0; index < 100; index += 1) {
      const randomString = generateString(10);

      expect(useDecoded([useEncoded(randomString)])).toBe(randomString.concat('.stark'));
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
