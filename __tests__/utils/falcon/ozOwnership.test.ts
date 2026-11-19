import { CairoBytes31, num } from '../../../src';
import { ownershipAcceptanceHash } from '../../../src/falcon/oz/ownership';
import { verifyHashOz } from '../../../src/falcon/oz/signature';
import { unpackPoly } from '../../../src/falcon/s2morrow/packing';
import { readOzFelts, readOzShortString } from './helpers/ozFixtures';

/** The felt of a Cairo short string, such as 'FALCON_ACCOUNT'. */
const shortString = (text: string): bigint => CairoBytes31.fromText(text).toBigInt();

// OpenZeppelin reference data of two key changes, and of a first key on an account without one.
const rotationAddress = shortString(readOzShortString('rotation_fixture', 'account_address'));
const currentKey = readOzFelts('fixture', 'public_key');
const newKey = readOzFelts('rotation_fixture', 'new_public_key');
const firstHash = readOzFelts('rotation_fixture', 'accept_ownership_hash')[0];
const secondHash = readOzFelts('rotation_fixture', 'second_accept_ownership_hash')[0];
const migrationAddress = shortString(readOzShortString('migration_fixture', 'account_address'));
const migrationKey = readOzFelts('migration_fixture', 'public_key');
const emptyKeyHash = readOzFelts('migration_fixture', 'accept_ownership_hash')[0];

describe('ownershipAcceptanceHash', () => {
  test('first key change: the acceptance hash of rotation_fixture, in hex', () => {
    expect(ownershipAcceptanceHash(rotationAddress, currentKey)).toBe(num.toHex(firstHash));
  });

  test('second key change, from the new key: second_accept_ownership_hash', () => {
    expect(ownershipAcceptanceHash(rotationAddress, newKey)).toBe(num.toHex(secondHash));
  });

  test('empty current key: the acceptance hash of migration_fixture', () => {
    expect(ownershipAcceptanceHash(migrationAddress, [])).toBe(num.toHex(emptyKeyHash));
  });

  test('the address and the key may be written as hex strings', () => {
    const hexKey = currentKey.map((x) => num.toHex(x));
    expect(ownershipAcceptanceHash(num.toHex(rotationAddress), hexKey)).toBe(num.toHex(firstHash));
  });

  test('a current key of 28 felts, or an address written as text, is refused', () => {
    expect(() => ownershipAcceptanceHash(rotationAddress, currentKey.slice(0, 28))).toThrow(
      '29 felts, or none'
    );
    expect(() => ownershipAcceptanceHash('FALCON_ACCOUNT', currentKey)).toThrow(
      'account address is not a felt252'
    );
  });

  test('the OpenZeppelin acceptance signatures verify against these hashes', () => {
    const first = readOzFelts('rotation_fixture', 'accept_ownership_signature');
    const second = readOzFelts('rotation_fixture', 'second_accept_ownership_signature');
    const emptyKey = readOzFelts('migration_fixture', 'accept_ownership_signature');
    expect(verifyHashOz(firstHash, first, unpackPoly(newKey), 'hint')).toBe(true);
    expect(verifyHashOz(secondHash, second, unpackPoly(newKey), 'hint')).toBe(true);
    expect(verifyHashOz(emptyKeyHash, emptyKey, unpackPoly(migrationKey), 'hint')).toBe(true);
  });
});
