/* eslint-disable no-await-in-loop */
import { cairo } from '../../../src';
import { createTestProvider, devnetFeeTokenAddress, getTestAccount } from '../fixturesInit';

/** Create in Devnet 3 transactions to initiate tip history */
export async function InitDevnetHistory() {
  // It has been checked previously that we are using Devnet
  const provider = await createTestProvider();
  const account = getTestAccount(provider);
  const nbBlocks = await provider.getBlockNumber();
  if (nbBlocks < 3) {
    // eslint-disable-next-line no-console
    console.log('Init Devnet...');
    // eslint-disable-next-line no-plusplus
    for (let i = 1n; i <= 3n; i++) {
      try {
        const { transaction_hash } = await account.execute(
          {
            contractAddress: devnetFeeTokenAddress,
            entrypoint: 'transfer',
            calldata: {
              recipient: account.address,
              amount: cairo.uint256(1n * 10n ** 3n),
            },
          },
          { tip: i * 10n ** 6n }
        );
        await account.waitForTransaction(transaction_hash);
      } catch (error: any) {
        // eslint-disable-next-line no-console
        console.error('Error in Devnet initialization.', error);
      }
    }
  }
}
