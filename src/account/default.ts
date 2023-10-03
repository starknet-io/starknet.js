import { UDC, ZERO } from '../constants';
import { ProviderInterface } from '../provider';
import { Provider } from '../provider/default';
import { Signer, SignerInterface } from '../signer';
import {
  Abi,
  AccountInvocationItem,
  AccountInvocations,
  AccountInvocationsFactoryDetails,
  AllowArray,
  BigNumberish,
  BlockIdentifier,
  CairoVersion,
  Call,
  DeclareAndDeployContractPayload,
  DeclareContractPayload,
  DeclareContractResponse,
  DeclareContractTransaction,
  DeclareDeployUDCResponse,
  DeployAccountContractPayload,
  DeployAccountContractTransaction,
  DeployContractResponse,
  DeployContractUDCResponse,
  DeployTransactionReceiptResponse,
  Details,
  EstimateFee,
  EstimateFeeAction,
  EstimateFeeBulk,
  EstimateFeeDetails,
  Invocation,
  Invocations,
  InvocationsDetails,
  InvocationsSignerDetails,
  InvokeFunctionResponse,
  MultiDeployContractResponse,
  Nonce,
  ProviderOptions,
  Signature,
  SimulateTransactionDetails,
  SimulateTransactionResponse,
  TransactionType,
  TypedData,
  UniversalDeployerContractPayload,
} from '../types';
import { CallData } from '../utils/calldata';
import { extractContractHashes, isSierra } from '../utils/contract';
import { starkCurve } from '../utils/ec';
import { parseUDCEvent } from '../utils/events';
import {
  calculateContractAddressFromHash,
  feeTransactionVersion,
  feeTransactionVersion_2,
  transactionVersion,
  transactionVersion_2,
} from '../utils/hash';
import { toBigInt, toCairoBool } from '../utils/num';
import { parseContract } from '../utils/provider';
import { estimatedFeeToMaxFee, formatSignature, randomAddress } from '../utils/stark';
import { getExecuteCalldata } from '../utils/transaction';
import { getMessageHash } from '../utils/typedData';
import { AccountInterface } from './interface';

export class Account extends Provider implements AccountInterface {
  public signer: SignerInterface;

  public address: string;

  public cairoVersion: CairoVersion;

  constructor(
    providerOrOptions: ProviderOptions | ProviderInterface,
    address: string,
    pkOrSigner: Uint8Array | string | SignerInterface,
    cairoVersion?: CairoVersion
  ) {
    super(providerOrOptions);
    this.address = address.toLowerCase();
    this.signer =
      typeof pkOrSigner === 'string' || pkOrSigner instanceof Uint8Array
        ? new Signer(pkOrSigner)
        : pkOrSigner;

    if (cairoVersion) {
      this.cairoVersion = cairoVersion.toString() as CairoVersion;
    }
  }

  public async getNonce(blockIdentifier?: BlockIdentifier): Promise<Nonce> {
    return super.getNonceForAddress(this.address, blockIdentifier);
  }

  private async getNonceSafe(nonce?: BigNumberish) {
    // Patch DEPLOY_ACCOUNT: RPC getNonce for non-existing address will result in error, on Sequencer it is '0x0'
    try {
      return toBigInt(nonce ?? (await this.getNonce()));
    } catch (error) {
      return 0n;
    }
  }

  /**
   * Retrieves the Cairo version from the network and sets `cairoVersion` if not already set in the constructor
   * @param classHash if provided detects Cairo version from classHash, otherwise from the account address
   */
  public async getCairoVersion(classHash?: string) {
    if (!this.cairoVersion) {
      const { cairo } = classHash
        ? await super.getContractVersion(undefined, classHash)
        : await super.getContractVersion(this.address);
      this.cairoVersion = cairo;
    }
    return this.cairoVersion;
  }

  public async estimateFee(
    calls: AllowArray<Call>,
    estimateFeeDetails?: EstimateFeeDetails | undefined
  ): Promise<EstimateFee> {
    return this.estimateInvokeFee(calls, estimateFeeDetails);
  }

