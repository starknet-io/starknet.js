// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer').themes.github;
const darkCodeTheme = require('prism-react-renderer').themes.dracula;

const generateBaseUrl = (baseUrl = '') => `/${baseUrl.trim()}/`.replace(/\/+/g, '/');

const generateSourceLinkTemplate = (gitRevision) =>
  `https://github.com/starknet-io/starknet.js/blob/${
    gitRevision || '{gitRevision}'
  }/{path}#L{line}`;

const migrationGuideLink = `${generateBaseUrl(process.env.DOCS_BASE_URL)}docs/guides/migrate`;

/**
 * overrides the auto-generated left sidebar content to more closely align with the previous version
 *
 * @param {import('@docusaurus/plugin-content-docs/src/sidebars/types.js').SidebarItemsGeneratorArgs} args
 * @param {import('@docusaurus/plugin-content-docs/src/sidebars/types.js').NormalizedSidebar} items
 */
function injectTypeDocSidebar(args, items) {
  if (args.version.versionName !== 'current') return items;

  return items.toReversed().map((item) => {
    if (
      item.type === 'category' &&
      item.link?.type === 'doc' &&
      item.link?.id === 'API/index' &&
      item.label === 'Starknet.js API'
    ) {
      item.label = 'API';

      const groupedItems = item.items.reduce((grouped, entry) => {
        if (entry.type === 'doc') {
          entry.label = 'exports';
          grouped['globals'] = entry;
        } else if (entry.type === 'category') {
          // collapse 'starknet.namespaces' into 'namespaces'
          // TODO: investigate if this can be avoided through configuration
          if (entry.label === 'starknet') {
            grouped['namespaces'] = entry.items[0];
          } else {
            grouped[entry.label] = entry;
          }
        } else {
          throw Error('Expected sidebar data structure has changed');
        }
        return grouped;
      }, {});
      const order = ['globals', 'namespaces', 'enumerations', 'classes', 'interfaces'];
      if (order.length !== item.items.length)
        throw new Error('Expected sidebar data structure has changed');
      item.items = order.map((x) => groupedItems[x]);
    }
    return item;
  });
}

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
  markdown: {
    format: 'detect',
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        docs: {
          async sidebarItemsGenerator({ defaultSidebarItemsGenerator, ...args }) {
            return injectTypeDocSidebar(args, await defaultSidebarItemsGenerator(args));
          },
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
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
      /** @type {Partial<import('typedoc', { with: { 'resolution-mode': 'import' } }).TypeDocOptions & import('docusaurus-plugin-typedoc',  { with: { 'resolution-mode': 'import' } }).PluginOptions>} */
      ({
        entryPoints: ['../src/index.ts'],
        tsconfig: '../tsconfig.json',
        out: 'docs/API',
        includeVersion: true,
        sourceLinkTemplate: generateSourceLinkTemplate(
          process.env.GIT_REVISION_OVERRIDE || 'develop'
        ),
        visibilityFilters: {
          protected: false,
          private: false,
        },
        sort: ['kind'],
        sidebar: {
          autoConfiguration: true,
        },
        readme: './ApiTitle.md',
        parametersFormat: 'table',
        interfacePropertiesFormat: 'table',
        enumMembersFormat: 'table',
        typeDeclarationFormat: 'table',
        membersWithOwnFile: ['Class', 'Enum', 'Interface'],
      }),
    ],
  ],
};

module.exports = config;
