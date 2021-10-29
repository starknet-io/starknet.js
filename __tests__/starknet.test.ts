import fs from 'fs';

import {
  CompiledContract,
  Contract,
  addTransaction,
  callContract,
  deployContract,
  getBlock,
  getCode,
  getContractAddresses,
  getStorageAt,
  getTransaction,
  getTransactionStatus,
  utils,
} from '../src';
import { getSelectorFromName } from '../src/utils/starknet';

const {
  json: { parse },
  starknet: { compressProgram, randomAddress },
} = utils;

const compiledArgentAccount = parse(
  fs.readFileSync('./__mocks__/ArgentAccount.json').toString('ascii')
);

describe('starknet endpoints', () => {
  describe('feeder gateway endpoints', () => {
    test('getContractAddresses()', () => {
      return expect(getContractAddresses()).resolves.not.toThrow();
    });
    test('getBlock()', () => {
      return expect(getBlock(870)).resolves.not.toThrow();
    });
    test('getBlock(blockId=null)', () => {
      return expect(getBlock()).resolves.not.toThrow();
    });
    test('getCode()', () => {
      return expect(
        getCode('0x163a1542a64402ffc93e39a4962eec51ce126f2e634631d3f1f6770a76e3a61', 870)
      ).resolves.not.toThrow();
    });
    test('getCode(blockId=null)', () => {
      return expect(
        getCode('0x163a1542a64402ffc93e39a4962eec51ce126f2e634631d3f1f6770a76e3a61')
      ).resolves.not.toThrow();
    });
    test('getStorageAt()', () => {
      return expect(
        getStorageAt('0x163a1542a64402ffc93e39a4962eec51ce126f2e634631d3f1f6770a76e3a61', 0, 870)
      ).resolves.not.toThrow();
    });
    test('getStorageAt(blockId=null)', () => {
      return expect(
        getStorageAt('0x163a1542a64402ffc93e39a4962eec51ce126f2e634631d3f1f6770a76e3a61', 0)
      ).resolves.not.toThrow();
    });
    test('getTransactionStatus()', () => {
      return expect(
        getTransactionStatus('0x2086ff26645fb0e31a3e252302f3cb1e7612c60389102e5473dfc89758a3aa9')
      ).resolves.not.toThrow();
    });
    test('getTransaction()', () => {
      return expect(
        getTransaction('0x2086ff26645fb0e31a3e252302f3cb1e7612c60389102e5473dfc89758a3aa9')
      ).resolves.not.toThrow();
    });
    test('callContract()', () => {
      return expect(
        callContract({
          contract_address: '0x58bceda58a83a5a100117ddc893234bad9c84a6833c2008f0f1ca90150149af',
          entry_point_selector: getSelectorFromName('balance_of'),
          calldata: Contract.compileCalldata({
            user: '0x58bceda58a83a5a100117ddc893234bad9c84a6833c2008f0f1ca90150149af',
          }),
        })
      ).resolves.not.toThrow();
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
        contract_address_salt: randomAddress(),
        constructor_calldata: Contract.compileCalldata({
          signer: randomAddress(),
          guardian: '0',
          L1_address: '0',
        }),
        contract_definition: contractDefinition,
      });

      expect(response.code).toBe('TRANSACTION_RECEIVED');
      expect(response.transaction_hash).toBeDefined();
      expect(response.address).toBeDefined();

      // I want to show the tx number to the tester, so he/she can trace the transaction in the explorer.
      // eslint-disable-next-line no-console
      console.log('txHash:', response.transaction_hash);
    });

    test('deployContract()', async () => {
      const inputContract = compiledArgentAccount as unknown as CompiledContract;

      const response = await deployContract(
        inputContract,
        Contract.compileCalldata({
          signer: randomAddress(),
          guardian: '0',
          L1_address: '0',
        })
      );

      expect(response.code).toBe('TRANSACTION_RECEIVED');
      expect(response.transaction_hash).toBeDefined();
      expect(response.address).toBeDefined();

      // I want to show the tx number to the tester, so he/she can trace the transaction in the explorer.
      // eslint-disable-next-line no-console
      console.log('txHash:', response.transaction_hash);
    });
  });
});
