import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import path from 'node:path';

const NOBLE_DIR = path.join(__dirname, '..', '..', '..', 'src', 'falcon', 'engine', 'noble');

test('vendored noble files match the SHA-256 recorded in PATCH.md', () => {
  const patchMd = readFileSync(path.join(NOBLE_DIR, 'PATCH.md'), 'utf8');
  const section = patchMd.split('## SHA-256 of the vendored files')[1];
  expect(section).toBeDefined();
  const entries = [...section.matchAll(/^([0-9a-f]{64})\s+(\S+)$/gm)].map((m) => ({
    hash: m[1],
    file: m[2],
  }));
  expect(entries.map((e) => e.file).sort()).toEqual([
    'LICENSE',
    '_crystals.ts',
    'falcon.ts',
    'utils.ts',
  ]);
  entries.forEach(({ hash, file }) => {
    const actual = createHash('sha256')
      .update(readFileSync(path.join(NOBLE_DIR, file)))
      .digest('hex');
    expect(`${file} ${actual}`).toBe(`${file} ${hash}`);
  });
});
