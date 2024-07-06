import { BigNumberish, RawArgsArray, StarkProfile } from '../../types';
import { CallData } from '../../utils/calldata';
import { getSelectorFromName } from '../../utils/hash';
import { decodeShortString, encodeShortString } from '../../utils/shortString';
import {
  dynamicCallData,
  dynamicFelt,
  execution,
  getStarknetIdContract,
  getStarknetIdIdentityContract,
  getStarknetIdMulticallContract,
  getStarknetIdPfpContract,
  getStarknetIdPopContract,
  getStarknetIdVerifierContract,
  useDecoded,
  useEncoded,
} from '../../utils/starknetId';
import type { ProviderInterface } from '..';

export class StarknetId {
  async getStarkName(address: BigNumberish, StarknetIdContract?: string) {
    return StarknetId.getStarkName(
      // After Mixin, this is ProviderInterface
      (<unknown>this) as ProviderInterface,
      address,
      StarknetIdContract
    );
  }

  public async getAddressFromStarkName(name: string, StarknetIdContract?: string): Promise<string> {
    return StarknetId.getAddressFromStarkName(
      // After Mixin, this is ProviderInterface
      (<unknown>this) as ProviderInterface,
      name,
      StarknetIdContract
    );
  }

  async getStarkProfile(
    address: BigNumberish,
    StarknetIdContract?: string,
    StarknetIdIdentityContract?: string,
    StarknetIdVerifierContract?: string,
    StarknetIdPfpContract?: string,
    StarknetIdPopContract?: string,
    StarknetIdMulticallContract?: string
  ) {
    return StarknetId.getStarkProfile(
      // After Mixin, this is ProviderInterface
      (<unknown>this) as ProviderInterface,
      address,
      StarknetIdContract,
      StarknetIdIdentityContract,
      StarknetIdVerifierContract,
      StarknetIdPfpContract,
      StarknetIdPopContract,
      StarknetIdMulticallContract
    );
  }

  static async getStarkName(
    provider: ProviderInterface,
    address: BigNumberish,
    StarknetIdContract?: string
  ): Promise<string> {
    const chainId = await provider.getChainId();
    const contract = StarknetIdContract ?? getStarknetIdContract(chainId);

    try {
      const hexDomain = await provider.callContract({
        contractAddress: contract,
        entrypoint: 'address_to_domain',
        calldata: CallData.compile({
          address,
          hint: [],
        }),
      });
      const decimalDomain = hexDomain.map((element) => BigInt(element)).slice(1);

      const stringDomain = useDecoded(decimalDomain);

      if (!stringDomain) {
        throw Error('Starkname not found');
      }

      return stringDomain;
    } catch (e) {
      if (e instanceof Error && e.message === 'Starkname not found') {
        throw e;
      }
      throw Error('Could not get stark name');
    }
  }

  static async getAddressFromStarkName(
    provider: ProviderInterface,
    name: string,
    StarknetIdContract?: string
  ): Promise<string> {
    const chainId = await provider.getChainId();
    const contract = StarknetIdContract ?? getStarknetIdContract(chainId);

    try {
      const encodedDomain = name
        .replace('.stark', '')
        .split('.')
        .map((part) => useEncoded(part).toString(10));

      const addressData = await provider.callContract({
        contractAddress: contract,
        entrypoint: 'domain_to_address',
        calldata: CallData.compile({ domain: encodedDomain, hint: [] }),
      });

      return addressData[0];
    } catch {
      throw Error('Could not get address from stark name');
    }
  }

