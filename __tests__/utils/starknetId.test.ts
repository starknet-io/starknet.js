import { StarknetChainId } from '../../src/global/constants';
import {
  getStarknetIdContract,
  isStarkDomain,
  useDecoded,
  useEncoded,
} from '../../src/utils/starknetId';

function randomWithSeed(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function generateString(length: number, seed: number): string {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789-这来';

  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(randomWithSeed(seed + i) * charactersLength));
  }

  return result;
}

describe('Should test StarknetId utils', () => {
  test('Should test useEncoded and useDecoded hook with a random string', () => {
    for (let index = 0; index < 2500; index += 1) {
      const randomString = generateString(10, index);
      const decoded = useDecoded([useEncoded(randomString)]);
      expect(decoded).toBe(randomString.concat('.stark'));
    }
  });

  test('Should test useEncoded and useDecoded hook with an empty string', () => {
    expect(useDecoded([])).toBe('');
  });

  test('Should test useDecoded and useEncoded hook with an encoded number', () => {
    for (let index = 0; index < 2500; index += 1) {
      const decoded = useDecoded([BigInt(index)]);
      expect(useEncoded(decoded.substring(0, decoded.length - 6)).toString()).toBe(
        index.toString()
      );
    }
  });

  test('Should test getStarknetIdContract', () => {
    expect(getStarknetIdContract(StarknetChainId.SN_SEPOLIA)).toBe(
      '0x154bc2e1af9260b9e66af0e9c46fc757ff893b3ff6a85718a810baf1474'
    );

    expect(getStarknetIdContract(StarknetChainId.SN_MAIN)).toBe(
      '0x6ac597f8116f886fa1c97a23fa4e08299975ecaf6b598873ca6792b9bbfb678'
    );
  });

  test('Should validate StarknetId domains without backtracking', () => {
    expect(isStarkDomain('example.stark')).toBe(true);
    expect(isStarkDomain('sub.example.stark')).toBe(true);
    expect(isStarkDomain('invalid-domain')).toBe(false);
    expect(isStarkDomain('UPPER.stark')).toBe(false);
    expect(isStarkDomain(`${'a'.repeat(49)}.stark`)).toBe(false);
    expect(isStarkDomain(`${'---.'.repeat(10_000)}.stark`)).toBe(false);
  });

  test('Should validate StarknetId domain label boundaries', () => {
    // 47 chars — the longest ASCII label whose encoding still fits in a felt
    expect(isStarkDomain(`${'a'.repeat(47)}.stark`)).toBe(true);
    // subdomain label of 47 chars — valid
    expect(isStarkDomain(`${'a'.repeat(47)}.example.stark`)).toBe(true);
    // 48 chars — under the 48-char label limit, but the encoding overflows the felt
    expect(isStarkDomain(`${'a'.repeat(48)}.stark`)).toBe(false);
    // subdomain label 49 chars — invalid (uniform 48-char limit on all labels)
    expect(isStarkDomain(`${'a'.repeat(49)}.example.stark`)).toBe(false);
    // empty label from double dot — invalid
    expect(isStarkDomain('a..stark')).toBe(false);
    // no name before .stark — invalid
    expect(isStarkDomain('.stark')).toBe(false);
  });

  test('Should accept bigAlphabet characters that the encoder supports', () => {
    // '这' and '来' are the two bigAlphabet characters used by useEncoded/useDecoded.
    // The encoder round-trips names containing them, so the guard must accept them too,
    // otherwise getAddressFromStarkName rejects names the same version encodes correctly.
    expect(isStarkDomain('来baba这.stark')).toBe(true);
    expect(isStarkDomain('starknet这.stark')).toBe(true);
    expect(isStarkDomain('这.stark')).toBe(true);

    // guard stays consistent with the encoder for the same name
    const name = '来baba这';
    expect(useDecoded([useEncoded(name)])).toBe(`${name}.stark`);
    expect(isStarkDomain(`${name}.stark`)).toBe(true);

    // a bigAlphabet character eats far more encoding capacity than an ASCII one, so what caps
    // these labels is the felt bound, not the 48-char limit: 20 chars for '来', 40 for '这'
    expect(isStarkDomain(`${'来'.repeat(20)}.stark`)).toBe(true);
    expect(isStarkDomain(`${'来'.repeat(21)}.stark`)).toBe(false);
    expect(isStarkDomain(`${'这'.repeat(40)}.stark`)).toBe(true);
    expect(isStarkDomain(`${'这'.repeat(41)}.stark`)).toBe(false);
  });

  test('Should reject characters outside the Starknet.id alphabets', () => {
    // An unknown character used to be skipped silently, so a mistyped name encoded as an
    // existing one: 'Grug' and 'rug' both gave 9441n and resolved to the very same address.
    expect(() => useEncoded('Grug')).toThrow('Invalid character "G"');
    expect(() => useEncoded('cafè')).toThrow('Invalid character "è"');
    // useEncoded takes a single label, so the separator is not part of its alphabets either
    expect(() => useEncoded('starknet.js')).toThrow('Invalid character "."');

    // the guard reports the same names as invalid, rather than resolving another account
    expect(isStarkDomain('Grug.stark')).toBe(false);
    expect(isStarkDomain('cafè.stark')).toBe(false);
  });
});
