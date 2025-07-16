import { getStarkKey, Signature, utils } from '@scure/starknet';
import { hasMixin } from 'ts-mixer';
import {
  contracts,
  createBlockForDevnet,
  createTestProvider,
  describeIfDevnet,
  describeIfNotDevnet,
  describeIfRpc,
  describeIfRpc081,
  describeIfTestnet,
  ETHtokenAddress,
  getTestAccount,
  waitNextBlock,
} from './config/fixtures';
import { initializeMatcher } from './config/schema';
import typedDataExample from '../__mocks__/typedData/baseExample.json';
import {
  Account,
  Block,
  CallData,
  Contract,
  FeeEstimate,
  LibraryError,
  ProviderInterface,
  RPC,
  RPCResponseParser,
  ReceiptTx,
  RpcProvider,
  TransactionExecutionStatus,
  cairo,
  num,
  stark,
  waitForTransactionOptions,
  isVersion,
  toAnyPatchVersion,
  BlockTag,
} from '../src';
import { StarknetChainId } from '../src/global/constants';
import { isBoolean } from '../src/utils/typed';
import { RpcProvider as BaseRpcProvider } from '../src/provider/rpc';
import { RpcProvider as ExtendedRpcProvider } from '../src/provider/extensions/default';
import { StarknetId } from '../src/provider/extensions/starknetId';

