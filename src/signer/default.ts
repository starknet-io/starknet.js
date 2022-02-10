import { Abi, Invocation, InvocationsSignerDetails, KeyPair, Signature } from '../types';
import { getStarkKey, sign } from '../utils/ellipticCurve';
import { addHexPrefix } from '../utils/encode';
import { hashMessage } from '../utils/hash';
import { bigNumberishArrayToDecimalStringArray, toBN } from '../utils/number';
import { getSelectorFromName } from '../utils/stark';
import { TypedData, getMessageHash } from '../utils/typedData';
import { SignerInterface } from './interface';

export class Signer implements SignerInterface {
  protected keyPair: KeyPair;

  constructor(keyPair: KeyPair) {
    this.keyPair = keyPair;
  }

  public async getPubKey(): Promise<string> {
    return getStarkKey(this.keyPair);
  }

  public async signTransaction(
    transactions: Invocation[],
    transactionsDetail: InvocationsSignerDetails,
    abis: Abi[] = []
  ): Promise<Signature> {
    if (transactions.length !== 1) {
      throw new Error('Only one transaction at a time is currently supported by this signer');
    }
    if (abis?.length !== 0 && abis.length !== transactions.length) {
      throw new Error('ABI must be provided for each transaction or no transaction');
    }
    // now use abi to display decoded data somewhere, but as this signer is headless, we can't do that

    const { contractAddress, entrypoint, calldata = [] } = transactions[0];
    const { nonce, walletAddress } = transactionsDetail;

    const nonceBn = toBN(nonce);
    const entrypointSelector = getSelectorFromName(entrypoint);
    const calldataDecimal = bigNumberishArrayToDecimalStringArray(calldata);

    const msgHash = addHexPrefix(
      hashMessage(
        walletAddress,
        contractAddress,
        entrypointSelector,
        calldataDecimal,
        nonceBn.toString()
      )
    );

    return sign(this.keyPair, msgHash);
  }

  public async signMessage(typedData: TypedData, walletAddress: string): Promise<Signature> {
    const msgHash = getMessageHash(typedData, walletAddress);
    return sign(this.keyPair, msgHash);
  }
}
