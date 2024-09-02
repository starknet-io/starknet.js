// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

const generateBaseUrl = (baseUrl = '') => `/${baseUrl.trim()}/`.replace(/\/+/g, '/');

const generateSourceLinkTemplate = (gitRevision) =>
  `https://github.com/starknet-io/starknet.js/blob/${
    gitRevision || '{gitRevision}'
  }/{path}#L{line}`;

const migrationGuideLink = `${generateBaseUrl(process.env.DOCS_BASE_URL)}docs/guides/migrate`;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Starknet.js',
  tagline: 'JavaScript library for Starknet',
  url: 'https://starknetjs.com',
  baseUrl: generateBaseUrl(process.env.DOCS_BASE_URL),
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'starknet-io', // Usually your GitHub org/user name.
  projectName: 'starknet.js', // Usually your repo name.

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    {
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
        content: `<a href="${migrationGuideLink}">Migrate from v5</a>`,
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
                label: 'Migrate from v5',
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
                href: 'https://discord.com/channels/793094838509764618/927918707613786162',
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
    },

  plugins: [
    [
      'docusaurus-plugin-typedoc',
      {
        entryPoints: ['../src/index.ts'],
        tsconfig: '../tsconfig.json',
        out: 'API',
        name: 'Starknet.js API',
        includeVersion: true,
        includeExtension: true,
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
