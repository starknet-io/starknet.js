export abstract class CairoType {
  // Static methods cannot be abstract, but can provide base implementation
  // TODO: Check when ts resolves this issue

  /**
   * Check if the provided data is a valid CairoType
   * @param _data - The data to check
   * @returns True if the data is a valid CairoType, false otherwise
   */
  static is(_data: any, _type?: string): boolean {
    throw new Error('Static method must be implemented by derived class');
  }

  /**
   * Factory method to create a CairoType from the API response
   * @param _responseIterator - The iterator of the API response
   * @returns The created CairoType
   */
  /*   static factoryFromApiResponse(
    _responseIterator: Iterator<string>,
    _arrayType?: string,
    _strategy?: ParsingStrategy
  ): CairoType {
    throw new Error('Static method must be implemented by derived class');
  } */

  /**
   * Check if the provided abi type is this data type
   * @param _abiType - The abi type to check
   * @returns True if the abi type is this data type, false otherwise
   */
  static isAbiType(_abiType: string): boolean {
    throw new Error('Static method must be implemented by derived class');
  }

  /**
   * Convert the CairoType to the API request format
   */
  abstract toApiRequest(): any;
}
