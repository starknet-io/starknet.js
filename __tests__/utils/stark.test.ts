import { CallData, RawArgs, UniversalDetails, stark, FeeEstimate } from '../../src';
import { EDataAvailabilityMode, ETransactionVersion } from '../../src/types/api';
import { toBigInt, toHex } from '../../src/utils/num';
import { ArraySignatureType } from '../../src/types/lib';
import sampleContract from '../../__mocks__/cairo/helloCairo2/compiled.sierra.json';

describe('stark', () => {
  describe('CallData.compile() ', () => {
    test('compiles BigNumberish[] calldata', () => {
      const callData = ['0x000', 2n, 10000];

      const compiled = CallData.compile(callData);

      expect(compiled).toEqual(['0', '2', '10000']);
    });

    test('compiles Object type calldata', () => {
      const callData = {
        a: '0x000',
        b: 2n,
        c: 10000,
        d: [1n, 2n, '0x3'],
      };

      const compiled = CallData.compile(callData);

      expect(compiled).toEqual(['0', '2', '10000', '3', '1', '2', '3']);
    });

    test('compiles Struct type calldata', () => {
      const calldata: RawArgs = {
        a: {
          x: 1n,
          y: 2n,
          z: 3n,
        },
        b: 10000000000,
        c: ['1', '2', toBigInt(3), toHex(4)],
      };

      const compiled = CallData.compile(calldata);

      expect(compiled).toEqual(['1', '2', '3', '10000000000', '4', '1', '2', '3', '4']);
    });
  });

  describe('compressProgram and decompressProgram', () => {
    test('compresses and decompresses a string program', () => {
      const programString = JSON.stringify({
        abi: [],
        program: {
          data: ['0x1', '0x2'],
          builtins: [],
          hints: {},
          prime: '0x800000000000011000000000000000000000000000000000000000000000001',
        },
      });

      const compressed = stark.compressProgram(programString);
      expect(typeof compressed).toBe('string');
      expect(compressed.length).toBeGreaterThan(0);

      const decompressed = stark.decompressProgram(compressed);
      expect(typeof decompressed).toBe('object');
      expect(decompressed.abi).toEqual([]);
    });

    test('compresses a large sierra program', () => {
      const contractString = JSON.stringify(sampleContract);
      const compressed = stark.compressProgram(contractString);
      expect(typeof compressed).toBe('string');
      expect(compressed.length).toBeGreaterThan(0);

      const decompressed = stark.decompressProgram(compressed);
      expect(decompressed).toEqual(sampleContract);
    });

    test('returns array unchanged when decompressing array input', () => {
      const arrayInput = [{ test: 'data' }];
      const result = stark.decompressProgram(arrayInput as any);
      expect(result).toBe(arrayInput);
    });
  });

  describe('randomAddress', () => {
    test('generates a random address', () => {
      const address1 = stark.randomAddress();
      const address2 = stark.randomAddress();

      expect(typeof address1).toBe('string');
      expect(typeof address2).toBe('string');
      expect(address1).toMatch(/^0x[a-f0-9]+$/i);
      expect(address2).toMatch(/^0x[a-f0-9]+$/i);
      expect(address1).not.toBe(address2);
    });

    test('generates valid starknet addresses', () => {
      for (let i = 0; i < 5; i += 1) {
        const address = stark.randomAddress();
        expect(address).toMatch(/^0x[a-f0-9]{1,64}$/i);
      }
    });
  });

  describe('signature formatting functions', () => {
    const mockSignatureWithR = {
      r: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
      s: '0xfedcba0987654321fedcba0987654321fedcba0987654321fedcba0987654321',
    };

    const mockArraySignature: ArraySignatureType = [
      '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
      '0x9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba',
    ];

    describe('formatSignature', () => {
      test('formats signature with r,s properties to hex array', () => {
        const result = stark.formatSignature(mockSignatureWithR as any);
        expect(result).toEqual([
          '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
          '0xfedcba0987654321fedcba0987654321fedcba0987654321fedcba0987654321',
        ]);
      });

      test('formats array signature by converting to hex', () => {
        const result = stark.formatSignature(mockArraySignature);
        expect(result).toEqual([
          '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
          '0x9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba',
        ]);
      });

      test('throws error for undefined signature', () => {
        expect(() => stark.formatSignature(undefined)).toThrow(
          'formatSignature: provided signature is undefined'
        );
      });

      test('throws error for invalid signature format', () => {
        expect(() => stark.formatSignature({ invalid: 'signature' } as any)).toThrow(
          'Signature need to be weierstrass.SignatureType or an array for custom'
        );
      });
    });

    describe('signatureToDecimalArray', () => {
      test('converts signature with r,s to decimal array', () => {
        const result = stark.signatureToDecimalArray(mockSignatureWithR as any);
        expect(result).toHaveLength(2);
        expect(result[0]).toMatch(/^\d+$/);
        expect(result[1]).toMatch(/^\d+$/);
        expect(BigInt(result[0])).toBe(
          0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdefn
        );
        expect(BigInt(result[1])).toBe(
          0xfedcba0987654321fedcba0987654321fedcba0987654321fedcba0987654321n
        );
      });

      test('converts array signature to decimal array', () => {
        const result = stark.signatureToDecimalArray(mockArraySignature);
        expect(result).toHaveLength(2);
        expect(result[0]).toMatch(/^\d+$/);
        expect(result[1]).toMatch(/^\d+$/);
        // Verify the values are different from the object signature test
        expect(BigInt(result[0])).toBe(
          0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890n
        );
        expect(BigInt(result[1])).toBe(
          0x9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcban
        );
      });
    });

    describe('signatureToHexArray', () => {
      test('converts signature with r,s to hex array', () => {
        const result = stark.signatureToHexArray(mockSignatureWithR as any);
        expect(result).toEqual([
          '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
          '0xfedcba0987654321fedcba0987654321fedcba0987654321fedcba0987654321',
        ]);
      });

      test('converts array signature to hex array', () => {
        const result = stark.signatureToHexArray(mockArraySignature);
        expect(result).toEqual([
          '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
          '0x9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba',
        ]);
      });
    });
  });

  describe('toOverheadResourceBounds', () => {
    test('calculates resource bounds with default overhead', () => {
      const estimate: FeeEstimate = {
        l1_gas_consumed: '1000',
        l1_gas_price: '100',
        l1_data_gas_consumed: '500',
        l1_data_gas_price: '50',
        l2_gas_consumed: '200',
        l2_gas_price: '20',
        overall_fee: '0',
        unit: 'FRI',
      };

      const result = stark.toOverheadResourceBounds(estimate);

      expect(result).toHaveProperty('l1_gas');
      expect(result).toHaveProperty('l2_gas');
      expect(result).toHaveProperty('l1_data_gas');
      expect(typeof result.l1_gas.max_amount).toBe('bigint');
      expect(typeof result.l1_gas.max_price_per_unit).toBe('bigint');
      expect(result.l1_gas.max_amount).toBeGreaterThan(1000n);
      expect(result.l1_gas.max_price_per_unit).toBeGreaterThan(100n);
    });

    test('calculates resource bounds with custom overhead', () => {
      const estimate: FeeEstimate = {
        l1_gas_consumed: '1000',
        l1_gas_price: '100',
        l1_data_gas_consumed: '500',
        l1_data_gas_price: '50',
        l2_gas_consumed: '200',
        l2_gas_price: '20',
        overall_fee: '0',
        unit: 'FRI',
      };

      const customOverhead = {
        l1_gas: { max_amount: 100, max_price_per_unit: 100 },
        l2_gas: { max_amount: 100, max_price_per_unit: 100 },
        l1_data_gas: { max_amount: 100, max_price_per_unit: 100 },
      };

      const result = stark.toOverheadResourceBounds(estimate, customOverhead);

      expect(result.l1_gas.max_amount).toBe(2000n); // 1000 + 100%
      expect(result.l1_gas.max_price_per_unit).toBe(200n); // 100 + 100%
      expect(result.l2_gas.max_amount).toBe(400n); // 200 + 100%
      expect(result.l2_gas.max_price_per_unit).toBe(40n); // 20 + 100%
    });
  });

  describe('toOverheadOverallFee', () => {
    test('calculates overall fee with default overhead', () => {
      const estimate: FeeEstimate = {
        l1_gas_consumed: '1000',
        l1_gas_price: '100',
        l1_data_gas_consumed: '500',
        l1_data_gas_price: '50',
        l2_gas_consumed: '200',
        l2_gas_price: '20',
        overall_fee: '0',
        unit: 'FRI',
      };

      const result = stark.toOverheadOverallFee(estimate);

      // Should be: l1_gas_consumed * l1_gas_price + l1_data_gas_consumed * l1_data_gas_price + l2_gas_consumed * l2_gas_price
      // With overhead applied to each component
      expect(typeof result).toBe('bigint');
      expect(result).toBeGreaterThan(129000n); // Base calculation: 1000*100 + 500*50 + 200*20 = 129000
    });

    test('calculates overall fee with custom overhead', () => {
      const estimate: FeeEstimate = {
        l1_gas_consumed: '1000',
        l1_gas_price: '100',
        l1_data_gas_consumed: '500',
        l1_data_gas_price: '50',
        l2_gas_consumed: '200',
        l2_gas_price: '20',
        overall_fee: '0',
        unit: 'FRI',
      };

      const customOverhead = {
        l1_gas: { max_amount: 50, max_price_per_unit: 50 },
        l2_gas: { max_amount: 50, max_price_per_unit: 50 },
        l1_data_gas: { max_amount: 50, max_price_per_unit: 50 },
      };

      const result = stark.toOverheadOverallFee(estimate, customOverhead);

      // With 50% overhead: (1000*1.5)*(100*1.5) + (500*1.5)*(50*1.5) + (200*1.5)*(20*1.5)
      // = 1500*150 + 750*75 + 300*30 = 225000 + 56250 + 9000 = 290250
      expect(result).toBe(290250n);
    });
  });

  describe('ZeroFeeEstimate', () => {
    test('returns zero fee estimate', () => {
      const result = stark.ZeroFeeEstimate();

      expect(result).toEqual({
        l1_gas_consumed: '0',
        l1_gas_price: '0',
        l1_data_gas_consumed: '0',
        l1_data_gas_price: '0',
        l2_gas_consumed: '0',
        l2_gas_price: '0',
        overall_fee: '0',
        unit: 'FRI',
      });
    });
  });

  describe('intDAM', () => {
    test('converts L1 data availability mode', () => {
      const result = stark.intDAM(EDataAvailabilityMode.L1);
      expect(result).toBe(0);
    });

    test('converts L2 data availability mode', () => {
      const result = stark.intDAM(EDataAvailabilityMode.L2);
      expect(result).toBe(1);
    });

    test('throws error for invalid data availability mode', () => {
      expect(() => stark.intDAM('INVALID' as any)).toThrow('EDAM conversion');
    });
  });

  describe('toTransactionVersion', () => {
    test('returns provided version when specified', () => {
      const result = stark.toTransactionVersion('0x1', '0x3');
      expect(result).toBe('0x3');
    });

    test('returns default version when provided version is not specified', () => {
      const result = stark.toTransactionVersion('0x3');
      expect(result).toBe('0x3');
    });

    test('accepts BigInt inputs', () => {
      const result = stark.toTransactionVersion(1n, 3n);
      expect(result).toBe('0x3');
    });

    test('throws error for invalid provided version', () => {
      expect(() => stark.toTransactionVersion('0x1', '0x999')).toThrow(
        'providedVersion 0x999 is not ETransactionVersion'
      );
    });

    test('throws error for invalid default version', () => {
      expect(() => stark.toTransactionVersion('0x999')).toThrow(
        'defaultVersion 0x999 is not ETransactionVersion'
      );
    });
  });

  describe('toFeeVersion', () => {
    test('returns undefined for undefined input', () => {
      const result = stark.toFeeVersion(undefined);
      expect(result).toBeUndefined();
    });

    test('converts V3 to F3', () => {
      const result = stark.toFeeVersion(ETransactionVersion.V3);
      expect(result).toBe(ETransactionVersion.F3);
    });

    test('accepts BigInt and number inputs', () => {
      const result1 = stark.toFeeVersion(3n);
      const result2 = stark.toFeeVersion(3);
      const result3 = stark.toFeeVersion('3');
      expect(result1).toBe(ETransactionVersion.F3);
      expect(result2).toBe(ETransactionVersion.F3);
      expect(result3).toBe(ETransactionVersion.F3);
    });

    test('throws error for unsupported version', () => {
      expect(() => stark.toFeeVersion('0x999')).toThrow('toFeeVersion: 0x999 is not supported');
    });
  });

  test('v3Details', () => {
    const setValues = (o: {}, v: any) => Object.fromEntries(Object.keys(o).map((k) => [k, v]));

    const details: UniversalDetails = {
      tip: 99n,
      paymasterData: [99n, 99n],
      accountDeploymentData: [99n, 99n],
      nonceDataAvailabilityMode: EDataAvailabilityMode.L2,
      feeDataAvailabilityMode: EDataAvailabilityMode.L2,
      resourceBounds: {
        l1_gas: { max_amount: 0x99n, max_price_per_unit: 0x99n },
        l2_gas: { max_amount: 0x99n, max_price_per_unit: 0x99n },
        l1_data_gas: { max_amount: 0x99n, max_price_per_unit: 0x99n },
      },
    };
    const detailsUndefined = setValues(details, undefined);
    const detailsAnything = setValues(details, expect.anything());

    expect(stark.v3Details(details)).toMatchObject(details);
    expect(stark.v3Details(detailsUndefined)).toEqual(expect.objectContaining(detailsAnything));
  });
});

