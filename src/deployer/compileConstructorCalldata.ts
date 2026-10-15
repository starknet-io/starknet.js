import {
  ValidateType,
  type Abi,
  type Args,
  type Calldata,
  type FunctionAbi,
  type RawArgs,
} from '../types';
import { CallData } from '../utils/calldata';
import { getCompiledCalldata } from '../utils/transaction/getCompiledCalldata';

/**
 * Check constructor calldata that is already compiled, with the codec only: its felts are read
 * back with the constructor parameter types of the abi, then the values read are written again,
 * and the felts must come out the same. Every check the codec makes on parameters thus applies to
 * these felts too: a wrong layout, a value out of the range of its type, a NonZero at zero,
 * missing felts or felts left over are refused. A contract with no constructor takes no felt.
 * @param {Calldata} calldata the compiled constructor calldata
 * @param {Abi} abi the abi of the contract to deploy
 * @example
 * ```typescript
 * // abi of a contract with: constructor(owner: ContractAddress, token_uri_base: Span<felt252>)
 * checkCompiledConstructorCalldata(['11', '0'], abi);
 * // no error
 * checkCompiledConstructorCalldata(['11', '0', '5'], abi);
 * // throws Error: The compiled constructor calldata does not match the abi: it has 1 felt too many
 * checkCompiledConstructorCalldata(['11'], abi);
 * // throws Error: The compiled constructor calldata does not match the abi: it has fewer felts than the constructor takes
 * ```
 */
function checkCompiledConstructorCalldata(calldata: Calldata, abi: Abi): void {
  const calldataClass = new CallData(abi);
  // found by its name only, as in `CallData`: a Cairo V1 abi declares it as a `function`
  const constructorAbi = calldataClass.abi.find((entry) => entry.name === 'constructor') as
    | FunctionAbi
    | undefined;
  if (!constructorAbi) {
    if (calldata.length > 0) {
      throw Error('Cannot pass calldata to a contract with no constructor');
    }
    return;
  }
  // stops at the last felt, instead of handing `undefined` to the reader
  let index = 0;
  const felts: Iterator<string> = {
    next: () => {
      if (index >= calldata.length) {
        throw Error('it has fewer felts than the constructor takes');
      }
      index += 1;
      return { value: String(calldata[index - 1]), done: false };
    },
  };
  const parsed: Args = {};
  try {
    constructorAbi.inputs.forEach((input) => {
      parsed[input.name] = calldataClass.parser.parseResponse(felts, input, parsed);
    });
  } catch (error) {
    throw Error(
      `The compiled constructor calldata does not match the abi: ${(error as Error).message}`
    );
  }
  const leftover = calldata.length - index;
  if (leftover > 0) {
    throw Error(
      `The compiled constructor calldata does not match the abi: it has ${leftover} felt${leftover > 1 ? 's' : ''} too many`
    );
  }
  // write the values again, as named parameters: the codec checks them as it writes them
  let written: Calldata;
  try {
    written = calldataClass.compile('constructor', parsed);
  } catch (error) {
    throw Error(
      `The compiled constructor calldata does not match the abi: ${(error as Error).message}`
    );
  }
  const sameFelts =
    written.length === calldata.length &&
    written.every((felt, i) => BigInt(felt) === BigInt(calldata[i]));
  if (!sameFelts) {
    throw Error(
      'The compiled constructor calldata does not match the abi: the abi writes the values it holds with other felts'
    );
  }
}

/**
 * Compile the constructor calldata of a contract to deploy.
 *
 * - Calldata that is already compiled (it has the `__compiled__` mark) is kept as is. With an
 *   abi, its felts are first read back with the constructor parameter types, to check them.
 * - With an abi, the calldata is read as the constructor parameters and checked against the abi.
 * - Without an abi, the calldata is flattened as given, with no check.
 * @param {RawArgs} constructorCalldata the constructor parameters, or calldata already compiled
 * @param {Abi} [abi] the abi of the contract to deploy
 * @returns {Calldata} the compiled constructor calldata
 * @example
 * ```typescript
 * // abi of a contract with: constructor(owner: ContractAddress, token_uri_base: Span<felt252>)
 * const result = compileConstructorCalldata(['0x0b', []], abi);
 * // result = ['11', '0']
 * compileConstructorCalldata([], abi);
 * // throws Error: Invalid number of arguments, expected 2 arguments, but got 0
 * compileConstructorCalldata(CallData.compile(['0x0b', 0, 5]), abi);
 * // throws Error: The compiled constructor calldata does not match the abi: it has 1 felt too many
 * const result2 = compileConstructorCalldata({ owner: '0x0b', token_uri_base: [] });
 * // result2 = ['11', '0']   no abi: flattened as given, in the order of the object keys
 * ```
 */
export function compileConstructorCalldata(constructorCalldata: RawArgs = [], abi?: Abi): Calldata {
  let compiledHere = false;
  const calldata = getCompiledCalldata(constructorCalldata, () => {
    compiledHere = true;
    // compile with abi
    if (abi) {
      const calldataClass = new CallData(abi);
      // Array-shaped calldata is already positional: validate its length up front.
      // Object-shaped calldata must keep its field names until `compile()`, which
      // orders them by ABI name — flattening here first would make that ordering
      // depend on JS insertion order instead.
      if (Array.isArray(constructorCalldata)) {
        calldataClass.validate(ValidateType.DEPLOY, 'constructor', constructorCalldata);
      }
      return calldataClass.compile('constructor', constructorCalldata);
    }
    // compile without abi
    return CallData.compile(constructorCalldata);
  });
  // Felts that came already compiled skipped the abi above: they are read back with it, so that
  // a mistake in them is refused here too, before anything is sent.
  if (abi && !compiledHere) {
    checkCompiledConstructorCalldata(calldata, abi);
  }
  return calldata;
}
