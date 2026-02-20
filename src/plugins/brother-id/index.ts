import type { BigNumberish } from '../../types';
import { CallData } from '../../utils/calldata';
import type { ProviderInterface } from '../../provider/interface';
import { StarknetChainId } from '../../global/constants';
import { useEncoded, useDecoded } from '../../utils/starknetId';
import type { StarknetPlugin } from '../types';

// --- Utilities ---

export function isBrotherDomain(domain: string): boolean {
  return domain.endsWith('.brother');
}

export function encodeBrotherDomain(domain: string): bigint {
  const brotherName = domain.endsWith('.brother') ? domain.replace('.brother', '') : domain;
  return useEncoded(brotherName);
}

export function decodeBrotherDomain(encoded: bigint): string {
  const decoded = useDecoded([encoded]);
  if (decoded.endsWith('.stark')) {
    return decoded.replace('.stark', '.brother');
  }
  return decoded ? `${decoded}.brother` : decoded;
}

export function getBrotherIdContract(chainId: StarknetChainId): string {
  switch (chainId) {
    case StarknetChainId.SN_MAIN:
      return '0x0212f1c57700f5a3913dd11efba540196aad4cf67772f7090c62709dd804fa74';
    default:
      return '0x0212f1c57700f5a3913dd11efba540196aad4cf67772f7090c62709dd804fa74';
  }
}

// --- Types ---

export interface BrotherProfile {
  name: string;
  resolver: string;
  tokenId: string;
  expiryDate: number;
  lastTransferTime: number;
}

export interface BrotherIdProviderMethods {
  getBrotherName(address: BigNumberish, BrotherIdContract?: string): Promise<string>;
  getAddressFromBrotherName(name: string, BrotherIdContract?: string): Promise<string>;
  getBrotherProfile(address: BigNumberish, BrotherIdContract?: string): Promise<BrotherProfile>;
}

// --- Static implementation ---

export class BrotherIdImpl {
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

      const encodedDomain = BigInt(primaryDomain[0]);
      return decodeBrotherDomain(encodedDomain);
    } catch (e) {
      if (e instanceof Error && e.message === 'Brother name not found') {
        throw e;
      }
      throw Error('Could not get brother name');
    }
  }

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
          domain: encodeBrotherDomain(brotherName),
        }),
      });

      if (!domainDetails[0] || domainDetails[1] === '0x0') {
        throw Error('Could not get address from brother name');
      }

      return domainDetails[1];
    } catch {
      throw Error('Could not get address from brother name');
    }
  }

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

      const encodedDomain = BigInt(primaryDomain[0]);
      const decodedDomain = decodeBrotherDomain(encodedDomain);
      const domain = decodedDomain.replace('.brother', '');

      const domainDetails = await provider.callContract({
        contractAddress: contract,
        entrypoint: 'get_details_by_domain',
        calldata: CallData.compile({
          domain: encodeBrotherDomain(domain),
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

// --- Plugin factory ---

/**
 * BrotherId plugin - adds .brother domain resolution methods.
 *
 * @example
 * ```typescript
 * import { RpcProvider, brotherId } from 'starknet';
 * const provider = new RpcProvider({ plugins: [brotherId()] });
 * const name = await provider.getBrotherName('0x123...');
 * ```
 */
export function brotherId(): StarknetPlugin<BrotherIdProviderMethods> {
  return {
    name: 'brother-id',

    extend(provider: ProviderInterface): BrotherIdProviderMethods {
      return {
        getBrotherName: (address: BigNumberish, contract?: string) =>
          BrotherIdImpl.getBrotherName(provider, address, contract),
        getAddressFromBrotherName: (name: string, contract?: string) =>
          BrotherIdImpl.getAddressFromBrotherName(provider, name, contract),
        getBrotherProfile: (address: BigNumberish, contract?: string) =>
          BrotherIdImpl.getBrotherProfile(provider, address, contract),
      };
    },
  };
}
