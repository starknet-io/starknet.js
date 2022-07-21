import {
  BlockNumber,
  DeclareContractResponse,
  DeployContractResponse,
  GetBlockResponse,
  stark,
} from '../src';
import { toBN } from '../src/utils/number';
import {
  compiledErc20,
  compiledOpenZeppelinAccount,
  describeIfNotDevnet,
  getTestProvider,
} from './fixtures';

const { compileCalldata } = stark;

const testProvider = getTestProvider();

describe('defaultProvider', () => {
  let exampleTransactionHash: string;
  let exampleContractAddress: string;

  let exampleBlock: GetBlockResponse;
  let exampleBlockNumber: BlockNumber;
  let exampleBlockHash: string;

  beforeAll(async () => {
    const { transaction_hash, contract_address } = await testProvider.deployContract({
      contract: compiledErc20,
    });
    await testProvider.waitForTransaction(transaction_hash);
    exampleTransactionHash = transaction_hash;
    exampleContractAddress = contract_address;

    exampleBlock = await testProvider.getBlock('latest');
    exampleBlockHash = exampleBlock.block_hash;
    exampleBlockNumber = exampleBlock.block_number;
  });

  describe('endpoints', () => {
    test(`getBlock(blockHash=undefined, blockNumber=${exampleBlockNumber})`, () => {
      return expect(testProvider.getBlock(exampleBlockNumber)).resolves.not.toThrow();
    });

    test(`getBlock(blockHash=${exampleBlockHash}, blockNumber=undefined)`, () => {
      return expect(testProvider.getBlock(exampleBlockHash)).resolves.not.toThrow();
    });

    test('getBlock(blockIdentifier=latest)', async () => {
      expect(exampleBlock).not.toBeNull();

      const { block_number, accepted_time } = exampleBlock;

      expect(typeof block_number).toEqual('number');

      return expect(typeof accepted_time).toEqual('number');
    });

    test('getBlock() -> { blockNumber }', async () => {
      const block = await testProvider.getBlock();
      return expect(block).toHaveProperty('block_number');
    });

    describe('getStorageAt', () => {
      test('with "key" type of number', () => {
        return expect(testProvider.getStorageAt(exampleContractAddress, 0)).resolves.not.toThrow();
      });

      test('"key" type of string', () => {
        return expect(
          testProvider.getStorageAt(exampleContractAddress, '0x0')
        ).resolves.not.toThrow();
      });

      test('with "key" type of BN', () => {
        return expect(
          testProvider.getStorageAt(exampleContractAddress, toBN('0x0'))
        ).resolves.not.toThrow();
      });
    });

    test('getTransaction() - successful transaction', async () => {
      const transaction = await testProvider.getTransaction(exampleTransactionHash);

      expect(transaction).toHaveProperty('transaction_hash');
    });

    test('getTransactionReceipt() - successful transaction', async () => {
      const transactionReceipt = await testProvider.getTransactionReceipt(exampleTransactionHash);

      return expect(transactionReceipt).toHaveProperty('actual_fee');
    });

    test('callContract()', () => {
      return expect(
        testProvider.callContract({
          contractAddress: exampleContractAddress,
          entrypoint: 'balance_of',
          calldata: compileCalldata({
            user: '0x9ff64f4ab0e1fe88df4465ade98d1ea99d5732761c39279b8e1374fa943e9b',
          }),
        })
      ).resolves.not.toThrow();
    });

    test('callContract() - gateway error', async () => {
      return expect(
        testProvider.callContract({
          contractAddress: exampleContractAddress,
          entrypoint: 'non_existent_entrypoint',
          calldata: compileCalldata({
            user: '0xdeadbeef',
          }),
        })
      ).rejects.toThrowError();
    });
  });

  describe('addTransaction()', () => {
    test('declareContract()', async () => {
      const response = await testProvider.declareContract({
        contract: compiledErc20,
      });

      expect(response.transaction_hash).toBeDefined();
      expect(response.class_hash).toBeDefined();
    });

    test('deployContract()', async () => {
      const response = await testProvider.deployContract({
        contract: compiledOpenZeppelinAccount,
      });

      expect(response.transaction_hash).toBeDefined();
      expect(response.contract_address).toBeDefined();
    });
  });

  describeIfNotDevnet('Provider', () => {
    const provider = getTestProvider();
    describe(`Provider methods`, () => {
      describe('getBlock', () => {
        test('pending', async () => {
          const latestBlock = await provider.getBlock();
          expect(latestBlock).toHaveProperty('block_hash');
          expect(latestBlock).toHaveProperty('parent_hash');
          expect(latestBlock).toHaveProperty('block_number');
          expect(latestBlock).toHaveProperty('status');
          expect(latestBlock).toHaveProperty('sequencer');
          expect(latestBlock).toHaveProperty('new_root');
          expect(latestBlock).toHaveProperty('old_root');
          expect(latestBlock).toHaveProperty('accepted_time');
          expect(latestBlock).toHaveProperty('gas_price');
          expect(latestBlock).toHaveProperty('transactions');
          expect(Array.isArray(latestBlock.transactions)).toBe(true);
        });

        test('Block Hash 0x8a30a1212d142cb0053fe9921e1dbf64f651d328565bd2e7ac24059c270f43', async () => {
          const block = await provider.getBlock(
            '0x8a30a1212d142cb0053fe9921e1dbf64f651d328565bd2e7ac24059c270f43'
          );

          expect(block).toHaveProperty('block_hash');
          expect(block).toHaveProperty('parent_hash');
          expect(block).toHaveProperty('block_number');
          expect(block).toHaveProperty('status');
          expect(block).toHaveProperty('sequencer');
          expect(block).toHaveProperty('new_root');
          expect(block).toHaveProperty('old_root');
          expect(block).toHaveProperty('accepted_time');
          expect(block).toHaveProperty('gas_price');
          expect(block).toHaveProperty('transactions');
          expect(Array.isArray(block.transactions)).toBe(true);
        });

        test('Block Number 102634', async () => {
          const block = await provider.getBlock(102634);
          expect(block).toHaveProperty('block_hash');
          expect(block).toHaveProperty('parent_hash');
          expect(block).toHaveProperty('block_number');
          expect(block).toHaveProperty('status');
          expect(block).toHaveProperty('sequencer');
          expect(block).toHaveProperty('new_root');
          expect(block).toHaveProperty('old_root');
          expect(block).toHaveProperty('accepted_time');
          expect(block).toHaveProperty('gas_price');
          expect(block).toHaveProperty('transactions');
          expect(Array.isArray(block.transactions)).toBe(true);
        });
      });

      describe('getStorageAt', () => {
        test('pending', async () => {
          const storage = await provider.getStorageAt(
            '0x01d1f307c073bb786a66e6e042ec2a9bdc385a3373bb3738d95b966d5ce56166',
            0
          );
          expect(typeof storage).toBe('string');
        });

        test('Block Hash 0x7104702055c2a5773a870ceada9552ec659d69c18053b14078983f07527dea8', async () => {
          const storage = await provider.getStorageAt(
            '0x01d1f307c073bb786a66e6e042ec2a9bdc385a3373bb3738d95b966d5ce56166',
            0,
            '0x7225762c7ff5e7e5f0867f0a8e73594df4f44f05a65375339a76398e8ae3e64'
          );
          expect(typeof storage).toBe('string');
        });
      });

      describe('getTransaction', () => {
        test('Deploy Transaction Hash 0x37013e1cb9c133e6fe51b4b371b76b317a480f56d80576730754c1662582348', async () => {
          const transaction = await provider.getTransaction(
            '0x37013e1cb9c133e6fe51b4b371b76b317a480f56d80576730754c1662582348'
          );

          expect(transaction.transaction_hash).toBeTruthy();
          expect(transaction.contract_address).toBeTruthy();
        });

        test('Invoke Transaction Hash 0x2a56c636f45761c99a67ecdf0f185a6d5fe5239924ed9a4886fddbfaf3227b', async () => {
          const transaction = await provider.getTransaction(
            '0x2a56c636f45761c99a67ecdf0f185a6d5fe5239924ed9a4886fddbfaf3227b'
          );

          expect(transaction.transaction_hash).toBeTruthy();
          expect(transaction.contract_address).toBeTruthy();
          expect(Array.isArray(transaction.calldata)).toBe(true);
          expect(transaction.entry_point_selector).toBeTruthy();
          expect(Array.isArray(transaction.signature)).toBe(true);
          expect(transaction.max_fee).toBeTruthy();
        });

        test('Declare Transaction Hash 0x79b130f2e808db6ab4b83f0182f016a128d73752b849e5b0221c2b3a35a87ea', async () => {
          const transaction = await provider.getTransaction(
            '0x79b130f2e808db6ab4b83f0182f016a128d73752b849e5b0221c2b3a35a87ea'
          );

          expect(transaction.max_fee).toBeTruthy();
          expect(transaction.transaction_hash).toBeTruthy();
          expect(transaction).toHaveProperty('nonce');
          expect(transaction).toHaveProperty('sender_address');
          expect(transaction).toHaveProperty('version');
        });
      });

      describe('getTransactionReceipt', () => {
        test('Transaction Hash 0x37013e1cb9c133e6fe51b4b371b76b317a480f56d80576730754c1662582348', async () => {
          const receipt = await provider.getTransactionReceipt(
            '0x37013e1cb9c133e6fe51b4b371b76b317a480f56d80576730754c1662582348'
          );

          expect(receipt).toHaveProperty('transaction_hash');
          expect(receipt).toHaveProperty('status');
          expect(receipt).toHaveProperty('status_data');
          expect(receipt).toHaveProperty('messages_sent');
          expect(receipt).toHaveProperty('l1_origin_message');
          expect(receipt).toHaveProperty('events');
        });
      });

      describe('Contract methods', () => {
        let contractAddress: string;
        let deployResponse: DeployContractResponse;
        let declareResponse: DeclareContractResponse;

        beforeAll(async () => {
          deployResponse = await provider.deployContract({ contract: compiledErc20 });
          contractAddress = deployResponse.contract_address;
          declareResponse = await provider.declareContract({ contract: compiledErc20 });
          await Promise.all([
            provider.waitForTransaction(deployResponse.transaction_hash),
            provider.waitForTransaction(declareResponse.transaction_hash),
          ]);
        });

        describe('deployContract', () => {
          test('response', () => {
            expect(deployResponse.contract_address).toBeTruthy();
            expect(deployResponse.transaction_hash).toBeTruthy();
          });
        });

        describe('declareContract', () => {
          test('response', async () => {
            expect(declareResponse.class_hash).toBeTruthy();
            expect(declareResponse.transaction_hash).toBeTruthy();
          });
        });

        describe('getClassAt', () => {
          test('response', async () => {
            const classResponse = await provider.getClassAt(contractAddress);

            expect(classResponse).toHaveProperty('program');
            expect(classResponse).toHaveProperty('entry_points_by_type');
          });
        });

        describe('callContract', () => {
          test('result', () => {
            return expect(
              provider
                .callContract({
                  contractAddress: deployResponse.contract_address,
                  entrypoint: 'balance_of',
                  calldata: compileCalldata({
                    user: '0x9ff64f4ab0e1fe88df4465ade98d1ea99d5732761c39279b8e1374fa943e9b',
                  }),
                })
                .then((res) => {
                  expect(Array.isArray(res.result)).toBe(true);
                })
            ).resolves.not.toThrow();
          });
        });
      });
    });
  });
});
