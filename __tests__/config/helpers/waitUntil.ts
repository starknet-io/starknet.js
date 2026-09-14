/**
 * Resolve once `predicate()` holds.
 *
 * Subscription tests collect their notifications into an array and assert on it here, rather than
 * counting inside the subscription handler and unsubscribing on the Nth call. A counter cannot
 * express "the events belonging to *my* transaction", and cannot tell them apart from a backlog
 * the node replays at subscription time — which devnet does for `starknet_subscribeEvents`,
 * delivering the previous block's events before anything has happened.
 * @param predicate - Checked before each poll; the wait ends when it returns true.
 * @param timeoutMs - Upper bound before giving up. Deliberately short: a stuck test must report
 *   quickly rather than run out Jest's own timeout.
 * @param tick - Ran before each poll. `createBlockForDevnet` when the condition needs a block to
 *   happen at all.
 */
export const waitUntil = async (
  predicate: () => boolean,
  timeoutMs = 60_000,
  tick?: () => Promise<unknown>
): Promise<void> => {
  const deadline = Date.now() + timeoutMs;
  while (!predicate()) {
    if (Date.now() > deadline) throw new Error('waitUntil: the condition never became true');
    // eslint-disable-next-line no-await-in-loop
    if (tick) await tick();
    // eslint-disable-next-line no-await-in-loop
    await new Promise((resolve) => {
      setTimeout(resolve, 250);
    });
  }
};
