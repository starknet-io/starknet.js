import { BigNumberish } from '../../types';
import { CallData } from '../../utils/calldata';
import { decodeShortString, encodeShortString } from '../../utils/shortString';
import type { ProviderInterface } from '..';
import { StarknetChainId } from '../../global/constants';

/**
 * Validates if a domain is a valid .brother domain
 * @param domain - Domain name to validate
 * @returns true if the domain is valid
 */
export function isBrotherDomain(domain: string): boolean {
  return domain.endsWith('.brother');
}

/**
 * Get the Brother ID contract address for the specified network
 * @param chainId - The Starknet chain ID
 * @returns The Brother ID contract address for the network
 */
export function getBrotherIdContract(chainId: StarknetChainId): string {
  switch (chainId) {
    case StarknetChainId.SN_MAIN:
      return '0x0212f1c57700f5a3913dd11efba540196aad4cf67772f7090c62709dd804fa74';
    default:
      return '0x0212f1c57700f5a3913dd11efba540196aad4cf67772f7090c62709dd804fa74'; // Default to mainnet address
  }
}

/**
 * Interface representing a Brother domain profile
 * @property name - The domain name without .brother suffix
 * @property resolver - The address that resolves to this domain
 * @property tokenId - The unique identifier of the domain NFT
 * @property expiryDate - Unix timestamp when the domain expires
 * @property lastTransferTime - Unix timestamp of the last transfer
 */
export interface BrotherProfile {
  name: string;
  resolver: string;
  tokenId: string;
  expiryDate: number;
  lastTransferTime: number;
}

/**
 * Class providing methods to interact with Brother Identity contracts
 */
export class BrotherId {
  /**
   * Gets the primary Brother domain name for an address
   * @param address - The address to get the domain for
   * @param BrotherIdContract - Optional contract address
   * @returns The domain name with .brother suffix
   */
  async getBrotherName(address: BigNumberish, BrotherIdContract?: string) {
    return BrotherId.getBrotherName(
      // After Mixin, this is ProviderInterface
      (<unknown>this) as ProviderInterface,
      address,
      BrotherIdContract
    );
  }

  /**
   * Gets the address associated with a Brother domain name
   * @param name - The domain name (with or without .brother suffix)
   * @param BrotherIdContract - Optional contract address
   * @returns The resolver address for the domain
   */
  public async getAddressFromBrotherName(
    name: string,
    BrotherIdContract?: string
  ): Promise<string> {
    return BrotherId.getAddressFromBrotherName(
      // After Mixin, this is ProviderInterface
      (<unknown>this) as ProviderInterface,
      name,
      BrotherIdContract
    );
  }

  /**
   * Gets the complete profile information for a Brother domain
   * @param address - The address to get the profile for
   * @param BrotherIdContract - Optional contract address
   * @returns The complete Brother profile information
   */
  async getBrotherProfile(address: BigNumberish, BrotherIdContract?: string) {
    return BrotherId.getBrotherProfile(
      // After Mixin, this is ProviderInterface
      (<unknown>this) as ProviderInterface,
      address,
      BrotherIdContract
    );
  }

  /**
   * Static implementation of getBrotherName
   * @param provider - The provider interface
   * @param address - The address to get the domain for
   * @param BrotherIdContract - Optional contract address
   * @returns The domain name with .brother suffix
   */
  static async getBrotherName(
    provider: ProviderInterface,
    address: BigNumberish,
    BrotherIdContract?: string
  ): Promise<string> {
    const chainId = await provider.getChainId();
    const contract = BrotherIdContract ?? getBrotherIdContract(chainId);

    try {
      const primaryDomain = await provider.callContract({
        contractAddress: contract,
        entrypoint: 'getPrimary',
        calldata: CallData.compile({
          user: address,
        }),
      });

      if (!primaryDomain[0] || primaryDomain[0] === '0x0') {
        throw Error('Brother name not found');
      }

      const domain = decodeShortString(primaryDomain[0]);
      return `${domain}.brother`;
    } catch (e) {
      if (e instanceof Error && e.message === 'Brother name not found') {
        throw e;
      }
      throw Error('Could not get brother name');
    }
  }

  /**
   * Static implementation of getAddressFromBrotherName
   * @param provider - The provider interface
   * @param name - The domain name
   * @param BrotherIdContract - Optional contract address
   * @returns The resolver address
   */
  static async getAddressFromBrotherName(
    provider: ProviderInterface,
    name: string,
    BrotherIdContract?: string
  ): Promise<string> {
    const brotherName = name.endsWith('.brother') ? name : `${name}.brother`;

    if (!isBrotherDomain(brotherName)) {
      throw new Error('Invalid domain, must be a valid .brother domain');
    }

    const chainId = await provider.getChainId();
    const contract = BrotherIdContract ?? getBrotherIdContract(chainId);

    try {
      const domainDetails = await provider.callContract({
        contractAddress: contract,
        entrypoint: 'get_details_by_domain',
        calldata: CallData.compile({
          domain: encodeShortString(brotherName.replace('.brother', '')),
        }),
      });

      if (!domainDetails[0] || domainDetails[1] === '0x0') {
        throw Error('Could not get address from brother name');
      }

      return domainDetails[1]; // resolver address
    } catch {
      throw Error('Could not get address from brother name');
    }
  }

  /**
   * Static implementation of getBrotherProfile
   * @param provider - The provider interface
   * @param address - The address to get the profile for
   * @param BrotherIdContract - Optional contract address
   * @returns The complete Brother profile
   */
  static async getBrotherProfile(
    provider: ProviderInterface,
    address: BigNumberish,
    BrotherIdContract?: string
  ): Promise<BrotherProfile> {
    const chainId = await provider.getChainId();
    const contract = BrotherIdContract ?? getBrotherIdContract(chainId);

    try {
      const primaryDomain = await provider.callContract({
        contractAddress: contract,
        entrypoint: 'getPrimary',
        calldata: CallData.compile({
          user: address,
        }),
      });

      if (!primaryDomain[0] || primaryDomain[0] === '0x0') {
        throw Error('Brother profile not found');
      }

      const domain = decodeShortString(primaryDomain[0]);

      const domainDetails = await provider.callContract({
        contractAddress: contract,
        entrypoint: 'get_details_by_domain',
        calldata: CallData.compile({
          domain: encodeShortString(domain),
        }),
      });

      return {
        name: domain,
        resolver: domainDetails[1],
        tokenId: domainDetails[2],
        expiryDate: parseInt(domainDetails[3], 16),
        lastTransferTime: parseInt(domainDetails[4], 16),
      };
    } catch (e) {
      if (e instanceof Error && e.message === 'Brother profile not found') {
        throw e;
      }
      throw Error('Could not get brother profile');
    }
  }
}
