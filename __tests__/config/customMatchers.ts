// @ts-nocheck

declare global {
  namespace jest {
    interface Matchers<R> {
      toMatchEventStructure(expected: any): R;
    }
  }
}

const customMatchers = {
  toMatchEventStructure(received: any, expected: any): any {
    const { block_hash, block_number, transaction_hash, ...eventData } = received;

    // Check if required properties exist
    const hasRequiredProps = block_hash && block_number && transaction_hash;

    // Check if event data matches
    const eventDataMatches = this.equals(eventData, expected);

    return {
      // actual: received,
      pass: !!(hasRequiredProps && eventDataMatches),
      message: () =>
        `Expected event to match structure with dynamic properties.\n\n` +
        `Expected: ${this.utils.printExpected(expected)}\n` +
        `Received: ${this.utils.printReceived(eventData)}`,
    };
  },
};

export default customMatchers;
