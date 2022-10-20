import {
  Abi,
  Call,
  DeclareSignerDetails,
  InvocationsSignerDetails,
  KeyPair,
  Signature,
} from '../types';
import { DeployAccountSignerDetails } from '../types/signer';
import { genKeyPair, getStarkKey, sign } from '../utils/ellipticCurve';
import {
  calculateDeclareTransactionHash,
  calculateDeployAccountTransactionHash,
  calculateTransactionHash,
} from '../utils/hash';
import { fromCallsToExecuteCalldata } from '../utils/transaction';
import { TypedData, getMessageHash } from '../utils/typedData';
import { SignerInterface } from './interface';

export class Signer implements SignerInterface {
  protected keyPair: KeyPair;

  constructor(keyPair: KeyPair = genKeyPair()) {
    this.keyPair = keyPair;
  }

  public async getPubKey(): Promise<string> {
    return getStarkKey(this.keyPair);
  }

  public async signMessage(typedData: TypedData, accountAddress: string): Promise<Signature> {
    const msgHash = getMessageHash(typedData, accountAddress);
    return sign(this.keyPair, msgHash);
  }

  public async signTransaction(
    transactions: Call[],
    transactionsDetail: InvocationsSignerDetails,
    abis?: Abi[]
  ): Promise<Signature> {
    if (abis && abis.length !== transactions.length) {
      throw new Error('ABI must be provided for each transaction or no transaction');
    }
    // now use abi to display decoded data somewhere, but as this signer is headless, we can't do that

    const calldata = fromCallsToExecuteCalldata(transactions);

    const msgHash = calculateTransactionHash(
      transactionsDetail.walletAddress,
      transactionsDetail.version,
      calldata,
      transactionsDetail.maxFee,
      transactionsDetail.chainId,
      transactionsDetail.nonce
    );

    return sign(this.keyPair, msgHash);
  }

  public async signDeployAccountTransaction({
    classHash,
    contractAddress,
    constructorCalldata,
    addressSalt,
    maxFee,
    version,
    chainId,
    nonce,
  }: DeployAccountSignerDetails) {
    const msgHash = calculateDeployAccountTransactionHash(
      contractAddress,
      classHash,
      constructorCalldata,
      addressSalt,
      version,
      maxFee,
      chainId,
      nonce
    );

    return sign(this.keyPair, msgHash);
  }

  public async signDeclareTransaction(
    // contractClass: ContractClass,  // Should be used once class hash is present in ContractClass
    { classHash, senderAddress, chainId, maxFee, version, nonce }: DeclareSignerDetails
  ) {
    const msgHash = calculateDeclareTransactionHash(
      classHash,
      senderAddress,
      version,
      maxFee,
      chainId,
      nonce
    );

    return sign(this.keyPair, msgHash);
  }
}
