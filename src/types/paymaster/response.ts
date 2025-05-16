/**
 * Common interface response
 * Intersection (sequencer response ∩ (∪ rpc responses))
 */

import { BigNumberish, Call } from '../lib';
import { OutsideExecutionTypedData, PAYMASTER_API } from '../api';

export type PaymasterFeeEstimate = {
  gas_token_price_in_strk: BigNumberish;
  estimated_fee_in_strk: BigNumberish;
  estimated_fee_in_gas_token: BigNumberish;
  suggested_max_fee_in_strk: BigNumberish;
  suggested_max_fee_in_gas_token: BigNumberish;
};

export type PreparedDeployTransaction = {
  type: 'deploy';
  deployment: PAYMASTER_API.ACCOUNT_DEPLOYMENT_DATA;
  parameters: ExecutionParameters;
  fee: PaymasterFeeEstimate;
};
export type PreparedInvokeTransaction = {
  type: 'invoke';
  typed_data: OutsideExecutionTypedData;
  parameters: ExecutionParameters;
  fee: PaymasterFeeEstimate;
};
export type PreparedDeployAndInvokeTransaction = {
  type: 'deploy_and_invoke';
  deployment: PAYMASTER_API.ACCOUNT_DEPLOYMENT_DATA;
  typed_data: OutsideExecutionTypedData;
  parameters: ExecutionParameters;
  fee: PaymasterFeeEstimate;
};
export type PreparedTransaction =
  | PreparedDeployTransaction
  | PreparedInvokeTransaction
  | PreparedDeployAndInvokeTransaction;

export interface TokenData {
  token_address: string;
  decimals: number;
  priceInStrk: BigNumberish;
}

export type DeployTransaction = {
  type: 'deploy';
  deployment: PAYMASTER_API.ACCOUNT_DEPLOYMENT_DATA;
};
export type InvokeTransaction = {
  type: 'invoke';
  invoke: UserInvoke;
};
export type UserInvoke = {
  userAddress: string;
  calls: Call[];
};
export type DeployAndInvokeTransaction = {
  type: 'deploy_and_invoke';
  deployment: PAYMASTER_API.ACCOUNT_DEPLOYMENT_DATA;
  invoke: UserInvoke;
};
export type UserTransaction = DeployTransaction | InvokeTransaction | DeployAndInvokeTransaction;

export type ExecutableDeployTransaction = {
  type: 'deploy';
  deployment: PAYMASTER_API.ACCOUNT_DEPLOYMENT_DATA;
};
export type ExecutableInvokeTransaction = {
  type: 'invoke';
  invoke: ExecutableUserInvoke;
};
export type ExecutableUserInvoke = {
  userAddress: string;
  typedData: OutsideExecutionTypedData;
  signature: string[];
};
export type ExecutableDeployAndInvokeTransaction = {
  type: 'deploy_and_invoke';
  deployment: PAYMASTER_API.ACCOUNT_DEPLOYMENT_DATA;
  invoke: ExecutableUserInvoke;
};
export type ExecutableUserTransaction =
  | ExecutableDeployTransaction
  | ExecutableInvokeTransaction
  | ExecutableDeployAndInvokeTransaction;

export type FeeMode = { mode: 'sponsored' } | { mode: 'default'; gasToken: string };
export type ExecutionParameters = {
  version: '0x1';
  feeMode: FeeMode;
  timeBounds?: PaymasterTimeBounds;
};

export interface PaymasterTimeBounds {
  executeAfter?: Date;
  executeBefore?: Date;
}
