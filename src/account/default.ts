import { config } from '../global/config';
import {
  OutsideExecutionCallerAny,
  SNIP9_V1_INTERFACE_ID,
  SNIP9_V2_INTERFACE_ID,
  SupportedTransactionVersion,
  SYSTEM_MESSAGES,
  UDC,
  ZERO,
} from '../global/constants';
import { logger } from '../global/logger';
import { LibraryError, Provider, ProviderInterface } from '../provider';
import { ETransactionVersion, ETransactionVersion3 } from '../provider/types/spec.type';
import { Signer, SignerInterface } from '../signer';
import {
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
  EstimateFeeBulk,
  Invocation,
  Invocations,
  InvocationsSignerDetails,
  InvokeFunctionResponse,
  MultiDeployContractResponse,
  Nonce,
  ProviderOptions,
  Signature,
  SimulateTransactionDetails,
  TypedData,
  UniversalDeployerContractPayload,
  UniversalDetails,
  PaymasterDetails,
  PreparedTransaction,
  PaymasterOptions,
  PaymasterFeeEstimate,
  EstimateFeeResponseOverhead,
  SimulateTransactionOverheadResponse,
} from '../types';
import {
  OutsideExecutionVersion,
  type OutsideExecution,
  type OutsideExecutionOptions,
  type OutsideTransaction,
  ExecutionParameters,
  UserTransaction,
  ExecutableUserTransaction,
} from '../types';
import { CallData } from '../utils/calldata';
import { extractContractHashes, isSierra } from '../utils/contract';
import { parseUDCEvent } from '../utils/events';
import { calculateContractAddressFromHash } from '../utils/hash';
import { isHex, toBigInt, toCairoBool, toHex } from '../utils/num';
import {
  buildExecuteFromOutsideCall,
  getOutsideCall,
  getTypedData,
} from '../utils/outsideExecution';
import { parseContract } from '../utils/provider';
import { supportsInterface } from '../utils/src5';
import {
  randomAddress,
  signatureToHexArray,
  toFeeVersion,
  toTransactionVersion,
  v3Details,
} from '../utils/stark';
import { buildUDCCall, getExecuteCalldata } from '../utils/transaction';
import { isString, isUndefined } from '../utils/typed';
import { getMessageHash } from '../utils/typedData';
import { AccountInterface } from './interface';
import { defaultPaymaster, PaymasterInterface, PaymasterRpc } from '../paymaster';
import { assertPaymasterTransactionSafety } from '../utils/paymaster';
import assert from '../utils/assert';
import { ETransactionType } from '../types/api';

export class Account extends Provider implements AccountInterface {
  public signer: SignerInterface;

  public address: string;

  public cairoVersion: CairoVersion;

  readonly transactionVersion: typeof ETransactionVersion.V3;

  public paymaster: PaymasterInterface;

  constructor(
    providerOrOptions: ProviderOptions | ProviderInterface,
    address: string,
    pkOrSigner: Uint8Array | string | SignerInterface,
    cairoVersion?: CairoVersion,
    transactionVersion: SupportedTransactionVersion = config.get('transactionVersion'),
    paymaster?: PaymasterOptions | PaymasterInterface
  ) {
    super(providerOrOptions);
    this.address = address.toLowerCase();
    this.signer =
      isString(pkOrSigner) || pkOrSigner instanceof Uint8Array
        ? new Signer(pkOrSigner)
        : pkOrSigner;

    if (cairoVersion) {
      this.cairoVersion = cairoVersion.toString() as CairoVersion;
    }
    this.transactionVersion = transactionVersion;
    this.paymaster = paymaster ? new PaymasterRpc(paymaster) : defaultPaymaster;

    logger.debug('Account setup', {
      transactionVersion: this.transactionVersion,
      cairoVersion: this.cairoVersion,
      channel: this.channel.id,
    });
  }

  /** @deprecated @hidden */
  // The deprecation tag is meant to discourage use, not to signal future removal
  // it should only be removed if the relationship with the corresponding Provider.create(...) method changes
  static async create(): Promise<never> {
    throw new LibraryError('Not supported');
  }

  public async getNonce(blockIdentifier?: BlockIdentifier): Promise<Nonce> {
    return super.getNonceForAddress(this.address, blockIdentifier);
  }

