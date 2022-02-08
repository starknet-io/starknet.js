import BN from 'bn.js';
import assert from 'minimalistic-assert';

import { Provider, defaultProvider } from './provider';
import { BlockIdentifier } from './provider/utils';
import { Abi, AbiEntry, FunctionAbi, Signature, StructAbi } from './types';
import { BigNumberish, toBN } from './utils/number';

export type Struct = {
  type: 'struct';
  [k: string]: BigNumberish;
};
export type Args = {
  [inputName: string]: string | BigNumberish | BigNumberish[] | Struct | Struct[];
};

function parseFelt(candidate: string): BN {
  try {
    return toBN(candidate);
  } catch (e) {
    throw Error('Couldnt parse felt');
  }
}

function isFelt(candidate: string): boolean {
  try {
    parseFelt(candidate);
    return true;
  } catch (e) {
    return false;
  }
}

export function compileCalldata(args: Args): RawCalldata {
  return Object.values(args).flatMap((value) => {
    if (Array.isArray(value))
      return [toBN(value.length).toString(), ...value.map((x) => toBN(x).toString())];
    if (typeof value === 'object' && 'type' in value)
      return Object.entries(value)
        .filter(([k]) => k !== 'type')
        .map(([, v]) => toBN(v).toString());
    return toBN(value).toString();
  });
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

  public connect(address: string): Contract {
    this.connectedTo = address;
    return this;
  }

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
          assert(typeof arg === 'string', `arg ${input.name} should be a felt (string)`);
          assert(isFelt(arg as string), `arg ${input.name} should be decimal or hexadecimal`);
        } else if (typeof arg === 'object' && 'type' in arg) {
          assert(arg.type === 'struct', `arg ${input.name} should be a struct`);
        } else {
          assert(Array.isArray(arg), `arg ${input.name} should be a felt* (string[])`);
          (arg as string[]).forEach((felt, i) => {
            assert(
              typeof felt === 'string',
              `arg ${input.name}[${i}] should be a felt (string) as part of a felt* (string[])`
            );
            assert(
              isFelt(felt),
              `arg ${input.name}[${i}] should be decimal or hexadecimal as part of a felt* (string[])`
            );
          });
        }
      }
    });
  }

  private parseResponseField(
    responseIterator: Iterator<string>,
    output: AbiEntry,
    parsedResult?: Args
  ): any {
    const { name, type } = output;
    let arrLen: number;
    const parsedDataArr: (BigNumberish | Struct)[] = [];
    switch (true) {
      case /_len/.test(name):
        return parseFelt(responseIterator.next().value).toNumber();
      case /\(felt/.test(type):
        return type.split(',').reduce((acc) => {
          acc.push(parseFelt(responseIterator.next().value));
          return acc;
        }, [] as BigNumberish[]);
      case /\*/.test(type):
        if (parsedResult && parsedResult[`${name}_len`]) {
          arrLen = parsedResult[`${name}_len`] as number;
          for (let i = 0; i < arrLen; i += 1) {
            parsedDataArr.push(this.parseStructOrFelt(responseIterator, output));
          }
        }
        return parsedDataArr;
      case type in this.structs:
        return this.parseStructOrFelt(responseIterator, output);
      default:
        return parseFelt(responseIterator.next().value);
    }
  }

  private parseStructOrFelt(
    responseIterator: Iterator<string>,
    output: AbiEntry
  ): BigNumberish | Struct {
    const type = output.type.replace(/\*/, '');
    if (type in this.structs && this.structs[type]) {
      return this.structs[type].members.reduce((acc, el) => {
        acc[el.name] = this.parseStructOrFelt(responseIterator, el);
        return acc;
      }, {} as any);
    }
    return parseFelt(responseIterator.next().value);
  }

  private parseResponse(method: string, response: string[]): Args {
    const { outputs } = this.abi.find((abi) => abi.name === method) as FunctionAbi;
    const responseIterator = response.flat()[Symbol.iterator]();
    return outputs.flat().reduce((acc, output) => {
      acc[output.name] = this.parseResponseField(responseIterator, output, acc);
      return acc;
    }, {} as Args);
  }

  public invoke(method: string, args: Args = {}, signature?: Signature) {
    // ensure contract is connected
    assert(this.connectedTo !== null, 'contract isnt connected to an address');

    // validate method and args
    this.validateMethodAndArgs('INVOKE', method, args);

    // compile calldata
    const calldata = compileCalldata(args);

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

    // compile calldata
    const calldata = compileCalldata(args);
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
