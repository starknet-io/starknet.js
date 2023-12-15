import { secp256k1 } from '@noble/curves/secp256k1';

import {
  Call,
  DeclareSignerDetails,
  DeployAccountSignerDetails,
  InvocationsSignerDetails,
  Signature,
  TypedData,
  V2DeclareSignerDetails,
  V2DeployAccountSignerDetails,
  V2InvocationsSignerDetails,
  V3DeclareSignerDetails,
  V3DeployAccountSignerDetails,
  V3InvocationsSignerDetails,
} from '../types';
import { ETransactionVersion2, ETransactionVersion3 } from '../types/api';
import { CallData } from '../utils/calldata';
import { addHexPrefix, buf2hex, removeHexPrefix, sanitizeHex } from '../utils/encode';
import { ethRandomPrivateKey } from '../utils/eth';
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

/**
 * Signer for accounts using Ethereum signature
 */
export class EthSigner implements SignerInterface {
  protected pk: string; // hex string without 0x and odd number of characters

  constructor(pk: Uint8Array | string = ethRandomPrivateKey()) {
    this.pk =
      pk instanceof Uint8Array
        ? removeHexPrefix(sanitizeHex(buf2hex(pk)))
        : removeHexPrefix(sanitizeHex(toHex(pk)));
  }

  public async getPubKey(): Promise<string> {
    return addHexPrefix(buf2hex(secp256k1.getPublicKey(this.pk)));
  }

  public async signMessage(typedData: TypedData, accountAddress: string): Promise<Signature> {
    const msgHash = getMessageHash(typedData, accountAddress);
    return secp256k1.sign(removeHexPrefix(sanitizeHex(msgHash)), this.pk);
  }

  public async signTransaction(
    transactions: Call[],
    details: InvocationsSignerDetails
  ): Promise<Signature> {
    const compiledCalldata = getExecuteCalldata(transactions, details.cairoVersion);
    let msgHash;

    // TODO: How to do generic union discriminator for all like this
    if (Object.values(ETransactionVersion2).includes(details.version as any)) {
      const det = details as V2InvocationsSignerDetails;
      msgHash = calculateInvokeTransactionHash({
        ...det,
        senderAddress: det.walletAddress,
        compiledCalldata,
        version: det.version,
      });
    } else if (Object.values(ETransactionVersion3).includes(details.version as any)) {
      const det = details as V3InvocationsSignerDetails;
      msgHash = calculateInvokeTransactionHash({
        ...det,
        senderAddress: det.walletAddress,
        compiledCalldata,
        version: det.version,
        nonceDataAvailabilityMode: intDAM(det.nonceDataAvailabilityMode),
        feeDataAvailabilityMode: intDAM(det.feeDataAvailabilityMode),
      });
    } else {
      throw Error('unsupported signTransaction version');
    }

    return secp256k1.sign(removeHexPrefix(sanitizeHex(msgHash)), this.pk);
  }

  public async signDeployAccountTransaction(
    details: DeployAccountSignerDetails
  ): Promise<Signature> {
    const compiledConstructorCalldata = CallData.compile(details.constructorCalldata);
    /*     const version = BigInt(details.version).toString(); */
    let msgHash;

    if (Object.values(ETransactionVersion2).includes(details.version as any)) {
      const det = details as V2DeployAccountSignerDetails;
      msgHash = calculateDeployAccountTransactionHash({
        ...det,
        salt: det.addressSalt,
        constructorCalldata: compiledConstructorCalldata,
        version: det.version,
      });
    } else if (Object.values(ETransactionVersion3).includes(details.version as any)) {
      const det = details as V3DeployAccountSignerDetails;
      msgHash = calculateDeployAccountTransactionHash({
        ...det,
        salt: det.addressSalt,
        compiledConstructorCalldata,
        version: det.version,
        nonceDataAvailabilityMode: intDAM(det.nonceDataAvailabilityMode),
        feeDataAvailabilityMode: intDAM(det.feeDataAvailabilityMode),
      });
    } else {
      throw Error('unsupported signDeployAccountTransaction version');
    }

    return secp256k1.sign(removeHexPrefix(sanitizeHex(msgHash)), this.pk);
  }

  public async signDeclareTransaction(
    // contractClass: ContractClass,  // Should be used once class hash is present in ContractClass
    details: DeclareSignerDetails
  ): Promise<Signature> {
    let msgHash;

    if (Object.values(ETransactionVersion2).includes(details.version as any)) {
      const det = details as V2DeclareSignerDetails;
      msgHash = calculateDeclareTransactionHash({
        ...det,
        version: det.version,
      });
    } else if (Object.values(ETransactionVersion3).includes(details.version as any)) {
      const det = details as V3DeclareSignerDetails;
      msgHash = calculateDeclareTransactionHash({
        ...det,
        version: det.version,
        nonceDataAvailabilityMode: intDAM(det.nonceDataAvailabilityMode),
        feeDataAvailabilityMode: intDAM(det.feeDataAvailabilityMode),
      });
    } else {
      throw Error('unsupported signDeclareTransaction version');
    }

    return secp256k1.sign(removeHexPrefix(sanitizeHex(msgHash)), this.pk);
  }
}
