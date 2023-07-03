import { Abi, FunctionAbi } from '../../../types';

export abstract class AbiParserInterface {
  /**
   * Helper to calculate inputs from abi
   * @param abiMethod FunctionAbi
   */
  public abstract methodInputsLength(abiMethod: FunctionAbi): number;
  public abstract getMethod(name: string): FunctionAbi | undefined;
  public abstract getLegacyFormat(): Abi;
}
