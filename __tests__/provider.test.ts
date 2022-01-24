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
    test('getBlock(blockHash=0x3bca19c3d5983e21e9537669b15f951f0664f0747a083dc714e0b9648b8575d, blockNumber=undefined)', () => {
      return expect(
        defaultProvider.getBlock(
          '0x3bca19c3d5983e21e9537669b15f951f0664f0747a083dc714e0b9648b8575d'
        )
      ).resolves.not.toThrow();
    });
    test('getBlock(blockHash=undefined, blockNumber=36657)', () => {
      return expect(defaultProvider.getBlock(undefined, 36657)).resolves.not.toThrow();
    });
    test('getBlock(blockHash=undefined, blockNumber=null)', () => {
      return expect(defaultProvider.getBlock()).resolves.not.toThrow();
    });
    test('getBlock() -> { blockNumber }', async () => {
      const block = await defaultProvider.getBlock();
      return expect(block).toHaveProperty('block_number');
    });
    test('getCode()', () => {
      return expect(
        defaultProvider.getCode(
          '0x01d1f307c073bb786a66e6e042ec2a9bdc385a3373bb3738d95b966d5ce56166',
          undefined,
          36663
        )
      ).resolves.not.toThrow();
    });
    test('getCode(blockHash=undefined, blockNumber=null)', () => {
      return expect(
        defaultProvider.getCode(
          '0x01d1f307c073bb786a66e6e042ec2a9bdc385a3373bb3738d95b966d5ce56166'
        )
      ).resolves.not.toThrow();
    });
    test('getStorageAt()', () => {
      return expect(
        defaultProvider.getStorageAt(
          '0x01d1f307c073bb786a66e6e042ec2a9bdc385a3373bb3738d95b966d5ce56166',
          0,
          undefined,
          36663
        )
      ).resolves.not.toThrow();
    });
    test('getStorageAt(blockHash=undefined, blockNumber=null)', () => {
      return expect(
        defaultProvider.getStorageAt(
          '0x01d1f307c073bb786a66e6e042ec2a9bdc385a3373bb3738d95b966d5ce56166',
          0
        )
      ).resolves.not.toThrow();
    });
    test('getTransactionStatus()', async () => {
      return expect(
        defaultProvider.getTransactionStatus(
          '0x37013e1cb9c133e6fe51b4b371b76b317a480f56d80576730754c1662582348'
        )
      ).resolves.not.toThrow();
    });
    test('getTransaction()', async () => {
      return expect(
        defaultProvider.getTransaction(
          '0x37013e1cb9c133e6fe51b4b371b76b317a480f56d80576730754c1662582348'
        )
      ).resolves.not.toThrow();
    });

    test('getTransactionReceipt', async () => {
      return expect(
        defaultProvider.getTransactionReceipt({
          txHash: '0x37013e1cb9c133e6fe51b4b371b76b317a480f56d80576730754c1662582348',
        })
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
