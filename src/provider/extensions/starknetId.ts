import { BigNumberish, StarkProfile } from '../../types';
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
  /**
   * Retrieves the Stark name associated with a specific address.
   *
   * @param {BigNumberish} address - The address to query the Stark name for.
   * @param {string} [StarknetIdContract] - The Starknet ID contract address. Optional.
   * @returns {Promise<string>} - A Promise that resolves to the Stark name associated with the address.
   */
  async getStarkName(address: BigNumberish, StarknetIdContract?: string) {
    return StarknetId.getStarkName(
      // After Mixin, this is ProviderInterface
      (<unknown>this) as ProviderInterface,
      address,
      StarknetIdContract
    );
  }

  /**
   * Retrieves the address associated with a given Stark name.
   *
   * @param {string} name - The Stark name.
   * @param {string} [StarknetIdContract] - The contract address of the StarknetId smart contract.
   *
   * @returns {Promise<string>} - The address associated with the Stark name.
   */
  public async getAddressFromStarkName(name: string, StarknetIdContract?: string): Promise<string> {
    return StarknetId.getAddressFromStarkName(
      // After Mixin, this is ProviderInterface
      (<unknown>this) as ProviderInterface,
      name,
      StarknetIdContract
    );
  }

  /**
   * Retrieves the Stark profile for a given address.
   *
   * @param {BigNumberish} address - The address for which to retrieve the Stark profile.
   * @param {string} [StarknetIdContract] - The address of the StarknetId contract.
   * @param {string} [StarknetIdIdentityContract] - The address of the StarknetIdIdentity contract.
   * @param {string} [StarknetIdVerifierContract] - The address of the StarknetIdVerifier contract.
   * @param {string} [StarknetIdPfpContract] - The address of the StarknetIdPfp contract.
   * @param {string} [StarknetIdPopContract] - The address of the StarknetIdPop contract.
   * @param {string} [StarknetIdMulticallContract] - The address of the StarknetIdMulticall contract.
   * @returns {Promise<StarkProfile>} A Promise that resolves to the Stark profile.
   */
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

  /**
   * Retrieves the Starkname associated with a given Ethereum address.
   *
   * @param {ProviderInterface} provider - The provider interface.
   * @param {BigNumberish} address - The Ethereum address.
   * @param {string} [StarknetIdContract] - The address of the Starknet Id contract. If not provided, it will be derived based on the chainId.
   * @returns {Promise<string>} - The Starkname associated with the given Ethereum address.
   * @throws {Error} - If the Starkname is not found or if an error occurred while retrieving the Starkname.
   */
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

  /**
   * Retrieves the address associated with a Stark name.
   *
   * @param {ProviderInterface} provider - The provider to use for interacting with the blockchain.
   * @param {string} name - The Stark name to retrieve the address for.
   * @param {string} [StarknetIdContract] - The address of the StarknetId contract. If not provided, it will be retrieved based on the chain Id.
   * @returns {Promise<string>} - The address associated with the Stark name.
   * @throws {Error} - If the address cannot be retrieved.
   */
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

  /**
   * Retrieves the Stark Profile of a user using their Ethereum address.
   *
   * @param {ProviderInterface} provider - The provider interface used to communicate with the blockchain.
   * @param {BigNumberish} address - The Ethereum address of the user.
   * @param {string} [StarknetIdContract] - The contract address of the Starknet ID contract.
   * @param {string} [StarknetIdIdentityContract] - The contract address of the Starknet ID Identity contract.
   * @param {string} [StarknetIdVerifierContract] - The contract address of the Starknet ID Verifier contract.
   * @param {string} [StarknetIdPfpContract] - The contract address of the Starknet ID Pfp contract.
   * @param {string} [StarknetIdPopContract] - The contract address of the Starknet ID Proof-of-Personhood contract.
   * @param {string} [StarknetIdMulticallContract] - The contract address of the Starknet ID Multicall contract.
   * @returns {Promise<StarkProfile>} - The Stark Profile of the user, including their name, social media accounts, proof-of-personhood status, and profile picture.
   * @throws {Error} - If there was an error while retrieving the Stark Profile.
   */
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
      const data = await provider.callContract({
        contractAddress: multicallAddress,
        entrypoint: 'aggregate',
        calldata: CallData.compile({
          calls: [
            {
              execution: execution({}),
              to: dynamicFelt(contract),
              selector: dynamicFelt(getSelectorFromName('address_to_domain')),
              calldata: [dynamicCallData(address)],
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
          ],
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
