import {
  BlockNumber,
  Contract,
  GetBlockResponse,
  Provider,
  SequencerProvider,
  stark,
} from '../src';
import { toBN } from '../src/utils/number';
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

describeIfSequencer('SequencerProvider', () => {
  const sequencerProvider = getTestProvider() as SequencerProvider;
  const account = getTestAccount(sequencerProvider);
  let customSequencerProvider: Provider;
  let exampleContractAddress: string;
  let exampleBlock: GetBlockResponse;
  let exampleBlockNumber: BlockNumber;
  let exampleBlockHash: string;

  beforeAll(async () => {
    exampleBlock = await sequencerProvider.getBlock('latest');
    exampleBlockHash = exampleBlock.block_hash;
    exampleBlockNumber = exampleBlock.block_number;
  });

  describe('Gateway specific methods', () => {
    let exampleTransactionHash: string;

    beforeAll(async () => {
      const { deploy } = await account.declareDeploy({
        contract: compiledErc20,
        classHash: '0x54328a1075b8820eb43caf0caa233923148c983742402dcfc38541dd843d01a',
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
      expect(transactionTrace).toHaveProperty('signature');
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
      const { deploy } = await account.declareDeploy({
        contract: compiledL1L2,
        classHash: '0x028d1671fb74ecb54d848d463cefccffaef6df3ae40db52130e19fe8299a7b43',
      });
      l1l2ContractAddress = deploy.contract_address;
    });

    test('estimate message fee', async () => {
      const estimation = await sequencerProvider.estimateMessageFee(
        {
          from_address: L1_ADDRESS,
          to_address: l1l2ContractAddress,
          entry_point_selector: 'deposit',
          payload: ['556', '123'],
        },
        'latest'
      );
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
      const { deploy } = await accountCustom.declareDeploy({
        contract: compiledErc20,
        classHash: '0x54328a1075b8820eb43caf0caa233923148c983742402dcfc38541dd843d01a',
        constructorCalldata: [encodeShortString('Token'), encodeShortString('ERC20'), wallet],
      });

      erc20 = new Contract(compiledErc20.abi, deploy.contract_address, customSequencerProvider);
    });

    test('Check ERC20 balance using Custom Sequencer Provider', async () => {
      const { balance } = await erc20.balanceOf(wallet);
      expect(balance.low).toStrictEqual(toBN(1000));
    });
  });

  describe('getBlockTraces', () => {
    test(`getBlockTraces(blockHash=${exampleBlockHash}, blockNumber=undefined)`, async () => {
      const blockTraces = await sequencerProvider.getBlockTraces(exampleBlockHash);
      expect(blockTraces).toHaveProperty('traces');
      expect(blockTraces.traces[0]).toHaveProperty('validate_invocation');
      expect(blockTraces.traces[0]).toHaveProperty('function_invocation');
      expect(blockTraces.traces[0]).toHaveProperty('fee_transfer_invocation');
      expect(blockTraces.traces[0]).toHaveProperty('signature');
      expect(blockTraces.traces[0]).toHaveProperty('transaction_hash');
    });

    test(`getBlockTraces(blockHash=undefined, blockNumber=${exampleBlockNumber})`, async () => {
      const blockTraces = await sequencerProvider.getBlockTraces(exampleBlockNumber);
      expect(blockTraces).toHaveProperty('traces');
      expect(blockTraces.traces[0]).toHaveProperty('validate_invocation');
      expect(blockTraces.traces[0]).toHaveProperty('function_invocation');
      expect(blockTraces.traces[0]).toHaveProperty('fee_transfer_invocation');
      expect(blockTraces.traces[0]).toHaveProperty('signature');
      expect(blockTraces.traces[0]).toHaveProperty('transaction_hash');
    });
  });
});
