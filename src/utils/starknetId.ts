/* eslint-disable no-param-reassign */
import BN from 'bn.js';

import { StarknetChainId } from '../constants';

const basicAlphabet = 'abcdefghijklmnopqrstuvwxyz0123456789-';
const basicSizePlusOne = new BN(basicAlphabet.length + 1);
const bigAlphabet = '这来';
const basicAlphabetSize = new BN(basicAlphabet.length);
const bigAlphabetSize = new BN(bigAlphabet.length);
const bigAlphabetSizePlusOne = new BN(bigAlphabet.length + 1);

export function useDecoded(encoded: BN[]): string {
  let decoded = '';
  encoded.forEach((subdomain) => {
    while (!subdomain.isZero()) {
      const code = subdomain.mod(basicSizePlusOne).toNumber();
      subdomain = subdomain.div(basicSizePlusOne);
      if (code === basicAlphabet.length) {
        const nextSubdomain = subdomain.div(bigAlphabetSizePlusOne);
        if (nextSubdomain.isZero()) {
          const code2 = subdomain.mod(bigAlphabetSizePlusOne).toNumber();
          subdomain = nextSubdomain;
          if (code2 === 0) decoded += basicAlphabet[0];
          else decoded += bigAlphabet[code2 - 1];
        } else {
          const code2 = subdomain.mod(bigAlphabetSize).toNumber();
          decoded += bigAlphabet[code2];
          subdomain = subdomain.div(bigAlphabetSize);
        }
      } else decoded += basicAlphabet[code];
    }
    decoded += '.';
  });

  return decoded.concat('stark');
}

export function useEncoded(decoded: string): BN {
  let encoded = new BN(0);
  let multiplier = new BN(1);

  for (let i = 0; i < decoded.length; i += 1) {
    const char = decoded[i];
    const index = basicAlphabet.indexOf(char);
    const bnIndex = new BN(basicAlphabet.indexOf(char));

    if (index !== -1) {
      // add encoded + multiplier * index
      if (i === decoded.length - 1 && decoded[i] === basicAlphabet[0]) {
        encoded = encoded.add(multiplier.mul(basicAlphabetSize));
        multiplier = multiplier.mul(basicSizePlusOne);
        // add 0
        multiplier = multiplier.mul(basicSizePlusOne);
      } else {
        encoded = encoded.add(multiplier.mul(bnIndex));
        multiplier = multiplier.mul(basicSizePlusOne);
      }
    } else if (bigAlphabet.indexOf(char) !== -1) {
      // add encoded + multiplier * (basicAlphabetSize)
      encoded = encoded.add(multiplier.mul(basicAlphabetSize));
      multiplier = multiplier.mul(basicSizePlusOne);
      // add encoded + multiplier * index
      const newid = (i === decoded.length - 1 ? 1 : 0) + bigAlphabet.indexOf(char);
      encoded = encoded.add(multiplier.mul(new BN(newid)));
      multiplier = multiplier.mul(bigAlphabetSize);
    }
  }

  return encoded;
}

export function getStarknetIdContract(chainId: StarknetChainId): string {
  const starknetIdMainnetContract =
    '0x6ac597f8116f886fa1c97a23fa4e08299975ecaf6b598873ca6792b9bbfb678';
  const starknetIdTestnetContract =
    '0x05cf267a0af6101667013fc6bd3f6c11116a14cda9b8c4b1198520d59f900b17';

  switch (chainId) {
    case StarknetChainId.MAINNET:
      return starknetIdMainnetContract;

    case StarknetChainId.TESTNET:
      return starknetIdTestnetContract;

    default:
      throw new Error('Starknet.id is not yet deployed on this network');
  }
}
