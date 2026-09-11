# Variable: BlockTag

> **BlockTag**: `object`

Defined in: [src/provider/types/spec.type.ts:249](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/types/spec.type.ts#L249)

## Type Declaration

### LATEST

> `readonly` **LATEST**: `"latest"`

Tag `latest` refers to the latest Starknet block finalized by the consensus on L2.

### PRE_CONFIRMED

> `readonly` **PRE_CONFIRMED**: `"pre_confirmed"`

Tag `pre_confirmed` refers to the block which is currently being built by the block proposer in height `latest` + 1.

### L1_ACCEPTED

> `readonly` **L1_ACCEPTED**: `"l1_accepted"`

Tag `l1_accepted` refers to the latest Starknet block which was included in a state update on L1 and finalized by the consensus on L1.
