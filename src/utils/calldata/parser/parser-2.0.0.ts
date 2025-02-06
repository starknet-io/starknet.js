import {
  Abi,
  FunctionAbi,
  AbiEvent,
  AbiStruct,
  InterfaceAbi,
  type LegacyEvent,
} from '../../../types';
import { AbiParserInterface } from './interface';

export class AbiParser2 implements AbiParserInterface {
  abi: Abi;

  constructor(abi: Abi) {
    this.abi = abi;
  }

  /**
   * abi method inputs length
   * @param abiMethod FunctionAbi
   * @returns number
   */
  public methodInputsLength(abiMethod: FunctionAbi) {
    return abiMethod.inputs.length;
  }

  /**
   * get method definition from abi
   * @param name string
   * @returns FunctionAbi | undefined
   */
  public getMethod(name: string): FunctionAbi | undefined {
    const intf = this.abi.find(
      (it: FunctionAbi | AbiEvent | AbiStruct | InterfaceAbi) => it.type === 'interface'
    ) as InterfaceAbi;
    return intf?.items?.find((it) => it.name === name);
  }

  /**
   * Get Abi in legacy format
   * @returns Abi
   */
  public getLegacyFormat(): Abi {
    return this.abi.flatMap((it: FunctionAbi | LegacyEvent | AbiStruct | InterfaceAbi) => {
      return it.type === 'interface' ? it.items : it;
    });
  }
}
