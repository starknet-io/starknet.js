/** ABI */
export type Abi = Array<FunctionAbi | EventAbi | StructAbi>;

// Basic elements
export type AbiEntry = { name: string; type: 'felt' | 'felt*' | string };

enum FunctionAbiType {
  'function',
  'l1_handler',
  'constructor',
}

// Sub elements
export type FunctionAbi = {
  inputs: AbiEntry[];
  name: string;
  outputs: AbiEntry[];
  stateMutability?: 'view';
  state_mutability?: string; // Cairo 1 Abi
  type: FunctionAbiType;
};

export type AbiStructs = { [name: string]: StructAbi };

export type StructAbi = {
  members: (AbiEntry & { offset: number })[];
  name: string;
  size: number;
  type: 'struct';
};

export type AbiEnums = { [name: string]: EnumAbi };
export type EnumAbi = {
  variants: (AbiEntry & { offset: number })[];
  name: string;
  size: number;
  type: 'enum';
};

type EventAbi = any;
