import {
  Abi,
  FunctionAbi,
  AbiEvent,
  AbiStruct,
  InterfaceAbi,
  type LegacyEvent,
} from '../../../types';
import { AbiParser1 } from './parser-1';

/**
 * The abi parser for an abi that groups its functions under an `interface` entry.
 *
 * It is chosen when `getAbiVersion` answers 2, which is decided by the mere presence of that
 * entry — the format Cairo has emitted since compiler 2, mid-2023, and so what every contract
 * declared on Starknet today looks like.
 *
 * Everything it does differently from {@link AbiParser1} follows from that one nesting : a method
 * is looked up among the interface's `items` rather than at the top level, and `getLegacyFormat`
 * unwraps those items back into a flat list for the rest of the library. The types are the same
 * Cairo 1 types, serialized the same way — an abi of this shape stripped of its `interface` entry
 * would be parsed by {@link AbiParser1} with the same result.
 *
 * An abi can hold several interfaces; only the first one is searched for a method.
 * @example
 * ```typescript
 * const abi = [
 *   {
 *     type: 'interface',
 *     name: 'test::IBalance',
 *     items: [
 *       {
 *         type: 'function',
 *         name: 'get_balance',
 *         inputs: [],
 *         outputs: [{ type: 'core::integer::u256' }],
 *         state_mutability: 'view',
 *       },
 *     ],
 *   },
 * ];
 * const parser = new AbiParser2(abi);
 * const result = parser.getMethod('get_balance')?.name;
 * // result = "get_balance"
 * const result2 = parser.getLegacyFormat().length;
 * // result2 = 1     the interface replaced by the single item it held
 * ```
 */
export class AbiParser2 extends AbiParser1 {
  /**
   * Find a method by name, among the items of the abi's interface.
   *
   * Only the first `interface` entry is searched, so a method declared in a second one is not
   * found here.
   * @param {string} name the method to look for
   * @returns {FunctionAbi | undefined} the method, or nothing when the interface has no such name
   * @example
   * ```typescript
   * const result = new AbiParser2(abi).getMethod('get_balance')?.name;
   * // result = "get_balance"
   * ```
   */
  public getMethod(name: string): FunctionAbi | undefined {
    const intf = this.abi.find(
      (it: FunctionAbi | AbiEvent | AbiStruct | InterfaceAbi) => it.type === 'interface'
    ) as InterfaceAbi;
    return intf?.items?.find((it) => it.name === name);
  }

  /**
   * The abi as a flat list of entries, each interface replaced by the items it held.
   *
   * That flat shape is what the rest of the library reads — `CallData` looks a method up in it —
   * and it is exactly the shape {@link AbiParser1} is handed to begin with.
   * @returns {Abi} the abi with its interfaces unwrapped
   * @example
   * ```typescript
   * const result = new AbiParser2(abi).getLegacyFormat().length;
   * // result = 1     the interface replaced by the single item it held
   * ```
   */
  public getLegacyFormat(): Abi {
    return this.abi.flatMap((it: FunctionAbi | LegacyEvent | AbiStruct | InterfaceAbi) => {
      return it.type === 'interface' ? it.items : it;
    });
  }
}
