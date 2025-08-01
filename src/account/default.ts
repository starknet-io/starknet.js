import { config } from '../global/config';
import {
  OutsideExecutionCallerAny,
  SNIP9_V1_INTERFACE_ID,
  SNIP9_V2_INTERFACE_ID,
  SYSTEM_MESSAGES,
  ZERO,
} from '../global/constants';
import { logger } from '../global/logger';
import { LibraryError, Provider } from '../provider';
import { BlockTag, ETransactionVersion, ETransactionVersion3 } from '../provider/types/spec.type';
import { Signer, type SignerInterface } from '../signer';
import {
  // Runtime values
  OutsideExecutionVersion,
} from '../types';
import type {
  AccountInvocations,
  AccountInvocationsFactoryDetails,
  AccountOptions,
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
  EstimateFeeResponseOverhead,
  EstimateFeeBulk,
  ExecutableUserTransaction,
  ExecutionParameters,
  Invocation,
  Invocations,
  InvocationsDetailsWithNonce,
  InvocationsSignerDetails,
  InvokeFunctionResponse,
  MultiDeployContractResponse,
  Nonce,
  OutsideExecution,
  OutsideExecutionOptions,
  OutsideTransaction,
  PaymasterDetails,
  PaymasterFeeEstimate,
  PreparedTransaction,
  Signature,
  SimulateTransactionDetails,
  SimulateTransactionOverheadResponse,
  TypedData,
  UniversalDeployerContractPayload,
  UniversalDetails,
  UserTransaction,
  waitForTransactionOptions,
  fastWaitForTransactionOptions,
  fastExecuteResponse,
} from '../types';
import { ETransactionType } from '../types/api';
import { CallData } from '../utils/calldata';
import { extractContractHashes, isSierra } from '../utils/contract';
import { calculateContractAddressFromHash } from '../utils/hash';
import { isHex, toBigInt, toHex } from '../utils/num';
import {
  buildExecuteFromOutsideCall,
  getOutsideCall,
  getTypedData,
} from '../utils/outsideExecution';
import { parseContract } from '../utils/provider';
import { supportsInterface } from '../utils/src5';
import {
  randomAddress,
  resourceBoundsToEstimateFee,
  signatureToHexArray,
  toFeeVersion,
  toTransactionVersion,
  v3Details,
} from '../utils/stark';
import { getExecuteCalldata } from '../utils/transaction/transaction';
import { isString, isUndefined } from '../utils/typed';
import { getMessageHash } from '../utils/typedData';
import { type AccountInterface } from './interface';
import { defaultPaymaster, type PaymasterInterface, PaymasterRpc } from '../paymaster';
import { assertPaymasterTransactionSafety } from '../utils/paymaster';
import assert from '../utils/assert';
import { defaultDeployer, Deployer } from '../deployer';
import type { TipType } from '../provider/modules/tip';
import { RPC09 } from '../channel';

export class Account extends Provider implements AccountInterface {
  public signer: SignerInterface;

  public address: string;

  public cairoVersion: CairoVersion;

  readonly transactionVersion: typeof ETransactionVersion.V3;

  public paymaster: PaymasterInterface;

  public deployer: Deployer;

  public defaultTipType: TipType;

  constructor(options: AccountOptions) {
    const {
      provider,
      address,
      signer,
      cairoVersion,
      transactionVersion,
      paymaster,
      defaultTipType,
    } = options;
    super(provider);
    this.address = address.toLowerCase();
    this.signer = isString(signer) || signer instanceof Uint8Array ? new Signer(signer) : signer;

    if (cairoVersion) {
      this.cairoVersion = cairoVersion.toString() as CairoVersion;
    }
    this.transactionVersion = transactionVersion ?? config.get('transactionVersion');
    this.paymaster = paymaster ? new PaymasterRpc(paymaster) : defaultPaymaster;
    this.deployer = options.deployer ?? defaultDeployer;
    this.defaultTipType = defaultTipType ?? config.get('defaultTipType');

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
  } // TODO: TT Cairo version is still needed for invoke on existing contracts