  public async estimateInvokeFee(
    calls: AllowArray<Call>,
    { nonce: providedNonce, blockIdentifier, skipValidate }: EstimateFeeDetails = {}
  ): Promise<EstimateFee> {
    const transactions = Array.isArray(calls) ? calls : [calls];
    const nonce = toBigInt(providedNonce ?? (await this.getNonce()));
    const version = toBigInt(feeTransactionVersion);
    const chainId = await this.getChainId();

    const signerDetails: InvocationsSignerDetails = {
      walletAddress: this.address,
      nonce,
      maxFee: ZERO,
      version,
      chainId,
      cairoVersion: await this.getCairoVersion(),
    };

    const invocation = await this.buildInvocation(transactions, signerDetails);
    const response = await super.getInvokeEstimateFee(
      { ...invocation },
      { version, nonce },
      blockIdentifier,
      skipValidate
    );

    const suggestedMaxFee = estimatedFeeToMaxFee(response.overall_fee);

    return {
      ...response,
      suggestedMaxFee,
    };
  }

  public async estimateDeclareFee(
    { contract, classHash: providedClassHash, casm, compiledClassHash }: DeclareContractPayload,
    { blockIdentifier, nonce: providedNonce, skipValidate }: EstimateFeeDetails = {}
  ): Promise<EstimateFee> {
    const nonce = toBigInt(providedNonce ?? (await this.getNonce()));
    const version = !isSierra(contract) ? feeTransactionVersion : feeTransactionVersion_2;
    const chainId = await this.getChainId();

    const declareContractTransaction = await this.buildDeclarePayload(
      { classHash: providedClassHash, contract, casm, compiledClassHash },
      {
        nonce,
        chainId,
        version,
        walletAddress: this.address,
        maxFee: ZERO,
        cairoVersion: undefined, // unused parameter
      }
    );

    const response = await super.getDeclareEstimateFee(
      declareContractTransaction,
      { version, nonce },
      blockIdentifier,
      skipValidate
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
    { blockIdentifier, skipValidate }: EstimateFeeDetails = {}
  ): Promise<EstimateFee> {
    const version = toBigInt(feeTransactionVersion);
    const nonce = ZERO; // DEPLOY_ACCOUNT transaction will have a nonce zero as it is the first transaction in the account
    const chainId = await this.getChainId();

    const payload = await this.buildAccountDeployPayload(
      { classHash, addressSalt, constructorCalldata, contractAddress: providedContractAddress },
      {
        nonce,
        chainId,
        version,
        walletAddress: this.address, // unused parameter
        maxFee: ZERO,
        cairoVersion: undefined, // unused parameter
      }
    );

    const response = await super.getDeployAccountEstimateFee(
      { ...payload },
      { version, nonce },
      blockIdentifier,
      skipValidate
    );
    const suggestedMaxFee = estimatedFeeToMaxFee(response.overall_fee);

    return {
      ...response,
      suggestedMaxFee,
    };
  }

  public async estimateDeployFee(
    payload: UniversalDeployerContractPayload | UniversalDeployerContractPayload[],
    transactionsDetail?: InvocationsDetails | undefined
  ): Promise<EstimateFee> {
    const calls = this.buildUDCContractPayload(payload);
    return this.estimateInvokeFee(calls, transactionsDetail);
  }

  public async estimateFeeBulk(
    invocations: Invocations,
    { nonce, blockIdentifier, skipValidate }: EstimateFeeDetails = {}
  ): Promise<EstimateFeeBulk> {
    const accountInvocations = await this.accountInvocationsFactory(invocations, {
      versions: [feeTransactionVersion, feeTransactionVersion_2],
      nonce,
      blockIdentifier,
    });

    const response = await super.getEstimateFeeBulk(accountInvocations, {
      blockIdentifier,
      skipValidate,
    });

    return [].concat(response as []).map((elem: any) => {
      const suggestedMaxFee = estimatedFeeToMaxFee(elem.overall_fee);
      return {
        ...elem,
        suggestedMaxFee,
      };
    });
  }

  public async buildInvocation(
    call: Array<Call>,
    signerDetails: InvocationsSignerDetails
  ): Promise<Invocation> {
    const calldata = getExecuteCalldata(call, await this.getCairoVersion());
    const signature = await this.signer.signTransaction(call, signerDetails);

    return {
      contractAddress: this.address,
      calldata,
      signature,
    };
  }

  public async execute(
    calls: AllowArray<Call>,
    abis: Abi[] | undefined = undefined,
    transactionsDetail: InvocationsDetails = {}
  ): Promise<InvokeFunctionResponse> {
    const transactions = Array.isArray(calls) ? calls : [calls];
    const nonce = toBigInt(transactionsDetail.nonce ?? (await this.getNonce()));
    const maxFee =
      transactionsDetail.maxFee ??
      (await this.getSuggestedMaxFee(
        { type: TransactionType.INVOKE, payload: calls },
        transactionsDetail
      ));
    const version = toBigInt(transactionVersion);
    const chainId = await this.getChainId();

    const signerDetails: InvocationsSignerDetails = {
      walletAddress: this.address,
      nonce,
      maxFee,
      version,
      chainId,
      cairoVersion: await this.getCairoVersion(),
    };

    const signature = await this.signer.signTransaction(transactions, signerDetails, abis);

    const calldata = getExecuteCalldata(transactions, await this.getCairoVersion());

    return this.invokeFunction(
      { contractAddress: this.address, calldata, signature },
      {
        nonce,
        maxFee,
        version,
      }
    );
  }

  /**
   * First check if contract is already declared, if not declare it
   * If contract already declared returned transaction_hash is ''.
   * Method will pass even if contract is already declared
   * @param transactionsDetail (optional)
   */
  public async declareIfNot(
    payload: DeclareContractPayload,
    transactionsDetail: InvocationsDetails = {}
  ): Promise<DeclareContractResponse> {
    const declareContractPayload = extractContractHashes(payload);
    try {
      await this.getClassByHash(declareContractPayload.classHash);
    } catch (error) {
      return this.declare(payload, transactionsDetail);
    }
    return {
      transaction_hash: '',
      class_hash: declareContractPayload.classHash,
    };
  }

  public async declare(
    payload: DeclareContractPayload,
    transactionsDetail: InvocationsDetails = {}
  ): Promise<DeclareContractResponse> {
    const declareContractPayload = extractContractHashes(payload);
    const details = {} as Details;

    details.nonce = toBigInt(transactionsDetail.nonce ?? (await this.getNonce()));
    details.maxFee =
      transactionsDetail.maxFee ??
      (await this.getSuggestedMaxFee(
        {
          type: TransactionType.DECLARE,
          payload: declareContractPayload,
        },
        transactionsDetail
      ));
    details.version = !isSierra(payload.contract) ? transactionVersion : transactionVersion_2;
    details.chainId = await this.getChainId();

    const declareContractTransaction = await this.buildDeclarePayload(declareContractPayload, {
      ...details,
      walletAddress: this.address,
      cairoVersion: undefined, // unused parameter
    });

    return this.declareContract(declareContractTransaction, details);
  }

  public async deploy(
    payload: UniversalDeployerContractPayload | UniversalDeployerContractPayload[],
    details?: InvocationsDetails | undefined
  ): Promise<MultiDeployContractResponse> {
    const params = [].concat(payload as []).map((it) => {
      const {
        classHash,
        salt,
        unique = true,
        constructorCalldata = [],
      } = it as UniversalDeployerContractPayload;

      const compiledConstructorCallData = CallData.compile(constructorCalldata);
      const deploySalt = salt ?? randomAddress();

      return {
        call: {
          contractAddress: UDC.ADDRESS,
          entrypoint: UDC.ENTRYPOINT,
          calldata: [
            classHash,
            deploySalt,
            toCairoBool(unique),
            compiledConstructorCallData.length,
            ...compiledConstructorCallData,
          ],
        },
        address: calculateContractAddressFromHash(
          unique ? starkCurve.pedersen(this.address, deploySalt) : deploySalt,
          classHash,
          compiledConstructorCallData,
          unique ? UDC.ADDRESS : 0
        ),
      };
    });

    const calls = params.map((it) => it.call);
    const addresses = params.map((it) => it.address);
    const invokeResponse = await this.execute(calls, undefined, details);

    return {
      ...invokeResponse,
      contract_address: addresses,
    };
  }

  public async deployContract(
    payload: UniversalDeployerContractPayload | UniversalDeployerContractPayload[],
    details?: InvocationsDetails | undefined
  ): Promise<DeployContractUDCResponse> {
    const deployTx = await this.deploy(payload, details);
    const txReceipt = await this.waitForTransaction(deployTx.transaction_hash);
    return parseUDCEvent(txReceipt as DeployTransactionReceiptResponse);
  }

  public async declareAndDeploy(
    payload: DeclareAndDeployContractPayload,
    details?: InvocationsDetails | undefined
  ): Promise<DeclareDeployUDCResponse> {
    const { constructorCalldata, salt, unique } = payload;
    let declare = await this.declareIfNot(payload, details);
    if (declare.transaction_hash !== '') {
      const tx = await this.waitForTransaction(declare.transaction_hash);
      declare = { ...declare, ...tx };
    }
    const deploy = await this.deployContract(
      { classHash: declare.class_hash, salt, unique, constructorCalldata },
      details
    );
    return { declare: { ...declare }, deploy };
  }

  public deploySelf = this.deployAccount;

  public async deployAccount(
    {
      classHash,
      constructorCalldata = [],
      addressSalt = 0,
      contractAddress: providedContractAddress,
    }: DeployAccountContractPayload,
    transactionsDetail: InvocationsDetails = {}
  ): Promise<DeployContractResponse> {
    const version = toBigInt(transactionVersion);
    const nonce = ZERO; // DEPLOY_ACCOUNT transaction will have a nonce zero as it is the first transaction in the account
    const chainId = await this.getChainId();

    const compiledCalldata = CallData.compile(constructorCalldata);
    const contractAddress =
      providedContractAddress ??
      calculateContractAddressFromHash(addressSalt, classHash, compiledCalldata, 0);

    const maxFee =
      transactionsDetail.maxFee ??
      (await this.getSuggestedMaxFee(
        {
          type: TransactionType.DEPLOY_ACCOUNT,
          payload: {
            classHash,
            constructorCalldata: compiledCalldata,
            addressSalt,
            contractAddress,
          },
        },
        transactionsDetail
      ));

    const signature = await this.signer.signDeployAccountTransaction({
      classHash,
      constructorCalldata: compiledCalldata,
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
        calldata: CallData.compile({
          hash: toBigInt(hash).toString(),
          signature: formatSignature(signature),
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
      case TransactionType.INVOKE:
        feeEstimate = await this.estimateInvokeFee(payload, details);
        break;

      case TransactionType.DECLARE:
        feeEstimate = await this.estimateDeclareFee(payload, details);
        break;

      case TransactionType.DEPLOY_ACCOUNT:
        feeEstimate = await this.estimateAccountDeployFee(payload, details);
        break;

      case TransactionType.DEPLOY:
        feeEstimate = await this.estimateDeployFee(payload, details);
        break;

      default:
        feeEstimate = { suggestedMaxFee: ZERO, overall_fee: ZERO };
        break;
    }

    return feeEstimate.suggestedMaxFee;
  }

  /**
   * will be renamed to buildDeclareContractTransaction
   */
  public async buildDeclarePayload(
    payload: DeclareContractPayload,
    { nonce, chainId, version, walletAddress, maxFee }: InvocationsSignerDetails
  ): Promise<DeclareContractTransaction> {
    const { classHash, contract, compiledClassHash } = extractContractHashes(payload);
    const compressedCompiledContract = parseContract(contract);
    const signature = await this.signer.signDeclareTransaction({
      classHash,
      compiledClassHash,
      senderAddress: walletAddress,
      chainId,
      maxFee,
      version,
      nonce,
    });

    return {
      senderAddress: walletAddress,
      signature,
      contract: compressedCompiledContract,
      compiledClassHash,
    };
  }

  public async buildAccountDeployPayload(
    {
      classHash,
      addressSalt = 0,
      constructorCalldata = [],
      contractAddress: providedContractAddress,
    }: DeployAccountContractPayload,
    { nonce, chainId, version, maxFee }: InvocationsSignerDetails
  ): Promise<DeployAccountContractTransaction> {
    const compiledCalldata = CallData.compile(constructorCalldata);
    const contractAddress =
      providedContractAddress ??
      calculateContractAddressFromHash(addressSalt, classHash, compiledCalldata, 0);

    const signature = await this.signer.signDeployAccountTransaction({
      classHash,
      contractAddress,
      chainId,
      maxFee,
      version,
      nonce,
      addressSalt,
      constructorCalldata: compiledCalldata,
    });

    return {
      classHash,
      addressSalt,
      constructorCalldata: compiledCalldata,
      signature,
    };
  }

  public buildUDCContractPayload(
    payload: UniversalDeployerContractPayload | UniversalDeployerContractPayload[]
  ): Call[] {
    const calls = [].concat(payload as []).map((it) => {
      const {
        classHash,
        salt = '0',
        unique = true,
        constructorCalldata = [],
      } = it as UniversalDeployerContractPayload;
      const compiledConstructorCallData = CallData.compile(constructorCalldata);

      return {
        contractAddress: UDC.ADDRESS,
        entrypoint: UDC.ENTRYPOINT,
        calldata: [
          classHash,
          salt,
          toCairoBool(unique),
          compiledConstructorCallData.length,
          ...compiledConstructorCallData,
        ],
      };
    });
    return calls;
  }

  public async simulateTransaction(
    invocations: Invocations,
    { nonce, blockIdentifier, skipValidate, skipExecute }: SimulateTransactionDetails = {}
  ): Promise<SimulateTransactionResponse> {
    const accountInvocations = await this.accountInvocationsFactory(invocations, {
      versions: [transactionVersion, transactionVersion_2],
      nonce,
      blockIdentifier,
    });

    return super.getSimulateTransaction(accountInvocations, {
      blockIdentifier,
      skipValidate,
      skipExecute,
    });
  }

  public async accountInvocationsFactory(
    invocations: Invocations,
    { versions, nonce, blockIdentifier }: AccountInvocationsFactoryDetails
  ) {
    const version = versions[0];
    const safeNonce = await this.getNonceSafe(nonce);
    const chainId = await this.getChainId();

    // BULK ACTION FROM NEW ACCOUNT START WITH DEPLOY_ACCOUNT
    const tx0Payload: any = 'payload' in invocations[0] ? invocations[0].payload : invocations[0];
    const cairoVersion =
      invocations[0].type === TransactionType.DEPLOY_ACCOUNT
        ? await this.getCairoVersion(tx0Payload.classHash)
        : await this.getCairoVersion();

    return Promise.all(
      ([] as Invocations).concat(invocations).map(async (transaction, index: number) => {
        const txPayload: any = 'payload' in transaction ? transaction.payload : transaction;
        const signerDetails: InvocationsSignerDetails = {
          walletAddress: this.address,
          nonce: toBigInt(Number(safeNonce) + index),
          maxFee: ZERO,
          version,
          chainId,
          cairoVersion,
        };
        const common = {
          type: transaction.type,
          version,
          nonce: toBigInt(Number(safeNonce) + index),
          blockIdentifier,
        };

        if (transaction.type === TransactionType.INVOKE) {
          const payload = await this.buildInvocation(
            ([] as Call[]).concat(txPayload),
            signerDetails
          );
          return {
            ...common,
            ...payload,
          } as AccountInvocationItem;
        }
        if (transaction.type === TransactionType.DECLARE) {
          signerDetails.version = !isSierra(txPayload.contract)
            ? toBigInt(versions[0])
            : toBigInt(versions[1]);
          const payload = await this.buildDeclarePayload(txPayload, signerDetails);
          return {
            ...common,
            ...payload,
            version: signerDetails.version,
          } as AccountInvocationItem;
        }
        if (transaction.type === TransactionType.DEPLOY_ACCOUNT) {
          const payload = await this.buildAccountDeployPayload(txPayload, signerDetails);
          return {
            ...common,
            ...payload,
          } as AccountInvocationItem;
        }
        if (transaction.type === TransactionType.DEPLOY) {
          const calls = this.buildUDCContractPayload(txPayload);
          const payload = await this.buildInvocation(calls, signerDetails);
          return {
            ...common,
            ...payload,
            type: TransactionType.INVOKE,
          } as AccountInvocationItem;
        }
        throw Error(`accountInvocationsFactory: unsupported transaction type: ${transaction}`);
      })
    ) as Promise<AccountInvocations>;
  }

  public override async getStarkName(
    address: BigNumberish = this.address, // default to the wallet address
    StarknetIdContract?: string
  ): Promise<string> {
    return super.getStarkName(address, StarknetIdContract);
  }
}
