import type Transport from '@ledgerhq/hw-transport';
// A namespace import: the API pages then name the parent class `starknet.LedgerSigner221`.
import * as starknet from 'starknet';

/**
 * Signer for accounts using a Ledger Nano S+/X signature (Starknet Ledger APP version 2.2.1).
 *
 * The Ledger has to be connected, unlocked and the Starknet APP has to be selected before you use
 * this class. The transport is typed as a Ledger `Transport`: a value that is not a Ledger
 * transport is refused at compile time.
 * @example
 * ```typescript
 * import TransportNodeHid from '@ledgerhq/hw-transport-node-hid';
 * import { LedgerSigner221 } from 'starknet/ledger';
 * const myNodeTransport = await TransportNodeHid.create();
 * const myLedgerSigner = new LedgerSigner221(myNodeTransport, 0);
 * ```
 */
export class LedgerSigner221<T extends Transport = Transport> extends starknet.LedgerSigner221<T> {
  // The `LedgerSigner221` of `starknet` does not pass its transport type to `LedgerSigner111`,
  // so `transporter` would be `any`. This line gives it the type of your transport.
  // `declare` adds no code.
  declare readonly transporter: T;
}

/**
 * Format the Ledger wallet path to an Uint8Array
 * for a Ledger Starknet APP from v2.2.1 to v2.4.3.
 *
 * EIP2645 path = 2645'/starknet'/application'/0'/accountId'/0
 * @param {number} accountId Id of account. < 2**31.
 * @param {string} [applicationName='LedgerW'] utf8 string of application name.
 * @returns an Uint8array of 24 bytes.
 * @example
 * ```typescript
 * import { getLedgerPathBuffer221 } from 'starknet/ledger';
 * const result = getLedgerPathBuffer221(0);
 * // result = Uint8Array(24) [
 *   128,   0,  10,  85, 199, 65, 233, 201,
 *   171, 206, 231, 219, 128,  0,   0,   0,
 *   128,   0,   0,   0,   0,  0,   0,   0
 * ]
 * ```
 */
export function getLedgerPathBuffer221(accountId: number, applicationName?: string): Uint8Array {
  return starknet.getLedgerPathBuffer221(accountId, applicationName);
}
