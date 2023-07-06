import {
  BlockNumber,
  Contract,
  GatewayError,
  GetBlockResponse,
  HttpError,
  Provider,
  SequencerProvider,
  stark,
} from '../src';
import * as fetchModule from '../src/utils/fetchPonyfill';
import { stringify } from '../src/utils/json';
import { encodeShortString } from '../src/utils/shortString';
import {
  compiledErc20,
  compiledL1L2,
  describeIfDevnet,
  describeIfNotDevnet,
  describeIfSequencer,
  getTestAccount,
  getTestProvider,
} from './fixtures';
import { initializeMatcher } from './schema';

describeIfSequencer('SequencerProvider', () => {
  const sequencerProvider = getTestProvider() as SequencerProvider;
  const account = getTestAccount(sequencerProvider);
  let exampleBlock: GetBlockResponse;
  let exampleBlockNumber: BlockNumber;
  let exampleBlockHash: string;
  initializeMatcher(expect);

  beforeAll(async () => {
    exampleBlock = await sequencerProvider.getBlock('latest');
    exampleBlockHash = exampleBlock.block_hash;
    exampleBlockNumber = exampleBlock.block_number;
  });

  describe('Generic fetch', () => {
    const fetchSpy = jest.spyOn(fetchModule, 'default');
    const generateMockResponse = (ok: boolean, text: any): any => ({
      ok,
      text: async () => text,
    });

    afterAll(() => {
      fetchSpy.mockRestore();
    });

    test('fetch unexpected error', async () => {
      fetchSpy.mockResolvedValueOnce(generateMockResponse(false, 'null'));
      expect(sequencerProvider.fetch('')).rejects.toThrow(/^Could not GET from endpoint/);
    });

    test('fetch http error', async () => {
      fetchSpy.mockResolvedValueOnce(generateMockResponse(false, 'wrong'));
      expect(sequencerProvider.fetch('')).rejects.toThrow(HttpError);
    });

    test('fetch gateway error', async () => {
      fetchSpy.mockResolvedValueOnce(generateMockResponse(false, stringify({})));
      expect(sequencerProvider.fetch('')).rejects.toThrow(GatewayError);
    });

    test('fetch success', async () => {
      fetchSpy.mockResolvedValueOnce(generateMockResponse(true, stringify({ success: '' })));
      expect(sequencerProvider.fetch('')).resolves.toHaveProperty('success');
    });
  });

  describe('Gateway specific methods', () => {
    let exampleContractAddress: string;

    let exampleTransactionHash: string;

    beforeAll(async () => {
      const { deploy } = await account.declareAndDeploy({
        contract: compiledErc20,
        constructorCalldata: [
          encodeShortString('Token'),
          encodeShortString('ERC20'),
          account.address,
        ],
      });

      exampleTransactionHash = deploy.transaction_hash;
      exampleContractAddress = deploy.contract_address;
    });

    test('getTransactionStatus()', async () => {
      return expect(
        sequencerProvider.getTransactionStatus(exampleTransactionHash)
      ).resolves.not.toThrow();
    });

    test('transaction trace', async () => {
      const transactionTrace = await sequencerProvider.getTransactionTrace(exampleTransactionHash);
      // TODO test optional properties
      expect(transactionTrace).toMatchSchemaRef('TransactionTraceResponse');
    });

    test('getCode() -> { bytecode }', async () => {
      const code = await sequencerProvider.getCode(exampleContractAddress);
      return expect(Array.isArray(code.bytecode)).toBe(true);
    });

    describeIfNotDevnet('which are not available on devnet', () => {
      test('getContractAddresses()', async () => {
        const { GpsStatementVerifier, Starknet } = await sequencerProvider.getContractAddresses();
        expect(typeof GpsStatementVerifier).toBe('string');
        expect(typeof Starknet).toBe('string');
      });
    });
  });

  describe('Test Estimate message fee', () => {
    const L1_ADDRESS = '0x8359E4B0152ed5A731162D3c7B0D8D56edB165A0';
    let l1l2ContractAddress: string;

    beforeAll(async () => {
      const { deploy } = await account.declareAndDeploy({
        contract: compiledL1L2,
      });
      l1l2ContractAddress = deploy.contract_address;
    });

    test('estimate message fee', async () => {
      const estimation = await sequencerProvider.estimateMessageFee({
        from_address: L1_ADDRESS,
        to_address: l1l2ContractAddress,
        entry_point_selector: 'deposit',
        payload: ['556', '123'],
      });
      expect(estimation).toEqual(
        expect.objectContaining({
          overall_fee: expect.anything(),
          gas_price: expect.anything(),
          gas_usage: expect.anything(),
          unit: 'wei',
        })
      );
    });
  });

  describeIfDevnet('Test calls with Custom Devnet Sequencer Provider', () => {
    let customSequencerProvider: Provider;
    let erc20: Contract;
    const wallet = stark.randomAddress();

    beforeAll(async () => {
      customSequencerProvider = new Provider({
        sequencer: {
          baseUrl: 'http://127.0.0.1:5050/',
          feederGatewayUrl: 'feeder_gateway',
          gatewayUrl: 'gateway',
        },
      });
      const accountCustom = getTestAccount(customSequencerProvider);
      const { deploy } = await accountCustom.declareAndDeploy({
        contract: compiledErc20,
        constructorCalldata: [encodeShortString('Token'), encodeShortString('ERC20'), wallet],
      });

      erc20 = new Contract(compiledErc20.abi, deploy.contract_address, customSequencerProvider);
    });

    test('Check ERC20 balance using Custom Sequencer Provider', async () => {
      const { balance } = await erc20.balanceOf(wallet);
      expect(balance.low).toStrictEqual(BigInt(1000));
    });
  });

  describe('getBlockTraces', () => {
    test(`getBlockTraces(blockHash=${exampleBlockHash}, blockNumber=undefined)`, async () => {
      const blockTraces = await sequencerProvider.getBlockTraces(exampleBlockHash);
      expect(blockTraces).toMatchSchemaRef('BlockTransactionTracesResponse');
    });

    test(`getBlockTraces(blockHash=undefined, blockNumber=${exampleBlockNumber})`, async () => {
      const blockTraces = await sequencerProvider.getBlockTraces(exampleBlockNumber);
      expect(blockTraces).toMatchSchemaRef('BlockTransactionTracesResponse');
    });
  });
});
