import { ZERO } from '../constants';
import { ProviderInterface, ProviderOptions } from '../provider';
import { Provider } from '../provider/default';
import { BlockIdentifier } from '../provider/utils';
import { Signer, SignerInterface } from '../signer';
import {
  Abi,
  Call,
  DeclareContractResponse,
  DeployContractResponse,
  EstimateFeeAction,
  InvocationsDetails,
  InvocationsSignerDetails,
  InvokeFunctionResponse,
  KeyPair,
  Signature,
} from '../types';
import { EstimateFee, EstimateFeeDetails } from '../types/account';
import { AllowArray, DeclareContractPayload, DeployAccountContractPayload } from '../types/lib';
import { calculateContractAddressFromHash, transactionVersion } from '../utils/hash';
import { BigNumberish, toBN } from '../utils/number';
import { parseContract } from '../utils/provider';
import { compileCalldata, estimatedFeeToMaxFee } from '../utils/stark';
import { fromCallsToExecuteCalldata } from '../utils/transaction';
import { TypedData, getMessageHash } from '../utils/typedData';
import { AccountInterface } from './interface';

export class Account extends Provider implements AccountInterface {
  public signer: SignerInterface;

  public address: string;

  constructor(
    providerOrOptions: ProviderOptions | ProviderInterface,
    address: string,
    keyPairOrSigner: KeyPair | SignerInterface
  ) {
    super(providerOrOptions);
    this.address = address.toLowerCase();
    this.signer =
      'getPubKey' in keyPairOrSigner ? keyPairOrSigner : new Signer(keyPairOrSigner as KeyPair);
  }

  public async getNonce(blockIdentifier?: BlockIdentifier): Promise<BigNumberish> {
    return super.getNonce(this.address, blockIdentifier);
  }

  public async estimateFee(
    calls: AllowArray<Call>,
    estimateFeeDetails?: EstimateFeeDetails | undefined
  ): Promise<EstimateFee> {
    return this.estimateInvokeFee(calls, estimateFeeDetails);
  }

  public async estimateInvokeFee(
    calls: AllowArray<Call>,
    { nonce: providedNonce, blockIdentifier }: EstimateFeeDetails = {}
  ): Promise<EstimateFee> {
    const transactions = Array.isArray(calls) ? calls : [calls];
    const nonce = toBN(providedNonce ?? (await this.getNonce()));
    const version = toBN(transactionVersion);
    const chainId = await this.getChainId();

    const signerDetails: InvocationsSignerDetails = {
      walletAddress: this.address,
      nonce,
      maxFee: ZERO,
      version,
      chainId,
    };

    const signature = await this.signer.signTransaction(transactions, signerDetails);

    const calldata = fromCallsToExecuteCalldata(transactions);
    const response = await super.getInvokeEstimateFee(
      { contractAddress: this.address, calldata, signature },
      { version, nonce },
      blockIdentifier
    );

    const suggestedMaxFee = estimatedFeeToMaxFee(response.overall_fee);

    return {
      ...response,
      suggestedMaxFee,
    };
  }

  public async estimateDeclareFee(
    { classHash, contract }: DeclareContractPayload,
    { blockIdentifier, nonce: providedNonce }: EstimateFeeDetails = {}
  ): Promise<EstimateFee> {
    const nonce = toBN(providedNonce ?? (await this.getNonce()));
    const version = toBN(transactionVersion);
    const chainId = await this.getChainId();
    const contractDefinition = parseContract(contract);

    const signature = await this.signer.signDeclareTransaction({
      classHash,
      senderAddress: this.address,
      chainId,
      maxFee: ZERO,
      version,
      nonce,
    });

    const response = await super.getDeclareEstimateFee(
      { senderAddress: this.address, signature, contractDefinition },
      { version, nonce },
      blockIdentifier
    );
    const suggestedMaxFee = estimatedFeeToMaxFee(response.overall_fee);

    return {
      ...response,
      suggestedMaxFee,
    };
  }

