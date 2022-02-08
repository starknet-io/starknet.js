import { Abi, KeyPair, Signature, TransactionDetails } from '../types';
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
    { contractAddress, entrypoint, calldata = [], nonce, walletAddress }: TransactionDetails,
    _abi?: Abi
  ): Promise<Signature> {
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
