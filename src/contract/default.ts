import type { Abi as AbiKanabi, TypedContract as AbiWanTypedContract } from 'abi-wan-kanabi';
import {
  Abi,
  AbiEvents,
  AbiStruct,
  ArgsOrCalldata,
  AsyncContractFunction,
  Call,
  CallOptions,
  Calldata,
  ContractFunction,
  ContractOptions,
  FunctionAbi,
  InvokeFunctionResponse,
  GetTransactionReceiptResponse,
  ParsedEvents,
  RawArgs,
  CallResult,
  ValidateType,
  type SuccessfulTransactionReceiptResponse,
  EstimateFeeResponseOverhead,
  ExecuteOptions,
  ProviderOrAccount,
  isAccount,
  WithOptions,
  FactoryParams,
  UniversalDetails,
  DeclareAndDeployContractPayload,
  type PaymasterFeeEstimate,
  SuccessfulTransactionReceiptResponseHelper,
} from '../types';
import type { AccountInterface } from '../account/interface';
import assert from '../utils/assert';
import { cairo, CallData } from '../utils/calldata';
import { createAbiParser, ParsingStrategy } from '../utils/calldata/parser';
import { getAbiEvents, parseEvents as parseRawEvents } from '../utils/events/index';
import { toHex } from '../utils/num';
import { ContractInterface } from './interface';
import { logger } from '../global/logger';
import { defaultProvider } from '../provider';
import { getCompiledCalldata } from '../utils/transaction';
import { extractAbi, parseContract } from '../utils/provider';

export type TypedContractV2<TAbi extends AbiKanabi> = AbiWanTypedContract<TAbi> & Contract;

/**
 * Adds call methods to the contract
 */
function buildCall(contract: Contract, functionAbi: FunctionAbi): AsyncContractFunction {
  return async function (...args: ArgsOrCalldata): Promise<any> {
    const options = { ...contract.withOptionsProps };
    // eslint-disable-next-line no-param-reassign
    contract.withOptionsProps = undefined;
    return contract.call(functionAbi.name, args, {
      parseRequest: contract.parseRequest,
      parseResponse: contract.parseResponse,
      ...options,
    });
  };
}

/**
 * Adds invoke methods to the contract
 */
function buildInvoke(contract: Contract, functionAbi: FunctionAbi): AsyncContractFunction {
  return async function (...args: ArgsOrCalldata): Promise<any> {
    const options = { ...contract.withOptionsProps };
    // eslint-disable-next-line no-param-reassign
    contract.withOptionsProps = undefined;
    return contract.invoke(functionAbi.name, args, {
      parseRequest: contract.parseRequest,
      ...options,
    });
  };
}

/**
 * Adds call/invoke methods to the contract
 */
function buildDefault(contract: Contract, functionAbi: FunctionAbi): AsyncContractFunction {
  if (functionAbi.stateMutability === 'view' || functionAbi.state_mutability === 'view') {
    return buildCall(contract, functionAbi);
  }
  return buildInvoke(contract, functionAbi);
}

/**
 * Adds populate for methods to the contract
 */
function buildPopulate(contract: Contract, functionAbi: FunctionAbi): ContractFunction {
  return function (...args: Array<any>): any {
    return contract.populate(functionAbi.name, args);
  };
}

/**
 * Adds estimateFee for methods to the contract
 */
function buildEstimate(contract: Contract, functionAbi: FunctionAbi): ContractFunction {
  return function (...args: Array<any>): any {
    const options = { ...contract.withOptionsProps };
    // eslint-disable-next-line no-param-reassign
    contract.withOptionsProps = undefined;
    return contract.estimate(functionAbi.name, args, options);
  };
}
export class Contract implements ContractInterface {
  abi: Abi;

  address: string;

  providerOrAccount: ProviderOrAccount;

  classHash?: string;

  parseRequest: boolean;

  parseResponse: boolean;

  private structs: { [name: string]: AbiStruct };

  private events: AbiEvents;

  readonly functions!: { [name: string]: AsyncContractFunction };

  readonly callStatic!: { [name: string]: AsyncContractFunction };

  readonly populateTransaction!: { [name: string]: ContractFunction };

  readonly estimateFee!: { [name: string]: ContractFunction };

  readonly [key: string]: AsyncContractFunction | any;

  private callData: CallData;

  public withOptionsProps?: WithOptions;

  private parsingStrategy?: ParsingStrategy;

