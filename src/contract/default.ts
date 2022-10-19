import BN from 'bn.js';
import assert from 'minimalistic-assert';

import { AccountInterface } from '../account';
import { ProviderInterface, defaultProvider } from '../provider';
import { BlockIdentifier } from '../provider/utils';
import {
  Abi,
  AbiEntry,
  Args,
  AsyncContractFunction,
  Call,
  Calldata,
  ContractFunction,
  FunctionAbi,
  InvokeFunctionResponse,
  Overrides,
  ParsedStruct,
  Result,
  StructAbi,
} from '../types';
import { BigNumberish, toBN, toFelt } from '../utils/number';
import { ContractInterface } from './interface';

function parseFelt(candidate: string): BN {
  try {
    return toBN(candidate);
  } catch (e) {
    throw Error('Couldnt parse felt');
  }
}

/**
 * Adds call methods to the contract
 *
 */
function buildCall(contract: Contract, functionAbi: FunctionAbi): AsyncContractFunction {
  return async function (...args: Array<any>): Promise<any> {
    return contract.call(functionAbi.name, args);
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
    {
      blockIdentifier = 'pending',
    }: {
      blockIdentifier?: BlockIdentifier;
    } = {}
  ): Promise<Result> {
    // ensure contract is connected
    assert(this.address !== null, 'contract is not connected to an address');

    // validate method and args
    this.validateMethodAndArgs('CALL', method, args);
    const { inputs } = this.abi.find((abi) => abi.name === method) as FunctionAbi;

    // compile calldata
    const calldata = this.compileCalldata(args, inputs);
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
    this.validateMethodAndArgs('INVOKE', method, args);

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
    const calldata = this.compileCalldata(args, inputs);

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
    this.validateMethodAndArgs('INVOKE', method, args);
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
      calldata: this.compileCalldata(args, inputs),
    };
  }

  /**
   * Deep parse of the object that has been passed to the method
   *
   * @param struct - struct that needs to be calculated
   * @return {number} - number of members for the given struct
   */
  private calculateStructMembers(struct: string): number {
    return this.structs[struct].members.reduce((acc, member) => {
      if (member.type === 'felt') {
        return acc + 1;
      }
      return acc + this.calculateStructMembers(member.type);
    }, 0);
  }

  /**
   * Validates if all arguments that are passed to the method are corresponding to the ones in the abi
   *
   * @param type - type of the method
   * @param method  - name of the method
   * @param args - arguments that are passed to the method
   */
  protected validateMethodAndArgs(type: 'INVOKE' | 'CALL', method: string, args: Array<any> = []) {
    // ensure provided method exists
    const invokeableFunctionNames = this.abi
      .filter((abi) => {
        if (abi.type !== 'function') return false;
        const isView = abi.stateMutability === 'view';
        return type === 'INVOKE' ? !isView : isView;
      })
      .map((abi) => abi.name);
    assert(
      invokeableFunctionNames.includes(method),
      `${type === 'INVOKE' ? 'invokeable' : 'viewable'} method not found in abi`
    );

    // ensure args match abi type
    const methodAbi = this.abi.find(
      (abi) => abi.name === method && abi.type === 'function'
    ) as FunctionAbi;
    let argPosition = 0;
    methodAbi.inputs.forEach((input) => {
      if (/_len$/.test(input.name)) {
        return;
      }
      if (input.type === 'felt') {
        assert(
          typeof args[argPosition] === 'string' ||
            typeof args[argPosition] === 'number' ||
            args[argPosition] instanceof BN,
          `arg ${input.name} should be a felt (string, number, BigNumber)`
        );
        argPosition += 1;
      } else if (input.type in this.structs && typeof args[argPosition] === 'object') {
        if (Array.isArray(args[argPosition])) {
          const structMembersLength = this.calculateStructMembers(input.type);
          assert(
            args[argPosition].length === structMembersLength,
            `arg should be of length ${structMembersLength}`
          );
        } else {
          this.structs[input.type].members.forEach(({ name }) => {
            assert(
              Object.keys(args[argPosition]).includes(name),
              `arg should have a property ${name}`
            );
          });
        }
        argPosition += 1;
      } else {
        assert(Array.isArray(args[argPosition]), `arg ${input.name} should be an Array`);
        if (input.type === 'felt*') {
          args[argPosition].forEach((felt: BigNumberish) => {
            assert(
              typeof felt === 'string' || typeof felt === 'number' || felt instanceof BN,
              `arg ${input.name} should be an array of string, number or BigNumber`
            );
          });
          argPosition += 1;
        } else if (/\(felt/.test(input.type)) {
          const tupleLength = input.type.split(',').length;
          assert(
            args[argPosition].length === tupleLength,
            `arg ${input.name} should have ${tupleLength} elements in tuple`
          );
          args[argPosition].forEach((felt: BigNumberish) => {
            assert(
              typeof felt === 'string' || typeof felt === 'number' || felt instanceof BN,
              `arg ${input.name} should be an array of string, number or BigNumber`
            );
          });
          argPosition += 1;
        } else {
          const arrayType = input.type.replace('*', '');
          args[argPosition].forEach((struct: any) => {
            this.structs[arrayType].members.forEach(({ name }) => {
              if (Array.isArray(struct)) {
                const structMembersLength = this.calculateStructMembers(arrayType);
                assert(
                  struct.length === structMembersLength,
                  `arg should be of length ${structMembersLength}`
                );
              } else {
                assert(
                  Object.keys(struct).includes(name),
                  `arg ${input.name} should be an array of ${arrayType}`
                );
              }
            });
          });
          argPosition += 1;
        }
      }
    });
  }

  /**
   * Deep parse of the object that has been passed to the method
   *
   * @param element - element that needs to be parsed
   * @param type  - name of the method
   * @return {string | string[]} - parsed arguments in format that contract is expecting
   */

  protected parseCalldataValue(
    element: ParsedStruct | BigNumberish | BigNumberish[],
    type: string
  ): string | string[] {
    if (element === undefined) {
      throw Error('Missing element in calldata');
    }
    if (Array.isArray(element)) {
      const structMemberNum = this.calculateStructMembers(type);
      if (element.length !== structMemberNum) {
        throw Error('Missing element in calldata');
      }
      return element.map((el) => toFelt(el));
    }
    // checking if the passed element is struct or element in struct
    if (this.structs[type] && this.structs[type].members.length) {
      // going through all the members of the struct and parsing the value
      return this.structs[type].members.reduce((acc, member: AbiEntry) => {
        // if the member of the struct is another struct this will return array of the felts if not it will be single felt
        // TODO: refactor types so member name can be used as keyof ParsedStruct
        /* @ts-ignore */
        const parsedData = this.parseCalldataValue(element[member.name], member.type);
        if (typeof parsedData === 'string') {
          acc.push(parsedData);
        } else {
          acc.push(...parsedData);
        }
        return acc;
      }, [] as string[]);
    }
    return toFelt(element as BigNumberish);
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
   * Parse one field of the calldata by using input field from the abi for that method
   *
   * @param args - value of the field
   * @param input  - input(field) information from the abi that will be used to parse the data
   * @return {string | string[]} - parsed arguments in format that contract is expecting
   */
  protected parseCalldataField(argsIterator: Iterator<any>, input: AbiEntry): string | string[] {
    const { name, type } = input;
    const { value } = argsIterator.next();

    const parsedCalldata: string[] = [];
    switch (true) {
      case /\*/.test(type):
        if (Array.isArray(value)) {
          parsedCalldata.push(toFelt(value.length));
          return (value as (BigNumberish | ParsedStruct)[]).reduce((acc, el) => {
            if (/felt/.test(type)) {
              acc.push(toFelt(el as BigNumberish));
            } else {
              acc.push(...this.parseCalldataValue(el, type.replace('*', '')));
            }
            return acc;
          }, parsedCalldata);
        }
        throw Error(`Expected ${name} to be array`);
      case type in this.structs:
        return this.parseCalldataValue(value as ParsedStruct | BigNumberish[], type);
      case /\(felt/.test(type):
        if (Array.isArray(value)) {
          return value.map((el) => toFelt(el as BigNumberish));
        }
        throw Error(`Expected ${name} to be array`);
      default:
        return toFelt(value as BigNumberish);
    }
  }

  /**
   * Parse the calldata by using input fields from the abi for that method
   *
   * @param args - arguments passed the the method
   * @param inputs  - list of inputs(fields) that are in the abi
   * @return {Calldata} - parsed arguments in format that contract is expecting
   */
  protected compileCalldata(args: Array<any>, inputs: AbiEntry[]): Calldata {
    const argsIterator = args[Symbol.iterator]();
    return inputs.reduce((acc, input) => {
      if (/_len$/.test(input.name)) {
        return acc;
      }
      const parsedData = this.parseCalldataField(argsIterator, input);
      if (Array.isArray(parsedData)) {
        acc.push(...parsedData);
      } else {
        acc.push(parsedData);
      }
      return acc;
    }, [] as Calldata);
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
