import { Account, Signature, Call, PaymasterDetails, PaymasterRpc } from '../src';

jest.mock('../src/paymaster/rpc');

describe('Account - Paymaster integration', () => {
  const mockBuildTransaction = jest.fn();
  const mockExecuteTransaction = jest.fn();
  const mockSignMessage = jest.fn();

  const fakeTypedData = {
    types: {},
    domain: {},
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

  const fakeSignature: Signature = ['0x1', '0x2'];
  const calls: Call[] = [{ contractAddress: '0x123', entrypoint: 'transfer', calldata: [] }];

  const paymasterResponse = {
    type: 'invoke',
    typed_data: fakeTypedData,
    parameters: {
      version: '0x1',
      feeMode: { mode: 'default', gasToken: '0x456' },
    },
    fee: {
      gas_token_price_in_strk: 200n,
      estimated_fee_in_strk: 3000n,
      estimated_fee_in_gas_token: 1000n,
      suggested_max_fee_in_strk: 4000n,
      suggested_max_fee_in_gas_token: 1200n,
    },
  };

  const mockPaymaster = () =>
    ({
      buildTransaction: mockBuildTransaction,
      executeTransaction: mockExecuteTransaction,
    }) as unknown as PaymasterRpc;

  const setupAccount = () =>
    new Account(
      {},
      '0xabc',
      { signMessage: mockSignMessage.mockResolvedValue(fakeSignature) } as any,
      undefined,
      undefined,
      mockPaymaster()
    );

  beforeEach(() => {
    jest.clearAllMocks();
    (PaymasterRpc as jest.Mock).mockImplementation(mockPaymaster);
    mockBuildTransaction.mockResolvedValue(paymasterResponse);
    mockExecuteTransaction.mockResolvedValue({ transaction_hash: '0x123' });
  });

  describe('buildPaymasterTransaction', () => {
    it('should return typed data and token prices from paymaster', async () => {
      const account = setupAccount();

      const result = await account.buildPaymasterTransaction(calls, {
        feeMode: { mode: 'default', gasToken: '0x456' },
      });

      expect(mockBuildTransaction).toHaveBeenCalledWith(
        {
          type: 'invoke',
          invoke: { userAddress: '0xabc', calls },
        },
        {
          version: '0x1',
          feeMode: { mode: 'default', gasToken: '0x456' },
          timeBounds: undefined,
        }
      );

      expect(result).toEqual(paymasterResponse);
    });
  });

  describe('executePaymasterTransaction', () => {
    it('should sign and execute transaction via paymaster', async () => {
      const account = setupAccount();
      const details: PaymasterDetails = {
        feeMode: { mode: 'default', gasToken: '0x456' },
      };

      const result = await account.executePaymasterTransaction(calls, details);

      expect(mockBuildTransaction).toHaveBeenCalledTimes(1);
      expect(mockSignMessage).toHaveBeenCalledWith(fakeTypedData, '0xabc');
      expect(mockExecuteTransaction).toHaveBeenCalledWith(
        {
          type: 'invoke',
          invoke: {
            userAddress: '0xabc',
            typedData: fakeTypedData,
            signature: ['0x1', '0x2'],
          },
        },
        {
          version: '0x1',
          feeMode: { mode: 'default', gasToken: '0x456' },
          timeBounds: undefined,
        }
      );
      expect(result).toEqual({ transaction_hash: '0x123' });
    });

    it('should throw if estimated fee exceeds maxEstimatedFeeInGasToken', async () => {
      const account = setupAccount();
      const details: PaymasterDetails = {
        feeMode: { mode: 'default', gasToken: '0x456' },
        maxEstimatedFeeInGasToken: 500n,
      };

      await expect(account.executePaymasterTransaction(calls, details)).rejects.toThrow(
        'Estimated max fee too high'
      );
    });

    it('should throw if token price exceeds maxPriceInStrk', async () => {
      const account = setupAccount();
      const details: PaymasterDetails = {
        feeMode: { mode: 'default', gasToken: '0x456' },
        maxGasTokenPriceInStrk: 100n,
      };

      await expect(account.executePaymasterTransaction(calls, details)).rejects.toThrow(
        'Gas token price is too high'
      );
    });
  });
});
