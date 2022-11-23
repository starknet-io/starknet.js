import { UDC, ZERO } from '../constants';
import { ProviderInterface, ProviderOptions } from '../provider';
import { Provider } from '../provider/default';
import { BlockIdentifier } from '../provider/utils';
import { Signer, SignerInterface } from '../signer';
import {
  Abi,
  AllowArray,
  Call,
  DeclareContractPayload,
  DeclareContractResponse,
  DeployAccountContractPayload,
  DeployContractResponse,
  EstimateFee,
  EstimateFeeAction,
  EstimateFeeDetails,
  InvocationsDetails,
  InvocationsSignerDetails,
  InvokeFunctionResponse,
  KeyPair,
  Signature,
  UniversalDeployerContractPayload,
} from '../types';
import {
  calculateContractAddressFromHash,
  feeTransactionVersion,
  transactionVersion,
} from '../utils/hash';
import { BigNumberish, toBN, toCairoBool } from '../utils/number';
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
    const version = toBN(feeTransactionVersion);
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
    const version = toBN(feeTransactionVersion);
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
    const version = toBN(feeTransactionVersion);
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

  public async estimateDeployFee(
    {
      classHash,
      salt,
      unique = true,
      constructorCalldata = [],
      additionalCalls = [],
    }: UniversalDeployerContractPayload,
    transactionsDetail?: InvocationsDetails | undefined
  ): Promise<EstimateFee> {
    const compiledConstructorCallData = compileCalldata(constructorCalldata);

    const callsArray = Array.isArray(additionalCalls) ? additionalCalls : [additionalCalls];
    return this.estimateInvokeFee(
      [
        {
          contractAddress: UDC.ADDRESS,
          entrypoint: UDC.ENTRYPOINT,
          calldata: [
            classHash,
            salt,
            toCairoBool(unique),
            compiledConstructorCallData.length,
            ...compiledConstructorCallData,
          ],
        },
        ...callsArray,
      ],
      transactionsDetail
    );
  }

  public async execute(
    calls: AllowArray<Call>,
    abis: Abi[] | undefined = undefined,
    transactionsDetail: InvocationsDetails = {}
  ): Promise<InvokeFunctionResponse> {
    const transactions = Array.isArray(calls) ? calls : [calls];
    const nonce = toBN(transactionsDetail.nonce ?? (await this.getNonce()));
    const maxFee =
      transactionsDetail.maxFee ??
      (await this.getSuggestedMaxFee({ type: 'INVOKE', payload: calls }, transactionsDetail));
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
      (await this.getSuggestedMaxFee(
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

  public async deploy(
    {
      classHash,
      salt,
      unique = true,
      constructorCalldata = [],
      additionalCalls = [],
    }: UniversalDeployerContractPayload,
    transactionsDetail: InvocationsDetails = {}
  ): Promise<InvokeFunctionResponse> {
    const compiledConstructorCallData = compileCalldata(constructorCalldata);

    const callsArray = Array.isArray(additionalCalls) ? additionalCalls : [additionalCalls];

    return this.execute(
      [
        {
          contractAddress: UDC.ADDRESS,
          entrypoint: UDC.ENTRYPOINT,
          calldata: [
            classHash,
            salt,
            toCairoBool(unique),
            compiledConstructorCallData.length,
            ...compiledConstructorCallData,
          ],
        },
        ...callsArray,
      ],
      undefined,
      transactionsDetail
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
      (await this.getSuggestedMaxFee(
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

  public async signMessage(typedData: TypedData): Promise<Signature> {
    return this.signer.signMessage(typedData, this.address);
  }

  public async hashMessage(typedData: TypedData): Promise<string> {
    return getMessageHash(typedData, this.address);
  }

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

  public async verifyMessage(typedData: TypedData, signature: Signature): Promise<boolean> {
    const hash = await this.hashMessage(typedData);
    return this.verifyMessageHash(hash, signature);
  }

  public async getSuggestedMaxFee(
    { type, payload }: EstimateFeeAction,
    details: EstimateFeeDetails
  ) {
    let feeEstimate: EstimateFee;

    switch (type) {
      case 'INVOKE':
        feeEstimate = await this.estimateInvokeFee(payload, details);
        break;

      case 'DECLARE':
        feeEstimate = await this.estimateDeclareFee(payload, details);
        break;

      case 'DEPLOY_ACCOUNT':
        feeEstimate = await this.estimateAccountDeployFee(payload, details);
        break;

      case 'DEPLOY':
        feeEstimate = await this.estimateDeployFee(payload, details);
        break;

      default:
        feeEstimate = { suggestedMaxFee: ZERO, overall_fee: ZERO };
        break;
    }

    return feeEstimate.suggestedMaxFee.toString();
  }
}
