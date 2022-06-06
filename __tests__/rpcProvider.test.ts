import { RPCProvider } from '../src';
import { compiledArgentAccountRPC } from './fixtures';

describe('RPCProvider', () => {
  let provider: RPCProvider;

  beforeAll(async () => {
    provider = new RPCProvider({ nodeUrl: process.env.rpcUrl });
  });

  describe('RPC methods', () => {
    test('getChainId', async () => {
      const chainId = await provider.getChainId();
      expect(chainId).toBe('0x534e5f474f45524c49');
    });
    test('getBlock - latest', async () => {
      const latestBlock = await provider.getBlock();
      expect(latestBlock).toHaveProperty('block_hash');
      expect(latestBlock).toHaveProperty('parent_hash');
      expect(latestBlock).toHaveProperty('block_number');
      expect(latestBlock).toHaveProperty('status');
      expect(latestBlock).toHaveProperty('sequencer');
      expect(latestBlock).toHaveProperty('new_root');
      expect(latestBlock).toHaveProperty('new_root');
      expect(latestBlock).toHaveProperty('old_root');
      expect(latestBlock).toHaveProperty('accepted_time');
      expect(latestBlock).toHaveProperty('gas_price');
      expect(latestBlock).toHaveProperty('transactions');
    });
    test('getBlock - Block Hash 0x10a93fa4c6b310e4aaef16347c50c43320474dba75379b35399943239637aeb', async () => {
      const block = await provider.getBlock(
        '0x10a93fa4c6b310e4aaef16347c50c43320474dba75379b35399943239637aeb'
      );
      expect(block).toHaveProperty('block_hash');
      expect(block).toHaveProperty('parent_hash');
      expect(block).toHaveProperty('block_number');
      expect(block).toHaveProperty('status');
      expect(block).toHaveProperty('sequencer');
      expect(block).toHaveProperty('new_root');
      expect(block).toHaveProperty('new_root');
      expect(block).toHaveProperty('old_root');
      expect(block).toHaveProperty('accepted_time');
      expect(block).toHaveProperty('gas_price');
      expect(block).toHaveProperty('transactions');
    });
    test('getBlock - Block Number 102634', async () => {
      const block = await provider.getBlock(102634);
      expect(block).toHaveProperty('block_hash');
      expect(block).toHaveProperty('parent_hash');
      expect(block).toHaveProperty('block_number');
      expect(block).toHaveProperty('status');
      expect(block).toHaveProperty('sequencer');
      expect(block).toHaveProperty('new_root');
      expect(block).toHaveProperty('new_root');
      expect(block).toHaveProperty('old_root');
      expect(block).toHaveProperty('accepted_time');
      expect(block).toHaveProperty('gas_price');
      expect(block).toHaveProperty('transactions');
    });
    test('getStorageAt - latest', async () => {
      const storage = await provider.getStorageAt(
        '0x01d1f307c073bb786a66e6e042ec2a9bdc385a3373bb3738d95b966d5ce56166',
        0
      );
      expect(typeof storage).toBe('string');
    });
    test('getStorageAt - Block Hash 0x7104702055c2a5773a870ceada9552ec659d69c18053b14078983f07527dea8', async () => {
      const storage = await provider.getStorageAt(
        '0x01d1f307c073bb786a66e6e042ec2a9bdc385a3373bb3738d95b966d5ce56166',
        0,
        '0x7225762c7ff5e7e5f0867f0a8e73594df4f44f05a65375339a76398e8ae3e64'
      );
      expect(typeof storage).toBe('string');
    });
    test('getTransaction - Transaction Hash 0x37013e1cb9c133e6fe51b4b371b76b317a480f56d80576730754c1662582348', async () => {
      const transaction = await provider.getTransaction(
        '0x37013e1cb9c133e6fe51b4b371b76b317a480f56d80576730754c1662582348'
      );
      expect(transaction).toHaveProperty('txn_hash');
      expect(transaction).toHaveProperty('calldata');
      expect(transaction).toHaveProperty('entry_point_selector');
      expect(transaction).toHaveProperty('contract_address');
    });
    test('getTransactionReceipt - Transaction Hash 0x37013e1cb9c133e6fe51b4b371b76b317a480f56d80576730754c1662582348', async () => {
      const receipt = await provider.getTransactionReceipt(
        '0x37013e1cb9c133e6fe51b4b371b76b317a480f56d80576730754c1662582348'
      );
      expect(receipt).toHaveProperty('txn_hash');
      expect(receipt).toHaveProperty('status');
      expect(receipt).toHaveProperty('status_data');
      expect(receipt).toHaveProperty('messages_sent');
      expect(receipt).toHaveProperty('l1_origin_message');
      expect(receipt).toHaveProperty('events');
    });
    test('getCode', async () => {
      const code = await provider.getCode(
        '0x01d1f307c073bb786a66e6e042ec2a9bdc385a3373bb3738d95b966d5ce56166'
      );
      expect(code).toHaveProperty('abi');
      expect(code).toHaveProperty('bytecode');
    });
    test('get transaction receipt', async () => {
      const transaction = await provider.getTransactionReceipt(
        '0x37013e1cb9c133e6fe51b4b371b76b317a480f56d80576730754c1662582348'
      );
      expect(transaction).toHaveProperty('events');
      expect(transaction).toHaveProperty('l1_origin_message');
      expect(transaction).toHaveProperty('messages_sent');
      expect(transaction).toHaveProperty('status');
      expect(transaction).toHaveProperty('status_data');
      expect(transaction).toHaveProperty('txn_hash');
    });
    test('getCode - Contract Address 0x01d1f307c073bb786a66e6e042ec2a9bdc385a3373bb3738d95b966d5ce56166', async () => {
      const code = await provider.getCode(
        '0x01d1f307c073bb786a66e6e042ec2a9bdc385a3373bb3738d95b966d5ce56166'
      );
      expect(code).toHaveProperty('abi');
      expect(code).toHaveProperty('bytecode');
    });
    test('callContract', async () => {
      expect(
        provider.callContract({
          contractAddress: '0x9ff64f4ab0e1fe88df4465ade98d1ea99d5732761c39279b8e1374fa943e9b',
          entrypoint: 'balance_of',
          calldata: ['0x9ff64f4ab0e1fe88df4465ade98d1ea99d5732761c39279b8e1374fa943e9b'],
        })
      ).resolves.not.toThrow();
    });
    test('deployContract', async () => {
      const response = await provider.deployContract({
        contract: compiledArgentAccountRPC,
      });

      expect(response).toHaveProperty('transaction_hash');
      expect(response).toHaveProperty('contract_address');
    });
  });
});
