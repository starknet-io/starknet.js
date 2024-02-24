import type { WalletProvider } from '../discovery';
import { StarknetWindowObject } from '../StarknetWindowObject';

export declare type FilterList = string[];
interface FilterByOptions {
  include?: FilterList;
  exclude?: FilterList;
}
export declare function filterBy<T extends StarknetWindowObject | WalletProvider>(
  installed: T[],
  options?: FilterByOptions
): T[];
/**
 * filters given wallets array, return only preAuthorized instances
 * @param wallets
 */
export declare const filterByAuthorized: (
  wallets: StarknetWindowObject[]
) => Promise<StarknetWindowObject[]>;
export {};
