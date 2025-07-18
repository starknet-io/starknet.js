import type { ProviderInterface } from '../../provider';
import type { BigNumberish, Signature, TypedData } from '../../types';
import { isBigNumberish, toBigInt, toHex } from '../num';
import { CallData } from '../calldata';
import { formatSignature } from '../stark';
import { getMessageHash, validateTypedData } from '../typedData';

/**
 * Verify in Starknet a signature of a TypedData object or of a given hash.
 * @param {ProviderInterface} provider - The provider to use for the verification.
 * @param {BigNumberish | TypedData} message TypedData object to be verified, or message hash to be verified.
 * @param {Signature} signature signature of the message.
 * @param {BigNumberish} accountAddress address of the account that has signed the message.
 * @param {string} [signatureVerificationFunctionName] if account contract with non standard account verification function name.
 * @param { okResponse: string[]; nokResponse: string[]; error: string[] } [signatureVerificationResponse] if account contract with non standard response of verification function.
 * @returns
 * ```typescript
 * const myTypedMessage: TypedMessage = .... ;
 * const messageHash = typedData.getMessageHash(myTypedMessage,accountAddress);
 * const sign: WeierstrassSignatureType = ec.starkCurve.sign(messageHash, privateKey);
 * const accountAddress = "0x43b7240d227aa2fb8434350b3321c40ac1b88c7067982549e7609870621b535";
 * const result1 = await myRpcProvider.verifyMessageInStarknet(myTypedMessage, sign, accountAddress);
 * const result2 = await myRpcProvider.verifyMessageInStarknet(messageHash, sign, accountAddress);
 * // result1 = result2 = true
 * ```
 */
export async function verifyMessageInStarknet(
  provider: ProviderInterface,
  message: BigNumberish | TypedData,
  signature: Signature,
  accountAddress: BigNumberish,
  signatureVerificationFunctionName?: string,
  signatureVerificationResponse?: { okResponse: string[]; nokResponse: string[]; error: string[] }
): Promise<boolean> {
  const isTypedData = validateTypedData(message);
  if (!isBigNumberish(message) && !isTypedData) {
    throw new Error('message has a wrong format.');
  }
  if (!isBigNumberish(accountAddress)) {
    throw new Error('accountAddress shall be a BigNumberish');
  }
  const messageHash = isTypedData ? getMessageHash(message, accountAddress) : toHex(message);
  // HOTFIX: Accounts should conform to SNIP-6
  // (https://github.com/starknet-io/SNIPs/blob/f6998f779ee2157d5e1dea36042b08062093b3c5/SNIPS/snip-6.md?plain=1#L61),
  // but they don't always conform. Also, the SNIP doesn't standardize the response if the signature isn't valid.
  const knownSigVerificationFName = signatureVerificationFunctionName
    ? [signatureVerificationFunctionName]
    : ['isValidSignature', 'is_valid_signature'];
  const knownSignatureResponse = signatureVerificationResponse || {
    okResponse: [
      // any non-nok response is true
    ],
    nokResponse: [
      '0x0', // Devnet
      '0x00', // OpenZeppelin 0.7.0 to 0.9.0 invalid signature
    ],
    error: [
      'argent/invalid-signature',
      '0x617267656e742f696e76616c69642d7369676e6174757265', // ArgentX 0.3.0 to 0.3.1
      'is invalid, with respect to the public key',
      '0x697320696e76616c6964', // OpenZeppelin until 0.6.1, Braavos 0.0.11
      'INVALID_SIG',
      '0x494e56414c49445f534947', // Braavos 1.0.0
    ],
  };
  let error: any;

  // eslint-disable-next-line no-restricted-syntax
  for (const SigVerificationFName of knownSigVerificationFName) {
    try {
      // eslint-disable-next-line no-await-in-loop
      const resp = await provider.callContract({
        contractAddress: toHex(accountAddress),
        entrypoint: SigVerificationFName,
        calldata: CallData.compile({
          hash: toBigInt(messageHash).toString(),
          signature: formatSignature(signature),
        }),
      });
      // Response NOK Signature
      if (knownSignatureResponse.nokResponse.includes(resp[0].toString())) {
        return false;
      }
      // Response OK Signature
      // Empty okResponse assume all non-nok responses are valid signatures
      // OpenZeppelin 0.7.0 to 0.9.0, ArgentX 0.3.0 to 0.3.1 & Braavos Cairo 0.0.11 to 1.0.0 valid signature
      if (
        knownSignatureResponse.okResponse.length === 0 ||
        knownSignatureResponse.okResponse.includes(resp[0].toString())
      ) {
        return true;
      }
      throw Error('signatureVerificationResponse Error: response is not part of known responses');
    } catch (err) {
      // Known NOK Errors
      if (
        knownSignatureResponse.error.some((errMessage) =>
          (err as Error).message.includes(errMessage)
        )
      ) {
        return false;
      }
      // Unknown Error
      error = err;
    }
  }

  throw Error(`Signature verification Error: ${error}`);
}
