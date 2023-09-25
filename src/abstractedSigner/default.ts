import { Signer } from '../signer';
import {
  Abi,
  AbstractionFunctions,
  Call,
  DeclareSignerDetails,
  DeployAccountSignerDetails,
  InvocationsSignerDetails,
  Signature,
  TypedData,
} from '../types';
import { CallData } from '../utils/calldata';
import { starkCurve } from '../utils/ec';
import {
  calculateDeclareTransactionHash,
  calculateDeployAccountTransactionHash,
  calculateTransactionHash,
} from '../utils/hash';
import { getExecuteCalldata } from '../utils/transaction';
import { getMessageHash } from '../utils/typedData';
import { AbstractedSignerInterface } from './interface';

export class AbstractedSigner extends Signer implements AbstractedSignerInterface {
  readonly abstractionFunctions: AbstractionFunctions | undefined;

  constructor(
    pk: Uint8Array | string = starkCurve.utils.randomPrivateKey(),
    abstractedFns?: AbstractionFunctions
  ) {
    super(pk);
    this.abstractionFunctions = abstractedFns;
  }

  public override async getPubKey(): Promise<string> {
    return starkCurve.getStarkKey(this.pk);
  }

  public override async signMessage(
    myEIP712json: TypedData,
    accountAddress: string,
    ...addsAbstraction: string[]
  ): Promise<Signature> {
    let msgHash: string;
    if (!this.abstractionFunctions?.abstractedMessageHash) {
      msgHash = getMessageHash(myEIP712json, accountAddress);
    } else {
      msgHash = this.abstractionFunctions.abstractedMessageHash(
        myEIP712json,
        accountAddress,
        ...addsAbstraction
      );
    }

    if (!this.abstractionFunctions?.abstractedMessageSign) {
      return starkCurve.sign(msgHash, this.pk);
    }
    const sign = this.abstractionFunctions.abstractedMessageSign(
      msgHash,
      this.pk.toString(),
      ...addsAbstraction
    );
    return sign;
  }

  public override async signTransaction(
    transactions: Call[],
    transactionsDetail: InvocationsSignerDetails,
    abis?: Abi[],
    ...adds: string[]
  ): Promise<Signature> {
    if (abis && abis.length !== transactions.length) {
      throw new Error('ABI must be provided for each transaction or no transaction');
    }
    // now use abi to display decoded data somewhere, but as this signer is headless, we can't do that

    const calldata = getExecuteCalldata(transactions, transactionsDetail.cairoVersion);
    if (!this.abstractionFunctions?.abstractedTransactionSign) {
      const msgHash = calculateTransactionHash(
        transactionsDetail.walletAddress,
        transactionsDetail.version,
        calldata,
        transactionsDetail.maxFee,
        transactionsDetail.chainId,
        transactionsDetail.nonce
      );

      return starkCurve.sign(msgHash, this.pk);
    }
    return this.abstractionFunctions.abstractedTransactionSign(
      {
        contractAddress: transactionsDetail.walletAddress,
        version: transactionsDetail.version,
        calldata,
        maxFee: transactionsDetail.maxFee,
        chainId: transactionsDetail.chainId,
        nonce: transactionsDetail.nonce,
      },
      this.pk.toString(),
      ...adds
    );
  }

  public override async signDeployAccountTransaction(
    {
      classHash,
      contractAddress,
      constructorCalldata,
      addressSalt,
      maxFee,
      version,
      chainId,
      nonce,
    }: DeployAccountSignerDetails,
    ...adds: string[]
  ): Promise<Signature> {
    if (!this.abstractionFunctions?.abstractedDeployAccountSign) {
      const msgHash = calculateDeployAccountTransactionHash(
        contractAddress,
        classHash,
        CallData.compile(constructorCalldata),
        addressSalt,
        version,
        maxFee,
        chainId,
        nonce
      );
      return starkCurve.sign(msgHash, this.pk);
    }
    return this.abstractionFunctions.abstractedDeployAccountSign(
      {
        classHash,
        contractAddress,
        constructorCalldata,
        addressSalt,
        maxFee,
        version,
        chainId,
        nonce,
      },
      this.pk.toString(),
      ...adds
    );
  }

  public override async signDeclareTransaction(
    // contractClass: ContractClass,  // Should be used once class hash is present in ContractClass
    {
      classHash,
      senderAddress,
      chainId,
      maxFee,
      version,
      nonce,
      compiledClassHash,
    }: DeclareSignerDetails,
    ...adds: string[]
  ): Promise<Signature> {
    if (!this.abstractionFunctions?.abstractedDeclareSign) {
      const msgHash = calculateDeclareTransactionHash(
        classHash,
        senderAddress,
        version,
        maxFee,
        chainId,
        nonce,
        compiledClassHash
      );
      return starkCurve.sign(msgHash, this.pk);
    }
    return this.abstractionFunctions.abstractedDeclareSign(
      {
        classHash,
        senderAddress,
        chainId,
        maxFee,
        version,
        nonce,
        compiledClassHash,
      },
      this.pk.toString(),
      ...adds
    );
  }
}
