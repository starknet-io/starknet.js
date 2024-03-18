import { WalletProvider } from '../discovery';
import { StarknetWindowObject } from '../StarknetWindowObject';

export declare type Sort = string[] | 'random' | null | undefined;
export declare const sortBy: <T extends WalletProvider | StarknetWindowObject>(
  wallets: T[],
  sort: Sort
) => T[];
