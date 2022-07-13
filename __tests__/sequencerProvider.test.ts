import { SequencerProvider } from '../src';

describe('SequencerProvider', () => {
  let provider: SequencerProvider;

  beforeAll(async () => {
    provider = new SequencerProvider();
  });

  describe('Gateway specifc methods', () => {
    const exampleTransactionHash =
      '0x37013e1cb9c133e6fe51b4b371b76b317a480f56d80576730754c1662582348';

    test('getContractAddresses()', async () => {
      const { GpsStatementVerifier, Starknet } = await provider.getContractAddresses();
      expect(typeof GpsStatementVerifier).toBe('string');
      expect(typeof Starknet).toBe('string');
    });

    test('getTransactionStatus()', async () => {
      return expect(provider.getTransactionStatus(exampleTransactionHash)).resolves.not.toThrow();
    });

    test('transaction trace', async () => {
      const transactionTrace = await provider.getTransactionTrace(exampleTransactionHash);
      expect(transactionTrace).toHaveProperty('function_invocation');
      expect(transactionTrace).toHaveProperty('signature');
    });
  });
});
