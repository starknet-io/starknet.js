import { Account, Contract, ProviderInterface, hdParsingStrategy } from '../src';
import { contracts } from './config/fixtures';
import { createTestProvider, getTestAccount } from './config/fixturesInit';
import { CairoUint8 } from '../src/utils/cairoDataTypes/uint8';
import { CairoUint16 } from '../src/utils/cairoDataTypes/uint16';
import { CairoUint64 } from '../src/utils/cairoDataTypes/uint64';
import { CairoUint128 } from '../src/utils/cairoDataTypes/uint128';
import { CairoInt64 } from '../src/utils/cairoDataTypes/int64';

describe('Integer Types Manual Integration Tests', () => {
  let provider: ProviderInterface;
  let account: Account;
  let integerTypesContract: Contract;

  beforeAll(async () => {
    // Setup provider and account
    provider = await createTestProvider();
    account = await getTestAccount(provider);

    // Deploy IntegerTypesStorage contract using Contract.factory
    integerTypesContract = await Contract.factory({
      contract: contracts.IntegerTypes.sierra,
      casm: contracts.IntegerTypes.casm,
      account,
      constructorCalldata: [],
    });
  }, 60000);

  describe('Contract with disabled request and response parsers', () => {
    test('should demonstrate CairoUint8 usage with disabled parsers', () => {
      const testValue = 200;
      const cairoU8 = new CairoUint8(testValue);

      // When using parseRequest: false, you need to provide raw calldata
      const rawCalldata = cairoU8.toApiRequest();

      // Verify the raw calldata format
      expect(rawCalldata).toBeInstanceOf(Array);
      expect(rawCalldata.length).toBe(1);
      expect(typeof rawCalldata[0]).toBe('string');

      // When using parseResponse: false, you receive raw response data
      const rawResponse = rawCalldata; // Simulate contract returning the same data
      const iterator = rawResponse[Symbol.iterator]();
      const reconstructedValue = CairoUint8.factoryFromApiResponse(iterator);

      // Verify the reconstruction worked correctly
      expect(reconstructedValue.toBigInt()).toBe(BigInt(testValue));
    });

    test('should store and read CairoUint8 with disabled parsers', async () => {
      const testValue = 150;
      const cairoU8 = new CairoUint8(testValue);

      // Send CairoUint8 to contract with parseRequest disabled
      const storeResult = await integerTypesContract
        .withOptions({ parseRequest: false })
        .store_u8(cairoU8.toApiRequest());

      await provider.waitForTransaction(storeResult.transaction_hash);

      // Read CairoUint8 from contract with parseResponse disabled
      const readResult = await integerTypesContract.withOptions({ parseResponse: false }).read_u8();

      // Reconstruct CairoUint8 from raw response
      const iterator = readResult[Symbol.iterator]();
      const reconstructedValue = CairoUint8.factoryFromApiResponse(iterator);

      // Verify the value is correctly stored and retrieved
      expect(reconstructedValue.toBigInt()).toBe(BigInt(testValue));
    });

    test('should store and read CairoUint128 with disabled parsers', async () => {
      const testValue = BigInt('340282366920938463463374607431768211455'); // Max u128
      const cairoU128 = new CairoUint128(testValue);

      // Send CairoUint128 to contract with parseRequest disabled
      const storeResult = await integerTypesContract
        .withOptions({ parseRequest: false })
        .store_u128(cairoU128.toApiRequest());

      await provider.waitForTransaction(storeResult.transaction_hash);

      // Read CairoUint128 from contract with parseResponse disabled
      const readResult = await integerTypesContract
        .withOptions({ parseResponse: false })
        .read_u128();

      // Reconstruct CairoUint128 from raw response
      const iterator = readResult[Symbol.iterator]();
      const reconstructedValue = CairoUint128.factoryFromApiResponse(iterator);

      // Verify the value is correctly stored and retrieved
      expect(reconstructedValue.toBigInt()).toBe(testValue);
    });

    test('should store and read CairoInt64 with disabled parsers', async () => {
      const testValue = BigInt('9223372036854775807'); // Max i64 instead of min to avoid serialization issues
      const cairoI64 = new CairoInt64(testValue);

      // Send CairoInt64 to contract with parseRequest disabled
      const storeResult = await integerTypesContract
        .withOptions({ parseRequest: false })
        .store_i64(cairoI64.toApiRequest());

      await provider.waitForTransaction(storeResult.transaction_hash);

      // Read CairoInt64 from contract with parseResponse disabled
      const readResult = await integerTypesContract
        .withOptions({ parseResponse: false })
        .read_i64();

      // Reconstruct CairoInt64 from raw response
      const iterator = readResult[Symbol.iterator]();
      const reconstructedValue = CairoInt64.factoryFromApiResponse(iterator);

      // Verify the value is correctly stored and retrieved
      expect(reconstructedValue.toBigInt()).toBe(testValue);
    });

    test('should store all unsigned integer types in batch with disabled parsers', async () => {
      const u8Val = new CairoUint8(200);
      const u16Val = new CairoUint16(50000);
      const u64Val = new CairoUint64(BigInt('1234567890123'));
      const u128Val = new CairoUint128(BigInt('123456789012345678901234567890'));

      // Store all values with parseRequest disabled - pass individual values, not arrays
      const storeResult = await integerTypesContract
        .withOptions({ parseRequest: false })
        .store_all_unsigned(
          u8Val.toApiRequest()[0],
          u16Val.toApiRequest()[0],
          u64Val.toApiRequest()[0],
          u128Val.toApiRequest()[0]
        );

      await provider.waitForTransaction(storeResult.transaction_hash);

      // Read all values back with parseResponse disabled
      const readResult = await integerTypesContract
        .withOptions({ parseResponse: false })
        .read_all_unsigned();

      // Reconstruct values from raw response
      const iterator = readResult[Symbol.iterator]();
      const reconstructedU8 = CairoUint8.factoryFromApiResponse(iterator);
      const reconstructedU16 = CairoUint16.factoryFromApiResponse(iterator);
      const reconstructedU64 = CairoUint64.factoryFromApiResponse(iterator);
      const reconstructedU128 = CairoUint128.factoryFromApiResponse(iterator);

      // Verify all values are correctly stored and retrieved
      expect(reconstructedU8.toBigInt()).toBe(BigInt(200));
      expect(reconstructedU16.toBigInt()).toBe(BigInt(50000));
      expect(reconstructedU64.toBigInt()).toBe(BigInt('1234567890123'));
      expect(reconstructedU128.toBigInt()).toBe(BigInt('123456789012345678901234567890'));
    });
  });

  describe('Contract with enabled parsers (for comparison)', () => {
    test('should store and read with automatic parsing', async () => {
      const testValue = 100;

      // Store with automatic parsing
      const storeResult = await integerTypesContract.store_u8(testValue);
      await provider.waitForTransaction(storeResult.transaction_hash);

      // Read with automatic parsing
      const readResult = await integerTypesContract.read_u8();

      // The result should be automatically parsed to a BigInt
      expect(readResult).toBe(BigInt(testValue));
    });
  });
});

