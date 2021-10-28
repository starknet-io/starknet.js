import fs from 'fs';
import {
  CompiledContract,
  compressProgram,
  randomAddress,
  JsonParser,
  getContractAddresses,
  getBlock,
  getCode,
  getStorageAt,
  getTransactionStatus,
  getTransaction,
  addTransaction,
  deployContract,
} from '../src';

const compiledArgentAccount = JsonParser.parse(
  fs.readFileSync('./__mocks__/ArgentAccount.json').toString('ascii')
);

describe('starknet endpoints', () => {
  describe('feeder gateway endpoints', () => {
    test('getContractAddresses()', () => {
      return expect(getContractAddresses()).resolves.not.toThrow();
    });
    xtest('callContract()', () => {});
    test('getBlock()', () => {
      return expect(getBlock(46500)).resolves.not.toThrow();
    });
    test('getBlock(blockId=null)', () => {
      return expect(getBlock()).resolves.not.toThrow();
    });
    test('getCode()', () => {
      return expect(
        getCode('0x5f778a983bf8760ad37868f4c869d70247c5546044a7f0386df96d8043d4e9d', 46500)
      ).resolves.not.toThrow();
    });
    test('getCode(blockId=null)', () => {
      return expect(
        getCode('0x5f778a983bf8760ad37868f4c869d70247c5546044a7f0386df96d8043d4e9d')
      ).resolves.not.toThrow();
    });
    test('getStorageAt()', () => {
      return expect(
        getStorageAt('0x5f778a983bf8760ad37868f4c869d70247c5546044a7f0386df96d8043d4e9d', 0, 46500)
      ).resolves.not.toThrow();
    });
    test('getStorageAt(blockId=null)', () => {
      return expect(
        getStorageAt('0x5f778a983bf8760ad37868f4c869d70247c5546044a7f0386df96d8043d4e9d', 0)
      ).resolves.not.toThrow();
    });
    test('getTransactionStatus()', () => {
      return expect(getTransactionStatus(286136)).resolves.not.toThrow();
    });
    test('getTransaction()', () => {
      return expect(getTransaction(286136)).resolves.not.toThrow();
    });
  });

  describe('addTransaction()', () => {
    test('type: "DEPLOY"', async () => {
      const inputContract = compiledArgentAccount as unknown as CompiledContract;

      const contractDefinition = {
        ...inputContract,
        program: compressProgram(inputContract.program),
      };

      const response = await addTransaction({
        type: 'DEPLOY',
        contract_address: randomAddress(),
        contract_definition: contractDefinition,
      });
      expect(response.code).toBe('TRANSACTION_RECEIVED');
      expect(response.tx_id).toBeGreaterThan(0);

      // I want to show the tx number to the tester, so he/she can trace the transaction in the explorer.
      // eslint-disable-next-line no-console
      console.log('txId:', response.tx_id);
    });

    test('deployContract()', async () => {
      const inputContract = compiledArgentAccount as unknown as CompiledContract;

      const response = await deployContract(inputContract);
      expect(response.code).toBe('TRANSACTION_RECEIVED');
      expect(response.tx_id).toBeGreaterThan(0);

      // I want to show the tx number to the tester, so he/she can trace the transaction in the explorer.
      // eslint-disable-next-line no-console
      console.log('txId:', response.tx_id);
    });
  });
});
