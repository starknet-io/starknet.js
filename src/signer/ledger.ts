// import Transport from '@ledgerhq/hw-transport';
// import TransportWebHID from '@ledgerhq/hw-transport-webhid';
import TransportNodeHid from '@ledgerhq/hw-transport-node-hid';
import StarkwareApp from '@zondax/ledger-starkware-app';

import { Invocation, InvocationsSignerDetails, Signature } from '../types';
import { addHexPrefix } from '../utils/encode';
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
  public derivationPath = "m/2645'/579218131'/1148870696'/0";

  private transport: TransportNodeHid | undefined;

  private async getStarwareApp(): Promise<StarkwareApp> {
    if (!this.transport) {
      try {
        // this.transport = await TransportWebHID.create();
        this.transport = await TransportNodeHid.open('');
      } catch {
        throw new Error('Device connection error');
      }
    }
    return new StarkwareApp(this.transport);
  }

  public async getPubKey(): Promise<string> {
    const stark = await this.getStarwareApp();
    const { publicKey } = await stark.getPubKey(this.derivationPath);
    return `0x${publicKey.toString('hex', 1, 1 + 32)}`;
  }

  public async signTransaction(
    transactions: Invocation[],
    transactionsDetail: InvocationsSignerDetails
  ): Promise<Signature> {
    const msgHash = hashMulticall(
      transactionsDetail.walletAddress,
      transactions,
      transactionsDetail.nonce.toString(),
      transactionsDetail.maxFee.toString(),
      transactionsDetail.version.toString()
    );

    console.log(`Ledger signTransaction hash = ${msgHash}`);

    return this.sign(msgHash);
  }

  public async signMessage(typedData: TypedData, accountAddress: string): Promise<Signature> {
    const msgHash = getMessageHash(typedData, accountAddress);

    return this.sign(msgHash);
  }

  protected async sign(msg: string): Promise<Signature> {
    const stark = await this.getStarwareApp();

    console.log(`Message = ${msg}`);

    const message = hexZeroPad(msg, 32);

    console.log(`Message = ${message}`);

    const response = await stark.signFelt(
      this.derivationPath,
      Buffer.from(message.slice(2), 'hex')
    );
    console.log(response.returnCode);
    console.log(response.errorMessage);
    console.log(response.hash);
    console.log(`r = 0x${response.r.toString('hex')}`);
    console.log(`s = 0x${response.s.toString('hex')}`);
    return [addHexPrefix(response.r.toString('hex')), addHexPrefix(response.s.toString('hex'))];
  }
}
