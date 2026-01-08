/* eslint-disable no-template-curly-in-string */
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
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
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
