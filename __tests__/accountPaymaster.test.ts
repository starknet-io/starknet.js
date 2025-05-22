import { Account, Signature, Call, PaymasterDetails, OutsideExecutionVersion } from '../src';

jest.mock('../src/paymaster/rpc');

describe('Account - Paymaster integration', () => {
  let account: Account | null = null;
  const mockBuildTransaction = jest.fn();
  const mockMaliciousBuildTransactionChangeFees = jest.fn();
  const mockMaliciousBuildTransactionAddedCalls = jest.fn();
  const mockExecuteTransaction = jest.fn();
  const mockGetSnip9Version = jest.fn();
  const mockSignMessage = jest.fn();

  const fakeSignature: Signature = ['0x1', '0x2'];
  const calls: Call[] = [{ contractAddress: '0x123', entrypoint: 'transfer', calldata: [] }];

  const typedData = {
    types: {},
    domain: {},
    primaryType: '',
    message: {
      caller: '0xcaller',
      nonce: '0xnonce',
      execute_after: '0x1',
      execute_before: '0x2',
      calls_len: `0x${(calls.length + 1).toString(16)}`,
      calls: [
        ...calls,
        { contractAddress: '0x456', entrypoint: 'transfer', calldata: ['0xcaller', 1200, 0] },
      ],
    },
  };

  const paymasterResponse = {
    type: 'invoke',
    typed_data: typedData,
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

  const maliciousTypedDataChangeFees = {
    ...typedData,
    message: {
      ...typedData.message,
      calls: [
        ...calls,
        { contractAddress: '0x456', entrypoint: 'transfer', calldata: ['0xcaller', 13000, 0] },
      ],
    },
  };

  const maliciousTypedDataAddedCalls = {
    ...typedData,
    message: {
      ...typedData.message,
      calls: [
        ...calls,
        { contractAddress: '0x456', entrypoint: 'transfer', calldata: ['0xcaller', 13000, 0] },
        { contractAddress: '0x456', entrypoint: 'transfer', calldata: ['0xcaller', 13000, 0] },
      ],
    },
  };

  const maliciousPaymasterResponseChangeFees = {
    ...paymasterResponse,
    typed_data: maliciousTypedDataChangeFees,
  };
  const maliciousPaymasterResponseAddedCalls = {
    ...paymasterResponse,
    typed_data: maliciousTypedDataAddedCalls,
  };

  const getAccount = () => {
    if (!account) {
      account = new Account(
        {},
        '0xabc',
        { signMessage: mockSignMessage.mockResolvedValue(fakeSignature) } as any,
        undefined,
        undefined,
        undefined
      );
      // account object is instanciate in the constructor, we need to mock the paymaster methods after paymaster object is instanciate
      account.paymaster.buildTransaction = mockBuildTransaction;
      account.paymaster.executeTransaction = mockExecuteTransaction;
    }
    return account;
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(getAccount(), 'getSnip9Version').mockImplementation(mockGetSnip9Version);
    mockBuildTransaction.mockResolvedValue(paymasterResponse);
    mockMaliciousBuildTransactionChangeFees.mockResolvedValue(maliciousPaymasterResponseChangeFees);
    mockMaliciousBuildTransactionAddedCalls.mockResolvedValue(maliciousPaymasterResponseAddedCalls);
    mockExecuteTransaction.mockResolvedValue({ transaction_hash: '0x123' });
    mockGetSnip9Version.mockResolvedValue(OutsideExecutionVersion.V2);
  });

  describe('estimatePaymasterTransactionFee', () => {
    it('should return estimated transaction fee from paymaster', async () => {
      const result = await getAccount().estimatePaymasterTransactionFee(calls, {
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

      expect(result).toEqual(paymasterResponse.fee);
    });
  });

  describe('executePaymasterTransaction', () => {
    it('should sign and execute transaction via paymaster', async () => {
      const details: PaymasterDetails = {
        feeMode: { mode: 'default', gasToken: '0x456' },
      };

      const result = await getAccount().executePaymasterTransaction(calls, details);

      expect(mockBuildTransaction).toHaveBeenCalledTimes(1);
      expect(mockSignMessage).toHaveBeenCalledWith(typedData, '0xabc');
      expect(mockExecuteTransaction).toHaveBeenCalledWith(
        {
          type: 'invoke',
          invoke: {
            userAddress: '0xabc',
            typedData,
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
  });

  describe('safeExecutePaymasterTransaction', () => {
    it('should sign and execute transaction via paymaster', async () => {
      const details: PaymasterDetails = {
        feeMode: { mode: 'default', gasToken: '0x456' },
      };

      const result = await getAccount().safeExecutePaymasterTransaction(calls, details, '0x123456');
      expect(result).toEqual({ transaction_hash: '0x123' });
    });

    it('should not throw if token price exceeds maxPriceInGasToken but transaction is sponsored', async () => {
      const details: PaymasterDetails = {
        feeMode: { mode: 'sponsored' },
      };
      const result = await getAccount().safeExecutePaymasterTransaction(calls, details, '0x123');
      expect(result).toEqual({
        transaction_hash: '0x123',
      });
    });

    it('should throw if token price exceeds maxPriceInGasToken', async () => {
      const details: PaymasterDetails = {
        feeMode: { mode: 'default', gasToken: '0x456' },
      };

      await expect(
        getAccount().safeExecutePaymasterTransaction(calls, details, '0x123')
      ).rejects.toThrow('Gas token price is too high');
    });

    it('should throw if Gas token value is not equal to the provided gas fees', async () => {
      const details: PaymasterDetails = {
        feeMode: { mode: 'default', gasToken: '0x456' },
      };
      getAccount().paymaster.buildTransaction = mockMaliciousBuildTransactionChangeFees;
      await expect(
        getAccount().safeExecutePaymasterTransaction(calls, details, '0x123456')
      ).rejects.toThrow('Gas token value is not equal to the provided gas fees');
    });

    it('should throw if provided calls are not strictly equal to the returned calls', async () => {
      const details: PaymasterDetails = {
        feeMode: { mode: 'default', gasToken: '0x456' },
      };
      getAccount().paymaster.buildTransaction = mockMaliciousBuildTransactionAddedCalls;

      await expect(
        getAccount().safeExecutePaymasterTransaction(calls, details, '0x123456')
      ).rejects.toThrow('Provided calls are not strictly equal to the returned calls');
    });
  });
});
