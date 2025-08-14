import * as fs from 'fs';
import * as path from 'path';
import {
  Account,
  Contract,
  ProviderInterface,
  CairoByteArray,
  hdParsingStrategy,
  ParsingStrategy,
  BigNumberish,
  logger,
} from '../src';
import { contracts } from './config/fixtures';
import { createTestProvider, getTestAccount } from './config/fixturesInit';
import { toHex } from '../src/utils/num';
import { CairoType } from '../src/utils/cairoDataTypes/cairoType.interface';

describe('CairoByteArray Manual Integration Tests', () => {
  let provider: ProviderInterface;
  let account: Account;
  let byteArrayContract: Contract;

  beforeAll(async () => {
    // Setup provider and account
    provider = await createTestProvider();
    account = await getTestAccount(provider);

    // Deploy ByteArrayStorage contract using Contract.factory
    byteArrayContract = await Contract.factory({
      contract: contracts.CairoByteArray.sierra,
      casm: contracts.CairoByteArray.casm,
      account,
      constructorCalldata: [],
    });
  }, 60000);

  describe('Contract with disabled request and response parsers', () => {
    test('should demonstrate CairoByteArray usage with disabled parsers', () => {
      // This test demonstrates how to use CairoByteArray when contract parsers are disabled
      const testMessage = 'Hello, Starknet!';
      const byteArray = new CairoByteArray(testMessage);

      // When using parseRequest: false, you need to provide raw calldata
      const rawCalldata = byteArray.toApiRequest();

      // Verify the raw calldata format
      expect(rawCalldata).toBeInstanceOf(Array);
      expect(rawCalldata.length).toBeGreaterThanOrEqual(3);
      expect(typeof rawCalldata[0]).toBe('string'); // data length
      expect(typeof rawCalldata[1]).toBe('string'); // pending_word
      expect(typeof rawCalldata[2]).toBe('string'); // pending_word_len

      // When using parseResponse: false, you receive raw response data
      // that needs to be parsed back to CairoByteArray
      const rawResponse = rawCalldata; // Simulate contract returning the same data
      const iterator = rawResponse[Symbol.iterator]();
      const reconstructedByteArray = CairoByteArray.factoryFromApiResponse(iterator);

      // Verify the reconstruction worked correctly
      expect(reconstructedByteArray.decodeUtf8()).toBe(testMessage);
      expect(reconstructedByteArray.toBigInt()).toBe(byteArray.toBigInt());
      expect(reconstructedByteArray.toHexString()).toBe(byteArray.toHexString());
    });

    test('should store and read short CairoByteArray', async () => {
      const testMessage = 'Hello, Starknet!';
      const byteArray = new CairoByteArray(testMessage);

      console.log(byteArray instanceof CairoByteArray);
      console.log(byteArray instanceof CairoType);
      console.log(byteArray instanceof Object);

      // Send CairoByteArray to contract with parseRequest disabled
      const storeResult = await byteArrayContract
        .withOptions({ parseRequest: false })
        .store_message(byteArray.toApiRequest());

      await provider.waitForTransaction(storeResult.transaction_hash);

      // Read CairoByteArray from contract with parseResponse disabled
      const readResult = await byteArrayContract
        .withOptions({ parseResponse: false })
        .read_message();

      // Reconstruct CairoByteArray from raw response
      const iterator = readResult[Symbol.iterator]();
      const reconstructedByteArray = CairoByteArray.factoryFromApiResponse(iterator);

      // Verify the message is correctly stored and retrieved
      expect(reconstructedByteArray.decodeUtf8()).toBe(testMessage);
    });

    test('should store and read long CairoByteArray (> 31 bytes)', async () => {
      const testMessage =
        'This is a very long message that exceeds 31 bytes and will be split into multiple chunks!';
      const byteArray = new CairoByteArray(testMessage);

      // Send CairoByteArray to contract with parseRequest disabled
      const storeResult = await byteArrayContract
        .withOptions({ parseRequest: false })
        .store_message(byteArray.toApiRequest());

      await provider.waitForTransaction(storeResult.transaction_hash);

      // Read CairoByteArray from contract with parseResponse disabled
      const readResult = await byteArrayContract
        .withOptions({ parseResponse: false })
        .read_message();

      // Reconstruct CairoByteArray from raw response
      const iterator = readResult[Symbol.iterator]();
      const reconstructedByteArray = CairoByteArray.factoryFromApiResponse(iterator);

      // Verify the message is correctly stored and retrieved
      expect(reconstructedByteArray.decodeUtf8()).toBe(testMessage);
    });

    test('should store and read empty CairoByteArray', async () => {
      const testMessage = '';
      const byteArray = new CairoByteArray(testMessage);

      // Send CairoByteArray to contract with parseRequest disabled
      const storeResult = await byteArrayContract
        .withOptions({ parseRequest: false })
        .store_message(byteArray.toApiRequest());

      await provider.waitForTransaction(storeResult.transaction_hash);

      // Read CairoByteArray from contract with parseResponse disabled
      const readResult = await byteArrayContract
        .withOptions({ parseResponse: false })
        .read_message();

      // Reconstruct CairoByteArray from raw response
      const iterator = readResult[Symbol.iterator]();
      const reconstructedByteArray = CairoByteArray.factoryFromApiResponse(iterator);

      // Verify the message is correctly stored and retrieved
      expect(reconstructedByteArray.decodeUtf8()).toBe(testMessage);
    });

    test('should store and read CairoByteArray with exactly 31 bytes', async () => {
      const testMessage = 'This is exactly 31 bytes long!!'; // 31 characters
      const byteArray = new CairoByteArray(testMessage);

      // Send CairoByteArray to contract with parseRequest disabled
      const storeResult = await byteArrayContract
        .withOptions({ parseRequest: false })
        .store_message(byteArray.toApiRequest());

      await provider.waitForTransaction(storeResult.transaction_hash);

      // Read CairoByteArray from contract with parseResponse disabled
      const readResult = await byteArrayContract
        .withOptions({ parseResponse: false })
        .read_message();

      // Reconstruct CairoByteArray from raw response
      const iterator = readResult[Symbol.iterator]();
      const reconstructedByteArray = CairoByteArray.factoryFromApiResponse(iterator);

      // Verify the message is correctly stored and retrieved
      expect(reconstructedByteArray.decodeUtf8()).toBe(testMessage);
    });

    test('should store and read CairoByteArray with special characters', async () => {
      const testMessage = 'Special chars: !@#$%^&*()_+-=[]{}|;:\'",.<>/?`~';
      const byteArray = new CairoByteArray(testMessage);

      // Send CairoByteArray to contract with parseRequest disabled
      const storeResult = await byteArrayContract
        .withOptions({ parseRequest: false })
        .store_message(byteArray.toApiRequest());

      await provider.waitForTransaction(storeResult.transaction_hash);

      // Read CairoByteArray from contract with parseResponse disabled
      const readResult = await byteArrayContract
        .withOptions({ parseResponse: false })
        .read_message();

      // Reconstruct CairoByteArray from raw response
      const iterator = readResult[Symbol.iterator]();
      const reconstructedByteArray = CairoByteArray.factoryFromApiResponse(iterator);

      // Verify the message is correctly stored and retrieved
      expect(reconstructedByteArray.decodeUtf8()).toBe(testMessage);
    });

    test('should store and read CairoByteArray with unicode characters', async () => {
      const testMessage = 'Unicode test: émojis 🚀 and 中文字符';
      const byteArray = new CairoByteArray(testMessage);

      // Send CairoByteArray to contract with parseRequest disabled
      const storeResult = await byteArrayContract
        .withOptions({ parseRequest: false })
        .store_message(byteArray.toApiRequest());

      await provider.waitForTransaction(storeResult.transaction_hash);

      // Read CairoByteArray from contract with parseResponse disabled
      const readResult = await byteArrayContract
        .withOptions({ parseResponse: false })
        .read_message();

      // Reconstruct CairoByteArray from raw response
      const iterator = readResult[Symbol.iterator]();
      const reconstructedByteArray = CairoByteArray.factoryFromApiResponse(iterator);

      // Verify the message is correctly stored and retrieved
      expect(reconstructedByteArray.decodeUtf8()).toBe(testMessage);
    });

    test('should handle CairoByteArray created from Uint8Array', async () => {
      const testData = new Uint8Array([72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100]); // "Hello World"
      const byteArray = new CairoByteArray(testData);

      // Send CairoByteArray to contract with parseRequest disabled
      const storeResult = await byteArrayContract
        .withOptions({ parseRequest: false })
        .store_message(byteArray.toApiRequest());

      await provider.waitForTransaction(storeResult.transaction_hash);

      // Read CairoByteArray from contract with parseResponse disabled
      const readResult = await byteArrayContract
        .withOptions({ parseResponse: false })
        .read_message();

      // Reconstruct CairoByteArray from raw response
      const iterator = readResult[Symbol.iterator]();
      const reconstructedByteArray = CairoByteArray.factoryFromApiResponse(iterator);

      // Verify the message is correctly stored and retrieved
      expect(reconstructedByteArray.decodeUtf8()).toBe('Hello World');
      expect(reconstructedByteArray.toBigInt()).toBe(byteArray.toBigInt());
    });

    test('should handle CairoByteArray created from BigInt', async () => {
      const testBigInt = 0x48656c6c6f20576f726c64n; // "Hello World" as bigint
      const byteArray = new CairoByteArray(testBigInt);

      // Send CairoByteArray to contract with parseRequest disabled
      const storeResult = await byteArrayContract
        .withOptions({ parseRequest: false })
        .store_message(byteArray.toApiRequest());

      await provider.waitForTransaction(storeResult.transaction_hash);

      // Read CairoByteArray from contract with parseResponse disabled
      const readResult = await byteArrayContract
        .withOptions({ parseResponse: false })
        .read_message();

      // Reconstruct CairoByteArray from raw response
      const iterator = readResult[Symbol.iterator]();
      const reconstructedByteArray = CairoByteArray.factoryFromApiResponse(iterator);

      // Verify the message is correctly stored and retrieved
      expect(reconstructedByteArray.toBigInt()).toBe(testBigInt);
      expect(reconstructedByteArray.toHexString()).toBe('0x48656c6c6f20576f726c64');
    });

    test('should handle CairoByteArray created from Buffer', async () => {
      const testBuffer = Buffer.from('Hello Buffer World!', 'utf8');
      const byteArray = new CairoByteArray(testBuffer);

      // Send CairoByteArray to contract with parseRequest disabled
      const storeResult = await byteArrayContract
        .withOptions({ parseRequest: false })
        .store_message(byteArray.toApiRequest());

      await provider.waitForTransaction(storeResult.transaction_hash);

      // Read CairoByteArray from contract with parseResponse disabled
      const readResult = await byteArrayContract
        .withOptions({ parseResponse: false })
        .read_message();

      // Reconstruct CairoByteArray from raw response
      const iterator = readResult[Symbol.iterator]();
      const reconstructedByteArray = CairoByteArray.factoryFromApiResponse(iterator);

      // Verify the message is correctly stored and retrieved
      expect(reconstructedByteArray.decodeUtf8()).toBe('Hello Buffer World!');
      expect(reconstructedByteArray.toBigInt()).toBe(byteArray.toBigInt());
      expect(reconstructedByteArray.toHexString()).toBe(byteArray.toHexString());
    });

    test('should handle CairoByteArray created from hex number', async () => {
      const testNumber = 0x48656c6c6f; // "Hello" as hex number
      const byteArray = new CairoByteArray(testNumber);

      // Send CairoByteArray to contract with parseRequest disabled
      const storeResult = await byteArrayContract
        .withOptions({ parseRequest: false })
        .store_message(byteArray.toApiRequest());

      await provider.waitForTransaction(storeResult.transaction_hash);

      // Read CairoByteArray from contract with parseResponse disabled
      const readResult = await byteArrayContract
        .withOptions({ parseResponse: false })
        .read_message();

      // Reconstruct CairoByteArray from raw response
      const iterator = readResult[Symbol.iterator]();
      const reconstructedByteArray = CairoByteArray.factoryFromApiResponse(iterator);

      // Verify the message is correctly stored and retrieved
      expect(reconstructedByteArray.decodeUtf8()).toBe('Hello');
      expect(reconstructedByteArray.toBigInt()).toBe(BigInt(testNumber));
      expect(reconstructedByteArray.toHexString()).toBe('0x48656c6c6f');
    });

    test('should handle CairoByteArray created from decimal number', async () => {
      const testNumber = 1415934836; // "Test" as decimal number (0x54657374)
      const byteArray = new CairoByteArray(testNumber);

      // Send CairoByteArray to contract with parseRequest disabled
      const storeResult = await byteArrayContract
        .withOptions({ parseRequest: false })
        .store_message(byteArray.toApiRequest());

      await provider.waitForTransaction(storeResult.transaction_hash);

      // Read CairoByteArray from contract with parseResponse disabled
      const readResult = await byteArrayContract
        .withOptions({ parseResponse: false })
        .read_message();

      // Reconstruct CairoByteArray from raw response
      const iterator = readResult[Symbol.iterator]();
      const reconstructedByteArray = CairoByteArray.factoryFromApiResponse(iterator);

      // Verify the message is correctly stored and retrieved
      expect(reconstructedByteArray.decodeUtf8()).toBe('Test');
      expect(reconstructedByteArray.toBigInt()).toBe(BigInt(testNumber));
      expect(reconstructedByteArray.toHexString()).toBe('0x54657374');
    });

    test('should preserve data integrity across multiple store/read cycles', async () => {
      const testMessages = [
        'First message',
        'Second message with numbers 12345',
        'Third message with symbols !@#$%',
        '',
        'Final message after empty',
      ];

      // Process messages sequentially - each overwrites the previous
      // eslint-disable-next-line no-restricted-syntax
      for (const message of testMessages) {
        const byteArray = new CairoByteArray(message);

        // Store message
        // eslint-disable-next-line no-await-in-loop
        const storeResult = await byteArrayContract
          .withOptions({ parseRequest: false })
          .store_message(byteArray.toApiRequest());

        // eslint-disable-next-line no-await-in-loop
        await provider.waitForTransaction(storeResult.transaction_hash);

        // Read message
        // eslint-disable-next-line no-await-in-loop
        const readResult = await byteArrayContract
          .withOptions({ parseResponse: false })
          .read_message();

        // Reconstruct and verify
        const iterator = readResult[Symbol.iterator]();
        const reconstructedByteArray = CairoByteArray.factoryFromApiResponse(iterator);

        expect(reconstructedByteArray.decodeUtf8()).toBe(message);
      }
    });

    test('should correctly serialize and deserialize complex byte patterns', async () => {
      // Test with a message that includes various byte patterns
      const complexBytes = new Uint8Array([
        0x00,
        0x01,
        0x02,
        0x03, // Low bytes
        0x41,
        0x42,
        0x43,
        0x44, // ASCII letters
        0x7e,
        0x7f,
        0x80,
        0x81, // Boundary bytes
        0xfe,
        0xff, // High bytes
      ]);
      const byteArray = new CairoByteArray(complexBytes);

      // Send CairoByteArray to contract with parseRequest disabled
      const storeResult = await byteArrayContract
        .withOptions({ parseRequest: false })
        .store_message(byteArray.toApiRequest());

      await provider.waitForTransaction(storeResult.transaction_hash);

      // Read CairoByteArray from contract with parseResponse disabled
      const readResult = await byteArrayContract
        .withOptions({ parseResponse: false })
        .read_message();

      // Reconstruct CairoByteArray from raw response
      const iterator = readResult[Symbol.iterator]();
      const reconstructedByteArray = CairoByteArray.factoryFromApiResponse(iterator);

      // Verify the bigint representation matches
      expect(reconstructedByteArray.toBigInt()).toBe(byteArray.toBigInt());
      expect(reconstructedByteArray.toHexString()).toBe(byteArray.toHexString());
    });
  });

  describe('Contract with enabled parsers (for comparison)', () => {
    test('should store and read with automatic parsing', async () => {
      const testMessage = 'Auto-parsed message';

      // Store with automatic parsing
      const storeResult = await byteArrayContract.store_message(testMessage);
      await provider.waitForTransaction(storeResult.transaction_hash);

      // Read with automatic parsing
      const readResult = await byteArrayContract.read_message();

      // The result should be automatically parsed to a string
      expect(readResult).toBe(testMessage);
    });
  });
});

