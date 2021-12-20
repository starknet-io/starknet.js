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
    test('getBlock(blockHash=0x3b5c37445d93c58d334ade3be988acf0cf37b57955e77e4b8fe6f6c9b2b8e31, blockNumber=26575)', () => {
      return expect(
        defaultProvider.getBlock(
          '0x3b5c37445d93c58d334ade3be988acf0cf37b57955e77e4b8fe6f6c9b2b8e31',
          26575
        )
      ).resolves.not.toThrow();
    });
    test('getBlock(blockHash=null, blockNumber=null)', () => {
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
    test('getTransactionStatus()', async () => {
      return expect(
        defaultProvider.getTransactionStatus(
          '0x72add9621ecdcb07405a4f943fe410bf57003ca250400f01ce70f8a6fc72147'
        )
      ).resolves.not.toThrow();
    });
    test('getTransaction()', async () => {
      return expect(
        defaultProvider.getTransaction(
          '0x72add9621ecdcb07405a4f943fe410bf57003ca250400f01ce70f8a6fc72147'
        )
      ).resolves.not.toThrow();
    });
    test('callContract()', () => {
      return expect(
        defaultProvider.callContract({
          contract_address: '0x9ff64f4ab0e1fe88df4465ade98d1ea99d5732761c39279b8e1374fa943e9b',
          entry_point_selector: stark.getSelectorFromName('balance_of'),
          calldata: compileCalldata({
            user: '0x9ff64f4ab0e1fe88df4465ade98d1ea99d5732761c39279b8e1374fa943e9b',
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
