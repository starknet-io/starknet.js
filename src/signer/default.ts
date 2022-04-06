import { Abi, Invocation, InvocationsSignerDetails, KeyPair, Signature } from '../types';
import { getStarkKey, sign } from '../utils/ellipticCurve';
import { hashMulticall } from '../utils/hash';
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
    abis?: Abi[]
  ): Promise<Signature> {
    if (abis && abis.length !== transactions.length) {
      throw new Error('ABI must be provided for each transaction or no transaction');
    }
    // now use abi to display decoded data somewhere, but as this signer is headless, we can't do that

    const msgHash = hashMulticall(
      transactionsDetail.walletAddress,
      transactions,
      transactionsDetail.nonce.toString(),
      transactionsDetail.maxFee.toString(),
      transactionsDetail.version.toString()
    );

    return sign(this.keyPair, msgHash);
  }

  public async signMessage(typedData: TypedData, accountAddress: string): Promise<Signature> {
    const msgHash = getMessageHash(typedData, accountAddress);
    return sign(this.keyPair, msgHash);
  }
}
