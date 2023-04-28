import { BlockIdentifier } from '../provider/utils';
import { BigNumberish } from '../utils/num';
import { RawArgsArray, Signature } from './lib';

export type AsyncContractFunction<T = any> = (...args: ArgsOrCalldataWithOptions) => Promise<T>;
export type ContractFunction = (...args: ArgsOrCalldataWithOptions) => any;
export type Result =
  | {
      [key: string]: any;
    }
  | Result[]
  | bigint
  | string
  | boolean;

/**
 * Compiled calldata ready to be sent
 * decimal-string array
 */
export type Calldata = string[] & { readonly __compiled__?: boolean };

export type ArgsOrCalldata = RawArgsArray | [Calldata] | Calldata;
export type ArgsOrCalldataWithOptions = ArgsOrCalldata & ContractOptions;
export type ContractOptions = {
  blockIdentifier?: BlockIdentifier;
  parseRequest?: boolean;
  parseResponse?: boolean;
  formatResponse?: { [key: string]: any };
  maxFee?: BigNumberish;
  nonce?: BigNumberish;
  signature?: Signature;
  addressSalt?: string;
};

export type CallOptions = Pick<
  ContractOptions,
  'blockIdentifier' | 'parseRequest' | 'parseResponse' | 'formatResponse'
>;

export type InvokeOptions = Pick<
  ContractOptions,
  'maxFee' | 'nonce' | 'signature' | 'parseRequest'
>;
