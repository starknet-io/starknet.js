import type { StarknetPlugin } from './types';
import { starknetId } from './starknet-id';
import { brotherId } from './brother-id';

/** Default plugins shipped with the SDK */
export const defaultPlugins: StarknetPlugin<any, any>[] = [starknetId(), brotherId()];
