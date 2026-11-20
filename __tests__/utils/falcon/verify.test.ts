import { addAddressPadding, constants, encode, num, typedData } from '../../../src';
import { Falcon512Signer, falcon512 } from '../../../src/falcon';
// Not exported by starknet/falcon (no blind signing): reached through their module.
import { publicKeyToNtt } from '../../../src/falcon/s2morrow/keys';
import { signHash } from '../../../src/falcon/s2morrow/signature';
import { giftTypedData } from './helpers/giftTypedData';
import { readOzFelts } from './helpers/ozFixtures';

const ADDRESS = '0x7f47dc7d5f2ab40ae668a195fc8eb5724333e436d87a1c37f40d39f2776d5fb';
const { secretKey, publicKey } = falcon512.generateKeyPair();
const signer = new Falcon512Signer(secretKey);
const msgHash = typedData.getMessageHash(giftTypedData, ADDRESS);

describe('falcon512.verifyMessage', () => {
  test('with a TypedData and an account address (padded or not)', async () => {
    const sig = await signer.signMessage(giftTypedData, ADDRESS);
    const padded = addAddressPadding(ADDRESS);
    const verifyMessageAny = falcon512.verifyMessage as any;
    expect(falcon512.verifyMessage(giftTypedData, sig, publicKey, ADDRESS)).toBe(true);
    expect(falcon512.verifyMessage(giftTypedData, sig, publicKey, padded)).toBe(true);
    expect(falcon512.verifyMessage(giftTypedData, sig, publicKey, '0x123')).toBe(false);
    expect(() => verifyMessageAny(giftTypedData, sig, publicKey)).toThrow('accountAddress');
  });

  test('with a hash given as hex string, bigint or decimal string', async () => {
    const sig = await signer.signMessage(giftTypedData, ADDRESS);
    expect(falcon512.verifyMessage(msgHash, sig, publicKey)).toBe(true);
    expect(falcon512.verifyMessage(num.toBigInt(msgHash), sig, publicKey)).toBe(true);
    expect(falcon512.verifyMessage(num.toBigInt(msgHash).toString(10), sig, publicKey)).toBe(true);
  });
});

describe('falcon512.verify', () => {
  test('public key as Uint8Array or hex string with or without 0x', async () => {
    const sig = await signer.signMessage(giftTypedData, ADDRESS);
    const hex = encode.buf2hex(publicKey);
    expect(falcon512.verify(sig, msgHash, publicKey)).toBe(true);
    expect(falcon512.verify(sig, msgHash, `0x${hex}`)).toBe(true);
    expect(falcon512.verify(sig, msgHash, hex)).toBe(true);
  });

  test('a signature formatted as decimal strings is accepted', async () => {
    const sig = (await signer.signMessage(giftTypedData, ADDRESS)) as string[];
    const asDecimal = sig.map((x) => BigInt(x).toString(10));
    expect(falcon512.verify(asDecimal, msgHash, publicKey)).toBe(true);
  });

  test('invalid inputs', async () => {
    const sig = await signer.signMessage(giftTypedData, ADDRESS);
    expect(falcon512.verify({ r: 1n, s: 2n, recovery: 0 } as any, msgHash, publicKey)).toBe(false);
    expect(falcon512.verify(sig, num.toHex(constants.PRIME), publicKey)).toBe(false);
    expect(falcon512.verify(sig, 'not a hash', publicKey)).toBe(false);
    expect(() => falcon512.verify(sig, msgHash, publicKey.slice(1))).toThrow('897 bytes');
  });

  test('rejects unclear message hashes ("", " ", "0x", true), but accepts an explicit 0', () => {
    const sigOverZero = signHash(0n, secretKey, publicKeyToNtt(publicKey));
    expect(falcon512.verify(sigOverZero, 0n, publicKey)).toBe(true);
    expect(falcon512.verify(sigOverZero, '0x0', publicKey)).toBe(true);
    expect(falcon512.verify(sigOverZero, '', publicKey)).toBe(false);
    expect(falcon512.verify(sigOverZero, ' ', publicKey)).toBe(false);
    expect(falcon512.verify(sigOverZero, '0x', publicKey)).toBe(false);
    expect(falcon512.verify(sigOverZero, true as any, publicKey)).toBe(false);
  });
});

