# How to contribute

We love pull requests. And following these guidelines will make your pull request easier to merge.

If you want to contribute but don’t know what to do, take a look at these two labels: [help wanted](https://github.com/starknet-io/starknet.js/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22) and [good first issue](https://github.com/starknet-io/starknet.js/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22).

_[Use GitHub interface](https://blog.sapegin.me/all/open-source-for-everyone/) for simple documentation changes, otherwise follow the steps below._

> :warning: IMPORTANT NOTE :warning:
>
> All contributions are expected to be of the highest possible quality! That means the PR is thoroughly tested and documented, and without blindly generated ChatGPT code and documentation! We will not consider nor merge PR-s that do not comply to these rules!

## Prerequisites

- If it’s your first pull request, watch [this amazing course](http://makeapullrequest.com/) by [Kent C. Dodds](https://twitter.com/kentcdodds).
- Fork the repository and clone your fork.
- Checkout to the `develop` branch.
- Install dependencies: `npm install`.

## Development workflow

Start from the `develop` branch (or `next-version` if latest).

To build your changes, run:

```bash
npm run build
```

Run linters and tests:

```bash
npm test
```

Or run tests in watch mode:

```bash
npm test --watch
```

By default the tests are executed in your local Devnet and everything should run automatically.

If you want to use a specific RPC node, you have to set some global variables before executing the tests:

```bash
export TEST_RPC_URL=http://192.168.1.44:9545/rpc/v0_7 # example of a Pathfinder node located in your local network
export TEST_RPC_URL=https://starknet-sepolia.public.blastapi.io/rpc/v0_7 # example of a public Sepolia testnet node
export TEST_ACCOUNT_ADDRESS=0x065A822f0000000000000000000000000c26641
export TEST_ACCOUNT_PRIVATE_KEY=0x02a80000000000000000000000001754438a
```

The global variables above will only be valid for some of the tests.
The recommended and more straightforward approach is to go with the docker.
You just need to do the following steps:

- Install [Docker](https://docs.docker.com/engine/install/) (it can also be installed via a package manager, e.g. `brew` for Mac)
- Run `Docker` on your machine (open the application).
- Go to the [starknet-devnet-rs](https://hub.docker.com/r/shardlabs/starknet-devnet-rs/tags) and copy the `docker pull` command from the latest tag
- Run `docker pull shardlabs/starknet-devnet-rs:latest` in your terminal
- Run tests locally with `npm run test`

**Don’t forget to add tests and [update documentation](./www/README.md) for your changes.**
Documentation can be archived by using JSDoc.

**Please update the npm lock file (`package-lock.json`) if you add or update dependencies.**

### Commit messages

**For commit messages use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/), like so: `feat(scope): topic`**

Note that the `feat` and `fix` commit messages are used for compiling the changelog. They should be relative to the current state of the target branch they should be merged into and not the feature branch where they are initially committed.

Example of **_incorrect_** commit messages:

```
fix: repair some bug
fix: rectify failing test
fix: adjust formatting
fix: add comments
fix: repair some other bug
```

Example of **_correct_** commit messages:

```
fix: repair some bug
test: rectify failing test
chore: adjust formatting
chore: add comments
fix: repair some other bug
```

### Pull request targets

For the most common pull requests such as bug fixes, feature additions, documentation changes, etc., target the `develop` branch.

For major changes that markedly transform the existing API or significantly alter the behavior of some functionality ensure that the corresponding commits contain appropriate `Conventional Commits` breaking change notations and as the pull request target select the `beta` branch.

## Other notes

- If you have commit access to the repository and want to make a big change or are unsure about something, make a new branch and open a pull request.
- We’re using [Prettier](https://github.com/prettier/prettier) to format code, so don’t worry much about code formatting.
- Don’t commit generated files, like minified JavaScript.
- Don’t change the version number or changelog.
- Use `npm run test:coverage` for a complete project test coverage.
- Use for example `npm run test:coverage __tests__/utils/uint256.test.ts` for a single file coverage.
- Use `npm run ts:coverage` to check the global type coverage rate and `npm run ts:coverage:report` to generate a complete report (summary displayed in the console, full HTML report available in the `coverage-ts` folder by launching `./coverage-ts/index.html` in your browser) and find files having low coverage.

## Need help?

If you want to contribute but have any questions, concerns or doubts, feel free to ping maintainers. Ideally create a pull request with `WIP` (Work in progress) in its title and ask questions in the pull request description.

You can also ask your query on our dedicated channel for [Starknet.js](https://discord.com/channels/793094838509764618/927918707613786162) on the [Starknet Discord](https://discord.com/invite/YgsdxEx3)
