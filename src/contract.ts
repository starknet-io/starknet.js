import BN from 'bn.js';
import assert from 'minimalistic-assert';

import { Provider, defaultProvider } from './provider';
import { BlockIdentifier } from './provider/utils';
import { Abi, AbiEntry, Calldata, FunctionAbi, Signature, StructAbi } from './types';
import { BigNumberish, toBN, toFelt } from './utils/number';

export type Struct = {
  type: 'struct';
  [k: string]: BigNumberish;
};
export type ParsedStruct = {
  [key: string]: BigNumberish | ParsedStruct;
};
export type Args = {
  [inputName: string]: BigNumberish | BigNumberish[] | ParsedStruct | ParsedStruct[];
};

function parseFelt(candidate: string): BN {
  try {
    return toBN(candidate);
  } catch (e) {
    throw Error('Couldnt parse felt');
  }
}

export class Contract {
  connectedTo: string | null = null;

  abi: Abi;

  structs: { [name: string]: StructAbi };

  provider: Provider;

  /**
   * Contract class to handle contract methods
   *
   * @param abi - Abi of the contract object
   * @param address (optional) - address to connect to
   */
  constructor(abi: Abi, address: string | null = null, provider: Provider = defaultProvider) {
    this.connectedTo = address;
    this.provider = provider;
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
  }

  /**
   * Saves the address of the contract deployed on network that will be used for interaction
   *
   * @param address - address of the contract
   * @returns Contract
   */
  public connect(address: string): Contract {
    this.connectedTo = address;
    return this;
  }

  /**
   * Validates if all arguments that are passed to the method are corresponding to the ones in the abi
   *
   * @param type - type of the method
   * @param method  - name of the method
   * @param args - arguments that are passed to the method
   */
  private validateMethodAndArgs(type: 'INVOKE' | 'CALL', method: string, args: Args = {}) {
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
    methodAbi.inputs.forEach((input) => {
      const arg = args[input.name];
      if (arg !== undefined) {
        if (input.type === 'felt') {
          assert(
            typeof arg === 'string' || typeof arg === 'number' || arg instanceof BN,
            `arg ${input.name} should be a felt (string, number, BigNumber)`
          );
        } else if (typeof arg === 'object' && input.type in this.structs) {
          this.structs[input.type].members.forEach(({ name }) => {
            assert(Object.keys(arg).includes(name), `arg should have a property ${name}`);
          });
        } else {
          assert(Array.isArray(arg), `arg ${input.name} should be an Array`);
          if (input.type === 'felt*') {
            arg.forEach((felt) => {
              assert(
                typeof felt === 'string' || typeof felt === 'number' || felt instanceof BN,
                `arg ${input.name} should be an array of string, number or BigNumber`
              );
            });
          } else if (/\(felt/.test(input.type)) {
            const tupleLength = input.type.split(',').length;
            assert(
              arg.length === tupleLength,
              `arg ${input.name} should have ${tupleLength} elements in tuple`
            );
            arg.forEach((felt) => {
              assert(
                typeof felt === 'string' || typeof felt === 'number' || felt instanceof BN,
                `arg ${input.name} should be an array of string, number or BigNumber`
              );
            });
          } else {
            const arrayType = input.type.replace('*', '');
            arg.forEach((struct) => {
              this.structs[arrayType].members.forEach(({ name }) => {
                assert(
                  Object.keys(struct).includes(name),
                  `arg ${input.name} should be an array of ${arrayType}`
                );
              });
            });
          }
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
  private parseCalldataObject(
    element: ParsedStruct | BigNumberish,
    type: string
  ): string | string[] {
    if (element === undefined) {
      throw Error('Missing element in calldata object');
    }
    // checking if the passed element is struct or element in struct
    if (this.structs[type] && this.structs[type].members.length) {
      // going through all the members of the struct and parsing the value
      return this.structs[type].members.reduce((acc, member: AbiEntry) => {
        // if the member of the struct is another struct this will return array of the felts if not it will be single felt
        // TODO: refactor types so member name can be used as keyof ParsedStruct
        /* @ts-ignore */
        const parsedData = this.parseCalldataObject(element[member.name], member.type);
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
  private parseResponseStruct(
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
  private parsCalldataField(args: Args, input: AbiEntry): string | string[] {
    const { name, type } = input;
    const value = args[name];
    const propName = name.replace(/_len$/, '');
    switch (true) {
      case /_len$/.test(name):
        if (Array.isArray(args[propName])) {
          const arr = args[propName] as (BigNumberish | ParsedStruct)[];
          return toFelt(arr.length);
        }
        throw Error(`Expected ${propName} to be array`);
      case /\*/.test(type):
        if (Array.isArray(value)) {
          return (value as (BigNumberish | ParsedStruct)[]).reduce((acc, el) => {
            if (/felt/.test(type)) {
              acc.push(toFelt(el as BigNumberish));
            } else {
              acc.push(...this.parseCalldataObject(el, type.replace('*', '')));
            }
            return acc;
          }, [] as string[]);
        }
        throw Error(`Expected ${name} to be array`);
      case type in this.structs:
        return this.parseCalldataObject(value as ParsedStruct, type);
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
  private compileCalldata(args: Args, inputs: AbiEntry[]): Calldata {
    return inputs.reduce((acc, input) => {
      const parsedData = this.parsCalldataField(args, input);
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
  private parseResponseField(
    responseIterator: Iterator<string>,
    output: AbiEntry,
    parsedResult?: Args
  ): any {
    const { name, type } = output;
    let arrLen: number;
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
          arrLen = parsedResult[`${name}_len`] as number;
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
  private parseResponse(method: string, response: string[]): Args {
    const { outputs } = this.abi.find((abi) => abi.name === method) as FunctionAbi;
    const responseIterator = response.flat()[Symbol.iterator]();
    return outputs.flat().reduce((acc, output) => {
      acc[output.name] = this.parseResponseField(responseIterator, output, acc);
      if (acc[output.name] && acc[`${output.name}_len`]) {
        delete acc[`${output.name}_len`];
      }
      return acc;
    }, {} as Args);
  }

  public invoke(method: string, args: Args = {}, signature?: Signature) {
    // ensure contract is connected
    assert(this.connectedTo !== null, 'contract isnt connected to an address');
    // validate method and args
    this.validateMethodAndArgs('INVOKE', method, args);
    const { inputs } = this.abi.find((abi) => abi.name === method) as FunctionAbi;

    // compile calldata
    const calldata = this.compileCalldata(args, inputs);

    return this.provider.invokeFunction({
      contractAddress: this.connectedTo,
      signature,
      calldata,
      entrypoint: method,
    });
  }

  public async call(method: string, args: Args = {}, blockIdentifier: BlockIdentifier = null) {
    // ensure contract is connected
    assert(this.connectedTo !== null, 'contract isnt connected to an address');

    // validate method and args
    this.validateMethodAndArgs('CALL', method, args);
    const { inputs } = this.abi.find((abi) => abi.name === method) as FunctionAbi;

    // compile calldata
    const calldata = this.compileCalldata(args, inputs);
    return this.provider
      .callContract(
        {
          contractAddress: this.connectedTo,
          calldata,
          entrypoint: method,
        },
        blockIdentifier
      )
      .then((x) => this.parseResponse(method, x.result));
  }
}