  protected async getNonceSafe(nonce?: BigNumberish) {
    // Patch DEPLOY_ACCOUNT: RPC getNonce for non-existing address will result in error
    try {
      return toBigInt(nonce ?? (await this.getNonce()));
    } catch (error) {
      return 0n;
    }
  }

  /**
   * Retrieves the Cairo version from the network and sets `cairoVersion` if not already set in the constructor.
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
  } // TODO: TT Cairo version is not necessary as only CAIRO1 is supported

  public async estimateInvokeFee(
    calls: AllowArray<Call>,
    details: UniversalDetails = {}
  ): Promise<EstimateFeeResponseOverhead> {
    const transactions = Array.isArray(calls) ? calls : [calls];

    // Transform all calls into a single invocation
    const invocations = [
      {
        type: ETransactionType.INVOKE,
        payload: transactions,
      },
    ];
    const estimateBulk = await this.estimateFeeBulk(invocations, details);
    return estimateBulk[0]; // Get the first (and only) estimate
  }

  public async estimateDeclareFee(
    payload: DeclareContractPayload,
    details: UniversalDetails = {}
  ): Promise<EstimateFeeResponseOverhead> {
    assert(
      isSierra(payload.contract),
      'Declare fee estimation is not supported for Cairo0 contracts'
    );

    const declareContractPayload = extractContractHashes(payload);

    // Transform into invocations for bulk estimation
    const invocations = [
      {
        type: ETransactionType.DECLARE,
        payload: declareContractPayload,
      },
    ];
    const estimateBulk = await this.estimateFeeBulk(invocations, details);
    return estimateBulk[0]; // Get the first (and only) estimate
  }

  public async estimateAccountDeployFee(
    {
      classHash,
      addressSalt = 0,
      constructorCalldata = [],
      contractAddress,
    }: DeployAccountContractPayload,
    details: UniversalDetails = {}
  ): Promise<EstimateFeeResponseOverhead> {
    // TODO: TT optional safty check that classHash is from Cairo1 contract and not Cairo0
    const compiledCalldata = CallData.compile(constructorCalldata);
    const contractAddressFinal =
      contractAddress ??
      calculateContractAddressFromHash(addressSalt, classHash, compiledCalldata, 0);

    // Transform into invocations for bulk estimation
    const invocations = [
      {
        type: ETransactionType.DEPLOY_ACCOUNT,
        payload: {
          classHash,
          constructorCalldata: compiledCalldata,
          addressSalt,
          contractAddress: contractAddressFinal,
        },
      },
    ];
    const estimateBulk = await this.estimateFeeBulk(invocations, details);
    return estimateBulk[0]; // Get the first (and only) estimate
  }

  public async estimateDeployFee(
    payload: UniversalDeployerContractPayload | UniversalDeployerContractPayload[],
    details: UniversalDetails = {}
  ): Promise<EstimateFeeResponseOverhead> {
    // TODO: TT optional safty check that classHash is from Cairo1 contract and not Cairo0
    const calls = this.buildUDCContractPayload(payload);
    return this.estimateInvokeFee(calls, details);
  }

  public async estimateFeeBulk(
    invocations: Invocations,
    details: UniversalDetails = {}
  ): Promise<EstimateFeeBulk> {
    if (!invocations.length) throw TypeError('Invocations should be non-empty array');
    // skip estimating bounds if user provide bounds
    if (details.resourceBounds)
      return [
        {
          resourceBounds: details.resourceBounds,
          overall_fee: 0n,
          unit: 'FRI',
        },
      ];

    const { nonce, blockIdentifier, version: providedVersion, skipValidate } = details;
    const accountInvocations = await this.accountInvocationsFactory(invocations, {
      ...v3Details(details),
      versions: [
        toTransactionVersion(
          toFeeVersion(this.transactionVersion) || ETransactionVersion3.F3,
          providedVersion
        ), // sierra
      ],
      nonce,
      blockIdentifier,
      skipValidate,
    });

    return super.getEstimateFeeBulk(accountInvocations, {
      blockIdentifier,
      skipValidate,
    });
  }

  public async simulateTransaction(
    invocations: Invocations,
    details: SimulateTransactionDetails = {}
  ): Promise<SimulateTransactionOverheadResponse> {
    if (!invocations.length) throw TypeError('Invocations should be non-empty array');
    const {
      nonce,
      blockIdentifier,
      skipValidate = true,
      skipExecute,
      version: providedVersion,
    } = details;
    const accountInvocations = await this.accountInvocationsFactory(invocations, {
      ...v3Details(details),
      versions: [
        toTransactionVersion(this.transactionVersion || ETransactionVersion3.V3, providedVersion),
      ],
      nonce,
      blockIdentifier,
      skipValidate,
    });

    return super.getSimulateTransaction(accountInvocations, {
      blockIdentifier,
      skipValidate,
      skipExecute,
    });
  }

  public async execute(
    transactions: AllowArray<Call>,
    transactionsDetail: UniversalDetails = {}
  ): Promise<InvokeFunctionResponse> {
    const calls = Array.isArray(transactions) ? transactions : [transactions];
    const nonce = toBigInt(transactionsDetail.nonce ?? (await this.getNonce()));
    const version = toTransactionVersion(
      this.transactionVersion || ETransactionVersion3.V3,
      transactionsDetail.version
    );

    // Transform all calls into a single invocation
    const invocations = [
      {
        type: ETransactionType.INVOKE,
        payload: calls, // Pass all calls as the payload
      },
    ];
    const estimateBulk = await this.estimateFeeBulk(invocations, transactionsDetail);
    const estimate = estimateBulk[0]; // Get the first (and only) estimate

    const chainId = await this.getChainId();

    const signerDetails: InvocationsSignerDetails = {
      ...v3Details(transactionsDetail),
      resourceBounds: estimate.resourceBounds,
      walletAddress: this.address,
      nonce,
      version,
      chainId,
      cairoVersion: await this.getCairoVersion(),
    };

    const signature = await this.signer.signTransaction(calls, signerDetails);

    const calldata = getExecuteCalldata(calls, await this.getCairoVersion());

    return this.invokeFunction(
      { contractAddress: this.address, calldata, signature },
      {
        ...v3Details(transactionsDetail),
        resourceBounds: estimate.resourceBounds,
        nonce,
        version,
      }
    );
  }

  public async buildPaymasterTransaction(
    calls: Call[],
    paymasterDetails: PaymasterDetails
  ): Promise<PreparedTransaction> {
    // If the account isn't deployed, we can't call the supportsInterface function to know if the account is compatible with SNIP-9
    if (!paymasterDetails.deploymentData) {
      const snip9Version = await this.getSnip9Version();
      if (snip9Version === OutsideExecutionVersion.UNSUPPORTED) {
        throw Error('Account is not compatible with SNIP-9');
      }
    }
    const parameters: ExecutionParameters = {
      version: '0x1',
      feeMode: paymasterDetails.feeMode,
      timeBounds: paymasterDetails.timeBounds,
    };
    let transaction: UserTransaction;
    if (paymasterDetails.deploymentData) {
      if (calls.length > 0) {
        transaction = {
          type: 'deploy_and_invoke',
          invoke: { userAddress: this.address, calls },
          deployment: paymasterDetails.deploymentData,
        };
      } else {
        transaction = {
          type: 'deploy',
          deployment: paymasterDetails.deploymentData,
        };
      }
    } else {
      transaction = {
        type: 'invoke',
        invoke: { userAddress: this.address, calls },
      };
    }
    return this.paymaster.buildTransaction(transaction, parameters);
  }

  public async estimatePaymasterTransactionFee(
    calls: Call[],
    paymasterDetails: PaymasterDetails
  ): Promise<PaymasterFeeEstimate> {
    const preparedTransaction = await this.buildPaymasterTransaction(calls, paymasterDetails);
    return preparedTransaction.fee;
  }

  public async preparePaymasterTransaction(
    preparedTransaction: PreparedTransaction
  ): Promise<ExecutableUserTransaction> {
    let transaction: ExecutableUserTransaction;
    switch (preparedTransaction.type) {
      case 'deploy_and_invoke': {
        const signature = await this.signMessage(preparedTransaction.typed_data);
        transaction = {
          type: 'deploy_and_invoke',
          invoke: {
            userAddress: this.address,
            typedData: preparedTransaction.typed_data,
            signature: signatureToHexArray(signature),
          },
          deployment: preparedTransaction.deployment,
        };
        break;
      }
      case 'invoke': {
        const signature = await this.signMessage(preparedTransaction.typed_data);
        transaction = {
          type: 'invoke',
          invoke: {
            userAddress: this.address,
            typedData: preparedTransaction.typed_data,
            signature: signatureToHexArray(signature),
          },
        };
        break;
      }
      case 'deploy': {
        transaction = {
          type: 'deploy',
          deployment: preparedTransaction.deployment,
        };
        break;
      }
      default:
        throw Error('Invalid transaction type');
    }
    return transaction;
  }

  public async executePaymasterTransaction(
    calls: Call[],
    paymasterDetails: PaymasterDetails,
    maxFeeInGasToken?: BigNumberish
  ): Promise<InvokeFunctionResponse> {
    // Build the transaction
    const preparedTransaction = await this.buildPaymasterTransaction(calls, paymasterDetails);

    // Check the transaction is safe
    // Check gas fee value & gas token address
    // Check that provided calls and builded calls are strictly equal
    assertPaymasterTransactionSafety(
      preparedTransaction,
      calls,
      paymasterDetails,
      maxFeeInGasToken
    );

    // Prepare the transaction, tx is safe here
    const transaction: ExecutableUserTransaction =
      await this.preparePaymasterTransaction(preparedTransaction);

    // Execute the transaction
    return this.paymaster
      .executeTransaction(transaction, preparedTransaction.parameters)
      .then((response) => ({ transaction_hash: response.transaction_hash }));
  }

  /**
   * First check if contract is already declared, if not declare it
   * If contract already declared returned transaction_hash is ''.
   * Method will pass even if contract is already declared
   * @param transactionsDetail (optional)
   */
  public async declareIfNot(
    payload: DeclareContractPayload,
    transactionsDetail: UniversalDetails = {}
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
    details: UniversalDetails = {}
  ): Promise<DeclareContractResponse> {
    assert(isSierra(payload.contract), SYSTEM_MESSAGES.declareNonSierra);

    const declareContractPayload = extractContractHashes(payload);
    const { nonce, version: providedVersion } = details;
    const version = toTransactionVersion(
      this.transactionVersion || ETransactionVersion3.V3,
      providedVersion
    );

    // Transform into invocations for bulk estimation
    const invocations = [
      {
        type: ETransactionType.DECLARE,
        payload: declareContractPayload,
      },
    ];
    const estimateBulk = await this.estimateFeeBulk(invocations, {
      ...details,
      version,
    });
    const estimate = estimateBulk[0]; // Get the first (and only) estimate

    const declareDetails: InvocationsSignerDetails = {
      ...v3Details(details),
      resourceBounds: estimate.resourceBounds,
      nonce: toBigInt(nonce ?? (await this.getNonce())),
      version,
      chainId: await this.getChainId(),
      walletAddress: this.address,
      cairoVersion: undefined,
    };

    const declareContractTransaction = await this.buildDeclarePayload(
      declareContractPayload,
      declareDetails
    );

    return super.declareContract(declareContractTransaction, declareDetails);
  }

