import Eth from '@ledgerhq/hw-app-eth';
import Transport from '@ledgerhq/hw-transport';
import TransportWebHID from '@ledgerhq/hw-transport-webhid';

import { Abi, Invocation, InvocationsSignerDetails, Signature } from '../types';
import { hashMulticall } from '../utils/hash';
import { TypedData, getMessageHash } from '../utils/typedData';
import { SignerInterface } from './interface';

function hexZeroPad(hash: string, length: number): string {
  let value = hash;
  if (value.length > 2 * length + 2) {
    throw new Error('value out of range');
  }
  while (value.length < 2 * length + 2) {
    value = `0x0${value.substring(2)}`;
  }
  return value;
}

export class LedgerBlindSigner implements SignerInterface {
  public derivationPath = "/2645'/579218131'/1148870696'/0'/0'/0";

  private transport: Transport | undefined;

  private async getEthApp(): Promise<Eth> {
    if (!this.transport) {
      try {
        this.transport = await TransportWebHID.create();
      } catch {
        throw new Error('Device connection error');
      }
    }
    return new Eth(this.transport);
  }

  public async getPubKey(): Promise<string> {
    const eth = await this.getEthApp();
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
    const eth = await this.getEthApp();

    const msgHash = hashMulticall(
      transactionsDetail.walletAddress,
      transactions,
      transactionsDetail.nonce.toString(),
      transactionsDetail.maxFee.toString()
    );

    const signature = (await eth.starkUnsafeSign(this.derivationPath, hexZeroPad(msgHash, 32))) as {
      r: string;
      s: string;
    };

    return [`0x${signature.r}`, `0x${signature.s}`];
  }

  public async signMessage(typedData: TypedData, accountAddress: string): Promise<Signature> {
    const eth = await this.getEthApp();

    const msgHash = getMessageHash(typedData, accountAddress);

    const signature = (await eth.starkUnsafeSign(this.derivationPath, hexZeroPad(msgHash, 32))) as {
      r: string;
      s: string;
    };

    return [`0x${signature.r}`, `0x${signature.s}`];
  }
}