  public async estimateInvokeFee(
    calls: AllowArray<Call>,
    details: UniversalDetails = {}
  ): Promise<EstimateFeeResponseOverhead> {
    // Transform all calls into a single invocation
    const invocations = [{ type: ETransactionType.INVOKE, payload: [calls].flat() }];
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
    // Transform into invocations for bulk estimation
    const invocations = [
      { type: ETransactionType.DECLARE, payload: extractContractHashes(payload) },
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
    const { calls } = this.deployer.buildDeployerCall(payload, this.address);
    return this.estimateInvokeFee(calls, details);
  }

  public async estimateFeeBulk(
    invocations: Invocations,
    details: UniversalDetails = {}
  ): Promise<EstimateFeeBulk> {
    if (!invocations.length) throw TypeError('Invocations should be non-empty array');
    // skip estimating bounds if user provide bounds
    if (details.resourceBounds) return [resourceBoundsToEstimateFee(details.resourceBounds)];

    const { nonce, blockIdentifier, version, skipValidate } = details;
    const detailsWithTip = await this.resolveDetailsWithTip(details);
    const accountInvocations = await this.accountInvocationsFactory(invocations, {
      ...v3Details(detailsWithTip),
      versions: [
        toTransactionVersion(
          toFeeVersion(this.transactionVersion) || ETransactionVersion3.F3,
          version
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
    const detailsWithTip = await this.resolveDetailsWithTip(details);
    const accountInvocations = await this.accountInvocationsFactory(invocations, {
      ...v3Details(detailsWithTip),
      versions: [this.resolveTransactionVersion(providedVersion)],
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
    const calls = [transactions].flat();
    const detailsWithTip = await this.resolveDetailsWithTip(transactionsDetail);

    // Estimate resource bounds if not provided
    const { resourceBounds: providedResourceBounds } = transactionsDetail;
    let resourceBounds = providedResourceBounds;
    if (!resourceBounds) {
      const estimateResponse = await this.estimateInvokeFee(calls, detailsWithTip);
      resourceBounds = estimateResponse.resourceBounds;
    }

    const accountInvocations = await this.accountInvocationsFactory(
      [{ type: ETransactionType.INVOKE, payload: calls }],
      {
        ...v3Details(detailsWithTip),
        resourceBounds,
        versions: [this.resolveTransactionVersion(transactionsDetail.version)],
        nonce: transactionsDetail.nonce,
        skipValidate: false,
      }
    );

    const invocation = accountInvocations[0];

    return this.invokeFunction(
      {
        contractAddress: invocation.contractAddress,
        calldata: invocation.calldata,
        signature: invocation.signature,
      },
      {
        ...v3Details(detailsWithTip),
        resourceBounds: invocation.resourceBounds,
        nonce: invocation.nonce,
        version: invocation.version,
      }
    );
  }

  /**
   * Execute one or multiple calls through the account contract,
   * responding as soon as a new transaction is possible with the same account.
   * Useful for gaming usage.
   * - This method requires the provider to be initialized with `pre_confirmed` blockIdentifier option.
   * - Rpc 0.9 minimum.
   * - In a normal myAccount.execute() call, followed by myProvider.waitForTransaction(), you have an immediate access to the events and to the transaction report. Here, we are processing consecutive transactions faster, but events & transaction reports are not available immediately.
   * - As a consequence of the previous point, do not use contract/account deployment with this method.
   * @param {AllowArray<Call>} transactions - Single call or array of calls to execute
   * @param {UniversalDetails} [transactionsDetail] - Transaction execution options
   * @param {fastWaitForTransactionOptions} [waitDetail={retries: 50, retryInterval: 500}] - options to scan the network for the next possible transaction. `retries` is the number of times to retry, `retryInterval` is the time in ms between retries.
   * @returns {Promise<fastExecuteResponse>} Response containing the transaction result and status for the next transaction. If `isReady` is true, you can execute the next transaction. If false, timeout has been reached before the next transaction was possible.
   * @example
   * ```typescript
   * const myProvider = new RpcProvider({ nodeUrl: url, blockIdentifier: BlockTag.PRE_CONFIRMED });
   * const myAccount = new Account({ provider: myProvider, address: accountAddress0, signer: privateKey0 });
   * const resp = await myAccount.fastExecute(
   *     call, { tip: recommendedTip},
   *     { retries: 30, retryInterval: 500 });
   * // if resp.isReady is true, you can launch immediately a new tx.
   * ```
   */
  public async fastExecute(
    transactions: AllowArray<Call>,
    transactionsDetail: UniversalDetails = {},
    waitDetail: fastWaitForTransactionOptions = {}
  ): Promise<fastExecuteResponse> {
    assert(
      this.channel instanceof RPC09.RpcChannel,
      'Wrong Rpc version in Provider. At least Rpc v0.9 required.'
    );
    assert(
      this.channel.blockIdentifier === BlockTag.PRE_CONFIRMED,
      'Provider needs to be initialized with `pre_confirmed` blockIdentifier option.'
    );
    const initNonce = BigInt(
      transactionsDetail.nonce ??
        (await this.getNonceForAddress(this.address, BlockTag.PRE_CONFIRMED))
    );
    const details = { ...transactionsDetail, nonce: initNonce };
    const resultTx: InvokeFunctionResponse = await this.execute(transactions, details);
    const resultWait = await this.fastWaitForTransaction(
      resultTx.transaction_hash,
      this.address,
      initNonce,
      waitDetail
    );
    return { txResult: resultTx, isReady: resultWait } as fastExecuteResponse;
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
    const detailsWithTip = await this.resolveDetailsWithTip(details);

    // Estimate resource bounds if not provided
    const { resourceBounds: providedResourceBounds } = details;
    let resourceBounds = providedResourceBounds;
    if (!resourceBounds) {
      const estimateResponse = await this.estimateDeclareFee(payload, detailsWithTip);
      resourceBounds = estimateResponse.resourceBounds;
    }

    const accountInvocations = await this.accountInvocationsFactory(
      [{ type: ETransactionType.DECLARE, payload: declareContractPayload }],
      {
        ...v3Details(detailsWithTip),
        resourceBounds,
        versions: [this.resolveTransactionVersion(details.version)],
        nonce: details.nonce,
        skipValidate: false,
      }
    );

    const declaration = accountInvocations[0];

    return super.declareContract(
      {
        senderAddress: declaration.senderAddress,
        signature: declaration.signature,
        contract: declaration.contract,
        compiledClassHash: declaration.compiledClassHash,
      },
      {
        ...v3Details(detailsWithTip),
        nonce: declaration.nonce,
        resourceBounds: declaration.resourceBounds,
        version: declaration.version,
      }
    );
  }

  public async deploy(
    payload: UniversalDeployerContractPayload | UniversalDeployerContractPayload[],
    details: UniversalDetails = {}
  ): Promise<MultiDeployContractResponse> {
    const { calls, addresses } = this.deployer.buildDeployerCall(payload, this.address);
    const invokeResponse = await this.execute(calls, details);

    return {
      ...invokeResponse,
      contract_address: addresses,
    };
  }

  public async deployContract(
    payload: UniversalDeployerContractPayload | UniversalDeployerContractPayload[],
    details: UniversalDetails & waitForTransactionOptions = {}
  ): Promise<DeployContractUDCResponse> {
    const deployTx = await this.deploy(payload, details);
    const txReceipt = await this.waitForTransaction(deployTx.transaction_hash, details);
    return this.deployer.parseDeployerEvent(
      txReceipt as unknown as DeployTransactionReceiptResponse
    );
  }

  public async declareAndDeploy(
    payload: DeclareAndDeployContractPayload,
    details: UniversalDetails & waitForTransactionOptions = {}
  ): Promise<DeclareDeployUDCResponse> {
    let declare = await this.declareIfNot(payload, details);
    if (declare.transaction_hash !== '') {
      const tx = await this.waitForTransaction(declare.transaction_hash, details);
      declare = { ...declare, ...tx };
    }
    const deploy = await this.deployContract(
      { ...payload, classHash: declare.class_hash },
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
    const compiledCalldata = CallData.compile(constructorCalldata); // TODO: TT check if we should add abi here to safe compile
    const contractAddress =
      providedContractAddress ??
      calculateContractAddressFromHash(addressSalt, classHash, compiledCalldata, 0);

    const detailsWithTip = await this.resolveDetailsWithTip(details);

    // Estimate resource bounds if not provided
    const { resourceBounds: providedResourceBounds } = details;
    let resourceBounds = providedResourceBounds;
    if (!resourceBounds) {
      const estimateResponse = await this.estimateAccountDeployFee(
        {
          classHash,
          constructorCalldata,
          addressSalt,
          contractAddress,
        },
        detailsWithTip
      );
      resourceBounds = estimateResponse.resourceBounds;
    }

    const accountInvocations = await this.accountInvocationsFactory(
      [
        {
          type: ETransactionType.DEPLOY_ACCOUNT,
          payload: {
            classHash,
            constructorCalldata: compiledCalldata,
            addressSalt,
            contractAddress,
          },
        },
      ],
      {
        ...v3Details(detailsWithTip),
        resourceBounds,
        versions: [this.resolveTransactionVersion(details.version)],
        nonce: ZERO, // DEPLOY_ACCOUNT always uses nonce 0
        skipValidate: false,
      }
    );

    const deployment = accountInvocations[0];

    return super.deployAccountContract(
      {
        classHash: deployment.classHash,
        addressSalt: deployment.addressSalt,
        constructorCalldata: deployment.constructorCalldata,
        signature: deployment.signature,
      },
      {
        ...v3Details(detailsWithTip),
        nonce: deployment.nonce,
        resourceBounds: deployment.resourceBounds,
        version: deployment.version,
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
    const myCalls: Call[] = [calls].flat();
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

  /**
   * Helper method to resolve details with tip estimation
   * @private
   */
  private async resolveDetailsWithTip(
    details: UniversalDetails
  ): Promise<UniversalDetails & { tip: BigNumberish }> {
    return {
      ...details,
      tip: details.tip ?? (await this.getEstimateTip())[this.defaultTipType],
    };
  }

  /**
   * Helper method to resolve transaction version
   * @private
   */
  private resolveTransactionVersion(providedVersion?: BigNumberish) {
    return toTransactionVersion(
      this.transactionVersion || ETransactionVersion3.V3,
      providedVersion
    );
  }

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
          compiledClassHash,
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

  /**
   * Build account invocations with proper typing based on transaction type
   * @private
   */
  public async accountInvocationsFactory(
    invocations: [{ type: typeof ETransactionType.INVOKE; payload: AllowArray<Call> }],
    details: AccountInvocationsFactoryDetails
  ): Promise<
    [({ type: typeof ETransactionType.INVOKE } & Invocation) & InvocationsDetailsWithNonce]
  >;
  public async accountInvocationsFactory(
    invocations: [{ type: typeof ETransactionType.DECLARE; payload: DeclareContractPayload }],
    details: AccountInvocationsFactoryDetails
  ): Promise<
    [
      ({ type: typeof ETransactionType.DECLARE } & DeclareContractTransaction) &
        InvocationsDetailsWithNonce,
    ]
  >;
  public async accountInvocationsFactory(
    invocations: [
      { type: typeof ETransactionType.DEPLOY_ACCOUNT; payload: DeployAccountContractPayload },
    ],
    details: AccountInvocationsFactoryDetails
  ): Promise<
    [
      ({ type: typeof ETransactionType.DEPLOY_ACCOUNT } & DeployAccountContractTransaction) &
        InvocationsDetailsWithNonce,
    ]
  >;
  public async accountInvocationsFactory(
    invocations: Invocations,
    details: AccountInvocationsFactoryDetails
  ): Promise<AccountInvocations>;
  public async accountInvocationsFactory(
    invocations: Invocations,
    details: AccountInvocationsFactoryDetails
  ): Promise<AccountInvocations> {
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
          const { calls } = this.deployer.buildDeployerCall(txPayload, this.address);
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

  /*
   * SNIP-29 Paymaster
   */

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

  /*
   * External methods
   */

  /**
   * Get the Starknet ID for an address
   * @param address - The address to get the Starknet ID for
   * @param StarknetIdContract - The Starknet ID contract address (optional)
   * @returns The Starknet ID for the address
   */
  public async getStarkName(
    address: BigNumberish = this.address, // default to the wallet address
    StarknetIdContract?: string
  ): Promise<string> {
    return super.getStarkName(address, StarknetIdContract);
  }
}
