import BN from 'bn.js';
import assert from 'minimalistic-assert';

import { AccountInterface } from '../account';
import { ProviderInterface, defaultProvider } from '../provider';
import {
  Abi,
  AbiEntry,
  Args,
  AsyncContractFunction,
  BlockTag,
  Call,
  ContractFunction,
  FunctionAbi,
  InvokeFunctionResponse,
  Overrides,
  ParsedStruct,
  Result,
  StructAbi,
} from '../types';
import { CheckCallData } from '../utils/calldata';
import { BigNumberish, toBN } from '../utils/number';
import { CallOptions, ContractInterface } from './interface';

function parseFelt(candidate: string): BN {
  try {
    return toBN(candidate);
  } catch (e) {
    throw Error('Could not parse felt');
  }
}

/**
 * Adds call methods to the contract
 *
 */
function buildCall(contract: Contract, functionAbi: FunctionAbi): AsyncContractFunction {
  return async function (...args: Array<any>): Promise<any> {
    let blockIdentifier: BlockTag | null = null;

    args.forEach((arg) => {
      if (arg.blockIdentifier) {
        blockIdentifier = arg.blockIdentifier;
      }
    });

    return contract.call(functionAbi.name, args, { blockIdentifier });
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
    options: CallOptions = {}
  ): Promise<Result> {
    // default value also for null
    const blockIdentifier = options?.blockIdentifier || undefined;

    // ensure contract is connected
    assert(this.address !== null, 'contract is not connected to an address');

    // validate method and args
    this.checkCalldata.validateMethodAndArgs('CALL', method, args);
    const { inputs } = this.abi.find((abi) => abi.name === method) as FunctionAbi;

    // compile calldata
    const calldata = this.checkCalldata.compileCalldata(args, inputs);
    return this.providerOrAccount
      .callContract(
        {
          contractAddress: this.address,
          calldata,
          entrypoint: method,
        },
        blockIdentifier
      )
      .then((x) => this.parseResponse(method, x.result));
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

  /**
   * Parse of the response elements that are converted to Object (Struct) by using the abi
   *
   * @param responseIterator - iterator of the response
   * @param type - type of the struct
   * @return {BigNumberish | ParsedStruct} - parsed arguments in format that contract is expecting
   */
  protected parseResponseStruct(
    responseIterator: Iterator<string>,
    type: string
  ): BigNumberish | ParsedStruct {
    // check the type of current element
    if (type in this.structs && this.structs[type]) {
      return this.structs[type].members.reduce((acc, el) => {
        // parse each member of the struct (member can felt or nested struct)
        acc[el.name] = this.parseResponseStruct(responseIterator, el.type);
        return acc;
      }, {} as any);
    }
    return parseFelt(responseIterator.next().value);
  }

  /**
   * Parse elements of the response and structuring them into one field by using output property from the abi for that method
   *
   * @param responseIterator - iterator of the response
   * @param output  - output(field) information from the abi that will be used to parse the data
   * @return - parsed response corresponding to the abi structure of the field
   */
  protected parseResponseField(
    responseIterator: Iterator<string>,
    output: AbiEntry,
    parsedResult?: Args
  ): any {
    const { name, type } = output;
    const parsedDataArr: (BigNumberish | ParsedStruct)[] = [];
    switch (true) {
      case /_len$/.test(name):
        return parseFelt(responseIterator.next().value).toNumber();
      case /\(felt/.test(type):
        return type.split(',').reduce((acc) => {
          acc.push(parseFelt(responseIterator.next().value));
          return acc;
        }, [] as BigNumberish[]);
      case /\*/.test(type):
        if (parsedResult && parsedResult[`${name}_len`]) {
          const arrLen = parsedResult[`${name}_len`] as number;
          while (parsedDataArr.length < arrLen) {
            parsedDataArr.push(
              this.parseResponseStruct(responseIterator, output.type.replace('*', ''))
            );
          }
        }
        return parsedDataArr;
      case type in this.structs:
        return this.parseResponseStruct(responseIterator, type);
      default:
        return parseFelt(responseIterator.next().value);
    }
  }

  /**
   * Parse elements of the response array and structuring them into response object
   *
   * @param method - method name
   * @param response  - response from the method
   * @return - parsed response corresponding to the abi
   */
  protected parseResponse(method: string, response: string[]): Result {
    const { outputs } = this.abi.find((abi) => abi.name === method) as FunctionAbi;
    const responseIterator = response.flat()[Symbol.iterator]();
    const resultObject = outputs.flat().reduce((acc, output) => {
      acc[output.name] = this.parseResponseField(responseIterator, output, acc);
      if (acc[output.name] && acc[`${output.name}_len`]) {
        delete acc[`${output.name}_len`];
      }
      return acc;
    }, {} as Args);
    return Object.entries(resultObject).reduce((acc, [key, value]) => {
      acc.push(value);
      acc[key] = value;
      return acc;
    }, [] as Result);
  }
}