  public async deploy(
    payload: UniversalDeployerContractPayload | UniversalDeployerContractPayload[],
    details: UniversalDetails = {}
  ): Promise<MultiDeployContractResponse> {
    const { calls, addresses } = buildUDCCall(payload, this.address);
    const invokeResponse = await this.execute(calls, details);

    return {
      ...invokeResponse,
      contract_address: addresses,
    };
  }

  public async deployContract(
    payload: UniversalDeployerContractPayload | UniversalDeployerContractPayload[],
    details: UniversalDetails = {}
  ): Promise<DeployContractUDCResponse> {
    const deployTx = await this.deploy(payload, details);
    const txReceipt = await this.waitForTransaction(deployTx.transaction_hash);
    return parseUDCEvent(txReceipt as unknown as DeployTransactionReceiptResponse);
  }

  public async declareAndDeploy(
    payload: DeclareAndDeployContractPayload,
    details: UniversalDetails = {}
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
    details: UniversalDetails = {}
  ): Promise<DeployContractResponse> {
    const version = toTransactionVersion(
      this.transactionVersion || ETransactionVersion3.V3,
      details.version
    );
    const nonce = ZERO; // DEPLOY_ACCOUNT transaction will have a nonce zero as it is the first transaction in the account
    const chainId = await this.getChainId();

    const compiledCalldata = CallData.compile(constructorCalldata); // TODO: TT check if we should add abi here to safe compile
    const contractAddress =
      providedContractAddress ??
      calculateContractAddressFromHash(addressSalt, classHash, compiledCalldata, 0);

    // Transform into invocations for bulk estimation
    const invocations = [
      {
        type: ETransactionType.DEPLOY_ACCOUNT,
        payload: {
          classHash,
          constructorCalldata: compiledCalldata,
          addressSalt,
          contractAddress,
        },
      },
    ];
    const estimateBulk = await this.estimateFeeBulk(invocations, details);
    const estimate = estimateBulk[0]; // Get the first (and only) estimate

    const signature = await this.signer.signDeployAccountTransaction({
      ...v3Details(details),
      classHash,
      constructorCalldata: compiledCalldata,
      contractAddress,
      addressSalt,
      chainId,
      resourceBounds: estimate.resourceBounds,
      version,
      nonce,
    });

    return super.deployAccountContract(
      { classHash, addressSalt, constructorCalldata, signature },
      {
        ...v3Details(details),
        nonce,
        resourceBounds: estimate.resourceBounds,
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

  /**
   * Verify if an account is compatible with SNIP-9 outside execution, and with which version of this standard.
   * @returns {OutsideExecutionVersion} Not compatible, V1, V2.
   * @example
   * ```typescript
   * const result = myAccount.getSnip9Version();
   * // result = "V1"
   * ```
   */
  public async getSnip9Version(): Promise<OutsideExecutionVersion> {
    if (await supportsInterface(this, this.address, SNIP9_V2_INTERFACE_ID)) {
      return OutsideExecutionVersion.V2;
    }
    if (await supportsInterface(this, this.address, SNIP9_V1_INTERFACE_ID)) {
      return OutsideExecutionVersion.V1;
    }
    // Account does not support either version 2 or version 1
    return OutsideExecutionVersion.UNSUPPORTED;
  }

  /**
   * Verify if a SNIP-9 nonce has not yet been used by the account.
   * @param {BigNumberish} nonce SNIP-9 nonce to test.
   * @returns  {boolean} true if SNIP-9 nonce not yet used.
   * @example
   * ```typescript
   * const result = myAccount.isValidSnip9Nonce(1234);
   * // result = true
   * ```
   */
  public async isValidSnip9Nonce(nonce: BigNumberish): Promise<boolean> {
    try {
      const call: Call = {
        contractAddress: this.address,
        entrypoint: 'is_valid_outside_execution_nonce',
        calldata: [toHex(nonce)],
      };
      const resp = await this.callContract(call);
      return BigInt(resp[0]) !== 0n;
    } catch (error) {
      throw new Error(`Failed to check if nonce is valid: ${error}`);
    }
  }

  /**
   * Outside transaction needs a specific SNIP-9 nonce, that we get in this function.
   * A SNIP-9 nonce can be any number not yet used ; no ordering is needed.
   * @returns  {string} an Hex string of a SNIP-9 nonce.
   * @example
   * ```typescript
   * const result = myAccount.getSnip9Nonce();
   * // result = "0x28a612590dbc36927933c8ee0f357eee639c8b22b3d3aa86949eed3ada4ac55"
   * ```
   */
  public async getSnip9Nonce(): Promise<string> {
    const nonce = randomAddress();
    const isValidNonce = await this.isValidSnip9Nonce(nonce);
    if (!isValidNonce) {
      return this.getSnip9Nonce();
    }
    return nonce;
  }

  /**
   * Creates an object containing transaction(s) that can be executed by an other account with` Account.executeFromOutside()`, called Outside Transaction.
   * @param {OutsideExecutionOptions} options Parameters of the transaction(s).
   * @param {AllowArray<Call>} calls Transaction(s) to execute.
   * @param {OutsideExecutionVersion} [version] SNIP-9 version of the Account that creates the outside transaction.
   * @param {BigNumberish} [nonce] Outside Nonce.
   * @returns {OutsideTransaction} and object that can be used in `Account.executeFromOutside()`
   * @example
   * ```typescript
   * const now_seconds = Math.floor(Date.now() / 1000);
   * const callOptions: OutsideExecutionOptions = {
      caller: executorAccount.address, execute_after: now_seconds - 3600, execute_before: now_seconds + 3600 };
   * const call1: Call = { contractAddress: ethAddress, entrypoint: 'transfer', calldata: {
   *     recipient: recipientAccount.address, amount: cairo.uint256(100) } };
   * const outsideTransaction1: OutsideTransaction = await signerAccount.getOutsideTransaction(callOptions, call3);
   * // result = {
   * // outsideExecution: {
   * // caller: '0x64b48806902a367c8598f4f95c305e8c1a1acba5f082d294a43793113115691',
   * // nonce: '0x28a612590dbc36927933c8ee0f357eee639c8b22b3d3aa86949eed3ada4ac55',
   * // execute_after: 1723650229, execute_before: 1723704229, calls: [[Object]] },
   * // signature: Signature {
   * // r: 67518627037915514985321278857825384106482999609634873287406612756843916814n,
   * // s: 737198738569840639192844101690009498983611654458636624293579534560862067709n, recovery: 0 },
   * // signerAddress: '0x655f8fd7c4013c07cf12a92184aa6c314d181443913e21f7e209a18f0c78492',
   * // version: '2'
   * // }
   * ```
   */
  public async getOutsideTransaction(
    options: OutsideExecutionOptions,
    calls: AllowArray<Call>,
    version?: OutsideExecutionVersion,
    nonce?: BigNumberish
  ): Promise<OutsideTransaction> {
    if (!isHex(options.caller) && options.caller !== 'ANY_CALLER') {
      throw new Error(`The caller ${options.caller} is not valid.`);
    }
    const codedCaller: string = isHex(options.caller) ? options.caller : OutsideExecutionCallerAny;
    const myCalls: Call[] = Array.isArray(calls) ? calls : [calls];
    const supportedVersion = version ?? (await this.getSnip9Version());
    if (!supportedVersion) {
      throw new Error('This account is not handling outside transactions.');
    }
    const myNonce = nonce ? toHex(nonce) : await this.getSnip9Nonce();
    const message = getTypedData(
      await this.getChainId(),
      {
        caller: codedCaller,
        execute_after: options.execute_after,
        execute_before: options.execute_before,
      },
      myNonce,
      myCalls,
      supportedVersion
    );
    const sign: Signature = await this.signMessage(message);
    const toExecute: OutsideExecution = {
      caller: codedCaller,
      nonce: myNonce,
      execute_after: options.execute_after,
      execute_before: options.execute_before,
      calls: myCalls.map(getOutsideCall),
    };
    return {
      outsideExecution: toExecute,
      signature: sign,
      signerAddress: this.address,
      version: supportedVersion,
    };
  }

  /**
   * An account B executes a transaction that has been signed by an account A.
   * Fees are paid by B.
   * @param {AllowArray<OutsideTransaction>} outsideTransaction the signed transaction generated by `Account.getOutsideTransaction()`.
   * @param {UniversalDetails} [opts] same options than `Account.execute()`.
   * @returns {InvokeFunctionResponse} same response than `Account.execute()`.
   * @example
   * ```typescript
   * const outsideTransaction1: OutsideTransaction = await signerAccount.getOutsideTransaction(callOptions, call1);
   * const outsideTransaction2: OutsideTransaction = await signerAccount.getOutsideTransaction(callOptions4, call4);
   * const result = await myAccount.executeFromOutside([
      outsideTransaction1,
      outsideTransaction2,
    ]);
   * // result = { transaction_hash: '0x11233...`}
   * ```
   */
  public async executeFromOutside(
    outsideTransaction: AllowArray<OutsideTransaction>,
    opts?: UniversalDetails
  ): Promise<InvokeFunctionResponse> {
    const multiCall = buildExecuteFromOutsideCall(outsideTransaction);
    return this.execute(multiCall, opts);
  }

  /*
   * Support methods
   */

  public async buildInvocation(
    call: Array<Call>,
    details: InvocationsSignerDetails
  ): Promise<Invocation> {
    const calldata = getExecuteCalldata(call, await this.getCairoVersion());
    const signature = !details.skipValidate ? await this.signer.signTransaction(call, details) : [];

    return {
      ...v3Details(details),
      contractAddress: this.address,
      calldata,
      signature,
    };
  }

  public async buildDeclarePayload(
    payload: DeclareContractPayload,
    details: InvocationsSignerDetails
  ): Promise<DeclareContractTransaction> {
    const { classHash, contract, compiledClassHash } = extractContractHashes(payload);
    const compressedCompiledContract = parseContract(contract);

    assert(
      !isUndefined(compiledClassHash) &&
        (details.version === ETransactionVersion3.F3 ||
          details.version === ETransactionVersion3.V3),
      'V3 Transaction work with Cairo1 Contracts and require compiledClassHash'
    );

    const signature = !details.skipValidate
      ? await this.signer.signDeclareTransaction({
          ...details,
          ...v3Details(details),
          classHash,
          compiledClassHash: compiledClassHash as string, // TODO: TS, cast because optional for v2 and required for v3, thrown if not present
          senderAddress: details.walletAddress,
        })
      : [];

    return {
      senderAddress: details.walletAddress,
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
    details: InvocationsSignerDetails
  ): Promise<DeployAccountContractTransaction> {
    const compiledCalldata = CallData.compile(constructorCalldata);
    const contractAddress =
      providedContractAddress ??
      calculateContractAddressFromHash(addressSalt, classHash, compiledCalldata, 0);

    const signature = !details.skipValidate
      ? await this.signer.signDeployAccountTransaction({
          ...details,
          ...v3Details(details),
          classHash,
          contractAddress,
          addressSalt,
          constructorCalldata: compiledCalldata,
        })
      : [];

    return {
      ...v3Details(details),
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

  public async accountInvocationsFactory(
    invocations: Invocations,
    details: AccountInvocationsFactoryDetails
  ) {
    const { nonce, blockIdentifier, skipValidate = true } = details;
    const safeNonce = await this.getNonceSafe(nonce);
    const chainId = await this.getChainId();
    const versions = details.versions.map((it) => toTransactionVersion(it));

    // BULK ACTION FROM NEW ACCOUNT START WITH DEPLOY_ACCOUNT
    const tx0Payload: any = 'payload' in invocations[0] ? invocations[0].payload : invocations[0];
    const cairoVersion =
      invocations[0].type === ETransactionType.DEPLOY_ACCOUNT
        ? await this.getCairoVersion(tx0Payload.classHash)
        : await this.getCairoVersion();

    return Promise.all(
      ([] as Invocations).concat(invocations).map(async (transaction, index: number) => {
        const txPayload: any = 'payload' in transaction ? transaction.payload : transaction;
        const signerDetails = {
          ...v3Details(details),
          walletAddress: this.address,
          nonce: toBigInt(Number(safeNonce) + index),
          chainId,
          cairoVersion,
          version: versions[0],
          skipValidate,
        };
        const common = {
          type: transaction.type,
          nonce: toBigInt(Number(safeNonce) + index),
          blockIdentifier,
          version: versions[0],
        };

        if (transaction.type === ETransactionType.INVOKE) {
          const payload = await this.buildInvocation(
            ([] as Call[]).concat(txPayload),
            signerDetails
          );
          return {
            ...common,
            ...payload,
            ...signerDetails,
          };
        }
        if (transaction.type === ETransactionType.DEPLOY) {
          const calls = this.buildUDCContractPayload(txPayload);
          const payload = await this.buildInvocation(calls, signerDetails);
          return {
            ...common,
            ...payload,
            ...signerDetails,
            type: ETransactionType.INVOKE,
          };
        }
        if (transaction.type === ETransactionType.DECLARE) {
          assert(
            isSierra(txPayload.contract),
            'Declare fee estimation is not supported for Cairo0 contracts'
          );
          const payload = await this.buildDeclarePayload(txPayload, signerDetails);
          return {
            ...common,
            ...payload,
            ...signerDetails,
          };
        }
        if (transaction.type === ETransactionType.DEPLOY_ACCOUNT) {
          const payload = await this.buildAccountDeployPayload(txPayload, signerDetails);
          return {
            ...common,
            ...payload,
            ...signerDetails,
          };
        }
        throw Error(`accountInvocationsFactory: unsupported transaction type: ${transaction}`);
      })
    ) as Promise<AccountInvocations>;
  }

  public async getStarkName(
    address: BigNumberish = this.address, // default to the wallet address
    StarknetIdContract?: string
  ): Promise<string> {
    return super.getStarkName(address, StarknetIdContract);
  }
}
