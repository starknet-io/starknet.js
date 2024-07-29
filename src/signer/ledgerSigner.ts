/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */
import type {
  InvocationsSignerDetails,
  V2InvocationsSignerDetails,
  V3InvocationsSignerDetails,
  DeployAccountSignerDetails,
  V2DeployAccountSignerDetails,
  V3DeployAccountSignerDetails,
  DeclareSignerDetails,
  V2DeclareSignerDetails,
  V3DeclareSignerDetails,
  TypedData,
  Call,
  Signature,
} from '../types';
import assert from '../utils/assert';
import { CallData } from '../utils/calldata';
import type { SignerInterface } from './interface';
import { MASK_31 } from '../constants';
import { ETransactionVersion2 } from '../types/api/rpcspec_0_6';
import { getMessageHash } from '../utils/typedData';
import { getExecuteCalldata } from '../utils/transaction';
import {
  calculateDeclareTransactionHash,
  calculateDeployAccountTransactionHash,
  calculateInvokeTransactionHash,
} from '../utils/hash';
import { intDAM } from '../utils/stark';
import { addHexPrefix, buf2hex, concatenateArrayBuffer, removeHexPrefix } from '../utils/encode';
import { hexToBytes, stringToSha256ToArrayBuff4, toHex } from '../utils/num';
import { starkCurve } from '../utils/ec';
import { ETransactionVersion3 } from '../types/api';

// import type _Transport from '@ledgerhq/hw-transport';
// NOTE: the preceding line was substituted because of the '@ledgerhq/hw-transport' module bug listed in
// the following issue https://github.com/LedgerHQ/ledger-live/issues/7448
// if required for development, the line can be uncommented and '@ledgerhq/hw-transport' temporarily added as a dev dependency
type _Transport = any;

/**
 * Signer for accounts using a Ledger Nano S+/X signature
 */
export class LedgerSigner<Transport extends Record<any, any>> implements SignerInterface {
  readonly transporter: Transport;

  // this is a hack to allow the '@ledgerhq/hw-transport' type to be used as a dev dependency but not exposed in the production build
  private _transporter: _Transport;

  readonly accountID: number;

  readonly eip2645applicationName: string;

  readonly pathBuffer: Uint8Array;

  private appVersion: string;

  protected pubKey: string;

  protected fullPubKey: string;

  /**
   * constructor of the LedgerSigner class.
   * @param {Transport} transport 5 transports are available to handle USB, bluetooth, Node, Web, Mobile.
   * See Guides for more details.
   * @param {number} accountID ID of Ledger Nano (can handle 2**31 accounts).
   * @param {string} [eip2645application='LedgerW'] A wallet is defined by an ERC2645 derivation path (6 items).
   * One item is the `application`. Default value is `LedgerW`.
   * @example
   * ```typescript
   * import TransportNodeHid from "@ledgerhq/hw-transport-node-hid";
   * const myNodeTransport = await TransportNodeHid.create();
   * const myLedgerSigner = new LedgerSigner(myNodeTransport, 0);
   * ```
   */
  constructor(transport: Transport, accountID: number, eip2645application: string = 'LedgerW') {
    assert(accountID >= 0, 'Ledger account ID shall not be a negative number.');
    assert(accountID <= MASK_31, 'Ledger account ID shall be < 2**31.');
    assert(!!eip2645application, 'Ledger application name shall not be empty.');
    this.transporter = transport;
    this._transporter = this.transporter as any;
    this.accountID = accountID;
    this.pubKey = '';
    this.fullPubKey = '';
    this.eip2645applicationName = eip2645application;
    this.appVersion = '';
    this.pathBuffer = getLedgerPathBuffer(this.accountID, this.eip2645applicationName);
  }

  /**
   * provides the Starknet public key
   * @returns an hex string : 64 characters are Point X coordinate.
   */
  public async getPubKey(): Promise<string> {
    if (!this.pubKey) await this.getPublicKeys();
    return this.pubKey;
  }

  /**
   * provides the full public key (with parity prefix)
   * @returns an hex string : 2 first characters are the parity, the 64 following characters are Point X coordinate. 64 last characters are Point Y coordinate.
   */
  public async getFullPubKey(): Promise<string> {
    if (!this.fullPubKey) await this.getPublicKeys();
    return this.fullPubKey;
  }

