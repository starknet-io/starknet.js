import type Transport from '@ledgerhq/hw-transport';
// A namespace import: the API pages then name the parent class `starknet.LedgerSigner231`.
import * as starknet from 'starknet';

/**
 * Signer for accounts using a Ledger Nano S+/X signature (Starknet Ledger APP from version 2.3.1
 * to 2.4.3).
 *
 * The Ledger has to be connected, unlocked and the Starknet APP has to be selected before you use
 * this class. The transport is typed as a Ledger `Transport`: a value that is not a Ledger
 * transport is refused at compile time.
 * @example
 * ```typescript
 * import TransportNodeHid from '@ledgerhq/hw-transport-node-hid';
 * import { LedgerSigner231 } from 'starknet/ledger';
 * const myNodeTransport = await TransportNodeHid.create();
 * const myLedgerSigner = new LedgerSigner231(myNodeTransport, 0);
 * ```
 */
export class LedgerSigner231<T extends Transport = Transport> extends starknet.LedgerSigner231<T> {
  // Same reason as in `LedgerSigner221`: without this line, `transporter` would be `any`.
  // `declare` adds no code.
  declare readonly transporter: T;
}
