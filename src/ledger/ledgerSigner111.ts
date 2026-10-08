import type Transport from '@ledgerhq/hw-transport';
// A namespace import: the API pages then name the parent class `starknet.LedgerSigner111`.
import * as starknet from 'starknet';

/**
 * Signer for accounts using a Ledger Nano S+/X signature (Starknet Ledger APP version 1.1.1).
 *
 * The Ledger has to be connected, unlocked and the Starknet APP has to be selected before you use
 * this class. The transport is typed as a Ledger `Transport`: a value that is not a Ledger
 * transport is refused at compile time.
 * @example
 * ```typescript
 * import TransportNodeHid from '@ledgerhq/hw-transport-node-hid';
 * import { LedgerSigner111 } from 'starknet/ledger';
 * const myNodeTransport = await TransportNodeHid.create();
 * const myLedgerSigner = new LedgerSigner111(myNodeTransport, 0);
 * ```
 */
export class LedgerSigner111<T extends Transport = Transport> extends starknet.LedgerSigner111<T> {}

/**
 * Format the Ledger wallet path to an Uint8Array
 * for a Ledger Starknet APP v1.1.1.
 *
 * EIP2645 path = 2645'/starknet/application/0/accountId/0
 * @param {number} accountId Id of account. < 2**31.
 * @param {string} [applicationName='LedgerW'] utf8 string of application name.
 * @returns an Uint8array of 24 bytes.
 * @example
 * ```typescript
 * import { getLedgerPathBuffer111 } from 'starknet/ledger';
 * const result = getLedgerPathBuffer111(0);
 * // result = Uint8Array(24) [
 *   128,   0,  10,  85,  71, 65, 233, 201,
 *    43, 206, 231, 219,   0,  0,   0,   0,
 *     0,   0,   0,   0,   0,  0,   0,   0
 * ]
 * ```
 */
export function getLedgerPathBuffer111(accountId: number, applicationName?: string): Uint8Array {
  return starknet.getLedgerPathBuffer111(accountId, applicationName);
}
