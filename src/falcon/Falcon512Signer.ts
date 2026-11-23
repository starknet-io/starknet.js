import * as starknet from 'starknet';
import {
  parseFalconOptions,
  type Falcon512AccountType,
  type Falcon512Options,
} from './accountType';
import { ownershipAcceptanceHash } from './oz/ownership';
import { signHashOz } from './oz/signature';
import {
  getPublicKey,
  getPackedPublicKey,
  importFalconRsSecretKey,
  publicKeyToNtt,
  SECRET_KEY_LENGTH,
  toBytes,
} from './s2morrow/keys';
import { signHash } from './s2morrow/signature';

/**
 * Throws a clear error unless the transaction is V3: the hash functions of starknet.js compute V3
 * hashes only.
 * @param {InvocationsDetailsWithNonce} details the details of the transaction
 * @throws {Error} when the version is not V3
 * @example
 * ```typescript
 * assertV3({ nonce: 1, version: '0x3' });
 * // passes
 * assertV3({ nonce: 1, version: '0x1' });
 * // throws Error("Falcon512: only V3 transactions are supported")
 * ```
 */
function assertV3(details: starknet.InvocationsDetailsWithNonce): void {
  if (!starknet.isV3Tx(details)) throw new Error('Falcon512: only V3 transactions are supported');
}

/**
 * Signer for the Falcon-512 accounts (post-quantum signature), in pure TypeScript.
 *
 * Falcon-512 is a signature scheme built on lattices, designed to resist attacks by quantum
 * computers. Three account contracts verify it on-chain, each with its own signature layout: the
 * `accountType` option of the constructor selects it (see `Falcon512AccountType`).
 * - `'s2morrow'` (default): the S2morrow account (https://github.com/feltroidprime/s2morrow), which
 *   hashes the transaction with Poseidon. A signature is 61 felts.
 * - `'oz-hint'` and `'oz-direct'`: the two Falcon-512 accounts of OpenZeppelin Contracts for Cairo
 *   (pre-release v4.1.0-rc.0), which hash it with SHAKE-256. A signature is 60 felts with the hint
 *   s1·h, which makes the on-chain check cheaper, or 31 felts without it.
 *
 * Fees: the on-chain verification costs much more L2 gas than an ECDSA one. By default, the fee
 * estimates of `Account` skip the validation of the signature (`skipValidate: true`), so they leave
 * out this cost: pass `{ skipValidate: false }` to `execute`, `deployAccount` and `declare`.
 *
 * Status:
 * - This is Falcon as submitted to Round 3 of the NIST post-quantum standardization, not FN-DSA
 *   (FIPS 206). FN-DSA is not final yet, and will most likely be incompatible with it.
 * - The Falcon code is a patched copy of `@noble/post-quantum` 0.7.1, kept until noble publishes
 *   the API this signer needs. noble has no independent audit: its author audited version 0.6.1
 *   (April 2026).
 * - Signing is not constant-time: do not sign where an attacker can measure its timing closely.
 * - Only V3 transactions are supported.
 */
export class Falcon512Signer implements starknet.SignerInterface {
  readonly #secretKey: Uint8Array;

  readonly #publicKey: Uint8Array;

  readonly #pkNtt: Uint16Array;

  readonly #packedPublicKey: string[];

  readonly #accountType: Falcon512AccountType;

