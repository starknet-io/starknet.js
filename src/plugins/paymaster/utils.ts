import { NetworkName, PAYMASTER_RPC_NODES, StarknetChainId } from '../../global/constants';
import { logger } from '../../global/logger';
import {
  BigNumberish,
  PaymasterDetails,
  PreparedTransaction,
  Call,
  OutsideExecutionVersion,
} from '../../types';
import assert from '../../utils/assert';
import { CallData } from '../../utils/calldata';
import { getTypedData, toOutsideCallV2 } from '../../utils/outsideExecution';
import { getMessageHash } from '../../utils/typedData';
import { getSelectorFromName } from '../../utils/hash';
import { toBigInt } from '../../utils/num';
import { CairoBytes31 } from '../../utils/cairoDataTypes/bytes31';
import { bnToUint256, uint256ToBN } from '../../utils/uint256';
import type {
  OutsideCallV1,
  OutsideCallV2,
  OutsideExecutionMessageV1,
  OutsideExecutionMessageV2,
  OutsideExecutionTypedData,
} from '../../types/api';

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
  // The transfer amount is a Uint256: low limb at index 1, high limb at index 2. Reading only
  // the low limb lets a malicious paymaster inflate the signed amount via the high limb while
  // this check still sees a match.
  const unsafeGasTokenValue = uint256ToBN({
    low: unsafeGasTokenCalldata[1],
    high: unsafeGasTokenCalldata[2],
  });
  // Assert gas token to signed is stricly equal to the provided gas fees
  assert(
    unsafeGasTokenValue === BigInt(fees),
    'Gas token value is not equal to the provided gas fees'
  );
};

const assertGasTokenFromUnsafeCalls = (
  unsafeCalls: (OutsideCallV1 | OutsideCallV2)[],
  gasToken: string
) => {
  const unsafeCall = toOutsideCallV2(unsafeCalls[unsafeCalls.length - 1]);
  // Assert gas token to signed is stricly equal to the provided gas token
  assert(
    BigInt(unsafeCall.To) === BigInt(gasToken),
    'Gas token address is not equal to the provided gas token'
  );
  // Assert the appended call is a plain ERC-20 `transfer`, not e.g. an `approve`
  assert(
    unsafeCall.Selector === getSelectorFromName('transfer'),
    'Gas token call selector is not a transfer'
  );
  // Assert the calldata shape matches transfer(recipient, amount: Uint256) -> 3 felts
  assert(
    CallData.toCalldata(unsafeCall.Calldata).length === 3,
    'Gas token transfer calldata does not match the expected recipient/amount shape'
  );
};

/**
 * Asserts that the given calls are strictly equal, otherwise throws an error.
 * @param {Call[]} originalCalls - The original calls.
 * @param {Call[]} unsafeCalls - The unsafe calls.
 * @param {boolean} [isSponsored] - Whether the transaction is sponsored. A sponsored
 * transaction appends no gas-token fee-transfer call; a non-sponsored one appends exactly
 * one. Defaults to `false` for backward compatibility.
 * @throws {Error} Throws an error if the calls are not strictly equal.
 * @example
 * ```typescript
 * paymaster.assertCallsAreStrictlyEqual(originalCalls, unsafeCalls, true); // sponsored: no fee call
 * ```
 */
export function assertCallsAreStrictlyEqual(
  originalCalls: Call[],
  unsafeCalls: (OutsideCallV1 | OutsideCallV2)[],
  isSponsored: boolean = false
) {
  const baseError = 'Provided calls are not strictly equal to the returned calls';

  // A sponsored transaction appends no gas-token fee-transfer call; a non-sponsored one
  // appends exactly one.
  const expectedExtraCalls = isSponsored ? 0 : 1;
  assert(
    unsafeCalls.length - expectedExtraCalls === originalCalls.length,
    `${baseError}: Expected ${originalCalls.length + expectedExtraCalls} calls, got ${unsafeCalls.length}`
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
 * Normalizes a SNIP-12 domain field declared `shortstring` (e.g. `domain.chainId`) to a felt.
 * SNIP-29's own typed-data examples always show `chainId` as an already-encoded hex felt
 * (e.g. `"0x534e5f4d41494e"`), but some paymasters do not follow that and return the raw
 * shortstring instead (e.g. `"SN_SEPOLIA"`). Both hash to the same felt once encoded, so this
 * mirrors the same tolerant fallback `src/utils/typedData.ts`'s own hash computation already
 * uses for `shortstring`/`felt` fields, rather than rejecting a non-compliant but harmless
 * paymaster response.
 * @param {string | number} value - The raw domain field value.
 * @returns {bigint} The felt value of the domain field.
 * @example
 * ```typescript
 * domainFieldToFelt('SN_SEPOLIA'); // 1536727068981429685321n
 * domainFieldToFelt('0x534e5f5345504f4c4941'); // 1536727068981429685321n
 * ```
 */
const domainFieldToFelt = (value: string | number): bigint => {
  try {
    return toBigInt(value);
  } catch {
    return CairoBytes31.fromText(String(value)).toBigInt();
  }
};

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
 *   { domain: { chainId: 'SN_SEPOLIA' }, message: {}, primaryType: '', types: {} },
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
    typedData.domain.chainId !== undefined &&
      domainFieldToFelt(typedData.domain.chainId) === BigInt(chainId),
    "Paymaster typed data domain chainId does not match the account's provider chain"
  );
};

