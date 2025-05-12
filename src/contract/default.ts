import type { Abi as AbiKanabi, TypedContract as AbiWanTypedContract } from 'abi-wan-kanabi';

import { AccountInterface } from '../account';
import { ProviderInterface, defaultProvider } from '../provider';
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
  EstimateFeeResponse,
  FunctionAbi,
  InvokeFunctionResponse,
  InvokeOptions,
  GetTransactionReceiptResponse,
  ParsedEvents,
  RawArgs,
  Result,
  ValidateType,
  type SuccessfulTransactionReceiptResponse,
} from '../types';
import assert from '../utils/assert';
import { cairo, CallData } from '../utils/calldata';
import { createAbiParser } from '../utils/calldata/parser';
import { getAbiEvents, parseEvents as parseRawEvents } from '../utils/events/index';
import { cleanHex } from '../utils/num';
import { ContractInterface } from './interface';
import { logger } from '../global/logger';

export type TypedContractV2<TAbi extends AbiKanabi> = AbiWanTypedContract<TAbi> & Contract;

/**
 * Adds call methods to the contract
 */
function buildCall(contract: Contract, functionAbi: FunctionAbi): AsyncContractFunction {
  return async function (...args: ArgsOrCalldata): Promise<any> {
    const options = { ...contract.contractOptions };
    // eslint-disable-next-line no-param-reassign
    contract.contractOptions = undefined;
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
    const options = { ...contract.contractOptions };
    // eslint-disable-next-line no-param-reassign
    contract.contractOptions = undefined;
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

  providerOrAccount: ProviderInterface | AccountInterface;

  deployTransactionHash?: string;

  protected readonly structs: { [name: string]: AbiStruct };

  protected readonly events: AbiEvents;

  readonly functions!: { [name: string]: AsyncContractFunction };

  readonly callStatic!: { [name: string]: AsyncContractFunction };

  readonly populateTransaction!: { [name: string]: ContractFunction };

  readonly estimateFee!: { [name: string]: ContractFunction };

  readonly [key: string]: AsyncContractFunction | any;

  private callData: CallData;

  public contractOptions?: ContractOptions;

  /**
   * Contract class to handle contract methods
   *
   * @param abi - Abi of the contract object
   * @param address (optional) - address to connect to
   * @param providerOrAccount (optional) - Provider or Account to attach to
   */
  constructor(
    abi: Abi,
    address: string,
    providerOrAccount: ProviderInterface | AccountInterface = defaultProvider
  ) {
    this.address = address && address.toLowerCase();
    this.providerOrAccount = providerOrAccount;
    this.callData = new CallData(abi);
    this.structs = CallData.getAbiStruct(abi);
    this.events = getAbiEvents(abi);
    const parser = createAbiParser(abi);
    this.abi = parser.getLegacyFormat();

    const options = { enumerable: true, value: {}, writable: false };
    Object.defineProperties(this, {
      functions: { enumerable: true, value: {}, writable: false },
      callStatic: { enumerable: true, value: {}, writable: false },
      populateTransaction: { enumerable: true, value: {}, writable: false },
      estimateFee: { enumerable: true, value: {}, writable: false },
    });
    this.abi.forEach((abiElement) => {
      if (abiElement.type !== 'function') return;
      const signature = abiElement.name;
      if (!this[signature]) {
        Object.defineProperty(this, signature, {
          ...options,
          value: buildDefault(this, abiElement),
        });
      }
      if (!this.functions[signature]) {
        Object.defineProperty(this.functions, signature, {
          ...options,
          value: buildDefault(this, abiElement),
        });
      }
      if (!this.callStatic[signature]) {
        Object.defineProperty(this.callStatic, signature, {
          ...options,
          value: buildCall(this, abiElement),
        });
      }
      if (!this.populateTransaction[signature]) {
        Object.defineProperty(this.populateTransaction, signature, {
          ...options,
          value: buildPopulate(this, abiElement),
        });
      }
      if (!this.estimateFee[signature]) {
        Object.defineProperty(this.estimateFee, signature, {
          ...options,
          value: buildEstimate(this, abiElement),
        });
      }
    });
  }

  public withOptions(options: ContractOptions) {
    this.contractOptions = options;
    return this;
  }

  public attach(address: string): void {
    this.address = address;
  }

  public connect(providerOrAccount: ProviderInterface | AccountInterface) {
    this.providerOrAccount = providerOrAccount;
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
  ): Promise<Result> {
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
    { parseRequest = true, maxFee, nonce, signature }: InvokeOptions = {}
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
    if ('execute' in this.providerOrAccount) {
      return this.providerOrAccount.execute(invocation, {
        maxFee,
        nonce,
      });
    }

    if (!nonce) throw new Error(`Nonce is required when invoking a function without an account`);
    logger.warn(`Invoking ${method} without an account. This will not work on a public node.`);

    return this.providerOrAccount.invokeFunction(
      {
        ...invocation,
        signature,
      },
      {
        nonce,
      }
    );
  }

  public async estimate(method: string, args: ArgsOrCalldata = []): Promise<EstimateFeeResponse> {
    assert(this.address !== null, 'contract is not connected to an address');

    if (!getCalldata(args, () => false)) {
      this.callData.validate(ValidateType.INVOKE, method, args);
    }

    const invocation = this.populate(method, args);
    if ('estimateInvokeFee' in this.providerOrAccount) {
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
