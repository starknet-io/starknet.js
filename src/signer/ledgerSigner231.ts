/* eslint-disable @typescript-eslint/no-loop-func */
/* eslint-disable no-await-in-loop */
/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */

import {
  isRPC08_ResourceBounds,
  type BigNumberish,
  type Call,
  type Calldata,
  type LedgerPathCalculation,
  type Signature,
  type V2DeployAccountSignerDetails,
  type V2InvocationsSignerDetails,
  type V3DeployAccountSignerDetails,
  type V3InvocationsSignerDetails,
} from '../types';
import { CallData } from '../utils/calldata';
import type { SignerInterface } from './interface';
import { getSelector } from '../utils/hash';
import { concatenateArrayBuffer } from '../utils/encode';
import { hexToBytes } from '../utils/num';
import { addAddressPadding } from '../utils/address';
import { getLedgerPathBuffer221, LedgerSigner221 } from './ledgerSigner221';
import assert from '../utils/assert';
import {
  encodeDataResourceBoundsL1,
  encodeResourceBoundsL1,
  encodeResourceBoundsL2,
  hashDAMode,
} from '../utils/hash/transactionHash/v3';
import type { RPCSPEC08 } from '../types/api';
import { intDAM } from '../utils/stark';

/**
 * Signer for accounts using a Ledger Nano S+/X signature (Starknet Ledger APP version 2.3.1).
 *
 * The Ledger has to be connected, unlocked and the Starknet APP has to be selected prior of use of this class.
 */
