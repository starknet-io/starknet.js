/**
 * Transaction Hash based on Transaction Version
 */

import { StarknetChainId } from '../../../global/constants';
import { ResourceBoundsBN } from '../../../provider/types/spec.type';
import { BigNumberish, Calldata } from '../../../types';
import { EDAMode, ETransactionVersion, ETransactionVersion3 } from '../../../types/api';
import {
  calculateDeclareTransactionHash as v3calculateDeclareTransactionHash,
  calculateDeployAccountTransactionHash as v3calculateDeployAccountTransactionHash,
  calculateInvokeTransactionHash as v3calculateInvokeTransactionHash,
} from './v3';

export { calculateL2MessageTxHash } from './v2';
/*
 * INVOKE TX HASH
 */

type Version = typeof ETransactionVersion.V3 | typeof ETransactionVersion.F3;

function isV3InvokeTx(args: CalcInvokeTxHashArgs): args is CalcV3InvokeTxHashArgs {
  return [ETransactionVersion.V3, ETransactionVersion.F3].includes(args.version as Version);
}

type CalcV3InvokeTxHashArgs = {
  senderAddress: BigNumberish;
  version: `${ETransactionVersion3}`;
  compiledCalldata: Calldata;
  chainId: StarknetChainId;
  nonce: BigNumberish;
  accountDeploymentData: BigNumberish[];
  nonceDataAvailabilityMode: EDAMode;
  feeDataAvailabilityMode: EDAMode;
  resourceBounds: ResourceBoundsBN;
  tip: BigNumberish;
  paymasterData: BigNumberish[];
};

type CalcInvokeTxHashArgs = CalcV3InvokeTxHashArgs;

export function calculateInvokeTransactionHash(args: CalcInvokeTxHashArgs) {
  if (isV3InvokeTx(args)) {
    return v3calculateInvokeTransactionHash(
      args.senderAddress,
      args.version,
      args.compiledCalldata,
      args.chainId,
      args.nonce,
      args.accountDeploymentData,
      args.nonceDataAvailabilityMode,
      args.feeDataAvailabilityMode,
      args.resourceBounds,
      args.tip,
      args.paymasterData
    );
  }

  throw new Error('Invalid Tx version for hash calculation');
}

/*
 * DECLARE TX HASH
 */
function isV3DeclareTx(args: CalcDeclareTxHashArgs): args is CalcV3DeclareTxHashArgs {
  return [ETransactionVersion.V3, ETransactionVersion.F3].includes(args.version as Version);
}

type CalcV3DeclareTxHashArgs = {
  classHash: string;
  compiledClassHash: string;
  senderAddress: BigNumberish;
  version: `${ETransactionVersion3}`;
  chainId: StarknetChainId;
  nonce: BigNumberish;
  accountDeploymentData: BigNumberish[];
  nonceDataAvailabilityMode: EDAMode;
  feeDataAvailabilityMode: EDAMode;
  resourceBounds: ResourceBoundsBN;
  tip: BigNumberish;
  paymasterData: BigNumberish[];
};

type CalcDeclareTxHashArgs = CalcV3DeclareTxHashArgs;

export function calculateDeclareTransactionHash(args: CalcDeclareTxHashArgs) {
  if (isV3DeclareTx(args)) {
    return v3calculateDeclareTransactionHash(
      args.classHash,
      args.compiledClassHash,
      args.senderAddress,
      args.version,
      args.chainId,
      args.nonce,
      args.accountDeploymentData,
      args.nonceDataAvailabilityMode,
      args.feeDataAvailabilityMode,
      args.resourceBounds,
      args.tip,
      args.paymasterData
    );
  }

  throw new Error('Invalid Tx version for hash calculation');
}

/*
 * DEPLOY ACCOUNT TX HASH
 */

function isV3DeployAccountTx(
  args: CalcDeployAccountTxHashArgs
): args is CalcV3DeployAccountTxHashArgs {
  return [ETransactionVersion.V3, ETransactionVersion.F3].includes(args.version as Version);
}

type CalcV3DeployAccountTxHashArgs = {
  contractAddress: BigNumberish;
  classHash: BigNumberish;
  compiledConstructorCalldata: Calldata;
  salt: BigNumberish;
  version: `${ETransactionVersion3}`;
  chainId: StarknetChainId;
  nonce: BigNumberish;
  nonceDataAvailabilityMode: EDAMode;
  feeDataAvailabilityMode: EDAMode;
  resourceBounds: ResourceBoundsBN;
  tip: BigNumberish;
  paymasterData: BigNumberish[];
};

type CalcDeployAccountTxHashArgs = CalcV3DeployAccountTxHashArgs;

export function calculateDeployAccountTransactionHash(args: CalcDeployAccountTxHashArgs) {
  if (isV3DeployAccountTx(args)) {
    return v3calculateDeployAccountTransactionHash(
      args.contractAddress,
      args.classHash,
      args.compiledConstructorCalldata,
      args.salt,
      args.version,
      args.chainId,
      args.nonce,
      args.nonceDataAvailabilityMode,
      args.feeDataAvailabilityMode,
      args.resourceBounds,
      args.tip,
      args.paymasterData
    );
  }

  throw new Error('Invalid Tx version for hash calculation');
}
