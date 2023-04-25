import { AccountInterface } from '../account';
import { ProviderInterface, defaultProvider } from '../provider';
import {
  Abi,
  AsyncContractFunction,
  Call,
  ContractFunction,
  FunctionAbi,
  InvokeFunctionResponse,
  Overrides,
  Result,
  StructAbi,
} from '../types';
import assert from '../utils/assert';
import { CallData } from '../utils/calldata';
import { CallOptions, ContractInterface } from './interface';

const splitArgsAndOptions = (args: any) => {
  const options = [
    'blockIdentifier',
    'parseRequest',
    'parseResponse',
    'formatResponse',
    'maxFee',
    'nonce',
    'signature',
  ];
  const lastArg = args[args.length - 1];
  if (typeof lastArg === 'object' && options.some((x) => x in lastArg)) {
    return { args, options: args.pop() };
  }
  return { args, options: {} };
};

/**
 * Adds call methods to the contract
 */
function buildCall(contract: Contract, functionAbi: FunctionAbi): AsyncContractFunction {
  return async function (...args: Array<any>): Promise<any> {
    const params = splitArgsAndOptions(args);
    return contract.call(functionAbi.name, params.args, {
      parseRequest: true,
      parseResponse: true,
      ...params.options,
    });
  };
}

/**
 * Adds invoke methods to the contract
 */
function buildInvoke(contract: Contract, functionAbi: FunctionAbi): AsyncContractFunction {
  return async function (...args: Array<any>): Promise<any> {
    const params = splitArgsAndOptions(args);
    return contract.invoke(functionAbi.name, params.args, {
      parseRequest: true,
      ...params.options,
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

/**
 * Not used at the moment
 */
/* const detectCairoVersion = (abi: Abi) => {
  if (!abi) return '0';
  return abi.find((it) => 'state_mutability' in it) ? '1' : '0';
}; */

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

  private callData: CallData;

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
    this.abi = abi;

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
  ): Promise<Result> {
    assert(this.address !== null, 'contract is not connected to an address');
    const blockIdentifier = options?.blockIdentifier || undefined;
    let calldata = 'compiled' in args ? args : args[0];

    if (options.parseRequest && !calldata?.compiled) {
      const { inputs } = this.abi.find((abi) => abi.name === method) as FunctionAbi;

      this.callData.validate('CALL', method, args);
      calldata = this.callData.compile(args, inputs);
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
          return this.callData.format(method, x.result, options.formatResponse);
        }
        return this.callData.parse(method, x.result);
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
    let calldata = 'compiled' in args ? args : args[0];

    if (options.parseRequest && !calldata?.compiled) {
      const { inputs } = this.abi.find((abi) => abi.name === method) as FunctionAbi;

      this.callData.validate('INVOKE', method, args);
      calldata = this.callData.compile(args, inputs);
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
        signature: options.signature,
      },
      {
        nonce: options.nonce,
      }
    );
  }

  public async estimate(method: string, args: Array<any> = []) {
    assert(this.address !== null, 'contract is not connected to an address');

    if (!args[0]?.compiled) {
      this.callData.validate('INVOKE', method, args);
    }

    const invocation = this.populateTransaction[method](...args);
    if ('estimateInvokeFee' in this.providerOrAccount) {
      return this.providerOrAccount.estimateInvokeFee(invocation);
    }
    throw Error('Contract must be connected to the account contract to estimate');
  }

  public populate(method: string, args: Array<any> = []): Call {
    const { inputs } = this.abi.find((abi) => abi.name === method) as FunctionAbi;
    const calldata = args?.[0]?.compiled ? args?.[0] : this.callData.compile(args, inputs);

    return {
      contractAddress: this.address,
      entrypoint: method,
      calldata,
    };
  }
}
