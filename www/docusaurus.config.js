// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

const generateSourceLinkTemplate = (gitRevision) =>
  `https://github.com/starknet-io/starknet.js/blob/${
    gitRevision || '{gitRevision}'
  }/{path}#L{line}`;

// TODO: remove the /next/ fragment after the v5 official release
const migrationGuideLink = '/docs/next/guides/migrate';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Starknet.js',
  tagline: 'JavaScript library for Starknet',
  url: 'https://starknetjs.com',
  baseUrl: '/',
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
    ({
      announcementBar: {
        content: `<a href="${migrationGuideLink}">Migrate from v4</a>`,
        backgroundColor: 'rgb(230 231 232)',
      },
      navbar: {
        title: 'Home',
        logo: {
          alt: 'Starknet.js Logo',
          src: 'img/StarkNet-JS_navbar.png',
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
                label: 'Migrate from v4',
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
          'ObjectLiteral',
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
