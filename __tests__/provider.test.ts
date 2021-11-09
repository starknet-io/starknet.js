import fs from 'fs';

import { CompiledContract, compileCalldata, defaultProvider, json, stark } from '../src';

const compiledArgentAccount = json.parse(
  fs.readFileSync('./__mocks__/ArgentAccount.json').toString('ascii')
);

describe('defaultProvider', () => {
  describe('feeder gateway endpoints', () => {
    test('getContractAddresses()', async () => {
      const { GpsStatementVerifier, Starknet } = await defaultProvider.getContractAddresses();
      expect(typeof GpsStatementVerifier).toBe('string');
      expect(typeof Starknet).toBe('string');
    });
    test('getBlock()', () => {
      return expect(defaultProvider.getBlock(870)).resolves.not.toThrow();
    });
    test('getBlock(blockId=null)', () => {
      return expect(defaultProvider.getBlock()).resolves.not.toThrow();
    });
    test('getCode()', () => {
      return expect(
        defaultProvider.getCode(
          '0x163a1542a64402ffc93e39a4962eec51ce126f2e634631d3f1f6770a76e3a61',
          870
        )
      ).resolves.not.toThrow();
    });
    test('getCode(blockId=null)', () => {
      return expect(
        defaultProvider.getCode('0x163a1542a64402ffc93e39a4962eec51ce126f2e634631d3f1f6770a76e3a61')
      ).resolves.not.toThrow();
    });
    test('getStorageAt()', () => {
      return expect(
        defaultProvider.getStorageAt(
          '0x163a1542a64402ffc93e39a4962eec51ce126f2e634631d3f1f6770a76e3a61',
          0,
          870
        )
      ).resolves.not.toThrow();
    });
    test('getStorageAt(blockId=null)', () => {
      return expect(
        defaultProvider.getStorageAt(
          '0x163a1542a64402ffc93e39a4962eec51ce126f2e634631d3f1f6770a76e3a61',
          0
        )
      ).resolves.not.toThrow();
    });
    test('getTransactionStatus()', () => {
      return expect(
        defaultProvider.getTransactionStatus(
          '0x2086ff26645fb0e31a3e252302f3cb1e7612c60389102e5473dfc89758a3aa9'
        )
      ).resolves.not.toThrow();
    });
    test('getTransaction()', async () => {
      return expect(
        defaultProvider.getTransaction(
          '0x2086ff26645fb0e31a3e252302f3cb1e7612c60389102e5473dfc89758a3aa9'
        )
      ).resolves.not.toThrow();
    });
    test('callContract()', () => {
      return expect(
        defaultProvider.callContract({
          contract_address: '0x58bceda58a83a5a100117ddc893234bad9c84a6833c2008f0f1ca90150149af',
          entry_point_selector: stark.getSelectorFromName('balance_of'),
          calldata: compileCalldata({
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
        program: stark.compressProgram(inputContract.program),
      };

      const response = await defaultProvider.addTransaction({
        type: 'DEPLOY',
        contract_address_salt: stark.randomAddress(),
        constructor_calldata: compileCalldata({
          signer: stark.randomAddress(),
          guardian: '0',
          L1_address: '0',
        }),
        contract_definition: contractDefinition,
      });

      expect(response.code).toBe('TRANSACTION_RECEIVED');
      expect(response.transaction_hash).toBeDefined();
      expect(response.address).toBeDefined();
    });

    test('deployContract()', async () => {
      const inputContract = compiledArgentAccount as unknown as CompiledContract;

      const response = await defaultProvider.deployContract(
        inputContract,
        compileCalldata({
          signer: stark.randomAddress(),
          guardian: '0',
          L1_address: '0',
        })
      );

      expect(response.code).toBe('TRANSACTION_RECEIVED');
      expect(response.transaction_hash).toBeDefined();
      expect(response.address).toBeDefined();
    });
  });
});