  /**
   * Returns the version of the Starknet APP implemented in the Ledger.
   * @returns {string} version.
   * @example
   * ```typescript
   * const result = await myLedgerSigner.getAppVersion();
   * // result= "1.1.1"
   * ```
   */
  public async getAppVersion(): Promise<string> {
    if (!this.appVersion) {
      const resp = await this._transporter.send(Number('0x5a'), 0, 0, 0);
      this.appVersion = `${resp[0]}.${resp[1]}.${resp[2]}`;
    }
    return this.appVersion;
  }

  public async signMessage(typedDataToHash: TypedData, accountAddress: string): Promise<Signature> {
    const msgHash = getMessageHash(typedDataToHash, accountAddress);
    return this.signRaw(msgHash);
  }

  public async signTransaction(
    transactions: Call[],
    transactionsDetail: InvocationsSignerDetails
  ): Promise<Signature> {
    const compiledCalldata = getExecuteCalldata(transactions, transactionsDetail.cairoVersion);
    let msgHash;

    // TODO: How to do generic union discriminator for all like this
    if (Object.values(ETransactionVersion2).includes(transactionsDetail.version as any)) {
      const det = transactionsDetail as V2InvocationsSignerDetails;
      msgHash = calculateInvokeTransactionHash({
        ...det,
        senderAddress: det.walletAddress,
        compiledCalldata,
        version: det.version,
      });
    } else if (Object.values(ETransactionVersion3).includes(transactionsDetail.version as any)) {
      const det = transactionsDetail as V3InvocationsSignerDetails;
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

    return this.signRaw(msgHash as string);
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

    return this.signRaw(msgHash as string);
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

    return this.signRaw(msgHash as string);
  }

  private async signRaw(msgHash: string): Promise<Signature> {
    addHexPrefix(
      buf2hex(await this._transporter.send(Number('0x5a'), 2, 0, 0, Buffer.from(this.pathBuffer)))
    );
    // eslint-disable-next-line no-bitwise
    const shiftedHash = toHex(BigInt(msgHash) << 4n);
    const buff2 = hexToBytes(shiftedHash);
    const respSign2 = Uint8Array.from(
      await this._transporter.send(Number('0x5a'), 2, 1, 0, Buffer.from(buff2))
    );
    const r = BigInt(addHexPrefix(buf2hex(respSign2.subarray(1, 33))));
    const s = BigInt(addHexPrefix(buf2hex(respSign2.subarray(33, 65))));
    const v = respSign2[65];
    const sign0 = new starkCurve.Signature(r, s);
    const sign1 = sign0.addRecoveryBit(v);
    return sign1;
  }

  private async getPublicKeys() {
    const pathBuff = this.pathBuffer;
    const respGetPublic = Uint8Array.from(
      await this._transporter.send(Number('0x5a'), 1, 0, 0, Buffer.from(pathBuff))
    );
    this.pubKey = addHexPrefix(buf2hex(respGetPublic.subarray(1, 33)));
    this.fullPubKey = addHexPrefix(buf2hex(respGetPublic.subarray(0, 65)));
  }
}

/**
 * format the Ledger wallet path to an Uint8Array.
 * EIP2645 path = 2645'/starknet'/application'/0'/accountId'/0
 * @param {number} accountId Id of account. < 2**31.
 * @param {string} [applicationName='LedgerW'] utf8 string of application name.
 * @returns an Uint8array of 24 bytes.
 */
export function getLedgerPathBuffer(accountId: number, applicationName: string): Uint8Array {
  const path0buff = new Uint8Array([128, 0, 10, 85]); // "0x80000A55" EIP2645;
  const path1buff = new Uint8Array([71, 65, 233, 201]); // "starknet"
  const path2buff =
    applicationName === 'LedgerW'
      ? new Uint8Array([43, 206, 231, 219])
      : stringToSha256ToArrayBuff4(applicationName);
  const path3buff = new Uint8Array([0, 0, 0, 0]);
  const hex = toHex(accountId);
  const padded = addHexPrefix(removeHexPrefix(hex).padStart(8, '0'));
  const path4buff = hexToBytes(padded);
  const path5buff = new Uint8Array([0, 0, 0, 0]);
  const pathBuff = concatenateArrayBuffer([
    path0buff,
    path1buff,
    path2buff,
    path3buff,
    path4buff,
    path5buff,
  ]);
  return pathBuff;
}
