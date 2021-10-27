import assert from 'assert';
import { BigNumber } from '@ethersproject/bignumber';
import { Abi } from './types';
import { getSelectorFromName } from './utils';
import { addTransaction, callContract } from './starknet';

type Args = { [inputName: string]: string | string[] };
type Calldata = string[];

const parseFelt = (candidate: string): BigNumber => {
  try {
    return BigNumber.from(candidate);
  } catch (e) {
    throw Error('Couldnt parse felt');
  }
};

const isFelt = (candidate: string): boolean => {
  try {
    parseFelt(candidate);
    return true;
  } catch (e) {
    return false;
  }
};

export class Contract {
  connectedTo: string | null = null;

  abi: Abi[];

  /**
   * Contract class to handle contract methods
   *
   * @param abi - Abi of the contract object
   * @param address (optional) - address to connect to
   */
  constructor(abi: Abi[], address: string | null = null) {
    this.connectedTo = address;
    this.abi = abi;
  }

  public connect(address: string): Contract {
    this.connectedTo = address;
    return this;
  }

  public static compileCalldata(args: Args): Calldata {
    return Object.values(args).flatMap((value) => {
      if (Array.isArray(value))
        return [
          BigNumber.from(value.length).toString(),
          ...value.map((x) => BigNumber.from(x).toString()),
        ];
      return BigNumber.from(value).toString();
    });
  }

  private validateMethodAndArgs(type: 'INVOKE' | 'CALL', method: string, args: Args = {}) {
    // ensure provided method exists
    const invokeableFunctionNames = this.abi
      .filter((abi) => {
        const isView = abi.stateMutability === 'view';
        const isFunction = abi.type === 'function';
        return isFunction && type === 'INVOKE' ? !isView : isView;
      })
      .map((abi) => abi.name);
    assert(
      invokeableFunctionNames.includes(method),
      `${type === 'INVOKE' ? 'invokeable' : 'viewable'} method not found in abi`
    );

    // ensure args match abi type
    const methodAbi = this.abi.find((abi) => abi.name === method)!;
    methodAbi.inputs.forEach((input) => {
      if (args[input.name] !== undefined) {
        if (input.type === 'felt') {
          assert(
            typeof args[input.name] === 'string',
            `arg ${input.name} should be a felt (string)`
          );
          assert(
            isFelt(args[input.name] as string),
            `arg ${input.name} should be decimal or hexadecimal`
          );
        } else {
          assert(Array.isArray(args[input.name]), `arg ${input.name} should be a felt* (string[])`);
          (args[input.name] as string[]).forEach((felt, i) => {
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

  private parseResponse(method: string, response: (string | string[])[]): Args {
    const methodAbi = this.abi.find((abi) => abi.name === method)!;
    return methodAbi.outputs.reduce((acc, output, i) => {
      return {
        ...acc,
        [output.name]: response[i],
      };
    }, {} as Args);
  }

  public invoke(method: string, args: Args = {}) {
    // ensure contract is connected
    assert(this.connectedTo !== null, 'contract isnt connected to an address');

    // validate method and args
    this.validateMethodAndArgs('INVOKE', method, args);

    // compile calldata
    const entrypointSelector = getSelectorFromName(method);
    const calldata = Contract.compileCalldata(args);

    return addTransaction({
      type: 'INVOKE_FUNCTION',
      contract_address: this.connectedTo,
      calldata,
      entry_point_selector: entrypointSelector,
    });
  }

  public async call(method: string, args: Args = {}) {
    // ensure contract is connected
    assert(this.connectedTo !== null, 'contract isnt connected to an address');

    // validate method and args
    this.validateMethodAndArgs('CALL', method, args);

    // compile calldata
    const entrypointSelector = getSelectorFromName(method);
    const calldata = Contract.compileCalldata(args);

    return callContract({
      contract_address: this.connectedTo,
      calldata,
      entry_point_selector: entrypointSelector,
    }).then((x) => this.parseResponse(method, x.result));
  }
}
