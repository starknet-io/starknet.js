import assert from 'minimalistic-assert';

import { Provider } from '../provider';
import { AddTransactionResponse, KeyPair, Signature, Transaction } from '../types';
import { TypedData, getMessageHash } from '../utils/eip712';
import { sign } from '../utils/ellipticCurve';
import { addHexPrefix } from '../utils/encode';
import { hashMessage } from '../utils/hash';
import { toBN } from '../utils/number';
import { getSelectorFromName } from '../utils/stark';
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
   * @param transaction - transaction to be invoked
   * @returns a confirmation of invoking a function on the starknet contract
   */
  public override async addTransaction(transaction: Transaction): Promise<AddTransactionResponse> {
    if (transaction.type === 'DEPLOY') return super.addTransaction(transaction);

    assert(
      !transaction.signature,
      "Adding signatures to a signer transaction currently isn't supported"
    );

    const { result } = await this.callContract({
      contract_address: this.address,
      entry_point_selector: getSelectorFromName('get_nonce'),
    });
    const nonceBn = toBN(result[0]);
    const calldataDecimal = (transaction.calldata || []).map((x) => toBN(x).toString());

    const msgHash = addHexPrefix(
      hashMessage(
        this.address,
        transaction.contract_address,
        transaction.entry_point_selector,
        calldataDecimal,
        nonceBn.toString()
      )
    );

    const { r, s } = sign(this.keyPair, msgHash);

    return super.addTransaction({
      type: 'INVOKE_FUNCTION',
      entry_point_selector: getSelectorFromName('execute'),
      calldata: [
        transaction.contract_address,
        transaction.entry_point_selector,
        calldataDecimal.length.toString(),
        ...calldataDecimal,
        nonceBn.toString(),
      ].map((x) => toBN(x).toString()),
      contract_address: this.address,
      signature: [r, s],
    });
  }

  /**
   * Sign an JSON object with the starknet private key and return the signature
   *
   * @param json - JSON object to be signed
   * @returns the signature of the JSON object
   * @throws {Error} if the JSON object is not a valid JSON
   */
  public async sign(typedData: TypedData): Promise<Signature> {
    return sign(this.keyPair, await this.hash(typedData));
  }

  /**
   * Hash a JSON object with pederson hash and return the hash
   *
   * @param json - JSON object to be hashed
   * @returns the hash of the JSON object
   * @throws {Error} if the JSON object is not a valid JSON
   */
  public async hash(typedData: TypedData): Promise<string> {
    return getMessageHash(typedData, this.address);
  }
}