export class LedgerSigner231<Transport extends Record<any, any> = any>
  extends LedgerSigner221
  implements SignerInterface
{
  /**
   * constructor of the LedgerSigner class.
   * @param {Transport} transport 5 transports are available to handle USB, bluetooth, Node, Web, Mobile.
   * See Guides for more details.
   * @param {number} accountID ID of Ledger Nano account (can handle 2**31 accounts).
   * @param {string} [eip2645application='LedgerW'] A wallet is defined by an ERC2645 derivation path (6 items).
   * One item is called `application` and can be customized.
   * Default value is `LedgerW`.
   * @param {LedgerPathCalculation} [pathFunction=getLedgerPathBuffer221]
   * defines the function that will calculate the path. By default `getLedgerPathBuffer221` is selected.
   *
   * If you are using APP v2.3.1 with an account created with the v1.1.1, you need to use :
   * ```typescript
   * const myLedgerSigner = new LedgerSigner231(myNodeTransport, 0, undefined, getLedgerPathBuffer111);
   * ```
   * @example
   * ```typescript
   * import TransportNodeHid from "@ledgerhq/hw-transport-node-hid";
   * const myNodeTransport = await TransportNodeHid.create();
   * const myLedgerSigner = new LedgerSigner231(myNodeTransport, 0);
   * ```
   */
  constructor(
    transport: Transport,
    accountID: number,
    eip2645application: string = 'LedgerW',
    pathFunction: LedgerPathCalculation = getLedgerPathBuffer221
  ) {
    super(transport, accountID, eip2645application, pathFunction);
  }

  /**
   * Ask the Ledger Nano to display and sign a Starknet V1 transaction.
   * @param {V2InvocationsSignerDetails} txDetails All the details needed for a txV1.
   * @param {Call[]} calls array of Starknet invocations
   * @returns an object including the transaction Hash and the signature
   * @example
   * ```typescript
   * const calls: Call[] = [{contractAddress: "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
   *      entrypoint: "transfer",
   *      calldata:["0x11f5fc2a92ac03434a7937fe982f5e5293b65ad438a989c5b78fb8f04a12016",
   *        "0x9184e72a000", "0x0"]}];
   * const txDet: V2InvocationsSignerDetails = {
   *    walletAddress: txDetails.accountAddress,
   *    chainId: constants.StarknetChainId.SN_MAIN,
   *    cairoVersion: "1", maxFee: txDetails.max_fee,
   *    nonce: txDetails.nonce, version: "0x1"
   *  };
   * const res = await myLedgerSigner.signTxV1(txDet, calls);
   * // res = {hash:
   * //   signature:
   * // }
   * ```
   */
  public async signTxV1(
    txDetails: V2InvocationsSignerDetails,
    calls: Call[]
  ): Promise<{ hash: bigint; signature: Signature }> {
    // APDU 0 for path
    await this._transporter.send(Number('0x5a'), 4, 0, 0, Buffer.from(this.pathBuffer));
    /* APDU 1 =
        accountAddress (32 bytes) +
        max_fee (32 bytes) +
        chain_id (32 bytes) +
        nonce (32 bytes) 
      */
    const accountAddressBuf: Uint8Array = this.convertBnToLedger(txDetails.walletAddress);
    const maxFeeBuf: Uint8Array = this.convertBnToLedger(txDetails.maxFee);
    const chainIdBuf: Uint8Array = this.convertBnToLedger(txDetails.chainId);
    const nonceBuf: Uint8Array = this.convertBnToLedger(txDetails.nonce);
    const dataBuf: Uint8Array = concatenateArrayBuffer([
      accountAddressBuf,
      maxFeeBuf,
      chainIdBuf,
      nonceBuf,
    ]);
    await this._transporter.send(Number('0x5a'), 4, 1, 0, Buffer.from(dataBuf));
    // APDU 2 = Nb of calls
    const nbCallsBuf: Uint8Array = this.convertBnToLedger(calls.length);
    await this._transporter.send(Number('0x5a'), 4, 2, 0, Buffer.from(nbCallsBuf));
    // APDU 3 = Calls
    let respSign: Uint8Array = new Uint8Array(0);
    // eslint-disable-next-line no-restricted-syntax
    for (const call of calls) {
      const calldatas: Uint8Array[] = this.encodeCall(call);
      respSign = await this._transporter.send(Number('0x5a'), 4, 3, 0, Buffer.from(calldatas[0]));
      if (calldatas.length > 1) {
        // eslint-disable-next-line @typescript-eslint/no-loop-func
        calldatas.slice(1).forEach(async (part: Uint8Array) => {
          respSign = await this._transporter.send(Number('0x5a'), 4, 3, 1, Buffer.from(part));
        });
      }
    }
    return this.decodeSignatureLedger(respSign);
  }

  /**
   * Ask to the Ledger Nano to display and sign a Starknet V3 transaction (Rpc 0.7 & Rpc 0.8).
   * @param {V3InvocationsSignerDetails} txDetails All the details needed for a txV3.
   * @param {Call[]} calls array of Starknet invocations
   * @returns an object including the transaction Hash and the signature
   * @example
   * ```typescript
   * const calls: Call[] = [{contractAddress: "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
   *      entrypoint: "transfer",
   *      calldata:["0x11f5fc2a92ac03434a7937fe982f5e5293b65ad438a989c5b78fb8f04a12016",
   *        "0x9184e72a000", "0x0"]}];
   * const txDetailsV3: V3InvocationsSignerDetails = {
   *   chainId: constants.StarknetChainId.SN_MAIN,
   *   nonce: "28", accountDeploymentData: [],
   *   paymasterData: [], cairoVersion: "1",
   *   feeDataAvailabilityMode: "L1", nonceDataAvailabilityMode: "L1",
   *   resourceBounds: {
   *     l1_gas: { max_amount: "0x2a00", max_price_per_unit: "0x5c00000"
   *     },
   *     l2_gas: { max_amount: "0x00", max_price_per_unit: "0x00"},
   *   }, tip: 0, version: "0x3", walletAddress: account0.address
   *  }; // Rpc 0.7 transaction.
   * const res = await myLedgerSigner.signTxV3(txDetailsV3, calls);
   * // res = {hash:
   * //   signature:
   * // }
   * ```
   */
  public async signTxV3(
    txDetails: V3InvocationsSignerDetails,
    calls: Call[]
  ): Promise<{ hash: bigint; signature: Signature }> {
    assert(txDetails.paymasterData.length <= 7, 'Paymaster data includes more than 7 items.');
    assert(
      txDetails.accountDeploymentData.length <= 7,
      'accountDeploymentData includes more than 7 items'
    );
    // APDU 0 for path
    await this._transporter.send(Number('0x5a'), 3, 0, 0, Buffer.from(this.pathBuffer));
    /* APDU 1 =
      accountAddress (32 bytes) +
      chain_id (32 bytes) +
      nonce (32 bytes) +
      data_availability_mode (32 bytes)
    */
    const accountAddressBuf = this.convertBnToLedger(txDetails.walletAddress);
    const chainIdBuf = this.convertBnToLedger(txDetails.chainId);
    const nonceBuf = this.convertBnToLedger(txDetails.nonce);
    const dAModeHashBuf = this.convertBnToLedger(
      hashDAMode(
        intDAM(txDetails.nonceDataAvailabilityMode),
        intDAM(txDetails.feeDataAvailabilityMode)
      )
    );
    const dataBuf: Uint8Array = concatenateArrayBuffer([
      accountAddressBuf,
      chainIdBuf,
      nonceBuf,
      dAModeHashBuf,
    ]);
    await this._transporter.send(Number('0x5a'), 3, 1, 0, Buffer.from(dataBuf));

    // APDU 2 = fees
    if (isRPC08_ResourceBounds(txDetails.resourceBounds)) {
      const tipBuf = this.convertBnToLedger(txDetails.tip);
      const l1_gasBuf = this.convertBnToLedger(encodeResourceBoundsL1(txDetails.resourceBounds));
      const l2_gasBuf = this.convertBnToLedger(encodeResourceBoundsL2(txDetails.resourceBounds));
      const l1_data_gasBuf = this.convertBnToLedger(
        encodeDataResourceBoundsL1(txDetails.resourceBounds as RPCSPEC08.ResourceBounds)
      );
      const feeBuf: Uint8Array = concatenateArrayBuffer([
        tipBuf,
        l1_gasBuf,
        l2_gasBuf,
        l1_data_gasBuf,
      ]);
      await this._transporter.send(Number('0x5a'), 3, 2, 0, Buffer.from(feeBuf));
    } else {
      // Rpc0.7
      const tipBuf = this.convertBnToLedger(txDetails.tip);
      const l1_gasBuf = this.convertBnToLedger(encodeResourceBoundsL1(txDetails.resourceBounds));
      const l2_gasBuf = this.convertBnToLedger(encodeResourceBoundsL2(txDetails.resourceBounds));
      const feeBuf: Uint8Array = concatenateArrayBuffer([tipBuf, l1_gasBuf, l2_gasBuf]);
      await this._transporter.send(Number('0x5a'), 3, 2, 0, Buffer.from(feeBuf));
    }

    // APDU 3 = paymaster data
    const paymasterBuf = concatenateArrayBuffer(
      txDetails.paymasterData.map((value: BigNumberish): Uint8Array => {
        const a = this.convertBnToLedger(value);
        return a;
      })
    );
    await this._transporter.send(Number('0x5a'), 3, 3, 0, Buffer.from(paymasterBuf));

    //  APDU 4 = account deployment data
    const accountDeployDataBuf = concatenateArrayBuffer(
      txDetails.paymasterData.map((value: BigNumberish): Uint8Array => {
        const a = this.convertBnToLedger(value);
        return a;
      })
    );
    await this._transporter.send(Number('0x5a'), 3, 4, 0, Buffer.from(accountDeployDataBuf));

    // APDU 5 = Nb of calls
    const nbCallsBuf: Uint8Array = this.convertBnToLedger(calls.length);
    await this._transporter.send(Number('0x5a'), 3, 5, 0, Buffer.from(nbCallsBuf));

    // APDU 6 = Calls
    let respSign: Uint8Array = new Uint8Array(0);
    // eslint-disable-next-line no-restricted-syntax
    for (const call of calls) {
      const calldatas: Uint8Array[] = this.encodeCall(call);
      respSign = await this._transporter.send(Number('0x5a'), 3, 6, 0, Buffer.from(calldatas[0]));
      if (calldatas.length > 1) {
        calldatas.slice(1).forEach(async (part: Uint8Array) => {
          respSign = await this._transporter.send(Number('0x5a'), 3, 6, 1, Buffer.from(part));
        });
      }
    }
    return this.decodeSignatureLedger(respSign);
  }

  /**
   * Ask the Ledger Nano to display and sign a Starknet V1 account deployment.
   * @param {V2DeployAccountSignerDetails} deployAccountDetail All the details needed for a V1 deploy account.
   * @returns an object including the transaction Hash and the signature
   * @example
   * ```typescript
   * const deployData: V2DeployAccountSignerDetails =
   * {
   *  tip: 0, paymasterData: [], accountDeploymentData: [],
   *  nonceDataAvailabilityMode: 'L1', feeDataAvailabilityMode: 'L1',
   *  resourceBounds: {
   *    l2_gas: { max_amount: '0x0', max_price_per_unit: '0x0' },
   *    l1_gas: { max_amount: '0x0', max_price_per_unit: '0x0' }
   *   },
   *  classHash: '0x540d7f5ec7ecf317e68d48564934cb99259781b1ee3cedbbc37ec5337f8e688',
   *  constructorCalldata: [
   *    '89832696000889662999767022750851886674077821293893187900664573372145410755'
   *  ],
   *  contractAddress: '0x32c60fba64eb96831d064bbb2319375b7b7381543abe66da872e4344bcd72a0',
   *  addressSalt: '0x0032d7efe2a9232f9b463e7206c68fdea4aeb13fec0cb308c6ba1d197d5922c3',
   *  chainId: '0x534e5f5345504f4c4941', maxFee: 55050000000000n,
   *  version: '0x1', nonce: 0n
   *}
   * const res = await myLedgerSigner.signDeployAccountV1(deployData);
   * // res = {hash:
   * //   signature:
   * // }
   * ```
   */
  public async signDeployAccountV1(
    deployAccountDetail: V2DeployAccountSignerDetails
  ): Promise<{ hash: bigint; signature: Signature }> {
    // APDU 0 for path
    await this._transporter.send(Number('0x5a'), 6, 0, 0, Buffer.from(this.pathBuffer));
    /* APDU 1 =
        contract_address (32 bytes) +
        class_hash (32 bytes) +
        contract_address_salt (32 bytes) +
        max_fee (32 bytes) +
        chain_id (32 bytes) +
        nonce (32 bytes)
      */
    const accountAddressBuf: Uint8Array = this.convertBnToLedger(
      deployAccountDetail.contractAddress
    );
    const classHashBuf: Uint8Array = this.convertBnToLedger(deployAccountDetail.classHash);
    const saltBuf: Uint8Array = this.convertBnToLedger(deployAccountDetail.addressSalt);
    const maxFeeBuf: Uint8Array = this.convertBnToLedger(deployAccountDetail.maxFee);
    const chainIdBuf: Uint8Array = this.convertBnToLedger(deployAccountDetail.chainId);
    const nonceBuf: Uint8Array = this.convertBnToLedger(deployAccountDetail.nonce);
    const dataBuf: Uint8Array = concatenateArrayBuffer([
      accountAddressBuf,
      classHashBuf,
      saltBuf,
      maxFeeBuf,
      chainIdBuf,
      nonceBuf,
    ]);
    await this._transporter.send(Number('0x5a'), 6, 1, 0, Buffer.from(dataBuf));
    // APDU 2 = constructor length
    const compiledConstructor = CallData.compile(deployAccountDetail.constructorCalldata);
    const constructorLengthBuf: Uint8Array = this.convertBnToLedger(compiledConstructor.length);
    await this._transporter.send(Number('0x5a'), 6, 2, 0, Buffer.from(constructorLengthBuf));
    // APDU 3 = constructor
    const constructorBuf = concatenateArrayBuffer(
      compiledConstructor.map((parameter: string): Uint8Array => {
        const a = this.convertBnToLedger(parameter);
        return a;
      })
    );
    const constructorChunks: Uint8Array[] = [];
    const chunkSize = 7 * 32; // 224 bytes
    for (let i = 0; i < constructorBuf.length; i += chunkSize)
      constructorChunks.push(constructorBuf.subarray(i, i + chunkSize));
    let respSign: Uint8Array = new Uint8Array(0);
    // eslint-disable-next-line no-restricted-syntax
    for (const chunk of constructorChunks) {
      respSign = await this._transporter.send(Number('0x5a'), 6, 3, 0, Buffer.from(chunk));
    }
    return this.decodeSignatureLedger(respSign);
  }

  /**
   *Ask the Ledger Nano to display and sign a Starknet V3 account deployment (Rpc 0.7 & Rpc 0.8).
   * @param {V3DeployAccountSignerDetails} deployAccountDetail All the details needed for a V3 deploy account.
   * @returns an object including the transaction Hash and the signature
   * @example
   * ```typescript
   * const deployData: V3DeployAccountSignerDetails =
   * {
   *  tip: 0, paymasterData: [], accountDeploymentData: [],
   *  nonceDataAvailabilityMode: 'L1', feeDataAvailabilityMode: 'L1',
   *  resourceBounds: {
   *    l2_gas: { max_amount: '0x0', max_price_per_unit: '0x0' },
   *    l1_gas: { max_amount: '0x226', max_price_per_unit: '0x22ecb25c00' }
   *   },
   *  classHash: '0x540d7f5ec7ecf317e68d48564934cb99259781b1ee3cedbbc37ec5337f8e688',
   *  constructorCalldata: [
   *    '3571125127744830445572285574469842579401255431821644822726857471463672199621'
   *  ],
   *  contractAddress: '0x4ca062add1cf12a107be1107af17981cf6e544a24d987693230ea481d3d5e34',
   *  addressSalt: '0x07e52f68e3160e1ef698211cdf6d3792368fe347e7e2d4a8ace14d9b248f39c5',
   *  chainId: '0x534e5f5345504f4c4941', maxFee: 0,
   *  version: '0x3', nonce: 0n
   *} // Rpc 0.7 transaction.
   * const res = await myLedgerSigner.signDeployAccountV3(deployData);
   * // res = {hash:
   * //   signature:
   * // }
   * ```
   */
  public async signDeployAccountV3(
    deployAccountDetail: V3DeployAccountSignerDetails
  ): Promise<{ hash: bigint; signature: Signature }> {
    // APDU 0 for path
    await this._transporter.send(Number('0x5a'), 5, 0, 0, Buffer.from(this.pathBuffer));
    /* APDU 1 =
        contract_address (32 bytes) +
        chain_id (32 bytes) +
        nonce (32 bytes) +
        data_availability_mode (32 bytes) +
        class_hash (32 bytes) +
        contract_address_salt (32 bytes)
      */
    const accountAddressBuf: Uint8Array = this.convertBnToLedger(
      deployAccountDetail.contractAddress
    );
    const chainIdBuf: Uint8Array = this.convertBnToLedger(deployAccountDetail.chainId);
    const nonceBuf: Uint8Array = this.convertBnToLedger(deployAccountDetail.nonce);
    const dAModeHashBuf = this.convertBnToLedger(
      hashDAMode(
        intDAM(deployAccountDetail.nonceDataAvailabilityMode),
        intDAM(deployAccountDetail.feeDataAvailabilityMode)
      )
    );
    const classHashBuf: Uint8Array = this.convertBnToLedger(deployAccountDetail.classHash);
    const saltBuf: Uint8Array = this.convertBnToLedger(deployAccountDetail.addressSalt);
    const dataBuf: Uint8Array = concatenateArrayBuffer([
      accountAddressBuf,
      chainIdBuf,
      nonceBuf,
      dAModeHashBuf,
      classHashBuf,
      saltBuf,
    ]);
    await this._transporter.send(Number('0x5a'), 5, 1, 0, Buffer.from(dataBuf));
    // APDU 2 = fees
    if (isRPC08_ResourceBounds(deployAccountDetail.resourceBounds)) {
      const tipBuf = this.convertBnToLedger(deployAccountDetail.tip);
      const l1_gasBuf = this.convertBnToLedger(
        encodeResourceBoundsL1(deployAccountDetail.resourceBounds)
      );
      const l2_gasBuf = this.convertBnToLedger(
        encodeResourceBoundsL2(deployAccountDetail.resourceBounds)
      );
      const l1_data_gasBuf = this.convertBnToLedger(
        encodeDataResourceBoundsL1(deployAccountDetail.resourceBounds as RPCSPEC08.ResourceBounds)
      );
      const feeBuf: Uint8Array = concatenateArrayBuffer([
        tipBuf,
        l1_gasBuf,
        l2_gasBuf,
        l1_data_gasBuf,
      ]);
      await this._transporter.send(Number('0x5a'), 5, 2, 0, Buffer.from(feeBuf));
    } else {
      // Rpc0.7
      const tipBuf = this.convertBnToLedger(deployAccountDetail.tip);
      const l1_gasBuf = this.convertBnToLedger(
        encodeResourceBoundsL1(deployAccountDetail.resourceBounds)
      );
      const l2_gasBuf = this.convertBnToLedger(
        encodeResourceBoundsL2(deployAccountDetail.resourceBounds)
      );
      const feeBuf: Uint8Array = concatenateArrayBuffer([tipBuf, l1_gasBuf, l2_gasBuf]);
      await this._transporter.send(Number('0x5a'), 5, 2, 0, Buffer.from(feeBuf));
    }
    // APDU 3 = paymaster data
    const paymasterBuf = concatenateArrayBuffer(
      deployAccountDetail.paymasterData.map((value: BigNumberish): Uint8Array => {
        const a = this.convertBnToLedger(value);
        return a;
      })
    );
    await this._transporter.send(Number('0x5a'), 5, 3, 0, Buffer.from(paymasterBuf));
    // APDU 4 = constructor length
    const compiledConstructor = CallData.compile(deployAccountDetail.constructorCalldata);
    const constructorLengthBuf: Uint8Array = this.convertBnToLedger(compiledConstructor.length);
    await this._transporter.send(Number('0x5a'), 5, 4, 0, Buffer.from(constructorLengthBuf));
    // APDU 5_ = constructor
    const constructorBuf = concatenateArrayBuffer(
      compiledConstructor.map((parameter: string): Uint8Array => {
        const a = this.convertBnToLedger(parameter);
        return a;
      })
    );
    const constructorChunks: Uint8Array[] = [];
    const chunkSize = 7 * 32; // 224 bytes
    for (let i = 0; i < constructorBuf.length; i += chunkSize)
      constructorChunks.push(constructorBuf.subarray(i, i + chunkSize));
    let respSign: Uint8Array = new Uint8Array(0);
    // eslint-disable-next-line no-restricted-syntax
    for (const chunk of constructorChunks) {
      respSign = await this._transporter.send(Number('0x5a'), 5, 5, 0, Buffer.from(chunk));
    }
    return this.decodeSignatureLedger(respSign);
  }

  /** Internal function to convert a Call to an array of Uint8Array.
   * @param {Call} call A Call to convert.
   * @return {Uint8Array[]} Call encoded in an array of Uint8Array (each containing 7 u256).
   */
  protected encodeCall(call: Call): Uint8Array[] {
    const toBuf: Uint8Array = this.convertBnToLedger(call.contractAddress);
    const selectorBuf: Uint8Array = hexToBytes(addAddressPadding(getSelector(call.entrypoint)));
    let calldataBuf: Uint8Array = new Uint8Array([]);
    if (call.calldata) {
      const compiledCalldata: Calldata = CallData.compile(call.calldata);
      const calldataSizeBuf: Uint8Array = this.convertBnToLedger(compiledCalldata.length);

      calldataBuf = concatenateArrayBuffer([
        calldataSizeBuf,
        ...compiledCalldata.map((parameter: string): Uint8Array => {
          const a = this.convertBnToLedger(parameter);
          return a;
        }),
      ]);
    } else {
      calldataBuf = this.convertBnToLedger('0x00');
    }
    const callBuf: Uint8Array = concatenateArrayBuffer([toBuf, selectorBuf, calldataBuf]);
    // slice data into chunks of 7 * 32 bytes
    const calldatas: Uint8Array[] = [];
    const chunkSize = 7 * 32; // 224 bytes
    for (let i = 0; i < callBuf.length; i += chunkSize)
      calldatas.push(callBuf.subarray(i, i + chunkSize));
    return calldatas;
  }
}