describeIfRpc('RPCProvider', () => {
  let rpcProvider: RpcProvider;
  let provider: ProviderInterface;
  let account: Account;
  let accountPublicKey: string;
  initializeMatcher(expect);

  beforeAll(async () => {
    rpcProvider = await createTestProvider(false);
    provider = await createTestProvider();
    account = getTestAccount(provider);

    expect(account).toBeInstanceOf(Account);
    const accountKeyPair = utils.randomPrivateKey();
    accountPublicKey = getStarkKey(accountKeyPair);
    await createBlockForDevnet();
  });

  test('create should be usable by the base and extended RpcProvider, but not Account', async () => {
    const nodeUrl = process.env.TEST_RPC_URL;
    const base = await BaseRpcProvider.create({ nodeUrl });
    const extended = await ExtendedRpcProvider.create({ nodeUrl });

    expect(hasMixin(base, StarknetId)).toBe(false);
    expect(hasMixin(extended, StarknetId)).toBe(true);
    await expect(Account.create()).rejects.toThrow(LibraryError);
  });

  test('detect spec version with create', async () => {
    const providerTest = await RpcProvider.create({ nodeUrl: process.env.TEST_RPC_URL });
    const { channel } = providerTest;
    expect(channel).toBeDefined();
    const rawResult = await channel.fetch('starknet_specVersion');
    const j = await rawResult.json();
    expect(channel.readSpecVersion()).toBeDefined();
    expect(isVersion(toAnyPatchVersion(j.result), await channel.setUpSpecVersion())).toBeTruthy();
  });

  test('baseFetch override', async () => {
    const { nodeUrl } = rpcProvider.channel;
    const baseFetch = jest.fn();
    const fetchProvider = new RpcProvider({ nodeUrl, baseFetch });
    (fetchProvider.fetch as any)();
    expect(baseFetch.mock.calls.length).toBe(1);
  });

  test('instantiate from rpcProvider', () => {
    const newInsRPCProvider = new RpcProvider();

    let FinalInsRPCProvider = new RpcProvider(newInsRPCProvider);
    expect(FinalInsRPCProvider.channel).toBe(newInsRPCProvider.channel);
    expect(FinalInsRPCProvider.responseParser).toBe(newInsRPCProvider.responseParser);

    delete (newInsRPCProvider as any).responseParser;
    FinalInsRPCProvider = new RpcProvider(newInsRPCProvider);
    expect(FinalInsRPCProvider.channel).toBe(newInsRPCProvider.channel);
    expect(FinalInsRPCProvider.responseParser).toBeInstanceOf(RPCResponseParser);
  });

  test('getChainId', async () => {
    const fetchSpy = jest.spyOn(rpcProvider.channel as any, 'fetchEndpoint');
    (rpcProvider as any).chainId = undefined as unknown as StarknetChainId;
    const chainId1 = await rpcProvider.getChainId();
    const chainId2 = await rpcProvider.getChainId();
    expect(fetchSpy.mock.calls.length).toBe(1);
    expect(chainId1).toBe(chainId2);
    expect(Object.values(StarknetChainId)).toContain(chainId1);
    fetchSpy.mockRestore();
  });

  test('getTransactionCount', async () => {
    const count = await rpcProvider.getBlockTransactionCount('latest');
    expect(typeof count).toBe('number');
  });

  test('getBlockHashAndNumber', async () => {
    const blockHashAndNumber = await rpcProvider.getBlockLatestAccepted();
    expect(blockHashAndNumber).toHaveProperty('block_hash');
    expect(blockHashAndNumber).toHaveProperty('block_number');
  });

  test('getBlockNumber', async () => {
    const blockNumber = await rpcProvider.getBlockNumber();
    expect(typeof blockNumber).toBe('number');
  });

  test('getL1GasPrice', async () => {
    const gasPrice = await rpcProvider.getL1GasPrice('latest');
    expect(typeof gasPrice).toBe('string');
  });

  test('getStateUpdate', async () => {
    const stateUpdate = await rpcProvider.getBlockStateUpdate('latest');
    expect(stateUpdate).toMatchSchemaRef('StateUpdateResponse');
  });

  test('getSpecVersion', async () => {
    const spec = await rpcProvider.getSpecVersion();
    expect(typeof spec).toBe('string');
  });

  test('configurable fee overhead on instance', async () => {
    const p = new RpcProvider({
      nodeUrl: provider.channel.nodeUrl,
      resourceBoundsOverhead: {
        l1_gas: {
          max_amount: 0,
          max_price_per_unit: 0,
        },
        l2_gas: {
          max_amount: 0,
          max_price_per_unit: 0,
        },
        l1_data_gas: {
          max_amount: 0,
          max_price_per_unit: 0,
        },
      },
    });
    const estimateSpy = jest.spyOn(p.channel as any, 'getEstimateFee');
    const mockFeeEstimate: FeeEstimate = {
      l1_gas_consumed: '0x2',
      l1_gas_price: '0x1',
      l2_gas_consumed: '0x2',
      l2_gas_price: '0x1',
      l1_data_gas_consumed: '0x2',
      l1_data_gas_price: '0x1',
      overall_fee: '0x4',
      unit: 'WEI',
    };
    estimateSpy.mockResolvedValue([mockFeeEstimate]);
    const result = (await p.getEstimateFeeBulk([{} as any], {}))[0];
    expect(estimateSpy).toHaveBeenCalledTimes(1);
    expect(result.resourceBounds.l1_gas.max_amount).toBe(2n);
    expect(result.resourceBounds.l1_gas.max_price_per_unit).toBe(1n);
    estimateSpy.mockRestore();
  });

  describe('Test Estimate message fee Cairo 1', () => {
    let l1l2ContractCairo1Address: string;

    beforeAll(async () => {
      const { deploy: deploy2 } = await account.declareAndDeploy({
        contract: contracts.C1v2.sierra,
        casm: contracts.C1v2.casm,
      });
      l1l2ContractCairo1Address = deploy2.contract_address;
      await waitNextBlock(provider as RpcProvider, 5000); // in Sepolia Testnet, needs pending block validation before interacting
    });

    describeIfRpc081('estimate message fee rpc 0.8', () => {
      test('estimate message fee Cairo 1', async () => {
        const L1_ADDRESS = '0x8359E4B0152ed5A731162D3c7B0D8D56edB165'; // not coded in 20 bytes
        const estimationCairo1 = await rpcProvider.estimateMessageFee({
          from_address: L1_ADDRESS,
          to_address: l1l2ContractCairo1Address,
          entry_point_selector: 'increase_bal',
          payload: ['100'],
        });
        expect(estimationCairo1).toEqual(
          expect.objectContaining({
            l1_data_gas_consumed: expect.anything(),
            l1_data_gas_price: expect.anything(),
            l1_gas_consumed: expect.anything(),
            l1_gas_price: expect.anything(),
            l2_gas_consumed: expect.anything(),
            l2_gas_price: expect.anything(),
            overall_fee: expect.anything(),
            unit: expect.anything(),
          })
        );
      });
    });

    /*     describeIfRpc071('estimate message fee rpc 0.7', () => {
      test('estimate message fee Cairo 1', async () => {
        const L1_ADDRESS = '0x8359E4B0152ed5A731162D3c7B0D8D56edB165'; // not coded in 20 bytes
        const estimationCairo1 = await rpcProvider.estimateMessageFee({
          from_address: L1_ADDRESS,
          to_address: l1l2ContractCairo1Address,
          entry_point_selector: 'increase_bal',
          payload: ['100'],
        });
        expect(estimationCairo1).toEqual(
          expect.objectContaining({
            data_gas_consumed: expect.anything(),
            data_gas_price: expect.anything(),
            gas_consumed: expect.anything(),
            gas_price: expect.anything(),
            overall_fee: expect.anything(),
            unit: expect.anything(),
          })
        );
      });
    }); */
  });

  describe('waitForTransaction', () => {
    const receipt = {};
    let transactionStatusSpy: any;
    let transactionReceiptSpy: any;

    const generateOptions = (o: waitForTransactionOptions) => ({ retryInterval: 10, ...o });
    const generateTransactionStatus = (
      finality_status: RPC.TXN_STATUS,
      execution_status?: RPC.TXN_EXECUTION_STATUS
    ): RPC.TransactionStatus => ({
      finality_status,
      execution_status,
    });
    const response = {
      successful: generateTransactionStatus('ACCEPTED_ON_L1', 'SUCCEEDED'),
      reverted: generateTransactionStatus('ACCEPTED_ON_L2', 'REVERTED'),
    };

    beforeAll(() => {
      transactionStatusSpy = jest.spyOn(rpcProvider.channel as any, 'getTransactionStatus');
      transactionReceiptSpy = jest.spyOn(rpcProvider.channel as any, 'getTransactionReceipt');

      transactionStatusSpy.mockResolvedValue(null);
      transactionReceiptSpy.mockResolvedValue(receipt);
    });

    afterAll(() => {
      transactionStatusSpy.mockRestore();
      transactionReceiptSpy.mockRestore();
    });

    test('successful - default', async () => {
      transactionStatusSpy.mockResolvedValueOnce(response.successful);
      await expect(rpcProvider.waitForTransaction(0)).resolves.toBeInstanceOf(ReceiptTx);
    });

    test('reverted - default', async () => {
      transactionStatusSpy.mockResolvedValueOnce(response.reverted);
      await expect(rpcProvider.waitForTransaction(0)).resolves.toBeInstanceOf(ReceiptTx);
    });

    test('reverted - as error state', async () => {
      transactionStatusSpy.mockResolvedValueOnce(response.reverted);
      const options = generateOptions({ errorStates: [TransactionExecutionStatus.REVERTED] });
      await expect(rpcProvider.waitForTransaction(0, options)).rejects.toThrow(
        `${RPC.ETransactionExecutionStatus.REVERTED}: ${RPC.ETransactionStatus.ACCEPTED_ON_L2}`
      );
    });

    test('no error state; timed-out', async () => {
      const options = generateOptions({ errorStates: [] });
      await expect(rpcProvider.waitForTransaction(0, options)).rejects.toThrow(/timed-out/);
    });
  });

  describe('RPC methods', () => {
    let latestBlock: Block;

    beforeAll(async () => {
      // add a Tx to be sure to have at least one Tx in the last block
      const { transaction_hash } = await account.execute({
        contractAddress: ETHtokenAddress,
        entrypoint: 'transfer',
        calldata: {
          recipient: account.address,
          amount: cairo.uint256(1n * 10n ** 4n),
        },
      });
      await account.waitForTransaction(transaction_hash);
      latestBlock = await provider.getBlock('latest');
    });

    test('getBlockWithTxHashes', async () => {
      const blockResponse = await rpcProvider.getBlockWithTxHashes(latestBlock.block_number);
      expect(blockResponse).toHaveProperty('transactions');
    });

    test('getBlockWithTxs', async () => {
      const blockResponse = await rpcProvider.getBlockWithTxs(latestBlock.block_number);
      expect(blockResponse).toHaveProperty('transactions');
    });

    test('getBlockWithReceipts - 0.v RpcChannel', async () => {
      const blockResponse = await rpcProvider.getBlockWithReceipts(latestBlock.block_number);
      expect(blockResponse).toBeDefined();
      // TODO add Zod schema validation
      // expect(blockResponse).toMatchSchemaRef('BlockWithTxReceipts');
    });

    test('getTransactionByBlockIdAndIndex', async () => {
      // Find a block with transactions
      let block: any = latestBlock; // TODO: fix this type
      let blockNumber = latestBlock.block_number;
      while (block.transactions.length === 0 && blockNumber > latestBlock.block_number - 20) {
        blockNumber -= 1;
        // eslint-disable-next-line no-await-in-loop
        block = await provider.getBlock(blockNumber);
      }
      const transaction = await rpcProvider.getTransactionByBlockIdAndIndex(blockNumber, 0);
      expect(transaction).toHaveProperty('transaction_hash');
    });

    test('getSyncingStats', async () => {
      const syncingStats = await rpcProvider.getSyncingStats();
      expect(syncingStats).toMatchSchemaRef('GetSyncingStatsResponse');
      if (isBoolean(syncingStats)) expect(syncingStats).toBe(false);
    });

    xtest('traceBlockTransactions', async () => {
      await rpcProvider.getBlockTransactionsTraces(latestBlock.block_hash);
    });

    describeIfDevnet('devnet only', () => {
      test('getEvents ', async () => {
        const erc20CallData = new CallData(contracts.Erc20OZ.sierra.abi);
        const erc20ConstructorParams = {
          name: 'Token',
          symbol: 'ERC20',
          amount: 1000n,
          recipient: account.address,
          owner: account.address,
        };
        const erc20Constructor = erc20CallData.compile('constructor', erc20ConstructorParams);
        const randomWallet = stark.randomAddress();
        const transferSelector = num.toHexString(
          '271746229759260285552388728919865295615886751538523744128730118297934206697'
        );

        const { deploy } = await account.declareAndDeploy({
          contract: contracts.Erc20OZ.sierra,
          casm: contracts.Erc20OZ.casm,
          constructorCalldata: erc20Constructor,
        });

        const erc20EchoContract = new Contract({
          abi: contracts.Erc20OZ.sierra.abi,
          address: deploy.contract_address,
          providerOrAccount: account,
        });
        await erc20EchoContract.transfer(randomWallet, cairo.uint256(1));
        await erc20EchoContract.transfer(randomWallet, cairo.uint256(1));

        const blockNumber = await rpcProvider.getBlockNumber();
        const result = await rpcProvider.getEvents({
          from_block: { block_number: 0 },
          to_block: { block_number: blockNumber },
          address: deploy.contract_address,
          keys: [[transferSelector]],
          chunk_size: 2,
        });

        const result1 = await rpcProvider.getEvents({
          chunk_size: 2, // all optional parameters removed
        });

        expect(result).toHaveProperty('continuation_token');
        expect(result).toHaveProperty('events');
        expect(result1).toHaveProperty('events');
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

    describe('deploy contract related tests', () => {
      let contract_address: string;
      let transaction_hash: string;
      let ozClassHash: string;

      beforeAll(async () => {
        const { deploy } = await account.declareAndDeploy({
          contract: contracts.C1Account.sierra,
          casm: contracts.C1Account.casm,
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

      test('getTransactionStatus()', async () => {
        return expect(rpcProvider.getTransactionStatus(transaction_hash)).resolves.not.toThrow();
      });

      test('getTransaction', async () => {
        // todo - schema for rpc need to be created and expected response here updated
        const transaction = await rpcProvider.getTransactionByHash(transaction_hash);
        expect(transaction).toMatchSchemaRef('GetTransactionResponse');
      });

      test('getClassHashAt', async () => {
        const classHash = await rpcProvider.getClassHashAt(contract_address);
        expect(typeof classHash).toBe('string');
      });

      test('traceTransaction', async () => {
        const trace = await rpcProvider.getTransactionTrace(transaction_hash);
        expect(trace).toBeDefined();
        // TODO add Zod schema validation
      });

      test('getClassAt', async () => {
        const classAt = await rpcProvider.getClassAt(contract_address);
        expect(classAt).toMatchSchemaRef('SierraContractClass');
      });

      test('getClass classHash', async () => {
        const contractClass = await rpcProvider.getClass(ozClassHash);
        expect(contractClass).toMatchSchemaRef('SierraContractClass');
      });
    });
  });
});

describeIfTestnet('RPCProvider', () => {
  let provider: ProviderInterface;

  beforeEach(async () => {
    provider = await createTestProvider();
  });

  test('getL1MessageHash', async () => {
    const l2TransactionHash = '0x28dfc05eb4f261b37ddad451ff22f1d08d4e3c24dc646af0ec69fa20e096819';
    const l1MessageHash = await provider.getL1MessageHash(l2TransactionHash);
    expect(l1MessageHash).toBe(
      '0x55b3f8b6e607fffd9b4d843dfe8f9b5c05822cd94fcad8797deb01d77805532a'
    );
    await expect(
      provider.getL1MessageHash('0x283882a666a418cf88df04cc5f8fc2262af510bba0b637e61b2820a6ab15318')
    ).rejects.toThrow(/This L2 transaction is not a L1 message./);
    await expect(provider.getL1MessageHash('0x123')).rejects.toThrow(/Transaction hash not found/);
  });
});
describeIfNotDevnet('waitForBlock', () => {
  // As Devnet-rs isn't generating automatically blocks at a periodic time, it's excluded of this test.
  const providerStandard = new RpcProvider({ nodeUrl: process.env.TEST_RPC_URL });
  const providerFastTimeOut = new RpcProvider({ nodeUrl: process.env.TEST_RPC_URL, retries: 1 });
  let block: number;

  beforeEach(async () => {
    block = await providerStandard.getBlockNumber();
  });

  test('waitForBlock timeOut', async () => {
    await expect(providerFastTimeOut.waitForBlock(10 ** 20, 1)).rejects.toThrow(/timed-out/);
  });

  test('waitForBlock in the past', async () => {
    const start = new Date().getTime();
    await providerStandard.waitForBlock(block);
    const end = new Date().getTime();
    expect(end - start).toBeLessThan(1000); // quick answer expected
  });

  test('waitForBlock latest', async () => {
    const start = new Date().getTime();
    await providerStandard.waitForBlock('latest');
    const end = new Date().getTime();
    expect(end - start).toBeLessThan(100); // nearly immediate answer expected
  });

  // NOTA : this test can have a duration up to block interval.
  test('waitForBlock pending', async () => {
    await providerStandard.waitForBlock('pending');
    expect(true).toBe(true); // answer without timeout Error (blocks have to be spaced with 16 minutes maximum : 200 retries * 5000ms)

    await providerStandard.waitForBlock(BlockTag.PRE_CONFIRMED);
    expect(true).toBe(true);
  });
});

describe('EIP712 verification', () => {
  let rpcProvider: RpcProvider;
  let account: Account;

  beforeEach(async () => {
    rpcProvider = await createTestProvider(false);
    account = getTestAccount(rpcProvider);
  });

  test('sign and verify message', async () => {
    const signature = await account.signMessage(typedDataExample);
    const verifMessageResponse: boolean = await rpcProvider.verifyMessageInStarknet(
      typedDataExample,
      signature,
      account.address
    );
    expect(verifMessageResponse).toBe(true);

    const messageHash = await account.hashMessage(typedDataExample);
    const verifMessageResponse2: boolean = await rpcProvider.verifyMessageInStarknet(
      messageHash,
      signature,
      account.address
    );
    expect(verifMessageResponse2).toBe(true);
  });

  test('sign and verify EIP712 message fail', async () => {
    const signature = await account.signMessage(typedDataExample);
    const [r, s] = stark.formatSignature(signature);

    // change the signature to make it invalid
    const r2 = num.toBigInt(r) + 123n;
    const wrongSignature = new Signature(num.toBigInt(r2.toString()), num.toBigInt(s));
    if (!wrongSignature) return;
    const verifMessageResponse: boolean = await rpcProvider.verifyMessageInStarknet(
      typedDataExample,
      wrongSignature,
      account.address
    );
    expect(verifMessageResponse).toBe(false);

    const wrongAccountAddress = '0x123456789';
    await expect(
      rpcProvider.verifyMessageInStarknet(typedDataExample, signature, wrongAccountAddress)
    ).rejects.toThrow();
  });
});