describe('Integer Types Contract Integration Tests', () => {
  let provider: ProviderInterface;
  let account: Account;
  let integerTypesContract: Contract;

  beforeAll(async () => {
    // Setup provider and account
    provider = await createTestProvider();
    account = await getTestAccount(provider);

    // Deploy IntegerTypesStorage contract using Contract.factory with hdParsingStrategy
    integerTypesContract = await Contract.factory({
      contract: contracts.IntegerTypes.sierra,
      casm: contracts.IntegerTypes.casm,
      account,
      constructorCalldata: [],
      parsingStrategy: hdParsingStrategy,
    });
  }, 60000);

  test('should store and read CairoUint8 values', async () => {
    const testValue = 255; // Max u8

    const txReceipt = await integerTypesContract
      .withOptions({ waitForTransaction: true })
      .store_u8(testValue);

    // Verify the value is stored correctly
    const readResult = await integerTypesContract.read_u8();
    expect(readResult).toBe(BigInt(testValue));

    // Parse events from transaction receipt
    const events = integerTypesContract.parseEvents(txReceipt);

    // Verify U8Stored event was emitted with correct value
    const u8Stored = events.getByPath?.('U8Stored');
    if (!u8Stored) throw new Error('U8Stored event not found');

    expect(u8Stored.value).toBe(BigInt(testValue));
  });

  test('should store and read CairoUint16 values', async () => {
    const testValue = 65535; // Max u16

    await integerTypesContract.withOptions({ waitForTransaction: true }).store_u16(testValue);

    const readResult = await integerTypesContract.read_u16();
    expect(readResult).toBe(BigInt(testValue));
  });

  test('should store and read CairoUint64 values', async () => {
    const testValue = BigInt('18446744073709551615'); // Max u64

    await integerTypesContract.withOptions({ waitForTransaction: true }).store_u64(testValue);

    const readResult = await integerTypesContract.read_u64();
    expect(readResult).toBe(testValue);
  });

  test('should store and read CairoUint128 values', async () => {
    const testValue = BigInt('340282366920938463463374607431768211455'); // Max u128

    await integerTypesContract.withOptions({ waitForTransaction: true }).store_u128(testValue);

    const readResult = await integerTypesContract.read_u128();
    expect(readResult).toBe(testValue);
  });

  test('should store and read CairoInt8 values', async () => {
    const testValue = -128n; // Min i8

    const txReceipt = await integerTypesContract
      .withOptions({ waitForTransaction: true })
      .store_i8(testValue);

    // Verify the value is stored correctly
    const readResult = await integerTypesContract.read_i8();
    expect(readResult).toBe(BigInt(testValue));

    // Parse events from transaction receipt
    const events = integerTypesContract.parseEvents(txReceipt);

    // Verify I8Stored event was emitted with correct value
    const i8Stored = events.getByPath?.('I8Stored');
    if (!i8Stored) throw new Error('I8Stored event not found');

    expect(i8Stored.value).toBe(BigInt(testValue));
  });

  test('should store and read CairoInt16 values', async () => {
    const testValue = 32767; // Max i16

    await integerTypesContract.withOptions({ waitForTransaction: true }).store_i16(testValue);

    const readResult = await integerTypesContract.read_i16();
    expect(readResult).toBe(BigInt(testValue));
  });

  test('should store and read CairoInt32 values', async () => {
    const testValue = -2147483648; // Min i32

    await integerTypesContract.withOptions({ waitForTransaction: true }).store_i32(testValue);

    const readResult = await integerTypesContract.read_i32();
    expect(readResult).toBe(BigInt(testValue));
  });

  test('should store and read CairoInt64 values', async () => {
    const testValue = BigInt('9223372036854775807'); // Max i64

    await integerTypesContract.withOptions({ waitForTransaction: true }).store_i64(testValue);

    const readResult = await integerTypesContract.read_i64();
    expect(readResult).toBe(testValue);
  });

  test('should store and read CairoInt128 values', async () => {
    const testValue = BigInt('-170141183460469231731687303715884105728'); // Min i128

    await integerTypesContract.withOptions({ waitForTransaction: true }).store_i128(testValue);

    const readResult = await integerTypesContract.read_i128();
    expect(readResult).toBe(testValue);
  });

  test('should store and read all unsigned types at once', async () => {
    const u8Val = 200;
    const u16Val = 50000;
    const u64Val = BigInt('1234567890123');
    const u128Val = BigInt('123456789012345678901234567890');

    await integerTypesContract
      .withOptions({ waitForTransaction: true })
      .store_all_unsigned(u8Val, u16Val, u64Val, u128Val);

    const readResult = await integerTypesContract.read_all_unsigned();
    // Contract returns a tuple, which is converted to an object with numeric keys
    expect(readResult).toEqual({
      0: BigInt(200),
      1: BigInt(50000),
      2: BigInt('1234567890123'),
      3: BigInt('123456789012345678901234567890'),
    });
  });

  test('should store and read all signed types at once', async () => {
    const i8Val = -100;
    const i16Val = -25000;
    const i32Val = -1000000000;
    const i64Val = BigInt('-1234567890123');
    const i128Val = BigInt('-123456789012345678901234567890');

    await integerTypesContract
      .withOptions({ waitForTransaction: true })
      .store_all_signed(i8Val, i16Val, i32Val, i64Val, i128Val);

    const readResult = await integerTypesContract.read_all_signed();
    // Contract returns a tuple, which is converted to an object with numeric keys
    expect(readResult).toEqual({
      0: BigInt(-100),
      1: BigInt(-25000),
      2: BigInt(-1000000000),
      3: BigInt('-1234567890123'),
      4: BigInt('-123456789012345678901234567890'),
    });
  });

  test('should return correct boundary values for unsigned types', async () => {
    const result = await integerTypesContract.test_boundary_values_unsigned();
    // Contract returns a tuple, which is converted to an object with numeric keys
    expect(result).toEqual({
      0: BigInt(255), // Max u8
      1: BigInt(65535), // Max u16
      2: BigInt('18446744073709551615'), // Max u64
      3: BigInt('340282366920938463463374607431768211455'), // Max u128
    });
  });

  test('should return correct boundary values for signed types', async () => {
    const result = await integerTypesContract.test_boundary_values_signed();
    // Contract returns a tuple, which is converted to an object with numeric keys
    expect(result).toEqual({
      0: BigInt(127), // Max i8
      1: BigInt(32767), // Max i16
      2: BigInt(2147483647), // Max i32
      3: BigInt('9223372036854775807'), // Max i64
      4: BigInt('170141183460469231731687303715884105727'), // Max i128
    });
  });

  test('should return correct negative boundary values for signed types', async () => {
    const result = await integerTypesContract.test_negative_boundary_values_signed();
    // Contract returns a tuple, which is converted to an object with numeric keys
    expect(result).toEqual({
      0: BigInt(-128), // Min i8
      1: BigInt(-32768), // Min i16
      2: BigInt(-2147483648), // Min i32
      3: BigInt('-9223372036854775808'), // Min i64
      4: BigInt('-170141183460469231731687303715884105728'), // Min i128
    });
  });
});
