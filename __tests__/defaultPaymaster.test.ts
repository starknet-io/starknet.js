import { RpcError } from '../src';
import { PaymasterRpc } from '../src/paymaster/rpc';
import fetchMock from '../src/utils/fetchPonyfill';
import { signatureToHexArray } from '../src/utils/stark';
import { OutsideExecutionTypedData } from '../src/types/api/paymaster-rpc-spec/nonspec';

jest.mock('../src/utils/fetchPonyfill');
jest.mock('../src/utils/stark', () => ({
  signatureToHexArray: jest.fn(() => ['0x1', '0x2']),
}));
jest.mock('../src/utils/paymaster', () => ({
  getDefaultPaymasterNodeUrl: jest.fn(() => 'https://mock-node-url'),
}));

describe('PaymasterRpc', () => {
  const mockFetch = fetchMock as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('should initialize with default values', () => {
      // When
      const client = new PaymasterRpc();

      // Then
      expect(client.nodeUrl).toBe('https://mock-node-url');
      expect(client.requestId).toBe(0);
    });
  });

  describe('isAvailable', () => {
    it('should return true when paymaster is available', async () => {
      // Given
      const client = new PaymasterRpc();
      mockFetch.mockResolvedValueOnce({
        json: async () => ({ result: true }),
      });

      // When
      const result = await client.isAvailable();

      // Then
      expect(result).toBe(true);
      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          body: expect.stringContaining('"method":"paymaster_isAvailable"'),
        })
      );
    });

    it('should return false when paymaster is not available', async () => {
      // Given
      const client = new PaymasterRpc();
      mockFetch.mockResolvedValueOnce({
        json: async () => ({ result: false }),
      });

      // When
      const result = await client.isAvailable();

      // Then
      expect(result).toBe(false);
    });

    it('should throw RpcError when RPC returns error', async () => {
      // Given
      const client = new PaymasterRpc();
      mockFetch.mockResolvedValueOnce({
        json: async () => ({ error: { code: -32000, message: 'RPC failure' } }),
      });

      // When / Then
      await expect(client.isAvailable()).rejects.toThrow(RpcError);
    });

    it('should throw on network error', async () => {
      // Given
      const client = new PaymasterRpc();
      mockFetch.mockRejectedValueOnce(new Error('Network down'));

      // When / Then
      await expect(client.isAvailable()).rejects.toThrow('Network down');
    });
  });

  describe('buildTypedData', () => {
    it('should return typedData and parsed tokenAmountAndPrice', async () => {
      // Given
      const client = new PaymasterRpc();
      const mockCall = {
        contractAddress: '0xabc',
        entrypoint: 'transfer',
        calldata: ['0x1', '0x2'],
      };

      mockFetch.mockResolvedValueOnce({
        json: async () => ({
          result: {
            typed_data: { domain: {}, message: {}, types: {} },
            token_amount_and_price: {
              estimated_amount: '0x1234',
              price_in_strk: '0x5678',
            },
          },
        }),
      });

      // When
      const result = await client.buildTypedData('0xuser', [mockCall]);

      // Then
      expect(result.tokenAmountAndPrice.estimatedAmount).toBe(BigInt(0x1234));
      expect(result.tokenAmountAndPrice.priceInStrk).toBe(BigInt(0x5678));
      expect(result.typedData).toBeDefined();
    });
  });

  describe('execute', () => {
    it('should send execution request and return transaction hash', async () => {
      // Given
      const client = new PaymasterRpc();
      const mockSignature = ['0x1', '0x2'];
      const mockTypedData: OutsideExecutionTypedData = {
        domain: {},
        types: {},
        primaryType: '',
        message: {
          caller: '0xcaller',
          nonce: '0xnonce',
          execute_after: '0x1',
          execute_before: '0x2',
          calls_len: '0x0',
          calls: [],
        },
      };

      mockFetch.mockResolvedValueOnce({
        json: async () => ({
          result: {
            transaction_hash: '0xaaa',
            execution_result: 'ok',
          },
        }),
      });

      // When
      const result = await client.execute('0xuser', mockTypedData, mockSignature);

      // Then
      expect(signatureToHexArray).toHaveBeenCalledWith(mockSignature);
      expect(result.transaction_hash).toBe('0xaaa');
    });
  });

  describe('getSupportedTokensAndPrices', () => {
    it('should return supported tokens and prices', async () => {
      // Given
      const client = new PaymasterRpc();
      const expected = { tokens: [], prices: {} };

      mockFetch.mockResolvedValueOnce({
        json: async () => ({ result: expected }),
      });

      // When
      const result = await client.getSupportedTokensAndPrices();

      // Then
      expect(result).toEqual(expected);
    });
  });
});
