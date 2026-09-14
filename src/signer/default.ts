import {
  Call,
  DeclareSignerDetails,
  DeployAccountSignerDetails,
  InvocationsSignerDetails,
  Signature,
  TypedData,
} from '../types';
import { CallData } from '../utils/calldata';
import { starkCurve } from '../utils/ec';
import { buf2hex } from '../utils/encode';
import {
  calculateDeclareTransactionHash,
  calculateDeployAccountTransactionHash,
  calculateInvokeTransactionHash,
} from '../utils/hash';
import { toHex } from '../utils/num';
import { intDAM } from '../utils/stark';
import { getExecuteCalldata } from '../utils/transaction';
import { getMessageHash } from '../utils/typedData';
import { SignerInterface } from './interface';

export class Signer implements SignerInterface {
  protected pk: Uint8Array | string;

  constructor(pk: Uint8Array | string = starkCurve.utils.randomPrivateKey()) {
    this.pk = pk instanceof Uint8Array ? buf2hex(pk) : toHex(pk);
  }

  public async getPubKey(): Promise<string> {
    return starkCurve.getStarkKey(this.pk);
  }

  public async signMessage(typedData: TypedData, accountAddress: string): Promise<Signature> {
    const msgHash = getMessageHash(typedData, accountAddress);
    return this.signRaw(msgHash);
  }

  public async signTransaction(
    transactions: Call[],
    details: InvocationsSignerDetails
  ): Promise<Signature> {
    const compiledCalldata = getExecuteCalldata(transactions, details.cairoVersion);
    const msgHash = calculateInvokeTransactionHash({
      ...details,
      senderAddress: details.walletAddress,
      compiledCalldata,
      version: details.version,
      nonceDataAvailabilityMode: intDAM(details.nonceDataAvailabilityMode),
      feeDataAvailabilityMode: intDAM(details.feeDataAvailabilityMode),
    });

    return this.signRaw(msgHash);
  }

  public async signDeployAccountTransaction(
    details: DeployAccountSignerDetails
  ): Promise<Signature> {
    const compiledConstructorCalldata = CallData.compile(details.constructorCalldata);
    const msgHash = calculateDeployAccountTransactionHash({
      ...details,
      salt: details.addressSalt,
      compiledConstructorCalldata,
      version: details.version,
      nonceDataAvailabilityMode: intDAM(details.nonceDataAvailabilityMode),
      feeDataAvailabilityMode: intDAM(details.feeDataAvailabilityMode),
    });

    return this.signRaw(msgHash);
  }

  public async signDeclareTransaction(
    // contractClass: ContractClass,  // Should be used once class hash is present in ContractClass
    details: DeclareSignerDetails
  ): Promise<Signature> {
    const msgHash = calculateDeclareTransactionHash({
      ...details,
      version: details.version,
      nonceDataAvailabilityMode: intDAM(details.nonceDataAvailabilityMode),
      feeDataAvailabilityMode: intDAM(details.feeDataAvailabilityMode),
    });

    return this.signRaw(msgHash);
  }

  protected async signRaw(msgHash: string): Promise<Signature> {
    return starkCurve.sign(msgHash, this.pk);
  }
}
