import { keccakBn, starknetKeccak, getSelectorFromName, getSelector } from '../../src/utils/hash';
import { constants, hash } from '../../src';

describe('keccakBn', () => {
  test('should properly calculate the Keccak hash', () => {
    expect(keccakBn('0xabc')).toBe(
      '0x11cf08aac85935e32397f410e48217a127b6855d41b1e3877eb4179c0904b77'
    );
  });
});

describe('starknetKeccak', () => {
  test('should properly calculate the starknet BigInt Keccak hash', () => {
    expect(starknetKeccak('test').toString()).toBe(
      '61835310290161785288773114225739080147441215596947647498723774891619563096'
    );
  });
});

describe('getSelectorFromName', () => {
  test('should properly calculate the selector', () => {
    expect(getSelectorFromName('myFunction')).toBe(
      '0xc14cfe23f3fa7ce7b1f8db7d7682305b1692293f71a61cc06637f0d8d8b6c8'
    );
  });
});

describe('getSelector', () => {
  test('should return the proper selector when provided a function name', () => {
    expect(getSelector('myFunction')).toBe(
      '0xc14cfe23f3fa7ce7b1f8db7d7682305b1692293f71a61cc06637f0d8d8b6c8'
    );
  });

  test('should return the proper selector when provided a hex-string', () => {
    expect(getSelector('0x123abc')).toBe('0x123abc');
  });

  test('should return the proper selector when provided a decimal string', () => {
    expect(getSelector('123456')).toBe('0x1e240');
  });

  test('should return the proper selector when provided a number', () => {
    expect(getSelector(123456)).toBe('0x1e240');
  });

  test('should return the proper selector when provided a bigint', () => {
    expect(getSelector(123456n)).toBe('0x1e240');
  });
});

describe('L1->L2 messaging', () => {
  // L1 tx for a message L1->L2
  // data extracted from :
  // https://sepolia.etherscan.io/tx/0xd82ce7dd9f3964d89d2eb9d555e1460fb7792be274950abe578d610f95cc40f5
  // data extracted from etherscan :
  const l1FromAddress = '0x0000000000000000000000008453fc6cd1bcfe8d4dfc069c400b433054d47bdc';
  const l2ToAddress = 2158142789748719025684046545159279785659305214176670733242887773692203401023n;
  const l2Selector = 774397379524139446221206168840917193112228400237242521560346153613428128537n;
  const payload = [
    4543560n,
    829565602143178078434185452406102222830667255948n,
    3461886633118033953192540141609307739580461579986333346825796013261542798665n,
    9000000000000000n,
    0n,
  ];
  const l1Nonce = 8288n;

  test('solidityUint256PackedKeccak256', () => {
    const kec256Hash = hash.solidityUint256PackedKeccak256(['0x100', '200', 300, 400n]);
    expect(kec256Hash).toBe('0xd1e6cb422b65269603c491b0c85463295edabebfb2a6844e4fdc389ff1dcdd97');
  });

  test('getL2MessageHash', () => {
    // https://sepolia.starkscan.co/message/0x2e350fa9d830482605cb68be4fdb9f0cb3e1f95a0c51623ac1a5d1bd997c2090#messagelogs
    const l1ToL2MessageHash = hash.getL2MessageHash(
      l1FromAddress,
      l2ToAddress,
      l2Selector,
      payload,
      l1Nonce
    );
    expect(l1ToL2MessageHash).toBe(
      '0x2e350fa9d830482605cb68be4fdb9f0cb3e1f95a0c51623ac1a5d1bd997c2090'
    );
  });

  test('calculateL2MessageTxHash', () => {
    // https://sepolia.starkscan.co/tx/0x067d959200d65d4ad293aa4b0da21bb050a1f669bce37d215c6edbf041269c07
    const l2TxHash = hash.calculateL2MessageTxHash(
      l1FromAddress,
      l2ToAddress,
      l2Selector,
      payload,
      constants.StarknetChainId.SN_SEPOLIA,
      l1Nonce
    );
    expect(l2TxHash).toBe('0x67d959200d65d4ad293aa4b0da21bb050a1f669bce37d215c6edbf041269c07');
  });
});
