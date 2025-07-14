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
} from '../types';
import assert from '../utils/assert';
import { cairo, CallData } from '../utils/calldata';
import { createAbiParser } from '../utils/calldata/parser';
import { getAbiEvents, parseEvents as parseRawEvents } from '../utils/events/index';
import { cleanHex } from '../utils/num';
import { ContractInterface } from './interface';
import { logger } from '../global/logger';
import { defaultProvider } from '../provider';

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
      parseRequest: true,
      parseResponse: true,
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
      parseRequest: true,
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
    return contract.estimate(functionAbi.name, args);
  };
}

export function getCalldata(args: RawArgs, callback: Function): Calldata {
  // Check if Calldata in args or args[0] else compile
  if (Array.isArray(args) && '__compiled__' in args) return args as Calldata;
  if (Array.isArray(args) && Array.isArray(args[0]) && '__compiled__' in args[0])
    return args[0] as Calldata;
  return callback();
}

export class Contract implements ContractInterface {
  abi: Abi;

  address: string;

  providerOrAccount: ProviderOrAccount;

  /**
   * Transaction hash of the deploy tx, used to confirm the contract is deployed.
   * TODO: Why cant we confirm this from the contract address ? Check with contract factory
   */
  deployTransactionHash?: string;

  private structs: { [name: string]: AbiStruct };

  private events: AbiEvents;

  readonly functions!: { [name: string]: AsyncContractFunction };

  readonly callStatic!: { [name: string]: AsyncContractFunction };

  readonly populateTransaction!: { [name: string]: ContractFunction };

  readonly estimateFee!: { [name: string]: ContractFunction };

  readonly [key: string]: AsyncContractFunction | any;

  private callData: CallData;

  public withOptionsProps?: WithOptions;

  /**
   * @param options
   *  - abi: Abi of the contract object (required)
   *  - address: address to connect to (required)
   *  - providerOrAccount?: Provider or Account to attach to (fallback to defaultProvider)
   *  - parseRequest?: compile and validate arguments (optional, default true)
   *  - parseResponse?: Parse elements of the response array and structuring them into response object (optional, default true)
   */
  constructor(options: ContractOptions) {
    const parser = createAbiParser(options.abi);

    this.address = options.address && options.address.toLowerCase();
    this.abi = parser.getLegacyFormat();
    this.providerOrAccount = options.providerOrAccount ?? defaultProvider;

    this.callData = new CallData(options.abi);
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

  public withOptions(options: WithOptions) {
    this.withOptionsProps = options;
    return this;
  }

  public attach(address: string, abi?: Abi): void {
    // TODO: if changing address, probably changing abi also !? Also nonsense method as if you change abi and address, you need to create a new contract instance. This could be useful only if contract can be created empty without any params.
    this.address = address;
    if (abi) {
      this.abi = abi;
      this.callData = new CallData(abi);
      this.structs = CallData.getAbiStruct(abi);
      this.events = getAbiEvents(abi);
    }
  }

  static async factory(params: FactoryParams): Promise<Contract> {
    const abi = params.abi ?? params.compiledContract.abi;
    const calldataClass = new CallData(abi);
    const {
      compiledContract,
      account,
      casm,
      classHash,
      compiledClassHash,
      parseRequest = true,
      salt,
      constructorArguments = [],
    } = params;

    const constructorCalldata = getCalldata(constructorArguments, () => {
      if (parseRequest) {
        // Convert object based raw js arguments to ...args array
        const rawArgs = Object.values(constructorArguments);
        calldataClass.validate(ValidateType.DEPLOY, 'constructor', rawArgs);
        return calldataClass.compile('constructor', rawArgs);
      }
      logger.warn('Call skipped parsing but provided rawArgs, possible malfunction request');
      return constructorArguments;
    });

    const {
      deploy: { contract_address, transaction_hash },
    } = await account.declareAndDeploy({
      contract: compiledContract,
      casm,
      classHash,
      compiledClassHash,
      constructorCalldata,
      salt,
    });
    assert(Boolean(contract_address), 'Deployment of the contract failed');

    const contractInstance = new Contract({
      abi: compiledContract.abi,
      address: contract_address,
      providerOrAccount: account,
    });
    contractInstance.deployTransactionHash = transaction_hash;

    return contractInstance;
  }

  public async deployed(): Promise<Contract> {
    if (this.deployTransactionHash) {
      await this.providerOrAccount.waitForTransaction(this.deployTransactionHash);
      this.deployTransactionHash = undefined;
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

    const calldata = getCalldata(args, () => {
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

  public invoke(
    method: string,
    args: ArgsOrCalldata = [],
    { parseRequest = true, signature, ...RestInvokeOptions }: ExecuteOptions = {}
  ): Promise<InvokeFunctionResponse> {
    assert(this.address !== null, 'contract is not connected to an address');

    const calldata = getCalldata(args, () => {
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
      return this.providerOrAccount.execute(invocation, {
        ...RestInvokeOptions,
      });
    }

    if (!RestInvokeOptions.nonce)
      throw new Error(`Manual nonce is required when invoking a function without an account`);
    logger.warn(`Invoking ${method} without an account.`);

    return this.providerOrAccount.invokeFunction(
      {
        ...invocation,
        signature,
      },
      {
        ...RestInvokeOptions,
        nonce: RestInvokeOptions.nonce,
      }
    );
  }

  public async estimate(
    method: string,
    args: ArgsOrCalldata = []
  ): Promise<EstimateFeeResponseOverhead> {
    assert(this.address !== null, 'contract is not connected to an address');

    if (!getCalldata(args, () => false)) {
      this.callData.validate(ValidateType.INVOKE, method, args);
    }

    const invocation = this.populate(method, args);
    if (isAccount(this.providerOrAccount)) {
      return this.providerOrAccount.estimateInvokeFee(invocation);
    }
    throw Error('Contract must be connected to the account contract to estimate');
  }

  public populate(method: string, args: RawArgs = []): Call {
    const calldata: Calldata = getCalldata(args, () => this.callData.compile(method, args));
    return {
      contractAddress: this.address,
      entrypoint: method,
      calldata,
    };
  }

  // TODO: Demistify what is going on here ???
  // TODO: receipt status filtering test and fix this do not look right
  public parseEvents(receipt: GetTransactionReceiptResponse): ParsedEvents {
    let parsed: ParsedEvents;
    receipt.match({
      success: (txR: SuccessfulTransactionReceiptResponse) => {
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
            .filter((event) => cleanHex(event.from_address) === cleanHex(this.address), []) || [];
        parsed = parseRawEvents(
          emittedEvents as any, // TODO: any temp hotfix, fix this
          this.events,
          this.structs,
          CallData.getAbiEnum(this.abi)
        );
      },
      _: () => {
        throw Error('This transaction was not successful.');
      },
    });
    return parsed!;
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
}
