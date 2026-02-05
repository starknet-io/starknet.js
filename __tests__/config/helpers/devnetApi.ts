import { DevnetProvider } from 'starknet-devnet';
import { wait } from '../../../src/utils/provider';
import { RpcProvider } from '../../../src';

export const createBlockForDevnet = async (): Promise<void> => {
  if (!(process.env.IS_DEVNET === 'true')) return;
  const devnet = new DevnetProvider({ url: process.env.TEST_RPC_URL });
  await devnet.createBlock();
};

export async function waitNextBlock(provider: RpcProvider, delay: number) {
  const initBlock = await provider.getBlockNumber();
  await createBlockForDevnet();
  let isNewBlock: boolean = false;
  while (!isNewBlock) {
    // eslint-disable-next-line no-await-in-loop
    const currentBlock = await provider.getBlockNumber();
    if (currentBlock !== initBlock) {
      isNewBlock = true;
    } else {
      // eslint-disable-next-line no-await-in-loop
      await wait(delay);
    }
  }
}