describe('ec full public key', () => {
  test('determine if value is a BigNumberish', () => {
    const privateKey1 = '0x43b7240d227aa2fb8434350b3321c40ac1b88c7067982549e7609870621b535';
    expect(stark.getFullPublicKey(privateKey1)).toBe(
      '0x0400b730bd22358612b5a67f8ad52ce80f9e8e893639ade263537e6ef35852e5d3057795f6b090f7c6985ee143f798608a53b3659222c06693c630857a10a92acf'
    );
  });
});

describe('resourceBoundsToHexString', () => {
  test('converts ResourceBoundsBN with l1_data_gas (RPC 0.8+) to string format', () => {
    const resourceBoundsBN = {
      l1_gas: {
        max_amount: 1000n,
        max_price_per_unit: 100n,
      },
      l2_gas: {
        max_amount: 2000n,
        max_price_per_unit: 200n,
      },
      l1_data_gas: {
        max_amount: 500n,
        max_price_per_unit: 50n,
      },
    };

    const result = stark.resourceBoundsToHexString(resourceBoundsBN);

    expect(result).toEqual({
      l1_gas: {
        max_amount: '0x3e8',
        max_price_per_unit: '0x64',
      },
      l2_gas: {
        max_amount: '0x7d0',
        max_price_per_unit: '0xc8',
      },
      l1_data_gas: {
        max_amount: '0x1f4',
        max_price_per_unit: '0x32',
      },
    });
  });

  test('converts zero values correctly', () => {
    const resourceBoundsBN = {
      l1_gas: {
        max_amount: 0n,
        max_price_per_unit: 0n,
      },
      l2_gas: {
        max_amount: 0n,
        max_price_per_unit: 0n,
      },
      l1_data_gas: {
        max_amount: 0n,
        max_price_per_unit: 0n,
      },
    };

    const result = stark.resourceBoundsToHexString(resourceBoundsBN);

    expect(result).toEqual({
      l1_gas: {
        max_amount: '0x0',
        max_price_per_unit: '0x0',
      },
      l2_gas: {
        max_amount: '0x0',
        max_price_per_unit: '0x0',
      },
      l1_data_gas: {
        max_amount: '0x0',
        max_price_per_unit: '0x0',
      },
    });
  });
});

