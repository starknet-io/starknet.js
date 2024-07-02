/**
 * TypeScript Representation of Cairo1 v2+ Starknet Contract ABI
 *
 * starknet_metadata.json - tags/v0.5.0
 *
 * 'starknet-specs' (OpenRpc protocol types)
 * https://github.com/starkware-libs/starknet-specs
 */

export type ABI = Array<
  FUNCTION | CONSTRUCTOR | L1_HANDLER | EVENT | STRUCT | ENUM | INTERFACE | IMPL
>;

export type FUNCTION = {
  type: 'function';
  name: string;
  inputs: Array<{
    name: string;
    type: string;
  }>;
  outputs?: Array<{
    type: string;
  }>;
  state_mutability: 'view' | 'external';
};

export type CONSTRUCTOR = {
  type: 'constructor';
  name: 'constructor';
  inputs: Array<{
    name: string;
    type: string;
  }>;
};

export type L1_HANDLER = {
  type: 'l1_handler';
  name: string;
  inputs: Array<{
    name: string;
    type: string;
  }>;
  outputs?: Array<{
    type: string;
  }>;
  state_mutability: 'view' | 'external';
};

export type EVENT = {
  type: 'event';
  name: string;
} & (ENUM_EVENT | STRUCT_EVENT);

export type STRUCT_EVENT = {
  kind: 'struct';
  members: Array<EVENT_FIELD>;
};

export type ENUM_EVENT = {
  kind: 'enum';
  variants: Array<EVENT_FIELD>;
};

export type STRUCT = {
  type: 'struct';
  name: string;
  members: Array<{
    name: string;
    type: string;
  }>;
};

export type ENUM = {
  type: 'enum';
  name: string;
  variants: Array<{
    name: string;
    type: string;
  }>;
};

export type INTERFACE = {
  type: 'interface';
  name: string;
  items: Array<FUNCTION>;
};

export type IMPL = {
  type: 'impl';
  name: string;
  interface_name: string;
};

export type EVENT_KIND = 'struct' | 'enum';

export type EVENT_FIELD = {
  name: string;
  type: string;
  kind: 'key' | 'data' | 'nested';
};
