import assert from 'minimalistic-assert';

import { AccountInterface } from '../account';
import { ProviderInterface, defaultProvider } from '../provider';
import {
  Abi,
  AbiEntry,
  AsyncContractFunction,
  Call,
  ContractFunction,
  FunctionAbi,
  InvokeFunctionResponse,
  Overrides,
  StructAbi,
} from '../types';
import { CheckCallData, abiInputsLength, getAbiStruct } from '../utils/calldata';
import { CallOptions, ContractInterface } from './interface';

const splitArgsAndOptions = (abiInputs: AbiEntry[], args: any) =>
  (abiInputsLength(abiInputs) + 1 === args.length && typeof args[args.length - 1] === 'object') ||
  (args[0]?.compiled && args[1])
    ? { args, options: args.pop() }
    : { args, options: undefined };

/**
 * Adds call methods to the contract
 */
function buildCall(contract: Contract, functionAbi: FunctionAbi): AsyncContractFunction {
  return async function (...args: Array<any>): Promise<any> {
    const params = splitArgsAndOptions(functionAbi.inputs, args);
    return contract.call(functionAbi.name, params.args, params.options);
  };
}

/**
 * Adds invoke methods to the contract
 */
function buildInvoke(contract: Contract, functionAbi: FunctionAbi): AsyncContractFunction {
  return async function (...args: Array<any>): Promise<any> {
    const params = splitArgsAndOptions(functionAbi.inputs, args);
    return contract.invoke(functionAbi.name, params.args, params.options);
  };
}

/**
 * Adds call/invoke methods to the contract
 */
function buildDefault(contract: Contract, functionAbi: FunctionAbi): AsyncContractFunction {
  if (functionAbi.stateMutability === 'view') {
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

export class Contract implements ContractInterface {
  abi: Abi;

  address: string;

  providerOrAccount: ProviderInterface | AccountInterface;

  deployTransactionHash?: string;

  protected readonly structs: { [name: string]: StructAbi };

  readonly functions!: { [name: string]: AsyncContractFunction };

  readonly callStatic!: { [name: string]: AsyncContractFunction };

  readonly populateTransaction!: { [name: string]: ContractFunction };

  readonly estimateFee!: { [name: string]: ContractFunction };

  readonly [key: string]: AsyncContractFunction | any;

  private checkCalldata: CheckCallData;

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
    this.checkCalldata = new CheckCallData(abi);
    this.structs = getAbiStruct(abi);
    this.abi = abi;

    const options = { enumerable: true, value: {}, writable: false };
    Object.defineProperties(this, {
      functions: options,
      callStatic: options,
      populateTransaction: options,
      estimateFee: options,
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
    args: Array<any> = [],
    options: CallOptions = { parseRequest: true, parseResponse: true, formatResponse: undefined }
  ): Promise<Object> {
    assert(this.address !== null, 'contract is not connected to an address');
    const blockIdentifier = options?.blockIdentifier || undefined;
    let calldata = args[0];

    if (options.parseRequest && !args[0]?.compiled) {
      const { inputs } = this.abi.find((abi) => abi.name === method) as FunctionAbi;

      this.checkCalldata.validateMethodAndArgs('CALL', method, args);
      calldata = this.checkCalldata.compileCalldata(args, inputs);
    }

    return this.providerOrAccount
      .callContract(
        {
          contractAddress: this.address,
          calldata,
          entrypoint: method,
        },
        blockIdentifier
      )
      .then((x) => {
        if (!options.parseResponse) {
          return x.result;
        }
        if (options.formatResponse) {
          return this.checkCalldata.formatResponse(method, x.result, options.formatResponse);
        }
        return this.checkCalldata.parseResponse(method, x.result);
      });
  }

  public invoke(
    method: string,
    args: Array<any> = [],
    options: Overrides = {
      parseRequest: true,
    }
  ): Promise<InvokeFunctionResponse> {
    assert(this.address !== null, 'contract is not connected to an address');

    let calldata = args?.[0];
    if (options.parseRequest && !calldata?.compiled) {
      const { inputs } = this.abi.find((abi) => abi.name === method) as FunctionAbi;

      this.checkCalldata.validateMethodAndArgs('INVOKE', method, args);
      calldata = this.checkCalldata.compileCalldata(args, inputs);
    }

    const invocation = {
      contractAddress: this.address,
      calldata,
      entrypoint: method,
    };
    if ('execute' in this.providerOrAccount) {
      return this.providerOrAccount.execute(invocation, undefined, {
        maxFee: options.maxFee,
        nonce: options.nonce,
      });
    }

    if (!options.nonce) {
      throw new Error(`Nonce is required when invoking a function without an account`);
    }

    // eslint-disable-next-line no-console
    console.warn(`Invoking ${method} without an account. This will not work on a public node.`);

    return this.providerOrAccount.invokeFunction(
      {
        ...invocation,
        signature: options.signature || [],
      },
      {
        nonce: options.nonce,
      }
    );
  }

  public async estimate(method: string, args: Array<any> = []) {
    assert(this.address !== null, 'contract is not connected to an address');

    if (!args[0]?.compiled) {
      this.checkCalldata.validateMethodAndArgs('INVOKE', method, args);
    }

    const invocation = this.populateTransaction[method](...args);
    if ('estimateInvokeFee' in this.providerOrAccount) {
      return this.providerOrAccount.estimateInvokeFee(invocation);
    }
    throw Error('Contract must be connected to the account contract to estimate');
  }

  public populate(method: string, args: Array<any> = []): Call {
    const { inputs } = this.abi.find((abi) => abi.name === method) as FunctionAbi;
    const calldata = args?.[0]?.compiled
      ? args?.[0]
      : this.checkCalldata.compileCalldata(args, inputs);

    return {
      contractAddress: this.address,
      entrypoint: method,
      calldata,
    };
  }
}
