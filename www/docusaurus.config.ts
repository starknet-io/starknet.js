import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import { themes } from 'prism-react-renderer';

const { github: lightCodeTheme, dracula: darkCodeTheme } = themes;

const generateBaseUrl = (baseUrl = ''): string => `/${baseUrl.trim()}/`.replace(/\/+/g, '/');

const requireEnv = (name: string, fallback?: string): string => {
  const value = process.env[name]?.trim();
  if (!value) {
    if (fallback !== undefined) return fallback;
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
};

const generateSourceLinkTemplate = (gitRevision?: string): string =>
  `https://github.com/starknet-io/starknet.js/blob/${
    gitRevision || '{gitRevision}'
  }/{path}#L{line}`;

type CompatAnchorRule = {
  test: (path: string) => boolean;
  targets: {
    heading: string;
    anchors: string[];
  }[];
};

type MarkdownPreprocessorArgs = {
  fileContent: string;
  filePath: string;
};

type VersionedGuideLinkRule = {
  test: (path: string) => boolean;
  replacements: [RegExp, string][];
};

type GeneratedSidebarItem = {
  type?: string;
  label?: string;
  items?: GeneratedSidebarItem[];
  [key: string]: unknown;
};

/*
 * Frozen versioned API docs (TypeDoc 0.25 + typedoc-plugin-markdown 3 output) link to
 * enum-member anchors like `#declare` or `#skip_validate`. Those anchors were generated
 * from table rows by the old plugin; v4 keeps the same table layout but stops emitting
 * the per-row anchors, so the in-page links now 404. The new (post-upgrade) API output
 * uses proper headings per member and does not need this shim — it only patches frozen
 * versioned files. Delete this block (and `markdown.preprocessor` below) once all
 * affected versioned snapshots are pruned.
 *
 * Each entry: locate the const declaration of the named enum (the second `### Name`
 * occurrence in the file — the first is the typeof alias) and inject invisible
 * <a id="..."> anchors right after it so the old in-page links resolve.
 */
const COMPAT_ANCHOR_RULES: CompatAnchorRule[] = [
  {
    test: (path) => /\/API\/namespaces\/(?:types\.)?RPC\.RPCSPEC\d+\.API\.md$/.test(path),
    targets: [
      {
        heading: '### ETransactionType',
        anchors: ['declare', 'deploy', 'deploy_account', 'invoke'],
      },
      { heading: '### ESimulationFlag', anchors: ['skip_validate', 'skip_fee_charge'] },
      {
        heading: '### ETransactionVersion',
        anchors: ['v0', 'v1', 'v2', 'v3', 'f0', 'f1', 'f2', 'f3'],
      },
    ],
  },
  {
    test: (path) => path.endsWith('/API/namespaces/types.md'),
    targets: [
      {
        heading: '### TransactionType',
        anchors: ['declare', 'deploy', 'deploy_account', 'invoke'],
      },
      { heading: '### TransactionStatus', anchors: ['rejected', 'reverted'] },
    ],
  },
];

/*
 * Only two frozen snapshots need this: 8.6.0 and 9.2.1, whose `guides/account/` pages sit
 * one level deeper than their `API/` tree but still carry `../API/classes/` links (and, in
 * 8.6.0, a `./doc_scripts/` one). The 6.24.1 and 7.6.4 guides are flat, so the test never
 * matches them and their links are already correct. The current 10.x guides use the right
 * depth, which makes this rule a no-op on any snapshot taken from them.
 */
const VERSIONED_GUIDE_LINK_RULES: VersionedGuideLinkRule[] = [
  {
    test: (path) => /\/versioned_docs\/version-[^/]+\/guides\/account\//.test(path),
    replacements: [
      [/\]\(\.\.\/API\/classes\//g, '](../../API/classes/'],
      [/\]\(\.\/doc_scripts\/deployBraavos\.ts\)/g, '](../doc_scripts/deployBraavos.ts)'],
    ],
  },
];

const escapeRegExp = (value: string): string => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const injectMissingAnchors = (content: string, heading: string, anchors: string[]): string => {
  const missing = anchors.filter(
    (id) =>
      !content.includes(`id="${id}"`) &&
      !content.includes(`id='${id}'`) &&
      !content.includes(`{#${id}}`)
  );
  if (missing.length === 0) return content;

  let occurrence = 0;
  return content.replace(new RegExp(`${escapeRegExp(heading)}\\n`, 'g'), (match) => {
    occurrence += 1;
    // The const declaration (with the type-declaration table) is the second occurrence;
    // the first is the typeof alias that has no member rows.
    if (occurrence !== 2) return match;
    const tags = missing.map((id) => `<a id="${id}"></a>`).join('');
    return `${match}\n${tags}\n`;
  });
};

const addGeneratedApiCompatibilityAnchors = ({
  fileContent,
  filePath,
}: MarkdownPreprocessorArgs): string => {
  const path = filePath.replace(/\\/g, '/');
  const normalizedContent = VERSIONED_GUIDE_LINK_RULES.filter((rule) => rule.test(path))
    .flatMap((rule) => rule.replacements)
    .reduce((content, [search, replacement]) => content.replace(search, replacement), fileContent);

  // Belt-and-braces: only patch frozen versioned snapshots, never the freshly
  // generated docs/API tree (TypeDoc 0.28 emits proper member headings already).
  if (!path.includes('/versioned_docs/')) return normalizedContent;
  return COMPAT_ANCHOR_RULES.filter((rule) => rule.test(path))
    .flatMap((rule) => rule.targets)
    .reduce(
      (content, { heading, anchors }) => injectMissingAnchors(content, heading, anchors),
      normalizedContent
    );
};

const sidebarLabelReplacements: Record<string, string> = {
  classes: 'Classes',
  functions: 'Functions',
  interfaces: 'Interfaces',
  namespaces: 'Namespaces',
  'type-aliases': 'Type Aliases',
  variables: 'Variables',
};

const normalizeGeneratedSidebarLabels = <T extends GeneratedSidebarItem>(item: T): T => {
  if (item.type !== 'category' || !Array.isArray(item.items)) {
    return item;
  }

  return {
    ...item,
    label:
      typeof item.label === 'string'
        ? sidebarLabelReplacements[item.label] || item.label
        : item.label,
    items: item.items.map(normalizeGeneratedSidebarLabels),
  } as T;
};

const DEFAULT_DOCS_URL = 'http://localhost:3000';
const DEFAULT_DOCS_BASE_URL = '/';
const docsBaseUrl = generateBaseUrl(process.env.DOCS_BASE_URL || DEFAULT_DOCS_BASE_URL);
const migrationGuideLink = `${docsBaseUrl}docs/guides/migrate`;
// const migrationGuideLink = `${docsBaseUrl}docs/next/guides/migrate`;

/*
 * Archiving helper, not a production setting: a normal build renders every version listed
 * in `versions.json` on top of the current one. `DOCS_ONLY_CURRENT=true` narrows it to the
 * current line, which is all that is needed to regenerate `docs/API` before freezing a new
 * snapshot. CI never sets it, so deployed builds still ship every version.
 */
const onlyCurrentDocs = process.env.DOCS_ONLY_CURRENT === 'true';

const config: Config = {
  title: 'Starknet.js',
  tagline: 'JavaScript library for Starknet',
  url: requireEnv('DOCS_URL', DEFAULT_DOCS_URL),
  baseUrl: docsBaseUrl,
  markdown: {
    format: 'detect',
    preprocessor: addGeneratedApiCompatibilityAnchors,
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },
  onBrokenLinks: 'throw',
  favicon: 'img/favicon.ico',
  headTags: [
    {
      tagName: 'meta',
      attributes: {
        name: 'algolia-site-verification',
        content: '0F4C4F228CB73707',
      },
    },
  ],
  organizationName: 'starknet-io', // Usually your GitHub org/user name.
  projectName: 'starknet.js', // Usually your repo name.
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.js',
          // `www/docs` tracks the supported 10.x line, so it is the default version and
          // served at /docs/. `10.8.0` is a frozen copy of that same supported line and
          // therefore carries no banner; the older snapshots are end-of-life and are
          // flagged as unmaintained. When the next major becomes the development line,
          // update `current.label` and flag `10.8.0` as unmaintained in turn. Every new
          // snapshot needs an explicit `banner` entry here.
          lastVersion: 'current',
          ...(onlyCurrentDocs ? { onlyIncludeVersions: ['current'] } : {}),
          versions: {
            current: { label: '10.x', banner: 'none' },
            // Declared only when they are part of the build, to stay in step with
            // `onlyIncludeVersions` above.
            ...(onlyCurrentDocs
              ? {}
              : {
                  '10.8.0': { banner: 'none' },
                  '9.2.1': { banner: 'unmaintained' },
                  '8.6.0': { banner: 'unmaintained' },
                  '7.6.4': { banner: 'unmaintained' },
                }),
          },
          async sidebarItemsGenerator(args) {
            const sidebarItems = await args.defaultSidebarItemsGenerator(args);

            return sidebarItems.map(normalizeGeneratedSidebarLabels);
          },
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    algolia: {
      // The application ID provided by Algolia
      appId: '86VVNRI64B',

      // Public API key: it is safe to commit it
      apiKey: '1e38429d50835ef8fcae055fba695062',

      indexName: 'starknet-js',

      // Algolia "Ask AI" conversational assistant (DocSearch v4).
      // The assistantId is a public value (configured in the Algolia dashboard,
      // LLM provider: Google Gemini). indexName/apiKey/appId are inherited from
      // the options above.
      askAi: 'f949afac-da08-4698-82a3-a22b60af6fd3',

      // Optional: see doc section below
      contextualSearch: true,

      // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
      //externalUrlRegex: 'external\\.com|domain\\.com',

      // Optional: Replace parts of the item URLs from Algolia. Useful when using the same search index for multiple deployments using a different baseUrl. You can use regexp or string in the `from` param. For example: localhost:3000 vs myCompany.com/docs
      //replaceSearchResultPathname: {
      // from: '/docs/', // or as RegExp: /\/docs\//
      // to: '/',

      // Optional: Algolia search parameters
      //searchParameters: {},

      // Optional: path for search page that enabled by default (`false` to disable it)
      //searchPagePath: 'search',

      //... other Algolia param
    },
    announcementBar: {
      content: `<a href="${migrationGuideLink}">Migrate to Latest Version</a>`,
      backgroundColor: 'rgb(230 231 232)',
    },
    navbar: {
      title: 'Home',
      logo: {
        alt: 'Starknet.js Logo',
        src: 'img/Starknet-JS_navbar.png',
      },
      items: [
        {
          label: 'API',
          docId: 'API/index',
          type: 'doc',
          position: 'left',
        },
        {
          label: 'Guides',
          docId: 'guides/intro',
          type: 'doc',
          position: 'left',
        },
        {
          type: 'docsVersionDropdown',
          dropdownActiveClassDisabled: true,
          position: 'left',
        },

        {
          label: 'GitHub',
          href: 'https://github.com/starknet-io/starknet.js',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'API',
              to: '/docs/API/',
            },
            {
              label: 'Guides',
              to: '/docs/guides/intro',
            },
            {
              label: 'Migrate to v9',
              to: migrationGuideLink,
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'https://discord.com/channels/793094838509764618/1270119831559078061',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/starknet-io/starknet.js',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} StarkWare`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
  } satisfies Preset.ThemeConfig,

  plugins: [
    [
      '@docusaurus/plugin-client-redirects',
      {
        // Until 10.x became the default version, the current docs were served under
        // /docs/next/. Keep those links alive by redirecting every /docs/next/* page to
        // its /docs/* counterpart. Paths here are relative to `baseUrl`. Versioned
        // snapshots (/docs/9.2.1/...) never lived under /docs/next/ and are skipped.
        createRedirects(existingPath: string) {
          const match = existingPath.match(/^\/docs\/(.+)$/);
          if (!match || /^\d/.test(match[1])) return undefined;
          return [`/docs/next/${match[1]}`];
        },
      },
    ],
    [
      'docusaurus-plugin-typedoc',
      {
        entryPoints: ['../src/index.ts'],
        tsconfig: '../tsconfig.json',
        out: 'docs/API',
        name: 'Starknet.js API',
        // Keep `docs/API/.gitkeep` (see www/.gitignore) by not wiping the output dir on build.
        cleanOutputDir: false,
        includeVersion: true,
        fileExtension: '.md',
        sourceLinkTemplate: generateSourceLinkTemplate(
          process.env.GIT_REVISION_OVERRIDE || 'develop'
        ),
        visibilityFilters: {
          protected: false,
          private: false,
        },
        sort: ['kind'],
        kindSortOrder: [
          'Reference',
          'Project',
          'Module',
          'Class',
          'Namespace',
          'Enum',
          'EnumMember',
          'Interface',
          'TypeAlias',
          'Constructor',
          'Property',
          'Variable',
          'Function',
          'Accessor',
          'Method',
          'Parameter',
          'TypeParameter',
          'TypeLiteral',
          'CallSignature',
          'ConstructorSignature',
          'IndexSignature',
          'GetSignature',
          'SetSignature',
        ],
        readme: './ApiTitle.md',
      },
    ],
  ],
};

export default config;