  /**
   * @param options
   *  - abi: Abi of the contract object (required)
   *  - address: address to connect to (required)
   *  - providerOrAccount?: Provider or Account to attach to (fallback to defaultProvider)
   *  - parseRequest?: compile and validate arguments (optional, default true)
   *  - parseResponse?: Parse elements of the response array and structuring them into response object (optional, default true)
   *  - parser?: Abi parser (optional, default createAbiParser(options.abi))
   */
  constructor(options: ContractOptions) {
    // TODO: REFACTOR: move from legacy format and add support for legacy format
    // Must have params
    this.parsingStrategy = options.parsingStrategy;
    const parser = createAbiParser(options.abi, options.parsingStrategy);
    this.abi = parser.getLegacyFormat();
    this.address = options.address && options.address.toLowerCase();
    this.providerOrAccount = options.providerOrAccount ?? defaultProvider;

    // Optional params
    this.parseRequest = options.parseRequest ?? true;
    this.parseResponse = options.parseResponse ?? true;
    this.classHash = options.classHash;

    // Init
    this.callData = new CallData(options.abi, options.parsingStrategy);
    this.structs = CallData.getAbiStruct(options.abi);
    this.events = getAbiEvents(options.abi);

    // Define methods properties
    const methodTypes = { enumerable: true, value: {}, writable: false };
    Object.defineProperties(this, {
      functions: { enumerable: true, value: {}, writable: false },
      callStatic: { enumerable: true, value: {}, writable: false },
      populateTransaction: { enumerable: true, value: {}, writable: false },
      estimateFee: { enumerable: true, value: {}, writable: false },
    });

    // Define methods
    this.abi.forEach((abiElement) => {
      if (abiElement.type !== 'function') return;
      const methodSignature = abiElement.name;
      if (!this[methodSignature]) {
        Object.defineProperty(this, methodSignature, {
          ...methodTypes,
          value: buildDefault(this, abiElement),
        });
      }
      if (!this.functions[methodSignature]) {
        Object.defineProperty(this.functions, methodSignature, {
          ...methodTypes,
          value: buildDefault(this, abiElement),
        });
      }
      if (!this.callStatic[methodSignature]) {
        Object.defineProperty(this.callStatic, methodSignature, {
          ...methodTypes,
          value: buildCall(this, abiElement),
        });
      }
      if (!this.populateTransaction[methodSignature]) {
        Object.defineProperty(this.populateTransaction, methodSignature, {
          ...methodTypes,
          value: buildPopulate(this, abiElement),
        });
      }
      if (!this.estimateFee[methodSignature]) {
        Object.defineProperty(this.estimateFee, methodSignature, {
          ...methodTypes,
          value: buildEstimate(this, abiElement),
        });
      }
    });
  }

  public withOptions(options: WithOptions): this {
    this.withOptionsProps = options;
    return this;
  }

  public attach(address: string, abi?: Abi): void {
    // TODO: if changing address, probably changing abi also !? Also nonsense method as if you change abi and address, you need to create a new contract instance.
    this.address = address;
    if (abi) {
      const parser = createAbiParser(abi, this.parsingStrategy);
      this.abi = parser.getLegacyFormat();
      this.callData = new CallData(abi, this.parsingStrategy);
      this.structs = CallData.getAbiStruct(abi);
      this.events = getAbiEvents(abi);
    }
  }

  public async isDeployed(): Promise<this> {
    try {
      await this.providerOrAccount.getClassHashAt(this.address);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      throw new Error(`Contract not deployed at address ${this.address}: ${errorMessage}`);
    }

    return this;
  }

  public async call(
    method: string,
    args: ArgsOrCalldata = [],
    {
      parseRequest = true,
      parseResponse = true,
      formatResponse = undefined,
      blockIdentifier = undefined,
    }: CallOptions = {}
  ): Promise<CallResult> {
    assert(this.address !== null, 'contract is not connected to an address');

    const calldata = getCompiledCalldata(args, () => {
      if (parseRequest) {
        this.callData.validate(ValidateType.CALL, method, args);
        return this.callData.compile(method, args);
      }
      logger.warn('Call skipped parsing but provided rawArgs, possible malfunction request');
      return args;
    });

    return this.providerOrAccount
      .callContract(
        {
          contractAddress: this.address,
          calldata,
          entrypoint: method,
        },
        blockIdentifier
      )
      .then((it) => {
        if (!parseResponse) {
          return it;
        }
        if (formatResponse) {
          return this.callData.format(method, it, formatResponse);
        }
        return this.callData.parse(method, it);
      });
  }

