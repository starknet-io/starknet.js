import { readFileSync } from 'node:fs';
import path from 'node:path';
import { FIXTURES_DIR } from './fixtures';

/** Files of __mocks__/falcon/oz/: verbatim copies of the OpenZeppelin reference data (see README). */
export type OzFixtureFile = 'fixture' | 'rotation_fixture' | 'migration_fixture';

const readOzFile = (file: OzFixtureFile): string =>
  readFileSync(path.join(FIXTURES_DIR, 'oz', `${file}.cairo`), 'utf8');

/** Body of `pub fn <fn>()`: from its first `{` to the first line that is only `}`. */
function functionBody(file: OzFixtureFile, fn: string): string {
  const match = readOzFile(file).match(new RegExp(`pub fn ${fn}\\(\\)[^{]*\\{([\\s\\S]*?)\\n\\}`));
  if (!match) throw new Error(`no function ${fn} in ${file}.cairo`);
  return match[1];
}

/** The numbers (hex or decimal) written in the body of `pub fn <fn>()`, in order. */
export function readOzFelts(file: OzFixtureFile, fn: string): bigint[] {
  return [...functionBody(file, fn).matchAll(/0x[0-9a-fA-F]+|\b\d+\b/g)].map((m) => BigInt(m[0]));
}

/** The short string written in the body of `pub fn <fn>()`, as in `'FALCON_ACCOUNT'.try_into()`. */
export function readOzShortString(file: OzFixtureFile, fn: string): string {
  const match = functionBody(file, fn).match(/'([^']*)'/);
  if (!match) throw new Error(`no short string in ${fn} of ${file}.cairo`);
  return match[1];
}

/** The 40 salt bytes written in the header of fixture.cairo ("Salt: `0x…`"). */
export function readOzFixtureSalt(): Uint8Array {
  const match = readOzFile('fixture').match(/Salt: `0x([0-9a-fA-F]{80})`/);
  if (!match) throw new Error('no salt in the header of fixture.cairo');
  return Uint8Array.from(match[1].match(/../g) ?? [], (byte) => parseInt(byte, 16));
}
