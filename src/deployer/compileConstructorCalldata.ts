import { ValidateType, type Abi, type Calldata, type RawArgs } from '../types';
import { CallData } from '../utils/calldata';
import { getCompiledCalldata } from '../utils/transaction/getCompiledCalldata';

/**
 * Compile the constructor calldata of a contract to deploy.
 *
 * - Calldata that is already compiled (it has the `__compiled__` mark) is returned as is.
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
 * const result2 = compileConstructorCalldata({ owner: '0x0b', token_uri_base: [] });
 * // result2 = ['11', '0']   no abi: flattened as given, in the order of the object keys
 * ```
 */
export function compileConstructorCalldata(constructorCalldata: RawArgs = [], abi?: Abi): Calldata {
  return getCompiledCalldata(constructorCalldata, () => {
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
}
