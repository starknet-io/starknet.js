# How to contribute

We love pull requests. And following these guidelines will make your pull request easier to merge.

If you want to contribute but don’t know what to do, take a look at these two labels: [help wanted](https://github.com/starknet-io/starknet.js/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22) and [good first issue](https://github.com/starknet-io/starknet.js/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22).

_[Use GitHub interface](https://blog.sapegin.me/all/open-source-for-everyone/) for simple documentation changes, otherwise follow the steps below._

## Prerequisites

- If it’s your first pull request, watch [this amazing course](http://makeapullrequest.com/) by [Kent C. Dodds](https://twitter.com/kentcdodds).
- Fork the repository and clone your fork.
- Install dependencies: `npm install`.

## Development workflow

Start from the `develop` branch.

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

## Need help?

If you want to contribute but have any questions, concerns or doubts, feel free to ping maintainers. Ideally create a pull request with `WIP` (Work in progress) in its title and ask questions in the pull request description.
