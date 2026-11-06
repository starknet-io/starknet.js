import { RpcChannel as RpcChannel09 } from '../src/channel/rpc_0_9_0';
import { RpcChannel as RpcChannel0102 } from '../src/channel/rpc_0_10_2';
import { RpcChannel as RpcChannel0104 } from '../src/channel/rpc_0_10_4';
import { SYSTEM_MESSAGES } from '../src/global/constants';
import { RpcError } from '../src/utils/errors';

const pending = { finality_status: 'PRE_CONFIRMED', execution_status: 'SUCCEEDED' } as const;
const accepted = { finality_status: 'ACCEPTED_ON_L2', execution_status: 'SUCCEEDED' } as const;
const receipt = { transaction_hash: '0x123' };
const interval = 100;

describe.each([
  ['0.9.0', RpcChannel09],
  ['0.10.2', RpcChannel0102],
  ['0.10.4', RpcChannel0104],
] as const)('RpcChannel %s waitForTransaction retry budget', (_version, Channel) => {
  let channel: InstanceType<typeof Channel>;
  let status: jest.SpyInstance;
  let getReceipt: jest.SpyInstance;
  let settled: jest.Mock;

  beforeEach(() => {
    jest.useFakeTimers();
    channel = new Channel({ nodeUrl: 'http://unused.invalid', retries: 2 });
    status = jest.spyOn(channel, 'getTransactionStatus').mockResolvedValue(pending);
    getReceipt = jest.spyOn(channel, 'getTransactionReceipt').mockResolvedValue(receipt as any);
    settled = jest.fn();
  });

  afterEach(async () => {
    // Settle the original implementation too, so a failed regression leaves no pending poll.
    status.mockReset().mockResolvedValue({ ...accepted, finality_status: 'ACCEPTED_ON_L1' });
    getReceipt.mockReset().mockResolvedValue(receipt);
    await jest.advanceTimersByTimeAsync(interval);
    jest.restoreAllMocks();
    jest.useRealTimers();
  });

  test.each([0, 1, 3])('stops pending status polling after %i retries', async (retries) => {
    channel
      .waitForTransaction('0x123', { retries, retryInterval: interval })
      .then(settled, settled);

    await jest.advanceTimersByTimeAsync((retries + 1) * interval);

    expect(status).toHaveBeenCalledTimes(retries + 1);
    expect(getReceipt).not.toHaveBeenCalled();
    expect(settled).toHaveBeenCalledWith(
      expect.objectContaining({ message: expect.stringContaining('timed-out') })
    );
    await jest.advanceTimersByTimeAsync(interval * 3);
    expect(status).toHaveBeenCalledTimes(retries + 1);
  });

  test('uses the provider retry budget when no per-call override is supplied', async () => {
    channel.waitForTransaction('0x123', { retryInterval: interval }).then(settled, settled);
    await jest.advanceTimersByTimeAsync(3 * interval);
    expect(status).toHaveBeenCalledTimes(3);
    expect(settled).toHaveBeenCalledWith(expect.any(Error));
  });

  test('bounds L2 polling when the caller waits for L1', async () => {
    status.mockResolvedValue(accepted);
    channel
      .waitForTransaction('0x123', {
        retries: 1,
        retryInterval: interval,
        successStates: ['ACCEPTED_ON_L1'],
      })
      .then(settled, settled);
    await jest.advanceTimersByTimeAsync(2 * interval);
    expect(status).toHaveBeenCalledTimes(2);
    expect(settled).toHaveBeenCalledWith(expect.any(Error));
    expect(getReceipt).not.toHaveBeenCalled();
  });

  test.each([0, 1, 3])(
    'accepts a matching status on the final attempt with %i retries',
    async (retries) => {
      status.mockImplementation(async () =>
        status.mock.calls.length > retries ? accepted : pending
      );
      channel
        .waitForTransaction('0x123', { retries, retryInterval: interval })
        .then(settled, settled);
      await jest.advanceTimersByTimeAsync((retries + 1) * interval);
      expect(status).toHaveBeenCalledTimes(retries + 1);
      expect(getReceipt).toHaveBeenCalledTimes(1);
      expect(settled).toHaveBeenCalledWith(receipt);
    }
  );

  test('accepts an explicitly requested execution status', async () => {
    channel
      .waitForTransaction('0x123', {
        retries: 0,
        retryInterval: interval,
        successStates: ['SUCCEEDED'],
      })
      .then(settled, settled);
    await jest.advanceTimersByTimeAsync(interval);
    expect(settled).toHaveBeenCalledWith(receipt);
  });

  test('keeps RPC failures within the same status retry budget', async () => {
    status.mockRejectedValue(new Error('RPC unavailable'));
    channel
      .waitForTransaction('0x123', { retries: 1, retryInterval: interval })
      .then(settled, settled);
    await jest.advanceTimersByTimeAsync(2 * interval);
    expect(status).toHaveBeenCalledTimes(2);
    expect(settled).toHaveBeenCalledWith(expect.any(Error));
    expect(getReceipt).not.toHaveBeenCalled();
  });

  test('counts pending statuses and RPC failures together', async () => {
    status.mockRejectedValueOnce(new Error('RPC unavailable'));
    channel
      .waitForTransaction('0x123', { retries: 1, retryInterval: interval })
      .then(settled, settled);
    await jest.advanceTimersByTimeAsync(2 * interval);
    expect(status).toHaveBeenCalledTimes(2);
    expect(settled).toHaveBeenCalledWith(expect.any(Error));
  });

  test('preserves explicit error states and their response at the budget boundary', async () => {
    const reverted = { ...accepted, execution_status: 'REVERTED' } as const;
    status.mockResolvedValue(reverted);
    channel
      .waitForTransaction('0x123', {
        retries: 0,
        retryInterval: interval,
        errorStates: ['REVERTED'],
      })
      .then(settled, settled);
    await jest.advanceTimersByTimeAsync(interval);
    expect(settled).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'REVERTED: ACCEPTED_ON_L2',
        response: reverted,
      })
    );
    expect(getReceipt).not.toHaveBeenCalled();
  });

  test('returns reverted receipts by default', async () => {
    status.mockResolvedValue({ ...accepted, execution_status: 'REVERTED' });
    channel
      .waitForTransaction('0x123', { retries: 0, retryInterval: interval })
      .then(settled, settled);
    await jest.advanceTimersByTimeAsync(interval);
    expect(settled).toHaveBeenCalledWith(receipt);
  });

  test('preserves the life-cycle error when a previously seen transaction disappears', async () => {
    status
      .mockResolvedValueOnce(pending)
      .mockRejectedValue(
        new RpcError(
          { code: 29, message: 'Transaction hash not found' },
          'starknet_getTransactionStatus',
          {}
        )
      );
    channel
      .waitForTransaction('0x123', {
        retries: 1,
        retryInterval: interval,
        lifeCycleRetries: 0,
      })
      .then(settled, settled);
    await jest.advanceTimersByTimeAsync(2 * interval);
    expect(settled).toHaveBeenCalledWith(
      expect.objectContaining({ message: SYSTEM_MESSAGES.consensusFailed })
    );
  });

  test('retries a missing receipt without adding a delay after success', async () => {
    status.mockResolvedValue(accepted);
    getReceipt.mockRejectedValueOnce(new Error('Receipt unavailable'));
    channel
      .waitForTransaction('0x123', { retries: 2, retryInterval: interval })
      .then(settled, settled);
    await jest.advanceTimersByTimeAsync(interval);
    expect(getReceipt).toHaveBeenCalledTimes(1);
    expect(settled).not.toHaveBeenCalled();
    await jest.advanceTimersByTimeAsync(interval - 1);
    expect(getReceipt).toHaveBeenCalledTimes(1);
    await jest.advanceTimersByTimeAsync(1);
    expect(getReceipt).toHaveBeenCalledTimes(2);
    expect(settled).toHaveBeenCalledWith(receipt);
  });

  test('does not reset the remaining budget when requesting the receipt', async () => {
    status.mockResolvedValueOnce(pending).mockResolvedValue(accepted);
    getReceipt.mockRejectedValue(new Error('Receipt unavailable'));
    channel
      .waitForTransaction('0x123', { retries: 2, retryInterval: interval })
      .then(settled, settled);
    await jest.advanceTimersByTimeAsync(2 * interval);
    expect(status).toHaveBeenCalledTimes(2);
    expect(getReceipt).toHaveBeenCalledTimes(1);
    expect(settled).toHaveBeenCalledWith(expect.any(Error));
  });
});
