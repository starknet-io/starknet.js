import { Contract, Provider, SequencerProvider, stark } from '../src';
import { toBN } from '../src/utils/number';
import {
  compiledErc20,
  describeIfNotDevnet,
  describeIfSequencer,
  getTestProvider,
} from './fixtures';

// Run only if Devnet Sequencer
describeIfSequencer('SequencerProvider', () => {
  let provider: SequencerProvider;
  let customSequencerProvider: Provider;
  let exampleContractAddress: string;

  beforeAll(async () => {
    provider = getTestProvider() as SequencerProvider;
    customSequencerProvider = new Provider({
      sequencer: {
        baseUrl: 'https://alpha4.starknet.io',
        feederGatewayUrl: 'feeder_gateway',
        gatewayUrl: 'gateway',
      }, // Similar to arguements used in docs
    });
  });

  describe('Gateway specific methods', () => {
    let exampleTransactionHash: string;

    beforeAll(async () => {
      const { transaction_hash, contract_address } = await provider.deployContract({
        contract: compiledErc20,
      });
      await provider.waitForTransaction(transaction_hash);
      exampleTransactionHash = transaction_hash;
      exampleContractAddress = contract_address;
    });

    test('getTransactionStatus()', async () => {
      return expect(provider.getTransactionStatus(exampleTransactionHash)).resolves.not.toThrow();
    });

    test('transaction trace', async () => {
      const transactionTrace = await provider.getTransactionTrace(exampleTransactionHash);
      expect(transactionTrace).toHaveProperty('function_invocation');
      expect(transactionTrace).toHaveProperty('signature');
    });

    test('getCode() -> { bytecode }', async () => {
      const code = await provider.getCode(exampleContractAddress);
      return expect(Array.isArray(code.bytecode)).toBe(true);
    });

    describeIfNotDevnet('which are not available on devnet', () => {
      test('getContractAddresses()', async () => {
        const { GpsStatementVerifier, Starknet } = await provider.getContractAddresses();
        expect(typeof GpsStatementVerifier).toBe('string');
        expect(typeof Starknet).toBe('string');
      });
    });
  });

  describe('Test calls with Custom Sequencer Provider', () => {
    let erc20: Contract;
    const wallet = stark.randomAddress();

    beforeAll(async () => {
      const { contract_address, transaction_hash } = await customSequencerProvider.deployContract({
        contract: compiledErc20,
      });

      await customSequencerProvider.waitForTransaction(transaction_hash);
      erc20 = new Contract(compiledErc20.abi, contract_address, customSequencerProvider);
    });

    test('Check ERC20 balance using Custom Sequencer Provider', async () => {
      const result = await erc20.balance_of(wallet);
      const [res] = result;
      expect(res).toStrictEqual(toBN(0));
      expect(res).toStrictEqual(result.res);
    });
  });
});
