import { addAddressPadding, constants, encode, num, typedData } from '../../../src';
import { Falcon512Signer, falcon512 } from '../../../src/falcon';
// Not exported by starknet/falcon (no blind signing): reached through their module.
import { publicKeyToNtt } from '../../../src/falcon/s2morrow/keys';
import { signHash } from '../../../src/falcon/s2morrow/signature';
import { giftTypedData } from './helpers/giftTypedData';

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
