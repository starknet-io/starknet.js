import { Calldata } from './api';
import { RawArgsArray } from './lib';

export type AsyncContractFunction<T = any> = (...args: Array<any>) => Promise<T>;
export type ContractFunction = (...args: Array<any>) => any;
export type Result =
  | {
      [key: string]: any;
    }
  | Result[]
  | bigint
  | string
  | boolean;
export type ArgsOrCalldata = RawArgsArray | [Calldata] | Calldata;