  /**
   * Builds a signer from a NIST Falcon-512 secret key. The key is fully checked, then copied: the
   * signer keeps its own copy, in a private field.
   * @param {Uint8Array | string} secretKey NIST Falcon-512 secret key (1281 bytes), Uint8Array or
   * hex string. Prefer a Uint8Array: a string cannot be wiped from memory.
   * @param {Falcon512Options} [options] `accountType`: the type of the account that checks the
   * signatures, `'s2morrow'` (default), `'oz-hint'` or `'oz-direct'`
   * @throws {Error} when the secret key or an option is invalid
   * @example
   * ```typescript
   * const { secretKey } = falcon512.generateKeyPair();
   * const mySigner = new Falcon512Signer(secretKey); // for an S2morrow account
   * const myOzSigner = new Falcon512Signer(secretKey, { accountType: 'oz-hint' });
   * new Falcon512Signer(new Uint8Array(1281));
   * // throws Error("Falcon512: invalid secret key header")
   * ```
   */
  constructor(secretKey: Uint8Array | string, options?: Falcon512Options) {
    const accountType = parseFalconOptions(options); // read before the key is copied
    const bytes = toBytes(secretKey, SECRET_KEY_LENGTH, 'secret key');
    let publicKey: Uint8Array;
    try {
      publicKey = getPublicKey(bytes); // fully validates the key
    } catch (error) {
      bytes.fill(0); // the copy of an invalid key is not kept
      throw error;
    }
    this.#accountType = accountType;
    this.#publicKey = publicKey;
    this.#secretKey = bytes;
    this.#pkNtt = publicKeyToNtt(this.#publicKey);
    this.#packedPublicKey = getPackedPublicKey(this.#publicKey);
  }

  /**
   * Builds a signer from a falcon-rs secret key (3584 bytes), converted to the NIST format.
   *
   * Warning: falcon-rs derives the seed of its sampler from the public salt of each signature, so
   * the signatures it produced may leak information about the secret key. Use this for continuity
   * only; for real funds, generate a new key with `falcon512.generateKeyPair`. The S2morrow account
   * cannot change its key: a new key means a new account. An OpenZeppelin account can change its
   * key (see `signOwnershipAcceptance`).
   * @param {Uint8Array | string} secretKey the falcon-rs secret key (3584 bytes), or its hex string
   * @param {Falcon512Options} [options] `accountType`, as for the constructor
   * @returns {Falcon512Signer} a signer that holds the same key, in the NIST format
   * @throws {Error} when the falcon-rs secret key or an option is invalid
   * @example
   * ```typescript
   * const mySigner = Falcon512Signer.fromFalconRs(falconRsSecretKey); // 3584 bytes, from falcon-rs
   * const result = mySigner.getPackedPublicKey();
   * // result = ['0xb2cf4f8b3c6f60cc662f438970ad34017e260c52d7911297a42811ce3cea2b', …] (29 felts)
   * ```
   */
  static fromFalconRs(secretKey: Uint8Array | string, options?: Falcon512Options): Falcon512Signer {
    const nist = importFalconRsSecretKey(secretKey);
    try {
      return new Falcon512Signer(nist, options);
    } finally {
      nist.fill(0);
    }
  }

