import assert from 'minimalistic-assert';

import { compileCalldata } from '../contract';
import { Provider } from '../provider';
import { Abi, AddTransactionResponse, Invocation, KeyPair, Signature } from '../types';
import { sign } from '../utils/ellipticCurve';
import { addHexPrefix } from '../utils/encode';
import { hashMessage } from '../utils/hash';
import { BigNumberish, bigNumberishArrayToDecimalStringArray, toBN, toHex } from '../utils/number';
import { getSelectorFromName } from '../utils/stark';
import { TypedData, getMessageHash } from '../utils/typedData';
import { SignerInterface } from './interface';

export class Signer extends Provider implements SignerInterface {
  public address: string;

  private keyPair: KeyPair;

  constructor(provider: Provider, address: string, keyPair: KeyPair) {
    super(provider);
    this.keyPair = keyPair;
    this.address = address;
  }

  public async getNonce(): Promise<string> {
    const { result } = await this.callContract({
      contractAddress: this.address,
      entrypoint: 'get_nonce',
    });
    return toHex(toBN(result[0]));
  }

  /**
   * Invoke a function on the starknet contract
   *
   * [Reference](https://github.com/starkware-libs/cairo-lang/blob/f464ec4797361b6be8989e36e02ec690e74ef285/src/starkware/starknet/services/api/gateway/gateway_client.py#L13-L17)
   *
   * @param transaction - transaction to be invoked
   * @returns a confirmation of invoking a function on the starknet contract
   */
  public override async invokeFunction(
    { contractAddress, entrypoint, calldata = [], nonce, ...invocation }: Invocation,
    _abi?: Abi
  ): Promise<AddTransactionResponse> {
    assert(
      !invocation.signature,
      "Adding signatures to a signer transaction currently isn't supported"
    );

    const nonceBn = toBN(nonce ?? (await this.getNonce()));
    const entrypointSelector = getSelectorFromName(entrypoint);
    const calldataDecimal = bigNumberishArrayToDecimalStringArray(calldata);

    const msgHash = addHexPrefix(
      hashMessage(
        this.address,
        contractAddress,
        entrypointSelector,
        calldataDecimal,
        nonceBn.toString()
      )
    );

    const signature = sign(this.keyPair, msgHash);

    return super.fetchEndpoint('add_transaction', undefined, {
      type: 'INVOKE_FUNCTION',
      entry_point_selector: getSelectorFromName('execute'),
      calldata: bigNumberishArrayToDecimalStringArray([
        contractAddress,
        entrypointSelector,
        calldataDecimal.length.toString(),
        ...calldataDecimal,
        nonceBn.toString(),
      ]),
      contract_address: this.address,
      signature: bigNumberishArrayToDecimalStringArray(signature),
    });
  }

  /**
   * Sign an JSON object with the starknet private key and return the signature
   *
   * @param json - JSON object to be signed
   * @returns the signature of the JSON object
   * @throws {Error} if the JSON object is not a valid JSON
   */
  public async signMessage(typedData: TypedData): Promise<Signature> {
    return sign(this.keyPair, await this.hashMessage(typedData));
  }

  /**
   * Hash a JSON object with pederson hash and return the hash
   *
   * @param json - JSON object to be hashed
   * @returns the hash of the JSON object
   * @throws {Error} if the JSON object is not a valid JSON
   */
  public async hashMessage(typedData: TypedData): Promise<string> {
    return getMessageHash(typedData, this.address);
  }

  /**
   * Verify a signature of a JSON object
   *
   * @param json - JSON object to be verified
   * @param signature - signature of the JSON object
   * @returns true if the signature is valid, false otherwise
   * @throws {Error} if the JSON object is not a valid JSON or the signature is not a valid signature
   */
  public async verifyMessageHash(hash: BigNumberish, signature: Signature): Promise<boolean> {
    try {
      await this.callContract({
        contractAddress: this.address,
        entrypoint: 'is_valid_signature',
        calldata: compileCalldata({
          hash: toBN(hash).toString(),
          signature: signature.map((x) => toBN(x).toString()),
        }),
      });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Verify a signature of a given hash
   * @warning This method is not recommended, use verifyMessage instead
   *
   * @param hash - hash to be verified
   * @param signature - signature of the hash
   * @returns true if the signature is valid, false otherwise
   * @throws {Error} if the signature is not a valid signature
   */
  public async verifyMessage(typedData: TypedData, signature: Signature): Promise<boolean> {
    const hash = await this.hashMessage(typedData);
    return this.verifyMessageHash(hash, signature);
  }
}
