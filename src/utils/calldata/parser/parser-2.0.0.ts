import { Abi, FunctionAbi } from '../../../types';
import { AbiParserInterface } from './interface';

export class AbiParser2 implements AbiParserInterface {
  abi: Abi;

  constructor(abi: Abi) {
    this.abi = abi;
  }

  /**
   * abi method inputs length without
   * @param abiMethod FunctionAbi
   * @returns number
   */
  public methodInputsLength(abiMethod: FunctionAbi) {
    return abiMethod.inputs.length;
  }

  public getMethod(name: string): FunctionAbi | undefined {
    const intf = this.abi.find((it) => it.type === 'interface');
    return intf.items.find((it) => it.name === name);
  }

  public getLegacyFormat() {
    return this.abi.flatMap((e) => {
      if (e.type === 'interface') {
        return e.items;
      }
      return e;
    });
  }
}
