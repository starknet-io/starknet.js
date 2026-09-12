# Type Alias: BLOCK_TAG

> **BLOCK_TAG** = [`EBlockTag`](EBlockTag.md)

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/api/components.d.ts:150

A tag specifying a dynamic reference to a block.
Tag `l1_accepted` refers to the latest Starknet block which was included in a state update on L1 and finalized by the consensus on L1.
Tag `latest` refers to the latest Starknet block finalized by the consensus on L2.
Tag `pre_confirmed` refers to the block which is currently being built by the block proposer in height `latest` + 1.

## See

EBlockTag
