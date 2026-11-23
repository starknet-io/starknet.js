/**
 * The Falcon-512 accounts that `starknet/falcon` signs for. Each one has its own signature layout:
 * the signer must use the type of the account class, or the account rejects the signatures.
 *
 * - `'s2morrow'`: the S2morrow account (https://github.com/feltroidprime/s2morrow), class
 *   `0x37c7626b50ba517835c9556b53bce57cb6633704bb702f8c2f13a44cf151d5`. Signatures of 61 felts,
 *   hashed with Poseidon. The default.
 * - `'oz-hint'`: `Falcon512ShakeAccountUpgradeable` of OpenZeppelin Contracts for Cairo
 *   (v4.1.0-rc.0), class `0x014660ce3739fbde6e33d994cebd6a9fb20e800516b2e1b6c253d4d09baa9ae0`
 *   (compiled with Cairo 2.21.0). Signatures of 60 felts, with the product s1·h (the hint), which
 *   makes the on-chain check cheaper.
 * - `'oz-direct'`: `Falcon512ShakeDirectAccountUpgradeable` of OpenZeppelin Contracts for Cairo
 *   (v4.1.0-rc.0), class `0x016111958d61eedfa5a950b608997abb4981b548f1862d620cc9247461ddeeb1`
 *   (compiled with Cairo 2.21.0). Signatures of 31 felts, without the hint.
 *
 * The two OpenZeppelin accounts store the same key and have the same ABI. A class upgrade from one
 * to the other keeps the address and the key, but changes the signature layout.
 */
export type Falcon512AccountType = 's2morrow' | 'oz-hint' | 'oz-direct';

/** Options of `Falcon512Signer`, `falcon512.verify` and `falcon512.verifyMessage`. */
export type Falcon512Options = {
  /** The type of the account that checks the signatures. Default: `'s2morrow'`. */
  accountType?: Falcon512AccountType;
};

const ACCOUNT_TYPES: readonly Falcon512AccountType[] = Object.freeze([
  's2morrow',
  'oz-hint',
  'oz-direct',
]);

/**
 * Reads the options of `starknet/falcon` strictly: an unknown option or value is an error, never a
 * silent fallback to the default type.
 * @param {unknown} options the options given by the caller, or undefined
 * @returns {Falcon512AccountType} the account type; `'s2morrow'` when none is given
 * @throws {Error} when the options are not an object, have an unknown key, or an unknown
 * accountType
 * @example
 * ```typescript
 * const result = parseFalconOptions({ accountType: 'oz-hint' });
 * // result = 'oz-hint'
 * const result2 = parseFalconOptions(undefined);
 * // result2 = 's2morrow'
 * parseFalconOptions({ acountType: 'oz-hint' });
 * // throws Error('Falcon512: unknown option "acountType"')
 * ```
 */
export function parseFalconOptions(options: unknown): Falcon512AccountType {
  if (options === undefined) return 's2morrow';
  if (typeof options !== 'object' || options === null || Array.isArray(options)) {
    throw new Error('Falcon512: options must be an object');
  }
  Object.keys(options).forEach((key) => {
    if (key !== 'accountType') throw new Error(`Falcon512: unknown option "${key}"`);
  });
  const { accountType } = options as Falcon512Options;
  if (accountType === undefined) return 's2morrow';
  if (!ACCOUNT_TYPES.includes(accountType)) {
    throw new Error(
      `Falcon512: unknown accountType "${String(accountType)}" (expected 's2morrow', 'oz-hint' or 'oz-direct')`
    );
  }
  return accountType;
}
