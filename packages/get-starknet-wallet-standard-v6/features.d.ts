import type { WalletWithStarknetFeatures as WalletWithStarknetFeaturesV5 } from '@starknet-io/get-starknet-wallet-standard/features';
import type { StandardEventsChangeProperties } from '@starknet-io/get-starknet-wallet-standard/features';
export type { StandardEventsChangeProperties };

// Extends V5's interface to inherit Wallet properties (version, name, icon, chains, accounts).
// Features.starknet:walletApi uses a loose request signature so any V5 or V6 wallet is assignable.
// Replace with the real v6 package types when published.
export interface WalletWithStarknetFeatures extends Omit<WalletWithStarknetFeaturesV5, 'features'> {
  features: {
    'starknet:walletApi': {
      request(call: { type: string; params?: any }): Promise<any>;
    };
    'standard:events': {
      on(event: 'change', callback: (change: StandardEventsChangeProperties) => void): () => void;
    };
  };
}
