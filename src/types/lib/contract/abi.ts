import type { ENUM_EVENT, EVENT_FIELD, STRUCT_EVENT } from '@starknet-io/starknet-types-07';

/** ABI */
export type Abi = ReadonlyArray<FunctionAbi | AbiEvent | AbiStruct | InterfaceAbi | any>;

// Basic elements
export type AbiEntry = { name: string; type: 'felt' | 'felt*' | 'event' | string };

export type EventEntry = { name: string; type: 'felt' | 'felt*' | string; kind: 'key' | 'data' };

type FunctionAbiType = 'function' | 'l1_handler' | 'constructor';

// Sub elements
export type FunctionAbi = {
  inputs: AbiEntry[];
  name: string;
  outputs: AbiEntry[];
  stateMutability?: 'view';
  state_mutability?: string; // Cairo 1 Abi
  type: FunctionAbiType;
};

export type AbiStructs = { [name: string]: AbiStruct };

export type AbiStruct = {
  members: (AbiEntry & { offset: number })[];
  name: string;
  size: number;
  type: 'struct';
};

export type AbiInterfaces = { [name: string]: InterfaceAbi };
export type InterfaceAbi = {
  items: FunctionAbi[];
  name: string;
  type: 'interface';
};

export type AbiEnums = { [name: string]: AbiEnum };
export type AbiEnum = {
  variants: (AbiEntry & { offset: number })[];
  name: string;
  size: number;
  type: 'enum';
};

// AbiEvents type is an arborescence :
// - Nodes are hashes of either Cairo 1 components names, or of Cairo 0 or 1 event names,
// - With Cairo 1 abi, the nodes are linked in accordance with the components arborescence ; the tree can have several levels of nodes.
// - With Cairo 0 abi : the tree has only one level of nodes (no component concept)
// - leaves are at the end of each branch ; they describes each event (not the same for Cairo 0 and Cairo 1)
// -  if the #[flat] flag is used in the Cairo 1 code to describe an event, or if the event is in the main code, the branch for this event has only one level of nodes (see example class 0x46ded64ae2dead6448e247234bab192a9c483644395b66f2155f2614e5804b0 in Sepolia)
export type AbiEvents = { [hash: string]: AbiEvent };

// if Cairo 1 then either definition of an event, or new level of nodes
// if Cairo 0 then definition of an event
export type AbiEvent = CairoEvent | LegacyEvent;

// CairoEvent is CairoEventDefinition type if we have a leaf (end of the arborescence for an event), otherwise a new node level is created. Only for Cairo 1
export type CairoEvent = CairoEventDefinition | AbiEvents;

export type CairoEventDefinition = STRUCT_EVENT & {
  name: string;
  type: 'event';
};

export type CairoEventVariant = ENUM_EVENT & {
  name: string;
  type: string;
};

export type LegacyEvent = {
  name: string;
  type: 'event';
  data: EVENT_FIELD[];
  keys: EVENT_FIELD[];
};
