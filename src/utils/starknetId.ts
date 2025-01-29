import { StarknetChainId, ZERO } from '../global/constants';
import { BigNumberish } from '../types';
import { tuple } from './calldata/cairo';
import { CairoCustomEnum } from './calldata/enum/CairoCustomEnum';
/* eslint-disable no-param-reassign */

const basicAlphabet = 'abcdefghijklmnopqrstuvwxyz0123456789-';
const basicSizePlusOne = BigInt(basicAlphabet.length + 1);
const bigAlphabet = '这来';
const basicAlphabetSize = BigInt(basicAlphabet.length);
const bigAlphabetSize = BigInt(bigAlphabet.length);
const bigAlphabetSizePlusOne = BigInt(bigAlphabet.length + 1);

function extractStars(str: string): [string, number] {
  let k = 0;
  while (str.endsWith(bigAlphabet[bigAlphabet.length - 1])) {
    str = str.substring(0, str.length - 1);
    k += 1;
  }
  return [str, k];
}

/**
 * Decodes an array of BigInts into a string using the given algorithm.
 * @param {bigint[]} encoded The encoded array of BigInts.
 * @return {string} The decoded string.
 * @example
 * ```typescript
 * const result = starknetId.useDecoded([3015206943634620n]);
 * // result = "starknetjs.stark"
 * ```
 */
export function useDecoded(encoded: bigint[]): string {
  let decoded = '';

  encoded.forEach((subdomain) => {
    while (subdomain !== ZERO) {
      const code = subdomain % basicSizePlusOne;
      subdomain /= basicSizePlusOne;
      if (code === BigInt(basicAlphabet.length)) {
        const nextSubdomain = subdomain / bigAlphabetSizePlusOne;
        if (nextSubdomain === ZERO) {
          const code2 = subdomain % bigAlphabetSizePlusOne;
          subdomain = nextSubdomain;
          if (code2 === ZERO) decoded += basicAlphabet[0];
          else decoded += bigAlphabet[Number(code2) - 1];
        } else {
          const code2 = subdomain % bigAlphabetSize;
          decoded += bigAlphabet[Number(code2)];
          subdomain /= bigAlphabetSize;
        }
      } else decoded += basicAlphabet[Number(code)];
    }

    const [str, k] = extractStars(decoded);
    if (k)
      decoded =
        str +
        (k % 2 === 0
          ? bigAlphabet[bigAlphabet.length - 1].repeat(k / 2 - 1) +
            bigAlphabet[0] +
            basicAlphabet[1]
          : bigAlphabet[bigAlphabet.length - 1].repeat((k - 1) / 2 + 1));
    decoded += '.';
  });

  if (!decoded) {
    return decoded;
  }

  return decoded.concat('stark');
}

/**
 * Encodes a string into a bigint value.
 *
 * @param {string} decoded The string to be encoded.
 * @returns {bigint} The encoded bigint value.
 * @example
 * ```typescript
 * const result = starknetId.useEncoded("starknet.js");
 * // result = 3015206943634620n
 * ```
 */
export function useEncoded(decoded: string): bigint {
  let encoded = BigInt(0);
  let multiplier = BigInt(1);

  if (decoded.endsWith(bigAlphabet[0] + basicAlphabet[1])) {
    const [str, k] = extractStars(decoded.substring(0, decoded.length - 2));
    decoded = str + bigAlphabet[bigAlphabet.length - 1].repeat(2 * (k + 1));
  } else {
    const [str, k] = extractStars(decoded);
    if (k) decoded = str + bigAlphabet[bigAlphabet.length - 1].repeat(1 + 2 * (k - 1));
  }

  for (let i = 0; i < decoded.length; i += 1) {
    const char = decoded[i];
    const index = basicAlphabet.indexOf(char);
    const bnIndex = BigInt(basicAlphabet.indexOf(char));

    if (index !== -1) {
      // add encoded + multiplier * index
      if (i === decoded.length - 1 && decoded[i] === basicAlphabet[0]) {
        encoded += multiplier * basicAlphabetSize;
        multiplier *= basicSizePlusOne;
        // add 0
        multiplier *= basicSizePlusOne;
      } else {
        encoded += multiplier * bnIndex;
        multiplier *= basicSizePlusOne;
      }
    } else if (bigAlphabet.indexOf(char) !== -1) {
      // add encoded + multiplier * (basicAlphabetSize)
      encoded += multiplier * basicAlphabetSize;
      multiplier *= basicSizePlusOne;
      // add encoded + multiplier * index
      const newid = (i === decoded.length - 1 ? 1 : 0) + bigAlphabet.indexOf(char);
      encoded += multiplier * BigInt(newid);
      multiplier *= bigAlphabetSize;
    }
  }

  return encoded;
}

