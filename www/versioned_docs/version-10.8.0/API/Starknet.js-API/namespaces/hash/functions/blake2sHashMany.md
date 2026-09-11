# Function: blake2sHashMany()

> **blake2sHashMany**(`data`): `bigint`

Defined in: [src/utils/hash/classHash/blake.ts:22](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/hash/classHash/blake.ts#L22)

Blake2s hash function for Starknet that produces a field element.
Matches the Blake2Felt252 implementation from Rust.

The implementation:

1. Encodes each Felt into u32 words (small: 2 words, large: 8 words)
2. Serializes u32 words as little-endian bytes
3. Computes Blake2s hash (32-byte output)
4. Interprets hash as little-endian Felt

## Parameters

### data

`bigint`[]

## Returns

`bigint`
