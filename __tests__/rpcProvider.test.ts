import { getStarkKey, utils } from 'micro-starknet';

import { Account, GetBlockResponse, RpcProvider } from '../src';
import { StarknetChainId } from '../src/constants';
import {
  compiledOpenZeppelinAccount,
  describeIfNotDevnet,
  describeIfRpc,
  getTestAccount,
  getTestProvider,
} from './fixtures';
import { initializeMatcher } from './schema';

describeIfRpc('RPCProvider', () => {
  const rpcProvider = getTestProvider() as RpcProvider;
  const account = getTestAccount(rpcProvider);
  let accountPublicKey: string;

  beforeAll(async () => {
    initializeMatcher(expect);
    expect(account).toBeInstanceOf(Account);
    const accountKeyPair = utils.randomPrivateKey();
    accountPublicKey = getStarkKey(accountKeyPair);
  });

  test('getChainId', async () => {
    const fetchSpy = jest.spyOn(rpcProvider as any, 'fetchEndpoint');
    (rpcProvider as any).chainId = undefined as unknown as StarknetChainId;
    const chainId1 = await rpcProvider.getChainId();
    const chainId2 = await rpcProvider.getChainId();
    expect(fetchSpy.mock.calls.length).toBe(1);
    expect(chainId1).toBe(chainId2);
    expect(Object.values(StarknetChainId)).toContain(chainId1);
    fetchSpy.mockRestore();
  });

  test('getTransactionCount', async () => {
    const count = await rpcProvider.getTransactionCount('latest');
    expect(typeof count).toBe('number');
  });

  test('getBlockHashAndNumber', async () => {
    const blockHashAndNumber = await rpcProvider.getBlockHashAndNumber();
    expect(blockHashAndNumber).toHaveProperty('block_hash');
    expect(blockHashAndNumber).toHaveProperty('block_number');
  });

  test('getStateUpdate', async () => {
    const stateUpdate = await rpcProvider.getStateUpdate('latest');
    expect(stateUpdate).toMatchSchemaRef('StateUpdateResponse');
  });

  xtest('getProtocolVersion - pathfinder not implement', async () => {
    await rpcProvider.getProtocolVersion();
  });

  describeIfNotDevnet('devnet not implement', () => {
    test('getPendingTransactions', async () => {
      const transactions = await rpcProvider.getPendingTransactions();
      expect(Array.isArray(transactions)).toBe(true);
    });
  });

  describe('RPC methods', () => {
    let latestBlock: GetBlockResponse;

    beforeAll(async () => {
      latestBlock = await rpcProvider.getBlock('latest');
    });

    test('getBlockWithTxHashes', async () => {
      const blockResponse = await rpcProvider.getBlockWithTxHashes(latestBlock.block_number);
      expect(blockResponse).toHaveProperty('transactions');
    });

    test('getBlockWithTxs', async () => {
      const blockResponse = await rpcProvider.getBlockWithTxs(latestBlock.block_number);
      expect(blockResponse).toHaveProperty('transactions');
    });

    test('getTransactionByBlockIdAndIndex', async () => {
      const transaction = await rpcProvider.getTransactionByBlockIdAndIndex(
        latestBlock.block_number,
        0
      );
      expect(transaction).toHaveProperty('transaction_hash');
    });

    xtest('traceBlockTransactions', async () => {
      await rpcProvider.traceBlockTransactions(latestBlock.block_hash);
    });

    describe('deploy contract related tests', () => {
      let contract_address: string;
      let transaction_hash: string;

      beforeAll(async () => {
        const { deploy } = await account.declareAndDeploy({
          contract: compiledOpenZeppelinAccount,
          constructorCalldata: [accountPublicKey],
          salt: accountPublicKey,
        });

        contract_address = deploy.contract_address;
        transaction_hash = deploy.transaction_hash;
      });

      test('declareDeploy()', () => {
        expect(contract_address).toBeTruthy();
        expect(transaction_hash).toBeTruthy();
      });

      test('getTransactionByHash', async () => {
        const transaction = await rpcProvider.getTransactionByHash(transaction_hash);
        expect(transaction).toHaveProperty('transaction_hash');
      });

      test('getClassHashAt', async () => {
        const classHash = await rpcProvider.getClassHashAt(contract_address);
        expect(typeof classHash).toBe('string');
      });

      xtest('traceTransaction', async () => {
        await rpcProvider.traceTransaction(transaction_hash);
      });
    });

    test('getClass classHash 0x058d97f7d76e78f44905cc30cb65b91ea49a4b908a76703c54197bca90f81773', async () => {
      const contractClass = await rpcProvider.getClass(
        '0x058d97f7d76e78f44905cc30cb65b91ea49a4b908a76703c54197bca90f81773'
      );
      expect(contractClass).toMatchSchemaRef('LegacyContractClass');
    });
  });
});
