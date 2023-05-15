import { getStarkKey, utils } from 'micro-starknet';

import { Account, Contract, GetBlockResponse, RpcProvider, stark } from '../src';
import { StarknetChainId } from '../src/constants';
import { CallData } from '../src/utils/calldata';
import { felt, uint256 } from '../src/utils/calldata/cairo';
// import { toBigInt } from '../src/utils/num';
import {
  compiledErc20Echo,
  compiledOpenZeppelinAccount,
  describeIfDevnet,
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

  test('getBlockNumber', async () => {
    const blockNumber = await rpcProvider.getBlockNumber();
    expect(typeof blockNumber).toBe('number');
  });

  test('getStateUpdate', async () => {
    const stateUpdate = await rpcProvider.getStateUpdate('latest');
    expect(stateUpdate).toMatchSchemaRef('StateUpdateResponse');
  });

  xtest('getProtocolVersion - pathfinder not implemented', async () => {
    await rpcProvider.getProtocolVersion();
  });

  test('getProtocolVersion - not implemented', async () => {
    expect(rpcProvider.getProtocolVersion()).rejects.toThrow();
  });

  test('getCode - not implemented', async () => {
    expect(
      rpcProvider.getCode('0x058d97f7d76e78f44905cc30cb65b91ea49a4b908a76703c54197bca90f81773')
    ).rejects.toThrow();
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

    describeIfDevnet('devnet only', () => {
      test('getPendingTransactions - not implemented', async () => {
        expect(rpcProvider.getPendingTransactions()).rejects.toThrow();
      });

      test('getSyncingStats', async () => {
        const syncingStats = await rpcProvider.getSyncingStats();
        expect(syncingStats).toBe(false);
      });

      test('getEvents ', async () => {
        const randomWallet = stark.randomAddress();
        const classHash = '0x011ab8626b891bcb29f7cc36907af7670d6fb8a0528c7944330729d8f01e9ea3';
        const transferSelector =
          '271746229759260285552388728919865295615886751538523744128730118297934206697';

        const { deploy } = await account.declareAndDeploy({
          contract: compiledErc20Echo,
          classHash,
          constructorCalldata: CallData.compile({
            name: felt('Token'),
            symbol: felt('ERC20'),
            decimals: felt('18'),
            initial_supply: uint256('1000000000'),
            recipient: felt(account.address),
            signers: [],
            threshold: 1,
          }),
        });

        const erc20EchoContract = new Contract(
          compiledErc20Echo.abi,
          deploy.contract_address!,
          account
        );
        await erc20EchoContract.transfer(randomWallet, uint256(1));
        await erc20EchoContract.transfer(randomWallet, uint256(1));

        const blockNumber = await rpcProvider.getBlockNumber();
        const result = await rpcProvider.getEvents({
          from_block: { block_number: 0 },
          to_block: { block_number: blockNumber },
          address: deploy.contract_address,
          keys: [[transferSelector]],
          chunk_size: 2,
        });

        expect(result).toHaveProperty('continuation_token');
        expect(result).toHaveProperty('events');
        expect(Array.isArray(result?.events)).toBe(true);
        expect(result?.events?.length).toBe(2);
        expect(result.events[0]).toMatchSchemaRef('StarknetEmittedEvent');

        const result2 = await rpcProvider.getEvents({
          from_block: { block_number: 0 },
          to_block: { block_number: blockNumber },
          address: deploy.contract_address,
          keys: [[transferSelector]],
          chunk_size: 2,
          continuation_token: result.continuation_token,
        });

        expect(result2).not.toHaveProperty('continuation_token');
        expect(result2).toHaveProperty('events');
        expect(Array.isArray(result2?.events)).toBe(true);
        expect(result2?.events?.length).toBe(1);
      });
    });

    describeIfNotDevnet('testnet only', () => {
      test('getPendingTransactions', async () => {
        const transactions = await rpcProvider.getPendingTransactions();
        expect(Array.isArray(transactions)).toBe(true);
      });

      test('getSyncingStats', async () => {
        const syncingStats = await rpcProvider.getSyncingStats();
        expect(syncingStats).toMatchSchemaRef('GetSyncingStatsResponse');
      });
    });

    describe('deploy contract related tests', () => {
      let contract_address: string;
      let transaction_hash: string;
      let ozClassHash: string;

      beforeAll(async () => {
        const { deploy } = await account.declareAndDeploy({
          contract: compiledOpenZeppelinAccount,
          constructorCalldata: [accountPublicKey],
          salt: accountPublicKey,
        });

        contract_address = deploy.contract_address;
        transaction_hash = deploy.transaction_hash;
        ozClassHash = deploy.classHash;
      });

      test('declareDeploy()', () => {
        expect(contract_address).toBeTruthy();
        expect(transaction_hash).toBeTruthy();
      });

      test('getTransactionByHash', async () => {
        const transaction = await rpcProvider.getTransactionByHash(transaction_hash);
        expect(transaction).toMatchSchemaRef('GetTransactionResponse');
      });

      test('getTransaction', async () => {
        const transaction = await rpcProvider.getTransaction(transaction_hash);
        expect(transaction).toMatchSchemaRef('GetTransactionResponse');
      });

      test('getClassHashAt', async () => {
        const classHash = await rpcProvider.getClassHashAt(contract_address);
        expect(typeof classHash).toBe('string');
      });

      xtest('traceTransaction', async () => {
        await rpcProvider.traceTransaction(transaction_hash);
      });

      test('getClassAt', async () => {
        const classAt = await rpcProvider.getClassAt(contract_address);
        expect(classAt).toMatchSchemaRef('LegacyContractClass');
      });

      test('getClass classHash', async () => {
        const contractClass = await rpcProvider.getClass(ozClassHash);
        expect(contractClass).toMatchSchemaRef('LegacyContractClass');
      });
    });
  });
});
