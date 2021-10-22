import starknet, { CompiledContract, compressProgram, randomAddress, makeAddress } from '..';
import compiledArgentAccount from '../__mocks__/ArgentAccount.json';

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
    test('addTransaction() deploy', async () => {
      const inputContract = compiledArgentAccount as unknown as CompiledContract;

      const contractDefinition = {
        ...inputContract,
        program: compressProgram(JSON.stringify(inputContract.program)),
      };

      const response = await starknet.addTransaction({
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

      const response = await starknet.deployContract(
        inputContract,
        makeAddress('0x20b5B1b8aFd65F1FCB755a449000cFC4aBCA0D40')
      );
      expect(response.code).toBe('TRANSACTION_RECEIVED');
      expect(response.tx_id).toBeGreaterThan(0);

      // I want to show the tx number to the tester, so he/she can trace the transaction in the explorer.
      // eslint-disable-next-line no-console
      console.log('txId:', response.tx_id);
    });
  });

  describe('gateway endpoints', () => {
    xtest('addTransaction()', () => {});
  });
});
