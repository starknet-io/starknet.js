import type {
  OutsideCallV2,
  OutsideExecutionMessageV2,
  OutsideExecutionTypedDataV2,
} from '../src/types/api';
import {
  Account,
  OutsideExecutionVersion,
  cairo,
  constants,
  logger,
  hash,
  type Call,
  type PaymasterDetails,
  type Signature,
} from '../src';

jest.mock('../src/plugins/paymaster/rpc');
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

  // A SNIP-9 V2 typed data, written as a paymaster returns it. The types, the domain and the
  // primary type are the ones of SNIP-9: the paymaster only chooses the values of the message.
  const typedData: OutsideExecutionTypedDataV2 = {
    types: {
      StarknetDomain: [
        { name: 'name', type: 'shortstring' },
        { name: 'version', type: 'shortstring' },
        { name: 'chainId', type: 'shortstring' },
        { name: 'revision', type: 'shortstring' },
      ],
      OutsideExecution: [
        { name: 'Caller', type: 'ContractAddress' },
        { name: 'Nonce', type: 'felt' },
        { name: 'Execute After', type: 'u128' },
        { name: 'Execute Before', type: 'u128' },
        { name: 'Calls', type: 'Call*' },
      ],
      Call: [
        { name: 'To', type: 'ContractAddress' },
        { name: 'Selector', type: 'selector' },
        { name: 'Calldata', type: 'felt*' },
      ],
    },
    domain: {
      name: 'Account.execute_from_outside',
      version: '2',
      chainId: constants.StarknetChainId.SN_SEPOLIA,
      revision: '1',
    },
    primaryType: 'OutsideExecution',
    message: {
      Caller: '0xaaa', // the paymaster's own contract
      Nonce: '0xbbb',
      'Execute After': '0x1',
      'Execute Before': '0x6b49d200', // 1_800_000_000
      Calls: [
        ...originalCallsAsOutsideCalls,
        {
          To: '0x456',
          Selector: hash.getSelectorFromName('transfer'),
          Calldata: ['0xfee', '1200', '0'], // the fee recipient, then the amount as a u256
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

  const sponsoredTypedData: OutsideExecutionTypedDataV2 = {
    ...typedData,
    message: {
      ...typedData.message,
      Calls: originalCallsAsOutsideCalls, // sponsored: no appended fee-transfer call
    },
  };

  const sponsoredPaymasterResponse = {
    ...paymasterResponse,
    typed_data: sponsoredTypedData,
  };

  const mockSponsoredBuildTransaction = jest.fn();

  const maliciousTypedDataSponsoredSubstitutedCalls: OutsideExecutionTypedDataV2 = {
    ...typedData,
    message: {
      ...typedData.message,
      Calls: [
        {
          To: '0x999',
          Selector: hash.getSelectorFromName('transfer'),
          Calldata: ['0xattacker', '999999', '0'],
        },
      ], // a call the user never requested; still no fee call since this is "sponsored"
    },
  };

  const maliciousPaymasterResponseSponsoredSubstitutedCalls = {
    ...paymasterResponse,
    typed_data: maliciousTypedDataSponsoredSubstitutedCalls,
  };

  const mockMaliciousBuildTransactionSponsoredSubstitutedCalls = jest.fn();

  // SNIP-29's own typed-data examples show domain.chainId as an already-encoded hex felt, but
  // some paymasters (e.g. AVNU) return the raw shortstring instead. Both hash to the same felt.
  const typedDataChainIdAsShortstring: OutsideExecutionTypedDataV2 = {
    ...typedData,
    domain: { ...typedData.domain, chainId: 'SN_SEPOLIA' },
  };

  const paymasterResponseChainIdAsShortstring = {
    ...paymasterResponse,
    typed_data: typedDataChainIdAsShortstring,
  };

  const mockBuildTransactionChainIdAsShortstring = jest.fn();

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
    // Reset to the default mock: individual tests below override this when they need a
    // specific (malicious or sponsored) response, but the account object is a shared
    // singleton, so without this reset an override from one test would leak into the next.
    getAccount().paymaster.buildTransaction = mockBuildTransaction;
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
    mockSponsoredBuildTransaction.mockResolvedValue(sponsoredPaymasterResponse);
    mockMaliciousBuildTransactionSponsoredSubstitutedCalls.mockResolvedValue(
      maliciousPaymasterResponseSponsoredSubstitutedCalls
    );
    mockBuildTransactionChainIdAsShortstring.mockResolvedValue(
      paymasterResponseChainIdAsShortstring
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

    test('should sign and execute transaction via paymaster when a call holds a u256 object', async () => {
      // A u256 can be written as an object, like cairo.uint256(1000). The paymaster gets it
      // flattened, so the safety check must flatten it the same way before it rebuilds the hash.
      const callsWithU256: Call[] = [
        {
          contractAddress: '0x123',
          entrypoint: 'transfer',
          calldata: ['0x789', cairo.uint256(1000)],
        },
      ];
      const typedDataWithU256: OutsideExecutionTypedDataV2 = {
        ...typedData,
        message: {
          ...typedData.message,
          Calls: [
            {
              To: '0x123',
              Selector: hash.getSelectorFromName('transfer'),
              Calldata: ['0x789', '1000', '0'],
            },
            typedData.message.Calls[1],
          ],
        },
      };
      mockBuildTransaction.mockResolvedValueOnce({
        ...paymasterResponse,
        typed_data: typedDataWithU256,
      });
      const details: PaymasterDetails = {
        feeMode: { mode: 'default', gasToken: '0x456' },
      };

      const result = await getAccount().executePaymasterTransaction(callsWithU256, details);

      expect(result).toEqual({ transaction_hash: '0x123' });
    });

    test('should not throw if token price exceeds maxPriceInGasToken but transaction is sponsored', async () => {
      const details: PaymasterDetails = {
        feeMode: { mode: 'sponsored' },
      };
      getAccount().paymaster.buildTransaction = mockSponsoredBuildTransaction;
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

    test('should throw if a sponsored transaction substitutes different calls', async () => {
      const details: PaymasterDetails = {
        feeMode: { mode: 'sponsored' },
      };
      getAccount().paymaster.buildTransaction =
        mockMaliciousBuildTransactionSponsoredSubstitutedCalls;

      await expect(
        getAccount().executePaymasterTransaction(originalCalls, details)
      ).rejects.toThrow('Provided calls are not strictly equal to the returned calls');
    });

    test('should not throw if the domain chainId is a raw shortstring instead of an encoded felt', async () => {
      const details: PaymasterDetails = {
        feeMode: { mode: 'default', gasToken: '0x456' },
      };
      getAccount().paymaster.buildTransaction = mockBuildTransactionChainIdAsShortstring;

      const result = await getAccount().executePaymasterTransaction(originalCalls, details);

      expect(result).toEqual({ transaction_hash: '0x123' });
    });

    test('should throw if the signed calls field is renamed so a facade is checked but another array is signed', async () => {
      const details: PaymasterDetails = {
        feeMode: { mode: 'default', gasToken: '0x456' },
      };
      // The real SNIP-9 shape is kept, except the array that is actually signed is renamed to
      // `Calls_`. `Calls` still holds the honest user call + fee call, so every value-level check
      // passes while the signature covers `Calls_`: a 1_000_000-token transfer to the attacker.
      const malicious = {
        ...paymasterResponse,
        typed_data: {
          ...typedData,
          types: {
            ...typedData.types,
            OutsideExecution: [
              { name: 'Caller', type: 'ContractAddress' },
              { name: 'Nonce', type: 'felt' },
              { name: 'Execute After', type: 'u128' },
              { name: 'Execute Before', type: 'u128' },
              { name: 'Calls_', type: 'Call*' },
            ],
          },
          message: {
            ...typedData.message,
            Calls_: [
              {
                To: '0x456',
                Selector: hash.getSelectorFromName('transfer'),
                Calldata: ['0xattacker', '1000000', '0'],
              },
            ],
          },
        },
      };
      getAccount().paymaster.buildTransaction = jest.fn().mockResolvedValue(malicious);

      await expect(
        getAccount().executePaymasterTransaction(originalCalls, details)
      ).rejects.toThrow('Paymaster typed data does not match the expected outside execution');
    });

    test('should throw if the signed message is a foreign application message with the user calls as an unsigned facade', async () => {
      const details: PaymasterDetails = {
        feeMode: { mode: 'default', gasToken: '0x456' },
      };
      // The user calls sit in `Calls` (read by the checks) but are not part of the signed hash:
      // the primary type is `Session`, so the signature authorizes an attacker session key on a
      // message the paymaster could present to any contract that trusts this account's signature.
      const malicious = {
        ...paymasterResponse,
        typed_data: {
          ...typedData,
          types: {
            StarknetDomain: typedData.types.StarknetDomain,
            Session: [
              { name: 'Session Key', type: 'felt' },
              { name: 'Expires At', type: 'felt' },
            ],
            Call: typedData.types.Call,
          },
          primaryType: 'Session',
          domain: { ...typedData.domain, name: 'Some Dapp' },
          message: {
            'Session Key': '0xattackerkey',
            'Expires At': '0xffffffffffffffff',
            Calls: typedData.message.Calls,
          },
        },
      };
      getAccount().paymaster.buildTransaction = jest.fn().mockResolvedValue(malicious);

      await expect(
        getAccount().executePaymasterTransaction(originalCalls, details)
      ).rejects.toThrow('Paymaster typed data does not match the expected outside execution');
    });

    test('should throw if the signed execution window ends after the requested time bounds', async () => {
      const details: PaymasterDetails = {
        feeMode: { mode: 'default', gasToken: '0x456' },
        timeBounds: { executeBefore: 1_000_000 },
      };
      // The base typed data is signed with 'Execute Before' = 0x6b49d200 (1_800_000_000), well
      // past the executeBefore the user asked for.
      await expect(
        getAccount().executePaymasterTransaction(originalCalls, details)
      ).rejects.toThrow(
        'Paymaster typed data execution window is not within the requested time bounds'
      );
    });

    test('should not throw if the signed execution window is within the requested time bounds', async () => {
      const details: PaymasterDetails = {
        feeMode: { mode: 'default', gasToken: '0x456' },
        timeBounds: { executeBefore: 2_000_000_000 },
      };
      // 'Execute Before' = 1_800_000_000 is before the requested executeBefore, so it is allowed.
      const result = await getAccount().executePaymasterTransaction(originalCalls, details);

      expect(result).toEqual({ transaction_hash: '0x123' });
    });
  });
});