  public async invoke(
    method: string,
    args: ArgsOrCalldata,
    options: ExecuteOptions & { waitForTransaction: true }
  ): Promise<SuccessfulTransactionReceiptResponseHelper>;
  public async invoke(
    method: string,
    args: ArgsOrCalldata,
    options: ExecuteOptions & { waitForTransaction: false }
  ): Promise<InvokeFunctionResponse>;
  public async invoke(
    method: string,
    args?: ArgsOrCalldata,
    options?: ExecuteOptions
  ): Promise<InvokeFunctionResponse>;
  public async invoke(
    method: string,
    args: ArgsOrCalldata = [],
    options: ExecuteOptions = {}
  ): Promise<InvokeFunctionResponse> {
    const { parseRequest = true, signature, waitForTransaction, ...restInvokeOptions } = options;
    assert(this.address !== null, 'contract is not connected to an address');

    const calldata = getCompiledCalldata(args, () => {
      if (parseRequest) {
        this.callData.validate(ValidateType.INVOKE, method, args);
        return this.callData.compile(method, args);
      }
      logger.warn('Invoke skipped parsing but provided rawArgs, possible malfunction request');
      return args;
    });

    const invocation = {
      contractAddress: this.address,
      calldata,
      entrypoint: method,
    };
    if (isAccount(this.providerOrAccount)) {
      if (restInvokeOptions.paymasterDetails) {
        const myCall: Call = {
          contractAddress: this.address,
          entrypoint: method,
          calldata: args,
        };
        return this.providerOrAccount.executePaymasterTransaction(
          [myCall],
          restInvokeOptions.paymasterDetails,
          restInvokeOptions.maxFeeInGasToken
        );
      }
      const result: InvokeFunctionResponse = await this.providerOrAccount.execute(invocation, {
        ...restInvokeOptions,
      });
      if (waitForTransaction) {
        const result2: GetTransactionReceiptResponse =
          await this.providerOrAccount.waitForTransaction(result.transaction_hash);
        if (result2.isSuccess()) {
          return result2;
        }
        throw new Error('Transaction failed', { cause: result2 });
      }
      return result;
    }

    if (!restInvokeOptions.nonce)
      throw new Error(`Manual nonce is required when invoking a function without an account`);
    logger.warn(`Invoking ${method} without an account.`);

    return this.providerOrAccount.invokeFunction(
      {
        ...invocation,
        signature,
      },
      {
        ...restInvokeOptions,
        nonce: restInvokeOptions.nonce,
      }
    );
  }

  public async estimate(
    method: string,
    args: ArgsOrCalldata = [],
    estimateDetails: ExecuteOptions = {}
  ): Promise<EstimateFeeResponseOverhead | PaymasterFeeEstimate> {
    assert(this.address !== null, 'contract is not connected to an address');

    if (!getCompiledCalldata(args, () => false)) {
      this.callData.validate(ValidateType.INVOKE, method, args);
    }
    const invocation = this.populate(method, args);
    if (isAccount(this.providerOrAccount)) {
      if (estimateDetails.paymasterDetails) {
        const myCall: Call = {
          contractAddress: this.address,
          entrypoint: method,
          calldata: args,
        };
        return this.providerOrAccount.estimatePaymasterTransactionFee(
          [myCall],
          estimateDetails.paymasterDetails
        );
      }
      return this.providerOrAccount.estimateInvokeFee(invocation, estimateDetails);
    }
    throw Error('Contract must be connected to the account contract to estimate');
  }

  public populate(method: string, args: RawArgs = []): Call {
    const calldata: Calldata = getCompiledCalldata(args, () => this.callData.compile(method, args));
    return {
      contractAddress: this.address,
      entrypoint: method,
      calldata,
    };
  }

  // TODO: Demistify what is going on here ???
  // TODO: receipt status filtering test and fix this do not look right
  public parseEvents(receipt: GetTransactionReceiptResponse): ParsedEvents {
    let parsed: ParsedEvents = [] as unknown as ParsedEvents;
    receipt.match({
      SUCCEEDED: (txR: SuccessfulTransactionReceiptResponse) => {
        const emittedEvents =
          txR.events
            ?.map((event) => {
              return {
                // TODO: this do not check that block is production and block_hash and block_number actually exists
                // TODO: second issue is that ts do not complains about it
                block_hash: txR.block_hash,
                block_number: txR.block_number,
                transaction_hash: txR.transaction_hash,
                ...event,
              };
            })
            .filter((event) => toHex(event.from_address) === toHex(this.address), []) || []; // TODO: what data is in this that is cleaned out ?
        parsed = parseRawEvents(
          emittedEvents,
          this.events,
          this.structs,
          CallData.getAbiEnum(this.abi),
          this.callData.parser
        ) as ParsedEvents;
      },
      _: () => {
        throw Error('This transaction was not successful.');
      },
    });

    // Add getByPath method to the specific instance (non-enumerable)
    Object.defineProperty(parsed, 'getByPath', {
      value: (path: string) => {
        const event = parsed.find((ev) => Object.keys(ev).some((key) => key.includes(path)));
        const eventKey = Object.keys(event || {}).find((key) => key.includes(path));
        return eventKey && event ? event[eventKey] : null;
      },
      writable: false,
      enumerable: false,
      configurable: false,
    });

    return parsed;
  }

