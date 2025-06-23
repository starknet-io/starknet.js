import { OutsideExecutionTypedData } from '@starknet-io/starknet-types-08';
import {
  RpcError,
  PaymasterRpc,
  ExecutionParameters,
  UserTransaction,
  ExecutableUserTransaction,
} from '../src';
import fetchMock from '../src/utils/connect/fetch';
import { signatureToHexArray } from '../src/utils/stark';

jest.mock('../src/utils/connect/fetch');
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

  describe('buildTransaction', () => {
    it('should return typedData and parsed tokenAmountAndPrice', async () => {
      // Given
      const client = new PaymasterRpc();
      const mockCall = {
        contractAddress: '0xabc',
        entrypoint: 'transfer',
        calldata: ['0x1', '0x2'],
      };
      const transaction: UserTransaction = {
        type: 'invoke',
        invoke: {
          userAddress: '0xuser',
          calls: [mockCall],
        },
      };
      const parameters: ExecutionParameters = {
        version: '0x1',
        feeMode: {
          mode: 'default',
          gasToken: '0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
        },
      };

      mockFetch.mockResolvedValueOnce({
        json: async () => ({
          result: {
            type: 'invoke',
            typed_data: { domain: {}, message: {}, types: {} },
            parameters: {
              version: '0x1',
              fee_mode: {
                mode: 'default',
                gas_token: '0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
              },
              time_bounds: null,
            },
            fee: {
              gas_token_price_in_strk: '0x5ffeeacbaf058dfee0',
              estimated_fee_in_strk: '0xe8a2e6bd26e66',
              estimated_fee_in_gas_token: '0x21a1a7339fd',
              suggested_max_fee_in_strk: '0x2b9e8b43774b32',
              suggested_max_fee_in_gas_token: '0x64e4f59adf7',
            },
          },
        }),
      });

      // When
      const result = await client.buildTransaction(transaction, parameters);

      // Then
      expect(result.fee.estimated_fee_in_strk).toBe(BigInt(0xe8a2e6bd26e66));
      expect(result.fee.suggested_max_fee_in_strk).toBe(BigInt(0x2b9e8b43774b32));
      expect(result.parameters.feeMode.mode).toBe('default');
      expect(result.type).toBe('invoke');
      // @ts-ignore
      // eslint-disable-next-line
      expect(result['typed_data']).toBeDefined();
    });
  });

  describe('executeTransaction', () => {
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
      const transaction: ExecutableUserTransaction = {
        type: 'invoke',
        invoke: {
          userAddress: '0xuser',
          typedData: mockTypedData,
          signature: mockSignature,
        },
      };
      const parameters: ExecutionParameters = {
        version: '0x1',
        feeMode: {
          mode: 'default',
          gasToken: '0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
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
      const result = await client.executeTransaction(transaction, parameters);

      // Then
      expect(signatureToHexArray).toHaveBeenCalledWith(mockSignature);
      expect(result.transaction_hash).toBe('0xaaa');
    });
  });

  describe('getSupportedTokens', () => {
    it('should return supported tokens and prices', async () => {
      // Given
      const client = new PaymasterRpc();
      const rpc_response = [
        {
          token_address: '0x53b40a647cedfca6ca84f542a0fe36736031905a9639a7f19a3c1e66bfd5080',
          decimals: 6,
          price_in_strk: '0x38aea',
        },
      ];
      const expected = [
        {
          token_address: '0x53b40a647cedfca6ca84f542a0fe36736031905a9639a7f19a3c1e66bfd5080',
          decimals: 6,
          priceInStrk: BigInt('0x38aea'),
        },
      ];

      mockFetch.mockResolvedValueOnce({
        json: async () => ({ result: rpc_response }),
      });

      // When
      const result = await client.getSupportedTokens();
      // Then
      expect(result).toEqual(expected);
    });
  });
});
