import { readFileSync } from 'node:fs';
import path from 'node:path';
import { FIXTURES_DIR } from './fixtures';

export type FalconRsFixture = {
  generator: string;
  falconRsCommit: string;
  seed: string;
  secretKey: string;
  publicKey: string;
  pkNtt: number[];
  packedPublicKey: string[];
  signatures: { msgHash: string; signature: string[] }[];
};

export const loadFalconRsFixture = (): FalconRsFixture =>
  JSON.parse(readFileSync(path.join(FIXTURES_DIR, 'falconRs.json'), 'utf8'));
