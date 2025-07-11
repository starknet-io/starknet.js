import { StarknetChainId } from '../global/constants';
import { ETransactionVersion, ETransactionVersion3 } from './api';
import {
  BigNumberish,
  CairoVersion,
  DeployAccountContractPayload,
  V3TransactionDetails,
} from './lib';

export type InvocationsSignerDetails = V3InvocationsSignerDetails & {
  version: `${ETransactionVersion}`;
  skipValidate?: boolean;
};

export type V3InvocationsSignerDetails = V3TransactionDetails & {
  walletAddress: string;
  cairoVersion: CairoVersion;
  chainId: StarknetChainId;
  version: `${ETransactionVersion3}`;
};

export type DeclareSignerDetails = V3DeclareSignerDetails & {
  version: `${ETransactionVersion}`;
};

export type V3DeclareSignerDetails = V3TransactionDetails & {
  classHash: string;
  compiledClassHash: string;
  senderAddress: string;
  chainId: StarknetChainId;
  version: `${ETransactionVersion3}`;
};

export type DeployAccountSignerDetails = V3DeployAccountSignerDetails;

export type V3DeployAccountSignerDetails = Required<DeployAccountContractPayload> &
  V3TransactionDetails & {
    contractAddress: BigNumberish;
    chainId: StarknetChainId;
    version: `${ETransactionVersion3}`;
  };

export type LedgerPathCalculation = (accountId: number, applicationName: string) => Uint8Array;
