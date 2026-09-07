import { NetworkName, PAYMASTER_RPC_NODES, StarknetChainId } from '../global/constants';
import { logger } from '../global/logger';
import { BigNumberish, PaymasterDetails, PreparedTransaction, Call } from '../types';
import assert from './assert';
import { CallData } from './calldata';
import { toOutsideCallV2 } from './outsideExecution';
import { getSelectorFromName } from './hash';
import { toBigInt } from './num';
import type {
  OutsideCallV1,
  OutsideCallV2,
  OutsideExecutionMessageV1,
  OutsideExecutionMessageV2,
  OutsideExecutionTypedData,
} from '../types/api';

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
const assertGasFeeFromUnsafeCalls = (
  unsafeCalls: (OutsideCallV1 | OutsideCallV2)[],
  fees: BigNumberish
) => {
  const unsafeCall = toOutsideCallV2(unsafeCalls[unsafeCalls.length - 1]);
  const unsafeGasTokenCalldata = CallData.toCalldata(unsafeCall.Calldata);
  const unsafeGasTokenValue = unsafeGasTokenCalldata[1];
  // Assert gas token to signed is stricly equal to the provided gas fees
  assert(
    BigInt(unsafeGasTokenValue) === BigInt(fees),
    'Gas token value is not equal to the provided gas fees'
  );
};

const assertGasTokenFromUnsafeCalls = (
  unsafeCalls: (OutsideCallV1 | OutsideCallV2)[],
  gasToken: string
) => {
  const unsafeCall = toOutsideCallV2(unsafeCalls[unsafeCalls.length - 1]);
  // Assert gas token to signed is stricly equal to the provided gas fees
  assert(
    BigInt(unsafeCall.To) === BigInt(gasToken),
    'Gas token address is not equal to the provided gas token'
  );
};

/**
 * Asserts that the given calls are strictly equal, otherwise throws an error.
 * @param {Call[]} originalCalls - The original calls.
 * @param {Call[]} unsafeCalls - The unsafe calls.
 * @throws {Error} Throws an error if the calls are not strictly equal.
 */
export function assertCallsAreStrictlyEqual(
  originalCalls: Call[],
  unsafeCalls: (OutsideCallV1 | OutsideCallV2)[]
) {
  const baseError = 'Provided calls are not strictly equal to the returned calls';

  // Unsafe calls always include one additional call (gas token transfer)
  assert(
    unsafeCalls.length - 1 === originalCalls.length,
    `${baseError}: Expected ${originalCalls.length + 1} calls, got ${unsafeCalls.length}`
  );

  // Compare each original call with the corresponding unsafe call
  for (let callIndex = 0; callIndex < originalCalls.length; callIndex += 1) {
    // Originals calls are not given as outside calls by user, ans is treated as Call[]
    const originalCall = originalCalls[callIndex];
    // Unsafe calls are given as outside calls by paymaster
    const unsafeCall = toOutsideCallV2(unsafeCalls[callIndex]);

    // Normalize addresses by removing leading zeros and converting to lowercase
    const normalizeAddress = (address: string): string => {
      return toBigInt(address).toString(16).toLowerCase();
    };

    // Check contract addresses (normalize to handle leading zeros)
    const originalAddress = normalizeAddress(originalCall.contractAddress);
    const unsafeAddress = normalizeAddress(unsafeCall.To);

    assert(
      originalAddress === unsafeAddress,
      `${baseError}: Contract address mismatch at call ${callIndex}. ` +
        `Expected: ${originalCall.contractAddress}, Got: ${unsafeCall.To}`
    );

    // Check entrypoints (should be exact string match)
    assert(
      getSelectorFromName(originalCall.entrypoint) === unsafeCall.Selector,
      `${baseError}: Entrypoint mismatch at call ${callIndex}. ` +
        `Expected: ${originalCall.entrypoint}, Got: ${unsafeCall.Selector}`
    );

    // Convert calldata to normalized arrays for comparison
    const originalCalldata = CallData.toCalldata(originalCall.calldata);
    const unsafeCalldata = CallData.toCalldata(unsafeCall.Calldata);

    // Check calldata length
    assert(
      originalCalldata.length === unsafeCalldata.length,
      `${baseError}: Calldata length mismatch at call ${callIndex}. ` +
        `Expected length: ${originalCalldata.length}, Got length: ${unsafeCalldata.length}`
    );

    // Compare each calldata element (normalize using BigInt to handle leading zeros)
    for (let dataIndex = 0; dataIndex < originalCalldata.length; dataIndex += 1) {
      const originalValue = BigInt(originalCalldata[dataIndex]);
      const unsafeValue = BigInt(unsafeCalldata[dataIndex]);

      assert(
        originalValue === unsafeValue,
        `${baseError}: Calldata value mismatch at call ${callIndex}, parameter ${dataIndex}. ` +
          `Expected: ${originalCalldata[dataIndex]}, Got: ${unsafeCalldata[dataIndex]}`
      );
    }
  }
}

