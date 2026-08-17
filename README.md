<!-- logo -->
<p align="center">
  <img width='300' src="https://user-images.githubusercontent.com/2848732/226624229-7f1e5f8b-c550-47d4-85b2-5c90aee22417.png">
</p>

<!-- primary badges -->
<p align="center">
  <a href="https://github.com/starknet-io/starknet.js/actions">
    <img src="https://github.com/starknet-io/starknet.js/actions/workflows/release.yml/badge.svg">
  </a>
  <a href="https://www.npmjs.com/package/starknet">
    <img src='https://img.shields.io/npm/v/starknet' />
  </a>
  <a href="https://www.npmjs.com/package/starknet">
    <img src='https://img.shields.io/npm/v/starknet/next' />
  </a>
  <a href="https://bundlephobia.com/package/starknet">
    <img src='https://img.shields.io/bundlephobia/minzip/starknet?color=success&label=size' />
  </a>
  <a href="https://www.npmjs.com/package/starknet">
    <img src='https://img.shields.io/npm/dt/starknet?color=blueviolet' />
  </a>
  <a href="https://github.com/starknet-io/starknet.js/blob/main/LICENSE/">
    <img src="https://img.shields.io/badge/license-MIT-black">
  </a>
  <a href="https://github.com/starknet-io/starknet.js/stargazers">
    <img src='https://img.shields.io/github/stars/starknet-io/starknet.js?color=yellow' />
  </a>
  <a href="https://starkware.co/">
    <img src="https://img.shields.io/badge/powered_by-StarkWare-navy">
  </a>
  <a href="https://www.drips.network/app/projects/github/starknet-io/starknet.js" target="_blank">
    <img src="https://www.drips.network/api/embed/project/https%3A%2F%2Fgithub.com%2Fstarknet-io%2Fstarknet.js/support.png?background=light&style=github&text=project&stat=none" alt="Support starknet.js on drips.network" height="20">
  </a>
</p>

## Installation

```bash
# latest official release (main branch)
$ npm install starknet

# or for latest pre-release version (develop branch)
$ npm install starknet@next

# or for latest beta release version (beta branch)
$ npm install starknet@beta
```

Import `starknet` and use the [API](https://starknet-io.github.io/starknet.js/docs/API/).

## 🌐 Documentation

How to [Guides](https://starknet-io.github.io/starknet.js/docs/guides/intro) :book: & [API](https://starknet-io.github.io/starknet.js/docs/API/) 💻

Play with [Code Examples](https://github.com/PhilippeR26/starknet.js-workshop-typescript) :video_game:

## 🤖 Using AI

AI training data about starknet.js is often outdated. To give your AI coding agent accurate, up-to-date guidance, install the official starknet.js skill ([`skills/starknet-js/`](./skills/starknet-js/)). It works with Claude Code, Codex, Cursor, Gemini CLI, and any other agent supporting the open [Agent Skills](https://agentskills.io/) standard.

```bash
npx skills add starknet-io/starknet.js
```

or copy the skill files directly:

```bash
mkdir -p ~/.claude/skills/starknet-js && curl -s --output-dir ~/.claude/skills/starknet-js --remote-name-all "https://raw.githubusercontent.com/starknet-io/starknet.js/develop/skills/starknet-js/{SKILL.md,calldata.md,interacting.md}"
```

> This command installs into Claude Code's skills folder — adapt the target directory for other agents.

## ✏️ Contributing

If you consider to contribute to this project please read [CONTRIBUTING.md](https://github.com/starknet-io/starknet.js/blob/main/CONTRIBUTING.md) first.

You can also join our dedicated channel for [Starknet.js](https://discord.com/channels/793094838509764618/1270119831559078061) on the [Starknet Discord](https://discord.com/invite/starknet-community)

## ❤️ Special Thanks

Special thanks to all the [contributors](https://github.com/starknet-io/starknet.js/graphs/contributors), especially to:

- Sean ([@0xs34n](https://github.com/0xs34n)), the original creator of Starknet.js!

- Janek ([@janek26](https://github.com/janek26)) and Dhruv ([@dhruvkelawala](https://github.com/dhruvkelawala)) from [Argent](https://github.com/argentlabs)

- Toni ([@tabaktoni](https://github.com/tabaktoni)), Petar ([@penovicp](https://github.com/penovicp)) and Ivan ([@ivpavici](https://github.com/ivpavici)) from [SpaceShard](https://www.spaceshard.io/)

- Philippe ROSTAN ([@PhilippeR26](https://github.com/PhilippeR26))

...and of course the [StarkWare](https://starkware.co/) team for their dedicated support!

This library would not be possible without these rockstars.

## 📜 License

Copyright (c) 2026 StarkWare

Licensed under the [MIT license](https://github.com/starknet-io/starknet.js/blob/main/LICENSE).