export const StarknetIdContract = {
  MAINNET: '0x6ac597f8116f886fa1c97a23fa4e08299975ecaf6b598873ca6792b9bbfb678',
  TESTNET_SEPOLIA: '0x154bc2e1af9260b9e66af0e9c46fc757ff893b3ff6a85718a810baf1474',
} as const;

/**
 * Returns the Starknet ID contract address based on the provided chain ID.
 *
 * @param {StarknetChainId} chainId The chain ID of the Starknet network.
 * @return {string} The Starknet ID contract address.
 * @throws {Error} Throws an error if the Starknet ID contract is not deployed on the network.
 * @example
 * ```typescript
 * const result = starknetId.getStarknetIdContract(constants.StarknetChainId.SN_SEPOLIA);
 * // result = "0x154bc2e1af9260b9e66af0e9c46fc757ff893b3ff6a85718a810baf1474"
 * ```
 */
export function getStarknetIdContract(chainId: StarknetChainId): string {
  switch (chainId) {
    case StarknetChainId.SN_MAIN:
      return StarknetIdContract.MAINNET;

    case StarknetChainId.SN_SEPOLIA:
      return StarknetIdContract.TESTNET_SEPOLIA;

    default:
      throw new Error('Starknet.id is not yet deployed on this network');
  }
}

export const StarknetIdIdentityContract = {
  MAINNET: '0x05dbdedc203e92749e2e746e2d40a768d966bd243df04a6b712e222bc040a9af',
  TESTNET_SEPOLIA: '0x3697660a0981d734780731949ecb2b4a38d6a58fc41629ed611e8defda',
} as const;

/**
 * Returns the Starknet ID identity contract address for the given chain ID.
 *
 * @param {StarknetChainId} chainId The chain ID for the specified network.
 *
 * @return {string} The Starknet ID identity contract address for the specified network.
 *
 * @throws {Error} If the Starknet ID verifier contract is not deployed on the network.
 * @example
 * ```typescript
 * const result = starknetId.getStarknetIdIdentityContract(constants.StarknetChainId.SN_SEPOLIA);
 * // result = "0x3697660a0981d734780731949ecb2b4a38d6a58fc41629ed611e8defda"
 * ```
 */
export function getStarknetIdIdentityContract(chainId: StarknetChainId): string {
  switch (chainId) {
    case StarknetChainId.SN_MAIN:
      return StarknetIdIdentityContract.MAINNET;

    case StarknetChainId.SN_SEPOLIA:
      return StarknetIdIdentityContract.TESTNET_SEPOLIA;

    default:
      throw new Error('Starknet.id verifier contract is not yet deployed on this network');
  }
}

export const StarknetIdMulticallContract =
  '0x034ffb8f4452df7a613a0210824d6414dbadcddce6c6e19bf4ddc9e22ce5f970';

/**
 * Returns the Starknet.id multicall contract address based on the provided chainId.
 *
 * @param {StarknetChainId} chainId - The chainId of the network.
 * @return {string} - The address of the Starknet.id multicall contract.
 * @throws {Error} - If the Starknet.id multicall contract is not deployed on the network.
 * @example
 * ```typescript
 * const result = starknetId.getStarknetIdMulticallContract(constants.StarknetChainId.SN_SEPOLIA);
 * // result = "0x034ffb8f4452df7a613a0210824d6414dbadcddce6c6e19bf4ddc9e22ce5f970"
 * ```
 */
export function getStarknetIdMulticallContract(chainId: StarknetChainId): string {
  switch (chainId) {
    case StarknetChainId.SN_MAIN:
      return StarknetIdMulticallContract;

    case StarknetChainId.SN_SEPOLIA:
      return StarknetIdMulticallContract;

    default:
      throw new Error('Starknet.id multicall contract is not yet deployed on this network');
  }
}