  static async getStarkProfile(
    provider: ProviderInterface,
    address: BigNumberish,
    StarknetIdContract?: string,
    StarknetIdIdentityContract?: string,
    StarknetIdVerifierContract?: string,
    StarknetIdPfpContract?: string,
    StarknetIdPopContract?: string,
    StarknetIdMulticallContract?: string
  ): Promise<StarkProfile> {
    const chainId = await provider.getChainId();
    const contract = StarknetIdContract ?? getStarknetIdContract(chainId);
    const identityContract = StarknetIdIdentityContract ?? getStarknetIdIdentityContract(chainId);
    const verifierContract = StarknetIdVerifierContract ?? getStarknetIdVerifierContract(chainId);
    const pfpContract = StarknetIdPfpContract ?? getStarknetIdPfpContract(chainId);
    const popContract = StarknetIdPopContract ?? getStarknetIdPopContract(chainId);
    const multicallAddress = StarknetIdMulticallContract ?? getStarknetIdMulticallContract(chainId);

    try {
      const calls: RawArgsArray = [
        {
          execution: execution({}),
          to: dynamicCallData(contract),
          selector: dynamicCallData(getSelectorFromName('address_to_domain')),
          calldata: [dynamicCallData(address), dynamicCallData('0')],
        },
        {
          execution: execution({}),
          to: dynamicFelt(contract),
          selector: dynamicFelt(getSelectorFromName('domain_to_id')),
          calldata: [dynamicCallData(undefined, undefined, [0, 0])],
        },
        {
          execution: execution({}),
          to: dynamicFelt(identityContract),
          selector: dynamicFelt(getSelectorFromName('get_verifier_data')),
          calldata: [
            dynamicCallData(undefined, [1, 0]),
            dynamicCallData(encodeShortString('twitter')),
            dynamicCallData(verifierContract),
            dynamicCallData('0'),
          ],
        },
        {
          execution: execution({}),
          to: dynamicFelt(identityContract),
          selector: dynamicFelt(getSelectorFromName('get_verifier_data')),
          calldata: [
            dynamicCallData(undefined, [1, 0]),
            dynamicCallData(encodeShortString('github')),
            dynamicCallData(verifierContract),
            dynamicCallData('0'),
          ],
        },
        {
          execution: execution({}),
          to: dynamicFelt(identityContract),
          selector: dynamicFelt(getSelectorFromName('get_verifier_data')),
          calldata: [
            dynamicCallData(undefined, [1, 0]),
            dynamicCallData(encodeShortString('discord')),
            dynamicCallData(verifierContract),
            dynamicCallData('0'),
          ],
        },
        {
          execution: execution({}),
          to: dynamicFelt(identityContract),
          selector: dynamicFelt(getSelectorFromName('get_verifier_data')),
          calldata: [
            dynamicCallData(undefined, [1, 0]),
            dynamicCallData(encodeShortString('proof_of_personhood')),
            dynamicCallData(popContract),
            dynamicCallData('0'),
          ],
        },
        // PFP
        {
          execution: execution({}),
          to: dynamicFelt(identityContract),
          selector: dynamicFelt(getSelectorFromName('get_verifier_data')),
          calldata: [
            dynamicCallData(undefined, [1, 0]),
            dynamicCallData(encodeShortString('nft_pp_contract')),
            dynamicCallData(pfpContract),
            dynamicCallData('0'),
          ],
        },
        {
          execution: execution({}),
          to: dynamicFelt(identityContract),
          selector: dynamicFelt(getSelectorFromName('get_extended_verifier_data')),
          calldata: [
            dynamicCallData(undefined, [1, 0]),
            dynamicCallData(encodeShortString('nft_pp_id')),
            dynamicCallData('2'),
            dynamicCallData(pfpContract),
            dynamicCallData('0'),
          ],
        },
        {
          execution: execution(undefined, undefined, [6, 0, 0]),
          to: dynamicFelt(undefined, [6, 0]),
          selector: dynamicFelt(getSelectorFromName('tokenURI')),
          calldata: [dynamicCallData(undefined, [7, 1]), dynamicCallData(undefined, [7, 2])],
        },
      ];

      const data = await provider.callContract({
        contractAddress: multicallAddress,
        entrypoint: 'aggregate',
        calldata: CallData.compile({
          calls,
        }),
      });

      if (Array.isArray(data)) {
        // Format data
        const size = parseInt(data[0], 16);
        const finalArray: string[][] = [];
        let index = 1;
        for (let i = 0; i < size; i += 1) {
          if (index < data.length) {
            const subArraySize = parseInt(data[index], 16);
            index += 1;

            const subArray = data.slice(index, index + subArraySize);
            finalArray.push(subArray);

            index += subArraySize;
          } else {
            break;
          }
        }

        const name = useDecoded(finalArray[0].slice(1).map((hexString) => BigInt(hexString)));

        const twitter =
          finalArray[2][0] !== '0x0' ? BigInt(finalArray[2][0]).toString() : undefined;
        const github = finalArray[3][0] !== '0x0' ? BigInt(finalArray[3][0]).toString() : undefined;
        const discord =
          finalArray[4][0] !== '0x0' ? BigInt(finalArray[4][0]).toString() : undefined;
        const proofOfPersonhood = finalArray[5][0] === '0x1'; // 10

        const profilePictureMetadata =
          data[0] === '0x9'
            ? finalArray[8]
                .slice(1)
                .map((val: string) => decodeShortString(val))
                .join('')
            : undefined;

        const profilePicture =
          profilePictureMetadata ||
          `https://starknet.id/api/identicons/${BigInt(finalArray[1][0]).toString()}`;

        return {
          name,
          twitter,
          github,
          discord,
          proofOfPersonhood,
          profilePicture,
        };
      }
      throw Error('Error while calling aggregate function');
    } catch (e) {
      if (e instanceof Error) {
        throw e;
      }
      throw Error('Could not get user stark profile data from address');
    }
  }
}
