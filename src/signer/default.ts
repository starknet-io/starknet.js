import assert from 'minimalistic-assert';

import { Provider } from '../provider';
import { AddTransactionResponse, KeyPair, Transaction } from '../types';
import { sign } from '../utils/ellipticCurve';
import { addHexPrefix } from '../utils/encode';
import { hashMessage } from '../utils/hash';
import { toBN } from '../utils/number';
import { getSelectorFromName } from '../utils/starknet';
import { SignerInterface } from './interface';

export class Signer extends Provider implements SignerInterface {
  public address: string;

  private keyPair: KeyPair;

  constructor(provider: Provider, address: string, keyPair: KeyPair) {
    super(provider);
    this.keyPair = keyPair;
    this.address = address;
  }

  /**
   * Invoke a function on the starknet contract
   *
   * [Reference](https://github.com/starkware-libs/cairo-lang/blob/f464ec4797361b6be8989e36e02ec690e74ef285/src/starkware/starknet/services/api/gateway/gateway_client.py#L13-L17)
   *
   * @param tx - transaction to be invoked
   * @returns a confirmation of invoking a function on the starknet contract
   */
  public override async addTransaction(tx: Transaction): Promise<AddTransactionResponse> {
    if (tx.type === 'DEPLOY') return super.addTransaction(tx);

    assert(!tx.signature, "Adding signatures to a signer tx currently isn't supported");

    const { result } = await this.callContract({
      contract_address: this.address,
      entry_point_selector: getSelectorFromName('get_current_nonce'),
    });
    const nonceBn = toBN(result[0]);
    const calldataDecimal = (tx.calldata || []).map((x) => toBN(x).toString());

    const msgHash = addHexPrefix(
      hashMessage(
        '0', // needs to be walletAddress once it's possible to retrieve address(self) in cairo
        tx.contract_address,
        tx.entry_point_selector!,
        calldataDecimal,
        nonceBn.toString()
      )
    );

    const { r, s } = sign(this.keyPair, msgHash);

    return super.addTransaction({
      type: 'INVOKE_FUNCTION',
      entry_point_selector: getSelectorFromName('execute'),
      calldata: [
        tx.contract_address,
        tx.entry_point_selector!,
        calldataDecimal.length.toString(),
        ...calldataDecimal,
        nonceBn.toString(),
      ].map((x) => toBN(x).toString()),
      contract_address: this.address,
      signature: [r, s],
    });
  }
}
