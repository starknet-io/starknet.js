import { SequencerProvider } from '../src';
import {
  compiledErc20,
  describeIfNotDevnet,
  describeIfSequencer,
  getTestProvider,
} from './fixtures';

describeIfSequencer('SequencerProvider', () => {
  let provider: SequencerProvider;

  beforeAll(async () => {
    provider = getTestProvider() as SequencerProvider;
  });

  describe('Gateway specific methods', () => {
    let exampleTransactionHash: string;

    beforeAll(async () => {
      const { transaction_hash } = await provider.deployContract({
        contract: compiledErc20,
      });
      await provider.waitForTransaction(transaction_hash);
      exampleTransactionHash = transaction_hash;
    });

    test('getTransactionStatus()', async () => {
      return expect(provider.getTransactionStatus(exampleTransactionHash)).resolves.not.toThrow();
    });

    test('transaction trace', async () => {
      const transactionTrace = await provider.getTransactionTrace(exampleTransactionHash);
      expect(transactionTrace).toHaveProperty('function_invocation');
      expect(transactionTrace).toHaveProperty('signature');
    });

    describeIfNotDevnet('which are not available on devnet', () => {
      test('getContractAddresses()', async () => {
        const { GpsStatementVerifier, Starknet } = await provider.getContractAddresses();
        expect(typeof GpsStatementVerifier).toBe('string');
        expect(typeof Starknet).toBe('string');
      });
    });
  });
});
