import type { ECDSASignature } from '@noble/curves/abstract/weierstrass.js';
import { secp256k1 } from '@noble/curves/secp256k1.js';

import {
  ArraySignatureType,
  Call,
  DeclareSignerDetails,
  DeployAccountSignerDetails,
  InvocationsSignerDetails,
  Signature,
  TypedData,
  Uint256,
} from '../types';
import { CallData } from '../utils/calldata';
import { addHexPrefix, buf2hex, removeHexPrefix, sanitizeHex } from '../utils/encode';
import { ethRandomPrivateKey } from '../utils/eth';
import {
  calculateDeclareTransactionHash,
  calculateDeployAccountTransactionHash,
  calculateInvokeTransactionHash,
} from '../utils/hash';
import { hexToBytes, toHex } from '../utils/num';
import { intDAM } from '../utils/stark';
import { getExecuteCalldata } from '../utils/transaction';
import { getMessageHash } from '../utils/typedData';
import { bnToUint256 } from '../utils/uint256';
import { SignerInterface } from './interface';

/**
 * Signer for accounts using Ethereum signature
 */
export class EthSigner implements SignerInterface {
  protected pk: string; // hex string without 0x and with an odd number of characters

  constructor(pk: Uint8Array | string = ethRandomPrivateKey()) {
    this.pk =
      pk instanceof Uint8Array
        ? buf2hex(pk).padStart(64, '0')
        : removeHexPrefix(toHex(pk)).padStart(64, '0');
  }

  /**
   * provides the Ethereum full public key (without parity prefix)
   * @returns an hex string : 64 first characters are Point X coordinate. 64 last characters are Point Y coordinate.
   */
  public async getPubKey(): Promise<string> {
    return addHexPrefix(
      buf2hex(secp256k1.getPublicKey(hexToBytes(addHexPrefix(this.pk)), false))
        .padStart(130, '0')
        .slice(2)
    );
  }

  public async signMessage(typedData: TypedData, accountAddress: string): Promise<Signature> {
    const msgHash = getMessageHash(typedData, accountAddress);
    const signature = secp256k1.Signature.fromBytes(
      secp256k1.sign(hexToBytes(sanitizeHex(msgHash)), hexToBytes(addHexPrefix(this.pk)), {
        prehash: false,
        format: 'recovered',
      }),
      'recovered'
    );
    return this.formatEthSignature(signature);
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

    const signature = secp256k1.Signature.fromBytes(
      secp256k1.sign(hexToBytes(sanitizeHex(msgHash)), hexToBytes(addHexPrefix(this.pk)), {
        prehash: false,
        format: 'recovered',
      }),
      'recovered'
    );
    return this.formatEthSignature(signature);
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

    const signature = secp256k1.Signature.fromBytes(
      secp256k1.sign(hexToBytes(sanitizeHex(msgHash)), hexToBytes(addHexPrefix(this.pk)), {
        prehash: false,
        format: 'recovered',
      }),
      'recovered'
    );
    return this.formatEthSignature(signature);
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

    const signature = secp256k1.Signature.fromBytes(
      secp256k1.sign(hexToBytes(sanitizeHex(msgHash)), hexToBytes(addHexPrefix(this.pk)), {
        prehash: false,
        format: 'recovered',
      }),
      'recovered'
    );
    return this.formatEthSignature(signature);
  }

  /**
   * Serialize the signature in conformity with starknet::eth_signature::Signature
   * @param ethSignature secp256k1 signature from Noble curves library
   * @return an array of felts, representing a Cairo Eth Signature.
   */
  protected formatEthSignature(ethSignature: ECDSASignature): ArraySignatureType {
    const r: Uint256 = bnToUint256(ethSignature.r);
    const s: Uint256 = bnToUint256(ethSignature.s);
    return [
      toHex(r.low),
      toHex(r.high),
      toHex(s.low),
      toHex(s.high),
      toHex(ethSignature.recovery!),
    ] as ArraySignatureType;
  }
}
