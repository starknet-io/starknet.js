import { themes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;
const generateBaseUrl = (baseUrl = '') => `/${baseUrl.trim()}/`.replace(/\/+/g, '/');

const migrationGuideLink = `${generateBaseUrl(process.env.DOCS_BASE_URL)}docs/guides/migrate`;

const config: Config = {
  title: 'Starknet.js',
  tagline: 'JavaScript library for Starknet',
  url: 'https://starknetjs.com',
  baseUrl: generateBaseUrl(process.env.DOCS_BASE_URL),
  onBrokenLinks: 'ignore',
  favicon: 'img/favicon.ico',
  organizationName: 'starknet-io', // Usually your GitHub org/user name.
  projectName: 'starknet.js', // Usually your repo name.
  presets: [
    [
      'classic',
      {
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
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
};

export default config;
