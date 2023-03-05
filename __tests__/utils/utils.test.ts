import { constants, hash, num, stark } from '../../src';
import { Block } from '../../src/provider/utils';

const { IS_BROWSER } = constants;

test('isNode', () => {
  expect(IS_BROWSER).toBe(false);
});

describe('hexToDecimalString()', () => {
  test('parse 0xa23', () => {
    expect(num.hexToDecimalString('0xa23')).toBe('2595');
  });
});

describe('cleanHex()', () => {
  test('parse 0xa23', () => {
    expect(num.cleanHex('0x023Ab')).toBe('0x23ab');
    expect(num.cleanHex('0x000023Ab')).toBe('0x23ab');
    expect(num.cleanHex('0x23Ab')).toBe('0x23ab');
  });
});

describe('makeAddress()', () => {
  test('test on eth address', () => {
    const ethAddress = '0xdFD0F27FCe99b50909de0bDD328Aed6eAbe76BC5';

    const starkAddress = stark.makeAddress(ethAddress);

    expect(starkAddress).toBe('0xdfd0f27fce99b50909de0bdd328aed6eabe76bc5');
  });
});

describe('estimatedFeeToMaxFee()', () => {
  test('should return maxFee for 0', () => {
    const res = stark.estimatedFeeToMaxFee(0, 0.15);
    expect(res).toBe(0n);
  });
  test('should return maxFee for 10_000', () => {
    const res = stark.estimatedFeeToMaxFee(10_000, 0.15);
    expect(res).toBe(11500n);
  });
});

describe('calculateContractAddressFromHash()', () => {
  // This test just show how to use calculateContractAddressFromHash for new devs

  test('calculated contract address should match the snapshot', () => {
    const ethAddress = '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7';

    const daiAddress = '0x03e85bfbb8e2a42b7bead9e88e9a1b19dbccf661471061807292120462396ec9';
    const factoryAddress = '0x249827618A01858A72B7D04339C47195A324D20D6037033DFE2829F98AFF4FC';
    const classHash = '0x55187E68C60664A947048E0C9E5322F9BF55F7D435ECDCF17ED75724E77368F';

    // Any type of salt can be used. It depends on the dApp what kind of salt it wants to use.
    const salt = hash.pedersen(ethAddress, daiAddress);

    const res = hash.calculateContractAddressFromHash(
      salt,
      classHash,
      [ethAddress, daiAddress, factoryAddress],
      factoryAddress
    );

    expect(res).toMatchInlineSnapshot(
      `"0x36dc8dcb3440596472ddde11facacc45d0cd250df764ae7c3d1a360c853c324"`
    );
  });
});

describe('new Block()', () => {
  test('Block identifier and queryIdentifier', () => {
    const blockA = new Block(0);
    expect(blockA.identifier).toMatchObject({ block_number: 0 });
    expect(blockA.queryIdentifier).toBe('blockNumber=0');

    const blockB = new Block('latest');
    expect(blockB.identifier).toBe('latest');
    expect(blockB.queryIdentifier).toBe('blockNumber=latest');

    const blockC = new Block('0x01');
    expect(blockC.identifier).toMatchObject({ block_hash: '0x01' });
    expect(blockC.queryIdentifier).toBe('blockHash=0x01');
  });
});
