import { OutsideCallV2, OutsideExecutionTypedDataV2 } from '@starknet-io/starknet-types-08';
import {
  Account,
  Signature,
  Call,
  PaymasterDetails,
  OutsideExecutionVersion,
  logger,
} from '../src';
import { getSelectorFromName } from '../src/utils/hash';

jest.mock('../src/paymaster/rpc');
logger.setLogLevel('ERROR');

describe('Account - Paymaster integration', () => {
  let account: Account | null = null;
  const mockBuildTransaction = jest.fn();
  const mockMaliciousBuildTransactionChangeToken = jest.fn();
  const mockMaliciousBuildTransactionChangeFees = jest.fn();
  const mockMaliciousBuildTransactionAddedCalls = jest.fn();
  const mockExecuteTransaction = jest.fn();
  const mockGetSnip9Version = jest.fn();
  const mockSignMessage = jest.fn();

  const fakeSignature: Signature = ['0x1', '0x2'];
  const originalCalls: Call[] = [
    { contractAddress: '0x123', entrypoint: 'transfer', calldata: [] },
  ];

  const originalCallsAsOutsideCalls: OutsideCallV2[] = [
    {
      To: '0x123',
      Selector: getSelectorFromName('transfer'),
      Calldata: [],
    },
  ];

  const typedData: OutsideExecutionTypedDataV2 = {
    types: {},
    domain: {},
    primaryType: '',
    message: {
      Caller: '0xcaller',
      Nonce: '0xnonce',
      'Execute After': '0x1',
      'Execute Before': '0x2',
      Calls: [
        ...originalCallsAsOutsideCalls,
        {
          To: '0x456',
          Selector: getSelectorFromName('transfer'),
          Calldata: ['0xcaller', '1200', '0'],
        },
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

  const maliciousTypedDataChangeToken: OutsideExecutionTypedDataV2 = {
    ...typedData,
    message: {
      ...typedData.message,
      Calls: [
        ...originalCallsAsOutsideCalls,
        {
          To: '0x4567',
          Selector: getSelectorFromName('transfer'),
          Calldata: ['0xcaller', '1200', '0'],
        },
      ],
    },
  };

  const maliciousTypedDataChangeFees: OutsideExecutionTypedDataV2 = {
    ...typedData,
    message: {
      ...typedData.message,
      Calls: [
        ...originalCallsAsOutsideCalls,
        {
          To: '0x456',
          Selector: getSelectorFromName('transfer'),
          Calldata: ['0xcaller', '13000', '0'],
        },
      ],
    },
  };

  const maliciousTypedDataAddedCalls: OutsideExecutionTypedDataV2 = {
    ...typedData,
    message: {
      ...typedData.message,
      Calls: [
        ...originalCallsAsOutsideCalls,
        {
          To: '0x456',
          Selector: getSelectorFromName('transfer'),
          Calldata: ['0xcaller', '13000', '0'],
        },
        {
          To: '0x456',
          Selector: getSelectorFromName('transfer'),
          Calldata: ['0xcaller', '13000', '0'],
        },
      ],
    },
  };

  const maliciousPaymasterResponseChangeToken = {
    ...paymasterResponse,
    typed_data: maliciousTypedDataChangeToken,
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
    mockMaliciousBuildTransactionChangeToken.mockResolvedValue(
      maliciousPaymasterResponseChangeToken
    );
    mockMaliciousBuildTransactionChangeFees.mockResolvedValue(maliciousPaymasterResponseChangeFees);
    mockMaliciousBuildTransactionAddedCalls.mockResolvedValue(maliciousPaymasterResponseAddedCalls);
    mockExecuteTransaction.mockResolvedValue({ transaction_hash: '0x123' });
    mockGetSnip9Version.mockResolvedValue(OutsideExecutionVersion.V2);
  });

  describe('estimatePaymasterTransactionFee', () => {
    it('should return estimated transaction fee from paymaster', async () => {
      const result = await getAccount().estimatePaymasterTransactionFee(originalCalls, {
        feeMode: { mode: 'default', gasToken: '0x456' },
      });

      expect(mockBuildTransaction).toHaveBeenCalledWith(
        {
          type: 'invoke',
          invoke: { userAddress: '0xabc', calls: originalCalls },
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
    it('should sign and execute transaction via paymaster without checking gas fees', async () => {
      const details: PaymasterDetails = {
        feeMode: { mode: 'default', gasToken: '0x456' },
      };

      const result = await getAccount().executePaymasterTransaction(originalCalls, details);

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

    it('should sign and execute transaction via paymaster', async () => {
      const details: PaymasterDetails = {
        feeMode: { mode: 'default', gasToken: '0x456' },
      };

      const result = await getAccount().executePaymasterTransaction(
        originalCalls,
        details,
        '0x123456'
      );
      expect(result).toEqual({ transaction_hash: '0x123' });
    });

    it('should not throw if token price exceeds maxPriceInGasToken but transaction is sponsored', async () => {
      const details: PaymasterDetails = {
        feeMode: { mode: 'sponsored' },
      };
      const result = await getAccount().executePaymasterTransaction(
        originalCalls,
        details,
        '0x123'
      );
      expect(result).toEqual({
        transaction_hash: '0x123',
      });
    });

    it('should throw if token price exceeds maxPriceInGasToken', async () => {
      const details: PaymasterDetails = {
        feeMode: { mode: 'default', gasToken: '0x456' },
      };

      await expect(
        getAccount().executePaymasterTransaction(originalCalls, details, '0x123')
      ).rejects.toThrow('Gas token price is too high');
    });

    it('should throw if Gas token value is not equal to the provided gas fees', async () => {
      const details: PaymasterDetails = {
        feeMode: { mode: 'default', gasToken: '0x456' },
      };
      getAccount().paymaster.buildTransaction = mockMaliciousBuildTransactionChangeFees;
      await expect(
        getAccount().executePaymasterTransaction(originalCalls, details, '0x123456')
      ).rejects.toThrow('Gas token value is not equal to the provided gas fees');
    });

    it('should throw if Gas token address is not equal to the provided gas token', async () => {
      const details: PaymasterDetails = {
        feeMode: { mode: 'default', gasToken: '0x456' },
      };
      getAccount().paymaster.buildTransaction = mockMaliciousBuildTransactionChangeToken;
      await expect(
        getAccount().executePaymasterTransaction(originalCalls, details, '0x123456')
      ).rejects.toThrow('Gas token address is not equal to the provided gas token');
    });

    it('should throw if provided calls are not strictly equal to the returned calls', async () => {
      const details: PaymasterDetails = {
        feeMode: { mode: 'default', gasToken: '0x456' },
      };
      getAccount().paymaster.buildTransaction = mockMaliciousBuildTransactionAddedCalls;

      await expect(
        getAccount().executePaymasterTransaction(originalCalls, details, '0x123456')
      ).rejects.toThrow('Provided calls are not strictly equal to the returned calls');
    });
  });
});
