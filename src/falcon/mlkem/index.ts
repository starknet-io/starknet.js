// The `mlkem` namespace of `starknet/falcon`: a post-quantum key exchange between two Falcon-512
// accounts of OpenZeppelin, with ML-KEM-768 (FIPS 203). The three steps are in `exchange.ts`.
export { createKey, decapsulate, encapsulate } from './exchange';
