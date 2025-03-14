/**
 * Calculate Hashes for v0 - v2 transactions
 */

/* eslint-disable no-param-reassign */
/* eslint-disable import/extensions */
import { StarknetChainId, TransactionHashPrefix } from '../../../global/constants';
import { BigNumberish, RawCalldata } from '../../../types';
import { starkCurve } from '../../ec';
import { toBigInt } from '../../num';
import { getSelector } from '../selector';

/**
 * Compute pedersen hash from data
 * @returns format: hex-string - pedersen hash
 */
export function computeHashOnElements(data: BigNumberish[]): string {
  return [...data, data.length]
    .reduce((x: BigNumberish, y: BigNumberish) => starkCurve.pedersen(toBigInt(x), toBigInt(y)), 0)
    .toString();
}

/**
 * Calculate transaction pedersen hash for common properties
 *
 * Following implementation is based on this python [implementation #](https://github.com/starkware-libs/cairo-lang/blob/b614d1867c64f3fb2cf4a4879348cfcf87c3a5a7/src/starkware/starknet/core/os/transaction_hash/transaction_hash.py)
 * @returns format: hex-string
 */
export function calculateTransactionHashCommon(
  txHashPrefix: TransactionHashPrefix,
  version: BigNumberish,
  contractAddress: BigNumberish,
  entryPointSelector: BigNumberish,
  calldata: RawCalldata,
  maxFee: BigNumberish,
  chainId: StarknetChainId,
  additionalData: BigNumberish[] = []
): string {
  const calldataHash = computeHashOnElements(calldata);
  const dataToHash = [
    txHashPrefix,
    version,
    contractAddress,
    entryPointSelector,
    calldataHash,
    maxFee,
    chainId,
    ...additionalData,
  ];
  return computeHashOnElements(dataToHash);
}

/**
 * Calculate declare transaction hash
 * @param classHash hex-string
 * @param compiledClassHash hex-string
 * @returns format: hex-string
 */
export function calculateDeclareTransactionHash(
  classHash: string,
  senderAddress: BigNumberish,
  version: BigNumberish,
  maxFee: BigNumberish,
  chainId: StarknetChainId,
  nonce: BigNumberish,
  compiledClassHash?: string
): string {
  return calculateTransactionHashCommon(
    TransactionHashPrefix.DECLARE,
    version,
    senderAddress,
    0,
    [classHash],
    maxFee,
    chainId,
    [nonce, ...(compiledClassHash ? [compiledClassHash] : [])]
  );
}

/**
 * Calculate deploy_account transaction hash
 * @returns format: hex-string
 */
export function calculateDeployAccountTransactionHash(
  contractAddress: BigNumberish,
  classHash: BigNumberish,
  constructorCalldata: RawCalldata,
  salt: BigNumberish,
  version: BigNumberish,
  maxFee: BigNumberish,
  chainId: StarknetChainId,
  nonce: BigNumberish
) {
  const calldata = [classHash, salt, ...constructorCalldata];

  return calculateTransactionHashCommon(
    TransactionHashPrefix.DEPLOY_ACCOUNT,
    version,
    contractAddress,
    0,
    calldata,
    maxFee,
    chainId,
    [nonce]
  );
}

/**
 * Calculate invoke transaction hash
 * @returns format: hex-string
 */
export function calculateTransactionHash(
  contractAddress: BigNumberish,
  version: BigNumberish,
  calldata: RawCalldata,
  maxFee: BigNumberish,
  chainId: StarknetChainId,
  nonce: BigNumberish
): string {
  return calculateTransactionHashCommon(
    TransactionHashPrefix.INVOKE,
    version,
    contractAddress,
    0,
    calldata,
    maxFee,
    chainId,
    [nonce]
  );
}

/**
 * Calculate the L2 transaction hash generated by a message L1->L2
 * @param {BigNumberish} l1FromAddress L1 account address that paid the message.
 * @param {BigNumberish} l2ToAddress L2 contract address to execute.
 * @param {string | BigNumberish} l2Selector can be a function name ("bridge_withdraw") or a number (BigNumberish).
 * @param {RawCalldata} l2Calldata an array of BigNumberish of the raw parameters passed to the above function.
 * @param {BigNumberish} l2ChainId L2 chain ID : from constants.StarknetChainId.xxx
 * @param {BigNumberish} l1Nonce The nonce of the L1 account.
 * @returns {string} hex-string of the L2 transaction hash
 * @example
 * ```typescript
 * const l1FromAddress = "0x0000000000000000000000008453fc6cd1bcfe8d4dfc069c400b433054d47bdc";
 * const l2ToAddress = 2158142789748719025684046545159279785659305214176670733242887773692203401023n;
 * const l2Selector = 774397379524139446221206168840917193112228400237242521560346153613428128537n;
 * const payload = [
 *     4543560n,
 *    829565602143178078434185452406102222830667255948n,
 *     3461886633118033953192540141609307739580461579986333346825796013261542798665n,
 *     9000000000000000n,
 *     0n,
 * ];
 * const l1Nonce = 8288n;
 * const result = hash.calculateL2MessageTxHash(l1FromAddress, l2ToAddress, l2Selector, payload, constants.StarknetChainId.SN_SEPOLIA, l1Nonce);
 * // result = "0x67d959200d65d4ad293aa4b0da21bb050a1f669bce37d215c6edbf041269c07"
 * ```
 */
export function calculateL2MessageTxHash(
  l1FromAddress: BigNumberish,
  l2ToAddress: BigNumberish,
  l2Selector: string | BigNumberish,
  l2Calldata: RawCalldata,
  l2ChainId: StarknetChainId,
  l1Nonce: BigNumberish
): string {
  const payload = [l1FromAddress, ...l2Calldata];
  return calculateTransactionHashCommon(
    TransactionHashPrefix.L1_HANDLER,
    0,
    l2ToAddress,
    getSelector(l2Selector),
    payload,
    0,
    l2ChainId,
    [l1Nonce]
  );
}
