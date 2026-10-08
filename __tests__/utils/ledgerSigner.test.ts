import Transport from '@ledgerhq/hw-transport';
import { LedgerSigner231 as StarknetLedgerSigner231 } from '../../src';
import {
  LedgerSigner,
  LedgerSigner111,
  LedgerSigner221,
  LedgerSigner231,
  getLedgerPathBuffer,
  getLedgerPathBuffer111,
  getLedgerPathBuffer221,
} from '../../src/ledger';

/**
 * A Ledger transport that always answers the same bytes.
 * It extends the real `Transport` class of Ledger, so `send` runs the real Ledger code:
 * the answer must end with the status word 0x9000 (success).
 */
class FixedAnswerTransport extends Transport {
  private readonly answer: Buffer;

  constructor(answer: number[]) {
    super();
    this.answer = Buffer.from(answer);
  }

  async exchange(_apdu: Buffer): Promise<Buffer> {
    return this.answer;
  }
}

describe('starknet/ledger', () => {
  test('a LedgerSigner231 of starknet/ledger is also a LedgerSigner231 of starknet', () => {
    const signer = new LedgerSigner231(new FixedAnswerTransport([]), 0);
    expect(signer).toBeInstanceOf(StarknetLedgerSigner231);
  });

  test('getAppVersion reads the APP version through the Ledger transport', async () => {
    // The Ledger answers 2, 3, 1, then the status word 0x9000.
    const signer = new LedgerSigner231(new FixedAnswerTransport([2, 3, 1, 0x90, 0x00]), 0);
    expect(await signer.getAppVersion()).toBe('2.3.1');
  });

  test('LedgerSigner111 gives transporter the type of the transport, not any', () => {
    const signer = new LedgerSigner111(new FixedAnswerTransport([]), 0);
    // Checked by `npm run ts:check`: if `transporter` were `any`, this line would compile,
    // and the unused `@ts-expect-error` would make ts:check fail.
    // @ts-expect-error `FixedAnswerTransport` has no `notAMethod`.
    const missing = signer.transporter.notAMethod;
    expect(missing).toBeUndefined();
  });

  test('LedgerSigner221 gives transporter the type of the transport, not any', () => {
    const signer = new LedgerSigner221(new FixedAnswerTransport([]), 0);
    // Checked by `npm run ts:check`, as for LedgerSigner111.
    // @ts-expect-error `FixedAnswerTransport` has no `notAMethod`.
    const missing = signer.transporter.notAMethod;
    expect(missing).toBeUndefined();
  });

  test('LedgerSigner231 gives transporter the type of the transport, not any', () => {
    const signer = new LedgerSigner231(new FixedAnswerTransport([]), 0);
    // Checked by `npm run ts:check`, as for LedgerSigner111.
    // @ts-expect-error `FixedAnswerTransport` has no `notAMethod`.
    const missing = signer.transporter.notAMethod;
    expect(missing).toBeUndefined();
  });

  test('LedgerSigner231 refuses a value that is not a Ledger transport', () => {
    // Checked by `npm run ts:check`: an empty object is not a Ledger `Transport`.
    // @ts-expect-error `{}` is not a Ledger `Transport`.
    const signer = new LedgerSigner231({}, 0);
    // At run time nothing is checked: the constructor does not use the transport.
    expect(signer.accountID).toBe(0);
  });

  // The expected paths below were computed with the functions of `starknet` on 2026-10-07.
  // They are also the values shown in the JSDoc examples of these functions.
  test('getLedgerPathBuffer111 returns the EIP2645 path of the v1.1.1 APP', () => {
    expect(getLedgerPathBuffer111(0)).toEqual(
      new Uint8Array([
        128, 0, 10, 85, 71, 65, 233, 201, 43, 206, 231, 219, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ])
    );
  });

  test('getLedgerPathBuffer221 returns the EIP2645 path of the APPs from v2.2.1 to v2.4.3', () => {
    expect(getLedgerPathBuffer221(0)).toEqual(
      new Uint8Array([
        128, 0, 10, 85, 199, 65, 233, 201, 171, 206, 231, 219, 128, 0, 0, 0, 128, 0, 0, 0, 0, 0, 0,
        0,
      ])
    );
  });

  test('LedgerSigner is LedgerSigner111, as in starknet', () => {
    expect(LedgerSigner).toBe(LedgerSigner111);
  });

  test('getLedgerPathBuffer is getLedgerPathBuffer111, as in starknet', () => {
    expect(getLedgerPathBuffer).toBe(getLedgerPathBuffer111);
  });
});
