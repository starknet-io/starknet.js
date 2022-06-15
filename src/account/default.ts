import assert from 'minimalistic-assert';

import { ZERO } from '../constants';
import { Provider, ProviderInterface } from '../provider';
import { Signer, SignerInterface } from '../signer';
import {
  Abi,
  AddTransactionResponse,
  Call,
  InvocationsDetails,
  InvocationsSignerDetails,
  InvokeFunctionTransaction,
  KeyPair,
  Signature,
  Transaction,
} from '../types';
import { EstimateFee, EstimateFeeDetails } from '../types/account';
import { sign } from '../utils/ellipticCurve';
import {
  computeHashOnElements,
  feeTransactionVersion,
  getSelectorFromName,
  transactionVersion,
} from '../utils/hash';
import { BigNumberish, bigNumberishArrayToDecimalStringArray, toBN, toHex } from '../utils/number';
import { encodeShortString } from '../utils/shortString';
import { compileCalldata, estimatedFeeToMaxFee } from '../utils/stark';
import { fromCallsToExecuteCalldataWithNonce } from '../utils/transaction';
import { TypedData, getMessageHash } from '../utils/typedData';
import { AccountInterface } from './interface';

export class Account extends Provider implements AccountInterface {
  public address: string;

  public signer: SignerInterface;

  constructor(
    provider: ProviderInterface,
    address: string,
    keyPairOrSigner: KeyPair | SignerInterface
  ) {
    super(provider);
    this.signer =
      'getPubKey' in keyPairOrSigner ? keyPairOrSigner : new Signer(keyPairOrSigner as KeyPair);
    this.address = address;
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
    { nonce: providedNonce, blockIdentifier = 'pending' }: EstimateFeeDetails = {}
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
    const fetchedEstimate = await this.fetchEndpoint(
      'estimate_fee',
      { blockIdentifier },
      {
        contract_address: this.address,
        entry_point_selector: getSelectorFromName('__execute__'),
        calldata,
        version: toHex(version),
        signature: bigNumberishArrayToDecimalStringArray(signature),
      }
    );
    const suggestedMaxFee = estimatedFeeToMaxFee(fetchedEstimate.amount);

    return {
      ...fetchedEstimate,
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
  ): Promise<AddTransactionResponse> {
    const transactions = Array.isArray(calls) ? calls : [calls];
    const nonce = toBN(transactionsDetail.nonce ?? (await this.getNonce()));
    let maxFee: BigNumberish = '0';
    if (transactionsDetail.maxFee || transactionsDetail.maxFee === 0) {
      maxFee = transactionsDetail.maxFee;
    } else {
      const { suggestedMaxFee } = await this.estimateFee(transactions, { nonce });
      maxFee = suggestedMaxFee.toString();
    }

    const signerDetails: InvocationsSignerDetails = {
      walletAddress: this.address,
      nonce,
      maxFee,
      version: toBN(transactionVersion),
      chainId: this.chainId,
    };

    const signature = await this.signer.signTransaction(transactions, signerDetails, abis);

    const calldata = fromCallsToExecuteCalldataWithNonce(transactions, nonce);
    return this.fetchEndpoint('add_transaction', undefined, {
      type: 'INVOKE_FUNCTION',
      contract_address: this.address,
      entry_point_selector: getSelectorFromName('__execute__'),
      calldata,
      signature: bigNumberishArrayToDecimalStringArray(signature),
      max_fee: toHex(toBN(maxFee)),
    });
  }

  /**
   * Temporary method to allow dapps on starknet.js v2 to work with Argent X v3
   * @deprecated to remove ASAP
   */
  public async LEGACY_addTransaction(transaction: Transaction): Promise<AddTransactionResponse> {
    if (transaction.type === 'DEPLOY') throw new Error('No DEPLOYS');
    if (transaction.type === 'DECLARE') throw new Error('No DECLARES');

    assert(
      !transaction.signature,
      "Adding signatures to a signer transaction currently isn't supported"
    );

    let nonceBn;
    if (transaction.nonce) {
      nonceBn = toBN(transaction.nonce);
    } else {
      const { result } = await this.callContract({
        contractAddress: this.address,
        entrypoint: 'get_nonce',
      });
      nonceBn = toBN(result[0]);
    }

    function hashMulticall(
      account: string,
      transactions: InvokeFunctionTransaction[],
      nonce: string,
      maxFee: string
    ) {
      const hashArray = transactions
        .map(({ contract_address, entry_point_selector, calldata }) => [
          contract_address,
          entry_point_selector,
          computeHashOnElements(calldata || []),
        ])
        .map(bigNumberishArrayToDecimalStringArray)
        .map(computeHashOnElements);

      return computeHashOnElements([
        encodeShortString('StarkNet Transaction'),
        account,
        computeHashOnElements(hashArray),
        nonce,
        maxFee,
        transactionVersion,
      ]);
    }
    const msgHash = hashMulticall(this.address, [transaction], nonceBn.toString(), '0');
    if (!('keyPair' in this.signer)) {
      throw new Error('No keyPair');
    }
    const signature = sign((this.signer as any).keyPair, msgHash);

    const transformCallsToMulticallArrays = (calls: InvokeFunctionTransaction[]) => {
      const callArray: any[] = [];
      const calldata: BigNumberish[] = [];
      calls.forEach((call) => {
        const data = call.calldata || [];
        callArray.push({
          to: toBN(call.contract_address).toString(10),
          selector: toBN(call.entry_point_selector).toString(10),
          data_offset: calldata.length.toString(),
          data_len: data.length.toString(),
        });
        calldata.push(...data);
      });
      return {
        callArray,
        calldata: bigNumberishArrayToDecimalStringArray(calldata),
      };
    };

    const fromCallsToExecuteCalldata2 = (calls: InvokeFunctionTransaction[]): string[] => {
      const { callArray, calldata } = transformCallsToMulticallArrays(calls);
      return [
        callArray.length.toString(),
        ...callArray
          .map(
            ({ to, selector, data_offset, data_len }) =>
              [to, selector, data_offset, data_len] as string[]
          )
          .flat(),
        calldata.length.toString(),
        ...calldata,
      ];
    };

    const calldata = [...fromCallsToExecuteCalldata2([transaction]), nonceBn.toString()];

    return this.fetchEndpoint('add_transaction', undefined, {
      type: 'INVOKE_FUNCTION',
      contract_address: this.address,
      entry_point_selector: getSelectorFromName('__execute__'),
      calldata,
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
