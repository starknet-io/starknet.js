/* eslint-disable no-template-curly-in-string */
/**
 * The default `angular` preset predates the `!` breaking-change marker: its
 * `headerPattern` has no `!?` before the colon, so `feat(scope)!: subject` does not
 * parse at all. The commit is then read as having no type, matches no release rule
 * and triggers no release — silently, because commitlint accepts the form. These
 * options add the marker back, and must be passed to the notes generator too:
 * without them there the release happens with an empty changelog entry.
 */
const parserOpts = {
  headerPattern: /^(\w*)(?:\((.*)\))?!?: (.*)$/,
  headerCorrespondence: ['type', 'scope', 'subject'],
  breakingHeaderPattern: /^(\w*)(?:\((.*)\))?!: (.*)$/,
};

/**
 * @type {import('semantic-release').GlobalConfig}
 */
export default {
  branches: [
    'main',
    {
      name: 'develop',
      channel: 'next',
    },
    {
      name: 'beta',
      prerelease: true,
    },
    {
      // e.g. maintenance/5.x, maintenance/5.0.x
      name: 'maintenance/+([0-9])?(.{+([0-9]),x}).x',
      range: '${name.replace(/^maintenance\\//g, "")}',
      // a single channel is used to reduce channel clutter,
      // if removed the channel matches the version suffix
      channel: 'maintenance',
    },
  ],
  plugins: [
    ['@semantic-release/commit-analyzer', { parserOpts }],
    ['@semantic-release/release-notes-generator', { parserOpts }],
    '@semantic-release/changelog',
    '@semantic-release/npm',
    [
      '@semantic-release/git',
      {
        assets: ['package.json', 'package-lock.json', 'CHANGELOG.md'],
        message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ],
    '@semantic-release/github',
  ],
  repositoryUrl: 'https://github.com/starknet-io/starknet.js',
};
