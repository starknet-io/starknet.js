import { hexZeroPad } from '@ethersproject/bytes';
import Eth from '@ledgerhq/hw-app-eth';
import Transport from '@ledgerhq/hw-transport';
import TransportWebHID from '@ledgerhq/hw-transport-webhid';
import { ethers } from 'ethers';

import { Abi, Invocation, InvocationsSignerDetails, Signature } from '../types';
import { TypedData } from '../utils/typedData';
import { SignerInterface } from './interface';

export class LedgerSigner implements SignerInterface {
  public derivationPath = "/2645'/579218131'/1148870696'/0'/0'/0";

  static transport: Transport;

  static async getEthApp(): Promise<Eth> {
    console.log('isSupported', await TransportWebHID.isSupported());
    if (!this.transport) {
      console.log('create TransportWebHID');
      this.transport = await TransportWebHID.create();
    }
    return new Eth(this.transport);
  }

  public async getPubKey(): Promise<string> {
    const eth = await LedgerSigner.getEthApp();
    const response = await eth.starkGetPublicKey(this.derivationPath);
    const starkPub = `0x${response.slice(1, 1 + 32).toString('hex')}`;
    return starkPub;
  }

  public async signTransaction(
    transactions: Invocation[],
    transactionsDetail: InvocationsSignerDetails,
    abis?: Abi[]
  ): Promise<Signature> {
    if (abis && abis.length !== transactions.length) {
      throw new Error('ABI must be provided for each transaction or no transaction');
    }
    console.log(transactions);
    console.log(transactionsDetail);
    return ['', ''];
  }

  public async signMessage(typedData: TypedData, accountAddress: string): Promise<Signature> {
    const eth = await LedgerSigner.getEthApp();
    const messageHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(JSON.stringify(typedData)));

    console.log(`Message to be signed by Nano S/X ${messageHash} for ${accountAddress}`);

    const signature = (await eth.starkUnsafeSign(
      this.derivationPath,
      hexZeroPad(messageHash, 32)
    )) as { r: string; s: string };

    return [`0x${signature.r}`, `0x${signature.s}`];
  }

  static async askPermissionIfNeeded(): Promise<void> {
    const transport = await TransportWebHID.create();
    await transport.close();
  }
}