  public isCairo1(): boolean {
    return cairo.isCairo1Abi(this.abi);
  }

  public async getVersion() {
    return this.providerOrAccount.getContractVersion(this.address);
  }

  public typedv2<TAbi extends AbiKanabi>(tAbi: TAbi): TypedContractV2<TAbi> {
    return this as unknown as TypedContractV2<typeof tAbi>;
  }

  /**
   * Factory method to declare and/or deploy a contract creating a new Contract instance
   *
   * It handles the entire lifecycle: compiles constructor calldata, optionally declares the contract class,
   * deploys an instance, and returns a ready-to-use Contract object.
   *
   * When classHash is provided, it will only deploy the contract without declaring.
   * When contract is provided without classHash, it will declare and deploy.
   *
   * @param params - Factory parameters containing Contract Class details and deployment options
   * @returns Promise that resolves to a deployed Contract instance with address and transaction hash
   * @throws Error if deployment fails or contract_address is not returned
   * @example
   * ```typescript
   * // Declare and deploy an ERC20 contract
   * const contract = await Contract.factory({
   *   contract: erc20CompiledContract,
   *   account: myAccount,
   *   casm: erc20Casm,
   *   constructorCalldata: {
   *     name: 'MyToken',
   *     symbol: 'MTK',
   *     decimals: 18,
   *     initial_supply: { low: 1000000, high: 0 },
   *     recipient: myAccount.address
   *   }
   * });
   *
   * // Deploy-only mode with existing classHash (ABI will be fetched from network)
   * const contract2 = await Contract.factory({
   *   classHash: '0x1234...',
   *   account: myAccount,
   *   constructorCalldata: {
   *     name: 'AnotherToken',
   *     symbol: 'ATK',
   *     decimals: 18,
   *     initial_supply: { low: 2000000, high: 0 },
   *     recipient: myAccount.address
   *   }
   * });
   *
   * // Deploy-only mode with provided ABI (faster, no network call)
   * const contract3 = await Contract.factory({
   *   classHash: '0x1234...',
   *   abi: erc20Abi,
   *   account: myAccount,
   *   constructorCalldata: {
   *     name: 'ThirdToken',
   *     symbol: 'TTK',
   *     decimals: 18,
   *     initial_supply: { low: 3000000, high: 0 },
   *     recipient: myAccount.address
   *   }
   * });
   *
   * console.log('Contract deployed at:', contract.address);
   * ```\
   */
  static async factory(params: FactoryParams, details: UniversalDetails = {}): Promise<Contract> {
    const { account, parseRequest = true } = params;
    let abi: Abi;
    let classHash: string;
    let contract_address: string;

    // Check if only deploying (classHash provided and no contract)
    if ('classHash' in params && params.classHash && !('contract' in params)) {
      // Deploy-only mode: use provided classHash
      const deployParams = params as FactoryParams & { classHash: string; abi?: Abi };
      classHash = deployParams.classHash.toString();

      // If ABI is not provided, fetch it from the network using the classHash
      if (!deployParams.abi) {
        const contractClass = await account.getClass(classHash);
        abi = contractClass.abi;
      } else {
        abi = deployParams.abi;
      }

      // Deploy the contract using the provided classHash
      const deployResult = await account.deployContract(
        {
          classHash,
          constructorCalldata: deployParams.constructorCalldata,
          salt: deployParams.salt,
          unique: deployParams.unique,
          abi: parseRequest ? abi : undefined,
        },
        details
      );
      contract_address = deployResult.contract_address;
    } else {
      // Declare and deploy mode: original behavior
      const declareParams = params as DeclareAndDeployContractPayload & {
        account: AccountInterface;
        parseRequest?: boolean;
      };
      const contract = parseContract(declareParams.contract);
      abi = declareParams.abi ? declareParams.abi : extractAbi(contract);

      const {
        declare: { class_hash },
        deploy: { contract_address: deployed_address },
      } = await account.declareAndDeploy(
        {
          ...declareParams,
          abi: parseRequest ? abi : undefined,
        },
        details
      );
      classHash = class_hash.toString();
      contract_address = deployed_address;
    }

    // Common contract creation logic
    assert(Boolean(contract_address), 'Deployment of the contract failed');

    return new Contract({
      abi,
      address: contract_address,
      providerOrAccount: account,
      classHash,
      parseRequest: params.parseRequest,
      parseResponse: params.parseResponse,
      parsingStrategy: params.parsingStrategy,
    });
  }
}
