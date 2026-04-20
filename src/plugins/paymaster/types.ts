import type { BigNumberish, Call, InvokeFunctionResponse } from '../../types';
import type { ArgsOrCalldata } from '../../contract/types/index.type';
import type {
  PaymasterFeeEstimate,
  PreparedTransaction,
  TokenData,
  PaymasterDetails,
  ExecutableUserTransaction,
} from './types/response.type';
import type { PaymasterInterface } from './interface';

export type { PaymasterDetails } from './types/response.type';

export interface PaymasterContractMethods {
  invokePaymaster(
    method: string,
    args: ArgsOrCalldata,
    paymasterDetails: PaymasterDetails,
    maxFeeInGasToken?: BigNumberish
  ): Promise<InvokeFunctionResponse>;
  estimatePaymaster(
    method: string,
    args: ArgsOrCalldata,
    paymasterDetails: PaymasterDetails
  ): Promise<PaymasterFeeEstimate>;
}

export interface PaymasterAccountMethods {
  buildPaymasterTransaction(
    calls: Call[],
    paymasterDetails: PaymasterDetails
  ): Promise<PreparedTransaction>;
  estimatePaymasterTransactionFee(
    calls: Call[],
    paymasterDetails: PaymasterDetails
  ): Promise<PaymasterFeeEstimate>;
  preparePaymasterTransaction(
    preparedTransaction: PreparedTransaction
  ): Promise<ExecutableUserTransaction>;
  executePaymasterTransaction(
    calls: Call[],
    paymasterDetails: PaymasterDetails,
    maxFeeInGasToken?: BigNumberish
  ): Promise<InvokeFunctionResponse>;
  isPaymasterAvailable(): Promise<boolean>;
  getPaymasterSupportedTokens(): Promise<TokenData[]>;
  paymaster: PaymasterInterface;
}
