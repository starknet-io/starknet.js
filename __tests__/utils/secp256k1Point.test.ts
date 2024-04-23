/* eslint-disable no-new */
import { CallData } from '../../src/utils/calldata';
import { bigNumberishArrayToDecimalStringArray, toHex } from '../../src/utils/num';
import { compiledEthAccount, compiledEthPubk } from '../config/fixtures';

describe('secp256k1Point cairo type test', () => {
  const myCallDataAccount = new CallData(compiledEthAccount.abi);
  const myCallDataTest = new CallData(compiledEthPubk.abi);
  const ethPubKey =
    '0x8c7aea7d673a5858bdca128d124fb0765cceb2c16f198f4c14b328aa571331e6f6c87f51d5224d73d118765cb19d7565212f80be5048bff926ba791c17541c92';
  test('secp256k1Point is an u512', () => {
    const point = toHex(2n ** 512n);
    expect(() => {
      myCallDataAccount.compile('constructor', {
        public_key: point,
      });
    }).toThrow(
      'Validate: arg public_key must be core::starknet::secp256k1::Secp256k1Point : a 512 bits number.'
    );
  });

  test('secp256k1Point compile', () => {
    const res = myCallDataAccount.compile('constructor', {
      public_key: ethPubKey,
    });
    expect(res).toEqual(
      bigNumberishArrayToDecimalStringArray([
        '0x5cceb2c16f198f4c14b328aa571331e6',
        '0x8c7aea7d673a5858bdca128d124fb076',
        '0x212f80be5048bff926ba791c17541c92',
        '0xf6c87f51d5224d73d118765cb19d7565',
      ])
    );
  });

  test('secp256k1Point parse', () => {
    const res = myCallDataTest.parse('get_public_key', [
      '0x5cceb2c16f198f4c14b328aa571331e6',
      '0x8c7aea7d673a5858bdca128d124fb076',
      '0x212f80be5048bff926ba791c17541c92',
      '0xf6c87f51d5224d73d118765cb19d7565',
    ]);
    expect(res).toBe(BigInt(ethPubKey));
  });
});
