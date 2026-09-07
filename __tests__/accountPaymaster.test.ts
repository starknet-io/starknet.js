import type {
  OutsideCallV2,
  OutsideExecutionMessageV2,
  OutsideExecutionTypedDataV2,
} from '../src/types/api';
import {
  Account,
  OutsideExecutionVersion,
  constants,
  logger,
  hash,
  type Call,
  type PaymasterDetails,
  type Signature,
} from '../src';

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
  const mockGetChainId = jest.fn();
  const mockSignMessage = jest.fn();

  const fakeSignature: Signature = ['0x1', '0x2'];
  const originalCalls: Call[] = [
    { contractAddress: '0x123', entrypoint: 'transfer', calldata: [] },
  ];

  const originalCallsAsOutsideCalls: OutsideCallV2[] = [
    {
      To: '0x123',
      Selector: hash.getSelectorFromName('transfer'),
      Calldata: [],
    },
  ];

  const typedData: OutsideExecutionTypedDataV2 = {
    types: {},
    domain: { chainId: constants.StarknetChainId.SN_SEPOLIA },
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
          Selector: hash.getSelectorFromName('transfer'),
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
          Selector: hash.getSelectorFromName('transfer'),
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
          Selector: hash.getSelectorFromName('transfer'),
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
          Selector: hash.getSelectorFromName('transfer'),
          Calldata: ['0xcaller', '13000', '0'],
        },
        {
          To: '0x456',
          Selector: hash.getSelectorFromName('transfer'),
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

  const maliciousTypedDataWrongChain: OutsideExecutionTypedDataV2 = {
    ...typedData,
    domain: { chainId: constants.StarknetChainId.SN_MAIN },
  };

  const maliciousPaymasterResponseWrongChain = {
    ...paymasterResponse,
    typed_data: maliciousTypedDataWrongChain,
  };

  const mockMaliciousBuildTransactionWrongChain = jest.fn();

  const maliciousTypedDataDualCallsField: OutsideExecutionTypedDataV2 = {
    ...typedData,
    message: {
      ...typedData.message,
      // Undeclared lowercase field, added on top of the real `Calls`. It mirrors a fully
      // valid response (original call + fee call), so it passes every existing check when
      // read instead of `Calls`.
      calls: typedData.message.Calls,
    } as OutsideExecutionMessageV2,
  };

  const maliciousPaymasterResponseDualCallsField = {
    ...paymasterResponse,
    typed_data: maliciousTypedDataDualCallsField,
  };

  const mockMaliciousBuildTransactionDualCallsField = jest.fn();

  const maliciousTypedDataApproveInsteadOfTransfer: OutsideExecutionTypedDataV2 = {
    ...typedData,
    message: {
      ...typedData.message,
      Calls: [
        ...originalCallsAsOutsideCalls,
        {
          To: '0x456',
          Selector: hash.getSelectorFromName('approve'),
          Calldata: ['0xcaller', '1200', '0'],
        },
      ],
    },
  };

  const maliciousPaymasterResponseApproveInsteadOfTransfer = {
    ...paymasterResponse,
    typed_data: maliciousTypedDataApproveInsteadOfTransfer,
  };

  const mockMaliciousBuildTransactionApproveInsteadOfTransfer = jest.fn();

  const maliciousTypedDataShortCalldata: OutsideExecutionTypedDataV2 = {
    ...typedData,
    message: {
      ...typedData.message,
      Calls: [
        ...originalCallsAsOutsideCalls,
        {
          To: '0x456',
          Selector: hash.getSelectorFromName('transfer'),
          Calldata: ['0xcaller', '1200'], // missing the u256 high limb
        },
      ],
    },
  };

  const maliciousPaymasterResponseShortCalldata = {
    ...paymasterResponse,
    typed_data: maliciousTypedDataShortCalldata,
  };

  const mockMaliciousBuildTransactionShortCalldata = jest.fn();

  const maliciousTypedDataHighLimbDrain: OutsideExecutionTypedDataV2 = {
    ...typedData,
    message: {
      ...typedData.message,
      Calls: [
        ...originalCallsAsOutsideCalls,
        {
          To: '0x456',
          Selector: hash.getSelectorFromName('transfer'),
          // low limb (1200) matches the suggested fee exactly; the high limb (2^128 - 1) is
          // where the actual drain happens once both limbs are combined on-chain.
          Calldata: ['0xcaller', '1200', '340282366920938463463374607431768211455'],
        },
      ],
    },
  };

  const maliciousPaymasterResponseHighLimbDrain = {
    ...paymasterResponse,
    typed_data: maliciousTypedDataHighLimbDrain,
  };

  const mockMaliciousBuildTransactionHighLimbDrain = jest.fn();

  const getAccount = () => {
    if (!account) {
      account = new Account({
        provider: {},
        address: '0xabc',
        signer: { signMessage: mockSignMessage.mockResolvedValue(fakeSignature) } as any,
      });
      // account object is instanciate in the constructor, we need to mock the paymaster methods after paymaster object is instanciate
      account.paymaster.buildTransaction = mockBuildTransaction;
      account.paymaster.executeTransaction = mockExecuteTransaction;
    }
    return account;
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(getAccount(), 'getSnip9Version').mockImplementation(mockGetSnip9Version);
    jest.spyOn(getAccount().provider, 'getChainId').mockImplementation(mockGetChainId);
    mockBuildTransaction.mockResolvedValue(paymasterResponse);
    mockMaliciousBuildTransactionChangeToken.mockResolvedValue(
      maliciousPaymasterResponseChangeToken
    );
    mockMaliciousBuildTransactionChangeFees.mockResolvedValue(maliciousPaymasterResponseChangeFees);
    mockMaliciousBuildTransactionAddedCalls.mockResolvedValue(maliciousPaymasterResponseAddedCalls);
    mockMaliciousBuildTransactionWrongChain.mockResolvedValue(maliciousPaymasterResponseWrongChain);
    mockMaliciousBuildTransactionDualCallsField.mockResolvedValue(
      maliciousPaymasterResponseDualCallsField
    );
    mockMaliciousBuildTransactionApproveInsteadOfTransfer.mockResolvedValue(
      maliciousPaymasterResponseApproveInsteadOfTransfer
    );
    mockMaliciousBuildTransactionShortCalldata.mockResolvedValue(
      maliciousPaymasterResponseShortCalldata
    );
    mockMaliciousBuildTransactionHighLimbDrain.mockResolvedValue(
      maliciousPaymasterResponseHighLimbDrain
    );
    mockExecuteTransaction.mockResolvedValue({ transaction_hash: '0x123' });
    mockGetSnip9Version.mockResolvedValue(OutsideExecutionVersion.V2);
    mockGetChainId.mockResolvedValue(constants.StarknetChainId.SN_SEPOLIA);
  });

  describe('estimatePaymasterTransactionFee', () => {
    test('should return estimated transaction fee from paymaster', async () => {
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
    test('should sign and execute transaction via paymaster without checking gas fees', async () => {
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

    test('should sign and execute transaction via paymaster', async () => {
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

    test('should not throw if token price exceeds maxPriceInGasToken but transaction is sponsored', async () => {
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

    test('should throw if token price exceeds maxPriceInGasToken', async () => {
      const details: PaymasterDetails = {
        feeMode: { mode: 'default', gasToken: '0x456' },
      };

      await expect(
        getAccount().executePaymasterTransaction(originalCalls, details, '0x123')
      ).rejects.toThrow('Gas token price is too high');
    });

    test('should throw if Gas token value is not equal to the provided gas fees', async () => {
      const details: PaymasterDetails = {
        feeMode: { mode: 'default', gasToken: '0x456' },
      };
      getAccount().paymaster.buildTransaction = mockMaliciousBuildTransactionChangeFees;
      await expect(
        getAccount().executePaymasterTransaction(originalCalls, details, '0x123456')
      ).rejects.toThrow('Gas token value is not equal to the provided gas fees');
    });

    test('should throw if Gas token address is not equal to the provided gas token', async () => {
      const details: PaymasterDetails = {
        feeMode: { mode: 'default', gasToken: '0x456' },
      };
      getAccount().paymaster.buildTransaction = mockMaliciousBuildTransactionChangeToken;
      await expect(
        getAccount().executePaymasterTransaction(originalCalls, details, '0x123456')
      ).rejects.toThrow('Gas token address is not equal to the provided gas token');
    });

    test('should throw if provided calls are not strictly equal to the returned calls', async () => {
      const details: PaymasterDetails = {
        feeMode: { mode: 'default', gasToken: '0x456' },
      };
      getAccount().paymaster.buildTransaction = mockMaliciousBuildTransactionAddedCalls;

      await expect(
        getAccount().executePaymasterTransaction(originalCalls, details, '0x123456')
      ).rejects.toThrow('Provided calls are not strictly equal to the returned calls');
    });

    test('should throw if paymaster typed data domain chainId does not match the provider chain', async () => {
      const details: PaymasterDetails = {
        feeMode: { mode: 'default', gasToken: '0x456' },
      };
      getAccount().paymaster.buildTransaction = mockMaliciousBuildTransactionWrongChain;

      await expect(
        getAccount().executePaymasterTransaction(originalCalls, details)
      ).rejects.toThrow(
        "Paymaster typed data domain chainId does not match the account's provider chain"
      );
    });

    test('should throw if paymaster typed data declares both "calls" and "Calls"', async () => {
      const details: PaymasterDetails = {
        feeMode: { mode: 'default', gasToken: '0x456' },
      };
      getAccount().paymaster.buildTransaction = mockMaliciousBuildTransactionDualCallsField;

      await expect(
        getAccount().executePaymasterTransaction(originalCalls, details)
      ).rejects.toThrow(
        'Paymaster typed data must declare exactly one of "calls" (SNIP-9 V1) or "Calls" (SNIP-9 V2)'
      );
    });

    test('should throw if the gas-token call selector is not a transfer', async () => {
      const details: PaymasterDetails = {
        feeMode: { mode: 'default', gasToken: '0x456' },
      };
      getAccount().paymaster.buildTransaction =
        mockMaliciousBuildTransactionApproveInsteadOfTransfer;

      await expect(
        getAccount().executePaymasterTransaction(originalCalls, details)
      ).rejects.toThrow('Gas token call selector is not a transfer');
    });

    test('should throw if the gas-token call calldata does not have the expected shape', async () => {
      const details: PaymasterDetails = {
        feeMode: { mode: 'default', gasToken: '0x456' },
      };
      getAccount().paymaster.buildTransaction = mockMaliciousBuildTransactionShortCalldata;

      await expect(
        getAccount().executePaymasterTransaction(originalCalls, details)
      ).rejects.toThrow(
        'Gas token transfer calldata does not match the expected recipient/amount shape'
      );
    });

    test('should throw if the gas-token transfer high limb inflates the amount, even without an explicit maxFeeInGasToken', async () => {
      const details: PaymasterDetails = {
        feeMode: { mode: 'default', gasToken: '0x456' },
      };
      getAccount().paymaster.buildTransaction = mockMaliciousBuildTransactionHighLimbDrain;

      await expect(
        getAccount().executePaymasterTransaction(originalCalls, details)
      ).rejects.toThrow('Gas token value is not equal to the provided gas fees');
    });
  });
});
