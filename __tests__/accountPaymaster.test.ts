import { Account, Signature, Call, PaymasterDetails } from '../src';
import { PaymasterRpc } from '../src/paymaster/rpc';

jest.mock('../src/paymaster/rpc');

describe('Account - Paymaster integration', () => {
  const mockBuildTypedData = jest.fn();
  const mockExecute = jest.fn();
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
    typedData: fakeTypedData,
    tokenAmountAndPrice: {
      estimatedAmount: 1000n,
      priceInStrk: 200n,
    },
  };

  const mockPaymaster = () =>
    ({
      buildTypedData: mockBuildTypedData,
      execute: mockExecute,
    }) as any;

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
    mockBuildTypedData.mockResolvedValue(paymasterResponse);
    mockExecute.mockResolvedValue({ transaction_hash: '0x123' });
  });

  describe('buildPaymasterTypedData', () => {
    it('should return typed data and token prices from paymaster', async () => {
      // Given
      const account = setupAccount();

      // When
      const result = await account.buildPaymasterTypedData(calls, { gasToken: '0x456' });

      // Then
      expect(mockBuildTypedData).toHaveBeenCalledWith(
        '0xabc',
        calls,
        '0x456',
        undefined,
        undefined
      );
      expect(result).toEqual(paymasterResponse);
    });
  });

  describe('executePaymaster', () => {
    it('should sign and execute transaction via paymaster', async () => {
      // Given
      const account = setupAccount();

      // When
      const result = await account.executePaymaster(calls);

      // Then
      expect(mockBuildTypedData).toHaveBeenCalledTimes(1);
      expect(mockSignMessage).toHaveBeenCalledWith(fakeTypedData, '0xabc');
      expect(mockExecute).toHaveBeenCalledWith('0xabc', fakeTypedData, fakeSignature, undefined);
      expect(result).toEqual({ transaction_hash: '0x123' });
    });

    it('should throw if estimated fee exceeds maxEstimatedFee', async () => {
      // Given
      const account = setupAccount();
      const details: PaymasterDetails = { maxEstimatedFee: 500n };

      // When / Then
      await expect(account.executePaymaster(calls, details)).rejects.toThrow(
        'Estimated max fee too high'
      );
    });

    it('should throw if token price exceeds maxPriceInStrk', async () => {
      // Given
      const account = setupAccount();
      const details: PaymasterDetails = { maxPriceInStrk: 100n };

      // When / Then
      await expect(account.executePaymaster(calls, details)).rejects.toThrow(
        'Gas token price is too high'
      );
    });
  });
});