describe('CairoByteArray Contract Integration Tests', () => {
  let provider: ProviderInterface;
  let account: Account;
  let byteArrayContract: Contract;

  beforeAll(async () => {
    // Setup provider and account
    provider = await createTestProvider();
    account = await getTestAccount(provider);

    // Deploy ByteArrayStorage contract using Contract.factory
    byteArrayContract = await Contract.factory({
      contract: contracts.CairoByteArray.sierra,
      casm: contracts.CairoByteArray.casm,
      account,
      constructorCalldata: [],
      parsingStrategy: hdParsingStrategy,
    });
  }, 60000);

  test('should store and read short CairoByteArray', async () => {
    const testMessage = 'Hello, Starknet!';

    // Send CairoByteArray to contract with parseRequest disabled
    await byteArrayContract.withOptions({ waitForTransaction: true }).store_message(testMessage);

    // Read CairoByteArray from contract with parseResponse disabled
    const readResult = await byteArrayContract.read_message();

    // Verify the message is correctly stored and retrieved
    expect(readResult).toBe(testMessage);
  });

  test('should store and read long CairoByteArray (> 31 bytes)', async () => {
    const testMessage = 'Unicode test: émojis 🚀 and 中文字符 {}[]. 🇦🇺🇦🇺🇦🇺';

    // Send CairoByteArray to contract with parseRequest disabled
    await byteArrayContract.withOptions({ waitForTransaction: true }).store_message(testMessage);

    // Read CairoByteArray from contract with parseResponse disabled
    const readResult = await byteArrayContract.read_message();

    // Verify the message is correctly stored and retrieved
    expect(readResult).toBe(testMessage);
  });

  test('should store and read Buffer file, custom response parsing strategy', async () => {
    // Create custom parsing strategy that extends hdParsingStrategy
    const customParsingStrategy: ParsingStrategy = {
      request: hdParsingStrategy.request,
      response: {
        ...hdParsingStrategy.response,
        [CairoByteArray.abiSelector]: (responseIterator: Iterator<string>) => {
          return CairoByteArray.factoryFromApiResponse(responseIterator).toBuffer();
        },
      },
    };

    const customByteArrayContract = new Contract({
      abi: contracts.CairoByteArray.sierra.abi,
      address: byteArrayContract.address,
      providerOrAccount: account,
      parsingStrategy: customParsingStrategy,
    });

    // (under 300 byte limit) for tx Emitted Event (https://github.com/starkware-libs/cairo-lang/blob/66355d7d99f1962ff9ccba8d0dbacbce3bd79bf8/src/starkware/starknet/definitions/versioned_constants.json#L491C10-L491C25)
    const mockFilePath = path.resolve(__dirname, '../__mocks__/cairo/byteArray/src/lib.cairo');
    const originalBuffer = fs.readFileSync(mockFilePath);

    // Pass Buffer directly to store_message
    await customByteArrayContract
      .withOptions({ waitForTransaction: true })
      .store_message(originalBuffer);

    // Read it back
    const retrievedData = await customByteArrayContract.read_message();

    // Verify the round-trip worked correctly
    expect(retrievedData).toEqual(originalBuffer);
  });

  xtest('should store and read large Buffer file without event, custom response parsing strategy', async () => {
    // Create custom parsing strategy that extends hdParsingStrategy
    const customParsingStrategy: ParsingStrategy = {
      request: hdParsingStrategy.request,
      response: {
        ...hdParsingStrategy.response,
        [CairoByteArray.abiSelector]: (responseIterator: Iterator<string>) => {
          return CairoByteArray.factoryFromApiResponse(responseIterator).toBuffer();
        },
      },
    };

    // increase tip to avoid transaction evicted from mempool
    account.defaultTipType = 'p95Tip';

    // info logger to see failed tx life status
    logger.setLogLevel('INFO');

    const customByteArrayContract = new Contract({
      abi: contracts.CairoByteArray.sierra.abi,
      address: byteArrayContract.address,
      providerOrAccount: account,
      parsingStrategy: customParsingStrategy,
    });

    // "execution error" :"Transaction size exceeds the maximum block capacity"
    const mockFilePath = path.resolve(
      __dirname,
      '../__mocks__/cairo/byteArray/target/dev/test_ByteArrayStorage.sierra.json'
    );
    const originalBuffer = fs.readFileSync(mockFilePath);

    // Pass Buffer directly to store_message
    await customByteArrayContract
      .withOptions({ waitForTransaction: true })
      .store_message_noevent(originalBuffer);

    // Read it back
    const retrievedData = await customByteArrayContract.read_message();

    // Verify the round-trip worked correctly
    expect(retrievedData).toEqual(originalBuffer);
  });

  test('should receive and parse MessageStored event with ByteArray message', async () => {
    const testMessage = '🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀';

    // Send CairoByteArray to contract with parseRequest disabled
    const txReceipt = await byteArrayContract
      .withOptions({ waitForTransaction: true })
      .store_message(testMessage);

    // Parse events from transaction receipt
    const events = byteArrayContract.parseEvents(txReceipt);

    // Use the new getByPath helper method (most convenient)
    const messageStored = events.getByPath?.('MessageStored');
    if (!messageStored) throw new Error('MessageStored event not found');

    // Verify all event return proper data
    expect(toHex(messageStored.caller as BigNumberish)).toEqual(account.address);
    expect(messageStored).toBeDefined();
    expect(messageStored.message).toEqual(testMessage);
  });
});
