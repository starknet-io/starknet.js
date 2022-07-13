import { BlockNumber, GetBlockResponse, stark } from '../src';
import { toBN } from '../src/utils/number';
import { IS_DEVNET, compiledErc20, compiledOpenZeppelinAccount, getTestProvider } from './fixtures';

const { compileCalldata } = stark;

const provider = getTestProvider();

describe('defaultProvider', () => {
  let exampleTransactionHash: string;
  let exampleContractAddress: string;

  let exampleBlock!: GetBlockResponse;
  let exampleBlockNumber!: BlockNumber;
  let exampleBlockHash!: string;

  beforeAll(async () => {
    const { transaction_hash, contract_address } = await provider.deployContract({
      contract: compiledErc20,
    });
    await provider.waitForTransaction(transaction_hash);
    exampleTransactionHash = transaction_hash;
    exampleContractAddress = contract_address;

    exampleBlock = await provider.getBlock();
    exampleBlockHash = exampleBlock.block_hash;
    exampleBlockNumber = exampleBlock.block_number;
  });

  describe('endpoints', () => {
    test(`getBlock(blockHash=undefined, blockNumber=${exampleBlockNumber})`, () => {
      return expect(provider.getBlock(exampleBlockNumber)).resolves.not.toThrow();
    });

    test(`getBlock(blockHash=${exampleBlockHash}, blockNumber=undefined)`, () => {
      return expect(provider.getBlock(exampleBlockHash)).resolves.not.toThrow();
    });

    test('getBlock(blockHash=undefined, blockNumber=null)', async () => {
      expect(exampleBlock).not.toBeNull();

      const { block_number, accepted_time } = exampleBlock;

      expect(typeof block_number).toEqual('number');

      return expect(typeof accepted_time).toEqual('number');
    });

    test('getBlock() -> { blockNumber }', async () => {
      const block = await provider.getBlock();
      return expect(block).toHaveProperty('block_number');
    });

    describe('getStorageAt', () => {
      test('with "key" type of number', () => {
        return expect(
          provider.getStorageAt(exampleContractAddress, 0, 36663)
        ).resolves.not.toThrow();
      });

      test('"key" type of string', () => {
        return expect(
          provider.getStorageAt(exampleContractAddress, '0x0', 36663)
        ).resolves.not.toThrow();
      });

      test('with "key" type of BN', () => {
        return expect(
          provider.getStorageAt(exampleContractAddress, toBN('0x0'), 36663)
        ).resolves.not.toThrow();
      });

      test('(blockHash=undefined, blockNumber=null)', () => {
        return expect(provider.getStorageAt(exampleContractAddress, 0)).resolves.not.toThrow();
      });
    });

    test('getTransaction() - successful transaction', async () => {
      const transaction = await provider.getTransaction(exampleTransactionHash);

      expect(transaction).toHaveProperty('transaction_hash');
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

    test('callContract() - gateway error', async () => {
      const promise = provider.callContract({
        contractAddress: exampleContractAddress,
        entrypoint: 'non_existent_entrypoint',
        calldata: compileCalldata({
          user: '0xdeadbeef',
        }),
      });
      expect(promise).rejects.toHaveProperty('errorCode');
      expect(promise).rejects.toThrowErrorMatchingInlineSnapshot(
        `"Entry point 0x23b0c8b3d98aa73d8a35f5303fe77d132c6d04279e63f6e1d6aac5946e04612 not found in contract with class hash 0x2864c45bd4ba3e66d8f7855adcadf07205c88f43806ffca664f1f624765207e."`
      );

      try {
        await promise;
      } catch (e) {
        expect(e.errorCode).toMatchInlineSnapshot(
          IS_DEVNET ? `500` : `"StarknetErrorCode.ENTRY_POINT_NOT_FOUND_IN_CONTRACT"`
        );
      }
    });
  });

  describe('addTransaction()', () => {
    test('declareContract()', async () => {
      const response = await provider.declareContract({
        contract: compiledErc20,
      });

      expect(response.transaction_hash).toBeDefined();
      expect(response.class_hash).toBeDefined();
    });

    test('deployContract()', async () => {
      const response = await provider.deployContract({
        contract: compiledOpenZeppelinAccount,
      });

      expect(response.transaction_hash).toBeDefined();
      expect(response.contract_address).toBeDefined();
    });
  });
});
