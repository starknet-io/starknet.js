import BN from 'bn.js';
import assert from 'minimalistic-assert';

import { Provider, defaultProvider } from './provider';
import { Abi, AbiEntry, FunctionAbi, RawCalldata, Signature, StructAbi } from './types';
import { BigNumberish, toBN } from './utils/number';

export type Args = {
  [inputName: string]: string | string[] | { type: 'struct'; [k: string]: BigNumberish };
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

  abi: Abi[];

  structs: { [name: string]: StructAbi };

  provider: Provider;

  /**
   * Contract class to handle contract methods
   *
   * @param abi - Abi of the contract object
   * @param address (optional) - address to connect to
   */
  constructor(abi: Abi[], address: string | null = null, provider: Provider = defaultProvider) {
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
    element: AbiEntry | FunctionAbi,
    responseIterator: Iterator<string>
  ): Args {
    let entries: AbiEntry[] = [];
    if (['felt', 'felt*'].includes(element.type)) {
      return responseIterator.next().value;
    }
    if (element.type in this.structs) {
      entries = this.structs[element.type].members;
    } else if ('outputs' in element) {
      entries = element.outputs;
    }
    return entries.reduce(
      (acc, member) => ({
        ...acc,
        [member.name]: this.parseResponseField(member, responseIterator),
      }),
      {}
    );
  }

  private parseResponse(method: string, response: string[]): Args {
    const methodAbi = this.abi.find((abi) => abi.name === method) as FunctionAbi;
    const responseIterator = response.flat()[Symbol.iterator]();
    return this.parseResponseField(methodAbi, responseIterator);
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

  public async call(method: string, args: Args = {}) {
    // ensure contract is connected
    assert(this.connectedTo !== null, 'contract isnt connected to an address');

    // validate method and args
    this.validateMethodAndArgs('CALL', method, args);

    // compile calldata
    const calldata = compileCalldata(args);

    return this.provider
      .callContract({
        contractAddress: this.connectedTo,
        entrypoint: method,
        calldata,
      })
      .then((x) => this.parseResponse(method, x.result));
  }
}
