import * as starknet from 'starknet';

/** What `createKey` gives to Alice. */
export type MlKemKey = {
  /** 64 random bytes. Alice keeps them secret: `decapsulate` needs them to open a capsule. */
  seed: Uint8Array;
  /** The ML-KEM-768 public key of Alice (1184 bytes). Alice publishes it. */
  publicKey: Uint8Array;
  /** The message that Alice signs with her account, to link the public key to her account. */
  typedData: starknet.TypedData;
};

/**
 * What Alice publishes: her ML-KEM public key, signed by her account. Bob gives it to
 * `encapsulate`.
 */
export type MlKemSignedKey = {
  /** The address of the account of Alice, which owns the ML-KEM key. */
  keyOwnerAddress: starknet.BigNumberish;
  /** The ML-KEM-768 public key of Alice (1184 bytes). */
  publicKey: Uint8Array;
  /** The end of validity of the key, in seconds since 1970-01-01 (UTC). */
  validUntil: number;
  /** The signature of the message of `createKey`, by the account of Alice. */
  signature: starknet.Signature;
};

/** What `encapsulate` gives to Bob. */
export type MlKemEncapsulation = {
  /** The shared secret (32 bytes). Bob keeps it secret. */
  sharedSecret: Uint8Array;
  /** The capsule (1088 bytes). Bob sends it to Alice. Only Alice can open it. */
  capsule: Uint8Array;
  /** The time of the encapsulation, in seconds since 1970-01-01 (UTC). */
  timestamp: number;
  /** The message that Bob signs with his account, to show that the capsule comes from him. */
  typedData: starknet.TypedData;
};

/**
 * What Bob sends to Alice: the capsule, signed by his account. Alice gives it to `decapsulate`.
 */
export type MlKemSignedCapsule = {
  /** The address of the account of Bob, who made the capsule and sent it. */
  senderAddress: starknet.BigNumberish;
  /** The capsule (1088 bytes). */
  capsule: Uint8Array;
  /** The time of the encapsulation, from `encapsulate`. */
  timestamp: number;
  /** The signature of the message of `encapsulate`, by the account of Bob. */
  signature: starknet.Signature;
};