describe('falcon512.verify and verifyMessage for the OpenZeppelin accounts', () => {
  const hintSigner = new Falcon512Signer(secretKey, { accountType: 'oz-hint' });
  const directSigner = new Falcon512Signer(secretKey, { accountType: 'oz-direct' });
  const packedKey = falcon512.getPackedPublicKey(publicKey);

  test('OZ signatures verify with their account type, hint and direct', async () => {
    const hintSig = await hintSigner.signMessage(giftTypedData, ADDRESS);
    const directSig = await directSigner.signMessage(giftTypedData, ADDRESS);
    expect(falcon512.verify(hintSig, msgHash, publicKey, { accountType: 'oz-hint' })).toBe(true);
    expect(falcon512.verify(directSig, msgHash, publicKey, { accountType: 'oz-direct' })).toBe(
      true
    );
  });

  test('a signature is refused when the account type does not match its format', async () => {
    const hintSig = await hintSigner.signMessage(giftTypedData, ADDRESS);
    const s2morrowSig = await signer.signMessage(giftTypedData, ADDRESS);
    expect(falcon512.verify(hintSig, msgHash, publicKey, { accountType: 'oz-direct' })).toBe(false);
    expect(falcon512.verify(s2morrowSig, msgHash, publicKey, { accountType: 'oz-hint' })).toBe(
      false
    );
    expect(falcon512.verify(hintSig, msgHash, publicKey)).toBe(false);
  });

  test('the packed public key (hex, bigint or decimal felts) gives the same results as the NIST key', async () => {
    const hintSig = await hintSigner.signMessage(giftTypedData, ADDRESS);
    const s2morrowSig = await signer.signMessage(giftTypedData, ADDRESS);
    const asBigint = packedKey.map((x) => BigInt(x));
    const asDecimal = asBigint.map((x) => x.toString(10));
    expect(falcon512.verify(hintSig, msgHash, packedKey, { accountType: 'oz-hint' })).toBe(true);
    expect(falcon512.verify(hintSig, msgHash, asBigint, { accountType: 'oz-hint' })).toBe(true);
    expect(falcon512.verify(hintSig, msgHash, asDecimal, { accountType: 'oz-hint' })).toBe(true);
    expect(falcon512.verify(hintSig, '0x1234', packedKey, { accountType: 'oz-hint' })).toBe(false);
    expect(falcon512.verify(s2morrowSig, msgHash, packedKey)).toBe(true);
  });

  test('a packed public key of 28 felts, or not canonical, is refused', () => {
    const sig = ['0x1'];
    expect(() => falcon512.verify(sig, msgHash, packedKey.slice(0, 28))).toThrow('29 felts');
    const notCanonical = [...packedKey];
    notCanonical[28] = num.toHex(2n ** 128n); // the high half of the last felt must be 0
    expect(() => falcon512.verify(sig, msgHash, notCanonical)).toThrow('non-canonical');
  });

  test('the OZ reference signature verifies through the public API', () => {
    const msg = readOzFelts('fixture', 'msg')[0];
    const key = readOzFelts('fixture', 'public_key');
    const sig = readOzFelts('fixture', 'signature').map((x) => num.toHex(x));
    expect(falcon512.verify(sig, msg, key, { accountType: 'oz-hint' })).toBe(true);
    expect(falcon512.verify(sig.slice(0, 31), msg, key, { accountType: 'oz-direct' })).toBe(true);
  });

  test('verifyMessage with a hash and options, and with a TypedData, an address and options', async () => {
    const directSig = await directSigner.signMessage(giftTypedData, ADDRESS);
    const options = { accountType: 'oz-direct' } as const;
    expect(falcon512.verifyMessage(msgHash, directSig, publicKey, options)).toBe(true);
    expect(falcon512.verifyMessage(giftTypedData, directSig, publicKey, ADDRESS, options)).toBe(
      true
    );
    expect(falcon512.verifyMessage(giftTypedData, directSig, packedKey, ADDRESS, options)).toBe(
      true
    );
  });

  test('verifyMessage with a hash and a 4th argument that is not an object still verifies as S2morrow', async () => {
    const s2morrowSig = await signer.signMessage(giftTypedData, ADDRESS);
    const verifyMessageAny = falcon512.verifyMessage as any;
    expect(verifyMessageAny(msgHash, s2morrowSig, publicKey, '0x123')).toBe(true);
  });

  test('an unknown account type throws', async () => {
    const hintSig = await hintSigner.signMessage(giftTypedData, ADDRESS);
    expect(() =>
      falcon512.verify(hintSig, msgHash, publicKey, { accountType: 'oz' } as any)
    ).toThrow('unknown accountType');
  });
});