  /**
   * NIST Falcon-512 public key (897 bytes), as a hex string.
   * @returns {Promise<string>} the public key: 0x, then 1794 hex digits
   * @example
   * ```typescript
   * const { secretKey } = falcon512.generateKeyPair();
   * const mySigner = new Falcon512Signer(secretKey);
   * const result = await mySigner.getPubKey();
   * // result = '0x09…' (1796 characters; 09 is the header of the format)
   * ```
   */
  public async getPubKey(): Promise<string> {
    return starknet.encode.addHexPrefix(starknet.encode.buf2hex(this.#publicKey));
  }

  /**
   * The 29 felts of the public key, in the form the accounts store it: the constructor argument
   * `pk_packed` of S2morrow, or the `public_key` array of an OpenZeppelin account (whose
   * constructor calldata is `29`, then these 29 felts). The same for the three account types.
   * @returns {string[]} the 29 felts, as hex strings (a new array at each call)
   * @example
   * ```typescript
   * const { secretKey } = falcon512.generateKeyPair();
   * const mySigner = new Falcon512Signer(secretKey);
   * const result = mySigner.getPackedPublicKey();
   * // result = ['0x…', …] (29 felts)
   * ```
   */
  public getPackedPublicKey(): string[] {
    return [...this.#packedPublicKey];
  }

  /**
   * Signs a SNIP-12 message (TypedData) for off-chain use.
   * @param {TypedData} typedData the message to sign
   * @param {string} accountAddress address of the account that signs the message
   * @returns {Promise<Signature>} the signature, as hex strings: 61 felts (S2morrow), 60
   * (OpenZeppelin, hint) or 31 (OpenZeppelin, direct)
   * @example
   * ```typescript
   * const result = await mySigner.signMessage(myTypedData, accountAddress);
   * // result = ['0x…', …] (S2morrow: 61 felts, random salt); result[29] = '0x2' (salt length)
   * ```
   */
  public async signMessage(
    typedData: starknet.TypedData,
    accountAddress: string
  ): Promise<starknet.Signature> {
    return this.signRaw(starknet.typedData.getMessageHash(typedData, accountAddress));
  }

  /**
   * Signs an INVOKE transaction (V3 only).
   * @param {Call[]} transactions the calls of the transaction
   * @param {InvocationsSignerDetails} details the details needed to hash the transaction
   * @returns {Promise<Signature>} the signature, as hex strings: 61, 60 or 31 felts, according to
   * the account type
   * @throws {Error} when the transaction is not V3
   * @example
   * ```typescript
   * const calls: Call[] = [
   *   {
   *     contractAddress: '0x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d',
   *     entrypoint: 'transfer',
   *     calldata: ['0x123', '1000', '0'],
   *   },
   * ];
   * const details: InvocationsSignerDetails = {
   *   walletAddress: accountAddress,
   *   chainId: constants.StarknetChainId.SN_SEPOLIA,
   *   cairoVersion: '1',
   *   version: '0x3',
   *   nonce: 1,
   *   resourceBounds: {
   *     l1_gas: { max_amount: 0n, max_price_per_unit: 50000000000000n },
   *     l2_gas: { max_amount: 40000000n, max_price_per_unit: 20000000000n },
   *     l1_data_gas: { max_amount: 1000n, max_price_per_unit: 100000n },
   *   },
   *   tip: 0,
   *   paymasterData: [],
   *   accountDeploymentData: [],
   *   nonceDataAvailabilityMode: RPC.EDataAvailabilityMode.L1,
   *   feeDataAvailabilityMode: RPC.EDataAvailabilityMode.L1,
   * };
   * const result = await mySigner.signTransaction(calls, details);
   * // result = ['0x…', …] (S2morrow: 61 felts)
   * ```
   */
  public async signTransaction(
    transactions: starknet.Call[],
    details: starknet.InvocationsSignerDetails
  ): Promise<starknet.Signature> {
    assertV3(details);
    const compiledCalldata = starknet.transaction.getExecuteCalldata(
      transactions,
      details.cairoVersion
    );
    const msgHash = starknet.hash.calculateInvokeTransactionHash({
      ...details,
      senderAddress: details.walletAddress,
      compiledCalldata,
      version: details.version,
      nonceDataAvailabilityMode: starknet.stark.intDAM(details.nonceDataAvailabilityMode),
      feeDataAvailabilityMode: starknet.stark.intDAM(details.feeDataAvailabilityMode),
    });
    return this.signRaw(msgHash);
  }

  /**
   * Signs the DEPLOY_ACCOUNT transaction of a Falcon-512 account (V3 only).
   * @param {DeployAccountSignerDetails} details the details needed to hash the transaction
   * @returns {Promise<Signature>} the signature, as hex strings: 61, 60 or 31 felts, according to
   * the account type
   * @throws {Error} when the transaction is not V3
   * @example
   * ```typescript
   * const packedPublicKey = mySigner.getPackedPublicKey();
   * const classHash = '0x37c7626b50ba517835c9556b53bce57cb6633704bb702f8c2f13a44cf151d5';
   * const salt = packedPublicKey[0];
   * const details: DeployAccountSignerDetails = {
   *   classHash,
   *   constructorCalldata: packedPublicKey,
   *   addressSalt: salt,
   *   contractAddress: hash.calculateContractAddressFromHash(salt, classHash, packedPublicKey, 0),
   *   chainId: constants.StarknetChainId.SN_SEPOLIA,
   *   version: '0x3',
   *   nonce: 0,
   *   resourceBounds: {
   *     l1_gas: { max_amount: 0n, max_price_per_unit: 50000000000000n },
   *     l2_gas: { max_amount: 60000000n, max_price_per_unit: 20000000000n },
   *     l1_data_gas: { max_amount: 1000n, max_price_per_unit: 100000n },
   *   },
   *   tip: 0,
   *   paymasterData: [],
   *   accountDeploymentData: [],
   *   nonceDataAvailabilityMode: RPC.EDataAvailabilityMode.L1,
   *   feeDataAvailabilityMode: RPC.EDataAvailabilityMode.L1,
   * };
   * const result = await mySigner.signDeployAccountTransaction(details);
   * // result = ['0x…', …] (S2morrow: 61 felts)
   * ```
   */
  public async signDeployAccountTransaction(
    details: starknet.DeployAccountSignerDetails
  ): Promise<starknet.Signature> {
    assertV3(details);
    const compiledConstructorCalldata = starknet.CallData.compile(details.constructorCalldata);
    const msgHash = starknet.hash.calculateDeployAccountTransactionHash({
      ...details,
      salt: details.addressSalt,
      compiledConstructorCalldata,
      version: details.version,
      nonceDataAvailabilityMode: starknet.stark.intDAM(details.nonceDataAvailabilityMode),
      feeDataAvailabilityMode: starknet.stark.intDAM(details.feeDataAvailabilityMode),
    });
    return this.signRaw(msgHash);
  }

  /**
   * Signs a DECLARE transaction (V3 only).
   * @param {DeclareSignerDetails} details the details needed to hash the transaction
   * @returns {Promise<Signature>} the signature, as hex strings: 61, 60 or 31 felts, according to
   * the account type
   * @throws {Error} when the transaction is not V3
   * @example
   * ```typescript
   * const details: DeclareSignerDetails = {
   *   senderAddress: accountAddress,
   *   classHash: '0x37c7626b50ba517835c9556b53bce57cb6633704bb702f8c2f13a44cf151d5',
   *   compiledClassHash: '0x1f2afb8ae690b84f4b7acfde52fbd2e5a1dc0c910ed898a778dc1ad3339e5c5',
   *   chainId: constants.StarknetChainId.SN_SEPOLIA,
   *   version: '0x3',
   *   nonce: 2,
   *   resourceBounds: {
   *     l1_gas: { max_amount: 0n, max_price_per_unit: 50000000000000n },
   *     l2_gas: { max_amount: 80000000n, max_price_per_unit: 20000000000n },
   *     l1_data_gas: { max_amount: 1000n, max_price_per_unit: 100000n },
   *   },
   *   tip: 0,
   *   paymasterData: [],
   *   accountDeploymentData: [],
   *   nonceDataAvailabilityMode: RPC.EDataAvailabilityMode.L1,
   *   feeDataAvailabilityMode: RPC.EDataAvailabilityMode.L1,
   * };
   * const result = await mySigner.signDeclareTransaction(details);
   * // result = ['0x…', …] (S2morrow: 61 felts)
   * ```
   */
  public async signDeclareTransaction(
    details: starknet.DeclareSignerDetails
  ): Promise<starknet.Signature> {
    assertV3(details);
    const msgHash = starknet.hash.calculateDeclareTransactionHash({
      ...details,
      version: details.version,
      nonceDataAvailabilityMode: starknet.stark.intDAM(details.nonceDataAvailabilityMode),
      feeDataAvailabilityMode: starknet.stark.intDAM(details.feeDataAvailabilityMode),
    });
    return this.signRaw(msgHash);
  }

  /**
   * Signs the acceptance of a key change of an OpenZeppelin Falcon-512 account.
   *
   * The account changes its key when it calls its own `set_public_key(new_public_key, signature)`:
   * the current key signs that transaction, as any other, and the new key must sign an acceptance.
   * Call this method on the signer of the new key, with the key that the account holds now. The
   * signed hash is Poseidon('StarkNet Message', 'accept_ownership', account address,
   * Poseidon(current key)). It holds no chain id, nonce or expiry: an acceptance is not single-use,
   * and the current key must still sign each key change.
   * @param {BigNumberish} accountAddress the address of the account
   * @param {BigNumberish[]} currentPublicKey the 29 felts of the key that the account holds now
   * (`getPackedPublicKey()` of its current signer, or its `get_public_key`)
   * @returns {Promise<string[]>} the acceptance, as hex strings, in the layout of this signer: 60
   * felts (`'oz-hint'`) or 31 (`'oz-direct'`)
   * @throws {Error} for an S2morrow signer (that account cannot change its key), or when the
   * current key has neither 29 felts nor none, or a value is not a felt252. Also when a subclass
   * makes `signRaw` return something else than an array of felts
   * @example
   * ```typescript
   * const newSigner = new Falcon512Signer(newSecretKey, { accountType: 'oz-hint' });
   * const acceptance = await newSigner.signOwnershipAcceptance(
   *   falconAccount.address,
   *   currentSigner.getPackedPublicKey()
   * );
   * const { transaction_hash } = await falconAccount.execute(
   *   {
   *     contractAddress: falconAccount.address,
   *     entrypoint: 'set_public_key',
   *     calldata: CallData.compile({
   *       new_public_key: newSigner.getPackedPublicKey(),
   *       signature: acceptance,
   *     }),
   *   },
   *   { skipValidate: false }
   * );
   * await myProvider.waitForTransaction(transaction_hash);
   * // From now on, the account checks the signatures of newSigner.
   * ```
   */
  public async signOwnershipAcceptance(
    accountAddress: starknet.BigNumberish,
    currentPublicKey: readonly starknet.BigNumberish[]
  ): Promise<string[]> {
    if (this.#accountType === 's2morrow') {
      throw new Error('Falcon512: an S2morrow account cannot change its key');
    }
    const signature = await this.signRaw(ownershipAcceptanceHash(accountAddress, currentPublicKey));
    if (!Array.isArray(signature)) {
      throw new Error('Falcon512: signRaw must return an array of felts');
    }
    return signature;
  }

  /**
   * Signs a hash: the last step of all the methods above, in the layout of the account type. It
   * stays protected, so that no public method signs an arbitrary hash. A subclass can override it,
   * as for every starknet.js signer.
   * @param {string} msgHash the hash to sign, a felt252
   * @returns {Promise<Signature>} the signature, as hex strings: 61, 60 or 31 felts, according to
   * the account type
   * @example
   * ```typescript
   * class LoggedFalconSigner extends Falcon512Signer {
   *   protected async signRaw(msgHash: string): Promise<Signature> {
   *     console.log('Falcon-512 signs', msgHash);
   *     return super.signRaw(msgHash);
   *   }
   * }
   * const result = await new LoggedFalconSigner(secretKey).signMessage(myTypedData, accountAddress);
   * // logs the hash of the message; result = ['0x…', …] (61 felts)
   * ```
   */
  protected async signRaw(msgHash: string): Promise<starknet.Signature> {
    const value = starknet.num.toBigInt(msgHash);
    switch (this.#accountType) {
      case 'oz-hint':
        return signHashOz(value, this.#secretKey, this.#pkNtt, 'hint');
      case 'oz-direct':
        return signHashOz(value, this.#secretKey, this.#pkNtt, 'direct');
      default: // 's2morrow'
        return signHash(value, this.#secretKey, this.#pkNtt);
    }
  }
}