  public async estimateAccountDeployFee(
    {
      classHash,
      addressSalt = 0,
      constructorCalldata = [],
      contractAddress: providedContractAddress,
    }: DeployAccountContractPayload,
    { blockIdentifier, nonce: providedNonce }: EstimateFeeDetails = {}
  ): Promise<EstimateFee> {
    const nonce = toBN(providedNonce ?? (await this.getNonce()));
    const version = toBN(transactionVersion);
    const chainId = await this.getChainId();
    const contractAddress =
      providedContractAddress ??
      calculateContractAddressFromHash(addressSalt, classHash, constructorCalldata, 0);

    const signature = await this.signer.signDeployAccountTransaction({
      classHash,
      contractAddress,
      chainId,
      maxFee: ZERO,
      version,
      nonce,
      addressSalt,
      constructorCalldata,
    });

    const response = await super.getDeployAccountEstimateFee(
      { classHash, addressSalt, constructorCalldata, signature },
      { version, nonce },
      blockIdentifier
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
    calls: AllowArray<Call>,
    abis: Abi[] | undefined = undefined,
    transactionsDetail: InvocationsDetails = {}
  ): Promise<InvokeFunctionResponse> {
    const transactions = Array.isArray(calls) ? calls : [calls];
    const nonce = toBN(transactionsDetail.nonce ?? (await this.getNonce()));
    const maxFee =
      transactionsDetail.maxFee ??
      (await this.getMaxFee({ type: 'INVOKE', payload: calls }, transactionsDetail));
    const version = toBN(transactionVersion);
    const chainId = await this.getChainId();

    const signerDetails: InvocationsSignerDetails = {
      walletAddress: this.address,
      nonce,
      maxFee,
      version,
      chainId,
    };

    const signature = await this.signer.signTransaction(transactions, signerDetails, abis);

    const calldata = fromCallsToExecuteCalldata(transactions);

    return this.invokeFunction(
      { contractAddress: this.address, calldata, signature },
      {
        nonce,
        maxFee,
        version,
      }
    );
  }

  public async declare(
    { classHash, contract }: DeclareContractPayload,
    transactionsDetail: InvocationsDetails = {}
  ): Promise<DeclareContractResponse> {
    const nonce = toBN(transactionsDetail.nonce ?? (await this.getNonce()));
    const maxFee =
      transactionsDetail.maxFee ??
      (await this.getMaxFee(
        { type: 'DECLARE', payload: { classHash, contract } },
        transactionsDetail
      ));

    const version = toBN(transactionVersion);
    const chainId = await this.getChainId();

    const signature = await this.signer.signDeclareTransaction({
      classHash,
      senderAddress: this.address,
      chainId,
      maxFee,
      version,
      nonce,
    });

    const contractDefinition = parseContract(contract);

    return this.declareContract(
      { contractDefinition, senderAddress: this.address, signature },
      {
        nonce,
        maxFee,
        version,
      }
    );
  }

  public async deployAccount(
    {
      classHash,
      constructorCalldata = [],
      addressSalt = 0,
      contractAddress: providedContractAddress,
    }: DeployAccountContractPayload,
    transactionsDetail: InvocationsDetails = {}
  ): Promise<DeployContractResponse> {
    const nonce = toBN(transactionsDetail.nonce ?? (await this.getNonce()));
    const version = toBN(transactionVersion);
    const chainId = await this.getChainId();

    const contractAddress =
      providedContractAddress ??
      calculateContractAddressFromHash(addressSalt, classHash, constructorCalldata, 0);

    const maxFee =
      transactionsDetail.maxFee ??
      (await this.getMaxFee(
        {
          type: 'DEPLOY_ACCOUNT',
          payload: { classHash, constructorCalldata, addressSalt, contractAddress },
        },
        transactionsDetail
      ));

    const signature = await this.signer.signDeployAccountTransaction({
      classHash,
      constructorCalldata,
      contractAddress,
      addressSalt,
      chainId,
      maxFee,
      version,
      nonce,
    });

    return this.deployAccountContract(
      { classHash, addressSalt, constructorCalldata, signature },
      {
        nonce,
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
        entrypoint: 'isValidSignature',
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

  public async getMaxFee(estimateFeeAction: EstimateFeeAction, details: EstimateFeeDetails) {
    let feeEstimate: EstimateFee;

    switch (estimateFeeAction.type) {
      case 'INVOKE':
        feeEstimate = await this.estimateInvokeFee(estimateFeeAction.payload, details);
        break;

      case 'DECLARE':
        feeEstimate = await this.estimateDeclareFee(estimateFeeAction.payload, details);
        break;

      case 'DEPLOY_ACCOUNT':
        feeEstimate = await this.estimateAccountDeployFee(estimateFeeAction.payload, details);
        break;

      default:
        feeEstimate = { suggestedMaxFee: ZERO, overall_fee: ZERO };
        break;
    }

    return feeEstimate.suggestedMaxFee.toString();
  }
}