/**
 * Asserts that a paymaster-prepared transaction is safe to sign. It checks that the typed-data
 * domain is bound to the account's own chain, and — for non-sponsored transactions — that the
 * calls and the appended gas-token transfer match what the user asked for. It then rebuilds the
 * outside execution it expects, from its own SNIP-9 shape and the user's own calls, and checks
 * that the hash the account would sign is that outside execution and nothing else. When the user
 * gave time bounds, the signed window must stay inside them.
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

    // extract unsafe calls to verify: the message must declare exactly one of the two
    // SNIP-9 shapes, never both — otherwise a paymaster could present a benign array to
    // this check while a different, attacker-chosen array is the one actually signed.
    // This runs for every fee mode: a sponsored transaction still executes whatever calls
    // are in this array, so it needs the same protection.
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

    // A sponsored transaction appends no gas-token call, so the calls array should match the
    // user's request 1:1; a non-sponsored one appends exactly one (the fee transfer).
    assertCallsAreStrictlyEqual(calls, unsafeCalls, paymasterDetails.feeMode.mode === 'sponsored');

    // A sponsored transaction has no appended gas-token call: nothing left to verify below.
    if (paymasterDetails.feeMode.mode !== 'sponsored') {
      // Assert gas token address from unsafe calls is equal to the provided gas token
      assertGasTokenFromUnsafeCalls(unsafeCalls, paymasterDetails.feeMode.gasToken);

      // Assert the signed gas-token amount matches the fee displayed to the user, whether or
      // not the caller supplied an explicit ceiling below
      assertGasFeeFromUnsafeCalls(
        unsafeCalls,
        preparedTransaction.fee.suggested_max_fee_in_gas_token
      );

      // If maxFeeInGasToken is provided, also enforce the user-approved ceiling
      if (maxFeeInGasToken) {
        assert(
          preparedTransaction.fee.suggested_max_fee_in_gas_token <= maxFeeInGasToken,
          'Gas token price is too high'
        );
      }
    }

    // The checks above read fields from the paymaster message. But the account signs a hash, and
    // the hash covers only the fields listed in `types`. And `types` comes from the paymaster
    // too. So the paymaster can show one list of calls to the checks here, and have a different
    // list signed under another field name. It can also put the user calls in a message of
    // another kind, like a session key, and have that signed in their place. To stop this, we
    // build the outside execution we expect on our own: our SNIP-9 shape, our chain, the user
    // calls. Then we compare its hash with the paymaster hash. From the message we reuse only
    // what we cannot know: the caller, the nonce, the two time limits, and the fee recipient
    // (the paymaster address).
    const msg = message as Record<string, unknown>;
    const version = hasV1Calls ? OutsideExecutionVersion.V1 : OutsideExecutionVersion.V2;
    const [callerKey, nonceKey, afterKey, beforeKey] = hasV1Calls
      ? ['caller', 'nonce', 'execute_after', 'execute_before']
      : ['Caller', 'Nonce', 'Execute After', 'Execute Before'];

    // A message without these four fields is not an outside execution.
    assert(
      [callerKey, nonceKey, afterKey, beforeKey].every((key) => msg[key] !== undefined),
      'Paymaster typed data does not match the expected outside execution'
    );
    const caller = msg[callerKey] as string;
    const nonce = msg[nonceKey] as BigNumberish;
    const executeAfter = msg[afterKey] as BigNumberish;
    const executeBefore = msg[beforeKey] as BigNumberish;

    // If the user gave a time window, the signed window must fit inside it. It must not start
    // before, and not end after. Without timeBounds there is nothing to compare.
    if (paymasterDetails.timeBounds) {
      const requestedAfter = toBigInt(paymasterDetails.timeBounds.executeAfter ?? 1);
      const requestedBefore = toBigInt(paymasterDetails.timeBounds.executeBefore);
      assert(
        toBigInt(executeAfter) >= requestedAfter && toBigInt(executeBefore) <= requestedBefore,
        'Paymaster typed data execution window is not within the requested time bounds'
      );
    }

    // The user calls. Then, if not sponsored, the fee transfer. We build it again from the gas
    // token and the fee the user approved. We keep only the recipient (the paymaster address)
    // from the message.
    const expectedCalls: Call[] = [...calls];
    if (paymasterDetails.feeMode.mode !== 'sponsored') {
      const feeCall = toOutsideCallV2(unsafeCalls[unsafeCalls.length - 1]);
      const feeRecipient = CallData.toCalldata(feeCall.Calldata)[0];
      const feeAmount = bnToUint256(preparedTransaction.fee.suggested_max_fee_in_gas_token);
      expectedCalls.push({
        contractAddress: paymasterDetails.feeMode.gasToken,
        entrypoint: 'transfer',
        calldata: [feeRecipient, feeAmount.low, feeAmount.high],
      });
    }
    const expectedTypedData = getTypedData(
      chainId,
      { caller, execute_after: executeAfter, execute_before: executeBefore },
      nonce,
      expectedCalls,
      version
    );

    // The account address goes into the hash. It is the same on both sides, so any fixed value
    // gives the same answer. This function does not receive the real one.
    assert(
      getMessageHash(expectedTypedData, 0) === getMessageHash(preparedTransaction.typed_data, 0),
      'Paymaster typed data does not match the expected outside execution'
    );
  }
};
