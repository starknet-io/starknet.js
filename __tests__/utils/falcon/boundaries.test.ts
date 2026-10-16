import { readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';

// src/falcon/ reaches the core of starknet.js only through the package name, and stays browser-safe.
const FALCON = path.join(__dirname, '..', '..', '..', 'src', 'falcon');
const ALLOWED_PACKAGES = [
  '@noble/ciphers',
  '@noble/curves',
  '@noble/hashes',
  '@scure/starknet',
  'starknet',
];
const STARKNET_IMPORT = "import * as starknet from 'starknet';";

const listTsFiles = (dir: string): string[] =>
  readdirSync(dir).flatMap((name) => {
    const p = path.join(dir, name);
    if (statSync(p).isDirectory()) return listTsFiles(p);
    return p.endsWith('.ts') ? [p] : [];
  });

/** The code without its comments: an example inside a doc comment is not an import. */
const withoutComments = (source: string): string =>
  source.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '');

/** Every module a file loads: `import … from`, `export … from`, `import 'x'` and `import('x')`. */
const importSpecifiers = (source: string): string[] => {
  const code = withoutComments(source);
  return [
    ...code.matchAll(/^\s*(?:import|export)\s[^;]*?\sfrom\s+'([^']+)'/gm),
    ...code.matchAll(/^\s*import\s+'([^']+)'/gm),
    ...code.matchAll(/\bimport\(\s*'([^']+)'\s*\)/g),
  ].map((m) => m[1]);
};

const falconFiles = listTsFiles(FALCON);
const relative = (file: string): string => path.relative(FALCON, file);
const isVendored = (file: string): boolean => file.includes(`${path.sep}noble${path.sep}`);

describe('src/falcon boundaries', () => {
  test('the import scanner sees side-effect imports and import(), not commented ones', () => {
    const source = "import 'x';\nexport const m = import('y');\n// import('z');\n";
    expect(importSpecifiers(source)).toEqual(['x', 'y']);
  });

  test('relative imports stay inside src/falcon/ and packages are in the allow-list', () => {
    const violations = falconFiles.flatMap((file) =>
      importSpecifiers(readFileSync(file, 'utf8')).flatMap((specifier) => {
        if (specifier.startsWith('.')) {
          const inside = path.resolve(path.dirname(file), specifier).startsWith(FALCON);
          return inside ? [] : [`${relative(file)}: import '${specifier}' leaves src/falcon/`];
        }
        const allowed = ALLOWED_PACKAGES.some(
          (pkg) => specifier === pkg || specifier.startsWith(`${pkg}/`)
        );
        return allowed ? [] : [`${relative(file)}: package '${specifier}' is not allowed`];
      })
    );
    expect(violations).toEqual([]);
  });

  test(`starknet is imported only as a namespace: ${STARKNET_IMPORT}`, () => {
    const violations = falconFiles.flatMap((file) =>
      [...withoutComments(readFileSync(file, 'utf8')).matchAll(/^import\s[^;]*?'starknet';/gm)]
        .map((m) => m[0].replace(/\s+/g, ' '))
        .filter((statement) => statement !== STARKNET_IMPORT)
        .map((statement) => `${relative(file)}: ${statement}`)
    );
    expect(violations).toEqual([]);
  });

  test('no Node-only API and no console output outside the vendored noble copy', () => {
    const violations = falconFiles
      .filter((file) => !isVendored(file))
      .flatMap((file) => {
        const code = withoutComments(readFileSync(file, 'utf8'));
        return [
          ...(/\b(Buffer|process|require)\s*[.(]/.test(code)
            ? [`${relative(file)}: Node-only API`]
            : []),
          ...(/console\.(log|info|debug)/.test(code) ? [`${relative(file)}: console output`] : []),
        ];
      });
    expect(violations).toEqual([]);
  });

  test('s2morrow/ keeps no module-level cache (secret-derived values would outlive their use)', () => {
    const moduleCache = /^(?:const|let|var)\s+(\w+)\s*(?::[^=]+)?=\s*new\s+(?:Map|Set|WeakMap)\b/gm;
    const violations = falconFiles
      .filter((file) => file.includes(`${path.sep}s2morrow${path.sep}`))
      .flatMap((file) =>
        [...readFileSync(file, 'utf8').matchAll(moduleCache)].map(
          (m) => `${relative(file)}: module-level cache '${m[1]}'`
        )
      );
    expect(violations).toEqual([]);
  });
});
