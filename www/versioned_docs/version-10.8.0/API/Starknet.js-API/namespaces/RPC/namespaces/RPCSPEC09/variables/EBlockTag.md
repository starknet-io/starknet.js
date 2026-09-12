# Variable: EBlockTag

> `const` **EBlockTag**: `object`

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:118

A tag specifying a dynamic reference to a block.

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
