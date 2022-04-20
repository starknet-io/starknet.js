import { StarknetChainId, TransactionHashPrefix } from '../../src/constants';
import { calculateTransactionHashCommon } from '../../src/utils/hash';

describe('calculateTransactionHashCommon()', () => {
  test('should match most simple python output', () => {
    const result = calculateTransactionHashCommon(
      TransactionHashPrefix.INVOKE,
      '0x0',
      '0x2a',
      '0x64',
      [],
      '0x0',
      StarknetChainId.TESTNET
    );
    expect(result).toBe('0x7d260744de9d8c55e7675a34512d1951a7b262c79e685d26599edd2948de959');
  });
});