export const StarknetIdVerifierContract = {
  MAINNET: '0x07d14dfd8ee95b41fce179170d88ba1f0d5a512e13aeb232f19cfeec0a88f8bf',
  TESTNET_SEPOLIA: '0x60B94fEDe525f815AE5E8377A463e121C787cCCf3a36358Aa9B18c12c4D566',
} as const;

/**
 * Returns the address of the Starknet ID Verifier contract based on the specified chain ID.
 *
 * @param {StarknetChainId} chainId - The ID of the Starknet chain.
 * @return {string} - The address of the Starknet ID Verifier contract.
 * @throws {Error} - If the Starknet ID Verifier contract is not deployed on the specified network.
 * @example
 * ```typescript
 * const result = starknetId.getStarknetIdVerifierContract(constants.StarknetChainId.SN_SEPOLIA);
 * // result = "0x60B94fEDe525f815AE5E8377A463e121C787cCCf3a36358Aa9B18c12c4D566"
 * ```
 */
export function getStarknetIdVerifierContract(chainId: StarknetChainId): string {
  switch (chainId) {
    case StarknetChainId.SN_MAIN:
      return StarknetIdVerifierContract.MAINNET;

    case StarknetChainId.SN_SEPOLIA:
      return StarknetIdVerifierContract.TESTNET_SEPOLIA;

    default:
      throw new Error('Starknet.id verifier contract is not yet deployed on this network');
  }
}

export const StarknetIdPfpContract = {
  MAINNET: '0x070aaa20ec4a46da57c932d9fd89ca5e6bb9ca3188d3df361a32306aff7d59c7',
  TESTNET_SEPOLIA: '0x9e7bdb8dabd02ea8cfc23b1d1c5278e46490f193f87516ed5ff2dfec02',
} as const;

/**
 * Retrieves the contract address of the Starknet.id profile picture verifier contract based on the given chain ID.
 *
 * @param {StarknetChainId} chainId - The chain ID of the network.
 * @returns {string} - The contract address of the Starknet.id profile picture verifier contract.
 * @throws {Error} - Throws an error if the Starknet.id profile picture verifier contract is not yet deployed on the network.
 * @example
 * ```typescript
 * const result = starknetId.getStarknetIdPfpContract(constants.StarknetChainId.SN_SEPOLIA);
 * // result = "0x9e7bdb8dabd02ea8cfc23b1d1c5278e46490f193f87516ed5ff2dfec02"
 * ```
 */
export function getStarknetIdPfpContract(chainId: StarknetChainId): string {
  switch (chainId) {
    case StarknetChainId.SN_MAIN:
      return StarknetIdPfpContract.MAINNET;

    case StarknetChainId.SN_SEPOLIA:
      return StarknetIdPfpContract.TESTNET_SEPOLIA;

    default:
      throw new Error(
        'Starknet.id profile picture verifier contract is not yet deployed on this network'
      );
  }
}

export const StarknetIdPopContract = {
  MAINNET: '0x0293eb2ba9862f762bd3036586d5755a782bd22e6f5028320f1d0405fd47bff4',
  TESTNET_SEPOLIA: '0x15ae88ae054caa74090b89025c1595683f12edf7a4ed2ad0274de3e1d4a',
} as const;

/**
 * Retrieves the Starknet ID Proof of Personhood (IdPop) verifier contract address for the given chain ID.
 *
 * @param {StarknetChainId} chainId - The chain ID of the Starknet network.
 * @return {string} - The Starknet ID Pop contract address.
 * @throws {Error} - If the Starknet ID Pop contract is not deployed on the specified network.
 * @example
 * ```typescript
 * const result = starknetId.getStarknetIdPopContract(constants.StarknetChainId.SN_SEPOLIA);
 * // result = "0x15ae88ae054caa74090b89025c1595683f12edf7a4ed2ad0274de3e1d4a"
 * ```
 */
export function getStarknetIdPopContract(chainId: StarknetChainId): string {
  switch (chainId) {
    case StarknetChainId.SN_MAIN:
      return StarknetIdPopContract.MAINNET;

    case StarknetChainId.SN_SEPOLIA:
      return StarknetIdPopContract.TESTNET_SEPOLIA;

    default:
      throw new Error(
        'Starknet.id proof of personhood verifier contract is not yet deployed on this network'
      );
  }
}

