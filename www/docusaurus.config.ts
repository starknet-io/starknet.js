import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import { themes } from 'prism-react-renderer';

const { github: lightCodeTheme, dracula: darkCodeTheme } = themes;

const generateBaseUrl = (baseUrl = ''): string => `/${baseUrl.trim()}/`.replace(/\/+/g, '/');

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

const VERSIONED_GUIDE_LINK_RULES: VersionedGuideLinkRule[] = [
  {
    test: (path) => /\/versioned_docs\/version-[^/]+\/guides\/account\//.test(path),
    replacements: [
      [/\]\(\.\.\/API\/classes\//g, '](../../API/classes/'],
      [/\]\(\.\/doc_scripts\/deployBraavos\.ts\)/g, '](../doc_scripts/deployBraavos.ts)'],
    ],
  },
  {
    test: (path) =>
      /\/versioned_docs\/version-[^/]+\/guides\/(?:account\/)?paymaster\.md$/.test(path),
    replacements: [
      [/\]\(\.\/outsideExecution\.md#check-snip-9-support\)/g, '](./outsideExecution.md)'],
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
    label: sidebarLabelReplacements[item.label] || item.label,
    items: item.items.map(normalizeGeneratedSidebarLabels),
  } as T;
};

const migrationGuideLink = `${generateBaseUrl(process.env.DOCS_BASE_URL)}docs/guides/migrate`;
// const migrationGuideLink = `${generateBaseUrl(process.env.DOCS_BASE_URL)}docs/next/guides/migrate`;

const config: Config = {
  title: 'Starknet.js',
  tagline: 'JavaScript library for Starknet',
  url: 'https://starknet-io.github.io',
  baseUrl: generateBaseUrl(process.env.DOCS_BASE_URL),
  markdown: {
    format: 'detect',
    preprocessor: addGeneratedApiCompatibilityAnchors,
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },
  onBrokenLinks: 'throw',
  favicon: 'img/favicon.ico',
  organizationName: 'starknet-io', // Usually your GitHub org/user name.
  projectName: 'starknet.js', // Usually your repo name.
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.js',
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
      apiKey: '6f4db54e4ee0ae77619b41dbe862af7f',

      indexName: 'starknetjs',

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
              label: 'Twitter',
              href: 'https://twitter.com/starknetjs',
            },
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
      'docusaurus-plugin-typedoc',
      {
        entryPoints: ['../src/index.ts'],
        tsconfig: '../tsconfig.json',
        out: 'docs/API',
        name: 'Starknet.js API',
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
