import { SNIP9_V1_INTERFACE_ID, SNIP9_V2_INTERFACE_ID } from '../../global/constants';
import type { AccountInterface } from '../../account/interface';
import type { BigNumberish, Call, InvokeFunctionResponse } from '../../types';
import { OutsideExecutionVersion } from '../../types';
import type {
  ExecutableUserTransaction,
  ExecutionParameters,
  PreparedTransaction,
  UserTransaction,
  PaymasterFeeEstimate,
  PaymasterDetails,
} from './types/response.type';
import { supportsInterface } from '../../utils/src5';
import { signatureToHexArray } from '../../utils/stark';
import type { PaymasterInterface } from './interface';
import { assertPaymasterTransactionSafety } from './utils';

export class PaymasterPluginImpl {
  static async getSnip9Version(account: AccountInterface): Promise<string> {
    if (await supportsInterface(account.provider, account.address, SNIP9_V2_INTERFACE_ID)) {
      return OutsideExecutionVersion.V2;
    }
    if (await supportsInterface(account.provider, account.address, SNIP9_V1_INTERFACE_ID)) {
      return OutsideExecutionVersion.V1;
    }
    return OutsideExecutionVersion.UNSUPPORTED;
  }

  static async build(
    account: AccountInterface,
    paymaster: PaymasterInterface,
    calls: Call[],
    paymasterDetails: PaymasterDetails
  ): Promise<PreparedTransaction> {
    // If the account isn't deployed, we can't call the supportsInterface function to know if the account is compatible with SNIP-9
    if (!paymasterDetails.deploymentData) {
      const snip9Version = await PaymasterPluginImpl.getSnip9Version(account);
      if (snip9Version === OutsideExecutionVersion.UNSUPPORTED) {
        throw Error('Account is not compatible with SNIP-9');
      }
    }
    const parameters: ExecutionParameters = {
      version: '0x1',
      feeMode: paymasterDetails.feeMode,
      timeBounds: paymasterDetails.timeBounds,
    };
    let transaction: UserTransaction;
    if (paymasterDetails.deploymentData) {
      if (calls.length > 0) {
        transaction = {
          type: 'deploy_and_invoke',
          invoke: { userAddress: account.address, calls },
          deployment: paymasterDetails.deploymentData,
        };
      } else {
        transaction = {
          type: 'deploy',
          deployment: paymasterDetails.deploymentData,
        };
      }
    } else {
      transaction = {
        type: 'invoke',
        invoke: { userAddress: account.address, calls },
      };
    }
    return paymaster.buildTransaction(transaction, parameters);
  }

  static async estimate(
    account: AccountInterface,
    paymaster: PaymasterInterface,
    calls: Call[],
    paymasterDetails: PaymasterDetails
  ): Promise<PaymasterFeeEstimate> {
    const preparedTransaction = await PaymasterPluginImpl.build(
      account,
      paymaster,
      calls,
      paymasterDetails
    );
    return preparedTransaction.fee;
  }

  static async prepare(
    account: AccountInterface,
    preparedTransaction: PreparedTransaction
  ): Promise<ExecutableUserTransaction> {
    let transaction: ExecutableUserTransaction;
    switch (preparedTransaction.type) {
      case 'deploy_and_invoke': {
        const signature = await account.signMessage(preparedTransaction.typed_data);
        transaction = {
          type: 'deploy_and_invoke',
          invoke: {
            userAddress: account.address,
            typedData: preparedTransaction.typed_data,
            signature: signatureToHexArray(signature),
          },
          deployment: preparedTransaction.deployment,
        };
        break;
      }
      case 'invoke': {
        const signature = await account.signMessage(preparedTransaction.typed_data);
        transaction = {
          type: 'invoke',
          invoke: {
            userAddress: account.address,
            typedData: preparedTransaction.typed_data,
            signature: signatureToHexArray(signature),
          },
        };
        break;
      }
      case 'deploy': {
        transaction = {
          type: 'deploy',
          deployment: preparedTransaction.deployment,
        };
        break;
      }
      default:
        throw Error('Invalid transaction type');
    }
    return transaction;
  }

  static async execute(
    account: AccountInterface,
    paymaster: PaymasterInterface,
    calls: Call[],
    paymasterDetails: PaymasterDetails,
    maxFeeInGasToken?: BigNumberish
  ): Promise<InvokeFunctionResponse> {
    // Build the transaction
    const preparedTransaction = await PaymasterPluginImpl.build(
      account,
      paymaster,
      calls,
      paymasterDetails
    );

    // Check the transaction is safe
    assertPaymasterTransactionSafety(
      preparedTransaction,
      calls,
      paymasterDetails,
      maxFeeInGasToken
    );

    // Prepare the transaction, tx is safe here
    const transaction: ExecutableUserTransaction = await PaymasterPluginImpl.prepare(
      account,
      preparedTransaction
    );

    // Execute the transaction
    return paymaster
      .executeTransaction(transaction, preparedTransaction.parameters)
      .then((response) => ({ transaction_hash: response.transaction_hash }));
  }
}
