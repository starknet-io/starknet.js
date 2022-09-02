import { Account, RpcProvider, ec } from '../src';
import {
  compiledOpenZeppelinAccount,
  describeIfRpc,
  getTestAccount,
  getTestProvider,
} from './fixtures';

describeIfRpc('RPCProvider', () => {
  let rpcProvider: RpcProvider;
  let accountPublicKey: string;

  beforeAll(async () => {
    rpcProvider = getTestProvider() as RpcProvider;
    const account = getTestAccount(rpcProvider);

    expect(account).toBeInstanceOf(Account);

    const accountKeyPair = ec.genKeyPair();
    accountPublicKey = ec.getStarkKey(accountKeyPair);
  });

  describe('RPC methods', async () => {
    const latestBlock = await rpcProvider.getBlock('latest');

    test('getChainId', async () => {
      const chainId = await rpcProvider.getChainId();
      expect(chainId).toBe('0x534e5f474f45524c49');
    });

    test('getBlockWithTxHashes', async () => {
      const blockResponse = await rpcProvider.getBlockWithTxHashes(latestBlock.block_number);
      expect(blockResponse).toHaveProperty('transactions');
    });

    test('getBlockWithTxs', async () => {
      const blockResponse = await rpcProvider.getBlockWithTxs(latestBlock.block_number);
      expect(blockResponse).toHaveProperty('transactions');
    });

    describe('deployContract', async () => {
      const { contract_address, transaction_hash } = await rpcProvider.deployContract({
        contract: compiledOpenZeppelinAccount,
        constructorCalldata: [accountPublicKey],
        addressSalt: accountPublicKey,
      });
      await rpcProvider.waitForTransaction(transaction_hash);

      test('deployContract result', () => {
        expect(contract_address).toBeTruthy();
        expect(transaction_hash).toBeTruthy();
      });

      test('getTransactionByHash', async () => {
        const blockResponse = await rpcProvider.getTransactionByHash(transaction_hash);
        expect(blockResponse).toHaveProperty('transactions');
      });

      test('getTransactionByBlockIdAndIndex', async () => {
        const blockResponse = await rpcProvider.getTransactionByBlockIdAndIndex(
          latestBlock.block_number,
          0
        );
        expect(blockResponse).toHaveProperty('transactions');
      });
    });

    test.todo('getEstimateFee');

    test.todo('invokeFunction');
  });
});
