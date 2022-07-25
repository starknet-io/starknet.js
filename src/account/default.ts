import { ZERO } from '../constants';
import { ProviderInterface, ProviderOptions } from '../provider';
import { Provider } from '../provider/default';
import { Signer, SignerInterface } from '../signer';
import {
  Abi,
  Call,
  InvocationsDetails,
  InvocationsSignerDetails,
  InvokeFunctionResponse,
  KeyPair,
  Signature,
} from '../types';
import { EstimateFee, EstimateFeeDetails } from '../types/account';
import { feeTransactionVersion, transactionVersion } from '../utils/hash';
import { BigNumberish, toBN, toHex } from '../utils/number';
import { compileCalldata, estimatedFeeToMaxFee } from '../utils/stark';
import { fromCallsToExecuteCalldataWithNonce } from '../utils/transaction';
import { TypedData, getMessageHash } from '../utils/typedData';
import { AccountInterface } from './interface';

export class Account extends Provider implements AccountInterface {
  public signer: SignerInterface;

  constructor(
    providerOrOptions: ProviderOptions | ProviderInterface,
    public address: string,
    keyPairOrSigner: KeyPair | SignerInterface
  ) {
    super(providerOrOptions);
    this.signer =
      'getPubKey' in keyPairOrSigner ? keyPairOrSigner : new Signer(keyPairOrSigner as KeyPair);
  }

  public async getNonce(): Promise<string> {
    const { result } = await this.callContract({
      contractAddress: this.address,
      entrypoint: 'get_nonce',
    });
    return toHex(toBN(result[0]));
  }

  public async estimateFee(
    calls: Call | Call[],
    { nonce: providedNonce, blockIdentifier }: EstimateFeeDetails = {}
  ): Promise<EstimateFee> {
    const transactions = Array.isArray(calls) ? calls : [calls];
    const nonce = providedNonce ?? (await this.getNonce());
    const version = toBN(feeTransactionVersion);

    const signerDetails: InvocationsSignerDetails = {
      walletAddress: this.address,
      nonce: toBN(nonce),
      maxFee: ZERO,
      version,
      chainId: this.chainId,
    };

    const signature = await this.signer.signTransaction(transactions, signerDetails);

    const calldata = fromCallsToExecuteCalldataWithNonce(transactions, nonce);
    const response = await super.getEstimateFee(
      { contractAddress: this.address, entrypoint: '__execute__', calldata, signature },
      blockIdentifier,
      { version }
    );

    const suggestedMaxFee = estimatedFeeToMaxFee(response.overall_fee);

    return {
      ...response,
      suggestedMaxFee,
    };
  }

  /**
   * Invoke execute function in account contract
   *
   * [Reference](https://github.com/starkware-libs/cairo-lang/blob/f464ec4797361b6be8989e36e02ec690e74ef285/src/starkware/starknet/services/api/gateway/gateway_client.py#L13-L17)
   *
   * @param calls - one or more calls to be executed
   * @param abis - one or more abis which can be used to display the calls
   * @param transactionsDetail - optional transaction details
   * @returns a confirmation of invoking a function on the starknet contract
   */
  public async execute(
    calls: Call | Call[],
    abis: Abi[] | undefined = undefined,
    transactionsDetail: InvocationsDetails = {}
  ): Promise<InvokeFunctionResponse> {
    const transactions = Array.isArray(calls) ? calls : [calls];
    const nonce = toBN(transactionsDetail.nonce ?? (await this.getNonce()));
    let maxFee: BigNumberish = '0';
    if (transactionsDetail.maxFee || transactionsDetail.maxFee === 0) {
      maxFee = transactionsDetail.maxFee;
    } else {
      const { suggestedMaxFee } = await this.estimateFee(transactions, { nonce });
      maxFee = suggestedMaxFee.toString();
    }

    const version = toBN(transactionVersion);

    const signerDetails: InvocationsSignerDetails = {
      walletAddress: this.address,
      nonce,
      maxFee,
      version,
      chainId: this.chainId,
    };

    const signature = await this.signer.signTransaction(transactions, signerDetails, abis);

    const calldata = fromCallsToExecuteCalldataWithNonce(transactions, nonce);

    return this.invokeFunction(
      { contractAddress: this.address, entrypoint: '__execute__', calldata, signature },
      {
        maxFee,
        version,
      }
    );
  }

  /**
   * Sign an JSON object with the starknet private key and return the signature
   *
   * @param json - JSON object to be signed
   * @returns the signature of the JSON object
   * @throws {Error} if the JSON object is not a valid JSON
   */
  public async signMessage(typedData: TypedData): Promise<Signature> {
    return this.signer.signMessage(typedData, this.address);
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
   * Verify a signature of a given hash
   * @warning This method is not recommended, use verifyMessage instead
   *
   * @param hash - JSON object to be verified
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
   * Verify a signature of a JSON object
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
