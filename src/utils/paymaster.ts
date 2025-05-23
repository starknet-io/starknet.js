import { NetworkName, PAYMASTER_RPC_NODES } from '../global/constants';
import { logger } from '../global/logger';
import { BigNumberish, PaymasterDetails, PreparedTransaction, Call } from '../types';
import assert from './assert';
import { assertCallsAreStrictlyEqual, CallData } from './calldata';

/**
 * Return randomly select available public paymaster node url
 * @param {NetworkName} networkName NetworkName
 * @param {boolean} mute mute public node warning
 * @returns {string} default node url
 */
export const getDefaultPaymasterNodeUrl = (
  networkName?: NetworkName,
  mute: boolean = false
): string => {
  if (!mute) {
    logger.info('Using default public node url, please provide nodeUrl in provider options!');
  }
  const nodes = PAYMASTER_RPC_NODES[networkName ?? NetworkName.SN_SEPOLIA];
  const randIdx = Math.floor(Math.random() * nodes.length);
  return nodes[randIdx];
};

/**
 * Assert gas fee from unsafe calls is equal to the provided gas fees
 * @param {Call[]} unsafeCalls - The unsafe calls.
 * @param {BigNumberish} fees - The fees in gas token.
 * @throws {Error} Throws an error if the gas token value is not equal to the provided gas fees.
 */
const assertGasFeeFromUnsafeCalls = (unsafeCalls: Call[], fees: BigNumberish) => {
  const unsafeCall = unsafeCalls[unsafeCalls.length - 1];
  const unsafeGasTokenCalldata = CallData.toCalldata(unsafeCall.calldata);
  const unsafeGasTokenValue = unsafeGasTokenCalldata[1];
  // Assert gas token to signed is stricly equal to the provided gas fees
  assert(
    BigInt(unsafeGasTokenValue) === BigInt(fees),
    'Gas token value is not equal to the provided gas fees'
  );
};

export const assertPaymasterTransactionSafety = (
  preparedTransaction: PreparedTransaction,
  calls: Call[],
  paymasterDetails: PaymasterDetails,
  maxFeeInGasToken?: BigNumberish
) => {
  // If tx is not sponsored, we can skip safety checks
  if (paymasterDetails.feeMode.mode !== 'sponsored') {
    // We only check the calls if user effectively has to pay something
    if (preparedTransaction.type === 'invoke' || preparedTransaction.type === 'deploy_and_invoke') {
      // extract unsafe calls to verify
      const unsafeCalls: Call[] =
        'calls' in preparedTransaction.typed_data.message
          ? (preparedTransaction.typed_data.message as any).calls
          : (preparedTransaction.typed_data.message as any).Calls;

      // Assert calls provided and unsafe calls are strictly equal
      assertCallsAreStrictlyEqual(calls, unsafeCalls);

      // If maxFeeInGasToken is provided, do all safety checks
      if (maxFeeInGasToken) {
        // Check if the gas token price is too high
        assert(
          preparedTransaction.fee.suggested_max_fee_in_gas_token <= maxFeeInGasToken,
          'Gas token price is too high'
        );

        // Assert gas fee from unsafe calls is equal to the provided gas fees(the value used to display the gas fee to the user)
        assertGasFeeFromUnsafeCalls(
          unsafeCalls,
          preparedTransaction.fee.suggested_max_fee_in_gas_token
        );
      }
    }
  }
};
