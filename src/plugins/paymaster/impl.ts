import type { Account } from '../../account/default';
import type { BigNumberish, Call, InvokeFunctionResponse } from '../../types';
import { OutsideExecutionVersion } from '../../types';
import { signatureToHexArray } from '../../utils/stark';
import type {
  ExecutableUserTransaction,
  ExecutionParameters,
  PaymasterDetails,
  PaymasterFeeEstimate,
  PreparedTransaction,
  UserTransaction,
} from './types/response.type';
import { assertPaymasterTransactionSafety } from './utils';

/**
 * The SNIP-29 paymaster methods of an Account. The paymaster plugin adds them to each Account.
 *
 * Each method reads the account at each call: its paymaster, its address, its provider and its
 * other paymaster methods. So a paymaster replaced after the account is created is used, and a
 * method that a subclass redefines is called.
 */
export class PaymasterImpl {
  /**
   * Asks the paymaster to build a transaction for the calls of an account.
   * @param {Account} account The account that will sign the transaction.
   * @param {Call[]} calls The calls to execute.
   * @param {PaymasterDetails} paymasterDetails The fee mode, and optionally the deployment data
   * and the time bounds.
   * @returns {Promise<PreparedTransaction>} The transaction prepared by the paymaster, with its
   * typed data to sign and its fees.
   * @example
   * ```typescript
   * const prepared = await PaymasterImpl.build(myAccount, [myCall], {
   *   feeMode: { mode: 'sponsored' },
   * });
   * // prepared.type = 'invoke'
   * ```
   */
  static async build(
    account: Account,
    calls: Call[],
    paymasterDetails: PaymasterDetails
  ): Promise<PreparedTransaction> {
    // If the account isn't deployed, we can't call the supportsInterface function to know if the account is compatible with SNIP-9
    if (!paymasterDetails.deploymentData) {
      const snip9Version = await account.getSnip9Version();
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
    return account.paymaster.buildTransaction(transaction, parameters);
  }

  /**
   * Asks the paymaster for the fees of the calls of an account.
   * @param {Account} account The account that will sign the transaction.
   * @param {Call[]} calls The calls to execute.
   * @param {PaymasterDetails} paymasterDetails The fee mode, and optionally the deployment data
   * and the time bounds.
   * @returns {Promise<PaymasterFeeEstimate>} The fees, in STRK and in the gas token.
   * @example
   * ```typescript
   * const fees = await PaymasterImpl.estimate(myAccount, [myCall], {
   *   feeMode: { mode: 'default', gasToken: usdcAddress },
   * });
   * // fees.suggested_max_fee_in_gas_token is the fee to show to the user
   * ```
   */
  static async estimate(
    account: Account,
    calls: Call[],
    paymasterDetails: PaymasterDetails
  ): Promise<PaymasterFeeEstimate> {
    const preparedTransaction = await account.buildPaymasterTransaction(calls, paymasterDetails);
    return preparedTransaction.fee;
  }

  /**
   * Checks that a transaction prepared by the paymaster is safe to sign, then signs it.
   * @param {Account} account The account that signs the transaction.
   * @param {PreparedTransaction} preparedTransaction The transaction returned by the paymaster.
   * @param {Call[]} calls The calls the user requested.
   * @param {PaymasterDetails} paymasterDetails The fee mode and related paymaster details.
   * @param {BigNumberish} [maxFeeInGasToken] Optional user-approved ceiling on the gas-token fee.
   * @returns {Promise<ExecutableUserTransaction>} The transaction to send to the paymaster.
   * @example
   * ```typescript
   * const prepared = await PaymasterImpl.build(myAccount, [myCall], paymasterDetails);
   * const executable = await PaymasterImpl.prepare(myAccount, prepared, [myCall], paymasterDetails);
   * // executable.type = 'invoke'
   * ```
   */
  static async prepare(
    account: Account,
    preparedTransaction: PreparedTransaction,
    calls: Call[],
    paymasterDetails: PaymasterDetails,
    maxFeeInGasToken?: BigNumberish
  ): Promise<ExecutableUserTransaction> {
    // Check the transaction is safe before signing it: chain binding, gas fee value & gas token
    // address, that the provided calls match the built calls, and that the hash that gets signed
    // is this outside execution and nothing else.
    assertPaymasterTransactionSafety(
      preparedTransaction,
      calls,
      paymasterDetails,
      await account.provider.getChainId(),
      maxFeeInGasToken
    );
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

  /**
   * Builds, checks, signs and sends a paymaster transaction for the calls of an account.
   * @param {Account} account The account that signs the transaction.
   * @param {Call[]} calls The calls to execute.
   * @param {PaymasterDetails} paymasterDetails The fee mode, and optionally the deployment data
   * and the time bounds.
   * @param {BigNumberish} [maxFeeInGasToken] Optional user-approved ceiling on the gas-token fee.
   * @returns {Promise<InvokeFunctionResponse>} The hash of the transaction sent by the paymaster.
   * @example
   * ```typescript
   * const { transaction_hash } = await PaymasterImpl.execute(myAccount, [myCall], {
   *   feeMode: { mode: 'sponsored' },
   * });
   * await myAccount.provider.waitForTransaction(transaction_hash);
   * ```
   */
  static async execute(
    account: Account,
    calls: Call[],
    paymasterDetails: PaymasterDetails,
    maxFeeInGasToken?: BigNumberish
  ): Promise<InvokeFunctionResponse> {
    // Build the transaction
    const preparedTransaction = await account.buildPaymasterTransaction(calls, paymasterDetails);

    // Prepare the transaction: it is checked to be safe, then signed
    const transaction: ExecutableUserTransaction = await account.preparePaymasterTransaction(
      preparedTransaction,
      calls,
      paymasterDetails,
      maxFeeInGasToken
    );

    // Execute the transaction
    return account.paymaster
      .executeTransaction(transaction, preparedTransaction.parameters)
      .then((response) => ({ transaction_hash: response.transaction_hash }));
  }
}