/**
 * Asserts that the typed-data domain returned by the paymaster is bound to the account's own
 * provider chain, so a malicious or mismatched paymaster cannot obtain a signature that is
 * valid on a different chain than the one the user intended.
 * @param {OutsideExecutionTypedData} typedData - The typed data returned by the paymaster.
 * @param {StarknetChainId} chainId - The chain id of the account's own provider.
 * @throws {Error} Throws an error if the domain chainId does not match the provider chain.
 * @example
 * ```typescript
 * assertChainIdFromTypedData(
 *   { domain: { chainId: '0x534e5f5345504f4c4941' }, message: {}, primaryType: '', types: {} },
 *   constants.StarknetChainId.SN_SEPOLIA
 * );
 * // does not throw
 * ```
 */
const assertChainIdFromTypedData = (
  typedData: OutsideExecutionTypedData,
  chainId: StarknetChainId
) => {
  assert(
    typedData.domain.chainId !== undefined && BigInt(typedData.domain.chainId) === BigInt(chainId),
    "Paymaster typed data domain chainId does not match the account's provider chain"
  );
};

/**
 * Asserts that a paymaster-prepared transaction is safe to sign: the typed-data domain is
 * bound to the account's own chain, and — for non-sponsored transactions — the calls and the
 * appended gas-token transfer match what the user actually requested.
 * @param {PreparedTransaction} preparedTransaction - The transaction returned by the paymaster.
 * @param {Call[]} calls - The calls originally requested by the user.
 * @param {PaymasterDetails} paymasterDetails - The fee mode and related paymaster details.
 * @param {StarknetChainId} chainId - The chain id of the account's own provider.
 * @param {BigNumberish} [maxFeeInGasToken] - Optional user-approved ceiling on the gas-token fee.
 * @throws {Error} Throws an error if any of the above safety properties do not hold.
 * @example
 * ```typescript
 * assertPaymasterTransactionSafety(
 *   preparedTransaction,
 *   calls,
 *   { feeMode: { mode: 'default', gasToken: strkAddress } },
 *   constants.StarknetChainId.SN_SEPOLIA
 * );
 * // does not throw if preparedTransaction is exactly what was requested
 * ```
 */
export const assertPaymasterTransactionSafety = (
  preparedTransaction: PreparedTransaction,
  calls: Call[],
  paymasterDetails: PaymasterDetails,
  chainId: StarknetChainId,
  maxFeeInGasToken?: BigNumberish
) => {
  if (preparedTransaction.type === 'invoke' || preparedTransaction.type === 'deploy_and_invoke') {
    // The typed-data domain must always be bound to the account's own provider chain,
    // regardless of fee mode: a cross-chain signature is dangerous even when sponsored.
    assertChainIdFromTypedData(preparedTransaction.typed_data, chainId);

    // A sponsored transaction has no appended gas-token call: nothing left to verify below.
    if (paymasterDetails.feeMode.mode !== 'sponsored') {
      // extract unsafe calls to verify: the message must declare exactly one of the two
      // SNIP-9 shapes, never both — otherwise a paymaster could present a benign array to
      // this check while a different, attacker-chosen array is the one actually signed.
      const { message } = preparedTransaction.typed_data;
      const hasV1Calls = 'calls' in message;
      const hasV2Calls = 'Calls' in message;
      assert(
        hasV1Calls !== hasV2Calls,
        'Paymaster typed data must declare exactly one of "calls" (SNIP-9 V1) or "Calls" (SNIP-9 V2)'
      );
      const unsafeCalls: (OutsideCallV1 | OutsideCallV2)[] = hasV1Calls
        ? (message as OutsideExecutionMessageV1).calls
        : (message as OutsideExecutionMessageV2).Calls;

      // Assert calls provided and unsafe calls are strictly equal
      assertCallsAreStrictlyEqual(calls, unsafeCalls);

      // Assert gas token address from unsafe calls is equal to the provided gas token
      assertGasTokenFromUnsafeCalls(unsafeCalls, paymasterDetails.feeMode.gasToken);

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