describe('toBigIntResourceBound', () => {
  test('converts ResourceBounds with string values to BigInt format', () => {
    const resourceBounds = {
      l1_gas: {
        max_amount: '0x3e8',
        max_price_per_unit: '0x64',
      },
      l2_gas: {
        max_amount: '0x7d0',
        max_price_per_unit: '0xc8',
      },
      l1_data_gas: {
        max_amount: '0x1f4',
        max_price_per_unit: '0x32',
      },
    };

    const result = stark.resourceBoundsToBigInt(resourceBounds);

    expect(result).toEqual({
      l1_gas: {
        max_amount: 1000n,
        max_price_per_unit: 100n,
      },
      l2_gas: {
        max_amount: 2000n,
        max_price_per_unit: 200n,
      },
      l1_data_gas: {
        max_amount: 500n,
        max_price_per_unit: 50n,
      },
    });
  });

  test('converts decimal string values to BigInt', () => {
    const resourceBounds = {
      l1_gas: {
        max_amount: '1000',
        max_price_per_unit: '100',
      },
      l2_gas: {
        max_amount: '2000',
        max_price_per_unit: '200',
      },
      l1_data_gas: {
        max_amount: '500',
        max_price_per_unit: '50',
      },
    };

    const result = stark.resourceBoundsToBigInt(resourceBounds);

    expect(result).toEqual({
      l1_gas: {
        max_amount: 1000n,
        max_price_per_unit: 100n,
      },
      l2_gas: {
        max_amount: 2000n,
        max_price_per_unit: 200n,
      },
      l1_data_gas: {
        max_amount: 500n,
        max_price_per_unit: 50n,
      },
    });
  });

  test('converts zero values correctly', () => {
    const resourceBounds = {
      l1_gas: {
        max_amount: '0x0',
        max_price_per_unit: '0x0',
      },
      l2_gas: {
        max_amount: '0',
        max_price_per_unit: '0',
      },
      l1_data_gas: {
        max_amount: '0x0',
        max_price_per_unit: '0x0',
      },
    };

    const result = stark.resourceBoundsToBigInt(resourceBounds);

    expect(result).toEqual({
      l1_gas: {
        max_amount: 0n,
        max_price_per_unit: 0n,
      },
      l2_gas: {
        max_amount: 0n,
        max_price_per_unit: 0n,
      },
      l1_data_gas: {
        max_amount: 0n,
        max_price_per_unit: 0n,
      },
    });
  });
});
