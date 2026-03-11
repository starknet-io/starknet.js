import { RpcProvider, constants } from '../src';
import { RPCSPEC09, RPCSPEC0101 } from '../src/types/api';

describe('Provider Type Narrowing', () => {
  let provider: RpcProvider;

  beforeAll(async () => {
    // Create a mock provider instance to test type narrowing without actual API calls
    provider = new RpcProvider({ nodeUrl: 'http://localhost:5050', specVersion: '0.10.0' });
  });

  describe('getEvents', () => {
    test('should narrow to RPCSPEC0101.EVENTS_CHUNK when using v0.10.0', async () => {
      // Mock the getEvents method to avoid actual API calls
      const mockEventsChunk: RPCSPEC0101.EVENTS_CHUNK = {
        events: [],
        continuation_token: undefined,
      };
      jest.spyOn(provider, 'getEvents').mockResolvedValueOnce(mockEventsChunk);

      const filter: RPCSPEC0101.EventFilter = {
        from_block: { block_number: 0 },
        to_block: { block_number: 10 },
        chunk_size: 10,
      };

      const result = await provider.getEvents<typeof constants.SupportedRpcVersion.v0_10_0>(filter);

      // Type assertion to verify the type is correctly narrowed to RPCSPEC0101.EVENTS_CHUNK
      const typeCheck: RPCSPEC0101.EVENTS_CHUNK = result;
      expect(typeCheck).toBeDefined();
      expect('events' in result).toBe(true);
    });

    test('should narrow to RPCSPEC09.EVENTS_CHUNK when using v0.9.0', async () => {
      // Mock the getEvents method to avoid actual API calls
      const mockEventsChunk: RPCSPEC09.EVENTS_CHUNK = {
        events: [],
        continuation_token: undefined,
      };
      jest.spyOn(provider, 'getEvents').mockResolvedValueOnce(mockEventsChunk);

      const filter: RPCSPEC09.EventFilter = {
        from_block: { block_number: 0 },
        to_block: { block_number: 10 },
        chunk_size: 10,
      };

      const result = await provider.getEvents<typeof constants.SupportedRpcVersion.v0_9_0>(filter);

      // Type assertion to verify the type is correctly narrowed to RPCSPEC09.EVENTS_CHUNK
      const typeCheck: RPCSPEC09.EVENTS_CHUNK = result;
      expect(typeCheck).toBeDefined();
      expect('events' in result).toBe(true);
    });

    test('should return union type when no version specified', async () => {
      // Mock the getEvents method to avoid actual API calls
      const mockEventsChunk: RPCSPEC0101.EVENTS_CHUNK | RPCSPEC09.EVENTS_CHUNK = {
        events: [],
        continuation_token: undefined,
      };
      jest.spyOn(provider, 'getEvents').mockResolvedValueOnce(mockEventsChunk);

      const filter: RPCSPEC0101.EventFilter | RPCSPEC09.EventFilter = {
        from_block: { block_number: 0 },
        to_block: { block_number: 10 },
        chunk_size: 10,
      };

      const result = await provider.getEvents(filter);

      // Type is union: RPCSPEC0101.EVENTS_CHUNK | RPCSPEC09.EVENTS_CHUNK
      const typeCheck: RPCSPEC0101.EVENTS_CHUNK | RPCSPEC09.EVENTS_CHUNK = result;
      expect(typeCheck).toBeDefined();
      expect('events' in result).toBe(true);
    });
  });

  describe('getTransactionTrace', () => {
    test('should narrow to RPCSPEC0101.TRANSACTION_TRACE when using v0.10.0', async () => {
      // This test verifies type narrowing at compile time
      type ResultType = Awaited<
        ReturnType<
          typeof provider.getTransactionTrace<typeof constants.SupportedRpcVersion.v0_10_0>
        >
      >;
      type ExpectedType = RPCSPEC0101.TRANSACTION_TRACE;

      // Type-level assertion
      const typeCheck: ResultType extends ExpectedType ? true : false = true;
      expect(typeCheck).toBe(true);
    });

    test('should narrow to RPCSPEC09.TRANSACTION_TRACE when using v0.9.0', async () => {
      // This test verifies type narrowing at compile time
      type ResultType = Awaited<
        ReturnType<typeof provider.getTransactionTrace<typeof constants.SupportedRpcVersion.v0_9_0>>
      >;
      type ExpectedType = RPCSPEC09.TRANSACTION_TRACE;

      // Type-level assertion
      const typeCheck: ResultType extends ExpectedType ? true : false = true;
      expect(typeCheck).toBe(true);
    });

    test('should return union type when no version specified', async () => {
      type ResultType = Awaited<ReturnType<typeof provider.getTransactionTrace>>;
      type ExpectedType = RPCSPEC0101.TRANSACTION_TRACE | RPCSPEC09.TRANSACTION_TRACE;

      // Type-level assertion - union type should be assignable to both directions
      const typeCheck: ResultType extends ExpectedType ? true : false = true;
      expect(typeCheck).toBe(true);
    });
  });

  describe('estimateMessageFee', () => {
    test('should narrow to RPCSPEC0101.FEE_ESTIMATE when using v0.10.0', async () => {
      type ResultType = Awaited<
        ReturnType<typeof provider.estimateMessageFee<typeof constants.SupportedRpcVersion.v0_10_0>>
      >;
      type ExpectedType = RPCSPEC0101.FEE_ESTIMATE;

      const typeCheck: ResultType extends ExpectedType ? true : false = true;
      expect(typeCheck).toBe(true);
    });

    test('should narrow to RPCSPEC09.MESSAGE_FEE_ESTIMATE when using v0.9.0', async () => {
      type ResultType = Awaited<
        ReturnType<typeof provider.estimateMessageFee<typeof constants.SupportedRpcVersion.v0_9_0>>
      >;
      type ExpectedType = RPCSPEC09.MESSAGE_FEE_ESTIMATE;

      const typeCheck: ResultType extends ExpectedType ? true : false = true;
      expect(typeCheck).toBe(true);
    });

    test('should return union type when no version specified', async () => {
      type ResultType = Awaited<ReturnType<typeof provider.estimateMessageFee>>;
      type ExpectedType = RPCSPEC0101.FEE_ESTIMATE | RPCSPEC09.MESSAGE_FEE_ESTIMATE;

      const typeCheck: ResultType extends ExpectedType ? true : false = true;
      expect(typeCheck).toBe(true);
    });
  });

  describe('getL1MessagesStatus', () => {
    test('should narrow to RPCSPEC0101.L1L2MessagesStatus when using v0.10.0', async () => {
      type ResultType = Awaited<
        ReturnType<
          typeof provider.getL1MessagesStatus<typeof constants.SupportedRpcVersion.v0_10_0>
        >
      >;
      type ExpectedType = RPCSPEC0101.L1L2MessagesStatus;

      const typeCheck: ResultType extends ExpectedType ? true : false = true;
      expect(typeCheck).toBe(true);
    });

    test('should narrow to RPCSPEC09.L1L2MessagesStatus when using v0.9.0', async () => {
      type ResultType = Awaited<
        ReturnType<typeof provider.getL1MessagesStatus<typeof constants.SupportedRpcVersion.v0_9_0>>
      >;
      type ExpectedType = RPCSPEC09.L1L2MessagesStatus;

      const typeCheck: ResultType extends ExpectedType ? true : false = true;
      expect(typeCheck).toBe(true);
    });

    test('should return union type when no version specified', async () => {
      type ResultType = Awaited<ReturnType<typeof provider.getL1MessagesStatus>>;
      type ExpectedType = RPCSPEC0101.L1L2MessagesStatus | RPCSPEC09.L1L2MessagesStatus;

      const typeCheck: ResultType extends ExpectedType ? true : false = true;
      expect(typeCheck).toBe(true);
    });
  });

  describe('Literal string type narrowing', () => {
    test('should work with literal "0.10.0" for getEvents', async () => {
      // Mock the getEvents method to avoid actual API calls
      const mockEventsChunk: RPCSPEC0101.EVENTS_CHUNK = {
        events: [],
        continuation_token: undefined,
      };
      jest.spyOn(provider, 'getEvents').mockResolvedValueOnce(mockEventsChunk);

      const filter: RPCSPEC0101.EventFilter = {
        from_block: { block_number: 0 },
        to_block: { block_number: 10 },
        chunk_size: 10,
      };

      const result = await provider.getEvents<'0.10.0'>(filter);

      const typeCheck: RPCSPEC0101.EVENTS_CHUNK = result;
      expect(typeCheck).toBeDefined();
    });

    test('should work with literal "0.9.0" for getEvents', async () => {
      // Mock the getEvents method to avoid actual API calls
      const mockEventsChunk: RPCSPEC09.EVENTS_CHUNK = {
        events: [],
        continuation_token: undefined,
      };
      jest.spyOn(provider, 'getEvents').mockResolvedValueOnce(mockEventsChunk);

      const filter: RPCSPEC09.EventFilter = {
        from_block: { block_number: 0 },
        to_block: { block_number: 10 },
        chunk_size: 10,
      };

      const result = await provider.getEvents<'0.9.0'>(filter);

      const typeCheck: RPCSPEC09.EVENTS_CHUNK = result;
      expect(typeCheck).toBeDefined();
    });
  });

  afterEach(() => {
    // Restore all mocks after each test
    jest.restoreAllMocks();
  });
});
