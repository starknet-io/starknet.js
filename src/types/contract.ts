import { CairoEnum } from './cairoEnum';
import {
  BigNumberish,
  BlockIdentifier,
  Calldata,
  ParsedStruct,
  RawArgsArray,
  Signature,
} from './lib';

export type AsyncContractFunction<T = any> = (...args: ArgsOrCalldataWithOptions) => Promise<T>;
export type ContractFunction = (...args: ArgsOrCalldataWithOptions) => any;

export type Result =
  | {
      [key: string]: any;
    }
  | Result[]
  | bigint
  | string
  | boolean
  | CairoEnum;

// export type ArgsOrCalldata = RawArgsArray | [Calldata] | Calldata;
// export type ArgsOrCalldataWithOptions = ArgsOrCalldata & ContractOptions;

// RawParamsOrCalldata as args
export type ArgsOrCalldata =
  // params like (va,vb,vc,vd...)               as args is [va,vb,vc,vd...]
  // params like (x) where x = {a:va,b:vb,c:vc...} as args is [x]
  // params like (x) where x = [va,vb,vc...]       as args is [[x]]
  | RawArgsArray // recursive definition cover all this cases
  // [calldata] is [['0x','0x'...]]
  | [Calldata]
  // calldata is ['0x','0x'...]
  | Calldata;

// RawParamsOrCalldata where each can have an option
export type ArgsOrCalldataWithOptions =
  // params like (va,vb,vc,vd..., option)                   as args is [va,vb,vc,vd..., option]
  // params like (x, option) where x = {a:va,b:vb,c:vc...}  as args is [x, option]
  // params like (x, option) where x = [va,vb,vc...]        as args is [[x], option]
  // recursive definition cover all this cases
  | [...RawArgsArray]
  | [...RawArgsArray, ContractOptions]
  // used when called compile that return array of calldata
  // (calldata, options)                                             as args is [['0x','0x'...], options]
  | [Calldata]
  | [Calldata, ContractOptions]
  // used when separate params compilations
  // (c,a,l,l,d,a,t,a, options)                                      as args is ['0x','0x'..., options]
  | [...Calldata]
  | [...Calldata, ContractOptions];

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

export type ParsedEvent = { [name: string]: ParsedStruct };

export type ParsedEvents = Array<ParsedEvent>;
