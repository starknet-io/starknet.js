import { BlockNumber, stark } from '../src';
import { toBN } from '../src/utils/number';
import { compiledErc20, compiledOpenZeppelinAccount, getTestProvider } from './fixtures';

const { compileCalldata } = stark;

const provider = getTestProvider();

const testIf = (condition: boolean) => (condition ? test : test.skip);

describe('defaultProvider', () => {
  let exampleTransactionHash: string;
  let exampleContractAddress: string;
  let exampleBlockHash: string;
  let exampleBlockNumber: BlockNumber;
  beforeAll(async () => {
    const { code, transaction_hash, address } = await provider.deployContract({
      contract: compiledErc20,
    });
    expect(code).toBe('TRANSACTION_RECEIVED');
    await provider.waitForTransaction(transaction_hash);
    exampleTransactionHash = transaction_hash;
    exampleContractAddress = address!;
    const transaction = await provider.getTransaction(transaction_hash);

    if (transaction.status !== 'REJECTED') {
      exampleBlockHash = transaction.block_hash;
      exampleBlockNumber = transaction.block_number;
      console.log(exampleBlockNumber);
    }
  });

  describe('feeder gateway endpoints', () => {
    testIf(provider.baseUrl.includes('starknet.io'))('getContractAddresses()', async () => {
      // not supported in starknet-devnet
      const { GpsStatementVerifier, Starknet } = await provider.getContractAddresses();
      expect(typeof GpsStatementVerifier).toBe('string');
      expect(typeof Starknet).toBe('string');
    });
    test(`getBlock(blockHash=${exampleBlockHash}, blockNumber=undefined)`, () => {
      return expect(provider.getBlock(exampleBlockHash)).resolves.not.toThrow();
    });
    test(`getBlock(blockHash=undefined, blockNumber=${exampleBlockNumber})`, () => {
      return expect(provider.getBlock(exampleBlockNumber)).resolves.not.toThrow();
    });
    test('getBlock(blockHash=undefined, blockNumber=null)', () => {
      return expect(provider.getBlock()).resolves.not.toThrow();
    });
    test('getBlock() -> { blockNumber }', async () => {
      const block = await provider.getBlock();
      return expect(block).toHaveProperty('block_number');
    });
    test('getCode()', () => {
      return expect(provider.getCode(exampleContractAddress, 36663)).resolves.not.toThrow();
    });
    test('getCode(blockHash=undefined, blockNumber=null)', () => {
      return expect(provider.getCode(exampleContractAddress)).resolves.not.toThrow();
    });
    test('getStorageAt() with "key" type of number', () => {
      return expect(provider.getStorageAt(exampleContractAddress, 0, 36663)).resolves.not.toThrow();
    });
    test('getStorageAt() with "key" type of string', () => {
      return expect(
        provider.getStorageAt(exampleContractAddress, '0', 36663)
      ).resolves.not.toThrow();
    });
    test('getStorageAt() with "key" type of BN', () => {
      return expect(
        provider.getStorageAt(exampleContractAddress, toBN('0x0'), 36663)
      ).resolves.not.toThrow();
    });
    test('getStorageAt(blockHash=undefined, blockNumber=null)', () => {
      return expect(provider.getStorageAt(exampleContractAddress, 0)).resolves.not.toThrow();
    });
    test('getTransactionStatus()', async () => {
      return expect(provider.getTransactionStatus(exampleTransactionHash)).resolves.not.toThrow();
    });

    test('getTransaction() - successful transaction', async () => {
      const transaction = await provider.getTransaction(exampleTransactionHash);

      expect(transaction).not.toHaveProperty('transaction_failure_reason');

      expect(transaction.transaction).toHaveProperty('transaction_hash');

      return expect(transaction.status).not.toEqual('REJECTED');
    });

    test('getTransactionReceipt() - successful transaction', async () => {
      const transactionReceipt = await provider.getTransactionReceipt(exampleTransactionHash);

      return expect(transactionReceipt).toHaveProperty('actual_fee');
    });

    test('callContract()', () => {
      return expect(
        provider.callContract({
          contractAddress: exampleContractAddress,
          entrypoint: 'balance_of',
          calldata: compileCalldata({
            user: '0x9ff64f4ab0e1fe88df4465ade98d1ea99d5732761c39279b8e1374fa943e9b',
          }),
        })
      ).resolves.not.toThrow();
    });

    test('transaction trace', async () => {
      const transactionTrace = await provider.getTransactionTrace(exampleTransactionHash);
      expect(transactionTrace).toHaveProperty('function_invocation');
      expect(transactionTrace).toHaveProperty('signature');
    });
  });

  describe('addTransaction()', () => {
    test('declareContract()', async () => {
      const response = await provider.declareContract({
        contract: compiledErc20,
      });

      expect(response.code).toBe('TRANSACTION_RECEIVED');
      expect(response.transaction_hash).toBeDefined();
      expect(response.class_hash).toBeDefined();
    });

    test('deployContract()', async () => {
      const response = await provider.deployContract({
        contract: compiledOpenZeppelinAccount,
      });

      expect(response.code).toBe('TRANSACTION_RECEIVED');
      expect(response.transaction_hash).toBeDefined();
      expect(response.address).toBeDefined();
    });
  });
});
