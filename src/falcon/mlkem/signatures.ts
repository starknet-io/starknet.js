import * as starknet from 'starknet';
import type { Falcon512AccountType } from '../accountType';
import { PACKED_SLOTS } from '../s2morrow/constants';
import { parseFelt } from '../s2morrow/felt';
import { verifyMessage } from '../verify';

/**
 * Checks that an account signed a message of the key exchange, with a post-quantum signature.
 * The function reads the public key that the account stores (`get_public_key`). Then it checks
 * the signature with this key, off-chain.
 *
 * Today, it accepts only the Falcon-512 accounts of OpenZeppelin. It refuses a Stark (ECDSA)
 * account, an S2morrow account (it has no `get_public_key`), and an account that is not deployed.
 * To accept another post-quantum signature later, change this function only.
 * @param {ProviderInterface} provider the provider that reads the public key of the account
 * @param {TypedData} typedData the message
 * @param {Signature} signature the signature of the message
 * @param {BigNumberish} accountAddress the address of the account that signed the message
 * @returns {Promise<void>} nothing: the function returns only when the signature is valid
 * @throws {Error} when the account is not a deployed Falcon-512 account of OpenZeppelin, or when
 * the signature is not valid
 * @example
 * ```typescript
 * const signature = await aliceFalconAccount.signMessage(typedData);
 * await checkSignature(myProvider, typedData, signature, aliceFalconAccount.address);
 * // returns: the signature is valid
 * await checkSignature(myProvider, typedData, signature, myStarkAccount.address);
 * // throws Error('ML-KEM: the account 0x… is not a Falcon-512 account of OpenZeppelin.')
 * ```
 */
export async function checkSignature(
  provider: starknet.ProviderInterface,
  typedData: starknet.TypedData,
  signature: starknet.Signature,
  accountAddress: starknet.BigNumberish
): Promise<void> {
  const address = starknet.num.toHex(parseFelt(accountAddress, 'ML-KEM account address'));
  let answer: string[];
  try {
    answer = await provider.callContract({
      contractAddress: address,
      entrypoint: 'get_public_key',
    });
  } catch (error) {
    throw new Error(
      `ML-KEM: cannot read the public key of the account ${address}. The account must be ` +
        'deployed, and must be a Falcon-512 account of OpenZeppelin.',
      { cause: error }
    );
  }
  // A Falcon-512 account of OpenZeppelin answers 29, then the 29 felts of its key.
  // A Stark account answers one felt.
  if (answer.length !== PACKED_SLOTS + 1 || BigInt(answer[0]) !== BigInt(PACKED_SLOTS)) {
    throw new Error(`ML-KEM: the account ${address} is not a Falcon-512 account of OpenZeppelin.`);
  }
  // The number of felts tells how to read the signature. 60 felts: the signature carries a hint,
  // which makes the on-chain check cheaper. 31 felts: no hint.
  const length = Array.isArray(signature) ? signature.length : 0;
  let accountType: Falcon512AccountType;
  if (length === 60) {
    accountType = 'oz-hint';
  } else if (length === 31) {
    accountType = 'oz-direct';
  } else {
    throw new Error(
      `ML-KEM: the signature of the account ${address} is not a Falcon-512 signature.`
    );
  }
  if (!verifyMessage(typedData, signature, answer.slice(1), address, { accountType })) {
    throw new Error(`ML-KEM: the signature of the account ${address} is not valid.`);
  }
}
