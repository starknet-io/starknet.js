import type { StarknetWindowObject } from '../StarknetWindowObject';

export declare function scanObjectForWallets(
  obj: Record<string, any>,
  isWalletObject: (wallet: any) => boolean
): StarknetWindowObject[];