/**
 * Returns a CairoCustomEnum object.
 *
 * Functions to build CairoCustomEnum for multiCall contracts
 * @param {Object} [staticEx] An optional object defining the "Static" value of the CairoCustomEnum.
 * @param {number[]} [ifEqual] An optional array defining the "IfEqual" value of the CairoCustomEnum.
 * @param {number[]} [ifNotEqual] An optional array defining the "IfNotEqual" value of the CairoCustomEnum.
 * @return {CairoCustomEnum} - The created CairoCustomEnum object.
 * @example
 * ```typescript
 * const result: CairoCustomEnum = starknetId.execution(undefined, [1, 2, 3], undefined);
 * // result = CairoCustomEnum {
 * //   variant: {
 * //     Static: undefined,
 * //     IfEqual: { '0': 1, '1': 2, '2': 3 },
 * //     IfNotEqual: undefined
 * //   }
 * // }
 * ```
 */
export function execution(
  staticEx: {} | undefined,
  ifEqual: number[] | undefined = undefined,
  ifNotEqual: number[] | undefined = undefined
): CairoCustomEnum {
  return new CairoCustomEnum({
    Static: staticEx,
    IfEqual: ifEqual ? tuple(ifEqual[0], ifEqual[1], ifEqual[2]) : undefined,
    IfNotEqual: ifNotEqual ? tuple(ifNotEqual[0], ifNotEqual[1], ifNotEqual[2]) : undefined,
  });
}

/**
 * Creates a new instance of CairoCustomEnum.
 *
 * @param {BigNumberish} [hardcoded] The hardcoded value for the CairoCustomEnum.
 * @param {number[]} [reference] The reference array for the CairoCustomEnum.
 * @returns {CairoCustomEnum} The new instance of CairoCustomEnum.
 * @example
 * ```typescript
 * const result: CairoCustomEnum = starknetId.dynamicFelt(undefined, [1, 2]);
 * // result = CairoCustomEnum {
 * //  variant: { Hardcoded: undefined, Reference: { '0': 1, '1': 2 } }
 * // }
 * ```
 */
export function dynamicFelt(
  hardcoded: BigNumberish | undefined,
  reference: number[] | undefined = undefined
): CairoCustomEnum {
  return new CairoCustomEnum({
    Hardcoded: hardcoded,
    Reference: reference ? tuple(reference[0], reference[1]) : undefined,
  });
}

/**
 * Creates a new instance of CairoCustomEnum with the given parameters.
 * @param {BigNumberish} [hardcoded] The hardcoded value.
 * @param {BigNumberish[]} [reference] The reference value (optional).
 * @param {BigNumberish[]} [arrayReference] The array reference value (optional).
 * @return {CairoCustomEnum} The new instance of CairoCustomEnum.
 * @example
 * ```typescript
 * const result: CairoCustomEnum = starknetId.dynamicCallData(undefined, [1, 2], undefined);
 * // result = CairoCustomEnum {
 * //   variant: {
 * //     Hardcoded: undefined,
 * //     Reference: { '0': 1, '1': 2 },
 * //     ArrayReference: undefined
 * //   }
 * // }
 * ```
 */
export function dynamicCallData(
  hardcoded: BigNumberish | undefined,
  reference: BigNumberish[] | undefined = undefined,
  arrayReference: BigNumberish[] | undefined = undefined
): CairoCustomEnum {
  return new CairoCustomEnum({
    Hardcoded: hardcoded,
    Reference: reference ? tuple(reference[0], reference[1]) : undefined,
    ArrayReference: arrayReference ? tuple(arrayReference[0], arrayReference[1]) : undefined,
  });
}

/**
 * Check if a given string is a valid Starknet.id domain.
 *
 * @param {string} domain - The domain string to validate.
 * @returns {boolean} - True if the domain is a valid Starknet.id domain, false otherwise.
 * @example
 * ```typescript
 * const result = starknetId.isStarkDomain("example.stark");
 * // result = true
 *
 * const result2 = starknetId.isStarkDomain("invalid-domain");
 * // result2 = false
 * ```
 */
export function isStarkDomain(domain: string): boolean {
  return /^(?:[a-z0-9-]{1,48}(?:[a-z0-9-]{1,48}[a-z0-9-])?\.)*[a-z0-9-]{1,48}\.stark$/.test(domain);
}
