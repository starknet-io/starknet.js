import * as starknet from '../';

describe('starknet endpoints', () => {
  describe('feeder gateway endpoints', () => {
    test('getContractAddresses()', () => {
      return expect(starknet.getContractAddresses()).resolves.not.toThrow();
    });
    xtest('callContract()', () => {});
    test('getBlock()', () => {
      return expect(starknet.getBlock(46500)).resolves.not.toThrow();
    });
    test('getCode()', () => {
      return expect(
        starknet.getCode('0x5f778a983bf8760ad37868f4c869d70247c5546044a7f0386df96d8043d4e9d', 46500)
      ).resolves.not.toThrow();
    });
    test('getStorageAt()', () => {
      return expect(
        starknet.getStorageAt(
          '0x5f778a983bf8760ad37868f4c869d70247c5546044a7f0386df96d8043d4e9d',
          0,
          46500
        )
      ).resolves.not.toThrow();
    });
    test('getTransactionStatus()', () => {
      return expect(starknet.getTransactionStatus(286136)).resolves.not.toThrow();
    });
    test('getTransaction()', () => {
      return expect(starknet.getTransaction(286136)).resolves.not.toThrow();
    });
    xtest('addTransaction()', () => {});
  });

  describe('gateway endpoints', () => {
    xtest('addTransaction()', () => {});
  });
});
