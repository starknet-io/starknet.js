import { Contract, Provider, SequencerProvider, stark } from '../src';
import { toBN } from '../src/utils/number';
import {
  IS_SEQUENCER_GOERLI,
  compiledErc20,
  compiledL1L2,
  describeIfNotDevnet,
  describeIfSequencer,
  getERC20DeployPayload,
  getTestProvider,
} from './fixtures';

// Run only if Devnet Sequencer
describeIfSequencer('SequencerProvider', () => {
  let sequencerProvider: SequencerProvider;
  let customSequencerProvider: Provider;
  let exampleContractAddress: string;

  beforeAll(async () => {
    sequencerProvider = getTestProvider() as SequencerProvider;
    customSequencerProvider = new Provider({
      sequencer: {
        baseUrl: 'http://127.0.0.1:5050/',
        feederGatewayUrl: 'feeder_gateway',
        gatewayUrl: 'gateway',
      }, // Similar to arguements used in docs
    });
  });

  describe('Gateway specific methods', () => {
    let exampleTransactionHash: string;
    const wallet = stark.randomAddress();

    beforeAll(async () => {
      const erc20DeployPayload = getERC20DeployPayload(wallet);

      const { contract_address, transaction_hash } = await sequencerProvider.deployContract(
        erc20DeployPayload
      );

      await sequencerProvider.waitForTransaction(transaction_hash);
      exampleTransactionHash = transaction_hash;
      exampleContractAddress = contract_address;
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

  describe('Test calls with Custom Sequencer Provider', () => {
    let erc20: Contract;
    const wallet = stark.randomAddress();

    beforeAll(async () => {
      const erc20DeployPayload = getERC20DeployPayload(wallet);

      const { contract_address, transaction_hash } = await customSequencerProvider.deployContract(
        erc20DeployPayload
      );

      await customSequencerProvider.waitForTransaction(transaction_hash);
      erc20 = new Contract(compiledErc20.abi, contract_address, customSequencerProvider);
    });

    test('Check ERC20 balance using Custom Sequencer Provider', async () => {
      const result = await erc20.balanceOf(wallet);
      const [res] = result;
      expect(res.low).toStrictEqual(toBN(1000));
      expect(res).toStrictEqual(result.balance);
    });
  });

  describe('Test Estimate message fee', () => {
    const L1_ADDRESS = '0x8359E4B0152ed5A731162D3c7B0D8D56edB165A0';
    let l1l2ContractAddress: string;

    beforeAll(async () => {
      if (IS_SEQUENCER_GOERLI) {
        l1l2ContractAddress = '0x2863141e0d9a74e9b484c1f5b1e3a2f6cbb6b84df8233c7c1cbe31334d9aed8';
      } else {
        const { transaction_hash, contract_address } = await sequencerProvider.deployContract({
          contract: compiledL1L2,
        });
        await sequencerProvider.waitForTransaction(transaction_hash);
        l1l2ContractAddress = contract_address;
      }
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
});
