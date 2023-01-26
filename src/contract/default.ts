import assert from 'minimalistic-assert';

import { AccountInterface } from '../account';
import { ProviderInterface, defaultProvider } from '../provider';
import {
  Abi,
  AsyncContractFunction,
  BlockTag,
  Call,
  ContractFunction,
  FunctionAbi,
  InvokeFunctionResponse,
  Overrides,
  StructAbi,
} from '../types';
import { CheckCallData } from '../utils/calldata';
import { CallOptions, ContractInterface } from './interface';

/**
 * Adds call methods to the contract
 *
 */
function buildCall(contract: Contract, functionAbi: FunctionAbi): AsyncContractFunction {
  return async function (...args: Array<any>): Promise<any> {
    let blockIdentifier: BlockTag | null = null;
    let parseRequest: Boolean = true;
    let parseResponse: Boolean = true;
    let formatResponse = null;

    // extract options
    args.forEach((arg) => {
      if (typeof arg !== 'object') return;
      if ('blockIdentifier' in arg) {
        blockIdentifier = arg.blockIdentifier;
      }
      if ('parseRequest' in arg) {
        parseRequest = arg.parseRequest;
      }
      if ('parseResponse' in arg) {
        parseResponse = arg.parseResponse;
      }
      if ('formatResponse' in arg) {
        formatResponse = arg.formatResponse;
      }
    });

    return contract.call(functionAbi.name, args, {
      blockIdentifier,
      parseRequest,
      parseResponse,
      formatResponse,
    });
  };
}

/**
 * Adds invoke methods to the contract
 *
 */
function buildInvoke(contract: Contract, functionAbi: FunctionAbi): AsyncContractFunction {
  return async function (...args: Array<any>): Promise<any> {
    const { inputs } = functionAbi;
    const inputsLength = inputs.reduce((acc, input) => {
      if (!/_len$/.test(input.name)) {
        return acc + 1;
      }
      return acc;
    }, 0);
    const options = {};
    if (inputsLength + 1 === args.length && typeof args[args.length - 1] === 'object') {
      Object.assign(options, args.pop());
    }
    return contract.invoke(functionAbi.name, args, options);
  };
}

/**
 * Adds call/invoke methods to the contract
 *
 */
function buildDefault(contract: Contract, functionAbi: FunctionAbi): AsyncContractFunction {
  if (functionAbi.stateMutability === 'view') {
    return buildCall(contract, functionAbi);
  }
  return buildInvoke(contract, functionAbi);
}

/**
 * Adds populate for methods to the contract
 *
 */
function buildPopulate(contract: Contract, functionAbi: FunctionAbi): ContractFunction {
  return function (...args: Array<any>): any {
    return contract.populate(functionAbi.name, args);
  };
}

/**
 * Adds estimateFee for methods to the contract
 *
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
    this.abi = abi;
    this.structs = abi
      .filter((abiEntry) => abiEntry.type === 'struct')
      .reduce(
        (acc, abiEntry) => ({
          ...acc,
          [abiEntry.name]: abiEntry,
        }),
        {}
      );
    this.checkCalldata = new CheckCallData(abi);

    Object.defineProperty(this, 'functions', {
      enumerable: true,
      value: {},
      writable: false,
    });
    Object.defineProperty(this, 'callStatic', {
      enumerable: true,
      value: {},
      writable: false,
    });
    Object.defineProperty(this, 'populateTransaction', {
      enumerable: true,
      value: {},
      writable: false,
    });
    Object.defineProperty(this, 'estimateFee', {
      enumerable: true,
      value: {},
      writable: false,
    });
    this.abi.forEach((abiElement) => {
      if (abiElement.type !== 'function') {
        return;
      }
      const signature = abiElement.name;
      if (!this[signature]) {
        Object.defineProperty(this, signature, {
          enumerable: true,
          value: buildDefault(this, abiElement),
          writable: false,
        });
      }
      if (!this.functions[signature]) {
        Object.defineProperty(this.functions, signature, {
          enumerable: true,
          value: buildDefault(this, abiElement),
          writable: false,
        });
      }

      if (!this.callStatic[signature]) {
        Object.defineProperty(this.callStatic, signature, {
          enumerable: true,
          value: buildCall(this, abiElement),
          writable: false,
        });
      }

      if (!this.populateTransaction[signature]) {
        Object.defineProperty(this.populateTransaction, signature, {
          enumerable: true,
          value: buildPopulate(this, abiElement),
          writable: false,
        });
      }

      if (!this.estimateFee[signature]) {
        Object.defineProperty(this.estimateFee, signature, {
          enumerable: true,
          value: buildEstimate(this, abiElement),
          writable: false,
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
    // default value also for null
    const blockIdentifier = options?.blockIdentifier || undefined;

    // ensure contract is connected
    assert(this.address !== null, 'contract is not connected to an address');

    let calldata;
    if (!options.parseRequest || args[0]?.compiled) {
      // provided args are compiled callData
      // eslint-disable-next-line prefer-destructuring
      calldata = args[0];
    } else {
      // args are raw data
      // validate method and args
      this.checkCalldata.validateMethodAndArgs('CALL', method, args);
      const { inputs } = this.abi.find((abi) => abi.name === method) as FunctionAbi;

      // compile calldata
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
    options: Overrides = {}
  ): Promise<InvokeFunctionResponse> {
    // ensure contract is connected
    assert(this.address !== null, 'contract is not connected to an address');
    // validate method and args
    this.checkCalldata.validateMethodAndArgs('INVOKE', method, args);

    const { inputs } = this.abi.find((abi) => abi.name === method) as FunctionAbi;
    const inputsLength = inputs.reduce((acc, input) => {
      if (!/_len$/.test(input.name)) {
        return acc + 1;
      }
      return acc;
    }, 0);

    if (args.length !== inputsLength) {
      throw Error(
        `Invalid number of arguments, expected ${inputsLength} arguments, but got ${args.length}`
      );
    }
    // compile calldata
    const calldata = this.checkCalldata.compileCalldata(args, inputs);

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
    // ensure contract is connected
    assert(this.address !== null, 'contract is not connected to an address');

    // validate method and args
    this.checkCalldata.validateMethodAndArgs('INVOKE', method, args);
    const invocation = this.populateTransaction[method](...args);
    if ('estimateInvokeFee' in this.providerOrAccount) {
      return this.providerOrAccount.estimateInvokeFee(invocation);
    }
    throw Error('Contract must be connected to the account contract to estimate');
  }

  public populate(method: string, args: Array<any> = []): Call {
    const { inputs } = this.abi.find((abi) => abi.name === method) as FunctionAbi;
    return {
      contractAddress: this.address,
      entrypoint: method,
      calldata: this.checkCalldata.compileCalldata(args, inputs),
    };
  }
}
