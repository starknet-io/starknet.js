// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const { themes } = require('prism-react-renderer');

const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;

const generateBaseUrl = (baseUrl = '') => `/${baseUrl.trim()}/`.replace(/\/+/g, '/');

const generateSourceLinkTemplate = (gitRevision) =>
  `https://github.com/starknet-io/starknet.js/blob/${
    gitRevision || '{gitRevision}'
  }/{path}#L{line}`;

const enumMemberAnchorGroups = {
  simulationFlags: ['skip_validate', 'skip_fee_charge'],
  transactionTypes: ['declare', 'deploy', 'deploy_account', 'invoke'],
  transactionStatuses: ['rejected', 'reverted'],
  transactionVersions: ['v0', 'v1', 'v2', 'v3', 'f0', 'f1', 'f2', 'f3'],
};

const generatedEnumAnchorComment =
  '<!-- Docusaurus 3 does not create anchors for enum table rows; keep old TypeDoc links valid. -->';

/**
 * @param {string} value
 */
const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * @param {string} fileContent
 * @param {string} heading
 * @param {string[]} anchors
 * @param {number} [occurrence]
 */
const addEnumMemberAnchors = (fileContent, heading, anchors, occurrence = 1) => {
  const missingAnchors = anchors.filter(
    (anchor) =>
      !fileContent.includes(`id="${anchor}"`) &&
      !fileContent.includes(`id='${anchor}'`) &&
      !fileContent.includes(`{#${anchor}}`)
  );

  if (missingAnchors.length === 0) {
    return fileContent;
  }

  let currentOccurrence = 0;

  return fileContent.replace(new RegExp(`${escapeRegExp(heading)}\\n`, 'g'), (match) => {
    currentOccurrence += 1;

    if (currentOccurrence !== occurrence) {
      return match;
    }

    const anchorBlock = [
      '',
      generatedEnumAnchorComment,
      ...missingAnchors.map((anchor) => `###### ${anchor} {#${anchor}}`),
      '',
    ].join('\n');

    return `${match}${anchorBlock}`;
  });
};

/**
 * @param {{ fileContent: string; filePath: string }} args
 */
const addGeneratedApiCompatibilityAnchors = ({ fileContent, filePath }) => {
  const normalizedFilePath = filePath.replace(/\\/g, '/');
  const isApiRpcSpecPage = /\/API\/namespaces\/(?:types\.)?RPC\.RPCSPEC\d+\.API\.md$/.test(
    normalizedFilePath
  );
  const isLegacyTypesPage = normalizedFilePath.endsWith('/API/namespaces/types.md');
  let processedContent = fileContent;

  if (isApiRpcSpecPage) {
    processedContent = addEnumMemberAnchors(
      processedContent,
      '### ETransactionType',
      enumMemberAnchorGroups.transactionTypes,
      2
    );
    processedContent = addEnumMemberAnchors(
      processedContent,
      '### ESimulationFlag',
      enumMemberAnchorGroups.simulationFlags,
      2
    );
    processedContent = addEnumMemberAnchors(
      processedContent,
      '### ETransactionVersion',
      enumMemberAnchorGroups.transactionVersions,
      2
    );
  }

  if (isLegacyTypesPage) {
    processedContent = addEnumMemberAnchors(
      processedContent,
      '### TransactionType',
      enumMemberAnchorGroups.transactionTypes,
      2
    );
    processedContent = addEnumMemberAnchors(
      processedContent,
      '### TransactionStatus',
      enumMemberAnchorGroups.transactionStatuses,
      2
    );
  }

  return processedContent;
};

const sidebarLabelReplacements = {
  classes: 'Classes',
  functions: 'Functions',
  interfaces: 'Interfaces',
  namespaces: 'Namespaces',
  'type-aliases': 'Type Aliases',
  variables: 'Variables',
};

const normalizeGeneratedSidebarLabels = (item) => {
  if (item.type !== 'category') {
    return item;
  }

  return {
    ...item,
    label: sidebarLabelReplacements[item.label] || item.label,
    items: item.items.map(normalizeGeneratedSidebarLabels),
  };
};

const migrationGuideLink = `${generateBaseUrl(process.env.DOCS_BASE_URL)}docs/guides/migrate`;
// const migrationGuideLink = `${generateBaseUrl(process.env.DOCS_BASE_URL)}docs/next/guides/migrate`;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Starknet.js',
  tagline: 'JavaScript library for Starknet',
  url: 'https://starknet-io.github.io',
  baseUrl: generateBaseUrl(process.env.DOCS_BASE_URL),
  markdown: {
    format: 'detect',
    preprocessor: addGeneratedApiCompatibilityAnchors,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },
  onBrokenLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'starknet-io', // Usually your GitHub org/user name.
  projectName: 'starknet.js', // Usually your repo name.
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          async sidebarItemsGenerator(args) {
            const sidebarItems = await args.defaultSidebarItemsGenerator(args);

            return sidebarItems.map(normalizeGeneratedSidebarLabels);
          },
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
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
    }),

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

module.exports = config;
