import { Abi, AbiEntryType, FunctionAbi } from '../../../types';
import { ParsingStrategy } from './parsingStrategy';

/**
 * Abi parser interface
 */
export abstract class AbiParserInterface {
  abstract parsingStrategy: ParsingStrategy;

  /**
   * Helper to calculate inputs length from abi
   * @param abiMethod FunctionAbi
   * @return number
   */
  public abstract methodInputsLength(abiMethod: FunctionAbi): number;

  /**
   * get method definition from abi
   * @param name string
   * @returns FunctionAbi | undefined
   */
  public abstract getMethod(name: string): FunctionAbi | undefined;

  /**
   * Return Abi in legacy format
   * @return Abi
   */
  public abstract getLegacyFormat(): Abi;

  /**
   * Get request parser for the given abi type
   * @param abiType AbiEntryType
   * @returns Parser function
   */
  public abstract getRequestParser(abiType: AbiEntryType): (val: unknown, type?: string) => any;

  /**
   * Get response parser for the given abi type
   * @param abiType AbiEntryType
   * @returns Parser function
   */
  public abstract getResponseParser(
    abiType: AbiEntryType
  ): (responseIterator: Iterator<string>, type?: string) => any;
}
